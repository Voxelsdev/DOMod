import React, { Component } from 'react';
import { BrowserRouter } from 'react-router';
import axios from 'axios';

import Header from './Header';
import Router from './Router';
import styles from './css/app';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedOut: false,
    }
    this.handleLoginState = this.handleLoginState.bind(this);
    this.getCookie = this.getCookie.bind(this);
  }

  getCookie(name) {
    let value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  }

  handleLoginState(isLoggingOut, isLoggingIn) {
    const isLoggedIn = (this.getCookie('loggedIn') === 'true');
    this.setState({ loggedIn: isLoggedIn });
    // if logged in and logging out
    if (isLoggedIn && isLoggingOut) {

      // sets login cookie to false, clears token
      axios('/auth/logout')
        .then(() => {

          // resets login state to cooke value
          return this.setState({ loggedIn: isLoggedIn });
        })
        .catch(err => {
          console.log(err);
        });
    }

    // if not logged in and is logging in
    if (!isLoggedIn && isLoggingIn) {
      // set login state to whatever the cookie is
      this.setState({ loggedIn: isLoggedIn });
      // send to github
      window.location.href = '/auth/github';
    }
  }

  componentDidMount() {
    this.handleLoginState(false);
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header
                loggedIn={this.state.loggedIn}
                handleLoginState={this.handleLoginState}/>
          <Router
                loggedIn={this.state.loggedIn}
                handleLoginState={this.handleLoginState}/>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
