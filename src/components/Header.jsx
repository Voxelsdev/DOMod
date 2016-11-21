import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './css/header';

class Header extends Component {
  render() {
    return (
      <header>
        <div
          className={classnames(styles.navbar, 'row')}
          id={styles.navbar}
        >
          <div className="three columns">
            <p id={styles.title}>DOMod</p>
          </div>
 
          <div className="two columns offset-by-five signup">
          <button className={classnames('u-full-width', styles.login)}>
            Signup
          </button>
          </div>

          <div className="two columns login">
            <button className={classnames('u-full-width', styles.login)}>
              Login
            </button>
          </div>
        </div>
      </header>
    )
  }
}

export default Header;
