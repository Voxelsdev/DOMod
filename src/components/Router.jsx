import React, { Component } from 'react';
import { Match } from 'react-router';
import classnames from 'classnames';
import Main from './Main';
import Login from './Login';

class Router extends Component {
  render() {
    return (
      <div>
        <Match pattern="/" exactly component={Main} />
        <Match pattern="/js-player" component={Main} />
        <Match pattern="/login" component={Login} />
        {/* <Match pattern="/signup" component={Signup} /> */}
      </div>
    )
  }
}

export default Router;
