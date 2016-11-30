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
    if (this.props.testMode) {
      linesOfJS[0].style.backgroundColor = 'pink';
    } else {
      for (const line of linesOfJS) {
        line.style.backgroundColor = 'transparent';
      }
    }
  }

  render() {
    console.log(this.props.jsArr);

    return <div className={styles.editorContainer}>
        <Controller html={this.props.html}
                    testMode={this.props.testMode}
                    setJSArr={this.props.setJSArr}
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
          markers={this.props.testMode ? [{startRow: 3, startCol: 0, endRow: 4, endCol: 1,
                className: styles.domManipulator, type:"background"}]: []}
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
