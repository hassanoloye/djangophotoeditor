import React, { Component } from 'react';
import Menu from './menu.jsx';
import Favorites from './favorites.jsx';
import NewFolderPicture from './newfolderpicture.jsx';
import Photo from './photo.jsx';
import request from 'superagent';
import NotifyAlert from './notifyalert.jsx';

export default class SingleFolder extends Component {
  constructor() {
    super();
    this.fetchFolders = this.fetchFolders.bind(this);
    this.fetchAllPhotos = this.fetchAllPhotos.bind(this);
    this.fetchFolderPhotos = this.fetchFolderPhotos.bind(this);
    this.displayFlashMessage = this.displayFlashMessage.bind(this);
    this.state = {
      folders: [],
      folderPaginationCount: 0,
      photos: [],
      showNotification: false,
      flashMessage: '',
      messageType: 'success'
    }
  }

  componentWillMount() {
    this.fetchFolderPhotos()
  }

  fetchFolderPhotos() {
    request
      .get('/api/v1/folder/'+this.props.params.folderId)
      .set('Authorization', 'Bearer ' + localStorage
            .getItem('token'))
      .end((err, result) => {
        if (result.status === 200) {
          this.setState({
            photos: result.body.photos,
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

    componentDidMount() {
      document.title = "Folder Photos - PhotoEditor";
    }


  render() {
    return (
      <div>
      <Menu username={localStorage.getItem('username')} />
      <NewFolderPicture
      fetchFolders={this.fetchFolders}
      fetchAllPhotos={this.fetchFolderPhotos}
      />
      <Favorites />
      <NotifyAlert
      flashMessage = {this.state.flashMessage}
      messageType = {this.state.messageType}
      showNotification={this.state.showNotification}
      />
      <Photo
      folderId={this.props.params.folderId}
      photos={this.state.photos}
      fetchAllPhotos={this.fetchFolderPhotos}
      displayFlashMessage={this.displayFlashMessage}/>
      </div>
    );
  }
}
