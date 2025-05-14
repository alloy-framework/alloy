import { OutputSymbol, OutputSymbolOptions, refkey } from "@alloy-js/core";
import { usePackage } from "../components/PackageDirectory.jsx";

export interface JavaOutputSymbolOptions extends OutputSymbolOptions {
  package?: string;
}
/**
 * Represents an 'exported' symbol from a .java file. Class, enum, interface etc.
 * Not considered exported if private
 */
export class JavaOutputSymbol extends OutputSymbol {
  /**
   * Fully qualified package name
   */
  get package() {
    return this.#package;
  }
  #package?: string;

  constructor(name: string, options: JavaOutputSymbolOptions = {}) {
    if (options.refkeys === undefined) {
      options.refkeys = [refkey(name)];
    }
    super(name, options);

    if (options.package) {
      this.#package = options.package;
    } else {
      const parentPackage = usePackage();
      this.#package =
        (options.package ?? parentPackage !== null) ?
          parentPackage?.qualifiedName
        : "";
    }
  }
}
