import React, { Component } from 'react';
import {
    MenuItem,
    Navbar,
    Nav,
    NavItem,
    NavDropdown,
} from 'react-bootstrap';
import Notifications from 'react-notify-toast';

export default class Menu extends Component {
    constructor() {
    super();
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    localStorage.clear();
    this.context.router.push('/');
  }

  render() {
    return (
      <div>
      <Navbar staticTop={true}>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/dashboard/folders">PhotoEditor</a>
          </Navbar.Brand>
        </Navbar.Header>
        <div style={this.props.menustyle}>
          <Nav pullRight>
            <NavDropdown eventKey={1} title={this.props.username || ""} id="basic-nav-dropdown">
              <MenuItem onClick={this.handleLogout} eventKey={1.1}>Logout</MenuItem>
            </NavDropdown>
          </Nav>
          </div>
      </Navbar>
      </div>
        );
    }
  }


Menu.contextTypes = {
    router: React.PropTypes.object.isRequired
};
