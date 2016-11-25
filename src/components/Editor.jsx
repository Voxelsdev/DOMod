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
          <AceEditor
            ref="htmlinput"
            wrapEnabeled="false"
            mode="html"
            theme="tomorrow_night_eighties"
            name="ace-editor"
            width="100%"
            value={this.props.html}
            onChange={this.props.changeHTML}
          />
        <input
          className={classnames('u-full-width', styles.parseHtml)}
          onClick={this.parseHtml}
          type="submit"
          value="Parse HTML!"
        />
        <AceEditor
          ref="jsinput"
          wrapEnabeled="false"
          mode="javascript"
          theme="tomorrow_night_eighties"
          name="ace-editor"
          width="100%"
          value={this.props.js}
          onChange={this.props.changeJS}
        />
        <button>
          <Link to='/js-player'>Run JS</Link>
        </button>
    </div>
  }
}

export default Editor;
