import { Node } from "../libs/Node";
import SymbolTable from "../libs/SymbolTable";

class Tempo extends Node {
  tempo: number;
  
  parse(): void {
    console.log("Started parsing tempo");
    this.tokenizer.getAndCheckNext("Set");
    this.tokenizer.getAndCheckNext("tempo");
    this.tokenizer.getAndCheckNext("to");
    let tempoStr = Number(this.tokenizer.getNext());
    if(isNaN(tempoStr)){
      throw new Error("Tempo needs to be a number");
    }
    this.tokenizer.getAndCheckNext("bpm");
    console.log("done parsing tempo")
  }

  evaluate(): void {
    console.log("evaluating tempo")
    SymbolTable.tempo = this.tempo;
  }

  nameAndTypeCheck(): void {
    console.log("type checking ")
    if (this.tempo < 0 || this.tempo > 1000){
      throw new Error("Tempo needs to be between 0 and 1000");
    }
  }
}

export default Tempo;
