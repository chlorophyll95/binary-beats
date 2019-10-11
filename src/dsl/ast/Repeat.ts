import { Node } from "../libs/Node";
import Tokenizer from "../libs/Tokenizer";
import Bar from "./Bar";

class Repeat extends Node {
  quantity: number = 1; // in cases of (VARIABLE)
  bars: Bar[] = [];

  parse(): void {
    let tokenizer = Tokenizer.getTokenizer();
    tokenizer.getAndCheckNext("(");
    // TODO: make sure to check if rhythm lengths are consistent here

    while(!tokenizer.checkToken(")")) {
      let bar = new Bar();
      bar.parse();
      this.bars.push(bar);
    };

    tokenizer.getAndCheckNext(")");

    if (tokenizer.checkNext() === "*") {
      tokenizer.getAndCheckNext("*");
      this.quantity = parseInt(tokenizer.getNext());
    } 
  }
  evaluate(): void {
    throw new Error("Method not implemented.");
  }
  nameAndTypeCheck(): void {
    throw new Error("Method not implemented.");
  }
}

export default Repeat;
