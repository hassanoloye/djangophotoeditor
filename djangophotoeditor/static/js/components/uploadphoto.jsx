import React, { Component } from 'react';
import PhotoUploadModal from './modals/photouploadmodal.jsx';

export default class UploadPhoto extends Component {
    constructor() {
        super();
        this.openUploadModal = this.openUploadModal.bind(this);
        this.state = {
          showUploadPhotoModal: false,
        }
    }

    openUploadModal() {
      this.setState({showUploadPhotoModal: true})
    }

    render() {
      let closeUploadPhotoModal = () => this.setState({ showUploadPhotoModal: false });
      return(
        <div>
        <a onClick={this.openUploadModal} title="Upload New Photo" className="btn toolbar new-picture"><span className="glyphicon glyphicon-upload"></span>&emsp;Upload Photo
        </a>
        <PhotoUploadModal
          show={this.state.showUploadPhotoModal}
          onHide={closeUploadPhotoModal}
          handleFieldChange={this.handleFieldChange}
          onSave={this.handleSaveNewPhoto}
          fetchAllPhotos={this.props.fetchAllPhotos}
        />
        </div>
      );
    }
}

UploadPhoto.contextTypes = {
    router: React.PropTypes.object.isRequired
};
