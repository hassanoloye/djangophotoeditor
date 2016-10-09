import React, { Component } from 'react';
import NewFolder from './newfolder.jsx';
import UploadPhoto from './uploadphoto.jsx';

export default class NewFolderPicture extends Component {
    constructor() {
        super();
        this.state = {
        }
    }

    render() {
      return(
        <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-4">
            <div className="new-folder-picture">
              <NewFolder
              fetchFolders={this.props.fetchFolders}
              displayFlashMessage={this.props.displayFlashMessage}/>
              <UploadPhoto fetchAllPhotos={this.props.fetchAllPhotos}/>
              <hr/>
            </div>
          </div>

        </div>
      );
    }
}

NewFolder.contextTypes = {
    router: React.PropTypes.object.isRequired
};
