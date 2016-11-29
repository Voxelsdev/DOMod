import React, { Component } from 'react';

import Style from './css/toggle';

class Toggle extends Component {
  render() {

    return (
      <div className={Style.toggleContainer}>
        <h5>Edit</h5>
        <label className={Style.switch}>
          <input type="checkbox"></input>
          <div className={Style.slider}></div>
        </label>
        <h5>Test</h5>
      </div>
    )
  }
}

export default Toggle;
