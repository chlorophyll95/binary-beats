import Rhythm from "./Rhythm";

class Sixteenths extends Rhythm {
  constructor(drumCode: number = 0) {
    super(drumCode);
  }

  parse(): void {
    this.tokenizer.getAndCheckNext("{");
    this.pattern = this.tokenizer.getNext();

    this.validate(16);

    this.tokenizer.getAndCheckNext("}");
    console.log("done parsing 16th");
  }

  evaluate(): number[][][] {
    console.log(this.buildArray(0));

    return this.buildArray(0);
  }

  nameAndTypeCheck(): void {
    // no names or types to check
  }
}

export default Sixteenths;
