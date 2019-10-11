import Rhythm from "./Rhythm";

class Eighths extends Rhythm {
  constructor(drumCode: number = 0) {
    super(drumCode);
  }

  parse(): void {
    this.tokenizer.getAndCheckNext("[");
    this.pattern = this.tokenizer.getNext();

    this.validate(8);

    this.tokenizer.getAndCheckNext("]");
  }

  evaluate(): number[] {
    return this.buildArray(1);
  }

  nameAndTypeCheck(): void {
    // no names or types to check
  }
}

export default Eighths;
