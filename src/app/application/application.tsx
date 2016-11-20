import * as React from "react";
//import { IpfsConnector } from '@akashaproject/ipfs-connector';
import AppBody from '../app-body/app-body';
import BarAction  from '../bar-action/bar-action';
import * as Nedb from "nedb"

export interface ApplicationProps {context: string;}

export interface ApplicationState {context: string}

export default class Application extends React.Component<ApplicationProps, ApplicationState> {
    constructor(props:any){
        super(props);
        this.state = {context: this.props.context};
    }
    public render(){
        return(
            <div className="window">
                <div className="toolbar toolbar-header">
                    <h1 className="title">Telescope</h1>
                    <BarAction selected={this.state.context} application={this}/>
                </div>
                <div className="window-content">
                    <AppBody application={this}/>
                </div>
            </div>
        );
    }
};