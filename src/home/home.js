import React, { Component } from 'react';

export default class FolderPage extends Component{
    render(){
        return (
            <div>
                <h1>{this.props.application.state.context}</h1>
            </div>
        );
    }
}