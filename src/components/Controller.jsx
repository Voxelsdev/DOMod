import React, { Component } from 'react';
import htmlToReact from 'html-to-react';
import jsxToString from 'jsx-to-string';
import parser from 'himalaya';

import Toggle from './Toggle';

import Styles from './css/controller';

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

  render() {

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
            this.state.htmlToReactParser.parse(this.props.html):''}
        </div>
      </div>
    );
  }
}

export default Controller;
