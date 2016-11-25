import React, { Component } from 'react';

import Styles from './css/js-player';

class JSPlayer extends Component {
  getIndentedCode(codeType) {
    return this.props[codeType].split(/\n/g).map((line, key) => {
      return <p className={Styles.lineofcode}
                key={key}>{line.replace(/\s/g, "\u00a0")}
             </p>
    })
  }

  render() {

    return (
      <div>
        <div id={Styles.htmlviewer}>
          {this.getIndentedCode('html')}
        </div>
        <div id={Styles.jsviewer}>
          {this.getIndentedCode('js')}
        </div>
      </div>
    );
  }
}

export default JSPlayer;
