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
 
    clikcHandler(index){
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
                   <a href="#" className="btn btn-small btn-success" onClick={this.buttonAddFileClickHandler}>
                        <i className="fa fa-plus"></i>&nbsp;
                        <span>Add Files</span>
                        <input type="file" className="input-file" name="myFile"/>
                   </a>
                   <div className="menu-actions">
                        {
                        MenuItems.map((item)=>{
                            return( 
                                <li className={`${this.state.selected === item.toString() ? 'active' : ''}`}  key={item.toString()} > 
                                    <a href="#" onClick={this.clikcHandler.bind(this, item.toString())}>
                                        {item.toString()}
                                    </a>
                                </li>
                            );
                        })
                    }
                   </div>
                </div>
            </div>
        );
    }

}