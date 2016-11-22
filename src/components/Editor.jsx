import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import parser from 'himalaya';
import styles from './css/editor';

import AceEditor from 'react-ace';

import brace from 'brace';
import 'brace/mode/html';
import 'brace/theme/tomorrow_night_eighties';

class Editor extends PureComponent {
  constructor() {
    super();
    this.parseHtml = this.parseHtml.bind(this);
    this.handleTextInput = this.handleTextInput.bind(this);
  }

  parseHtml() {
    this.props.setJsonFromHtml(parser.parse(this.props.html));
  }

  handleTextInput(text) {
    this.props.changeHTML(text);
  }

  render() {
    return <div className={styles.editorContainer}>
      <div className="row">
        <AceEditor
          ref="htmlinput"
          wrapEnabeled="false"
          mode="html"
          theme="tomorrow_night_eighties"
          name="ace-editor"
          width="100%"
          value={this.props.html}
          onChange={this.handleTextInput}
        />
      </div>
      <div className="row">
        <input
          className={classnames('u-full-width', styles.parseHtml)}
          onClick={this.parseHtml.bind(this)}
          type="submit"
          value="Parse HTML!"
        />
      </div>
    </div>
  }
}

export default Editor;
