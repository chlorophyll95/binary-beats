import { Node } from "../libs/Node";
import Tokenizer from "../libs/Tokenizer";
import Quarters from "./Quarters";
import Rhythm from "./Rhythm";
import Eighths from "./Eighths";
import Sixteenths from "./Sixteenths";

class Bar extends Node {
  rhythm?: Rhythm;
  rhythmName?: string;
  
  parse(): void {
    let tokenizer = Tokenizer.getTokenizer();
    console.log(tokenizer);

    if (tokenizer.checkToken("|")) {
      this.rhythm = new Quarters();
      console.log("quarter")
    }
    else if (tokenizer.checkToken("[")) {
      this.rhythm = new Eighths();
      console.log("eighth")
    }
    else if (tokenizer.checkToken("{")) {
      this.rhythm = new Sixteenths();
      console.log("sixteenth")
    } else {
      this.rhythmName = tokenizer.getNext();
    }

    if (this.rhythm) {
      this.rhythm.parse();
    }
  }
  evaluate(): void {
    throw new Error("Method not implemented.");
  }
  nameAndTypeCheck(): void {
    throw new Error("Method not implemented.");
  }
}

export default Bar;
