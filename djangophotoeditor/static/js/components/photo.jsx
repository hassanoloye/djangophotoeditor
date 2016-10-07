import React, { Component } from 'react';
import Menu from './menu.jsx';
import request from 'superagent';
import PhotoInfoModal from './modals/photoinfomodal.jsx';
import PhotoEditModal from './modals/photoeditmodal.jsx';
import { DropdownButton, MenuItem, OverlayTrigger, Popover, Thumbnail } from 'react-bootstrap';
import Notifications, { notify } from 'react-notify-toast';

export default class Photo extends Component {
  constructor() {
    super();
    this.fetchFolderPhotos = this.fetchFolderPhotos.bind(this);
    this.fetchAllPhotos = this.fetchAllPhotos.bind(this);
    this.displayAllPhotos = this.displayAllPhotos.bind(this);
    this.displaySinglePhoto = this.displaySinglePhoto.bind(this);
    this.getInfo =this.getInfo.bind(this);
    this.editPhoto = this.editPhoto.bind(this);
    this.sharePix = this.sharePix.bind(this);
    this.deletePhoto= this.deletePhoto.bind(this);
    this.state = {
      photos: [],
      photoPaginationCount: 0,
      showPhotoInfoModal: false,
      showPhotoEditModal: false,
      photo: {},
      showDeletePopover: false,
      showNotification: false,
      notificationMessage: '',
      messageType: 'success'
    }
  }

  componentWillMount() {
    if (this.props.folderId) {
      return this.fetchFolderPhotos(this.props.folderId)
    }
    return this.fetchAllPhotos();
  }

  componentDidMount() {
    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    window.fbAsyncInit = function() {
      FB.init({
        appId      : '1516688595023754',
        cookie     : true,
        xfbml      : true,
        version    : 'v2.7'
      });
    }
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

  fetchFolderPhotos(folderId) {
    request
      .get('/api/v1/folder/'+folderId)
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

    displayAllPhotos() {
      if (this.state.photos.length > 0) {
          return (
            this.state.photos.map((photo) => {
              return (
                this.displaySinglePhoto(photo, (this.state.photos.indexOf(photo)+1).toString())
              );
            })
          );
        }
        else {
          return (
            <div className="no-photo">
              No photo yet.
            </div>
        );
        };
    }

    getInfo (photoDetails) {
      this.setState({
        showPhotoInfoModal: true,
        photo: photoDetails})
    }

    deletePhoto(photoId) {
      if (photoId === '' || photoId === 0 || photoId === undefined) {
        return;
      }
      request
        .delete('/api/v1/photo/'+photoId)
        .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
        .end((err, result) => {
          if (result) {
            if (result.status === 204) {
              this.fetchAllPhotos();
              this.setState({notificationMessage: 'Successfully Deleted',
                            messageType: 'success',
                            showNotification: true})
              return;
            }
            }
            this.setState({notificationMessage: 'Photo Not Deleted',
                          messageType: 'danger',
                          showNotification: true})
            return;
        });
    }

    sharePix(photo) {
      FB.ui({
        method: 'share',
        name: 'Edit photos',
        href: location.protocol + '//' + location.host + '/photo/' + photo.id,
        caption: 'Bring your photos to life with Photo Editor!!!',
        picture: photo.image,
        description: 'Apply Filters.'
      });
    }

    editPhoto(photoDetails) {
      this.setState({showPhotoEditModal: true,
                    photo: photoDetails})
    }

    displaySinglePhoto(photo, photoIndex) {
      return (
        <div key={photoIndex}>
        <div className="col-sm-3 col-md-3">
        <DropdownButton className="photo-options" title="Options" id="bg-nested-dropdown">
        <MenuItem eventKey="1" onClick={()=>this.editPhoto(photo)}>Edit</MenuItem>
        <MenuItem eventKey="2" onClick={()=>this.sharePix(photo)}>Share</MenuItem>
        <MenuItem eventKey="3" onClick={()=>this.getInfo(photo)}>Get Info</MenuItem>
        <OverlayTrigger
          trigger="click"
          container={document.body}
          placement="top"
          rootClose={true}
          show={this.state.showDeletePopover}
          overlay={
            <Popover id = {photo.id} title="Do you really want to delete this photo?">
              <a style={{ 'marginLeft': 60, position: 'relative' }} className="btn btn-danger"
                onClick={()=>this.deletePhoto(photo.id)}>Yes</a>
              <a style={{ 'marginLeft': 30, position: 'relative' }} className="btn btn-primary"
                onClick={() => this.setState({ showDeletePopover: false })}>No</a>
            </Popover>}>
            <MenuItem eventKey="4" title="Delete this photo">Delete</MenuItem>
        </OverlayTrigger>
      </DropdownButton>
      <Thumbnail src={photo.image}>
        <div className="photo-name">
          {photo.title}
        </div>
       </Thumbnail>
        </div>
        </div>
      )
    }

  render() {
    let closePhotoInfoModal = () => this.setState({showPhotoInfoModal: false})
    let closePhotoEditModal = () => this.setState({showPhotoEditModal: false})

    return (
      <div>
      <div className="all-photos">
      <div className="container">
      <div className="row">
      <div className="col-sm-12 col-md-9">
         {this.displayAllPhotos()}
      </div>
      </div>
      </div>
      </div>
      <PhotoInfoModal
      show = {this.state.showPhotoInfoModal}
      onHide={closePhotoInfoModal}
      photo={this.state.photo}
      />
      <PhotoEditModal
      show = {this.state.showPhotoEditModal}
      onHide={closePhotoEditModal}
      photo={this.state.photo}
      />
      {this.state.showNotification ? notify.show(this.state.notificationMessage, this.state.messageType, 3000) : null}
      </div>
    );
  }
}
