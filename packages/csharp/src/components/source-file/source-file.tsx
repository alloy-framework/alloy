import { DocComment } from "#components/doc/comment.jsx";
import { NamespaceScopes } from "#components/namespace-scopes.jsx";
import { NamespaceName } from "#components/namespace/namespace-name.jsx";
import { Reference } from "#components/Reference.jsx";
import { Usings } from "#components/using/using.jsx";
import {
  Block,
  Children,
  computed,
  SourceFile as CoreSourceFile,
  List,
  Scope,
  Show,
  useBinder,
} from "@alloy-js/core";
import {
  CSharpFormatOptions,
  useCsharpFormatOptions,
} from "../../contexts/format-options.js";
import { getGlobalNamespace } from "../../contexts/global-namespace.js";
import { useNamespaceContext } from "../../contexts/namespace.js";
import { CSharpSourceFileScope } from "../../scopes/source-file.js";
import { NamespaceSymbol } from "../../symbols/namespace.js";

/**
 * Props for {@link SourceFile} component
 */
export interface SourceFileProps extends CSharpFormatOptions {
  /** Path of the source file */
  path: string;

  /** Source file content */
  children?: Children;

  /**
   * A list of using directives to explicitly include. Note that providing
   * explicit usings is not necessary when referencing symbols via refkeys.
   */
  using?: string[];
  /* * Optional header content to include at the top of the file */
  header?: Children;
  /* * Optional doc comment to include at the top of the file, this will be before 'header' if both are provided */
  headerComment?: string;
}

/** A C# source file exists within the context of a namespace contains using statements and declarations */
export function SourceFile(props: SourceFileProps) {
  const sourceFileScope = new CSharpSourceFileScope(props.path);

  const nsContext = useNamespaceContext();
  const globalNs = getGlobalNamespace(useBinder());
  const nsSymbol = nsContext ? nsContext.symbol : globalNs;
  const usings = computed(() => {
    return (
      Array.from(sourceFileScope.usings) as (NamespaceSymbol | string)[]
    ).concat(props.using ?? []);
  });

  const content = computed(() => (
    <NamespaceScopes symbol={nsSymbol}>{props.children}</NamespaceScopes>
  ));

  const opts = useCsharpFormatOptions({
    printWidth: props.printWidth,
    tabWidth: props.tabWidth,
    useTabs: props.useTabs,
  });

  const header =
    props.header || props.headerComment ?
      <SourceFileHeader
        header={props.header}
        headerComment={props.headerComment}
      />
    : undefined;

  return (
    <CoreSourceFile
      path={props.path}
      filetype="cs"
      reference={Reference}
      {...opts}
      header={header}
    >
      <Scope value={sourceFileScope}>
        {(sourceFileScope.usings.size > 0 ||
          (props.using && props.using.length > 0)) && (
          <>
            <Usings namespaces={usings.value} />
            <hbr />
            <hbr />
          </>
        )}
        {nsSymbol === globalNs ?
          content
        : <>
            namespace <NamespaceName symbol={nsSymbol} />
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

interface SourceFileHeaderProps {
  header?: Children;
  headerComment?: string;
}

function SourceFileHeader(props: SourceFileHeaderProps) {
  return (
    <List>
      <Show when={props.headerComment !== undefined}>
        <DocComment>{props.headerComment}</DocComment>
      </Show>
      <Show when={props.header !== undefined}>{props.header}</Show>
      <hbr />
    </List>
  );
}
