import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

import classnames from 'classnames';
import parser from 'himalaya';
import styles from './css/editor';

import AceEditor from 'react-ace';
import Toggle from './Toggle';

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
    const currentUrl = window.location.href.toString();
    const currentPage = currentUrl.substring(currentUrl.lastIndexOf('/'));
    console.log(currentPage === '/')

    return <div className={styles.editorContainer}>
        <Toggle />
        <AceEditor
          readOnly = {currentPage === '/js-player'}
          mode="html"
          theme="tomorrow_night_eighties"
          width="100%"
          value={this.props.html}
          onChange={this.props.changeHTML}
        />
        <input
          className={classnames('u-full-width', styles.parseHtml)}
          onClick={this.parseHtml}
          type="submit"
          value="Click to Parse HTML!"
        />
        <AceEditor
          mode="javascript"
          theme="tomorrow_night_eighties"
          width="100%"
          value={this.props.js}
          onChange={this.props.changeJS}
          markers={[{startRow: 0, startCol: 0, endRow: 2, endCol: 200,
                  className: styles.domManipulator, type:"background"}]}
        />
        <button
          onClick={this.props.setJSArr}>
          <Link to='/js-player'>Run JS</Link>
        </button>
    </div>
  }
}

export default Editor;
