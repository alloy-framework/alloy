import { Children, Namekey, Refkey } from "@alloy-js/core";
import { useNamespaceContext } from "../contexts/namespace.js";
import { NamespaceSymbol } from "../symbols/namespace.js";
import { useSourceFileScope } from "../scopes/source-file.js";
import { createNamespaceSymbol } from "../symbols/factories.js";

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

    
    return <></>;
}

/** @internal */
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