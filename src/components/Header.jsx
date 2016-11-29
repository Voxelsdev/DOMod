import React, { Component } from 'react';
import { Link } from 'react-router';
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
            <p id={styles.title}><Link  to="/"
                                        style={{
                                          color: '#373737',
                                          textDecoration: 'none',
                                          textTransform: 'uppercase',
                                        }}>
                                        DOMod</Link></p>
          </div>

          <div className="two columns login offset-by-seven">
            <Link to="/login">
              <button className={classnames('u-full-width', styles.login)}>
                Login
              </button>
            </Link>
          </div>
        </div>
      </header>
    )
  }
}

export default Header;
