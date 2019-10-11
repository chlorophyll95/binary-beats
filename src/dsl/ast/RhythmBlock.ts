import { Node } from "../libs/Node";
import RhythmDef from "./RhythmDef";

class RhythmBlock extends Node {
  rhythmDefs: Node[] = [];

  parse(): void {
    this.tokenizer.getAndCheckNext("Rhythms")
    this.tokenizer.getAndCheckNext(":");
    this.tokenizer.skipLine();
    while(this.tokenizer.checkToken("Define")){
      let s: Node = new RhythmDef();
      s.parse();
      this.rhythmDefs.push();
    }
    console.log("done parsing rhythm block");
  }

  evaluate(): void {
    this.rhythmDefs.forEach(element => {
      element.evaluate();
    });
  }

  nameAndTypeCheck(): void {
    throw new Error("Method not implemented.");
  }
}

export default RhythmBlock;