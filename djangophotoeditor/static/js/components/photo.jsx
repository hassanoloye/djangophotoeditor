import React, { Component } from 'react';
import request from 'superagent';
import PhotoInfoModal from './modals/photoinfomodal.jsx';
import PhotoEditModal from './modals/photoeditmodal.jsx';
import PhotoViewModal from './modals/photoviewmodal.jsx';
import { DropdownButton, MenuItem, OverlayTrigger, Popover, Thumbnail, Pagination } from 'react-bootstrap';

export default class Photo extends Component {
  constructor() {
    super();
    this.fetchAllPhotos = this.fetchAllPhotos.bind(this);
    this.displayAllPhotos = this.displayAllPhotos.bind(this);
    this.displaySinglePhoto = this.displaySinglePhoto.bind(this);
    this.getInfo =this.getInfo.bind(this);
    this.editPhoto = this.editPhoto.bind(this);
    this.viewPhoto = this.viewPhoto.bind(this);
    this.sharePix = this.sharePix.bind(this);
    this.deletePhoto= this.deletePhoto.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.state = {
      photos: [],
      photoPaginationCount: 0,
      showPhotoInfoModal: false,
      showPhotoEditModal: false,
      showPhotoViewModal: false,
      photo: {},
      showDeletePopover: false,
      showNotification: false,
      notificationMessage: '',
      messageType: 'success',
      activePage: 1
    }
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

  handleSelect(eventKey) {
    this.setState({
      activePage: eventKey
    });
    this.props.fetchPhotosByPage(eventKey)
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

    displayAllPhotos() {
      if (this.props.photos.length > 0) {
          return (
            this.props.photos.map((photo) => {
              return (
                this.displaySinglePhoto(photo, (this.props.photos.indexOf(photo)+1).toString())
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

    viewPhoto (photoDetails) {
      this.setState({
        showPhotoViewModal: true,
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
              this.props.fetchAllPhotos();
              return this.props.displayFlashMessage('Photo successfully deleted', 'success')
            }
            var message = (("detail" in result.body) && !(result.body.detail === '')) ? result.body.detail : "Unable to delete bucketlist"
            return this.pros.displayFlashMessage(message, "danger")
            }
            return this.props.displayFlashMessage("An error occured", "danger")
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
        <MenuItem eventKey="4" href={photo.image} download>Download</MenuItem>

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
      <Thumbnail src={photo.image} onClick={()=>this.viewPhoto(photo)}>
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
    let closePhotoViewModal = () => this.setState({showPhotoViewModal: false})

    return (
      <div>
      <div className="all-photos">
      <div className="container">
      <div className="row">
      <div className="col-sm-12 col-md-9">
         {this.displayAllPhotos()}
      </div>
      </div>
      {this.props.photos.length > 0 & !(this.props.folderId)?
      <Pagination
       prev
       next
       first
       last
       ellipsis
       items={this.props.photoPaginationCount}
       maxButtons={5}
       activePage={this.state.activePage}
       onSelect={this.handleSelect}
       />
       : null }
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
      fetchAllPhotos={this.props.fetchAllPhotos}
      />
      <PhotoViewModal
      show={this.state.showPhotoViewModal}
      onHide={closePhotoViewModal}
      photo={this.state.photo}
      />
      </div>
    );
  }
}
