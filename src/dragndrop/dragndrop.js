import React, { Component } from 'react';
import IpfsTopics from '../services/api/event/EventIpfs/topics';


const {ipcRenderer} = require('electron');

export default class BarAction extends Component{
    constructor(props){
        super(props);
        // merge dragover and on drop 
        document.ondragover = document.ondrop = (ev) => {
            ev.preventDefault()
        }

        document.body.ondrop = this.onDragAndDropHandler.bind(this);
    } 

    onDragAndDropHandler(event){
        var files = this._convertFileList(event.dataTransfer.files);       
        ipcRenderer.send(IpfsTopics.DOCUMENT_ADD, JSON.stringify(files));
        event.preventDefault();
    }

    _convertFileList(fileList){
        var files = [];
        for (var i =0 ; i < fileList.length; i++){
            var file = {
                name : fileList[i].name,
                path : fileList[i].path,
                lastModified : fileList[i].lastModified,
                size : fileList[i].size,
                type : fileList[i].type
            };
            files.push(JSON.stringify(file));
        }
        return files;
    }

    render() {
        return (<div></div>);
    }
 }