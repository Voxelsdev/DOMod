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
  }

  render() {
//     let hiddenHTML = '';
//     if (this.props.moddedHTML && this.props.endIndex === -1) {
//       hiddenHTML = this.state.htmlToReactParser.parse(this.props.moddedHTML);
//     } else if (this.props.testMode) {
//       hiddenHTML = this.state.htmlToReactParser.parse(`<div id='__body'>
// ${this.props.html.substring(6, this.props.html.lastIndexOf('</body>'))}</div>`);
//     }
//     console.log(hiddenHTML);

    return (
      <div className="controlPanel" id={Styles.controlPanel}>
        <Toggle setTestMode={this.props.setTestMode}/>
        <button id={!this.props.testMode ?
                    Styles.parseHTMLButton: Styles.hiddenParseHTMLButton}
                onClick={this.props.setJSON}>
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
                  onClick={this.props.runNextCode}
                  id="getNextInJSArr">
            &#8674;
          </button>
        </div>
        <div className="hiddenHTML" id={Styles.userHTML}>
          {/* {hiddenHTML} */}
        </div>
      </div>
    );
  }
}

export default Controller;
