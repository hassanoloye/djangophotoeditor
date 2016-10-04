import React, { Component } from 'react';
import Menu from './menu.jsx';
import request from 'superagent';
import FolderModal from './modals/foldermodal.jsx';
import Favorites from './favorites.jsx';
import NewFolderPicture from './newfolderpicture.jsx';
import Photo from './photo.jsx';

export default class SingleFolder extends Component {
  constructor() {
    super();
    this.state = {
      photos: [],
    }
  }
  componentWillMount() {
  }

  componentDidMount() {
    console.log(localStorage.getItem('token'));

  }


  render() {
    return (
      <div>
      <Menu username={localStorage.getItem('username')} />
      <NewFolderPicture />
      <Favorites />
      <Photo folderId={this.props.params.folderId} />
      </div>
    );
  }
}
