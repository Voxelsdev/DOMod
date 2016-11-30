import React, { Component } from 'react';
import { Match, Miss } from 'react-router';
import classnames from 'classnames';
import Main from './Main';
import Login from './Authenticate';

class Router extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
    }
    this.handleLoginState = this.handleLoginState.bind(this);
  }

  handleLoginState(isLogged) {
    if (!isLogged) {
      return this.setState({ loggedIn: isLogged });
    }

    this.setState({ loggedIn: isLogged });
  }

  render() {
    return (
      <div>
        <Match pattern="/" exactly component={Main}>

        </Match>
        <Match pattern="/js-player" component={Main}></Match>
        <Match pattern="/login" render={
          () => <Login
                  handleLoginState={this.handleLoginState}
                />}
        />
      </div>
    )
  }
}

export default Router;
