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
  constructor(props) {
    super(props);
    this.parseHtml = this.parseHtml.bind(this);
  }

  parseHtml() {
    const value = ReactDOM.findDOMNode(this.refs.htmlinput).value;
    console.log(ReactDOM.findDOMNode(this.refs.htmlinput));
    this.props.changeHTML(parser.parse(value));
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
        />
      </div>
      <div className="row">
        <input
          className={classnames('u-full-width', styles.parseHtml)}
          onClick={this.parseHtml}
          type="submit"
          value="Parse HTML!"
        />
      </div>
    </div>
  }
}

export default Editor;

<div class="dude">
  <div id="man">
    <p>man</p></div><p>dude</p></div>
