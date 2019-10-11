import { Node } from "../libs/Node";
import Tokenizer from "../libs/Tokenizer";
import { DrumType } from "./DrumType";
import Repeat from "./Repeat";
import Bar from "./Bar";

class Layer extends Node {
  drumType: DrumType;
  bars: (Bar | Repeat)[] = [];
  
  parse(): void {
    let tokenizer = Tokenizer.getTokenizer();

    this.drumType = tokenizer.getNext() as DrumType;

    tokenizer.getAndCheckNext(":");

    while (!tokenizer.checkToken("NEW_LINE")) {
      if (tokenizer.checkToken("(")) {
        let repeat = new Repeat();
        repeat.parse();
        this.bars.push(repeat);
      } else {
        let bar = new Bar();
        bar.parse();
        this.bars.push(bar);
      }
    }
    console.log("Drum Type:", this.drumType);
    console.log("Bars/Repeats:", this.bars);
    console.log("LEAVING LAYER.PARSE");
  }

  evaluate(): void {
    throw new Error("Method not implemented.");
  }
  nameAndTypeCheck(): void {
    throw new Error("Method not implemented.");
  }
}

export default Layer;
