import React, { Component } from 'react';
import IpfsTopics from '../services/api/event/EventIpfs/topics';
import TelescopConfigEventTopics from '../services/api/event/EventConfig/topics';

const {ipcRenderer} = require('electron');

export default class BarAction extends Component{ 
    constructor (props){
        super(props);
        this.state  =  {config:{"timeIPFSHeartBeat":6000,"autoSync":false}};
        this.getConfig();
        this.getIpfsDaemonConfig();
        this.handleTimeHeartbeat = this.UpdateTimeHeartbeat.bind(this);
        this.handleAutoSync = this.UpdateAutoSync.bind(this);
        this.handleConfig = this.sendConfig.bind(this);
    }

    getConfig(){
        var config  = JSON.parse(ipcRenderer.sendSync(TelescopConfigEventTopics.CONFIG_GET, ''));
        var state = this.state;
        state.config = config;
        this.setState(state);
    }

    getIpfsDaemonConfig() {
        var ipfsInstanceConfig = JSON.parse(ipcRenderer.sendSync(IpfsTopics.CONFIG_GET, ''));
        var state = this.state;
        state.ipfs = ipfsInstanceConfig;
        this.setState(state);
    }

    sendConfig() {
        var state = this.state;
        ipcRenderer.send(TelescopConfigEventTopics.CONFIG_SET, JSON.stringify(state.config));
    }


    UpdateTimeHeartbeat(event) {
       let config = this.state.config;
       config.timeIPFSHeartBeat = event.target.value;
       this.setState({config: config});
    }

    UpdateAutoSync(event){
        var config = this.state.config;
        var value = event.target.checked;
        config.autoSync = value;
        this.setState({config:config});
        return false;
    }

    render() {
        return (
            <div>
                <h1 className="page-header">Configuration</h1>
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
                            <input type="checkbox" onChange={this.handleAutoSync} checked={this.state.config.autoSync} />
                            <div className="slider round"></div>
                        </label>
                    </div>
                    <button className="btn btn-success" onClick={this.handleConfig}>Save </button>
            </div>
        );
    }
}