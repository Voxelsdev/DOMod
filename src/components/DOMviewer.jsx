import React, { Component } from 'react';

import DOMtree from './DOMtree';

import Styles from './css/domviewer.css';

class DOMviewer extends Component {
  render() {

    return (
      <svg id={Styles.domviewer}>
        <DOMtree />
      </svg>
    )
  }
}

export default DOMviewer;
