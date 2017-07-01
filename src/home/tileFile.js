import React, { Component } from 'react';

const styleImgTopCard = {
     "font-size" : '5em'
}

export default class TileFile extends Component{
    constructor(props){
        super(props);
        this.state = props;
        this.clickHandler = this.clickEvent.bind(this);
    }
    
    clickEvent(event){
        if(this.state.file.type === "os/directory"){
             this.state.parent.incrementHandler(event);
        }
    }

    getGlyphicon(){
        var type = this.state.file.type;
        if(type === "os/directory"){
            return "glyphicon-folder-close";
        } else {
            return " glyphicon-file";
        }
    }

    render(){
        return (
            <div className="col-xs-6 col-sm-4 col-lg-3 card">
                <span className={"card-img-top glyphicon " + this.getGlyphicon()} style={styleImgTopCard} onClick={this.clickHandler} data-name={this.state.file.name} data-path={this.state.file.path}></span>
                <div class="card-block">
                    <h4 className="card-title">{this.state.file.name}</h4>
                    <div>
                        <span className="glyphicon glyphicon-share"></span>
                        <span className=""></span>
                    </div>
                </div>
            </div>
        );
    }
}