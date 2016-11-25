"use strict";

import Application from './application/application';
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as IpfsApi  from "ipfs-api";

interface ApplicationState {context:any}

export default class Telescope{

    initialize() {
        let ipfs = IpfsApi('localhost', '5001', {protocol:'http'});
        ipfs.id().
        then((id:string)=>{
            console.log(id);
        })
        .catch((err:any)=>{
            console.log(err);
        });
        ReactDOM.render(            
                <Application context="Home" IpfsConnector={ipfs}/>,
            document.getElementById('telescope')
        );
    }

};