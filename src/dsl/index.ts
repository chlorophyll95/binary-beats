import * as fs from 'fs';
import Tokenizer from './libs/Tokenizer'
import { BBProgram } from './ast/BBProgram';


//program.parse();
//program.nameCheck();
//program.typeCheck();
//program.evaluate();

export default function (code: string) {
  let tokenizer = Tokenizer.makeTokenizer(code);
  let program = new BBProgram();
}
