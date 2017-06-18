import React, { Component } from 'react';
import TopicsTelecopEvent from '../services/api/event/EventTelescop/topics';

const {ipcRenderer} = require('electron');
export default class FolderPage extends Component{
    render(){
        console.log(TopicsTelecopEvent.GET_FILES);
        console.log(ipcRenderer.sendSync(TopicsTelecopEvent.GET_FILES, ""));
        return (
            <div>
                <h1>{this.props.application.state.context}</h1>
            </div>
        );
    }
}