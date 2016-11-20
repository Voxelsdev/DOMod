import React, { Component } from 'react';

// const Codemirror = require('react-codemirror');
//
// require('../codemirror/mode/javascript/javascript');
// require('../codemirror/mode/xml/xml');
// require('../codemirror/lib/codemirror.css');

class Editor extends Component {
  render() {
    return <div>I am the editor</div>
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
