import { Node } from "../libs/Node";
<<<<<<< HEAD
import Quarters from "./Quarters";
import Eighths from "./Eighths";
import Sixteenths from "./Sixteenths";

class Layer extends Node {
  vars: string[] = [];
    
  parse(): void {
    let layerName: string = this.tokenizer.getNext();
    let measure: Node;

    this.tokenizer.getAndCheckNext(":");
    if (this.tokenizer.checkToken("|")) {
      measure = new Quarters();
      console.log("quarter")
    }
    else if (this.tokenizer.checkToken("[")) {
      measure = new Eighths();
      console.log("eighth")
    }
    else if (this.tokenizer.checkToken("{")) {
      measure = new Sixteenths();
      console.log("sixteenth")
    }
    else {
      this.vars.push(this.tokenizer.getNext());
    }
=======
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
>>>>>>> daf350e67c99e5ac469f1e01822eabb3ddc58599
  }

  evaluate(): void {
    throw new Error("Method not implemented.");
  }
  nameAndTypeCheck(): void {
    throw new Error("Method not implemented.");
  }
}

export default Layer;
