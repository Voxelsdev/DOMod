import React, { Component } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import Styles from './css/header';

class Header extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <header>
        <Link to="/"
              id={Styles.title}>&lt;DOMOD/&gt;</Link>
        <Link to="/login"
              id={Styles.login}>Login</Link>
      </header>
    )
  }
}

export default Header;
