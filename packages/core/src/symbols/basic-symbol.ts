import { OutputSymbol } from "./output-symbol.js";

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
