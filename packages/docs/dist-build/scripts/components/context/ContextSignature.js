import { Code, MdxParagraph } from "../stc/index.js";
export function ContextSignature(props) {
    const code = `const ${props.context.contextVariable.excerpt.text}`;
    return MdxParagraph().children(Code({ code, language: "ts" }));
}
//# sourceMappingURL=ContextSignature.js.map