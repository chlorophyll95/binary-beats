import React, { Component } from 'react';
import Editor from 'react-simple-code-editor';
import * as prism from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import MIDISounds from 'midi-sounds-react';

import Tokenizer from './dsl/libs/Tokenizer';
import { BBProgram } from './dsl/ast/BBProgram';
import DrumCodeMap from './dsl/libs/DrumCodeMap';
import { loadSyntaxJs } from './prism-binary-beats';

import './App.css';
import './syntax.css';

import Quarters from './dsl/ast/Quarters';
import Eighths from './dsl/ast/Eighths';
import Sixteenths from './dsl/ast/Sixteenths';
import Rhythm from './dsl/ast/Rhythm';
import Orb from './ui/Orb';

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
      let tokenizer = Tokenizer.getTokenizer();
      this.pushLog('Tokenizing complete ✅');

      let program = new BBProgram();
      program.parse();
      console.log("finished parsing");
      // TEST FOR RHYTHM NODE ONLY
      var rhythm: Rhythm;
      if (tokenizer.checkToken('|')) {
        rhythm = new Quarters();
      }
      else if (tokenizer.checkToken('[')) {
        rhythm = new Eighths();
      }
      else if (tokenizer.checkToken('{')) {
        rhythm = new Sixteenths();
      }
      else {
        this.pushErrorMessage("UI can only support quarters, eighths, and sixteenths right now");
        return;
      }

      rhythm.setDrumCode(DrumCodeMap.getDrumCode('KCK'));
      rhythm.parse();
      rhythm.evaluate();

      // at the end
      this.pushLog('Beat ready 💅');

      this.midiSounds.startPlayLoop(rhythm.evaluate(), this.state.tempo, 1 / 16);
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
