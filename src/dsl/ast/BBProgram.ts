import Tokenizer from "../libs/Tokenizer";
import SymbolTable from "../libs/SymbolTable";
import { Node } from "../libs/Node";
import Tempo from "./Tempo";
import RhythmDef from "./RhythmDef";
import BeatDef from "./BeatDef";
import Play from "./Play";
import { reservedWords } from "../libs/ReservedWords";
import Tokens from "../libs/Tokens";
import RhythmBlock from "./RhythmBlock";

export class BBProgram extends Node {
    nodes: Node[] = [];

    public parse(): void {
        this.tokenizer.checkToken("Set");
        while(this.tokenizer.hasNext()) {
            console.log("inside loop");
            let s: Node;
            if(this.tokenizer.checkToken("Set")){
                console.log("Found Set")
                s = new Tempo();
            }
            else if(this.tokenizer.checkToken("Rhythms")){
                console.log("Found RhythmsBlock")
                s = new RhythmBlock();
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
                console.log("couldnt find anything else");
                break;
            }
            console.log("node: "+ s);
            s.parse();
            this.nodes.push(s);
            //this.tokenizer.skipLine();
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
