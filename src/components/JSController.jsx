import React, { Component } from 'react';

import Styles from './css/js-controller';

class JSController extends Component {

  render() {

    return (
      <div id={Styles.controlPanel}>
        <button className={Styles.controllerButton}>
          <img className={Styles.controlButtonIcon}
               src={require('file!./icons/last.png')} />
        </button>
        <p id={Styles.controllerTitle}>javascript controller</p>
        <button className={Styles.controllerButton}
                onClick={this.props.setSelectors}>
          <img className={Styles.controlButtonIcon}
               src={require('file!./icons/next.png')}/>
        </button>
      </div>
    );
  }
}

export default JSController;
