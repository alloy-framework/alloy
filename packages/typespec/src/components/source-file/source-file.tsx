import { Children } from "@alloy-js/core/jsx-runtime";
import { SourceFileScope } from "../../scopes/source-file.js";
import { getGlobalNamespace } from "../../contexts/global-namespace.js";
import { useBinder, SourceFile as CoreSourceFile, Scope } from "@alloy-js/core";
import { NamespaceSymbol } from "../../symbols/namespace.js";
import {
    useTypeSpecFormatOptions
} from "../../contexts/format-options.js";
import { Reference } from "../Reference.jsx";
import { useDirectoryScope } from "../../scopes/contexts.js";
import { NamespaceScope } from "../../scopes/namespace.js";

export interface SourceFileProps {
    path: string;

    /** If present, it defines a file-level namespace (if not present, it uses the global namespace) */
    namespace?: string;

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
    const parent = useDirectoryScope();
    if (parent === undefined) {
        throw new Error("SourceFile must be defined within a DirectoryScope.");
    }

    const sourceFileScope = new SourceFileScope(props.path, parent);

    let namespaceSymbol: NamespaceSymbol;
    if (props.namespace === undefined) {
        namespaceSymbol = getGlobalNamespace(useBinder());
    } else {
        namespaceSymbol = new NamespaceSymbol(props.namespace);
    }
    const namespaceScope = new NamespaceScope(namespaceSymbol, sourceFileScope);

    const options = useTypeSpecFormatOptions();

    return (
        <CoreSourceFile
            path={props.path}
            filetype=".tsp"
            reference={Reference}
            {...options}
        >
             <Scope value={sourceFileScope}>
                <Scope value={namespaceScope}>
                    {props.children}
                </Scope>
             </Scope>
        </CoreSourceFile>
    );
}