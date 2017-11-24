import React, { Component } from 'react';
import TelescopTopics from '../services/api/event/EventTelescop/topics';
import NotificationTopics from '../services/api/event/EventNotification/topics';

const { ipcRenderer } = require('electron')

export default class AppBody extends Component{

	constructor(props){
		super(props);
		this.state = {
			file:this.props.application.state.file, 
			parent: this.props.parent, 
			metadata:{}
		};
		this.getMetadata();
		ipcRenderer.on(NotificationTopics.REFRESH_METADA, this.getMetadata);
	}

	getMetadata(){
		var state = this.state;
		state.metadata = JSON.parse(ipcRenderer.sendSync(TelescopTopics.LIST_METADATA, state.file.path));
		console.log(state.metadata);
		this.setState(state);
	}

    render(){
    	return (
    		<h1>Metadata</h1>
    	);
    }
}