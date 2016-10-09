import React, { Component } from 'react';
import { Alert, Grid, Row, Col } from 'react-bootstrap';

const NotifyAlert = (props) => {
      return(
          <div className="notify-message">
          <Grid>
           <Row>
            <Col sm={12} md={9}>
            {props.showNotification ?
            <Alert bsStyle={props.messageType}>
                {props.flashMessage}
            </Alert> : null }
            </Col>
           </Row>
           </Grid>
          </div>
      );
    }

module.exports = NotifyAlert
