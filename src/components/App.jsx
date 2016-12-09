import React, { Component } from 'react';
import { BrowserRouter } from 'react-router';
import axios from 'axios';

import Header from './Header';
import Router from './Router';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      snippetId: null,
      html: localStorage.html || '<body><!-- Add html here --></body>',
      js: localStorage.js || '// Put body of JS function here',
    }
    this.handleLoginState = this.handleLoginState.bind(this);
    this.getCookie = this.getCookie.bind(this);
    this.setHTML = this.setHTML.bind(this);
    this.setJS = this.setJS.bind(this);
    this.handleSnippetState = this.handleSnippetState.bind(this);
  }

  setHTML(html) {
    localStorage.html = html;
    this.setState({ html });
  }

  setJS(js) {
    localStorage.js = js;
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

  handleSnippetState(newId) {
    this.setState({ snippetId: newId });
  }

  componentDidMount() {
    this.handleLoginState(false);
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header
                html={this.state.html}
                javascript={this.state.js}
                loggedIn={this.state.loggedIn}
                snippetId={this.state.snippetId}
                handleSnippetState={this.handleSnippetState}
                handleLoginState={this.handleLoginState}/>
          <Router
                loggedIn={this.state.loggedIn}
                html={this.state.html}
                js={this.state.js}
                snippetId={this.state.snippetId}
                setHTML={this.setHTML}
                setJS={this.setJS}
                handleSnippetState={this.handleSnippetState}
                handleLoginState={this.handleLoginState}/>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
