import Application from './application/application';
import React from 'react';
import ReactDOM from 'react-dom';

interface ApplicationState {context:any}

export default class Telescope{

    initialize() {

        ReactDOM.render(            
                <Application context="home"/>,
            document.getElementById('telescope')
        );
    }

};