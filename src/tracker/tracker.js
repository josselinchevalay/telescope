import React, { Component } from 'react';
import IpfsTopics from '../services/api/event/EventIpfs/topics';
import TelescopConfigEventTopics from '../services/api/event/EventConfig/topics';

const {ipcRenderer} = require('electron');
const moment = require('moment');

export default class Tracker extends Component {

    constructor(props) {
       super(props);
       let state = {
            file : props.application.state.file,
            application : props.application,
            parent : (props.application.state.parent) ? props.application.state.parent : null
        };
        this.state = state;
        this.parentHandler = this.parentSelect.bind(this);
    }
    getCidsOption(){
        return this.state.file.cids.map((e) => {
                return <option value={e.hash} key={e.checksum}>  {e.commitMessage}  {moment(e.createdAt).format('YYYY/MM/DD H:mm:ss')} </option>;
        });
    }

    parentSelect(event){
        let state = this.state;
        state.parent = event.currentTarget.value;
        this.setState(state);
    }

    render(){
        return (
            <div>
                <h1> Tracker  {this.state.file.name} </h1>
                <div>
                    <form>
                    <div className="input-group">
                        <span className="input-group-addon" id="basic-addon1">Parent</span>
                        <select type="text" className="form-control" defaultValue={this.state.parent} onChange={this.parentHandler} required>
                        <option value="" disabled>Choose a parent commit </option>
                            {this.getCidsOption()}
                        </select>
                    </div>
            
                    <div className="input-group">
                        <span className="input-group-addon" id="basic-addon1">IPFS address</span>
                        <input type="text" className="form-control" placeholder="https://ipfs.io/ipfs/QmYa5hLssk5qCNSkNNvydwm3m4EFapKGXgQjNA2tMbKAzZ" aria-describedby="basic-addon1"/>
                    </div>

                    <div className="input-group">
                        <span className="input-group-addon" id="basic-addon1">Commit message</span>
                        <input type="text" className="form-control" placeholder="your message here" aria-describedby="basic-addon1"/>
                    </div>
                    </form>
                </div>
            </div>
        );
    }
}