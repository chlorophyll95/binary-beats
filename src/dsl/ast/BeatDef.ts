import { Node } from "../libs/Node";
import Tokenizer from "../libs/Tokenizer";
import Layer from "./Layer";
import SymbolTable from "../libs/SymbolTable";
import { BBType } from "../libs/BBTypes";

class BeatDef extends Node {
  beatName: string;
  layers: Layer[] = [];
  
  parse(): void {
    let tokenizer = Tokenizer.getTokenizer();
    tokenizer.getAndCheckNext('Create');
    tokenizer.getAndCheckNext('beat');
    this.beatName = tokenizer.getNext();
    tokenizer.getAndCheckNext('with');
    tokenizer.getAndCheckNext('layers');
    tokenizer.getAndCheckNext(':');
    //tokenizer.getAndCheckNext(Tokens.NEW_LINE);

    // parse each layer until end of beatdef is reached
    // assume (for now) that beatdef must be followed by another beatdef or play
    while (!tokenizer.checkToken("Create") && !tokenizer.checkToken("Play")) {
      let layer = new Layer();
      layer.parse();
      this.layers.push(layer);
      // each layer is separated by new line
      //tokenizer.getAndCheckNext(Tokens.NEW_LINE);
    }
  }

  evaluate(): void {
    console.log("Eval: BeatDef");

    // evaluate every layer first to determine the longest layer
    let evaluatedLayers: any[] = [];
    let maxLength = 0;
    for (let layer of this.layers){
      let layerBeats: any[] = layer.evaluate();
      evaluatedLayers.push(layerBeats);
      maxLength = Math.max(layerBeats.length, maxLength);
    }

    // merge the layers together 
    let mergedLayers : any[][] = [];
    for (let i: number = 0; i < maxLength; i++){
      let subset = [];
      for(let j: number = 0; j < evaluatedLayers.length; j++){
        let layer: any[] = evaluatedLayers[j];
        if(layer.length > i){
          let singleBeat = layer[i];
          if (singleBeat !== 0){
            subset.push(singleBeat);
          }
        }
      }
      mergedLayers.push([subset, []]);
    }

    SymbolTable.beats.set(this.beatName, mergedLayers);
  }

  nameAndTypeCheck(): void {
    this.validateName(this.beatName);
    if (SymbolTable.rhythms.has(this.beatName)) {
      throw new Error(`Beat with name ${this.beatName} has already been defined.`);
    }
    SymbolTable.types.set(this.beatName, BBType.Beat);
  }
}

export default BeatDef;
