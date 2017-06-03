import React, { Component } from 'react';
//import styles from './bar-action.css';


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

    render(){
        return(
            <div className="col-md-3 sidebar">
                <ul className="nav nav-sidebar">
                    <li>
                        <input className="form-control" type="text" placeholder="Search for someone" name="search" value={this.state.search} />
                    </li>                
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
                    <li>   
                        IPFS  <span className={`glyphicon glyphicon-signal ${(this.state.connected) ? 'connected' : 'disconnected'}`} ></span>
                    </li>
                </ul>
            </div>
        );
    }

}