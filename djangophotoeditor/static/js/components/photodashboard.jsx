import React, { Component } from 'react';
import Menu from './menu.jsx';
import request from 'superagent';
import Favorites from './favorites.jsx';
import FolderModal from './modals/foldermodal.jsx';
import Photo from './photo.jsx';
import NewFolderPicture from './newfolderpicture.jsx';
import { notify } from 'react-notify-toast';


export default class PhotoDashboard extends Component {
  constructor() {
    super();
    this.state = {
    }
  }

  componentDidMount() {
    document.title = "Photo Dashboard - PhotoEditor";
  }

  render() {
    let closeNewFolderForm = () => this.setState({ showNewFolderForm: false });
    return (
      <div>
      <Menu username={localStorage.getItem('username')}
      />
      <NewFolderPicture />
      <Favorites />
      <Photo folderId={0}/>
      <FolderModal
        show={this.state.showNewFolderForm}
        onHide={closeNewFolderForm}
        handleFieldChange={this.handleFieldChange}
        onSave={this.handleSaveNewFolder}
        formName="newFolderName"
        formtitle="Add Folder"
        placeholder="Enter folder name"
      />
    </div>
    );
  }
}
