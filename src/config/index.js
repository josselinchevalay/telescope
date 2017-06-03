import React, { Component } from 'react';
import IpfsTopics from '../services/api/event/EventIpfs/topics';

const {ipcRenderer} = require('electron');

export default class BarAction extends Component{ 
    constructor (props){
        super(props);
        //var ipfsInstanceConfig = JSON.parse(ipcRenderer.sendSync(IpfsTopics.CONFIG_GET, ''));
        this.state  =  {config:{"timeIPFSHeartBeat":6000,"autoSync":false}};
        this.getConfig();
        this.getIpfsDaemonConfig();
        this.handleTimeHeartbeat = this.UpdateTimeHeartbeat.bind(this);
        this.handleAutoSync = this.UpdateAutoSync.bind(this);
        this.handleConfig = this.sendConfig.bind(this);
    }

    getConfig(){
        var state  =  {config:{"timeIPFSHeartBeat":6000,"autoSync":false}};
        var self = this;
    }

    getIpfsDaemonConfig() {
        var ipfsInstanceConfig = JSON.parse(ipcRenderer.sendSync(IpfsTopics.CONFIG_GET, ''));
        var state = this.state;
        state.ipfs = ipfsInstanceConfig;
        this.setState(state);
    }

    sendConfig() {
        var self = th
    }


    UpdateTimeHeartbeat(event) {
       let config = this.state.config;
       config.timeIPFSHeartBeat = event.target.value;
       this.setState({config: config});
    }

    UpdateAutoSync(event){
        let config = this.state.config;
        let value = event.target.value;
        if(config.autoSync === value) {
            config.autoSync = false;
        }else {
            config.autoSync = value;
        }
        this.setState({config:config});
        return false;
    }

    render() {
        return (
            <div>
                <h1 className="page-header">Configuration </h1>
                    <div>
                        <label> PeerId : {this.state.ipfs.Identity.PeerID}</label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="hearbeat">HeatBeat time</label>
                        <input type="text" id="hearbeat" className="form-control" placeholder="exprime your time beetwen a check your IPFS connection" value={this.state.config.timeIPFSHeartBeat} onChange={this.handleTimeHeartbeat} />
                    </div>
                    <label htmlFor="autosync">Auto Synchronisation</label>
                    <div className="input-group">
                        <label id="autosync" className="switch">
                            <input type="checkbox" onChange={this.handleAutoSync}/>
                            <div className="slider round"></div>
                        </label>
                    </div>
                    <button className="btn btn-success" onClick={this.handleConfig}>Save </button>
            </div>
        );
    }
}