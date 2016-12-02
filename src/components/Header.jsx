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
        <div className={classnames('four', 'columns', 'offset-by-four')} id={Styles.titleContainer}>
          <Link to="/" id={Styles.title}>&lt;DOMOD /&gt;</Link>
        </div>
        {!this.props.loggedIn &&
          <Link to="/login" className={Styles.navbtn}>Login</Link>
        }

        {this.props.loggedIn &&
          <div className="row" id={Styles.navbtnContainer}>
            <div className={classnames('one', 'columns')} id={Styles.profileContainer}>
              <Link to="/profile"
                    className={Styles.navbtn}>Profile</Link>
            </div>
            <div className={classnames('one', 'columns')} id={Styles.logoutContainer}>
              <Link to="/"
                    className={Styles.navbtn}
                    onClick={this.handleLogout}>Logout</Link>
            </div>
            {(this.props.loggedIn && window.location.href === ('http://localhost:3000/')) &&
              <div className={classnames('two', 'columns')}>
                <button id={Styles.savebtn}>Save Snippet</button>
              </div>
            }
          </div>
        }

      </header>
    )
  }
}

export default Header;
