import { Node } from "../libs/Node";
import Tokenizer from "../libs/Tokenizer";
import Quarters from "./Quarters";
import Rhythm from "./Rhythm";
import Eighths from "./Eighths";
import Sixteenths from "./Sixteenths";
import SymbolTable from "../libs/SymbolTable";
import ErrorUtil from "../libs/ErrorUtil";

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

  evaluate(): number[] {
    let rhythm: Rhythm = this.rhythm;
    
    if (!this.rhythm && this.rhythmName) { // it's a rhythmName
      rhythm = SymbolTable.rhythms.get(this.rhythmName);
      if (rhythm === undefined){
        ErrorUtil.varUndefind(this.rhythmName);
      }
    }
    
    rhythm.setDrumCode(this.drumCode);
    return rhythm.evaluate();
  }

  nameAndTypeCheck(): void {
    if (this.rhythmName){
      if(!SymbolTable.rhythms.has(this.rhythmName)){
        ErrorUtil.varUndefind(this.rhythmName);
      }
    }
  }
}

export default Bar;
