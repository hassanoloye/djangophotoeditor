import React, { Component } from 'react';
import NewFolder from './newfolder.jsx';
import UploadPhoto from './uploadphoto.jsx';

const NewFolderPicture = (props) => {
      return(
        <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-4">
            <div className="new-folder-picture">
              <NewFolder
              fetchFolders={props.fetchFolders}
              displayFlashMessage={props.displayFlashMessage}/>
              <UploadPhoto fetchAllPhotos={props.fetchAllPhotos}/>
              <hr/>
            </div>
          </div>
        </div>
      );
    }

module.exports = NewFolderPicture
