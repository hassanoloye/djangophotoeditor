import React, { Component } from 'react';
import Menu from './menu.jsx';
import request from 'superagent';
import Folder from './folder.jsx';
import Photo from './photo.jsx';
import {
  ListGroup,
  ListGroupItem
}
from 'react-bootstrap';

export default class Favorites extends Component {
  constructor() {
    super();
    this.redirectToFolderDashboard = this.redirectToFolderDashboard.bind(this);
    this.redirectToPhotoDashboard = this.redirectToPhotoDashboard.bind(this);
    this.state = {
      newFolderName: '',
      showNewFolderForm: false,
      activeKey: 1,
      folders: [],
      photos: [],
      folderPaginationCount: 0,
      photoPaginationCount: 0,
    }
  }


  redirectToFolderDashboard() {
    this.context.router.push("/dashboard/folders")
  }

  redirectToPhotoDashboard() {
    this.context.router.push("/dashboard/photos")
  }

  render() {
    return (
      <div>
      <div className="select-folder-photo">
      <h4>Favorites</h4>
      <ListGroup>
      <ListGroupItem>
      <a onClick={this.redirectToFolderDashboard}>
      <span className="glyphicon glyphicon-folder-close"></span>
         &nbsp;All Folders
         </a>
         </ListGroupItem>
         <ListGroupItem>
         <a onClick={this.redirectToPhotoDashboard}>
         <span className="glyphicon glyphicon-picture">
         </span>
            &nbsp;All Photos
            </a>
            </ListGroupItem>
      </ListGroup>
      </div>
      </div>
    );
  }
}

Favorites.contextTypes = {
    router: React.PropTypes.object.isRequired
};
