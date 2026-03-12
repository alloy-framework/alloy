import {
  Children,
  Declaration as CoreDeclaration,
  Refkey,
  createSymbol,
  useBinder,
} from "@alloy-js/core";
import { RustElements, useRustNamePolicy } from "../name-policy.js";
import { RustCrateScope } from "../scopes/rust-crate-scope.js";
import { RustModuleScope } from "../scopes/rust-module-scope.js";
import { useRustScope } from "../scopes/contexts.js";
import { RustOutputSymbol, RustSymbolKind } from "../symbols/rust-output-symbol.js";
import { toRustVisibility, toVisibilityPrefix } from "./visibility.js";

export interface DeclarationProps {
  name: string;
  refkey?: Refkey;
  nameKind?: string;
  pub?: boolean;
  pub_crate?: boolean;
  pub_super?: boolean;
  children?: Children;
}

const typeNameKinds = new Set(["struct", "enum", "trait", "type-alias", "type-parameter"]);
const rustNameKinds = new Set<RustElements>([
  "function",
  "method",
  "struct",
  "enum",
  "enum-variant",
  "trait",
  "type-alias",
  "type-parameter",
  "field",
  "variable",
  "parameter",
  "constant",
  "module",
]);

function toRustNameKind(nameKind: string | undefined): RustElements {
  if (nameKind && rustNameKinds.has(nameKind as RustElements)) {
    return nameKind as RustElements;
  }

  return "variable";
}

function toRustSymbolKind(nameKind: RustElements): RustSymbolKind {
  switch (nameKind) {
    case "constant":
      return "const";
    case "enum-variant":
      return "variant";
    case "variable":
      return "symbol";
    default:
      return nameKind;
  }
}

export function Declaration(props: DeclarationProps) {
  const scope = useRustScope();
  if (!(scope instanceof RustCrateScope) && !(scope instanceof RustModuleScope)) {
    throw new Error("Rust declaration components can only be created in crate or module scopes.");
  }

  const binder = scope.binder ?? useBinder();
  const rustNameKind = toRustNameKind(props.nameKind);
  const symbol = createSymbol(
    RustOutputSymbol,
    props.name,
    typeNameKinds.has(rustNameKind) ? scope.types : scope.values,
    {
      binder,
      refkeys: props.refkey ? [props.refkey] : [],
      namePolicy: useRustNamePolicy().for(rustNameKind),
      symbolKind: toRustSymbolKind(rustNameKind),
      visibility: toRustVisibility(props),
      metadata: props.nameKind ? { nameKind: props.nameKind } : undefined,
    },
  );
  const visibilityPrefix = toVisibilityPrefix(props);

  return (
    <CoreDeclaration symbol={symbol}>
      {visibilityPrefix}
      {props.children}
    </CoreDeclaration>
  );
}
