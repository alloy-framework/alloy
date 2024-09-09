import type { DocumentationApi } from "../build-json.js";
import { ComponentDoc } from "./stc/index.js";

export interface DocProps {
  api: DocumentationApi;
}

export function Doc(props: DocProps) {
  switch (props.api.kind) {
    case "component":
      return ComponentDoc({ component: props.api });
    default:
      return undefined;
  }
}
