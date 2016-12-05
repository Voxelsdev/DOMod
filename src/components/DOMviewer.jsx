import React, { Component } from 'react';

import DOMtree from './DOMtree';

import Styles from './css/domviewer.css';

class DOMviewer extends Component {
  render() {

    return (
      <svg id={Styles.domviewer}
           style={{width: screen.width - this.props.editorWidth,
                  height: window.innerHeight - 50}}>
        <DOMtree toHighlight={this.props.toHighlight}
                 tree={this.props.tree}
                 jsonFromHTML={this.props.jsonFromHTML}
                 selectors={this.props.selectors}
                 svgWidth={screen.width - this.props.editorWidth}/>
      </svg>
    )
  }
}

export default DOMviewer;
