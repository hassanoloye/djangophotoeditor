import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

export default class FolderInfoModal extends Component{
  constructor() {
    super();
    this.state = {

    }
  }

  formatDate(date) {
    var date = new Date(date)
    return date.toString()
  }

  render(){
    return (
      <Modal {...this.props} bsSize="small" aria-labelledby="contained-modal-title-sm">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-sm">Folder Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p><strong>Name</strong>: {this.props.folder.name ? this.props.folder.name : "Untitled"}</p>
        <p><strong>Owner</strong>: {this.props.folder.owner}</p>
        <p><strong>Date Created</strong>: {this.formatDate(this.props.folder.date_created)}</p>
        <p><strong>Date Modified</strong>: {this.formatDate(this.props.folder.date_modified)}</p>

        <br/>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
        </Modal.Body>

      </Modal>
    );
  }
}
