import Tokenizer from "../libs/Tokenizer";
export abstract class Node {

    protected tokenizer : Tokenizer = Tokenizer.getTokenizer();

    // parse tokens into AST
    abstract parse(): void;

    // evaluate AST to program
    abstract evaluate(): any;

    // check that names and types match up
    abstract nameAndTypeCheck(): void;

}