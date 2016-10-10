import React, { Component } from 'react';
import { Button, Col, Form, FormGroup, FormControl, Modal, Alert } from 'react-bootstrap';
import request from 'superagent';

export default class PhotoEditModal extends Component {
    constructor() {
      super();
      this.setFilter = this.setFilter.bind(this);
      this.updateFilter = this.updateFilter.bind(this);
      this.updatePhoto = this.updatePhoto.bind(this);
      this.handleUpdatePhoto = this.handleUpdatePhoto.bind(this);
      this.handleFieldChange = this.handleFieldChange.bind(this);
      this.displayFlashMessage = this.displayFlashMessage.bind(this);
      this.state = {
        flashMessage: '',
        filters: [],
        isEdited: false,
        edited_image: '',
        title: '',
        messageType: 'success',
        image: '',
        editingInProcess: false
      }
    }

    componentWillUnMount() {
      this.setState({image: ''})
    }

    updateFilter(filterType) {
      if (!(this.state.filters.includes(filterType))) {
        this.state.filters.push(filterType)
      }
      return this.state.filters.join()
    }

    displayFlashMessage(message, messageType) {
      this.setState({flashMessage: message,
                    messageType: messageType});
      setTimeout(function() {
        this.setState({flashMessage: ""});
      }.bind(this), 3000);
    }

    setFilter(filterType) {
      this.setState({isEdited: false, editingInProcess:true});

      var filters = this.updateFilter(filterType);
      this.updatePhoto(this.props.photo.id, filters)
    }

    getImagePath(image) {
      return image + '?' + (Math.floor(Math.random() * 1000000) + 1)
    }

    updatePhoto(photoId, filters, save=false, title='') {
      if (!filters & !photoId & !title) {
        return;
      }
      var data = {};
      data["filters"] = filters;
      if (save) {
        data["save"] = true
      }
      if (title) {
        data["title"] = title
      }
      request
        .put('/api/v1/photo/'+photoId)
        .type('form')
        .set('Authorization', 'Bearer ' + localStorage
              .getItem('token'))
        .send(data)
        .end((err, result) => {
          if (result) {
            if (result.status === 200) {
              this.setState({edited_image: this.getImagePath('../uploads/' + result.body.edited_image),
                            isEdited: true,
                            editingInProcess: false
                });
              if (save) {
                this.setState({filters: [],
                              image: this.getImagePath(result.body.image),
                              editingInProcess: false})
                this.props.fetchAllPhotos();
                return this.displayFlashMessage('Photo Updated', 'success');
              }
            }
          }
        });
    }

    handleFieldChange(event) {
        event.preventDefault();
        let key = event.target.name;
        let value = event.target.value;
        this.setState({
            [key]: value
        });
    }

    handleUpdatePhoto(event) {
      event.preventDefault();
      this.updatePhoto(this.props.photo.id, this.state.filters.join(),
          true, this.state.title)
    }

    render() {
      return(
        <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-sm">
          <Modal.Header closeButton onHide={()=>this.setState({image: '', isEdited: false })}>
            <Modal.Title id="contained-modal-title-sm">Edit Your Photo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          { this.state.flashMessage ? <Alert bsStyle={this.state.messageType}>
              {this.state.flashMessage}
          </Alert>
          : null}
          <Form action="post" onSubmit={this.handleUpdatePhoto}>
          <FormGroup>
             <Col><strong>Title: </strong>
               <FormControl
                 name="title" type="text" required = {false} placeholder="Title your image"
                 value={this.state.title || this.props.photo.title} onChange={this.handleFieldChange}
               />
             </Col>
             </FormGroup>
             <br/>
             {this.state.editingInProcess ?
             <img className="loading-image" src="../static/img/loading.gif"/> : null }

          <div className="image-preview-edit">
            {this.state.isEdited ?
            <img src = {this.state.edited_image} /> :
            <img src = {this.state.image || this.props.photo.image} />
            }
          </div>
          <div className="edit-options">
            <hr/>
            <div className="blur filter">
              <img onClick={()=>this.setFilter("blur")} src="../static/img/filters/blur.png"/>
              <div className="filter-name">Blur</div>
            </div>
            <div className="contour filter">
            <img onClick={()=>this.setFilter("contour")} src="../static/img/filters/contour.png"/>
              <div className="filter-name">Contour</div>
            </div>
            <div className="details filter">
            <img onClick={()=>this.setFilter("detail")} src="../static/img/filters/details.png"/>
              <div className="filter-name">Details</div>
            </div>
            <div className="edge_enhance filter">
            <img onClick={()=>this.setFilter("edge_enhance")} src="../static/img/filters/edge_enhance.png"/>
              <div className="filter-name">Edge</div>
            </div>
            <div className="edge_enhance_more filter">
            <img onClick={()=>this.setFilter("edge_enhance_more")} src="../static/img/filters/edge_enhance_more.png"/>
              <div className="filter-name">Edge More</div>
            </div>
            <div className="emboss filter">
            <img onClick={()=>this.setFilter("emboss")} src="../static/img/filters/emboss.png"/>
              <div className="filter-name">Emboss</div>
            </div>
            <div className="find_edges filter">
            <img onClick={()=>this.setFilter("find_edges")} src="../static/img/filters/find_edges.png"/>
              <div className="filter-name">Find Edges</div>
            </div>
            <div className="gaussian_blur filter">
            <img onClick={()=>this.setFilter("gaussian_blur")} src="../static/img/filters/gaussian_blur.png"/>
              <div className="filter-name">Gaussian Blur</div>
            </div>
            <div className="max_filter filter">
            <img onClick={()=>this.setFilter("max_filter")} src="../static/img/filters/max_filter.png"/>
              <div className="filter-name">Max Filter</div>
            </div>
            <div className="med_filter filter">
            <img onClick={()=>this.setFilter("med_filter")} src="../static/img/filters/med_filter.png"/>
              <div className="filter-name">Med Filter</div>
            </div>
            <div className="min_filter filter">
            <img onClick={()=>this.setFilter("min_filter")} src="../static/img/filters/min_filter.png"/>
              <div className="filter-name">Min Filter</div>
            </div>
            <div className="mode_filter filter">
            <img onClick={()=>this.setFilter("mode_filter")} src="../static/img/filters/mode_filter.png"/>
              <div className="filter-name">Mode Filter</div>
            </div>
            <div className="sharpen filter">
            <img onClick={()=>this.setFilter("sharpen")} src="../static/img/filters/sharpen.png"/>
              <div className="filter-name">Sharpen</div>
            </div>
            <div className="smooth filter">
            <img onClick={()=>this.setFilter("smooth")} src="../static/img/filters/smooth.png"/>
              <div className="filter-name">Smooth</div>
            </div>
            <div className="smooth_more filter">
            <img onClick={()=>this.setFilter("smooth_more")} src="../static/img/filters/smooth_more.png"/>
              <div className="filter-name">Smooth More</div>
            </div>
            <div className="unsharp_mask filter">
            <img onClick={()=>this.setFilter("unsharp_mask")} src="../static/img/filters/unsharp_mask.png"/>
              <div className="filter-name">Unsharp Mask</div>
            </div>
            <hr/>
          </div>
          <Modal.Footer>
            <FormGroup>
            <Button bsStyle="default" onClick={() => this.setState({ isEdited: false, filters: [] })}>Discard Changes</Button>
            <Button type="submit" bsStyle="primary">Save</Button>
            </FormGroup>
          </Modal.Footer>
          </Form>
          </Modal.Body>
        </Modal>
      );
    }
}
