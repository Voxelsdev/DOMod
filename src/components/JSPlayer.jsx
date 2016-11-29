import React, { Component } from 'react';

import JSController from './JSController';

import Styles from './css/js-player';

class JSPlayer extends Component {
  getIndentedHTML() {
    return this.props.html.split(/\n/g).map((line, key) => {
      return <p key={key}
                className={Styles.lineOfCode}>
               {line.replace(/\s/g, "\u00a0")}
             </p>
    })
  }

  getIndentedHighlightedJS() {
    let fixedJS = [];
    for (const codeBit of this.props.jsArr) {
      fixedJS.push(codeBit.js.split(/\n/g).map((line, key) => {

        return <p className={codeBit.hasOwnProperty('domElement') ?
                              Styles.highlightedLineOfCode:Styles.lineOfCode}
                  key={key}>{line.replace(/\s/g, "\u00a0")}
               </p>
        }));
    }
    return fixedJS;
  }

  render() {

    return (
      <div>
        <div id={Styles.htmlviewer}>
          {this.getIndentedHTML()}
        </div>
        <JSController html={this.props.html}
                      setJSArrIndex={this.props.setJSArrIndex}/>
        <div id={Styles.jsviewer}>
          {this.getIndentedHighlightedJS()}
        </div>
      </div>
    );
  }
}

export default JSPlayer;
