
import React from 'react';

export interface AppBodyProps  {application:any};

export default class AppBody extends React.Component<AppBodyProps, {}> {

    public render() {
        return (
            <div className="hello-world">
                {this.props.application.state.context}
            </div>     
        );
    }
}
