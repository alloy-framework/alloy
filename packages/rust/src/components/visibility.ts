import {
  type Children,
  type Refkey,
  isRefkey,
  memo,
  resolve,
} from "@alloy-js/core";
import { type RustVisibility } from "../symbols/rust-output-symbol.js";
import { buildUsePath } from "../symbols/reference.js";
import { type RustScopeBase } from "../scopes/rust-scope.js";

export interface RustVisibilityProps {
  pub?: boolean | "crate" | "super" | RustVisibility | Refkey;
}

export function toRustVisibility(
  pub: RustVisibilityProps["pub"],
): RustVisibility {
  switch (pub) {
    case true:
      return "pub";
    case "crate":
      return "pub(crate)";
    case "super":
      return "pub(super)";
    case "pub":
    case "pub(crate)":
    case "pub(super)":
      return pub;
    default:
      if (typeof pub === "string" && pub.startsWith("pub(in ")) {
        return pub as RustVisibility;
      }
      return undefined;
  }
}

export function VisibilityPrefix(props: RustVisibilityProps): Children {
  if (isRefkey(props.pub)) {
    const resolveResult = resolve<RustScopeBase, any>(props.pub);
    return memo(() => {
      if (!resolveResult.value) return "";
      const path = buildUsePath("crate", resolveResult.value.pathDown);
      return `pub(in ${path}) `;
    });
  }

  const visibility = toRustVisibility(props.pub);
  return visibility ? `${visibility} ` : "";
}
