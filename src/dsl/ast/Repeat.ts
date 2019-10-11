import { Node } from "../libs/Node";
import Tokenizer from "../libs/Tokenizer";
import Bar from "./Bar";

class Repeat extends Node {
  quantity: number = 1; // in cases of (VARIABLE)
  bars: Bar[] = [];

  parse(): void {
    // console.log("IN REPEAT.PARSE");
    let tokenizer = Tokenizer.getTokenizer();
    tokenizer.getAndCheckNext("(");
    // TODO: make sure to check if rhythm lengths are consistent here

    while(!tokenizer.checkToken(")")) {
      let bar = new Bar();
      // console.log("Found a bar!");
      bar.parse();
      // console.log("BACK IN REPEAT.PARSE")
      // console.log(bar);
      this.bars.push(bar);
      // console.log("Repeat.bars: ", this.bars);
    };

    // console.log("Out of while loop");

    tokenizer.getAndCheckNext(")");

    if (tokenizer.checkNext() === "*") {
      tokenizer.getAndCheckNext("*");
      // console.log("Is a star");
      this.quantity = parseInt(tokenizer.getNext());
    } 

    // console.log("Quantity: ", this.quantity);
    // console.log("LEAVING REPEAT.PARSE")
  }
  evaluate(): void {
    throw new Error("Method not implemented.");
  }
  nameAndTypeCheck(): void {
    throw new Error("Method not implemented.");
  }
}

export default Repeat;
