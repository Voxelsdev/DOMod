import React, { Component } from 'react';
import { Match, Miss } from 'react-router';

import escodegen from 'escodegen';
import esprima from 'esprima';
import estraverse from 'estraverse';

import Styles from './css/main';

import DOMviewer from './DOMviewer';
import Editor from './Editor';
import Rnd from 'react-rnd';

import parser from 'himalaya';

class Main extends Component {
  constructor() {
    super();
    this.state = {
      editorWidth: 350,
      jsArr: [],
      jsArrEndIndex: -1,
      jsArrStartIndex: -1,
      jsonFromHTML: null,
      moddedHTML: '',
      testMode: false,
      toHighlight: '',
      tree: d3.layout.tree().size([500, 500])
    }
    this.fixUpParsedHTML = this.fixUpParsedHTML.bind(this);
    this.replaceDocObj = this.replaceDocObj.bind(this);
    this.replaceUserVar = this.replaceUserVar.bind(this);
    this.runNextCode = this.runNextCode.bind(this);
    this.setEditorWidth = this.setEditorWidth.bind(this);
    this.setHighlighting = this.setHighlighting.bind(this);
    this.setJSArr = this.setJSArr.bind(this);
    this.setJSArrIndex = this.setJSArrIndex.bind(this);
    this.setJSON = this.setJSON.bind(this);
    this.setJSONFromHTML = this.setJSONFromHTML.bind(this);
    this.setTestMode = this.setTestMode.bind(this);
  }

  // Himalaya parses the spaces in the user's HTML as children,
  // this corrects that
  fixUpParsedHTML(obj) {
    if (obj.hasOwnProperty('children')) {
      for (let i = obj.children.length - 1; i >= 0; i--) {
        if (!obj.children[i].hasOwnProperty('tagName')) {
          obj.children.splice(i, 1);
        } else {
          this.fixUpParsedHTML(obj.children[i]);
        }
      }
    }
  }

  // getElementById and createElement only work with the document obj, so they are
  // not replaced
  replaceDocObj(selectors, modifiers, node, parent) {
    if (node.name === 'document' &&
        parent.property.name !== 'getElementById' &&
        parent.property.name !== 'createElement' &&
        (selectors.has(parent.property.name) ||
         modifiers.has(parent.property.name))) {
      node.name = '__body';
    }
  }

  replaceUserVar(userDefVars, node, parent) {
    if (parent.type === 'VariableDeclarator' ||
        parent.type === 'AssignmentExpression') {
      userDefVars.add(node.name);
      node.name = `__${node.name}`;
    } else if (userDefVars.has(node.name)) {
      node.name = `__${node.name}`;
    }
  }

  runNextCode(event) {
    const endIndex = this.setJSArrIndex(event);
    this.setHighlighting(endIndex);
    this.setModdedHTML(endIndex);
  }

  setEditorWidth(direction, styleSize) {
    this.setState({ editorWidth: styleSize.width });
  }

  setHighlighting(endIndex) {
    const hiddenHTML = document.getElementsByClassName('hiddenHTML')[0];
    console.log(hiddenHTML.children.length);
    if (hiddenHTML.children.length) {
      hiddenHTML.removeChild(document.getElementById('__body'));
    }
      hiddenHTML.insertAdjacentHTML('beforeend', `<div id='__body'>
${this.props.html.substring(6, this.props.html.lastIndexOf('</body>'))}</div>`);
    let toHighlight = '';
    let codeToRun = 'const __body = document.getElementById(\'__body\');';
    let i = 0;
    for (i; i <= endIndex; i++) {
      codeToRun += this.state.jsArr[i].nonThreatJS;
    }
    if (endIndex > -1 && this.state.jsArr[i - 1].selector) {
      codeToRun += `toHighlight = ${this.state.jsArr[i - 1].selector};`;
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
    const outerThis = this;
    estraverse.traverse(esprima.parse(this.props.js), {
      enter(node, parent) {
        if (parent && parent.type === "Program") {
          jsArr.push({});
        }
        if (node.type === 'Identifier') {
          outerThis.replaceDocObj(selectors, modifiers, node, parent);
          outerThis.replaceUserVar(userVars, node, parent);
        }
      },
      leave(node, parent) {
        const lastIndex = jsArr.length - 1;
        if (node.type === 'MemberExpression') {
          if (selectors.has(node.property.name)) {
            jsArr[lastIndex].selector = escodegen.generate(parent);
          } else if (modifiers.has(node.property.name)) {
            jsArr[lastIndex].modifier = escodegen.generate(parent);
          }
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
        if (this.state.jsArr[i] &&
            (this.state.jsArr[i].selector || this.state.jsArr[i].modifier)) {
          endIndex = this.state.jsArr[i].lastLine;
          break;
        }
      }
    }
    if (endIndex === -1) {
      this.setJSON();
      this.setState({ moddedHTML: '' });
    }
    this.setState({ jsArrStartIndex: this.state.jsArrEndIndex + 1,
                    jsArrEndIndex: endIndex });
    return endIndex;
  }

  setJSON() {
    const htmlSubstring = this.props.html
                          .substring(6, this.props.html.lastIndexOf('</body>'));
    const html = `<div id='__body'>${htmlSubstring}</div>`;
    this.setJSONFromHTML(html);
  }

  setJSONFromHTML(html) {
    const jsonFromHTML = parser.parse(html);
    this.fixUpParsedHTML(jsonFromHTML[0]);
    this.setState({ jsonFromHTML });
  }

  setModdedHTML(endIndex) {
    if (endIndex > -1 &&
        this.state.jsArr[endIndex].hasOwnProperty('modifier')) {
      const moddedHTML = document.getElementById('__body').outerHTML
                                                  .replace(/<!--(.*?)-->/g, '');
      this.setJSONFromHTML(moddedHTML);
      this.setState({ moddedHTML });
    } else {
      this.setState({ moddedHTML: '' });
    }
  }

  setTestMode(event) {
    // This runs before the state is set, so it is the opposite of what it seems
    if (!this.state.testMode) {
      this.setJSArr();
    } else {
      this.setState({ moddedHTML: '', jsArrEndIndex: -1, jsArrStartIndex: -1 });
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
             onResize={this.setEditorWidth}
             ref={c => { this.rnd = c; }}>
            <Editor domArr={this.state.domArr}
                    editorWidth={this.state.editorWidth}
                    html={this.props.html}
                    js={this.props.js}
                    jsArr={this.state.jsArr}
                    jsArrEndIndex={this.state.jsArrEndIndex}
                    jsArrStartIndex={this.state.jsArrStartIndex}
                    moddedHTML={this.state.moddedHTML}
                    runNextCode={this.runNextCode}
                    setHTML={this.props.setHTML}
                    setJS={this.props.setJS}
                    setJSArrIndex={this.setJSArrIndex}
                    setJSON={this.setJSON}
                    setTestMode={this.setTestMode}
                    testMode={this.state.testMode} />
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
