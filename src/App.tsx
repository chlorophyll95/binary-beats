import React, { Component } from 'react';
import Editor from 'react-simple-code-editor';
import * as prism from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';

import Tokenizer from './dsl/libs/Tokenizer';
import { BBProgram } from './dsl/ast/BBProgram';

import './App.css';


interface PropType {

}

interface State {
  code: string;
  isSidebarOpen: boolean;
  logs: string[];
}

class App extends Component<any, State> {
  constructor(props: PropType) {
    super(props);

    this.state = {
      code:
        `Set tempo to 120 bpm
      Rhythms:
        Define HAT1 as {xxxxxxxxxxxxxxxx}
        Define SNR1 as [--x---x-]
        Define KCK1 as |x-x-|
      Create beat A with layers:
        HAT: HAT1
        SNR: SNR1
        KCK: KCK1
      Play beat A
      `,
      isSidebarOpen: false,
      logs: [],
    };

    this.pushLog = this.pushLog.bind(this);
    this.clearLog = this.clearLog.bind(this);
  }

  pushLog(log: string) {
    this.setState((previousState) => (
      {
        ...previousState,
        logs: [
          ...previousState.logs,
          log,
        ]
      }
    ));
  }

  clearLog() {
    this.setState((previousState) => ({
      ...previousState,
      logs: []
    }));
  }

  onCompile() {
    // do the stuff here
    this.pushLog('Tokenizing code...');
    let tokenizer = Tokenizer.makeTokenizer(this.state.code);
    this.pushLog('Tokenizing complete ✅');
    let program = new BBProgram();

    // at the end
    this.pushLog('Beat ready 💅');
  }

  render() {
    return (
      <div className="container">
        <div className="editor-container">
          <Editor
            value={this.state.code}
            onValueChange={code => this.setState({ code })}
            highlight={code => prism.highlight(code, prism.languages.javascript, 'javascript')}
            padding={10}
            style={{
              fontFamily: '"Fira Mono", "Fira Mono", monospace'
            }}
            className="container__editor"
          />
          <span
            className="button"
            onClick={this.onCompile.bind(this)}
          >
            Compile
          </span>
        </div>
        <div className="output">
          {
            this.state.logs.map((log: string) => (
              <span>{log}</span>
            ))
          }
          {/* <span>Reading Input...</span>
          <span>Tokenizing...</span>
          <span>Building AST...</span>
          <span>Type Checking...</span>
          <span>Evaluating...</span>
          <span>Done ✅</span>
          <span>Playing your loop 🔁</span> */}
        </div>
      </div>
    );
  }
}

export default App;
