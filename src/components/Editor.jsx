import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import styles from './css/editor';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit() {
    const value = ReactDOM.findDOMNode(this.refs.htmlinput).value
    this.props.handleChange(value);
  }

  render() {
    return <div className={styles.editorContainer}>
      <div className="row">
        <textarea
          ref="htmlinput"
          className={classnames(styles.text, 'u-full-width')}
        >
        </textarea>
      </div>
      <div className="row">
        <input
          className={classnames('u-full-width', styles.parseHtml)}
          type="submit"
          onClick={this.submit}
          value="Parse HTML!"
        />
      </div>
    </div>
  }
}

export default Editor;
