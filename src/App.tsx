import React, { Component } from 'react';
import Editor from 'react-simple-code-editor';
import * as prism from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import MIDISounds from 'midi-sounds-react';

import Tokenizer from './dsl/libs/Tokenizer';
import { BBProgram } from './dsl/ast/BBProgram';
import DrumCodeMap from './dsl/libs/DrumCodeMap';

import './App.css';
import './syntax.css';

import Quarters from './dsl/ast/Quarters';

interface PropType {

}

interface State {
  code: string;
  isPlaying: boolean;
  logs: string[];
}

class App extends Component<any, State> {
  private midiSounds: any;

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
Play beat A`,
      logs: [],
      isPlaying: false,
    };

    this.pushLog = this.pushLog.bind(this);
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
    let tokenizer = Tokenizer.makeTokenizer(this.state.code);
    this.pushLog('Tokenizing complete ✅');
    let program = new BBProgram();

    let quarter = new Quarters();
    quarter.setDrumCode(DrumCodeMap.getDrumCode('KCK'));
    quarter.parse();
    quarter.evaluate();

    // at the end
    this.pushLog('Beat ready 💅');

    this.midiSounds.startPlayLoop(quarter.evaluate(), 100, 1 / 16);
    this.setState((prevState) => (
      {
        ...prevState,
        isPlaying: true,
      }
    ));
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
            highlight={code => prism.highlight(code, prism.languages.javascript, 'javascript')}
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
            {this.state.isPlaying ? 'Stop' : 'Compile'}
          </span>
        </div>
        <div className="output">
          {
            this.state.logs.map((log: string) => (
              <span key={log}>{log}</span>
            ))
          }
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
