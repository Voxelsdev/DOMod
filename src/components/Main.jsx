import React, { Component } from 'react';

import Editor from './Editor';
import DOMviewer from './DOMviewer';

require('./css/main.css');

class Main extends Component {
  render() {
    return (
      <div className="row">
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
