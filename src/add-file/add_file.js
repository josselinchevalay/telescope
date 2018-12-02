import React, { Component } from 'react';
import IpfsTopics from '../services/api/event/EventIpfs/topics';
import {forEach, map} from 'lodash';

const {ipcRenderer} = require('electron');

export default class AddFileButton extends Component {
  constructor(props){
    super(props);
    this.buttonAddFileClickHandler = this.buttonAddFileClick.bind(this);
    this.buttonFileCHangeHandler = this.buttonFileCHange.bind(this);
  }

  componentDidMount() {
    let state = {};
    state.files = [];
    this.setState(state);
  }

  buttonAddFileClick(event) {
    let element = document.getElementsByClassName('input-file')[0].click();
  }

  convertFile(f) {
    return JSON.stringify({
      name : f.name,
      path : f.path,
      lastModified : f.lastModified,
      size : f.size,
      type : f.type
    });
  }

  buttonFileCHange(event) {
    let files = event.target.files;
    files = map(files, this.convertFile);
    ipcRenderer.send(IpfsTopics.DOCUMENT_ADD, JSON.stringify(files));
  }

  render(){
    return (
      <div>
        <a href="#" className="btn btn-small btn-success" onClick={this.buttonAddFileClickHandler}>
             <i className="fa fa-plus"></i>&nbsp;
             <span>Add Files</span>
             <input type="file" className="input-file" name="myFile" onChange={this.buttonFileCHangeHandler}/>
         </a>
      </div>
    );
  }

}
