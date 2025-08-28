import { OutputSymbol } from "./output-symbol.js";

/**
 * BasicSymbol is a kind of OutputSymbol that has instance and static members.
 * It is suitable for use in simple language implementations where there isn't
 * much in the way of unique symbol semantics.
 *
 * @remarks
 *
 * Instantiation is done by copying symbols from instance members to static
 * members of the instantiation target.
 *
 */
export class BasicSymbol extends OutputSymbol {
  public static readonly memberSpaces = ["static", "instance"];

  copy() {
    const options = this.getCopyOptions();
    const copiedSymbol = new BasicSymbol(this.name, undefined, options);
    this.initializeCopy(copiedSymbol);

    return copiedSymbol;
  }

  get instanceMembers() {
    return this.memberSpaceFor("instance")!;
  }

  get staticMembers() {
    return this.memberSpaceFor("static")!;
  }

  instantiateTo(targetSymbol: OutputSymbol) {
    super.instantiateTo(targetSymbol, "static", "instance");
  }
}
