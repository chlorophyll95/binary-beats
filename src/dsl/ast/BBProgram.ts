import Tokenizer from "../libs/Tokenizer";
import SymbolTable from "../libs/SymbolTable";
import { Node } from "../libs/Node";
import Tempo from "./Tempo";
import RhythmDef from "./RhythmDef";
import BeatDef from "./BeatDef";
import Play from "./Play";

export class BBProgram extends Node {
    nodes: Node[];

    public parse(): void {
        console.log("came to parse");
        while(this.tokenizer.hasNext()) {
            console.log("inside loop");
            let s: Node;
            if(this.tokenizer.checkToken("Set")){
                console.log("Found Set")
                s = new Tempo();
            }
            else if(this.tokenizer.getAndCheckNext("Rhythms")){
                console.log("Found Rhythms")
                this.tokenizer.getAndCheckNext(":");
                s = new RhythmDef();
            }
            else if(this.tokenizer.checkToken("Create")){
                console.log("Found Create")
                s = new BeatDef();
            }
            else if(this.tokenizer.checkToken("Play")){
                console.log("Found Play")
                s = new Play();
            }
            else{
                break;
            }

            s.parse();
            this.nodes.push(s);
            break;

        }
    }

    public evaluate(): void {
        this.nodes.forEach( (node) => {
            node.evaluate();
        });
    }

    public nameAndTypeCheck(): void {
        this.nodes.forEach( (node) => {
            node.nameAndTypeCheck();
        });
      }
}
