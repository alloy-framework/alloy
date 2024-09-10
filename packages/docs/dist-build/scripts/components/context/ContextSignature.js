import { IndentContext, stc, useContext } from "@alloy-js/core";
export function ContextSignature(props) {
    const currentIndent = useContext(IndentContext);
    return stc(IndentContext.Provider)({
        value: { ...currentIndent, indent: "    " },
    }).code `
    <Code code={\`const ${props.context.contextVariable.excerpt.text}\`} lang="ts" />
  `;
}
//# sourceMappingURL=ContextSignature.js.map