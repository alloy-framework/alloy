import { Children } from "@alloy-js/core/jsx-runtime";
import { SourceFileScope } from "../../scopes/source-file.js";
import { SourceFile as CoreSourceFile, Scope } from "@alloy-js/core";
import {
    useTypeSpecFormatOptions
} from "../../contexts/format-options.js";
import { Reference } from "../Reference.jsx";
import { useDirectoryScope } from "../../scopes/contexts.js";
import { FileLevelNamespace } from "#components/namespace/file-level.jsx";

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
    const sourceFileScope = new SourceFileScope(props.path, parent);

    const options = useTypeSpecFormatOptions();

    return (
        <CoreSourceFile
            path={props.path}
            filetype=".tsp"
            reference={Reference}
            {...options}
        >
             <Scope value={sourceFileScope}>
                <FileLevelNamespace name={props.namespace} isGlobal={props.namespace === undefined}>
                    {props.children}
                </FileLevelNamespace>
             </Scope>
        </CoreSourceFile>
    );
}