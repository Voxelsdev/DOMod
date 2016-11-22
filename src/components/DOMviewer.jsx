import React, { Component } from 'react';

import DOMtree from './DOMtree';

import Styles from './css/domviewer.css';

class DOMviewer extends Component {
  render() {
    console.log(this.props.html)

    return (
      <svg id={Styles.domviewer}>
        <DOMtree tree={this.props.tree}
                 />
      </svg>
    )
  }
}

export default DOMviewer;
