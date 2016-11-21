import React, { Component } from 'react';
import classnames from 'classnames';
import Editor from './Editor';
import DOMviewer from './DOMviewer';
import styles from './css/main';

class Main extends Component {
  render() {
    return (
      <div className="row">
        <div className="eight columns">
          <DOMviewer />
        </div>
        <div className={classnames('four', 'columns', styles.mainEditContainer)}>
          <Editor />
        </div>
      </div>
    )
  }
}

export default Main;
