import React, { Component } from 'react';
import { BrowserRouter } from 'react-router';

import Header from './Header';
import Router from './Router';
import styles from './css/app';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Router />
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
