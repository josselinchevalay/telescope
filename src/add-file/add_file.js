import React, { Component } from 'react';

export default class AddFileButton extends Component {
  constructor(props){
    super(props);
    this.state = {};
    this.buttonAddFileClickHandler = this.buttonAddFileClick.bind(this);
  }

  componentDidMount() {
    console.log('hello');
  }

  buttonAddFileClick(event) {
    let element = document.getElementsByClassName('input-file')[0].click();
  }

  render(){
    return (
      <div>
        <a href="#" className="btn btn-small btn-success" onClick={this.buttonAddFileClickHandler}>
             <i className="fa fa-plus"></i>&nbsp;
             <span>Add Files</span>
             <input type="file" className="input-file" name="myFile"/>
         </a>
      </div>
    );
  }

}
