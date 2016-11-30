import React, { Component } from 'react';
import { BrowserRouter } from 'react-router';

import Header from './Header';
import Router from './Router';
import styles from './css/app';

class App extends Component {
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
      <BrowserRouter>
        <div>
          <Header loggedIn={this.state.loggedIn}/>
          <Router handleLoginState={this.handleLoginState}/>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
