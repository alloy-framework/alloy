import { Block, Children, Namekey, Refkey, Scope, useScope } from "@alloy-js/core";
import { NamespaceScope, useNamespace } from "../../scopes/namespace.js";
import { createNamespaceSymbol } from "../../symbols/factories.js";
import { Declaration } from "../../../../core/src/index.browser.js";

export interface NamespaceProps {
    name: string | Namekey | (string | Namekey)[];
    refkey?: Refkey | Refkey[];
    children?: Children;
}

export function Namespace(props: NamespaceProps) {
    const parent = useNamespace();

    if (parent === undefined) {
        throw new Error("Block namespace must be declared within another namespace.");
    }

    const symbol = createNamespaceSymbol(props.name, {
        refkeys: props.refkey,
    });

    const scope = new NamespaceScope(symbol, parent);
    const name = symbol.getScopedName(parent.ownerSymbol);

    return (
        <Scope value={scope}>
            <Declaration symbol={symbol}>
                namespace {name} <Block>
                    {props.children}
                </Block>
            </Declaration>
        </Scope>
    );
}