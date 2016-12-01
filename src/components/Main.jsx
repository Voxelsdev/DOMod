import React, { Component } from 'react';
import { Match, Miss } from 'react-router';

import classnames from 'classnames';
import escodegen from 'escodegen';
import esprima from 'esprima';
import estraverse from 'estraverse';

import DOMviewer from './DOMviewer';
import Editor from './Editor';

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
  if (parent.arguments) {
    currCodeBit.argument = parent.arguments[0].value;
  }
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
    previousSibling: true,
    firstChild: true,
    lastChild: true,
    parentElement: true
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
      html: localStorage.html || '<div><!-- Add html here --></div>',
      js: localStorage.javascript || '// Add js here',
      jsArr: [],
      jsArrIndex: -1,
      jsonFromHtml: null,
      testMode: false,
      tree: d3.layout.tree().size([500, 500])
    }
    this.setHTML = this.setHTML.bind(this);
    this.setJS = this.setJS.bind(this);
    this.setJSONFromHTML = this.setJSONFromHTML.bind(this);
    this.setJSArr = this.setJSArr.bind(this);
    this.setJSArrIndex = this.setJSArrIndex.bind(this);
    this.setTestMode = this.setTestMode.bind(this);
  }

  setHTML(html) {
    localStorage.html = html;
    this.setState({ html });
  }

  setJS(js) {
    localStorage.javascript = js;
    this.setState({ js });
  }

  setJSArr() {
    this.setState({ jsArr: getNewJSArr(this.state.js) });
  }

  setJSArrIndex(event) {
    if (event.target.id === 'getNextInJSArr' &&
        this.state.jsArrIndex !== this.state.jsArr.length - 1) {
      this.setState({ jsArrIndex: this.state.jsArrIndex + 1 });
    } else {
      this.setState({ jsArrIndex: 0 });
    }
  }

  setJSONFromHTML(jsonFromHtml) {
    this.setState({ jsonFromHtml });
  }

  setTestMode() {
    this.setState({ testMode: !this.state.testMode });
    this.setJSArr();
  }

  render() {

    return (
      <div className="row">
        <div className="eight columns">
          <DOMviewer tree={this.state.tree}
                     jsonFromHtml={this.state.jsonFromHtml} />
        </div>
        <div className="four columns">
          <Editor html={this.state.html}
                  js={this.state.js}
                  jsArr={this.state.jsArr}
                  jsArrIndex={this.state.jsArrIndex}
                  testMode={this.state.testMode}
                  setHTML={this.setHTML}
                  setJS={this.setJS}
                  setJSArr={this.setJSArr}
                  setJSArrIndex={this.setJSArrIndex}
                  setJSONFromHTML={this.setJSONFromHTML}
                  setTestMode={this.setTestMode} />
        </div>
      </div>
    )
  }
}

export default Main;
