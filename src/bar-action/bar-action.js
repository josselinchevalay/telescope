import React, { Component } from 'react';

const MenuItems = [
    "Files",
    "Config",
    "About",
    ];

const timeIPFSHeartBeat = 1000 * 6;
const ipfsUrlInstance = 'http://localhost:3001/run';


export default class BarAction extends Component{

    constructor(props){
        super(props);
        this.state = {selected: this.props.selected , connected : false, search: ''};
        this.pingIpfsInstance();
        this.buttonAddFileClickHandler = this.buttonAddFileClick.bind(this);
        setInterval(this.pingIpfsInstance.bind(this), timeIPFSHeartBeat);
    }

    clikcHandler(event){
      let index = null;
      if(!event.target.dataset['page'])
        return;
      else
        index = event.target.dataset['page']

        this.setState({selected:index});
        this.props.application.setState({context:index});
    }

    pingIpfsInstance() {
        let state = this.state;
        state.connected  = true;
        this.setState(state);
    }

    buttonAddFileClick() {
        let element = document.getElementsByClassName('input-file')[0].click();
    }

    render(){
        return(
            <div className="menu">
                <div className="menu-elements">
                   <div className="menu-elements-header">
                     <a href="#" className="btn btn-small btn-success" onClick={this.buttonAddFileClickHandler}>
                          <i className="fa fa-plus"></i>&nbsp;
                          <span>Add Files</span>
                          <input type="file" className="input-file" name="myFile"/>
                      </a>
                   </div>
                   <div className="flex-group-column menu-elements-bottom">
                    <div>
                      <a href="#" className="none-style" data-page="Config" onClick={this.clikcHandler.bind(this)} >
                          <i data-page="Config" className="fas fa-cog"/>
                          <span data-page="Config">Setting</span>
                      </a>
                    </div>
                    <div>
                      <a href="#" className="none-style"onClick={this.clikcHandler.bind(this)}>
                          <i data-page="About" className="fas fa-info-circle"/>
                          <span data-page="About">About</span>
                      </a>
                    </div>
                   </div>
                </div>
            </div>
        );
    }

}
