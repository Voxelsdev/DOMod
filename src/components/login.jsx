import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './css/login';

class Login extends Component {
  render() {
    return (
      <div className="row">
        <div className="row">
          <div className={classnames('six', 'columns', 'offset-by-three')} id={styles.firstRow}>
            <input type="text" className="u-full-width" placeholder="Github Username"></input>
          </div>
        </div>
        <div className="row">
          <div className={classnames('six', 'columns', 'offset-by-three')}>
            <input type="password" className="u-full-width" placeholder="Don't use me? (aka password)"></input>
          </div>
        </div>
        <div className="row">
          <div className={classnames('three', 'columns', 'offset-by-six')}>
            <input className={classnames('u-full-width')} type="button" value="Login using GitHub" />
          </div>
        </div>
      </div>
    )
  }
}

export default Login;
