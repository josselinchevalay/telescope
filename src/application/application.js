import React, { Component } from 'react';
import AppBody from '../app-body/app-body';
import BarAction  from '../bar-action/bar-action';
import Notification from '../notification/notification';
import DragAndDrop from '../dragndrop/dragndrop';

export default class Application extends Component{
    constructor(props){
        super(props);
        this.state = {context: this.props.context, display: "horizon"};
    }

    backTo(event){
      let index = null;
      if(!event.target.dataset['page'])
        return;
      else
        index = event.target.dataset['page']

        this.setState({context:index});
    }

    replaceClass(element, oldClass, newClass) {
      element.classList.remove(oldClass);
      element.classList.add(newClass);
    }

    changeFileDisplay(event){
      let element = event.target;
      let state = this.state;
      if(element.classList.contains("fa-grip-horizontal")){
        state.display = "list";
        this.replaceClass(element, "fa-grip-horizontal", "fa-th-list");
      }else {
        state.display = "horizon";
        this.replaceClass(element, "fa-th-list","fa-grip-horizontal");
      }
      this.setState(state);
    }


    render(){
        return(
                <div className="container" id="containerApp">
                    <DragAndDrop/>
                    <Notification />
                    <div className="header">
                        <div className="header-items">
                            <div className="header-item-0">
                                <img data-page="Files" src="images/logo.png" className="brandLogo" alt="telecsop" onClick={this.backTo.bind(this)}/>
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
                                <a href="#" onClick={this.changeFileDisplay.bind(this)}>
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
