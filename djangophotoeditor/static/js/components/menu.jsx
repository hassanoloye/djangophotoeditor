import React, { Component } from 'react';
import {
    MenuItem,
    Navbar,
    Nav,
    NavItem,
    NavDropdown,
} from 'react-bootstrap';

const Menu = (props) => {
  return (
    <Navbar staticTop={true}>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="#">PhotoEditor</a>
        </Navbar.Brand>
      </Navbar.Header>
      <div style={props.menustyle}>
        <Nav pullRight>
          <NavDropdown eventKey={3} title={props.username || ""} id="basic-nav-dropdown">
            <MenuItem onClick={props.handleLogout} eventKey={3.1}>Logout</MenuItem>
          </NavDropdown>
        </Nav>
        </div>
    </Navbar>
      );
}

module.exports = Menu;
