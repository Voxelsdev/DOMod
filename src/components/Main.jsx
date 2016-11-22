import React, { Component } from 'react';
import classnames from 'classnames';
import Editor from './Editor';
import DOMviewer from './DOMviewer';
import styles from './css/main';

class Main extends Component {
  constructor() {
    super();
    this.state = {
      html: 'Enter your HTML here!',
      tree: d3.layout.tree().size([500, 500])
    }
    this.changeHTML = this.changeHTML.bind(this);
  }

  changeHTML(html) {
    this.setState({ html });
  }

  render() {
    return (
      <div className="row">
        <div className="eight columns">
          <DOMviewer tree={this.state.tree}
                     html={this.state.html}/>
        </div>
        <div className={classnames('four', 'columns', styles.mainEditContainer)}>
          <Editor
            html={this.html}
            changeHTML={this.changeHTML}/>
        </div>
      </div>
    )
  }
}

export default Main;
