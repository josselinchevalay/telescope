import React from 'react';

export interface ApplicationPageProps {application:any};

export interface HomeProps<ApplicationPageProps> {};


export default class HomePage extends React.Component<ApplicationPageProps, {}>{
    public render(){
        return (
            <div>
                <h1>{this.props.application.state.context}</h1>
            </div>
        );
    }
}