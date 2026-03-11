import { Refkey, memo, resolve, unresolvedRefkey } from "@alloy-js/core";
import { RustCrateScope } from "../scopes/rust-crate-scope.js";
import { RustModuleScope } from "../scopes/rust-module-scope.js";
import { RustScopeBase } from "../scopes/rust-scope.js";
import { useRustModuleScope } from "../scopes/contexts.js";
import { RustOutputSymbol } from "./rust-output-symbol.js";

export const PRELUDE_TYPES = new Set<string>([
  "Option",
  "Some",
  "None",
  "Result",
  "Ok",
  "Err",
  "Vec",
  "String",
  "ToString",
  "Box",
  "Clone",
  "Copy",
  "Default",
  "Drop",
  "Eq",
  "PartialEq",
  "Ord",
  "PartialOrd",
  "Iterator",
  "IntoIterator",
  "From",
  "Into",
  "TryFrom",
  "TryInto",
  "AsRef",
  "AsMut",
  "Send",
  "Sync",
  "Sized",
  "Unpin",
  "ToOwned",
  "Fn",
  "FnMut",
  "FnOnce",
  "bool",
  "char",
  "f32",
  "f64",
  "i8",
  "i16",
  "i32",
  "i64",
  "i128",
  "isize",
  "u8",
  "u16",
  "u32",
  "u64",
  "u128",
  "usize",
  "str",
]);

export function ref(refkey: Refkey): () => [string, RustOutputSymbol | undefined] {
  const currentModuleScope = useRustModuleScope();
  const resolveResult = resolve<RustScopeBase, RustOutputSymbol>(refkey as Refkey);

  return memo(() => {
    if (resolveResult.value === undefined) {
      return [unresolvedRefkey(refkey), undefined];
    }

    const result = resolveResult.value;
    const targetName = result.symbol.name;

    if (PRELUDE_TYPES.has(targetName)) {
      return [targetName, result.symbol];
    }

    const sourceCrate = currentModuleScope.enclosingCrate;
    const declarationScope = result.lexicalDeclaration.scope as RustScopeBase | undefined;
    const targetModule = declarationScope?.enclosingModule;
    const targetCrate = declarationScope?.enclosingCrate;

    if (
      targetModule instanceof RustModuleScope &&
      targetCrate instanceof RustCrateScope &&
      sourceCrate instanceof RustCrateScope
    ) {
        if (targetModule !== currentModuleScope) {
          if (targetCrate === sourceCrate) {
            const sameCratePath = buildUsePath("crate", result.pathDown);
            currentModuleScope.addUse(sameCratePath, result.lexicalDeclaration);
          } else {
            const externalCratePath = buildUsePath(targetCrate.name, result.pathDown);
            currentModuleScope.addUse(externalCratePath, result.lexicalDeclaration);
            sourceCrate.addDependency(targetCrate.name, targetCrate.version ?? "*");
          }
        }
      }

    return [targetName, result.symbol];
  });
}

function buildUsePath(prefix: string, pathDown: RustScopeBase[]): string {
  const moduleSegments: string[] = [];

  for (const scope of pathDown) {
    if (scope instanceof RustModuleScope) {
      if (scope.name.length > 0) {
        moduleSegments.push(scope.name);
      }
    }
  }

  return [prefix, ...moduleSegments].join("::");
}
