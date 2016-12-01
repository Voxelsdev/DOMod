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
        <Link to="/" id={Styles.title}>&lt;DOMOD /&gt;</Link>
        {!this.props.loggedIn &&
          <Link to="/login" className={Styles.navbtn}>Login</Link>
        }

        {(this.props.loggedIn && window.location.href !== process.env.HOST) &&
          <a className={Styles.navbtn}>Save Snippet</a>
        }

        {this.props.loggedIn &&
          <div>
            <Link to="/profile" className={Styles.navbtn}>Profile</Link>
            <Link to="/"
                  className={Styles.navbtn}
                  onClick={this.handleLogout}>Logout</Link>
          </div>
        }

      </header>
    )
  }
}

export default Header;
