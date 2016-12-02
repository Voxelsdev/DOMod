import React, { Component } from 'react';

import d3 from 'd3';
import parser from 'himalaya';

import Node from './Node.jsx';
import Link from './Link.jsx';

import Styles from './css/domtree';

class DOMtree extends Component {
  makeNode(node, key) {

    return <Node color={node.color}
                 key={key}
                 tagName={node.tagName}
                 tagClass={node.attributes.className}
                 tagId={node.attributes.id}
                 x={node.x}
                 y={node.y} />
  }

  makeLink(link, key) {
    return <Link track={d3.svg.diagonal().projection((d) => [d.x, d.y])(link)}
                 key={key}/>;
  }

  render() {

    if (this.props.jsonFromHTML) {
      const nodes = this.props.tree.nodes(this.props.jsonFromHTML[0]);
      const links = this.props.tree.links(nodes);

      if (this.props.highlightNode) {
        if (!Array.isArray(this.props.highlightNode)) {
          for (const node of nodes) {
            const highlightNodeJSON =
                    parser.parse(this.props.highlightNode.outerHTML)[0];
            node.color = (node.tagName === highlightNodeJSON.tagName.toLowerCase() &&
                node.attributes.id === highlightNodeJSON.attributes.id &&
                node.attributes.class ===
                      highlightNodeJSON.attributes.className);
          }
        }
      }

      nodes.forEach((d) => {
        d.x = (d.x - 250) + this.props.svgWidth / 2;
        d.y = d.depth * 100 + 25; });

      return (
        <g className={Styles.domtree}>
          {links.map((link, key) => this.makeLink(link, key))}
          {nodes.map((node, key) => this.makeNode(node, key))}
        </g>
      )
    }
    return null;
  }
}

export default DOMtree;
