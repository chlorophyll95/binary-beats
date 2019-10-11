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
      this.rhythmDefs.push(s);
    }
  }

  evaluate(): void {
    console.log("Eval: RythmBlock");
    for (let element of this.rhythmDefs) {
      element.evaluate();
    }
  }

  nameAndTypeCheck(): void {
    throw new Error("Method not implemented.");
  }
}

export default RhythmBlock;