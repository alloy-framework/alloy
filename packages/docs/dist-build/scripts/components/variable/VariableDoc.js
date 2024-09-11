import { DocSourceFile, Examples, Excerpt, Remarks, SeeAlso, Summary, } from "../stc/index.js";
export function VariableDoc(props) {
    const apiVariable = props.variable.variable;
    const title = props.variable.variable.displayName;
    return DocSourceFile({ title, declares: apiVariable }).children(Summary({ type: apiVariable }), Excerpt({ excerpt: apiVariable.excerpt, context: apiVariable }), Remarks({ type: apiVariable }), Examples({ type: apiVariable }), SeeAlso({ type: apiVariable }));
}
//# sourceMappingURL=VariableDoc.js.map