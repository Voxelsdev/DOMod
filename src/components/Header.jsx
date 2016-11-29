import React, { Component } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import Styles from './css/header';

class Header extends Component {
  constructor() {
    super();
    this.openBracket = '<';
    this.closingBracket = '/>';
  }

  render() {
    return (
      <header>
        <Link to="/"
              id={Styles.title}>&lt;DOMOD/&gt;</Link>
        <Link to="/login"
              id={Styles.login}>Login</Link>
        {/* <div
          className={classnames(styles.navbar, 'row')}>
          <div className="four columns offset-by-four" id={styles.titleContainer}>
            <p id={styles.title}>
              <Link  to="/"
              style={{
                color: '#373737',
                textDecoration: 'none',
                textTransform: 'uppercase',
              }}>
              <span id={styles.openBracket}>{this.openBracket} </span>DOMod <span id={styles.closingBracket}>/></span></Link>
            </p>
          </div>
        </div>
        <div className={classnames(styles.navbar, 'row')}>
          <div className="two columns login">
            <Link to="/login">
              <button className={classnames('u-full-width', styles.login)}>
                Login
              </button>
            </Link>
          </div>
        </div> */}
      </header>
    )
  }
}

export default Header;
