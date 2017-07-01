import React, { Component } from 'react';
import TopicsTelecopEvent from '../services/api/event/EventTelescop/topics';

const {ipcRenderer} = require('electron');
const _ = require('lodash');

const styleImgTopCard = {
     "font-size" : '5em'
}
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
        console.log(event);
        console.log(data);
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
            if(tree.length == 1){
                state.contextPath = "";
            }else{
                var backslash = (state.contextPath.indexOf('\\') > -1 ) ? true : false;
                var FileSperator = (backslash) ? '\\' : '\/';
                var treePath = state.contextPath.split(FileSperator);
                delete treePath[treePath.length -1];
                state.contextPath = treePath.join(FileSperator);
            }
            this.setState(state);
            this.getFiles();
        }
    }

    tileRender(file){
        if(file.type === "os/directory")
            return  <li className="glyphicon glyphicon-folder-close" key={file.name.toString()} > {file.name }</li>;
        else
            return <li className="glyphicon glyphicon-picture" key={file.name.toString()}> {file.name }</li>;
    }

    render(){
        return (
            <div>
                <h1 onClick={this.decrementHandler}>{this.props.application.state.context } { (this.state.contextName ) ? this.state.contextName : ""} </h1>
                    <div className="flex-row">
                        {this.state.files.map((file) => {
                             if(file.type === "os/directory"){
                                return  <div className="col-xs-6 col-sm-4 col-lg-3 card">
                                            <span className="card-img-top glyphicon glyphicon-folder-close" style={styleImgTopCard} onClick={this.incrementHandler} data-name={file.name} data-path={file.path}></span>
                                            <div class="card-block">
                                                <h4 className="card-title">{file.name}</h4>
                                            </div>
                                        </div>;
                             } else {
                                return <div className="col-xs-4 col-sm-2 col-lg-3 card" >
                                            <span className="card-img-top glyphicon glyphicon-file" style={styleImgTopCard}></span>
                                            <div class="card-block">
                                                 <h4 className="card-title">{file.name}</h4>
                                             </div>
                                        </div>;
                                }
                        })}
                    </div>
            </div>
        );
    }
}