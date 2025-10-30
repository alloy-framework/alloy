import { useNamespaceContext } from "../../contexts/namespace.js";
import { NamespaceSymbol } from "../../symbols/namespace.js";

export interface NamespaceNameProps {
    symbol: NamespaceSymbol;

    /** If it should print relative to the parent context */
    relative?: boolean;
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

    return names.join(".");
}