import React, { Component } from 'react';
import AddFileButton from '../add-file/add_file.js';
const timeIPFSHeartBeat = 1000 * 6;

export default class BarAction extends Component{

    constructor(props){
        super(props);
        this.state = {selected: this.props.selected , connected : false, search: ''};
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

    render(){
        return(
            <div className="menu">
                <div className="menu-elements">
                   <div className="menu-elements-header">
                      <AddFileButton />
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
