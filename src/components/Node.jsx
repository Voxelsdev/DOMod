import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import d3 from 'd3';

import Styles from './css/node';

class Node extends Component {
  constructor() {
    super();
    this.state = {
      bbox: null
    }
  }

  makeBorderBox(bbox) {
    this.setState({ bbox });
  }

  componentDidMount() {
    this.makeBorderBox(ReactDOM.findDOMNode(this).getBBox());
  }

  render() {
    const bbox = this.state.bbox ? this.state.bbox:null;

    return (
      <g>
        <rect className={Styles.borderbox}
          x={bbox ? bbox.x - 5:0}
          y={bbox ? bbox.y - 5:0}
          height={bbox ? bbox.height + 10:0}
          width={bbox ? bbox.width + 10:0}></rect>
        <text textAnchor="middle"
              x={this.props.x}
              y={this.props.y}
              index={this.props.index}>
          {this.props.name}
        </text>
      </g>
    )
  }
}

export default Node;
