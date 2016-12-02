import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import d3 from 'd3';

import Styles from './css/node';

class Node extends Component {
  render() {
    let matchesSelector = false;

    for (const selector in this.props.selectors) {
      if (this.props[selector] === this.props.selectors[selector]) {
        matchesSelector = true;
      }
    }

    return (
      <g>
        <rect className={Styles.textrect}
              x={this.props.x - 10}
              y={this.props.y - 18}
              width='20px'
              height='24px'>
        </rect>
        <text textAnchor="middle"
              x={this.props.x}
              y={this.props.y}
              className={ this.props.color ? Styles.highlightedTag:Styles.tag }>
          {this.props.tagName}
        </text>
      </g>
    )
  }
}

export default Node;
