import React, { Component } from 'react';
import htmlToReact from 'html-to-react';
import jsxToString from 'jsx-to-string';
import parser from 'himalaya';

import Toggle from './Toggle';

import Styles from './css/controller';

const getHTMLString = function(userHTML) {
  const tempNode = document.createElement('div');
  tempNode.appendChild(userHTML.cloneNode(true));
  const str = tempNode.innerHTML;
  return str;
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
    this.props.setJSONFromHTML(parser.parse(this.props.html));
  }

  // componentDidUpdate() {
  //   const newHTML = getHTMLString(this.textInput)
  //                     .replace(/<!--[\s\S]*?-->/g, '');
  //   newHTML.substring(newHTML.indexOf('>') + 1, newHTML.lastIndexOf('<'));
  // }

  render() {

    return (
      <div id={Styles.controlPanel}>
        <Toggle setEditorMode={this.props.setEditorMode}/>
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
        {/* <div id={Styles.userHTML} ref={(div) => {this.textInput = div;}}>
          {this.state.htmlToReactParser.parse(this.props.html)}
        </div> */}
      </div>
    );
  }
}

export default Controller;
