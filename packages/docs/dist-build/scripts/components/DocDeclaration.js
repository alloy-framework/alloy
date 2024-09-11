import { Declaration, refkey, SourceFileContext, useBinder, useContext, } from "@alloy-js/core";
export function DocDeclaration(props) {
    const sfContext = useContext(SourceFileContext);
    const binder = useBinder();
    const sym = binder.createSymbol({
        name: props.name,
        refkey: refkey(props.apiItem),
        path: sfContext.path,
    });
    return Declaration({ symbol: sym });
}
//# sourceMappingURL=DocDeclaration.js.map