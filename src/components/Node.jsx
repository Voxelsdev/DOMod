import React, { Component } from 'react';

import d3 from 'd3';

class Node extends Component {
  render() {

    return (
      <text x={this.props.x}
            y={this.props.y}>
        {this.props.name}
      </text>
    )
  }
}

export default Node;
