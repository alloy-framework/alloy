// Declare libraries (dependencies) that you are adding to the project.
// Allows discovery of symbols from these libraries for use in the program

import {
  Binder,
  getSymbolCreatorSymbol,
  Refkey,
  refkey,
  SymbolCreator,
} from "@alloy-js/core";
import { createJavaProjectScope, JavaOutputSymbol } from "./symbols/index.js";
import { createJavaPackageScope } from "./symbols/java-package-scope.js";

export interface LibraryDescriptor {
  [pkg: string]: string[];
}

function createSymbols(
  binder: Binder,
  props: CreateLibraryProps<LibraryDescriptor>,
  refkeys: Record<string, any>,
) {
  const projectScope = createJavaProjectScope(binder, undefined, props.groupId);

  for (const [pkg, symbols] of Object.entries(props.descriptor)) {
    const packageScope = createJavaPackageScope(binder, projectScope, pkg);

    for (const symB of symbols) {
      const _sym = binder.createSymbol<JavaOutputSymbol>({
        name: symB,
        scope: packageScope,
        refkey: refkeys[symB],
        package: packageScope.name,
      });
    }
  }
}

export type LibraryRefkeys<T extends LibraryDescriptor> = {
  [S in T[keyof T] extends readonly string[] ? T[keyof T][number]
  : never]: Refkey;
};

export interface CreateLibraryProps<T extends LibraryDescriptor> {
  groupId: string;
  artifactId: string;
  version: string;
  descriptor: T;
}

export function createLibrary<const T extends LibraryDescriptor>(
  props: CreateLibraryProps<T>,
): LibraryRefkeys<T> & SymbolCreator {
  const refkeys: any = {
    [getSymbolCreatorSymbol()](binder: Binder) {
      createSymbols(binder, props, refkeys);
    },
  };

  for (const [pkg, symbols] of Object.entries(props.descriptor)) {
    for (const symb of symbols) {
      refkeys[symb] = refkey(pkg, symb);
    }
  }

  return refkeys;
}
