import React, { Component } from 'react';

import DOMtree from './DOMtree';

import Styles from './css/domviewer.css';

class DOMviewer extends Component {
  render() {

    return (
      <svg id={Styles.domviewer}>
        <DOMtree tree={this.props.tree}
                 jsonFromHtml={this.props.jsonFromHtml}/>
      </svg>
    )
  }
}

export default DOMviewer;
