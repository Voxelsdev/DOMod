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

  render() {

    return <div className={styles.editorContainer}>
        <Controller html={this.props.html}
                    testMode={this.props.editorMode}
                    setEditorMode={this.props.setEditorMode}
                    setJSArrIndex={this.props.setJSArrIndex}
                    setJSONFromHTML={this.props.setJSONFromHTML}/>
        <AceEditor
          readOnly={this.props.testMode}
          mode="html"
          theme="tomorrow_night_eighties"
          width="100%"
          value={this.props.html}
          onChange={this.props.changeHTML}
        />
        <AceEditor
          readOnly={this.props.testMode}
          mode="javascript"
          theme="tomorrow_night_eighties"
          width="100%"
          value={this.props.js}
          onChange={this.props.changeJS}
          markers={[{startRow: 0, startCol: 0, endRow: 2, endCol: 200,
                  className: styles.domManipulator, type:"background"}]}
        />
    </div>
  }
}

export default Editor;
