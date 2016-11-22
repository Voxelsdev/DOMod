import React, { Component } from 'react';

import styles from './css/domtree';
import d3 from 'd3';

import Node from './Node.jsx';
import Link from './Link.jsx';

class DOMtree extends Component {
  makeNode(node, key) {

    return <Node name={node.name}
                 x={node.x}
                 y={node.y}
                 key={key}/>
  }

  makeLink(link, key) {
    return <Link track={d3.svg.diagonal().projection((d) => [d.x, d.y])(link)}
                 key={key}/>;
  }

  render() {
    const treeData = [
      {
        "name": "Top Level",
        "parent": "null",
        "children": [
          {
            "name": "Level 2: A",
            "parent": "Top Level",
            "children": [
              {
                "name": "Son of A",
                "parent": "Level 2: A"
              },
              {
                "name": "Daughter of A",
                "parent": "Level 2: A"
              }
            ]
          },
          {
            "name": "Level 2: B",
            "parent": "Top Level"
          }
        ]
      }
    ];
    const nodes = this.props.tree.nodes(treeData[0]);
    const links = this.props.tree.links(nodes);

    nodes.forEach((d) => {
      d.y = d.depth * 100 + 25; });

    const index = 0;

    return (
      <g className="domtree">
        {links.map((link, key) => this.makeLink(link, key))}
        {nodes.map((node, key) => this.makeNode(node, key))}
      </g>
    )
  }
}

export default DOMtree;
