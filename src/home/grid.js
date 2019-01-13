import React, { Component } from 'react';
import TileFile from './tileFile';

export default class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = { parent:props.parent, display:props.parent };
  }

  componentDidMount() {

  }

  render() {
    if(this.props.display === "list") {
      return (<table>
        <thead>
        <tr>
          <th>Name</th>
          <th>Last edited</th>
          <th>Size </th>
          <th>Type </th>
        </tr>
        </thead>
        <tbody>
          {this.state.parent.state.files.map((file) => {
            return <TileFile file={file} parent={this} key={file.path} />;
          })}
        </tbody>
        </table>
      )
    }else {
      return (
        <div>
          {this.props.display}
        </div>
      )
    }
  }
}
