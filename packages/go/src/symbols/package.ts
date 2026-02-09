import { OutputSymbolOptions, createSymbol } from "@alloy-js/core";
import { join } from "pathe";
import { NamedTypeSymbol } from "./named-type.js";

export interface PackageSymbolOptions extends OutputSymbolOptions {
  path?: string;
  builtin?: boolean;
}

/**
 * A symbol for a package in Go.
 */
export class PackageSymbol extends NamedTypeSymbol {
  public readonly symbolKind = "package";
  constructor(
    name: string,
    parentPackage?: PackageSymbol,
    options?: PackageSymbolOptions,
  ) {
    const space = parentPackage?.members;
    super(name, space, "package", options);
    this.#path = options?.path ?? name;
    if (parentPackage) {
      this.#fullyQualifiedName = join(
        parentPackage.fullyQualifiedName,
        this.#path,
      );
    } else {
      this.#fullyQualifiedName = this.#path;
    }
    this.#builtin = options?.builtin || parentPackage?.builtin || false;
  }

  #path: string;
  #fullyQualifiedName: string;
  get fullyQualifiedName(): string {
    return this.#fullyQualifiedName;
  }

  #builtin: boolean;
  get builtin() {
    return this.#builtin;
  }

  copy() {
    const options = this.getGoCopyOptions();
    const copy = createSymbol(PackageSymbol, this.name, undefined, {
      ...options,
      path: this.#path,
    });
    this.initializeGoCopy(copy);
    return copy;
  }
}
