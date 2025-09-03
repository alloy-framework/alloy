import {
  Block,
  Children,
  computed,
  SourceFile as CoreSourceFile,
  Scope,
  useBinder,
} from "@alloy-js/core";
import { getGlobalNamespace } from "../contexts/global-namespace.js";
import { useNamespaceContext } from "../contexts/namespace.js";
import { CSharpSourceFileScope } from "../scopes/source-file.js";
import { NamespaceSymbol } from "../symbols/namespace.js";
import { NamespaceScopes } from "./namespace-scopes.jsx";
import { Reference } from "./Reference.jsx";
import { UsingDirective } from "./UsingDirective.jsx";

/**
 * Props for {@link SourceFile} component
 */
export interface SourceFileProps {
  /** Path of the source file */
  path: string;

  /** Source file content */
  children?: Children;

  /**
   * A list of using directives to explicitly include. Note that providing
   * explicit usings is not necessary when referencing symbols via refkeys.
   */
  using?: string[];
}

/** A C# source file exists within the context of a namespace contains using statements and declarations */
export function SourceFile(props: SourceFileProps) {
  const sourceFileScope = new CSharpSourceFileScope(props.path);

  const nsContext = useNamespaceContext();
  const globalNs = getGlobalNamespace(useBinder());
  const nsSymbol = nsContext ? nsContext.symbol : globalNs;
  const nsRef = nsContext ? nsContext.symbol.name : undefined;
  const usings = computed(() => {
    return (
      Array.from(sourceFileScope.usings) as (NamespaceSymbol | string)[]
    ).concat(props.using ?? []);
  });

  const content = computed(() => (
    <NamespaceScopes symbol={nsSymbol}>{props.children}</NamespaceScopes>
  ));
  return (
    <CoreSourceFile
      path={props.path}
      filetype="cs"
      reference={Reference}
      tabWidth={4}
      printWidth={120}
    >
      <Scope value={sourceFileScope}>
        {(sourceFileScope.usings.size > 0 ||
          (props.using && props.using.length > 0)) && (
          <>
            <UsingDirective namespaces={usings.value} />
            <hbr />
            <hbr />
          </>
        )}
        {nsSymbol === globalNs ?
          content
        : <>
            namespace {nsRef}
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
