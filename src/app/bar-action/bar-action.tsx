import React from 'react';

export interface BarProps {selected: string; application:any }

export interface BarState {selected: string}

export default class BarAction extends React.Component<BarProps, BarState> {

    constructor(props){
        super(props);
        this.state = {selected: this.props.selected};
    }
 
    public clikcHandler(index:string){
        this.setState({selected:index})
        this.props.application.setState({context:index});
    }

    public render() {
        return (
            <div className="bar-action toolbar-actions">
                        <div className="btn-group">
                            <button className={"btn btn-default" + ( this.state.selected === "home" ? "active":"") }  onClick={this.clikcHandler.bind(this, "home")}>
                                <span className="icon icon-home"></span>
                            </button>
                            <button className={"btn btn-default" + ( this.state.selected === "folder" ? "active":"") } onClick={this.clikcHandler.bind(this, "folder")}>
                                <span className="icon icon-folder"></span>
                            </button>
                            <button className={"btn btn-default" + ( this.state.selected === "cloud" ? "active":"") } onClick={this.clikcHandler.bind(this, "cloud")}>
                                <span className="icon icon-cloud"></span>
                            </button>
                            <button className={"btn btn-default" + ( this.state.selected === "options" ? "active":"") } onClick={this.clikcHandler.bind(this, "options")}>
                                <span className="icon icon-popup"></span>
                            </button>
                            <button className={"btn btn-default" + ( this.state.selected === "refresh" ? "active":"") } onClick={this.clikcHandler.bind(this, "refresh")}>
                                <span className="icon icon-shuffle"></span>
                            </button>
                    </div>
                </div>
        );
    }
}