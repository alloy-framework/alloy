import { IndentContext, stc, useContext } from "@alloy-js/core";
import { cleanExcerpt } from "../../utils.js";
export function FunctionSignature(props) {
    const currentIndent = useContext(IndentContext);
    return stc(IndentContext.Provider)({
        value: { ...currentIndent, indent: "    " },
    }).code `
    <Code code={\`import { ${props.fn.name} } from "@alloy-js/core";
  
    ${cleanExcerpt(props.fn.excerpt.text)}\`} lang="ts" />
  `;
}
//# sourceMappingURL=FunctionSignature.js.map