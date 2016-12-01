import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

import classnames from 'classnames';
import parser from 'himalaya';
import styles from './css/editor';

import AceEditor from 'react-ace';

import brace from 'brace';
import 'brace/mode/html';
import 'brace/mode/javascript';
import 'brace/theme/tomorrow_night_eighties';

import Controller from './Controller';

const highlightCurrentLines = function(linesOfJS, startIndex, endIndex, jsArr) {
  if (endIndex > -1) {
    for (let i = 0; i < jsArr.length; i++) {
      if (i >= startIndex && i <= endIndex) {
        linesOfJS[i].style.backgroundColor = '#1d1d1d';
      }
    }
  }
}

const highlightDOMLines = function(testMode, linesOfJS, domArr) {
  for (let i = 0; i < domArr.length; i++) {
    if (testMode) {
      linesOfJS[domArr[i]].style.backgroundColor = '#3b444c';
    }
  }
}

class Editor extends PureComponent {
  constructor() {
    super();
    this.parseHtml = this.parseHtml.bind(this);
  }

  parseHtml() {
    this.props.setJsonFromHtml(parser.parse(this.props.html));
  }

  componentDidUpdate() {
    const linesOfJS = this.refs.jsEditor
                                .refs.editor.getElementsByClassName('ace_line');
    for (const line of linesOfJS) {
      console.log('here');
      line.style.backgroundColor = 'transparent';
    }
    highlightDOMLines(this.props.testMode, linesOfJS, this.props.domArr);
    if (this.props.testMode) {
      highlightCurrentLines(linesOfJS, this.props.jsArrStartIndex,
                            this.props.jsArrEndIndex, this.props.jsArr);
    }
  }

  render() {

    return <div className={styles.editorContainer}>
        <Controller html={this.props.html}
                    testMode={this.props.testMode}
                    setJSArrIndex={this.props.setJSArrIndex}
                    setJSONFromHTML={this.props.setJSONFromHTML}
                    setTestMode={this.props.setTestMode}/>
        <AceEditor
          mode="html"
          onChange={this.props.setHTML}
          readOnly={this.props.testMode}
          tabSize = {2}
          theme="tomorrow_night_eighties"
          width="100%"
          value={this.props.html}
        />
        <AceEditor
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
