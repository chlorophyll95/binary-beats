import Tokens from "./Tokens";

export default class Tokenizer {

    private static theTokenizer : Tokenizer;

    program: string;

    tokens: string[] = [];

    currentTokenIdx: number = 0;

    line: number = 0;

    column: number = 0;

    private constructor(code: string) {
        this.program = code;

        this.tokenize();
        console.log(this.tokens)
    }

    private tokenize() {
        const literals = [
            '*',
            '(',
            ')',
            '[',
            ']',
            '{',
            '}',
            '|',
            ':'
        ];

        this.program = this.program.split('\n').join(` ${Tokens.NEW_LINE} `);

        for (let token of literals) {
            this.program = this.program.split(token).join(` ${token} `);
        }

        this.tokens = this.program.match(/\S+/g) || [];
        this.currentTokenIdx = 0;
        this.line = 1;
        this.column = 0;
    }

    public checkNext(): string | null {
        if (this.currentTokenIdx < this.tokens.length) {
            return this.tokens[this.currentTokenIdx];
        }

        return null;
    }

    public checkToken(token: string): boolean {
        let s = this.checkNext();

        return token === s;
    }

    public getNext(): string {
        if (this.checkNext() != null) {
            let token = this.tokens[this.currentTokenIdx];
            this.currentTokenIdx += 1;
            this.column += token.length;
            if (token === Tokens.NEW_LINE) {
                this.line += 1;
            }
            return token;
        }
        return "";
    }

    public getAndCheckNext(token: string): string {
        let s = this.getNext();

        if (token !== s) {
            throw new Error(
                `Unexpected token ${s} at line: ${this.line} and column: ${this.column}`
            )
        }

        return s;
    }

    public hasNext(): boolean {
        return this.checkNext() !== null;
    }

    public getLine(): number {
        return this.line;
    }

    public static getTokenizer(): Tokenizer {
        return this.theTokenizer;
    }

    public static makeTokenizer(code: string) : void {
        this.theTokenizer = new Tokenizer(code);
    }
}
