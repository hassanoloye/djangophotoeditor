import React, { Component } from 'react';
import Notifications from 'react-notify-toast';

const Main = (props) => {
  return (
    <div>
      <Notifications />
      {props.children}
    </div>
  );
}

module.exports = Main
