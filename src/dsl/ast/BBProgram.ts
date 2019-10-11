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
        while(this.tokenizer.hasNext()) {
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
            s.parse();
            this.nodes.push(s);
        }
    }

    
    public evaluate(): any[] {
        let ret : any[];
        for (let node of this.nodes){
            ret = node.evaluate();
        }
        
        console.log("Returns:");
        console.log(ret);
        return ret;
    }

    public nameAndTypeCheck(): void {
        for (let node of this.nodes) {
            node.nameAndTypeCheck();
        }
    }
}
