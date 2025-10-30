import { Block, Namekey, Refkey } from "@alloy-js/core";
import { Children } from "@alloy-js/core/jsx-runtime";
import { useSourceFileScope } from "../../scopes/source-file.js";
import { createNamespaceSymbol } from "../../symbols/factories.js";
import { NamespaceContext } from "../../contexts/namespace.js";
import { NamespaceName } from "./namespace-name.jsx";
import { NamespaceScope } from "#components/namespace-scopes.jsx";


export interface NamespaceProps {
    name: string | Namekey | (string | Namekey)[];
    refkey?: Refkey | Refkey[];
    children?: Children;
}

export function Namespace(props: NamespaceProps) {
    const namespaceSymbol = createNamespaceSymbol(props.name, {
        refkeys: props.refkey,
    });
    const sfScope = useSourceFileScope();

    if (!sfScope) {
        return (<NamespaceContext.Provider value={{ symbol: namespaceSymbol }}>
            {props.children}
        </NamespaceContext.Provider>);
    } else {
        sfScope.hasBlockNamespace = true;
        return (
            <>
                namespace <NamespaceName symbol={namespaceSymbol} relative />{" "}
                <Block>
                    <NamespaceContext.Provider value={{ symbol: namespaceSymbol }}>
                        <NamespaceScope symbol={namespaceSymbol}>
                            {props.children}
                        </NamespaceScope>
                    </NamespaceContext.Provider>
                </Block>
            </>
        );
    }
}