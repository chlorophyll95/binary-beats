import { Node } from "../libs/Node";
import SymbolTable from "../libs/SymbolTable";

class Play extends Node {
  playBeats: string[] = [];

  parse(): void {
    this.tokenizer.getAndCheckNext("Play");
    while(this.tokenizer.hasNext()){
      this.playBeats.push(this.tokenizer.getNext());
    }
  }

  evaluate(): any[] {
    let ret: any[] = [];
    console.log("Eval: Play");
    for (let beat of this.playBeats) {
      if (SymbolTable.beats.has(beat)) {
        let fullBeat =  SymbolTable.beats.get(beat);
        for (let b of fullBeat) {
          ret.push(b);
        }
      }
    }
    
    return ret;
  }
  
  nameAndTypeCheck(): void {
    // check if the beat variable is actually in the list
    for (let beat in this.playBeats) {
      if (!this.playBeats.includes(beat)) {
        throw new Error("Beat " + beat + " has not been declared");
      }
    }
  }
}

export default Play;
