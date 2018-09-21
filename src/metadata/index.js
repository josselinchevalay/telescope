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
		this.editHandler = this.edit.bind(this);
		this.changeHandler = this.change.bind(this);
	}

	change(event){
		console.log(event.target);
	}

	getHTMLInputTemplate(namedNodeHTML){
		return `<input type="text" value="${namedNodeHTML.dataset.value}" onChange="{${this.changeHandler}}" />`;
	}

	changeClassButton(id) {
		let dom = document.querySelector(`#${id}>td>a.btn`);
		if(dom.classList.contains('btn-danger') && dom.classList.contains('delete')){
			dom.classList.remove(['btn-danger', 'delete']);
		}else{
			dom.classList.add(['btn-warning', 'update']);
		}
	}

	edit(event){
		let namedNodeHTML = event.target;
		event.target.innerHTML = this.getHTMLInputTemplate(namedNodeHTML);
		this.changeClassButton(namedNodeHTML.dataset['row']);
	}

	getMetadata(){
		var state = this.state;
		state.metadata = {test:'hello', date:"blah blah"}//JSON.parse(ipcRenderer.sendSync(TelescopTopics.LIST_METADATA, state.file.path));
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
    			         <th>Action</th>
    			      </tr>
    			   </thead>
    			   <tbody>
	    			   {
	    			   	   Object.keys(this.state.metadata).map((metaName) => {
	    			   	   	   return <tr id={metaName}><th scope="row">{metaName}</th><td data-row={metaName} data-value={this.state.metadata[metaName]} className="value" onClick={this.editHandler} >{this.state.metadata[metaName]}</td><td><a href="#" className="btn btn-danger delete">Delete</a></td></tr>;
	    			   	   })
	    			   }
	    			   <tr className="form-group">
	    			      <td>
	    			          <input type="text" className="form-control-plaintext"  id="nameMeta" />
	    			      </td>
	    			      <td>
	    			          <input type="text" className="form-control-plaintext" id="metaValue" />
	    			      </td>
	    			      <td>
	    			           <a href="#" className="btn btn-success">Save</a>
	    			      </td>
	    			   </tr>
	    			</tbody>
    			</table>
    		</div>

    	);
    }
}