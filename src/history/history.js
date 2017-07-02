import React, { Component } from 'react';
const moment = require('moment');

console.log(moment);
export default class HistoryPage extends Component{
    
    constructor(props){
        super(props);
        var state = {file : this.props.application.state.file};
        this.state = state;
    }

    render(){
        return (
            <div>
                <h1> History {this.state.file.name} </h1>
                <ul>
                    {
                        this.state.file.cids.map((element)=> {
                            return <li> {element.commitMessage} {moment(element.createdAt).format('YYYY-MM-DD HH:mm Z')} </li>
                        })
                    }
                </ul>
            </div>
        );
    }
}