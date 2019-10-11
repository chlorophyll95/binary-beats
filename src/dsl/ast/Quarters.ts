import Rhythm from "./Rhythm";

class Quarters extends Rhythm {
  constructor(drumCode: number = 0) {
    super(drumCode);
  }

  parse(): void {
    this.tokenizer.getAndCheckNext("|");
    this.pattern = this.tokenizer.getNext();

    this.validate(4);

    this.tokenizer.getAndCheckNext("|");
  }

  evaluate(): number[] {
    return this.buildArray(3);
  }

  nameAndTypeCheck(): void {
    // no names or types to check
  }
}

export default Quarters;
