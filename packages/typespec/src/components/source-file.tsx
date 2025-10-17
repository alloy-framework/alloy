import { Children } from "@alloy-js/core/jsx-runtime";
import { TypeSpecSourceFileScope } from "../scopes/source-file.js";
import { useNamespaceContext } from "../contexts/namespace.js";
import { getGlobalNamespace } from "../contexts/global-namespace.js";
import { computed, useBinder, SourceFile as CoreSourceFile, Scope, Block } from "@alloy-js/core";
import { NamespaceSymbol } from "../symbols/namespace.js";
import { NamespaceScope } from "./namespace-scopes.jsx";
import { 
    TypeSpecFormatOptions,
    useTypeSpecFormatOptions 
} from "../contexts/format-options.js";
import { Reference } from "./Reference.jsx";
import { NamespaceName } from "./namespace.jsx";

export interface SourceFileProps {
    path: string;
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
    const sourceFileScope = new TypeSpecSourceFileScope(props.path);

    const namespaceContext = useNamespaceContext();
    const globalNamespace = getGlobalNamespace(useBinder());
    const namespaceSymbol = namespaceContext ? namespaceContext.symbol : globalNamespace;

    const usings = computed(() => {
        return (
            Array.from(sourceFileScope.usings) as (NamespaceSymbol | string)[]
        ).concat(props.using ?? []);
    });

    // TODO support imports
    // const imports = computed(() => {
    //     return (
    //         Array.from(sourceFileScope.imports) as (TODO_CORRECT_TYPE | string)[]
    //     ).concat(props.import ?? []);
    // }

    const content = computed(() => {
        <NamespaceScope symbol={namespaceSymbol}>{props.children}</NamespaceScope>
    });

    const options = useTypeSpecFormatOptions({
        printWidth: props.printWidth,
        tabWidth: props.tabWidth,
        useTabs: props.useTabs,
    });

    return (
        <CoreSourceFile
            path={props.path}
            filetype=".tsp"
            reference={Reference}
            {...options}
            >
             <Scope value={sourceFileScope}>
        {/* {(sourceFileScope.usings.size > 0 ||
          (props.using && props.using.length > 0)) && (
          <>
            <Usings namespaces={usings.value} />
            <hbr />
            <hbr />
          </>
        )} */}
        {namespaceSymbol === globalNamespace ?
          content
        : <>
            namespace <NamespaceName symbol={namespaceSymbol} />
            {sourceFileScope.hasBlockNamespace ?
              <>
                {" "}
                <Block>{content}</Block>
              </>
            : <>
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