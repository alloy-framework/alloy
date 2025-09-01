import {
  Children,
  SourceFile as CoreSourceFile,
  Scope,
  Show,
  useBinder,
} from "@alloy-js/core";
import { getGlobalNamespace } from "../contexts/global-namespace.js";
import { useNamespaceContext } from "../contexts/namespace.js";
import { CSharpSourceFileScope } from "../scopes/source-file.js";
import { NamespaceSymbol } from "../symbols/namespace.js";
import { NamespaceScope, NamespaceScopes } from "./namespace-scopes.jsx";
import { Reference } from "./Reference.jsx";
import { UsingDirective } from "./UsingDirective.jsx";

export interface SourceFileProps {
  /** Path of the source file */
  path: string;

  children?: Children;

  /**
   * A list of using directives to explicitly include. Note that providing
   * explicit usings is not necessary when referencing symbols via refkeys.
   */
  using?: string[];
}

// a C# source file. exists within the context of a namespace
// contains using statements and declarations
export function SourceFile(props: SourceFileProps) {
  const sourceFileScope = new CSharpSourceFileScope(props.path);

  const nsContext = useNamespaceContext();
  const globalNs = getGlobalNamespace(useBinder());
  const nsSymbol = nsContext ? nsContext.symbol : globalNs;
  const nsRef = nsContext ? nsContext.symbol.name : undefined;
  const usings = (
    Array.from(sourceFileScope.usings) as (NamespaceSymbol | string)[]
  ).concat(props.using ?? []);
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
            <UsingDirective namespaces={usings} />
            <hbr />
            <hbr />
          </>
        )}
        <Show when={!!nsContext && nsSymbol !== globalNs}>
          <Show when={sourceFileScope.hasBlockNamespace}>
            namespace {nsRef}
            {" {"}
            <hbr />
            {"    "}
          </Show>

          <Show when={!sourceFileScope.hasBlockNamespace}>
            namespace {nsRef};<hbr />
            <hbr />
          </Show>
          <align width={sourceFileScope.hasBlockNamespace ? 4 : 0}>
            <NamespaceScopes symbol={nsContext!.symbol}>
              {props.children}
            </NamespaceScopes>
          </align>
          <Show when={sourceFileScope.hasBlockNamespace}>
            <hbr />
            {"}"}
          </Show>
        </Show>
        <Show when={!nsContext || nsSymbol === globalNs}>
          <NamespaceScope symbol={getGlobalNamespace(useBinder())}>
            {props.children}
          </NamespaceScope>
        </Show>
      </Scope>
    </CoreSourceFile>
  );
}
