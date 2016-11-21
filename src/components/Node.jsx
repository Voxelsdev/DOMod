import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import d3 from 'd3';

class Node extends Component {
  makeBorder() {
    console.log(this.refs.node);
  }

  render() {
    return (
      <g>
        <text x={this.props.x}
              y={this.props.y}
              ref="node">
          {this.props.name}
        </text>
        <rect>{this.makeBorder()}</rect>
      </g>
    )
  }
}

export default Node;
