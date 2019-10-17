import React, { Component } from 'react';
import Editor from 'react-simple-code-editor';
import * as prism from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import MIDISounds from 'midi-sounds-react';
import ReactMarkdown from 'react-markdown';

import Tokenizer from './dsl/libs/Tokenizer';
import { BBProgram } from './dsl/ast/BBProgram';
import { loadSyntaxJs } from './prism-binary-beats';

import './App.css';
import './syntax.css';
import Orb from './ui/Orb';
import SymbolTable from './dsl/libs/SymbolTable';
import tests from './tests';
import { BBType } from './dsl/libs/BBTypes';
import Rhythm from './dsl/ast/Rhythm';
import DrumCodeMap from './dsl/libs/DrumCodeMap';
loadSyntaxJs(prism);

interface PropType {

}

interface State {
  code: string;
  isPlaying: boolean;
  logs: string[];
  tempo: number;
  activeTab: number;
  docs: string;
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
      activeTab: 0,
      docs: null,
    };

    this.pushLog = this.pushLog.bind(this);
    this.pushErrorMessage = this.pushErrorMessage.bind(this);
    this.clearLog = this.clearLog.bind(this);
    this.onCompile = this.onCompile.bind(this);
    this.onStop = this.onStop.bind(this);
    this.reset = this.reset.bind(this);
    this.clearSymbolTable = this.clearSymbolTable.bind(this);
    this.onTabSwitch = this.onTabSwitch.bind(this);
  }

  componentDidMount() {
    const readmePath = require('./docs.md');

    fetch(readmePath)
      .then(response => {
        return response.text()
      })
      .then(text => {
        this.setState({
          docs: text,
        })
      })
      .catch((error) => {
        console.log('error fetching docs: ', error);
      })
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

  reset() {
    this.clearLog();
    this.clearSymbolTable();
  }

  clearSymbolTable() {
    SymbolTable.types = new Map<string, BBType>();
    SymbolTable.rhythms = new Map<string, Rhythm>();
    SymbolTable.beats = new Map<string, any[]>();
  }

  clearLog() {
    this.setState((previousState) => ({
      ...previousState,
      logs: []
    }));
  }

  onCompile() {
    // do the stuff here
    this.reset();
    this.pushLog('Tokenizing code...');
    try {
      console.log("starting");
      Tokenizer.makeTokenizer(this.state.code);
      this.pushLog('Tokenizing complete ✅');

      let program = new BBProgram();
      program.parse();
      program.nameAndTypeCheck();
      // at the end
      this.pushLog('Beat ready 💅');
      this.midiSounds.startPlayLoop(program.evaluate(), SymbolTable.tempo, 1 / 16);
      this.setState((prevState) => (
        {
          ...prevState,
          isPlaying: true,
          tempo: SymbolTable.tempo,
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

  onTabSwitch(clickedTab: number) {
    this.setState((prevState) => ({
      ...prevState,
      activeTab: clickedTab,
    }));
  }

  render() {
    const { activeTab, docs } = this.state;

    return (
      <div className="container">
        <div className="tool-bar">
          <div className="logo-container">
            <span className="logo">
              <span className="emoji">🅱</span>️inary <span className="emoji">🅱</span>️eats
            </span>
          </div>
          <div className="tabs">
            <span
              className={`tab ${activeTab === 0 ? 'active' : ''}`}
              onClick={() => this.onTabSwitch(0)}
            >
              <span className="emoji">💻</span>Output
            </span>
            <span
              className={`tab ${activeTab === 1 ? 'active' : ''}`}
              onClick={() => this.onTabSwitch(1)}
            >
              <span className="emoji">📄</span>Docs
            </span>
          </div>
        </div>
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
            className={this.state.code.trim().length == 0 ? "button disabled" : "button"}
            onClick={this.state.isPlaying ? this.onStop : this.onCompile}
          >
            {this.state.isPlaying ? 'Stop' : 'Play'}
          </span>
        </div>
        {
          activeTab === 0 && (
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
          )
        }
        {
          activeTab === 1 && (
            <div className="docs-container">
              <ReactMarkdown
                source={docs}
                className="docs"
              />
            </div>
          )
        }
        <MIDISounds
          ref={(ref: any) => (this.midiSounds = ref)}
          appElementName="root"
          drums={DrumCodeMap.drumCodes}
        />
      </div>
    );
  }
}

export default App;
