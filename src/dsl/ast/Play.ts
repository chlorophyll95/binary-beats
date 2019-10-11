import { Node } from "../libs/Node";

class Play extends Node {
  playBeats: string[] = [];

  parse(): void {
    this.tokenizer.getAndCheckNext("Play");
    while(this.tokenizer.hasNext()){
      this.playBeats.push(this.tokenizer.getNext());
    }
    console.log("done play parse");
  }

  evaluate(): void {
    throw new Error("Method not implemented.");
  }
  
  nameAndTypeCheck(): void {
    // check if the beat variable is actually in the list
    for (let beat in this.playBeats){
      if (!this.playBeats.includes(beat)){
        throw new Error("Beat " + beat + " has not been declared");
      }
    }
  }
}

export default Play;
