import React, { Component } from 'react';
import Menu from './menu.jsx';
import request from 'superagent';
import Favorites from './favorites.jsx';
import Folder from './folder.jsx';
import NewFolderPicture from './newfolderpicture.jsx';
import NotifyAlert from './notifyalert.jsx';


export default class FolderDashboard extends Component {
  constructor() {
    super();
    this.fetchFolders = this.fetchFolders.bind(this);
    this.fetchAllPhotos = this.fetchAllPhotos.bind(this);
    this.fetchFoldersByPage = this.fetchFoldersByPage.bind(this);
    this.displayFlashMessage = this.displayFlashMessage.bind(this);
    this.state = {
      folders: [],
      folderPaginationCount: 0,
      photos: [],
      photoPaginationCount: 0,
      showNotification: false,
      flashMessage: '',
      messageType: 'success'
    }
  }

  componentWillMount() {
    this.fetchFolders();
    this.fetchAllPhotos();
  }
  componentDidMount() {
    document.title = "Folder Dashboard - PhotoEditor";
  }

  fetchFoldersByPage(page) {
    request
      .get('/api/v1/folder/?page='+page)
      .set('Authorization', 'Bearer ' + localStorage
            .getItem('token'))
      .end((err, result) => {
        if (result) {
          if (result.status === 200) {
            this.setState({
              folders: result.body.results,
            });
          }
        }
      });
  }

  fetchAllPhotos() {
    request
      .get('/api/v1/photo/')
      .set('Authorization', 'Bearer ' + localStorage
            .getItem('token'))
      .end((err, result) => {
        if (result) {
          if (result.status === 200) {
            let count = result.body.count
            let countValue =  (count % 10 === 0) ? count/10 : Math.floor(count/10) + 1
            this.setState({
              photos: result.body.results,
              photoPaginationCount: countValue
            });
          }
        }
      });
  }


  fetchFolders() {
    request
      .get('/api/v1/folder/')
      .set('Authorization', 'Bearer ' + localStorage
            .getItem('token'))
      .end((err, result) => {
        if(result) {
          if (result.status === 200) {
            let count = result.body.count
            let countValue =  (count % 10 === 0) ? count/10 : Math.floor(count/10) + 1
            this.setState({
              folders: result.body.results,
              folderPaginationCount: countValue
            });
          }
        }
      });
  }

  displayFlashMessage(message, messageType) {
    this.setState({flashMessage: message,
                  messageType: messageType,
                  showNotification: true});
    setTimeout(function() {
      this.setState({flashMessage: "",
                    showNotification: false});
    }.bind(this), 3000);
  }

  render() {
    let closeNewFolderForm = () => this.setState({ showNewFolderForm: false });
    return (
      <div>
      <Menu username={localStorage.getItem('username')}
      />
      <NewFolderPicture
      fetchFolders={this.fetchFolders}
      fetchAllPhotos={this.fetchAllPhotos}
      displayFlashMessage={this.displayFlashMessage}
      />
      <Favorites/>
      <NotifyAlert
      flashMessage = {this.state.flashMessage}
      messageType = {this.state.messageType}
      showNotification={this.state.showNotification}
      />
      <Folder
      fetchFolders={this.fetchFolders}
      folders={this.state.folders}
      folderPaginationCount={this.state.folderPaginationCount}
      fetchFoldersByPage={this.fetchFoldersByPage}
      displayFlashMessage={this.displayFlashMessage}
      />

    </div>
    );
  }
}
