import React, { Component } from 'react';
import Menu from './menu.jsx';
import request from 'superagent';
import Favorites from './favorites.jsx';
import Photo from './photo.jsx';
import NewFolderPicture from './newfolderpicture.jsx';
import NotifyAlert from './notifyalert.jsx';


export default class PhotoDashboard extends Component {
  constructor() {
    super();
    this.fetchAllPhotos = this.fetchAllPhotos.bind(this);
    this.fetchFolders = this.fetchFolders.bind(this);
    this.fetchPhotosByPage = this.fetchPhotosByPage.bind(this);
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

  fetchPhotosByPage(page) {
    request
      .get('/api/v1/photo/?page='+page)
      .set('Authorization', 'Bearer ' + localStorage
            .getItem('token'))
      .end((err, result) => {
        if (result.status === 200) {
          this.setState({
            photos: result.body.results,
          });
        }
      });
  }

  fetchAllPhotos() {
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

  fetchFolders() {
    request
      .get('/api/v1/folder/')
      .set('Authorization', 'Bearer ' + localStorage
            .getItem('token'))
      .end((err, result) => {
        if (result.status === 200) {
          var count = result.body.count
          var countValue =  (count % 10 === 0) ? count/10 : Math.floor(count/10) + 1
          this.setState({
            folders: result.body.results,
            folderPaginationCount: countValue
          });
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

  componentDidMount() {
    document.title = "Photo Dashboard - PhotoEditor";
  }

  render() {
    let closeNewFolderForm = () => this.setState({ showNewFolderForm: false });
    return (
      <div>
      <Menu username={localStorage.getItem('username')}
      />
      <NewFolderPicture
      fetchAllPhotos={this.fetchAllPhotos}
      fetchFolders={this.fetchFolders}
      displayFlashMessage={this.displayFlashMessage}
      />
      <Favorites />
      <NotifyAlert
      flashMessage = {this.state.flashMessage}
      messageType = {this.state.messageType}
      showNotification={this.state.showNotification}
      />
      <Photo folderId={0}
        photos={this.state.photos}
        photoPaginationCount={this.state.photoPaginationCount}
        fetchPhotosByPage={this.fetchPhotosByPage}
        fetchAllPhotos={this.fetchAllPhotos}
        displayFlashMessage={this.displayFlashMessage}
      />

    </div>
    );
  }
}
