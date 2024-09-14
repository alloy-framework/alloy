import { cleanExcerpt } from "../../utils.js";
import { Code, MdxParagraph } from "../stc/index.js";
export function FunctionSignature(props) {
    const code = `
    import { ${props.fn.name} } from "${props.fn.getAssociatedPackage()?.name}";

    ${cleanExcerpt(props.fn.excerpt.text)}
  `;
    return MdxParagraph().children(Code({ code, language: "ts" }));
}
//# sourceMappingURL=FunctionSignature.js.map