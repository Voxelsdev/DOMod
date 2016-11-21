import React, { Component } from 'react';

import d3 from 'd3';

import Styles from './css/link.css';

class Node extends Component {
  render() {

    return (
      <path className={Styles.link}
            d={this.props.track}></path>
    )
  }
}

export default Node;
