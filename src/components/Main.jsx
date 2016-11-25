import React, { Component } from 'react';
<<<<<<< HEAD
import { Match, Miss } from 'react-router';

import classnames from 'classnames';
import DOMviewer from './DOMviewer';
import Editor from './Editor';
import JSPlayer from './JSPlayer';

import styles from './css/mainapp';

import { Match } from 'react-router';
import MainApp from './MainApp';
// import Signup from './signup';
import Login from './Login';

class Main extends Component {
  constructor() {
    super();
    this.state = {
      html: 'Add html here',
      jsonFromHtml: null,
      js: 'Add javascript here',
      tree: d3.layout.tree().size([500, 500])
    }
    this.changeHTML = this.changeHTML.bind(this);
    this.changeJS = this.changeJS.bind(this);
    this.setJsonFromHtml = this.setJsonFromHtml.bind(this);
  }

  changeHTML(html) {
    this.setState({ html });
  }

  changeJS(js) {
    this.setState({ js });
  }

  setJsonFromHtml (jsonFromHtml) {
    this.setState({ jsonFromHtml });
  }

  render() {

    return (
      <div className="row">
        <div className="eight columns">
          <DOMviewer tree={this.state.tree}
                     jsonFromHtml={this.state.jsonFromHtml} />
        </div>
        <div className={classnames('four', 'columns', styles.mainEditContainer)}>
          <Match pattern="/" exactly render={
            () => <Editor
                    html={this.state.html}
                    changeHTML={this.changeHTML}
                    js={this.state.js}
                    changeJS={this.changeJS}
                    setJsonFromHtml={this.setJsonFromHtml} />
          }/>
          <Match pattern="/js-player" exactly render={
            () => <JSPlayer
                    html={this.state.html}
                    js={this.state.js} />
          }/>
        </div>
      <div>
        <Match pattern="/" exactly component={MainApp} />
        <Match pattern="/login" exactly component={Login} />
        {/* <Match pattern="/signup" component={Signup} /> */}
      </div>
    )
  }
}

export default Main;
