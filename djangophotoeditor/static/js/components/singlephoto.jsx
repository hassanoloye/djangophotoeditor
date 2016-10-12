import React, { Component } from 'react';
import Menu from './menu.jsx';
import request from 'superagent';
import Favorites from './favorites.jsx';
import NewFolderPicture from './newfolderpicture.jsx';

export default class SinglePhoto extends Component {
  constructor() {
    super();
    this.displayPhoto = this.displayPhoto.bind(this);
    this.fetchPhoto = this.fetchPhoto.bind(this);
    this.state = {
      photo: {},
    }
  }
  componentWillMount() {
    this.fetchPhoto(this.props.params.photoId);
  }

  fetchPhoto(photoId) {
    request
      .get('/api/v1/photo/'+photoId)
      .set('Authorization', 'Bearer ' + localStorage
            .getItem('token'))
      .end((err, result) => {
        if (result.status === 200) {
          this.setState({
            photo: result.body,
          });
        }
      });
  }

  displayPhoto() {
    return (
      <img src={this.state.photo.image} alt="Image not found" />
    )
  }

  render() {
    return (
      <div>
      <Menu username={localStorage.getItem('username')} />
      {this.displayPhoto()}
      </div>
    );
  }
}
