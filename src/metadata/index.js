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
		state.metadata = {test:'hello'}//JSON.parse(ipcRenderer.sendSync(TelescopTopics.LIST_METADATA, state.file.path));
		this.setState(state);
	}

    render(){
    	return (
    		<div>
    			<h1>Metadata > {this.state.file.path}</h1>
    			<table className="table table-striped">
    			   <thead>
    			      <tr>
    			         <th>Name</th>
    			         <th>Value</th>
    			      </tr>
    			   </thead>
    			   <tbody>
	    			   {
	    			   	   Object.keys(this.state.metadata).map((metaName) => {
	    			   	   	   return <tr><th scope="row">{metaName}</th><td>{this.state.metadata[metaName]}</td></tr>;
	    			   	   })
	    			   }
	    			</tbody>
    			</table>
    		</div>

    	);
    }
}