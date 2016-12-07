import React, { Component } from 'react';
import htmlToReact from 'html-to-react';
import jsxToString from 'jsx-to-string';
import parser from 'himalaya';

import Toggle from './Toggle';

import Styles from './css/controller';

// Himalaya parses the spaces in the user's HTML as children,
// this fixes that
function fixUpParsedHTML(obj) {
  if (obj.hasOwnProperty('children')) {
    for (let i = obj.children.length - 1; i >= 0; i--) {
      if (!obj.children[i].hasOwnProperty('tagName')) {
        obj.children.splice(i, 1);
      } else {
        fixUpParsedHTML(obj.children[i]);
      }
    }
  }
}

class Controller extends Component {
  constructor() {
    super();
    this.state = {
      htmlToReactParser: new htmlToReact.Parser(React)
    }
    this.parseHtml = this.parseHtml.bind(this);
  }

  parseHtml() {
    const htmlTree = parser.parse(this.props.html);
    fixUpParsedHTML(htmlTree[0]);
    this.props.setJSONFromHTML(htmlTree);
  }

  render() {
    const fixedHTML = `<div id='__body'>
      ${this.props.html.substring(6, this.props.html.length - 7)}</div>`;

    return (
      <div id={Styles.controlPanel}>
        <Toggle setTestMode={this.props.setTestMode}/>
        <button id={!this.props.testMode ?
                    Styles.parseHTMLButton: Styles.hiddenParseHTMLButton}
                onClick={this.parseHtml}>
          parse HTML
        </button>
        <div id={this.props.testMode ?
                  Styles.playButtonContainer:Styles.hiddenPlayButtonContainer}>
          <button className={Styles.controllerButton}
                  onClick={this.props.setJSArrIndex}
                  id="startJSArrOver">
            &#8635;
          </button>
          <button className={Styles.controllerButton}
                  onClick={this.props.setJSArrIndex}
                  id="getNextInJSArr">
            &#8674;
          </button>
        </div>
        <div id={Styles.userHTML} ref={(div) => {this.textInput = div;}}>
          {this.props.testMode ?
            this.state.htmlToReactParser.parse(fixedHTML):''}
        </div>
      </div>
    );
  }
}

export default Controller;
