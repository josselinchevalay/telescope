"use strict";

import Application from './application/application';
import * as React from "react";
import * as ReactDOM from "react-dom";
import IpfsConnector from '../lib/IpfsConnector';

interface ApplicationState {context:any}
const ipfsConnectorInstance = IpfsConnector.getInstance();

export default class Telescope{

    initialize() {

        ReactDOM.render(            
                <Application context="Home" IpfsConnector={ipfsConnectorInstance}/>,
            document.getElementById('telescope')
        );
    }

};