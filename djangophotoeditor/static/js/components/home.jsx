import React, { Component } from 'react';
import Menu from './menu.jsx';
import Login from './login.jsx';


const Home = (props) => {
  return (
    <div className="home-section">
    <Menu menustyle={{display:"none"}}
    />
    <Login />
    </div>
  );
}

module.exports = Home
