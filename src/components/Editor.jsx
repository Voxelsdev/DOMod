import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import parser from 'himalaya'
import styles from './css/editor';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit() {
    const value = ReactDOM.findDOMNode(this.refs.htmlinput).value
    this.props.changeHTML(parser.parse(value));
  }

  render() {
    return <div className={styles.editorContainer}>
      <div className="row">
        <textarea
          className={classnames(styles.text, 'u-full-width')}
          ref="htmlinput"
        >
        </textarea>
      </div>
      <div className="row">
        <input
          className={classnames('u-full-width', styles.parseHtml)}
          onClick={this.submit}
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
