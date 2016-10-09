import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Menu from './menu.jsx';
import request from 'superagent';
import FolderInfoModal from './modals/folderinfomodal.jsx';
import FolderEditModal from './modals/foldereditmodal.jsx';
import { ListGroup, ListGroupItem, DropdownButton, MenuItem, OverlayTrigger, Popover, Grid, Row, Col, Thumbnail, Pagination } from 'react-bootstrap';


export default class Folder extends Component {
  constructor() {
    super();
    this.displayAllFolders = this.displayAllFolders.bind(this);
    this.displaySingleFolder = this.displaySingleFolder.bind(this);
    this.fetchFolders = this.fetchFolders.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.updateFolder = this.updateFolder.bind(this);
    this.handleEditFolder = this.handleEditFolder.bind(this);
    this.deleteFolder = this.deleteFolder.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.state = {
      folders: [],
      folder: {},
      showFolderInfoModal: false,
      showFolderEditModal: false,
      folderName: '',
      folderId: 0,
      showNotification: false,
      notificationMessage: '',
      messageType: 'success',
      activePage: 1
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

  handleSelect(eventKey) {
    this.setState({
      activePage: eventKey
    });
    this.props.fetchFoldersByPage(eventKey)
  }

  componentWillMount() {
    this.fetchFolders();
  }

  componentDidMount() {
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
            folderPaginationCount: countValue
          });
        }
      });

  }

  displayAllFolders() {
    if (this.props.folders.length > 0) {
        return (
          this.props.folders.map((folder) => {
            return (
              this.displaySingleFolder(folder, (this.props.folders.indexOf(folder)+1).toString())
            );
          })
        );
      }
      else {
        return (
          <div className="no-folder">
            No folder yet.
          </div>
      );
      };
  }

  deleteFolder(folderId) {
    if (folderId === '' || folderId === 0 || folderId === undefined) {
      return;
    }
    request
      .delete('/api/v1/folder/'+folderId)
      .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
      .end((err, result) => {
        if (result) {
          if (result.status === 204) {
            this.props.fetchFolders();
            return this.props.displayFlashMessage("Folder succesfully deleted", "success")
            }
            var message = (("detail" in result.body) && !(result.body.detail === '')) ? result.body.detail : "Unable to delete folder"
            return this.props.displayFlashMessage(message, "danger")
        }
        return this.props.displayFlashMessage("An error occured", "danger")
      });
  }

  getInfo (folderDetails) {
    this.setState({
      showFolderInfoModal: true,
      folder: folderDetails})
  }

  editFolder(folderId, folderName) {
    this.setState({folderId: folderId,
                  folderName: folderName,
                  showFolderEditModal: true})
  }

  handleEditFolder(event) {
    event.preventDefault();
    this.updateFolder(this.state.folderId, this.state.folderName);
    this.setState({showFolderEditModal: false})
  }

  updateFolder(folderId, folderName) {
    if (folderName === '') {
      return
    }
    request
      .put('/api/v1/folder/'+folderId)
      .type('form')
      .set('Authorization', 'Bearer ' + localStorage
            .getItem('token'))
      .send({"name": folderName})
      .end((err, result) => {
        if (result) {
          if (result.status === 200) {
            this.props.fetchFolders();
            return this.props.displayFlashMessage("Folder succesfully updated", "success")
          }
          var message = (("detail" in result.body) && !(result.body.detail === '')) ? result.body.detail : "Unable to update folder"
          return this.props.displayFlashMessage(message, "danger")
        }
        return this.props.displayFlashMessage("An error occured", "danger")
      });
  }

  displaySingleFolder(folder, folderIndex) {
    return (
      <div key={folderIndex}>
      <Col sm={3} md={3}>
      <DropdownButton className="folder-options" title="Options" id="bg-nested-dropdown">
      <MenuItem eventKey="1" onClick={() => this.editFolder(folder.id, folder.name)}>Edit</MenuItem>
      <OverlayTrigger
        trigger="click"
        container={document.body}
        placement="top"
        rootClose={true}
        show={this.state.showDeletePopover}
        overlay={
          <Popover id = {folder.id} title="Do you really want to delete this folder? All contained photos will be deleted.">
            <a style={{ 'marginLeft': 60, position: 'relative' }} className="btn btn-danger"
              onClick={()=>this.deleteFolder(folder.id)}>Yes</a>
            <a style={{ 'marginLeft': 30, position: 'relative' }} className="btn btn-primary"
              onClick={() => this.setState({ showDeletePopover: false })}>No</a>
          </Popover>}>
          <MenuItem eventKey="2" title="Delete this folder">Delete</MenuItem>
      </OverlayTrigger>
      <MenuItem onClick={() => this.getInfo(folder)} eventKey="3" title="Get Folder Information">Get Info</MenuItem>
      </DropdownButton>
      <Thumbnail src="../static/img/folder.png" href={"/folder/"+folder.id} alt="Folder">
        <div className="folder-name">
        {folder.name}
        </div>
        <div className="folder-photo-count badge pull-right">
          {folder.photos.length}
        </div>
       </Thumbnail>
      </Col>
      </div>

    )
  }
  render() {
    let closeFolderInfoModal = () => this.setState({showFolderInfoModal: false})
    let closeFolderEditModal = () => this.setState({showFolderEditModal: false})
    return (
      <div>
      <div className="all-folder">
      <Grid>
         <Row>
          <Col sm={12} md={9}>
          {this.displayAllFolders()}
          </Col>
         </Row>
         {this.props.folders.length > 0 ?
         <Pagination
          prev
          next
          first
          last
          ellipsis
          items={this.props.folderPaginationCount}
          maxButtons={5}
          activePage={this.state.activePage}
          onSelect={this.handleSelect}
          />
          : null }
      </Grid>
      </div>
      <FolderEditModal
      show = {this.state.showFolderEditModal}
      onHide={closeFolderEditModal}
      folderName={this.state.folderName}
      onSave={this.handleEditFolder}
      handleFieldChange={this.handleFieldChange}
      />
      <FolderInfoModal
      show = {this.state.showFolderInfoModal}
      onHide={closeFolderInfoModal}
      folder={this.state.folder}
      />
      {this.state.showNotification ? notify.show(this.state.notificationMessage, this.state.messageType, 3000) : null}
      </div>
    );
  }
}
