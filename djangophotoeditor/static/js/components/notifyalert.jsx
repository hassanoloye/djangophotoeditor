import React, { Component } from 'react';
import { Alert, Grid, Row, Col } from 'react-bootstrap';

export default class NotifyAlert extends Component {
  constructor() {
  super();
  this.state = {
    showNotification: false,
    notificationMessage: '',
    messageType: 'success'
  }
}

  render() {
    return (
      <div className="notify-message">
      <Grid>
       <Row>
        <Col sm={12} md={9}>
        {this.props.showNotification ?
        <Alert bsStyle={this.props.messageType}>
            {this.props.flashMessage}
        </Alert> : null }
        </Col>
       </Row>
       </Grid>
      </div>
    )
  }
}
