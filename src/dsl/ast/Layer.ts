import { Node } from "../libs/Node";
import Tokenizer from "../libs/Tokenizer";
import { DrumType } from "./DrumType";
import Repeat from "./Repeat";
import Bar from "./Bar";

class Layer extends Node {
  drumType: DrumType;
  bars: (Bar | Repeat)[] = [];
  
  parse(): void {
    // console.log("IN LAYER.PARSE")
    let tokenizer = Tokenizer.getTokenizer();

    this.drumType = tokenizer.getNext() as DrumType;
    // console.log("Setting Drum Type to", this.drumType);

    tokenizer.getAndCheckNext(":");

    while (!tokenizer.checkToken("NEW_LINE")) {
      if (tokenizer.checkToken("(")) {
        // console.log("Is a repeat");
        let repeat = new Repeat();
        repeat.parse();
        // console.log("BACK IN LAYER.PARSE1");
        this.bars.push(repeat);
        // console.log("back to top of the loop1 with", tokenizer.checkNext());
      } else {
        // console.log("Is a bar");
        let bar = new Bar();
        bar.parse();
        // console.log("BACK IN LAYER.PARSE");
        this.bars.push(bar);
        // console.log(bar);
        // console.log("Layer.bars:", this.bars)
        // console.log("back to top of the loop with", tokenizer.checkNext());
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
