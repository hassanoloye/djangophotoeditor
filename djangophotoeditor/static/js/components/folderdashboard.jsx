import React, { Component } from 'react';
import Menu from './menu.jsx';
import request from 'superagent';
import Favorites from './favorites.jsx';
import FolderModal from './modals/foldermodal.jsx';
import Folder from './folder.jsx';
import NewFolderPicture from './newfolderpicture.jsx';

export default class FolderDashboard extends Component {
  constructor() {
    super();
    this.state = {
    }
  }
  componentDidMount() {
    document.title = "Folder Dashboard - PhotoEditor";
  }


  render() {
    let closeNewFolderForm = () => this.setState({ showNewFolderForm: false });
    return (
      <div>
      <Menu username={localStorage.getItem('username')}
      />
      <NewFolderPicture />
      <Favorites />
      <Folder />
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
