import React, { Component } from 'react';
import { Match, Miss } from 'react-router';

import escodegen from 'escodegen';
import esprima from 'esprima';
import estraverse from 'estraverse';

import Styles from './css/main';

import DOMviewer from './DOMviewer';
import Editor from './Editor';
import Rnd from 'react-rnd';

const isDOMManipulator = function(selectors, modifiers, node) {
  return node.type === 'MemberExpression' &&
        (modifiers.has(node.property.name) ||
         selectors.has(node.property.name));
};

// getElementById only works with the document obj, so it is not replaced
const replaceDocObj = function(selectors, modifiers, node, parent) {
  if (node.name === 'document' &&
      parent.property.name !== 'getElementById' &&
      (selectors.has(parent.property.name) ||
       modifiers.has(parent.property.name))) {
    node.name = '__body';
  }
}

const replaceUserVar = function(userDefVars, node, parent) {
  if (parent.type === 'VariableDeclarator' ||
      parent.type === 'AssignmentExpression') {
    userDefVars.add(node.name);
    node.name = `__${node.name}`;
  } else if (userDefVars.has(node.name)) {
    node.name = `__${node.name}`;
  }
}

class Main extends Component {
  constructor() {
    super();
    this.state = {
      editorWidth: 350,
      jsArr: [],
      jsArrEndIndex: -1,
      jsArrStartIndex: -1,
      jsonFromHTML: null,
      testMode: false,
      toHighlight: '',
      tree: d3.layout.tree().size([500, 500])
    }
    this.setEditorWidth = this.setEditorWidth.bind(this);
    this.setHighlightNode = this.setHighlightNode.bind(this);
    this.setJSArr = this.setJSArr.bind(this);
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
    this.setState({ toHighlight });
  }

  setJSArr() {
    const selectors = new Set(['getElementsByTagName', 'getElementsByClassName',
                              'getElementById', 'querySelector',
                              'querySelectorAll', 'children', 'parentElement',
                              'nextElementSibling', 'previousElementSibling']);
    const modifiers = new Set(['appendChild', 'removeChild', 'createElement']);
    const userVars = new Set();
    const jsArr = [];
    let lineNum = 0;
    estraverse.traverse(esprima.parse(this.props.js), {
      enter(node, parent) {
        if (parent && parent.type === "Program") {
          jsArr.push({});
        }
      },
      leave(node, parent) {
        const lastIndex = jsArr.length - 1;
        if (node.type === 'Identifier') {
          replaceDocObj(selectors, modifiers, node, parent);
          replaceUserVar(userVars, node, parent);
        }
        if (isDOMManipulator(selectors, modifiers, node)) {
          jsArr[lastIndex].domPart = escodegen.generate(parent);
        }
        if (parent && parent.type === "Program") {
          const nonThreatJS = escodegen.generate(node);
          const numOfLines = (nonThreatJS.match(/\n/g) || []).length;
          jsArr[lastIndex].firstLine = lineNum;
          jsArr[lastIndex].lastLine = lineNum + numOfLines;
          jsArr[lastIndex].nonThreatJS = escodegen.generate(node);
          lineNum += numOfLines + 1;
        }
      }
    });
    this.setState({ jsArr });
  }

  setJSArrIndex(event) {
    let endIndex = -1;
    if (event.target.id === 'getNextInJSArr') {
      for (let i = this.state.jsArrEndIndex + 1;
               i < this.state.jsArr.length; i++) {
        console.log(this.state.jsArr[i]);
        if (this.state.jsArr[i].domPart) {
          endIndex = this.state.jsArr[i].lastLine;
          break;
        }
      }
    }
    console.log(endIndex);
    this.setHighlightNode(endIndex);
    this.setState({ jsArrStartIndex: this.state.jsArrEndIndex + 1,
                    jsArrEndIndex: endIndex });
  }

  setJSONFromHTML(jsonFromHTML) {
    this.setState({ jsonFromHTML });
  }

  setTestMode(event) {
    if (!this.state.testMode) {
      this.setJSArr();
    }
    this.setState({ testMode: !this.state.testMode });
  }

  render() {

    return (
      <div id="main">
        <Rnd bounds={'parent'}
             initial={{ x: 0, y: 0, width: 350, height: window.innerHeight - 50 }}
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
                   toHighlight={this.state.toHighlight}
                   jsonFromHTML={this.state.jsonFromHTML}
                   tree={this.state.tree}/>
      </div>
    )
  }
}

export default Main;
