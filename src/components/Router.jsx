import React, { Component } from 'react';
import { Match, Miss } from 'react-router';
import classnames from 'classnames';
import Main from './Main';
import Profile from './Profile';
import Login from './Authenticate';

class Router extends Component {
  render() {
    return (
      <div>
        <Match pattern="/" exactly render= {
          () => <Main html={this.props.html}
                      js={this.props.js}
                      setHTML={this.props.setHTML}
                      setJS={this.props.setJS} />
        } />
        {/* <Match pattern="/profile" component={Profile} />
        <Match pattern="/login" render={
          () => <Login
                  handleLoginState={this.props.handleLoginState}
                />}
        /> */}
      </div>
    )
  }
}

export default Router;
