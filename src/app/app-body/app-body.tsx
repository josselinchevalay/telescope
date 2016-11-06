import Home from '../home/home';
import Folder from '../folder/folder';
import React from 'react';

export interface AppBodyProps  {application:any};

export default class AppBody extends React.Component<AppBodyProps, {}> {

    public getCurrentPage() {
        let context = this.props.application.state.context;
        switch(context){
            case "Folder":
                return <Folder application={this.props.application}/>
            case "home":
            default:
                return <Home application={this.props.application}/>;
        }
    }

    public render() {
        return (
            <div className="hello-world">
                {this.getCurrentPage()}
            </div>     
        );
    }
}
