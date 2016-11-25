import React, { Component } from 'react';
import { Match } from 'react-router';
import MainApp from './MainApp';
// import Signup from './signup';
import Login from './Login';

class Main extends Component {
  render() {
    return (
      <div>
        <Match pattern="/" exactly component={MainApp} />
        <Match pattern="/login" exactly component={Login} />
        {/* <Match pattern="/signup" component={Signup} /> */}
      </div>
    )
  }
}

export default Main;
