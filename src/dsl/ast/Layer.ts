import { Node } from "../libs/Node";

import Tokenizer from "../libs/Tokenizer";
import { DrumType } from "./DrumType";
import Repeat from "./Repeat";
import Bar from "./Bar";
import DrumCodeMap from "../libs/DrumCodeMap";

class Layer extends Node {
  drumCode: number = 0;
  barsOrRepeats: (Bar | Repeat)[] = [];
  
  parse(): void {
    let tokenizer = Tokenizer.getTokenizer();

    let drumType = tokenizer.getNext() as DrumType;
    this.drumCode = DrumCodeMap.getDrumCode(drumType);

    tokenizer.getAndCheckNext(":");

    while (!tokenizer.checkAhead(":") && !tokenizer.checkToken("Play") && !tokenizer.checkToken("Create")) {
      if (tokenizer.checkToken("(")) {
        let repeat = new Repeat(this.drumCode);
        repeat.parse();
        this.barsOrRepeats.push(repeat);
      } else {
        let bar = new Bar(this.drumCode);
        bar.parse();
        this.barsOrRepeats.push(bar);
      }
    }
    console.log("Drum Type:", this.drumCode);
    console.log("Bars/Repeats:", this.barsOrRepeats);
    console.log("LEAVING LAYER.PARSE");
  }

  evaluate(): any[] {
    let layerArr = [];
    for (let barOrRepeat of this.barsOrRepeats) {
      layerArr.push(barOrRepeat.evaluate());
    }

    return layerArr.flat();
  }
  nameAndTypeCheck(): void {
    throw new Error("Method not implemented.");
  }
}

export default Layer;
