import React, { Component } from 'react';
import classnames from 'classnames';
import Editor from './Editor';
import DOMviewer from './DOMviewer';

class Main extends Component {
  render() {
    return (
      <div className={classnames('row', styles.maincontainer)}>
        <div className="eight columns">
          <DOMviewer />
        </div>
        <div className='four columns'>
          <Editor />
        </div>
      </div>
    )
  }
}

export default Main;
