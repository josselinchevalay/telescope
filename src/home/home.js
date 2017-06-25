import React, { Component } from 'react';
import TopicsTelecopEvent from '../services/api/event/EventTelescop/topics';

const {ipcRenderer} = require('electron');
const _ = require('lodash');

export default class FolderPage extends Component{

    getFiles(){
        var state = this.state;
        state.files = JSON.parse(ipcRenderer.sendSync(TopicsTelecopEvent.GET_FILES, state.contextPath));
        this.setState(state);
    }

    constructor(props){
        super(props);
        this.state = {files : [], contextName : "" , contextPath: ""};
        this.getFiles();
        this.decrementHandler = this.decrement.bind(this);
        this.incrementHandler = this.increment.bind(this);       
    }

    increment(event){
        var state = this.state;
        var data = event.target.dataset;
        state.contextName += ">" +  data.name;
        state.contextPath = data.path;
        this.setState(state);
        this.getFiles();
    }

    decrement(event){
        var state = this.state;
        if(state.contextName !== ""){
            var tree = state.contextName.split(">");
            state.contextName = _.without(tree, tree.splice(-1)).join('>');
            if(tree.length = 1){
                state.contextPath = "";
            }else{

            }
            this.setState(state);
            this.getFiles();
        }
    }

    render(){
        return (
            <div>
                <h1 onClick={this.decrementHandler}>{this.props.application.state.context } { (this.state.contextName ) ? this.state.contextName : ""} </h1>
                <div>
                    <ul>
                        {
                            this.state.files.map((file)=>{
                                if(file.type === "os/directory")
                                    return <li className="glyphicon glyphicon-folder-close" key={file.name.toString()} onClick={this.incrementHandler} data-name={file.name} data-path={file.path}> {file.name }</li>;
                                else
                                    return <li className="glyphicon glyphicon-picture" key={file.name.toString()}> {file.name }</li>;
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}