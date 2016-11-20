import Application from './application/application';
import * as React from "react";
import * as ReactDOM from "react-dom";

interface ApplicationState {context:any}

export default class Telescope{

    initialize() {

        ReactDOM.render(            
                <Application context="Home"/>,
            document.getElementById('telescope')
        );
    }

};