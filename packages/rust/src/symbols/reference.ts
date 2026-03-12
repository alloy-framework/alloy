import { Refkey, memo, resolve, unresolvedRefkey } from "@alloy-js/core";
import { isBuiltinCrate } from "../create-crate.js";
import { RustCrateScope } from "../scopes/rust-crate-scope.js";
import { RustModuleScope } from "../scopes/rust-module-scope.js";
import { RustScopeBase } from "../scopes/rust-scope.js";
import { useRustScope } from "../scopes/contexts.js";
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
  const currentScope = useRustScope();
  const currentModuleScope = currentScope.enclosingModule;
  if (!(currentModuleScope instanceof RustModuleScope)) {
    throw new Error(
      `Expected an enclosing Rust module scope, but got ${currentScope.constructor.name}.`,
    );
  }
  const resolveResult = resolve<RustScopeBase, RustOutputSymbol>(refkey as Refkey);

  return memo(() => {
    if (resolveResult.value === undefined) {
      return [unresolvedRefkey(refkey), undefined];
    }

    const result = resolveResult.value;
    const targetName = result.symbol.name;

    const sourceCrate = currentModuleScope.enclosingCrate;
    const declarationScope = result.lexicalDeclaration.scope as RustScopeBase | undefined;
    const targetModule = declarationScope?.enclosingModule;
    const targetCrate = declarationScope?.enclosingCrate;

    // Only skip import for prelude types when the symbol is NOT declared
    // in the current crate. User-defined types that shadow prelude names
    // (e.g., `type Result<T> = ...`) still need `use` imports.
    const isLocalSymbol =
      targetCrate instanceof RustCrateScope &&
      sourceCrate instanceof RustCrateScope &&
      targetCrate === sourceCrate;

    if (PRELUDE_TYPES.has(targetName) && !isLocalSymbol) {
      return [targetName, result.symbol];
    }

    if (
      targetModule instanceof RustModuleScope &&
      targetCrate instanceof RustCrateScope &&
      sourceCrate instanceof RustCrateScope
    ) {
      if (targetModule !== currentModuleScope) {
        if (targetCrate === sourceCrate) {
          if (result.lexicalDeclaration.visibility === undefined) {
            throw new Error(
              `Cannot reference private symbol '${targetName}' from module '${currentModuleScope.name}'.`,
            );
          }

          const sameCratePath = buildUsePath("crate", result.pathDown);
          currentModuleScope.addUse(sameCratePath, result.lexicalDeclaration);
        } else {
          const externalCratePath = buildUsePath(targetCrate.name, result.pathDown);
          currentModuleScope.addUse(externalCratePath, result.lexicalDeclaration);
          if (!isBuiltinCrate(targetCrate)) {
            sourceCrate.addDependency(targetCrate.name, targetCrate.version ?? "*");
          }
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
      moduleSegments.push(...moduleNameSegments(scope.name));
    }
  }

  return [prefix, ...moduleSegments].join("::");
}

function moduleNameSegments(moduleName: string): string[] {
  const normalized = moduleName
    .split("/")
    .map((segment) => segment.trim())
    .filter((segment) => segment.length > 0)
    .map((segment) => segment.endsWith(".rs") ? segment.slice(0, -3) : segment)
    .filter((segment) => segment !== "mod" && segment !== "lib" && segment !== "main");

  return normalized;
}
