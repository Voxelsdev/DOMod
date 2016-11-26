import React, { Component } from 'react';

import JSController from './JSController';

import Styles from './css/js-player';

class JSPlayer extends Component {
  getIndentedHighlightedHTML() {
    return this.props.html.split(/\n/g).map((line, key) => {
      return <p className={Styles.lineofcode}
                key={key}>{line.replace(/\s/g, "\u00a0")}
             </p>
    })
  }

  getIndentedHighlightedJS() {
    return this.props.js.split(/\n/g).map((line, key) => {
      const hasDOMManipulator = line.indexOf('document') !== -1;

      return <p className={hasDOMManipulator ?
                            Styles.highlightedlineofcode:Styles.lineofcode}
                key={key}>{line.replace(/\s/g, "\u00a0")}
             </p>
      })
    }

  render() {

    return (
      <div>
        <div id={Styles.htmlviewer}>
          {this.getIndentedHighlightedHTML()}
        </div>
        <JSController setSelectors={this.props.setSelectors}/>
        <div id={Styles.jsviewer}>
          {this.getIndentedHighlightedJS()}
        </div>
      </div>
    );
  }
}

export default JSPlayer;
