import React, { Component } from 'react';
import styles from './css/login';

class Login extends Component {
  constructor() {
    super();
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    this.props.handleLoginState(false, true);
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
