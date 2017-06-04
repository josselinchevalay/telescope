import React, { Component } from 'react';
import AppBody from '../app-body/app-body';
import BarAction  from '../bar-action/bar-action';
import Notification from '../notification/notification';

export default class Application extends Component{
    constructor(props){
        super(props);
        this.state = {context: this.props.context};

    }
    
    render(){
        return(
                <div className="row">
                    <Notification />
                    <BarAction selected="Files" application={this}/>
                    <AppBody application={this}/>
                </div>
        );
    }
};