import React, { Component } from 'react';
import request from 'superagent';
import Menu from './menu.jsx';
import FolderModal from './modals/foldermodal.jsx';
import Folder from './folder.jsx';
import Photos from './photo.jsx';
import Favorites from './favorites.jsx';
import NewFolderPicture from './newfolderpicture.jsx';

import {
    Nav,
    NavItem,
    ListGroup,
    ListGroupItem
} from 'react-bootstrap';

export default class Dashboard extends Component {
  constructor() {
    super();
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.state = {
    }

  }

  handleFieldChange(event) {
      event.preventDefault();
      let key = event.target.name;
      let value = event.target.value;
      this.setState({
          [key]: value
      });
  }

  componentWillMount() {
    if (!(localStorage.getItem('isAuthenticated'))) {
      this.context.router.push('/')
    }
  }

  componentDidMount() {
    document.title = "Dashboard - PhotoEditor";
  }

  render() {
    return (
      <div>
        <Menu username={localStorage.getItem('username')} />
        <NewFolderPicture />
        <Favorites />

      </div>
    );
  }
}

Dashboard.contextTypes = {
    router: React.PropTypes.object.isRequired
};
