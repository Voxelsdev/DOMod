import React, { Component } from 'react';
import { Match, Miss } from 'react-router';

import escodegen from 'escodegen';
import esprima from 'esprima';
import estraverse from 'estraverse';

import Styles from './css/main';

import DOMviewer from './DOMviewer';
import Editor from './Editor';
import Rnd from 'react-rnd';

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
    previousElementSibling: true,
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
        if (node.name === 'document' && parent.property === 'getElementById') {
          node.name = '__body';
        }
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
        const domManipulator = node.property.name;
        if (getters.hasOwnProperty(domManipulator)) {
          const domElement = node.object.name === 'document' ?
                                  'document':`__${node.object.name}`;
          const argument = parent.arguments ?
                                        `(\'${parent.arguments[0].value}\')`:'';
          jsArr[jsArr.length - 1].domPart =
                        `${domElement}.${domManipulator}${argument}`;
        }
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
};

class Main extends Component {
  constructor() {
    super();
    this.state = {
      domArr: [],
      editorWidth: 350,
      highlightNode: '',
      html: '<body><!-- Add html here --></body>',
      js: '// Put body of JS function here',
      jsArr: [],
      jsArrEndIndex: -1,
      jsArrStartIndex: -1,
      jsonFromHTML: null,
      testMode: false,
      tree: d3.layout.tree().size([500, 500])
    }
    this.setEditorWidth = this.setEditorWidth.bind(this);
    this.setHighlightNode = this.setHighlightNode.bind(this);
    this.setJSArrIndex = this.setJSArrIndex.bind(this);
    this.setJSONFromHTML = this.setJSONFromHTML.bind(this);
    this.setTestMode = this.setTestMode.bind(this);
  }

  setEditorWidth(direction, styleSize) {
    this.setState({ editorWidth: styleSize.width });
  }

  setHighlightNode(endIndex) {
    let toHighlight = '';
    let codeToRun = 'const __body = document.getElementById(\'__body\');';
    let i = 0;
    for (i; i <= endIndex; i++) {
      codeToRun += this.state.jsArr[i].nonThreatJS;
    }
    if (endIndex > -1) {
      codeToRun += `toHighlight = ${this.state.jsArr[i - 1].domPart};`;
    }
    eval(codeToRun);
    this.setState({ highlightNode: toHighlight });
  }

  setJSArrIndex(event) {
    let endIndex = -1;
    if (event.target.id === 'getNextInJSArr') {
      for (let i = this.state.jsArrEndIndex + 1;
               i < this.state.jsArr.length; i++) {
        if (this.state.jsArr[i].asscWithDOM) {
          endIndex = this.state.jsArr[i].endLine;
          break;
        }
      }
    }
    this.setHighlightNode(endIndex);
    this.setState({ jsArrStartIndex: this.state.jsArrEndIndex + 1,
                    jsArrEndIndex: endIndex });
  }

  setJSONFromHTML(jsonFromHTML) {
    this.setState({ jsonFromHTML });
  }

  setTestMode(event) {
    if (!this.state.testMode) {
      const { domArr, jsArr } = evalJSArr(this.props.js);
      this.setState({ domArr, jsArr });
    }
    this.setState({ testMode: !this.state.testMode });
  }

  render() {

    return (
      <div id="main">
        <Rnd bounds={'parent'}
             initial={{ x: 0, y: 0, width: 350, height: 1000 }}
             isResizable = {{
               top:false,
               right:true,
               bottom:false,
               left:false,
               topRight:false,
               bottomRight:false,
               bottomLeft:false,
               topLeft:false
             }}
             minWidth={300}
             maxWidth={650}
             moveAxis='none'
             onResize={this.setEditorWidth}>
            <Editor domArr={this.state.domArr}
                    editorWidth={this.state.editorWidth}
                    html={this.props.html}
                    js={this.props.js}
                    jsArr={this.state.jsArr}
                    jsArrEndIndex={this.state.jsArrEndIndex}
                    jsArrStartIndex={this.state.jsArrStartIndex}
                    testMode={this.state.testMode}
                    setHTML={this.props.setHTML}
                    setJS={this.props.setJS}
                    setJSArrIndex={this.setJSArrIndex}
                    setJSONFromHTML={this.setJSONFromHTML}
                    setTestMode={this.setTestMode} />
          </Rnd>
        <DOMviewer editorWidth={this.state.editorWidth}
                   highlightNode={this.state.highlightNode}
                   jsonFromHTML={this.state.jsonFromHTML}
                   tree={this.state.tree}/>
      </div>
    )
  }
}

export default Main;
