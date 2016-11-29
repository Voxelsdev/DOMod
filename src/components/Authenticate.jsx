import React, { Component } from 'react';
import axios from 'axios';
// import classnames from 'classnames';
import styles from './css/login';

class Login extends Component {
  handleLogin() {
    this.props.handleLoginState(true);
    window.location.href='/auth/github';
  }

  render() {
    return (
      <div className="row" id={styles.login}>
        <button
          className='button'
          id={styles.redirectBtn}
          onClick={this.handleLogin}>
        Login with GitHub!</button>
      </div>
    )
  }
}

export default Login;
