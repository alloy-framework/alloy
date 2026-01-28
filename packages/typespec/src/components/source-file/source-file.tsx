import { Children, SourceFile as CoreSourceFile, Scope, Show, useBinder, SourceDirectoryContext, useContext } from "@alloy-js/core";
import { SourceFileScope } from "../../scopes/source-file.js";
import { NamespaceSymbol } from "../../symbols/namespace.js";
import { getGlobalNamespace } from "../../contexts/global-namespace.js";
import { join } from "pathe";
import { NamespaceScope } from "../../scopes/namespace.js";
import { NamespaceContext } from "../../contexts/namespace.js";
import { NamespaceName } from "../namespace/namespace-name.jsx";

export interface SourceFileProps {
    path: string;

    namespace?: NamespaceSymbol;

    children?: Children;
}

export function SourceFile(props: SourceFileProps) {
    const directoryContext = useContext(SourceDirectoryContext)!;
    const path = join(directoryContext.path, props.path);

    // const parentScope = useScope();
    const scope = new SourceFileScope(path/*, parentScope*/);

    const globalNamespace = getGlobalNamespace(useBinder());
    const namespaceSymbol = props.namespace ?? globalNamespace;

    const namespaceScope = new NamespaceScope(namespaceSymbol, scope);

    return (
        <CoreSourceFile path={props.path} filetype="typespec">
            <Scope value={scope}>
                <Show when={namespaceSymbol !== globalNamespace}>
                    namespace <NamespaceName symbol={namespaceSymbol} />;<hbr />
                </Show>
                <NamespaceContext.Provider value={{ symbol: namespaceSymbol }}>
                    <Scope value={namespaceScope}>
                        {props.children}
                    </Scope>
                </NamespaceContext.Provider>
            </Scope>
        </CoreSourceFile>
    );
}