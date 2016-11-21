import React, { Component } from 'react';
import classnames from 'classnames';
import Editor from './Editor';
import DOMviewer from './DOMviewer';
import styles from './css/main';

class Main extends Component {
  constructor() {
    super();
    this.state = {
      html: 'Enter your HTML here!'
    }
  }

  handleChange(html) {
    this.setState({ html });
  }

  parseHtml() {
    console.log(this.state.html);
  }

  render() {
    return (
      <div className="row">
        <div className="eight columns">
          <DOMviewer />
        </div>
        <div className={classnames('four', 'columns', styles.mainEditContainer)}>
          <Editor
            hmtl={this.state}
            handleChange={this.handleChange}/>
        </div>
      </div>
    )
  }
}

export default Main;
