import React, { Component } from 'react';

import d3 from 'd3';
import parser from 'himalaya';

import Node from './Node.jsx';
import Link from './Link.jsx';

import Styles from './css/domtree';

const haveSameClasses = function(highlightNodeJSON, node) {
  if (!highlightNodeJSON.attributes.className && !node.attributes.className) {
    return true;
  }
  if (!highlightNodeJSON.attributes.className || !node.attributes.className ||
      highlightNodeJSON.attributes.className.length !==
        node.attributes.className.length) {
    return false;
  }
  for (let i = 0; i < highlightNodeJSON.attributes.className.length; i++) {
    if (highlightNodeJSON[i] !== node[i]) {
      return false;
    }
  }
  return true;
}

const highlightFromSingleElement = function(highlightNode, nodes) {
  for (const node of nodes) {
    const highlightNodeJSON =
        parser.parse(highlightNode.outerHTML)[0];
        node.color = (node.tagName === highlightNodeJSON.tagName &&
                      node.attributes.id === highlightNodeJSON.attributes.id);
  }
}

const highlightFromArrayOfElements = function(highlightArray, nodes) {
  for (const node of nodes) {
    let hasMatch = false;
    let index = 0;
    while (index < highlightArray.length - 1 && !hasMatch) {
      const highlightNodeJSON =
          parser.parse(highlightArray[index].outerHTML)[0];
      hasMatch = (node.tagName === highlightNodeJSON.tagName &&
          haveSameClasses(highlightNodeJSON, node));
      index++;
    }
    node.color = hasMatch;
  }
}

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

      for (const node of nodes) {
        node.color = false;
      }

      if (this.props.toHighlight) {
        if (!this.props.toHighlight[0]) {
          highlightFromSingleElement(this.props.toHighlight, nodes);
        } else {
          highlightFromArrayOfElements(this.props.toHighlight, nodes);
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
