import { Children, Declaration, Name, Namekey, Refkey, Scope, Show, useBinder } from "@alloy-js/core";
import { useSourceFileScope } from "../../scopes/source-file.js";
import { getGlobalNamespace } from "../../contexts/global-namespace.js";
import { NamespaceSymbol } from "../../symbols/namespace.js";
import { createNamespaceSymbol } from "../../symbols/factories.js";
import { NamespaceScope } from "../../scopes/namespace.js";

export interface FileLevelNamespaceProps {
    name?: string | Namekey | (string | Namekey)[];
    refkey?: Refkey | Refkey[];
    children?: Children;
    isGlobal?: boolean;
}

export function FileLevelNamespace(props: FileLevelNamespaceProps) {
    if (props.name === undefined && !props.isGlobal) {
        throw new Error("File level namespace requires a name or global flag");
    }
    if (props.name !== undefined && props.isGlobal) {
        throw new Error("File level namespace cannot have both a name and global flag");
    }

    const parent = useSourceFileScope();
    if (parent === undefined) {
        throw new Error("File level namespace must be used within a source file scope");
    }

    let symbol: NamespaceSymbol;
    if (props.name === undefined) {
        symbol = getGlobalNamespace(useBinder());
    } else {
        symbol = createNamespaceSymbol(props.name, {
            refkeys: props.refkey,
        });
    }

    const namespaceScope = new NamespaceScope(symbol, parent);

    return (
        <Scope value={namespaceScope} >
            <Declaration symbol={symbol}>
                <Show when={!props.isGlobal}>
                    namespace {symbol.getFullyQualifiedName()};
                    <hbr />
                    <hbr />
                </Show>
                {props.children}
            </Declaration>
        </Scope>
    )

}