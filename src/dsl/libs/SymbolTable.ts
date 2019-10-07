export default class SymbolTable {
  // making the types 'any' for now

  // maps names to their types (BBType.Rhythm or BBType.Beat)
  public static types : any = {};

  // maps rhythm names to a Rhythm node
  public static rhythms : any = {};

  // maps beat names to an array of Layer nodes
  public static beats : any = {};
}
