import React, { Component } from 'react';
import Editor from 'react-simple-code-editor';
import * as prism from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import MIDISounds from 'midi-sounds-react';

import Tokenizer from './dsl/libs/Tokenizer';
import { BBProgram } from './dsl/ast/BBProgram';
import { loadSyntaxJs } from './prism-binary-beats';

import './App.css';
import './syntax.css';
import Orb from './ui/Orb';
import SymbolTable from './dsl/libs/SymbolTable';
import tests from './tests';
loadSyntaxJs(prism);

interface PropType {

}

interface State {
  code: string;
  isPlaying: boolean;
  logs: string[];
  tempo: number;
}

const ERROR_STR = "ERROR: ";

class App extends Component<any, State> {
  public midiSounds: any;

  constructor(props: PropType) {
    super(props);

    this.state = {
      code: tests.case2,
      logs: [],
      isPlaying: false,
      tempo: 85,
    };

    this.pushLog = this.pushLog.bind(this);
    this.pushErrorMessage = this.pushErrorMessage.bind(this);
    this.clearLog = this.clearLog.bind(this);
    this.onCompile = this.onCompile.bind(this);
    this.onStop = this.onStop.bind(this);
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

  pushErrorMessage(msg: string) {
    let err = ERROR_STR + msg;
    this.pushLog(err);
  }

  clearLog() {
    this.setState((previousState) => ({
      ...previousState,
      logs: []
    }));
  }

  onCompile() {
    // do the stuff here
    this.clearLog();
    this.pushLog('Tokenizing code...');
    try {
      console.log("starting");
      Tokenizer.makeTokenizer(this.state.code);
      this.pushLog('Tokenizing complete ✅');

      let program = new BBProgram();
      program.parse();

      // at the end
      this.pushLog('Beat ready 💅');
      this.midiSounds.startPlayLoop(program.evaluate(), SymbolTable.tempo, 1 / 16);
      this.setState((prevState) => (
        {
          ...prevState,
          isPlaying: true,
        }
      ));
    }
    catch (e) {
      this.pushErrorMessage(e.message);
    }
  }

  onStop() {
    this.midiSounds.stopPlayLoop();
    this.setState((prevState) => (
      {
        ...prevState,
        isPlaying: false,
      }
    ));
    this.clearLog();
  }

  render() {
    return (
      <div className="container">
        <div className="editor-container">
          <Editor
            value={this.state.code}
            onValueChange={code => this.setState({ code })}
            highlight={code => prism.highlight(code, prism.languages.binaryBeats, 'javascript')}
            padding={10}
            style={{
              fontFamily: '"Fira Mono", "Fira Mono", monospace'
            }}
            className="container__editor"
          />
          <span
            className="button"
            onClick={this.state.isPlaying ? this.onStop : this.onCompile}
          >
            {this.state.isPlaying ? 'Stop' : 'Play'}
          </span>
        </div>
        <div className="output">
          <div className="terminal">
          {
            this.state.logs.map((log: string) => (
              <span key={log}
                className={log.substring(0, 7) === ERROR_STR ? "error_msg" : ""}
              >
                {log}</span>
            ))
          }
          </div>
          <div className="visualizer">
            {this.state.isPlaying && <Orb tempo={this.state.tempo} />}
          </div>
        </div>
        <MIDISounds
          ref={(ref: any) => (this.midiSounds = ref)}
          appElementName="root"
          drums={[5, 15, 35]}
        />
      </div>
    );
  }
}

export default App;
