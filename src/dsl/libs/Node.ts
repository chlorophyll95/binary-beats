import Tokenizer from "../libs/Tokenizer";
import { reservedWords } from "./ReservedWords";
export abstract class Node {

    protected tokenizer : Tokenizer = Tokenizer.getTokenizer();

    // parse tokens into AST
    abstract parse(): void;

    // evaluate AST to program
    abstract evaluate(): any;

    // check that names and types match up
    abstract nameAndTypeCheck(): void;

    // checks that name is valid (ie. not a reserved word and is alphanumeric)
    protected validateName(name: string): void {
        var regexp = new RegExp(/^[A-Z0-9_]+$/);
        if (!regexp.test(name)) {
            throw new Error("Beat and Rhythm names can only use uppercase letters, numbers, and underscores.");
        }

        if (reservedWords.includes(name.toUpperCase())) {
            throw new Error(name + " is a reserved word.");
        }
    }

}
