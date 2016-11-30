import React, { Component } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import Styles from './css/header';

class Header extends Component {
  constructor() {
    super();
  }

  render() {
    console.log(this.props);
    return (
      <header>
        <Link to="/" id={Styles.title}>&lt;DOMOD/&gt;</Link>
        {!this.props.loggedIn &&
          <Link to="/login" id={Styles.login}>Login</Link>
        }

        {this.props.loggedIn &&
          <div>
            <Link to="/profile" id={Styles.login}>Profile</Link>
            <Link to="/logout" id={Styles.login}>Logout</Link>
          </div>
        }

      </header>
    )
  }
}

export default Header;
