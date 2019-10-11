import { Node } from "../libs/Node";
import Tokenizer from "../libs/Tokenizer";
import Bar from "./Bar";

class Repeat extends Node {
  quantity: number = 1; // in cases of (VARIABLE)
  bars: Bar[] = [];
  drumCode: number;

  constructor(drumCode: number = 0) {
    super();

    this.drumCode = drumCode;
  }

  parse(): void {
    let tokenizer = Tokenizer.getTokenizer();
    tokenizer.getAndCheckNext("(");
    // TODO: make sure to check if rhythm lengths are consistent here

    while(!tokenizer.checkToken(")")) {
      let bar = new Bar(this.drumCode);
      bar.parse();
      this.bars.push(bar);
    };

    tokenizer.getAndCheckNext(")");

    if (tokenizer.checkNext() === "*") {
      tokenizer.getAndCheckNext("*");
      this.quantity = parseInt(tokenizer.getNext());
    } 
  }
  evaluate(): any {
    let repeatedStanzaArray = [];
    let stanzaArray = []; // TODO: name these better
    for (let bar of this.bars) {
      stanzaArray.push(bar.evaluate());
    }

    debugger;
    for (let repeats = 0; repeats < this.quantity; repeats++) {
      repeatedStanzaArray.push(stanzaArray);
    }

    return repeatedStanzaArray.flat(2);
  }

  nameAndTypeCheck(): void {
    throw new Error("Method not implemented.");
  }
}

export default Repeat;
