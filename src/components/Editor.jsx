import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

import classnames from 'classnames';
import parser from 'himalaya';
import Styles from './css/editor';

import AceEditor from 'react-ace';
import Rnd from 'react-rnd';

import brace from 'brace';
import 'brace/mode/html';
import 'brace/mode/javascript';
import 'brace/theme/tomorrow_night_eighties';

import Controller from './Controller';

const highlightCurrentLines = function(linesOfJS, startIndex, endIndex, jsArr) {
  console.log('highlighting current lines');
  if (endIndex > -1) {
    for (let i = 0; i < jsArr.length; i++) {
      if (i >= startIndex && i <= endIndex) {
        linesOfJS[i].style.backgroundColor = '#1d1d1d';
      }
    }
  }
};

const highlightDOMLines = function(testMode, linesOfJS, jsArr) {
  for (let i = 0; i < jsArr.length; i++) {
    if (jsArr[i].hasOwnProperty('domPart')) {
      for (let j = jsArr[i].firstLine; j <= jsArr[i].lastLine; j++) {
        linesOfJS[j].style.backgroundColor = '#3b444c';
      }
    }
  }
};

class Editor extends PureComponent {
  componentDidUpdate() {
    const linesOfJS = this.refs.jsEditor
                               .refs.editor.getElementsByClassName('ace_line');

    for (const line of linesOfJS) {
      line.style.backgroundColor = 'transparent';
    }
    if (this.props.testMode) {
      highlightDOMLines(this.props.testMode, linesOfJS, this.props.jsArr);
      highlightCurrentLines(linesOfJS, this.props.jsArrStartIndex,
                            this.props.jsArrEndIndex, this.props.jsArr);
    }
  }

  render() {

    return <div id={Styles.editorContainer}>
        <Controller html={this.props.html}
                    testMode={this.props.testMode}
                    setJSArrIndex={this.props.setJSArrIndex}
                    setJSONFromHTML={this.props.setJSONFromHTML}
                    setTestMode={this.props.setTestMode}/>
        <p className={Styles.editorHeader}>HTML</p>
        <AceEditor
          height={(window.innerHeight / 2 - 70).toString()}
          mode="html"
          onChange={this.props.setHTML}
          readOnly={this.props.testMode}
          tabSize = {2}
          theme="tomorrow_night_eighties"
          width="100%"
          value={this.props.html}
        />
        <p className={Styles.editorHeader}>JS</p>
        <AceEditor
          height={(window.innerHeight / 2 - 70).toString()}
          mode="javascript"
          onChange={this.props.setJS}
          readOnly={this.props.testMode}
          ref="jsEditor"
          tabSize = {2}
          theme="tomorrow_night_eighties"
          width="100%"
          value={this.props.js}
        />
    </div>
  }
}

export default Editor;
