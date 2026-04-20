import type { ContextApi } from "../../build-json.js";
import {
  FunctionParameters,
  FunctionSignature,
  MdxSection,
  Remarks,
  Summary,
} from "../stc/index.js";

export interface ContextFactoryProps {
  context: ContextApi;
}

export function ContextFactory(props: ContextFactoryProps) {
  const { contextFactory } = props.context;
  if (!contextFactory) return null;

  const section = MdxSection({ title: "Factory" });

  return section.children(
    FunctionSignature({ fn: contextFactory }),
    Summary({ type: contextFactory }),
    FunctionParameters({ fn: contextFactory }),
    Remarks({ type: contextFactory }),
  );
}
