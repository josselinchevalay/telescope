import Application from './application/application';
import * as React from "react";
import * as ReactDOM from "react-dom";



export default class Telescope{

    initialize(){
        ReactDOM.render(            
                <Application context="Files" />,
            document.getElementById('root')
        );
    }

};