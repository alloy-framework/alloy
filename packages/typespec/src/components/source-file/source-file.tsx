import { Children } from "@alloy-js/core/jsx-runtime";
import { SourceFileScope } from "../../scopes/source-file.js";
import { Block, computed, SourceFile as CoreSourceFile, Scope, useBinder } from "@alloy-js/core";
import {
    useTypeSpecFormatOptions
} from "../../contexts/format-options.js";
import { Reference } from "../Reference.jsx";
import { useNamespaceContext } from "../../contexts/namespace.js";
import { getGlobalNamespace } from "../../contexts/global-namespace.js";
import { NamespaceScopes } from "#components/namespace-scopes.jsx";
import { NamespaceName } from "#components/namespace/namespace-name.jsx";
import { NamespaceSymbol } from "../../symbols/namespace.js";

export interface SourceFileProps {
    path: string;

    /** If present, it defines a file-level namespace (if not present, it uses the global namespace) */
    namespace?: NamespaceSymbol;

    children?: Children;

    /**
     * A list of using directives to explicitly include. Note that providing
     * explicit usings is not necessary when referencing symbols via refkeys.
     */
    using?: string[];

    /**
     * A list of import directives to explicitly include. Note that providing
     * explicit imports is not necessary when referencing symbols via refkeys.
     */
    import?: string[];
};

export function SourceFile(props: SourceFileProps) {
    const sourceFileScope = new SourceFileScope(props.path);

    const nsContext = useNamespaceContext();
    const parentNs = props.namespace ?? getGlobalNamespace(useBinder());
    const nsSymbol = nsContext ? nsContext.symbol : parentNs;

    const content = computed(() => (
        <NamespaceScopes symbol={nsSymbol}>{props.children}</NamespaceScopes>
    ));

    const options = useTypeSpecFormatOptions();

    return (
        <CoreSourceFile
            path={props.path}
            filetype=".tsp"
            reference={Reference}
            {...options}
        >
             <Scope value={sourceFileScope}>
                {nsSymbol === parentNs ?
                    content
                : <>
                        namespace <NamespaceName symbol={nsSymbol} />
                        {sourceFileScope.hasBlockNamespace ?
                        <>
                            {" "}
                            <Block>{content}</Block>
                        </>
                        :<>
                            ;<hbr />
                            <hbr />
                            {content}
                        </>    
                    
                    }
                    </>
                }
             </Scope>
        </CoreSourceFile>
    );
}