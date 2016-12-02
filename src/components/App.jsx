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
      loggedIn: false,
      html: '<body><!-- Add html here --></body>',
      js: '// Put body of JS function here'
    }
    this.handleLoginState = this.handleLoginState.bind(this);
    this.getCookie = this.getCookie.bind(this);
    this.setHTML = this.setHTML.bind(this);
    this.setJS = this.setJS.bind(this);
  }

  setHTML(html) {
    localStorage.html = html;
    this.setState({ html });
  }

  setJS(js) {
    localStorage.javascript = js;
    this.setState({ js });
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
      axios('/auth/logout')
        .then(() => {
          return this.setState({ loggedIn: isLoggedIn });
        })
        .catch(err => {
          console.log(err);
        });
    }

    // if not logged in and is logging in
    if (!isLoggedIn && isLoggingIn) {
      this.setState({ loggedIn: isLoggedIn });
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
                html={this.state.html}
                js={this.state.js}
                setHTML={this.setHTML}
                setJS={this.setJS}
                handleLoginState={this.handleLoginState}/>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
