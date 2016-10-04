import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';
import Folder from './folder.jsx';
import FolderModal from './modals/foldermodal.jsx';
import { notify } from 'react-notify-toast';

export default class NewFolder extends Component {
    constructor() {
        super();
        this.handleSaveNewFolder = this.handleSaveNewFolder.bind(this);
        this.createNewFolder = this.createNewFolder.bind(this);
        this.saveNewFolder = this.saveNewFolder.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.state = {
          newFolderName: '',
          showNotification: false,
          notificationMessage: '',
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

    handleSaveNewFolder(event) {
      event.preventDefault();
      this.saveNewFolder(this.state.newFolderName);
      this.setState({showNewFolderForm: false})
    }

    createNewFolder() {
      this.setState({ showNewFolderForm: true })
    }

    saveNewFolder(folderName) {
      if (folderName === '') {
        return;
      }
      request
        .post('/api/v1/folder/')
        .type('form')
        .set('Authorization', 'Bearer ' + localStorage
              .getItem('token'))
        .send({"name": folderName})
        .end((err, result) => {
          if (result) {
            if (result.status === 201) {
              this.context.router.push("/dashboard/folders")
              this.setState({notificationMessage: 'Folder created sucessfully',
                            messageType: 'success',
                            showNotification: true})
              return;
            }
          }
        });
    }

    render() {
      let closeNewFolderForm = () => this.setState({ showNewFolderForm: false });
      return(
        <div>
        <a onClick={this.createNewFolder} title="New Folder" className="btn toolbar new-folder"><span className="glyphicon glyphicon-folder-close"></span>&emsp;New Folder
        </a>
        <FolderModal
          show={this.state.showNewFolderForm}
          onHide={closeNewFolderForm}
          handleFieldChange={this.handleFieldChange}
          onSave={this.handleSaveNewFolder}
          formName="newFolderName"
          placeholder="Enter folder name"
        />
        {this.state.showNotification ? notify.show(this.state.notificationMessage, this.state.messageType, 3000) : null}
        </div>
      );
    }
}

NewFolder.contextTypes = {
    router: React.PropTypes.object.isRequired
};
