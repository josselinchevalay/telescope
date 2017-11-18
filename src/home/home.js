import React, { Component } from 'react';
import TopicsTelecopEvent from '../services/api/event/EventTelescop/topics';
import NotificationTopics from '../services/api/event/EventNotification/topics';
import TileFile from './tileFile';

const { ipcRenderer } = require('electron');
const _ = require('lodash');


export default class FolderPage extends Component {

    getFiles() {
        var state = this.state;
        state.files = JSON.parse(ipcRenderer.sendSync(TopicsTelecopEvent.GET_FILES, state.contextPath));
        this.setState(state);
    }

    constructor(props) {
        super(props);
        let self = this;
        this.state = { files: [], contextName: "", contextPath: "" };
        this.getFiles();
        this.decrementHandler = this.decrement.bind(this);
        this.incrementHandler = this.increment.bind(this);
        let refreshFileHandler = this.refreshFile.bind(this);
        ipcRenderer.on(NotificationTopics.REFRESH_FILES, refreshFileHandler);
    }

    refreshFile(event, arg) {
        this.getFiles();
        this.render();
    }

    increment(event) {
        var state = this.state;
        var data = event.target.dataset;
        console.log(event);
        console.log(data);
        state.contextName += ">" + data.name;
        state.contextPath = data.path;
        this.setState(state);
        this.getFiles();
    }

    decrement(event) {
        var state = this.state;
        if (state.contextName !== "") {
            var tree = state.contextName.split(">");
            state.contextName = _.without(tree, tree.splice(-1)).join('>');
            if (tree.length == 1) {
                state.contextPath = "";
            } else {
                var backslash = (state.contextPath.indexOf('\\') > -1) ? true : false;
                var FileSperator = (backslash) ? '\\' : '\/';
                var treePath = state.contextPath.split(FileSperator);
                delete treePath[treePath.length - 1];
                state.contextPath = treePath.join(FileSperator);
            }
            this.setState(state);
            this.getFiles();
        }
    }

    render() {
        return (
            <div>
                <h1 onClick={this.decrementHandler}>{this.props.application.state.context} {(this.state.contextName) ? this.state.contextName : ""} </h1>
                <div className="flex-row">
                    {this.state.files.map((file) => {
                        return <TileFile file={file} parent={this} key={file.path} />;
                    })}
                </div>
            </div>
        );
    }
}