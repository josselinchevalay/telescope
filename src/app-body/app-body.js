import Home from '../home/home';
import Folder from '../folder/folder';
import About from '../about/about';
import Config from '../config/index';
import History from '../history/history';
import Tracker from '../tracker/tracker';
import Meta    from '../metadata/';
import React, { Component } from 'react';


export default class AppBody extends Component{

    getCurrentPage() {
        let context = this.props.application.state.context;
        switch(context){
            case "Folder":
                return <Folder application={this.props.application}/>
            case "About":
                return <About />
            case "Metadata":
                 return <Meta application={this.props.application} />
            case "Config" : 
                return <Config />
            case "History":
                return <History application={this.props.application} />
            case "Tracker" :
                return <Tracker application={this.props.application} />
            case "Files":
            default:
                return <Home application={this.props.application}/>;
        }
    }

     render() {
        return (
            <div className="col-md-9 main">
                {this.getCurrentPage()}
            </div>     
        );
    }
}