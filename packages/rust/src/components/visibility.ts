import { type RustVisibility } from "../symbols/rust-output-symbol.js";

export interface RustVisibilityProps {
  pub?: boolean;
  pub_crate?: boolean;
  pub_super?: boolean;
}

export function toRustVisibility(props: RustVisibilityProps): RustVisibility {
  if (props.pub) {
    return "pub";
  }

  if (props.pub_crate) {
    return "pub(crate)";
  }

  if (props.pub_super) {
    return "pub(super)";
  }

  return undefined;
}

export function toVisibilityPrefix(props: RustVisibilityProps): string {
  const visibility = toRustVisibility(props);
  return visibility ? `${visibility} ` : "";
}
