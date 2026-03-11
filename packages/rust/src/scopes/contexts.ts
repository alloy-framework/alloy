import { useScope } from "@alloy-js/core";
import { RustCrateScope } from "./rust-crate-scope.js";
import { RustModuleScope } from "./rust-module-scope.js";
import { RustScopeBase } from "./rust-scope.js";

export function useRustScope() {
  const scope = useScope();
  if (!(scope instanceof RustScopeBase)) {
    throw new Error("Expected a Rust scope, got a different kind of scope.");
  }

  return scope;
}

export function useRustModuleScope() {
  const scope = useRustScope();
  if (!(scope instanceof RustModuleScope)) {
    throw new Error(
      `Expected a Rust module scope, but got ${scope.constructor.name}.`,
    );
  }

  return scope;
}

export function useRustCrateScope() {
  const scope = useRustScope();
  if (!(scope instanceof RustCrateScope)) {
    throw new Error(
      `Expected a Rust crate scope, but got ${scope.constructor.name}.`,
    );
  }

  return scope;
}
