import React, { Component } from 'react';
import TopicsTelecopEvent from '../services/api/event/EventTelescop/topics';
import NotificationTopics from '../services/api/event/EventNotification/topics';
import TileFile from './tileFile';
import AddFileButton from '../add-file/add_file.js';
import Grid from './grid.js';

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
      if(this.state.files.length <= 0) {
          return (
              <div>
                <h1 className="color-orange text-center">It's Kinda empty in here</h1>
                <p className="text-center text-bold">
                  Add your first files by drag and <br/>
                  drop  any file in here. <br/>
                  or <br/>
                  <AddFileButton />
                </p>
              </div>
          );
        }else{
          return (
            <Grid display={this.props.application.state.display} parent={this}/>
          );
        }
    }
}
