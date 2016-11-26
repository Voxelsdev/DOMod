import React, { Component } from 'react';

import styles from './css/domtree';
import d3 from 'd3';

import Node from './Node.jsx';
import Link from './Link.jsx';

class DOMtree extends Component {
  makeNode(node, key) {

    return <Node tagName={node.tagName}
                 tagClass={node.attributes.className}
                 tagId={node.attributes.id}
                 x={node.x}
                 y={node.y}
                 key={key}
                 selectors={this.props.selectors}/>
  }

  makeLink(link, key) {
    return <Link track={d3.svg.diagonal().projection((d) => [d.x, d.y])(link)}
                 key={key}/>;
  }

  render() {
    if (this.props.jsonFromHtml) {
      const nodes = this.props.tree.nodes(this.props.jsonFromHtml[0]);
      const links = this.props.tree.links(nodes);

      nodes.forEach((d) => {
        d.y = d.depth * 100 + 25; });

      return (
        <g className="domtree">
          {links.map((link, key) => {
            if (link.target.tagName) {
              return this.makeLink(link, key);
            }
          })}
          {nodes.map((node, key) => {
            if (node.tagName) {
              return this.makeNode(node, key);
            }
          })
        }
        </g>
      )
    }
    return null;
  }
}

export default DOMtree;
