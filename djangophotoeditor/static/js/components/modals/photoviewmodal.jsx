import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default class PhotoViewModal extends Component{
  constructor() {
    super();
    this.state = {}
  }

  render(){
    return (
      <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-sm">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-sm">Your Photo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="image-view">
        <img src={this.props.photo.image} />
        </div>
        <br/>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
        </Modal.Body>

      </Modal>
    );
  }
}
