import React, { Component } from 'react';
import htmlToReact from 'html-to-react';
import jsxToString from 'jsx-to-string';

import Styles from './css/js-controller';

const getHTMLString = function(userHTML) {
  const tempNode = document.createElement('div');
  tempNode.appendChild(userHTML.cloneNode(true));
  const str = tempNode.innerHTML;
  return str;
}

class JSController extends Component {
  constructor() {
    super();
    this.state = {
      htmlToReactParser: new htmlToReact.Parser(React)
    }
  }

  componentDidUpdate() {
    const newHTML = getHTMLString(this.textInput)
                      .replace(/<!--[\s\S]*?-->/g, '');
    console.log(newHTML.substring(newHTML.indexOf('>') + 1, newHTML.lastIndexOf('<')));
  }

  render() {

    return (
      <div id={Styles.controlPanel}>
        <button className={Styles.controllerButton}>
          <img className={Styles.controlButtonIcon} />
                {/* src={require('file!./icons/last.png')} /> */}
        </button>
        <p id={Styles.controllerTitle}>javascript controller</p>
        <button className={Styles.controllerButton}
                onClick={this.props.setSelectors}>
          <img className={Styles.controlButtonIcon}
               onClick={this.showUserHTML}/>
               {/* src={require('file!./icons/next.png')}/> */}
        </button>
        <div id={Styles.userHTML} ref={(div) => {this.textInput = div;}}>
          {this.state.htmlToReactParser.parse(this.props.html)}
        </div>
      </div>
    );
  }
}

export default JSController;
