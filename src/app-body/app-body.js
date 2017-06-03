import Home from '../home/home';
import Folder from '../folder/folder';
import About from '../about/about';
import Config from '../config/index';
import React, { Component } from 'react';


export default class AppBody extends Component{

    getCurrentPage() {
        let context = this.props.application.state.context;
        switch(context){
            case "Folder":
                return <Folder application={this.props.application}/>
            case "About":
                return <About />
            case "Config" : 
                return <Config />
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