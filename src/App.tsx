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
import { plainJane, nightmare, drake } from './presets';

import './App.css';
import './syntax.css';
import Orb from './ui/Orb';
import SymbolTable from './dsl/libs/SymbolTable';
import { BBType } from './dsl/libs/BBTypes';
import Rhythm from './dsl/ast/Rhythm';
import DrumCodeMap from './dsl/libs/DrumCodeMap';
import Button from './ui/Button';
import LocalStorageService from './services/LocalStorageService';

loadSyntaxJs(prism);

interface PropType {

}

interface State {
  code: string;
  isPlaying: boolean;
  logs: string[];
  tempo: number;
  activeTab: number;
  activeSideTab: number;
  docs: string;
  canSave: boolean;
  presets: any;
}

type TabType = 'top' | 'side';

const ERROR_STR = "ERROR: ";

class App extends Component<any, State> {
  public midiSounds: any;

  constructor(props: PropType) {
    super(props);

    this.state = {
      code: plainJane,
      logs: [],
      isPlaying: false,
      tempo: 85,
      activeTab: 0,
      activeSideTab: 0,
      docs: null,
      canSave: null,
      presets: {
        1: plainJane,
        2: nightmare,
        3: drake,
      },
    };

    this.pushLog = this.pushLog.bind(this);
    this.pushErrorMessage = this.pushErrorMessage.bind(this);
    this.clearLog = this.clearLog.bind(this);
    this.onCompile = this.onCompile.bind(this);
    this.onStop = this.onStop.bind(this);
    this.reset = this.reset.bind(this);
    this.clearSymbolTable = this.clearSymbolTable.bind(this);
    this.onTabSwitch = this.onTabSwitch.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onCodeChange = this.onCodeChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.getCurrentCode = this.getCurrentCode.bind(this);
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

    if (LocalStorageService.hasCode()) {
      this.setState((prevState) => ({
        ...prevState,
        code: LocalStorageService.loadCode(),
      }));
    }

    document.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown(event: any) {
    // apple cmd is metaKey
    if (event.metaKey || event.ctrlKey) {
      if (event.keyCode === 83) {
        event.preventDefault();
        this.onSave();
      }
    }
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

  onSave() {
    LocalStorageService.saveCode(this.state.code.trim());

    this.setState((prevState) => ({
      ...prevState,
      code: this.state.code.trim(),
      canSave: false
    }));

    setTimeout(() => {
      this.setState({
        canSave: null,
      })
    }, 1000);
  }

  getCurrentCode() {
    const { presets, activeSideTab, code } = this.state;

    return activeSideTab > 0 ? presets[activeSideTab] : code;
  }

  onCompile() {
    this.reset();
    this.pushLog('Tokenizing code...');
    try {
      console.log("starting");
      Tokenizer.makeTokenizer(this.getCurrentCode());
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

  onTabSwitch(clickedTab: number, tabType: TabType) {
    this.setState((prevState) => ({
      ...prevState,
      [tabType === 'top' ? 'activeTab' : 'activeSideTab']: clickedTab,
    }));
  }

  onCodeChange(code: string) {
    const { activeSideTab, presets } = this.state;

    if (activeSideTab > 0) {
      this.setState((prevState) => ({
        ...prevState,
        presets: {
          ...presets,
          [activeSideTab]: code,
        }
      }));
    } else {
      this.setState({
        code,
        canSave: true,
      });
    }
  }

  render() {
    const { activeTab, docs, canSave, activeSideTab } = this.state;

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
              onClick={() => this.onTabSwitch(0, 'top')}
            >
              <span className="emoji">💻</span>Output
            </span>
            <span
              className={`tab ${activeTab === 1 ? 'active' : ''}`}
              onClick={() => this.onTabSwitch(1, 'top')}
            >
              <span className="emoji">📄</span>Docs
            </span>
          </div>
        </div>
        <div className="left-container">
          <div className="side-bar">
            <span
              className={`side-tab ${activeSideTab === 0 ? 'active' : ''}`}
              onClick={() => this.onTabSwitch(0, 'side')}
            >
              Work <br /> Space
            </span>
            <span className="tab-separator">PRESETS</span>
            <span
              className={`side-tab ${activeSideTab === 1 ? 'active' : ''}`}
              onClick={() => this.onTabSwitch(1, 'side')}
            >
              A
            </span>
            <span
              className={`side-tab ${activeSideTab === 2 ? 'active' : ''}`}
              onClick={() => this.onTabSwitch(2, 'side')}
            >
              B
            </span>
            <span
              className={`side-tab ${activeSideTab === 3 ? 'active' : ''}`}
              onClick={() => this.onTabSwitch(3, 'side')}
            >
              C
            </span>
          </div>
          <div className="editor-container">
            <Editor
              value={this.getCurrentCode()}
              onValueChange={code => this.onCodeChange(code)}
              highlight={code => prism.highlight(code, prism.languages.binaryBeats, 'javascript')}
              padding={10}
              style={{
                fontFamily: '"Fira Mono", "Fira Mono", monospace'
              }}
              className="container__editor"
            />
            <div className="buttons-bar">
              {
                canSave !== null && activeSideTab === 0 && (
                  <Button
                    disabled={!canSave}
                    type="save"
                    onClick={this.onSave}
                    text={canSave === false ? 'Saved!' : 'Save'}
                    style={{ marginRight: '12px' }}
                  />
                )
              }
              <Button
                type="play"
                disabled={this.state.code.trim().length == 0}
                onClick={this.state.isPlaying ? this.onStop : this.onCompile}
                text={this.state.isPlaying ? 'Stop' : 'Play'}
              />
            </div>
          </div>
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
