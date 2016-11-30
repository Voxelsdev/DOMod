import React, { Component } from 'react';

import Style from './css/toggle';

class Toggle extends Component {
  render() {

    return (
      <div className={Style.toggleContainer}>
        <p>EDIT</p>
        <label className={Style.switch}>
          <input type="checkbox"
                 onClick={this.props.setTestMode}></input>
          <div className={Style.slider}></div>
        </label>
        <p>TEST</p>
      </div>
    )
  }
}

export default Toggle;
