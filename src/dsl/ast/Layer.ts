import { Node } from "../libs/Node";
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
  }

  evaluate(): void {
    throw new Error("Method not implemented.");
  }
  nameAndTypeCheck(): void {
    throw new Error("Method not implemented.");
  }
}

export default Layer;
