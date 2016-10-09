import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

export default class Favorites extends Component {
  constructor() {
    super();
    this.redirectToFolderDashboard = this.redirectToFolderDashboard.bind(this);
    this.redirectToPhotoDashboard = this.redirectToPhotoDashboard.bind(this);
    this.state = {}
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
