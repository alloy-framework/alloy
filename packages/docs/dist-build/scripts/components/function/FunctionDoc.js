import { DocSourceFile, FunctionOverloadDoc } from "../stc/index.js";
export function FunctionDoc(props) {
    const title = props.fn.functions[0].displayName;
    return DocSourceFile({ title, declares: [props.fn.functions[0]] }).children(props.fn.functions.map((fn) => FunctionOverloadDoc({
        fn,
        omitOverloadIndex: props.fn.functions.length === 1,
    })));
}
//# sourceMappingURL=FunctionDoc.js.map