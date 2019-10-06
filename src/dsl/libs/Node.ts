import Tokenizer from "../libs/Tokenizer";
export abstract class Node {

    protected tokenizer : Tokenizer = Tokenizer.getTokenizer();

    abstract parse(): void;

    abstract evaluate(): void;

    abstract nameCheck(): void;

    abstract typeCheck(): void;

}