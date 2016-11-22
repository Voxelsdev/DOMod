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
  }

  changeHTML(html) {
    this.setState({ html });
  }

  parseHtml() {
    console.log(this.state.html);
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
            handleChange={this.changeHTML}/>
        </div>
      </div>
    )
  }
}

export default Main;
