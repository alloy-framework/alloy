import { code } from "@alloy-js/core";
import type { ContextApi } from "../../build-json.js";
import { FunctionSignature, MdxSection, Summary } from "../stc/index.js";

export interface ContextFactoryProps {
  context: ContextApi;
}

export function ContextFactory(props: ContextFactoryProps) {
  const { contextFactory } = props.context;
  if (!contextFactory) return null;

  const section = MdxSection({ title: "Factory" });

  const c = code`
      import { ${contextFactory.displayName} } from "@alloy-js/core";
      
      const myContext = ${contextFactory.displayName}();
    `;

  return section.children(
    FunctionSignature({ fn: contextFactory }),
    Summary({ type: contextFactory }),
  );
}
