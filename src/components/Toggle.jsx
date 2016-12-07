import React, { Component } from 'react';

import Styles from './css/toggle';

class Toggle extends Component {
  render() {

    return (
      <div className={Styles.toggleContainer}>
        <p>EDIT</p>
        <label className={Styles.switch}>
          <input type="checkbox"
                 onClick={this.props.setTestMode}></input>
          <div className={Styles.slider}></div>
        </label>
        <p>TEST</p>
      </div>
    )
  }
}

export default Toggle;
