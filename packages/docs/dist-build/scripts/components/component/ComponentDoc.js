import { Examples } from "../Examples.js";
import { ComponentProps, ComponentSignature, DocSourceFile, Remarks, SeeAlso, Summary, } from "../stc/index.js";
export function ComponentDoc(props) {
    const { componentFunction, componentProps } = props.component;
    const title = componentFunction.displayName;
    const declares = [componentFunction];
    if (componentProps) {
        declares.push(componentProps);
    }
    return DocSourceFile({ title, declares }).children(Summary({ type: componentFunction }), ComponentSignature({ component: props.component }), ComponentProps({ propType: componentProps }), Remarks({ type: componentFunction }), Examples({ type: componentFunction }), SeeAlso({ type: componentFunction, splitContexts: true }));
}
//# sourceMappingURL=ComponentDoc.js.map