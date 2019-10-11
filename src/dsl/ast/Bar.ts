import { Node } from "../libs/Node";
import Tokenizer from "../libs/Tokenizer";
import Quarters from "./Quarters";
import Rhythm from "./Rhythm";
import Eighths from "./Eighths";
import Sixteenths from "./Sixteenths";
import SymbolTable from "../libs/SymbolTable";

class Bar extends Node {
  rhythm?: Rhythm;
  rhythmName?: string;
  drumCode: number;

  constructor(drumCode: number = 0) {
    super();

    this.drumCode = drumCode;
  }
  
  parse(): void {
    let tokenizer = Tokenizer.getTokenizer();

    if (tokenizer.checkToken("|")) {
      this.rhythm = new Quarters();
    }
    else if (tokenizer.checkToken("[")) {
      this.rhythm = new Eighths();
    }
    else if (tokenizer.checkToken("{")) {
      this.rhythm = new Sixteenths();
    } else {
      this.rhythmName = tokenizer.getNext();
    }

    if (this.rhythm) {
      this.rhythm.parse();
    }
  }
  evaluate(): number[][][] {
    let retrievedRhythm;

    if (this.rhythm) {
      this.rhythm.setDrumCode(this.drumCode);
      retrievedRhythm = this.rhythm.evaluate();

    } else if (this.rhythmName) {
      if (SymbolTable.rhythms[this.rhythmName] == undefined) {
        throw new Error(`Undeclared rhythm ${this.rhythmName}`);
      } else {
        retrievedRhythm = SymbolTable.rhythms[this.rhythmName];
      }
    }

    console.log("Retrieved Rhythm:", retrievedRhythm);
    return retrievedRhythm;
  }

  nameAndTypeCheck(): void {
    throw new Error("Method not implemented.");
  }
}

export default Bar;
