import { Node } from "../libs/Node";
import SymbolTable from "../libs/SymbolTable";
import ErrorUtil from "../libs/ErrorUtil";

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
      } else {
        ErrorUtil.varUndefind(beat);
      }
    }
    
    return ret;
  }
  
  nameAndTypeCheck(): void {
    // idk what to put here
    // can't check if beat var is in SymbolTable since it hasnt been populated yet
  }
}

export default Play;
