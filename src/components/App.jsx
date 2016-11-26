import React, { Component } from 'react';
import { BrowserRouter } from 'react-router';

import Header from './Header';
import Main from './Main';
import Styles from './css/app';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Main />
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
