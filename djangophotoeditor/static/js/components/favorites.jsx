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
    this.fetchPhotos = this.fetchPhotos.bind(this);
    this.fetchFolders = this.fetchFolders.bind(this);
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

  componentDidMount() {
    this.fetchFolders();
    this.fetchPhotos();
  }

  fetchFolders() {
    request
      .get('/api/v1/folder/')
      .set('Authorization', 'Bearer ' + localStorage
            .getItem('token'))
      .end((err, result) => {
        if (result) {
          if (result.status === 200) {
            var count = result.body.count
            var countValue =  (count % 10 === 0) ? count/10 : Math.floor(count/10) + 1
            this.setState({
              folders: result.body.results,
              folderPaginationCount: countValue
            });
          }
        }
      });

  }

  fetchPhotos() {
    request
      .get('/api/v1/photo/')
      .set('Authorization', 'Bearer ' + localStorage
            .getItem('token'))
      .end((err, result) => {
        if (result.status === 200) {
          var count = result.body.count
          var countValue =  (count % 10 === 0) ? count/10 : Math.floor(count/10) + 1
          this.setState({
            photos: result.body.results,
            photoPaginationCount: countValue
          });
        }
      });
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
      <a onClick={this.redirectToFolderDashboard} className="glyphicon glyphicon-folder-close">
         {' '}All Folders
         </a>
         </ListGroupItem>
         <ListGroupItem>
         <a onClick={this.redirectToPhotoDashboard} className="glyphicon glyphicon-picture">
            {' '}All Photos
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
