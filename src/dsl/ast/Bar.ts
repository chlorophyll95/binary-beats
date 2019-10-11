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
    // console.log("IN BAR.PARSE");
    let tokenizer = Tokenizer.getTokenizer();

    if (tokenizer.checkToken("|")) {
      this.rhythm = new Quarters();
      // console.log("quarter")
    }
    else if (tokenizer.checkToken("[")) {
      this.rhythm = new Eighths();
      // console.log("eighth")
    }
    else if (tokenizer.checkToken("{")) {
      this.rhythm = new Sixteenths();
      // console.log("sixteenth")
    } else {
      this.rhythmName = tokenizer.getNext();
      // console.log("It's a Rhythm variable, not a Rhythm!")
    }

    if (this.rhythm) {
      this.rhythm.parse();
      // console.log("BACK IN BAR.PARSE")
    }

    if (this.rhythm) {
      // console.log("parsing the rhythm", this.rhythm);
    } else {
      // console.log("the rhythm name is", this.rhythmName)
    }

    // console.log("LEAVING BAR.PARSE");
  }
  evaluate(): void {
    throw new Error("Method not implemented.");
  }
  nameAndTypeCheck(): void {
    throw new Error("Method not implemented.");
  }
}

export default Bar;
