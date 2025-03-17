import { code } from "@alloy-js/core";
import type { ContextApi } from "../../build-json.js";
import { Code, MdxSection, Summary } from "../stc/index.js";

export interface ContextAccessorProps {
  context: ContextApi;
}

export function ContextAccessor(props: ContextAccessorProps) {
  const { contextAccessor } = props.context;
  const section = MdxSection({ title: "Accessor" });

  if (contextAccessor) {
    const c = code`
      import { ${contextAccessor.displayName} } from "@alloy-js/core";
      
      const myContext = ${contextAccessor.displayName}();
    `;

    return section.children(
      Code({ language: "ts" }).children(c),
      Summary({ type: contextAccessor }),
    );
  } else {
    const c = code`
      const myContext = useContext(${props.context.name}Context);
    `;

    return section.children(Code({ language: "ts" }).children(c));
  }
}
