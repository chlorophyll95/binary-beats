import { Node } from "../libs/Node";

class Bar extends Node {
  parse(): void {
    throw new Error("Method not implemented.");
  }
  evaluate(): void {
    throw new Error("Method not implemented.");
  }
  nameCheck(): void {
    throw new Error("Method not implemented.");
  }
  typeCheck(): void {
    throw new Error("Method not implemented.");
  }
}

export default Bar;
