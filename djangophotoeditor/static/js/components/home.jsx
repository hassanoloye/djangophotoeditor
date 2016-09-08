import React, { Component } from 'react';
import Menu from './menu.jsx';
import { Button } from 'react-bootstrap';
import ImageSlider from './imageslider.jsx';
import Login from './login.jsx';
export default class Home extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

        render() {
          return(
            <div>
            <Menu menustyle={{display:"none"}}
            />
            <ImageSlider />
            <Login />
            </div>
          );
        }
}

Home.contextTypes = {
    router: React.PropTypes.object.isRequired
};
