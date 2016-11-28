import React, { Component } from 'react';
import { Match, Miss } from 'react-router';
import escodegen from 'escodegen';
import esprima from 'esprima';
import estraverse from 'estraverse';

import classnames from 'classnames';
import DOMviewer from './DOMviewer';
import Editor from './Editor';
import JSPlayer from './JSPlayer';

// import Signup from './signup';
import Login from './Login';

const getcurrCodeBitProps = function(node, parent, currCodeBit, parentChain,
                                  getters, modifiers) {
  if (parentChain[1].type === "VariableDeclaration") {
    currCodeBit.variableName = parentChain[1].declarations[0].id.name;
  }
  currCodeBit.domElement = node.object.name;
  currCodeBit.modifier = modifiers.hasOwnProperty(node.property.name) ?
                          node.property.name:null;
  currCodeBit.getter = getters.hasOwnProperty(node.property.name) ?
                          node.property.name:null;
  currCodeBit.argument = parent.arguments[0].value;
}

const getNewJSArr = function(js) {
  const tempJSArr = [];
  const parentChain = [];
  const getters = {
    getElementsByTagName: true,
    getElementsByClassName: true,
    getElementById: true,
    querySelector: true,
    querySelectorAll: true,
    children: true,
    nextElementSibling: true,
    nextSibling: true,
    firstChild: true,
    lastChild: true
  }
  const modifiers = {
    appendChild: true,
    removeChild: true,
    createElement: true
  };
  let chainPosition = -1;
  estraverse.traverse(esprima.parse(js), {
    enter(node, parent) {
      if (parent && parent.type === "Program") {
        tempJSArr.push({js: escodegen.generate(node)});
        chainPosition++;
      }
      if (node.type === "MemberExpression" &&
          (modifiers.hasOwnProperty(node.property.name) ||
          getters.hasOwnProperty(node.property.name))) {
        const currCodeBit = tempJSArr[chainPosition];
        getcurrCodeBitProps(node, parent, currCodeBit, parentChain,
                         getters, modifiers);
      }
      parentChain.push(node);
    },
    leave(node, parent) {
      parentChain.pop();
    }
  });
  return tempJSArr;
}

class Main extends Component {
  constructor() {
    super();
    this.state = {
      html: '<!-- Add html here -->',
      jsonFromHtml: null,
      js: '// Add js here',
      tree: d3.layout.tree().size([500, 500]),
      selectors: null,
      jsArr: []
    }
    this.changeHTML = this.changeHTML.bind(this);
    this.changeJS = this.changeJS.bind(this);
    this.setJsonFromHtml = this.setJsonFromHtml.bind(this);
    this.setSelectors = this.setSelectors.bind(this);
    this.setJSArr = this.setJSArr.bind(this);
  }

  changeHTML(html) {
    this.setState({ html });
  }

  changeJS(js) {
    this.setState({ js });
  }

  setJsonFromHtml(jsonFromHtml) {
    this.setState({ jsonFromHtml });
  }

  setSelectors() {
    this.setState({ selectors: {tagName:'div'} });
  }

  setJSArr() {
    console.log('here');
    this.setState({ jsArr: getNewJSArr(this.state.js) });
  }

  render() {

    return (
      <div className="row">
        <div className="eight columns">
          <DOMviewer tree={this.state.tree}
                     jsonFromHtml={this.state.jsonFromHtml}
                     selectors={this.state.selectors} />
        </div>
        <div className="four columns">
          <Match pattern="/" exactly render={
            () => <Editor
                    html={this.state.html}
                    changeHTML={this.changeHTML}
                    js={this.state.js}
                    changeJS={this.changeJS}
                    setJsonFromHtml={this.setJsonFromHtml}
                    setJSArr={this.setJSArr} />
          }/>
          <Match pattern="/js-player" exactly render={
            () => <JSPlayer
                    html={this.state.html}
                    js={this.state.js}
                    jsArr={this.state.jsArr}
                    setSelectors={this.setSelectors} />
          }/>
        </div>
      </div>
    )
  }
}

export default Main;
