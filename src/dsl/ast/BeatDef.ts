import { Node } from "../libs/Node";
import Tokenizer from "../libs/Tokenizer";
import Layer from "./Layer";
import SymbolTable from "../libs/SymbolTable";
import { BBType } from "../libs/BBTypes";

class BeatDef extends Node {
  beatName: string;
  layers: Layer[];
  parse(): void {
    let tokenizer = Tokenizer.getTokenizer();
    tokenizer.getAndCheckNext('Create');
    tokenizer.getAndCheckNext('beat');
    this.beatName = tokenizer.getNext();
    tokenizer.getAndCheckNext('with');
    tokenizer.getAndCheckNext('layers');
    tokenizer.getAndCheckNext(':');
    tokenizer.getAndCheckNext('NEW_LINE');

    // parse each layer until end of beatdef is reached
    // assume (for now) that beatdef must be followed by another beatdef or play
    while (!tokenizer.checkToken("Create") && !tokenizer.checkToken("Play")) {
      let layer = new Layer();
      layer.parse();
      this.layers.push(layer);
      // each layer is separated by new line
      tokenizer.getAndCheckNext('NEW_LINE');
    }
  }
  evaluate(): void {
    let arr: any = []; // 3d array
    // todo: wait until layer is implemented
    SymbolTable.beats[this.beatName] = arr;
  }
  nameAndTypeCheck(): void {
    if (SymbolTable.rhythms.hasOwnProperty(this.beatName)) {
      throw new Error(`Beat with name ${this.beatName} has already been defined.`);
    }
    SymbolTable.types[this.beatName] = BBType.Beat;
  }
}

export default BeatDef;
