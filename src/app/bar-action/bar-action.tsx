import React from 'react';

export interface BarProps {selected: string; application:any }

export interface BarState {selected: string}

export default class BarAction extends React.Component<BarProps, BarState> {

    constructor(props){
        super(props);
        this.state = {selected: this.props.selected};
    }
 
    public clikcHandler(index:string){
        this.setState({selected:index});
        this.props.application.setState({context:index});
    }

    public render() {
        return (
            <div className="bar-action toolbar-actions">
                        <div className="btn-group">
                            <button className={"btn btn-default" + ( this.state.selected === "Home" ? "active":"") }  onClick={this.clikcHandler.bind(this, "Home")}>
                                <span className="icon icon-home"></span>
                            </button>
                            <button className={"btn btn-default" + ( this.state.selected === "Folder" ? "active":"") } onClick={this.clikcHandler.bind(this, "Folder")}>
                                <span className="icon icon-folder"></span>
                            </button>
                            <button className={"btn btn-default" + ( this.state.selected === "Cloud" ? "active":"") } onClick={this.clikcHandler.bind(this, "Cloud")}>
                                <span className="icon icon-cloud"></span>
                            </button>
                            <button className={"btn btn-default" + ( this.state.selected === "Options" ? "active":"") } onClick={this.clikcHandler.bind(this, "Options")}>
                                <span className="icon icon-popup"></span>
                            </button>
                            <button className={"btn btn-default" + ( this.state.selected === "Refresh" ? "active":"") } onClick={this.clikcHandler.bind(this, "Refresh")}>
                                <span className="icon icon-shuffle"></span>
                            </button>
                    </div>
                </div>
        );
    }
}