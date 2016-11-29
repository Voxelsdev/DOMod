import React, { Component } from 'react';
import axios from 'axios';
import classnames from 'classnames';
import styles from './css/login';

class Login extends Component {
  handleLogin() {
    window.location.href = '/auth/github';
    // axios.get('/auth/github')
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(err => {
        // console.log('error: ', err);
    //   });
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
