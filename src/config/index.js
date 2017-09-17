import React, { Component } from 'react';
import IpfsTopics from '../services/api/event/EventIpfs/topics';
import TelescopConfigEventTopics from '../services/api/event/EventConfig/topics';

const { ipcRenderer } = require('electron');

export default class BarAction extends Component {
    constructor(props) {
        super(props);
        this.state = { config: { "timeIPFSHeartBeat": 6000, "autoSync": false } };
        this.getConfig();
        this.getIpfsDaemonConfig();
        this.handleTimeHeartbeat = this.UpdateTimeHeartbeat.bind(this);
        this.handleAutoSync = this.UpdateAutoSync.bind(this);
        this.handleConfig = this.sendConfig.bind(this);
    }

    getConfig() {
        var config = JSON.parse(ipcRenderer.sendSync(TelescopConfigEventTopics.CONFIG_GET, ''));
        if (config) {
            var state = this.state;
            state.config = config;
            this.setState(state);
        }
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
        this.setState({ config: config });
    }

    UpdateAutoSync(event) {
        var config = this.state.config;
        var value = event.target.checked;
        config.autoSync = value;
        this.setState({ config: config });
        return false;
    }

    render() {
        return (
            <div>
                <h1 className="page-header">Configuration</h1>
                <div>
                    <label> PeerId : {this.state.ipfs.Identity.PeerID}</label>
                </div>
            </div>
        );
    }
}