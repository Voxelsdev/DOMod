import React, { Component } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import Styles from './css/header';

class Header extends Component {
  constructor() {
    super();
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.handleLoginState(true, false);
  }

  render() {
    return (
      <header>
        <Link to="/" id={Styles.title}>&lt;DOMOD/&gt;</Link>
        {!this.props.loggedIn &&
          <Link to="/login" id={Styles.login}>Login</Link>
        }

        {this.props.loggedIn &&
          <div>
            <Link to="/profile" id={Styles.login}>Profile</Link>
            <Link to="/"
                  id={Styles.login}
                  onClick={this.handleLogout}>Logout</Link>
          </div>
        }

      </header>
    )
  }
}

export default Header;
