import React, { Component } from 'react';
import { Button, Col, Form, FormGroup, FormControl, Modal } from 'react-bootstrap';

export default class PhotoInfoModal extends Component{
  constructor() {
    super();
    this.formatImageSize = this.formatImageSize.bind(this);
    this.state = {

    }
  }

  formatImageSize(bytes) {
   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
   if (bytes === 0) return '0 Byte';
   var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
   return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
  }

  formatDate(date) {
    var date = new Date(date)
    return date.toString()
  }

  render(){
    return (
      <Modal {...this.props} bsSize="small" aria-labelledby="contained-modal-title-sm">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-sm">Photo Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p><strong>Name</strong>: {this.props.photo.title ? this.props.photo.title : "Untitled"}</p>
        <p><strong>Uploader</strong>: {this.props.photo.uploader}</p>
        <p><strong>Folder</strong>: {this.props.photo.folder ? this.props.photo.folder : "No folder"}</p>
        <p><strong>Size</strong>: {this.formatImageSize(this.props.photo.image_size)}</p>
        <p><strong>Date Created</strong>: {this.formatDate(this.props.photo.date_created)}</p>
        <p><strong>Date Modified</strong>: {this.formatDate(this.props.photo.date_modified)}</p>

        <br/>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
        </Modal.Body>

      </Modal>
    );
  }
}
