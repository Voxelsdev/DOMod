import React, { Component } from 'react';
import { Match, Miss } from 'react-router';

import classnames from 'classnames';
import escodegen from 'escodegen';
import esprima from 'esprima';
import estraverse from 'estraverse';

import DOMviewer from './DOMviewer';
import Editor from './Editor';

const evalJSArr = function(js) {
  const jsArr = [];
  const domArr = [];
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
  let currJS = '';
  let lineNum = 0;
  let numOfLines = 0;
  const identifiers = {};
  estraverse.traverse(esprima.parse(js), {
    enter(node, parent) {
      if (parent && parent.type === "Program") {
        currJS = escodegen.generate(node);
        jsArr.push({ asscWithDOM: false });
        numOfLines = (currJS.match(/\n/g) || []).length + 1;
      }
      if (node.type === 'Identifier') {
        if (parent.type === 'VariableDeclarator' ||
            parent.type === 'AssignmentExpression') {
          identifiers[node.name] = true;
          node.name = `__${node.name}`;
        } else {
          if (identifiers.hasOwnProperty(node.name)) {
            node.name = `__${node.name}`;
          }
        }
      }
      if (node.type === 'MemberExpression' &&
          (modifiers.hasOwnProperty(node.property.name) ||
          getters.hasOwnProperty(node.property.name))) {
        jsArr[jsArr.length - 1].asscWithDOM = true;
        jsArr[jsArr.length - 1].endLine = lineNum + numOfLines - 1;
        for (let i = lineNum; i <= lineNum; i++) {
          domArr.push(i);
        }
      }
    },
    leave(node, parent) {
      if (parent && parent.type === "Program") {
        currJS = escodegen.generate(node);
        jsArr[jsArr.length - 1].nonThreatJS = currJS;
        lineNum += numOfLines;
      }
    }
  });
  return { jsArr, domArr };
}

class Main extends Component {
  constructor() {
    super();
    this.state = {
      domArr: [],
      html: '<div><!-- Add html here --></div>',
      js: '// Put body of JS function here',
      jsArr: [],
      jsArrEndIndex: -1,
      jsArrStartIndex: -1,
      jsonFromHtml: null,
      nonThreatJS: null,
      testMode: false,
      tree: d3.layout.tree().size([500, 500])
    }
    this.setHTML = this.setHTML.bind(this);
    this.setJS = this.setJS.bind(this);
    this.setJSArrIndex = this.setJSArrIndex.bind(this);
    this.setJSONFromHTML = this.setJSONFromHTML.bind(this);
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

  setJSArrIndex(event) {
    let endIndex = -1;
    for (let i = this.state.jsArrEndIndex + 1;
             i < this.state.jsArr.length; i++) {
      if (this.state.jsArr[i].asscWithDOM) {
        endIndex = this.state.jsArr[i].endLine;
        break;
      }
    }
    this.setState({ jsArrStartIndex: this.state.jsArrEndIndex + 1,
                    jsArrEndIndex: endIndex });
  }

  setJSONFromHTML(jsonFromHtml) {
    this.setState({ jsonFromHtml });
  }

  setTestMode(event) {
    if (!this.state.testMode) {
      const { domArr, jsArr } = evalJSArr(this.state.js);
      this.setState({ domArr, jsArr });
    }
    this.setState({ testMode: !this.state.testMode });
  }

  render() {

    return (
      <div className="row">
        <div className="eight columns">
          <DOMviewer tree={this.state.tree}
                     jsonFromHtml={this.state.jsonFromHtml} />
        </div>
        <div className="four columns">
          <Editor domArr={this.state.domArr}
                  html={this.state.html}
                  js={this.state.js}
                  jsArr={this.state.jsArr}
                  jsArrEndIndex={this.state.jsArrEndIndex}
                  jsArrStartIndex={this.state.jsArrStartIndex}
                  testMode={this.state.testMode}
                  setHTML={this.setHTML}
                  setJS={this.setJS}
                  setJSArrIndex={this.setJSArrIndex}
                  setJSONFromHTML={this.setJSONFromHTML}
                  setTestMode={this.setTestMode} />
        </div>
      </div>
    )
  }
}

export default Main;
