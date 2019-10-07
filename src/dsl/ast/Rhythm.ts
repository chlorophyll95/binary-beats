import { Node } from "../libs/Node";

abstract class Rhythm extends Node {
  pattern: string = "";
  drumCode: number;

  constructor(drumCode: number = 0) {
    super();

    this.drumCode = drumCode;
  }

  setDrumCode(drumCode: number) {
    this.drumCode = drumCode;
  }

  validate(subdivisions: number) {
    // matches anything that isn't x or -
    const invalidChars = /[^x^-]/i
    let subdivisionType;

    if (subdivisions === 4) {
      subdivisionType = 'quarter note';
    } else if (subdivisions === 8) {
      subdivisionType = 'eighth note';
    } else {
      subdivisionType = 'sixteenth note';
    }

    if (this.pattern.match(invalidChars)) {
      throw new Error(
        `Illegal ${subdivisionType} pattern character at line: ${this.tokenizer.line} column: ${this.tokenizer.column}`
      );
    }

    if (this.pattern.length !== subdivisions) {
      throw new Error(`Invalid ${subdivisionType} pattern length at line: ${this.tokenizer.line}`);
    }
  }

  getNote(char: string): Array<number> {
    return char === 'x' ? [this.drumCode] : [];
  }

  buildArray(numRests: number): Array<Array<Array<number>>> {
    let beatArr = [];

    for (const char of this.pattern.split('')) {
      beatArr.push([
        this.getNote(char),
        []
      ]);

      for (let i = 0; i < numRests; i++) {
        beatArr.push([
          [], []
        ])
      }
    }

    return beatArr;
  }
}

export default Rhythm;
