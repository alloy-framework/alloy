import type { ContextApi } from "../../build-json.js";
import { Code, MdxSection, Summary } from "../stc/index.js";

export interface ContextAccessorProps {
  context: ContextApi;
}

export function ContextAccessor(props: ContextAccessorProps) {
  const { contextAccessor } = props.context;
  const section = MdxSection({ title: "Accessor", level: 3 });

  if (contextAccessor) {
    const code = `
      import { ${contextAccessor.displayName} } from "@alloy-js/core";
      
      const myContext = ${contextAccessor.displayName}();
    `;

    return section.children(
      Code({ code, language: "ts" }),
      Summary({ type: contextAccessor }),
    );
  } else {
    const code = `
      const myContext = useContext(${props.context.name}Context);
    `;

    return section.children(Code({ code, language: "ts" }));
  }
}
