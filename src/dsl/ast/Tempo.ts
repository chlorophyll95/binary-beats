import { Node } from "../libs/Node";
import SymbolTable from "../libs/SymbolTable";

class Tempo extends Node {
  tempo: number;
  
  parse(): void {
    this.tokenizer.getAndCheckNext("Set");
    this.tokenizer.getAndCheckNext("tempo");
    this.tokenizer.getAndCheckNext("to");
    this.tempo = Number(this.tokenizer.getNext());
    if(isNaN(this.tempo)){
      throw new Error("Tempo needs to be a number");
    }
    this.tokenizer.getAndCheckNext("bpm");
  }

  evaluate(): void {
    SymbolTable.tempo = this.tempo;
  }

  nameAndTypeCheck(): void {
    if (this.tempo < 0 || this.tempo > 1000){
      throw new Error("Tempo needs to be between 0 and 1000");
    }
  }
}

export default Tempo;
