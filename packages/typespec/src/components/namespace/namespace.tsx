import { Block, Namekey, Refkey, Scope, useScope } from "@alloy-js/core";
import { Children } from "@alloy-js/core/jsx-runtime";
// import { useSourceFileScope } from "../../scopes/source-file.js";
import { createNamespaceSymbol } from "../../symbols/factories.js";
// import { NamespaceContext } from "../../contexts/namespace.js";
import { NamespaceName } from "./namespace-name.jsx";
import { ValueOrArray } from "../../util.js";
import { NamespaceScope } from "../../scopes/namespace.js";
import { SourceFileScope } from "../../scopes/source-file.js";
import { NamespaceContext } from "../../contexts/namespace.js";


export interface NamespaceProps {
    name: ValueOrArray<string | Namekey>;
    refkey?: ValueOrArray<Refkey>;
    children?: Children;
}

export function Namespace(props: NamespaceProps) {
    const namespaceSymbol = createNamespaceSymbol(props.name, {
        refkeys: props.refkey,
    });
    const parentScope = useScope() as (NamespaceScope | SourceFileScope);
    const namespaceScope = new NamespaceScope(namespaceSymbol, parentScope);

    return (
        <>
            namespace <NamespaceName symbol={namespaceSymbol} relative />{" "}
            <NamespaceContext.Provider value={{ symbol: namespaceSymbol }}>
                <Scope value={namespaceScope}>
                    <Block>
                        {props.children}
                    </Block>
                </Scope>
            </NamespaceContext.Provider>
        </>
    );


}