import Application from './application/application';
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Nedb from "nedb";
import * as Electron from "electron";


interface ApplicationState {context:any}

export default class Telescope{

    getUserHome(){
        let app = Electron.remote.app;
        return app.getPath("appData");
    }

    initialize() {
        console.log(this.getUserHome());
        ReactDOM.render(            
                <Application context="Home"/>,
            document.getElementById('telescope')
        );
    }

};