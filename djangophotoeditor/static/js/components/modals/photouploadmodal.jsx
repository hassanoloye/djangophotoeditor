import React, { Component } from 'react';
import request from 'superagent';
import { Button, Col, Form, FormGroup, FormControl, Modal, Alert } from 'react-bootstrap';
import Dropzone from 'react-dropzone';
export default class PhotoUploadModal extends Component{

  constructor() {
      super();
      this.handleFieldChange = this.handleFieldChange.bind(this);
      this.handleSaveNewPhoto = this.handleSaveNewPhoto.bind(this);
      this.saveNewPhoto = this.saveNewPhoto.bind(this);
      this.sendPhotoToApi = this.sendPhotoToApi.bind(this);
      this.clearImage = this.clearImage.bind(this);
      this.onDrop = this.onDrop.bind(this);
      this.fetchFolders = this.fetchFolders.bind(this);
      this.displayFolderOptions = this.displayFolderOptions.bind(this);
      this.displayFlashMessage = this.displayFlashMessage.bind(this);
      this.state = {
        files: [],
        title: '',
        folderId: 0,
        folders: [],
        flashMessage: '',
        messageType: 'success'
      }
  }

  handleFieldChange(event) {
      event.preventDefault();
      let key = event.target.name;
      let value = event.target.value;
      this.setState({
          [key]: value
      });
  }

  componentWillMount() {
    this.fetchFolders()
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
          });
        }
      });

  }

  clearImage() {
    this.setState({files: []})
  }

  onDrop (files) {
    this.setState({
      files: files
    });
  }

  displayFlashMessage(message, messageType) {
    this.setState({flashMessage: message,
                  messageType: messageType});
    setTimeout(function() {
      this.setState({flashMessage: ""});
    }.bind(this), 3000);
  }

  saveNewPhoto(folderId, files, title) {
    if (files === []) {
      return;
    }
    var image = files[0]
    return this.sendPhotoToApi(folderId, image, title)
  }

  sendPhotoToApi(folderId, image, title) {
    let url = '/api/v1/photo/'
    if (folderId != '0') {
      url = '/api/v1/folder/'+folderId+'/photos'
    }
    var data = new FormData();
    data.append('image', image)
    data.append('title', title)
    fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      body: data
    })
    .then(function(result) {
      if (result.status === 201) {
        this.clearImage();
        this.props.fetchAllPhotos();
        return this.displayFlashMessage('Succesfully uploaded', 'success');
      }
      return this.displayFlashMessage('Unable to upload. Ensure you select a valid image', 'danger')
    }.bind(this))
    .catch(function(error) {
      return this.displayFlashMessage('An error occured. Please try again', 'danger')
    }.bind(this))
  }

  handleSaveNewPhoto(event) {
    event.preventDefault();
    this.saveNewPhoto(this.state.folderId, this.state.files, this.state.title)
  }

  displayFolderOptions() {
    if (this.state.folders.length > 0) {
        return (
          this.state.folders.map((folder) => {
            return (
              <option value={folder.id}>{folder.name}</option>
            );
          })
        );
      }
  }
  render(){
    return (
      <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-sm">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-sm">Upload Your Photo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        { this.state.flashMessage ? <Alert bsStyle={this.state.messageType}>
            {this.state.flashMessage}
        </Alert>
        : null}
        <Form action="post" onSubmit={this.handleSaveNewPhoto} className="folder">
        <FormGroup>
           <Col><strong>Title: </strong>
             <FormControl
               name="title" type="text" required = {false} placeholder="Title your image" onChange={this.handleFieldChange}
             />
           </Col>
           <br/>
           <Col><strong>Folder: </strong>
           <FormControl name="folderId" componentClass="select" placeholder="Choose folder" onChange={this.handleFieldChange}>
                <option value={'0'}>Base folder</option>
             {this.displayFolderOptions()}
           </FormControl>
           </Col>
        </FormGroup>
        <div className="image-preview">
        {this.state.files.length > 0 ? <div>
        <div>{this.state.files.map((file) => <img src={file.preview} /> )}</div>
        </div> : <Dropzone className="dropzone-area" multiple={false} ref="dropzone" onDrop={this.onDrop} accept="image/*">
              <div className="dropzone-text">Drop image here or click to upload.</div>
        </Dropzone>}
        </div>
        <Modal.Footer>
          <FormGroup>
          <Button onClick={this.clearImage}>Clear</Button>
          <Button type="submit" disabled={this.state.files.length > 0 ? false : true} className="btn btn-primary">Save</Button>
          </FormGroup>

        </Modal.Footer>
        </Form>
        </Modal.Body>

      </Modal>
    );
  }
}
