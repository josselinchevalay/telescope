import * as React from "react";

export interface ApplicationPageProps {application:any};

export interface FolderProps<ApplicationPageProps> {};


export default class FolderPage extends React.Component<ApplicationPageProps, {}>{
    public render(){
        return (
            <div>
                <h1>{this.props.application.state.context}</h1>
            </div>
        );
    }
}