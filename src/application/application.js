import React, { Component } from 'react';
import AppBody from '../app-body/app-body';
import BarAction  from '../bar-action/bar-action';
import Notification from '../notification/notification';
import DragAndDrop from '../dragndrop/dragndrop';

export default class Application extends Component{
    constructor(props){
        super(props);
        this.state = {context: this.props.context};

    }
    
    render(){
        return(
                <div className="container" id="containerApp">
                    <DragAndDrop/>
                    <Notification />
                    <div className="header">
                        <div className="header-items">
                            <div className="header-item-0">
                                <img src="images/logo.png" className="brandLogo" alt="telecsop"/>
                            </div>
                            <div className="header-item-1">
                               <div>
                                    <span>Test.png</span><br/>
                                    <progress value="70" max="100" className="progress-bar"></progress>
                                </div>
                            </div>
                            <div className="header-item-2">
                                <a href="#">
                                    <i className="fa fa-search"></i>
                                </a>
                                <a href="#">
                                    <i className="fas fa-grip-horizontal"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <BarAction selected="Files" application={this}/>
                    <AppBody application={this}/>
                </div>
        );
    }
};