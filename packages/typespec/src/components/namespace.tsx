import { Block, Children, Namekey, Refkey } from "@alloy-js/core";
import { NamespaceContext, useNamespaceContext } from "../contexts/namespace.js";
import { NamespaceSymbol } from "../symbols/namespace.js";
import { useSourceFileScope } from "../scopes/source-file.js";
import { createNamespaceSymbol } from "../symbols/factories.js";
import { NamespaceScope } from "./namespace-scopes.jsx";

export interface NamespaceProps {
    name: string | Namekey | (string | Namekey)[];
    refkey?: Refkey | Refkey[];
    children?: Children;
};

export function Namespace(props: NamespaceProps) {
    const namespaceSymbol = createNamespaceSymbol(props.name, {
        refkeys: props.refkey,
    });
    const sourceFileScope = useSourceFileScope();

    if(!sourceFileScope) {
        return (
            <NamespaceContext.Provider value = {{ symbol: namespaceSymbol }}>
                {props.children}
            </NamespaceContext.Provider>
        );
    } else {
        // sourceFileScope.hasBlockNamespace = true;

        return (
            <>
                namespace <NamespaceName symbol={namespaceSymbol} relative />{" "}
                <Block>
                    <NamespaceContext.Provider value = {{ symbol: namespaceSymbol }}>
                        <NamespaceScope symbol={namespaceSymbol}>
                            {props.children}
                        </NamespaceScope>
                    </NamespaceContext.Provider>
                </Block>
            </>
        );
    }
}

export interface NamespaceNameProps {
    symbol: NamespaceSymbol;

    /** If it should print relative to the parent context */
    relative? : boolean;
}

export function NamespaceName(props: NamespaceNameProps) {
    const names = [props.symbol.name];
    const parent = props.relative ? useNamespaceContext()?.symbol : undefined;

    let current = props.symbol.ownerSymbol;
    while (current) {
        if (
            current === parent ||
            !(current instanceof NamespaceSymbol) ||
            current.isGlobal
        ) {
            break;
        }
        names.unshift(current.name);
        current = current.ownerSymbol;
    }

    return <>{names.join(".")}</>;
}