import React, { Component } from 'react';
import Menu from './menu.jsx';
import request from 'superagent';

export default class Photos extends Component {
  constructor() {
    super();
    this.state = {
    }
  }

  render() {
    return (
      <div>
        <Menu
          username={(JSON.parse(localStorage.getItem('username')))}
          handleLogout={this.handleLogout} menustyle={{display:"block"}}
        />
        Welcome to your photos

        </div>
    );
  }
}

Photos.contextTypes = {
    router: React.PropTypes.object.isRequired
};
