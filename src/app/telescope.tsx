/// <reference path="../../index.d.ts" />
"use strict";

import Application from './application/application';
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as IpfsApi  from "ipfs-api";
import ConfigDaoFactory from '../core/dao/configDaoFactory'
import {PERSISTENCE_MODE} from '../core/dao/idaoFactory' 

interface ApplicationState {context:any}


export default class Telescope{

    initialize(){

        let config = ConfigDaoFactory
            .getInstance()
            .getDao(PERSISTENCE_MODE.EVENT_SYNC)
            .findById(0);
        console.log(config);
        config.Dao = "youpi"
        ConfigDaoFactory
        .getInstance()
        .getDao(PERSISTENCE_MODE.EVENT_SYNC)
        .update(config);      
          
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