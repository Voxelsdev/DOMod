import React, { Component } from 'react';

import styles from './css/domtree';
import d3 from 'd3';

import Node from './Node.jsx';
import Link from './Link.jsx';

class DOMtree extends Component {
  constructor(props) {
    super()

    this.tree = d3.layout.tree().size([500, 500]);
  }

  makeNode(node) {
    return <Node name={node.name}
                 x={node.x}
                 y={node.y} />
  }

  makeLink(link) {
    return <Link track={d3.svg.diagonal().projection((d) => [d.x, d.y])(link)} />;
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
    const nodes = this.tree.nodes(treeData[0]);
    const links = this.tree.links(nodes);

    nodes.forEach((d) => {
      d.y = d.depth * 100; });

    return (
      <g className="domtree">
        {links.map((link) => this.makeLink(link))};
        {nodes.map((node) => this.makeNode(node))}
      </g>
    )
  }
}

export default DOMtree;
