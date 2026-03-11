import type { RustCrateScope } from "./rust-crate-scope.js";
import type { RustFunctionScope } from "./rust-function-scope.js";
import type { RustImplScope } from "./rust-impl-scope.js";
import type { RustLexicalScope } from "./rust-lexical-scope.js";
import type { RustModuleScope } from "./rust-module-scope.js";
import type { RustTraitScope } from "./rust-trait-scope.js";

export type RustScope =
  | RustCrateScope
  | RustModuleScope
  | RustFunctionScope
  | RustLexicalScope
  | RustImplScope
  | RustTraitScope;

export * from "./contexts.js";
export * from "./rust-crate-scope.js";
export * from "./rust-function-scope.js";
export * from "./rust-impl-scope.js";
export * from "./rust-lexical-scope.js";
export * from "./rust-module-scope.js";
export * from "./rust-scope.js";
export * from "./rust-trait-scope.js";
