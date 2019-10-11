import { Node } from "../libs/Node";
import Tempo from "./Tempo";
import BeatDef from "./BeatDef";
import Play from "./Play";
import RhythmBlock from "./RhythmBlock";

export class BBProgram extends Node {
    nodes: Node[] = [];

    public parse(): void {
        if(this.tokenizer.checkTokenStrict("Set")){
            this.startParse("Set", new Tempo());
        }
        if(this.tokenizer.checkToken("Rhythms")){
            this.startParse("Rhythms", new RhythmBlock());
        }
        if(this.tokenizer.checkTokenStrict("Create")){
            while(this.tokenizer.checkToken("Create")){
                this.startParse("Create", new BeatDef());
            }
        }
        if(this.tokenizer.checkTokenStrict("Play")){
            this.startParse("Play", new Play());
        }  
    }

    private startParse(name: string, node: Node){
        console.log("Parsing: " + name);
        node.parse();
        this.nodes.push(node);
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
