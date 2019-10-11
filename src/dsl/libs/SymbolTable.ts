import Rhythm from "../ast/Rhythm";
import { BBType } from "./BBTypes";

export default class SymbolTable {

  // maps names to their types (BBType.Rhythm or BBType.Beat)
  public static types = new Map<string, BBType>(); 

  // maps rhythm names to a Rhythm node
  public static rhythms = new Map<string, Rhythm>(); 

  // maps beat names to an array of Layer nodes
  public static beats = new Map<string, any[]>();

  // the tempo
  public static tempo : number;
}
