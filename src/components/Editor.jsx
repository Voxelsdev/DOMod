import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './css/editor';

class Editor extends Component {
  render() {
    return <div className={styles.editorContainer}>
      <div className="row">
        <textarea className={classnames(styles.text, 'u-full-width')}>
        </textarea>
      </div>
      <div className="row">
        <input
          className={classnames('u-full-width', styles.parseHtml)}
          type="button"
          value="Parse HTML!"
        />
      </div>
    </div>
  }
}

export default Editor;
