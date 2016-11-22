import React, { Component } from 'react';

import DOMtree from './DOMtree';

import Styles from './css/domviewer.css';

class DOMviewer extends Component {
  render() {

    return (
      <svg id={Styles.domviewer}>
        <DOMtree tree={this.props.tree}
                 bbox={this.props.bbox}
                 updateBBox={this.props.updateBBox}/>
      </svg>
    )
  }
}

export default DOMviewer;
