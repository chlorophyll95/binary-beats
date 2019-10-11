import { Node } from "../libs/Node";
import Tokenizer from "../libs/Tokenizer";
import Rhythm from "./Rhythm";
import SymbolTable from "../libs/SymbolTable";
import { BBType } from "../libs/BBTypes";
import Quarters from "./Quarters";
import Eighths from "./Eighths";
import Sixteenths from "./Sixteenths";

class RhythmDef extends Node {
  // example: Define HAT1 as [x-x-x-x-]
  rhythmName: string = "";
  rhythm!: Rhythm;

  parse(): void {
    let tokenizer = Tokenizer.getTokenizer();
    tokenizer.getAndCheckNext('Define');
    this.rhythmName = tokenizer.getNext();
    tokenizer.getAndCheckNext('as');

    if (tokenizer.checkToken("|")) {
      this.rhythm = new Quarters();
      console.log("quarter")
    }
    else if (tokenizer.checkToken("[")) {
      this.rhythm = new Eighths();
      console.log("eighth")
    }
    else if (tokenizer.checkToken("{")) {
      this.rhythm = new Sixteenths();
      console.log("sixteenth")
    }
    else throw new Error (`Unexpected token at line: ${tokenizer.line}, column: ${tokenizer.column}`);

    this.rhythm.parse();
  }

  // saves rhythm to rhythm name
  // TODO: test this after rhythm is done
  evaluate(): void {
    SymbolTable.rhythms.set(this.rhythmName, this.rhythm);
    //SymbolTable.rhythms[this.rhythmName] = this.rhythm;
  }

  nameAndTypeCheck(): void {
    this.validateName(this.rhythmName);
    if (SymbolTable.rhythms.has(this.rhythmName)) {
      throw new Error(`Rhythm with name ${this.rhythmName} has already been defined.`);
    }
    SymbolTable.types.set(this.rhythmName, BBType.Rhythm);
  }
}

export default RhythmDef;
