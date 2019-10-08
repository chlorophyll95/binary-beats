import { Node } from "../libs/Node";
import Tokenizer from "../libs/Tokenizer";
import Bar from "./Bar";

class Repeat extends Node {
  quantity: number;
  bars: Bar[];

  parse(): void {
    console.log("Parsing repeat");
    let tokenizer = Tokenizer.getTokenizer();
    tokenizer.getAndCheckNext("(");
    // TODO: make sure to check if rhythm lengths are consistent here

    while(!tokenizer.checkToken(")")) {
      let bar = new Bar();
      console.log("Found a bar!");
      bar.parse();
      this.bars.push(bar);
    };

    tokenizer.getAndCheckNext(")");
    tokenizer.getAndCheckNext("*");
    this.quantity = parseInt(tokenizer.getNext())
  }
  evaluate(): void {
    throw new Error("Method not implemented.");
  }
  nameAndTypeCheck(): void {
    throw new Error("Method not implemented.");
  }
}

export default Repeat;
