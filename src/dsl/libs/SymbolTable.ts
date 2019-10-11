import Rhythm from "../ast/Rhythm";
import { BBType } from "./BBTypes";

export default class SymbolTable {
  // making the types 'any' for now

  // maps names to their types (BBType.Rhythm or BBType.Beat)
  public static types = new Map<string, BBType>(); 
  //public static types : any = {};

  // maps rhythm names to a Rhythm node
  //public static rhythms : any = {};
  public static rhythms = new Map<string, Rhythm>(); 

  // maps beat names to an array of Layer nodes
  public static beats : any = {};

  // the tempo
  public static tempo : number;
}
