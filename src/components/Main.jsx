import React, { Component } from 'react';
import classnames from 'classnames';
import Editor from './Editor';
import DOMviewer from './DOMviewer';
import styles from './css/main';

class Main extends Component {
  constructor() {
    super();
    this.state = {
      html: 'Add html here',
      tree: d3.layout.tree().size([500, 500]),
      jsonFromHtml: null
    }
    this.changeHTML = this.changeHTML.bind(this);
    this.setJsonFromHtml = this.setJsonFromHtml.bind(this);
  }

  changeHTML(html) {
    this.setState({ html });
  }

  setJsonFromHtml (jsonFromHtml) {
    this.setState({ jsonFromHtml });
  }

  render() {

    return (
      <div className="row">
        <div className="eight columns">
          <DOMviewer tree={this.state.tree}
                     jsonFromHtml={this.state.jsonFromHtml}/>
        </div>
        <div className={classnames('four', 'columns', styles.mainEditContainer)}>
          <Editor
            html={this.state.html}
            changeHTML={this.changeHTML}
            setJsonFromHtml={this.setJsonFromHtml}/>
        </div>
      </div>
    )
  }
}

export default Main;
