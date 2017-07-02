import React, { Component } from 'react';
import TelescopTopics from '../services/api/event/EventTelescop/topics';

const {ipcRenderer} = require('electron')

const styleImgTopCard = {
     "font-size" : '5em'
}

const styleActionIcon = {
    "font-size" : "2.5em",
    "margin" : "0px 0px 0px 10px"
}

export default class TileFile extends Component{
    constructor(props){
        super(props);
        this.state = {file :props.file, parent: props.parent, moreAction : false};
        this.state.moreAction = false;
        this.clickHandler = this.clickEvent.bind(this);
        this.mouveOverHandler = this.mouseOver.bind(this);
        this.mouveOutHandler = this.mouveOut.bind(this);
        this.shareHandler = this.share.bind(this);
        this.historyHandler = this.history.bind(this);
    }
    
    clickEvent(event){
        if(this.state.file.type === "os/directory"){
             this.state.parent.incrementHandler(event);
        }
    }

    mouseOver(event){
        var state = this.state;
        state.moreAction = true;
        this.setState(state);
    }

    mouveOut(event){
         var state = this.state;
        state.moreAction = false;
        this.setState(state);
    }

    share(event){
        ipcRenderer.send(TelescopTopics.SHARE_IPFS, this.state.file.latestCid.hash);
    }

    history(event){
        var applicationState = this.state.parent.props.application.state;
        this.state.parent.props.application.setState({context:"History" , file : this.state.file});
    }

    showActions(){
        return {
            display : (this.state.moreAction) ? 'block' : 'none'
        }
    }

    getGlyphicon(){
        var type = this.state.file.type;
        if(type === "os/directory"){
            return "glyphicon-folder-close";
        } else {
            return " glyphicon-file";
        }
    }

    render(){
        return (
            <div className="col-xs-6 col-sm-4 col-lg-3 card" onMouseOver={this.mouveOverHandler} onMouseOut={this.mouveOutHandler}>
                <span className={"card-img-top glyphicon " + this.getGlyphicon()} style={styleImgTopCard} onClick={this.clickHandler} data-name={this.state.file.name} data-path={this.state.file.path}></span>
                <div class="card-block">
                    <h4 className="card-title">{this.state.file.name}</h4>
                    <div style={this.showActions()}>
                        <span className="glyphicon glyphicon-share" style={styleActionIcon} onClick={this.shareHandler}>Share</span>
                        <span className="glyphicon glyphicon-download" style={styleActionIcon}>Download</span>
                        <span className="glyphicon glyphicon-refresh" style={styleActionIcon}>Synchronize</span>
                        <span className="glyphicon glyphicon-book" style={styleActionIcon} onClick={this.historyHandler}>History</span>
                    </div>
                </div>
            </div>
        );
    }
}