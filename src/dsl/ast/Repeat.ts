import { Node } from "../libs/Node";
import Tokenizer from "../libs/Tokenizer";

class Repeat extends Node {
  quantity: number;

  parse(): void {
    let tokenizer = Tokenizer.getTokenizer();
    tokenizer.getAndCheckNext("(");
    // make sure to check if rhythm lengths are consistent here
    while()

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
