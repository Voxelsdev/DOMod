import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './css/login';

class Login extends Component {
  render() {
    return(
      <div className="row">
        <div className={classnames('row', 'sometext')}>
          <div className={classnames('six', 'columns', 'offset-by-three')}>
            <input type="text"></input>
          </div>
        </div>
        <div className="row">
          <div className={classnames('six', 'columns', 'offset-by-three')}>
            <input type="password"></input>
          </div>
        </div>
      </div>
    )
  }
}
