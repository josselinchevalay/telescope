"use strict";

import Application from './application/application';
import * as React from "react";
import * as ReactDOM from "react-dom";
import { IpfsConnector } from '@akashaproject/ipfs-connector';

interface ApplicationState {context:any}

export default class Telescope{

    initialize() {

        ReactDOM.render(            
                <Application context="Home" IpfsConnector={IpfsConnector.getInstance()}/>,
            document.getElementById('telescope')
        );
    }

};