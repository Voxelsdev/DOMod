import React, { Component } from 'react';

// const Codemirror = require('react-codemirror');
//
// require('../codemirror/mode/javascript/javascript');
// require('../codemirror/mode/xml/xml');
// require('../codemirror/lib/codemirror.css');

import styles from './css/editor';

class Editor extends Component {
  render() {
    return <div className="editor-container">
      <div className="row">
        <textarea
          className="u-full-width"
          id={styles.text}>
        </textarea>
      </div>
      <div className="row">
        <input
          className="u-full-width"
          id={styles.parseHtml}
          type="button"
          value="Parse HTML!"
        />
      </div>
    </div>
  }
}

export default Editor;

// constructor() {
//   super();
//   this.code = '// Code'
// }
//
// updateCode(newCode) {
//   this.code = newCode;
// }
//
// render() {
//   const options = {
//     lineNumbers: true
//   };
//
//   return (
//     <Codemirror value={this.code}
//                 onChange={this.updateCode}
//                 options={options}
//                 interact={this.interact} />
//   )
// }
