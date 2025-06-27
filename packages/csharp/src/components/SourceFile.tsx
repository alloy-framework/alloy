import {
  Children,
  SourceFile as CoreSourceFile,
  Scope,
  Show,
  useBinder,
} from "@alloy-js/core";
import { getGlobalNamespace } from "../contexts/global-namespace.js";
import { useNamespaceContext } from "../contexts/namespace.js";
import { CSharpSourceFileScope } from "../scopes/source-file-scope.js";
import { NamespaceScope, NamespaceScopes } from "./namespace-scopes.jsx";
import { Reference } from "./Reference.jsx";
import { UsingDirective } from "./UsingDirective.jsx";

export interface SourceFileProps {
  /** Path of the source file */
  path: string;

  children?: Children;
}

// a C# source file. exists within the context of a namespace
// contains using statements and declarations
export function SourceFile(props: SourceFileProps) {
  const sourceFileScope = new CSharpSourceFileScope(props.path);

  const nsContext = useNamespaceContext();
  const nsRef = nsContext ? nsContext.symbol.name : undefined;

  return (
    <CoreSourceFile
      path={props.path}
      filetype="cs"
      reference={Reference}
      tabWidth={4}
    >
      <Scope value={sourceFileScope}>
        {sourceFileScope.usings.size > 0 && (
          <>
            <UsingDirective namespaces={Array.from(sourceFileScope.usings)} />
            <hbr />
            <hbr />
          </>
        )}
        <Show when={!!nsContext}>
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
        <Show when={!nsContext}>
          <NamespaceScope symbol={getGlobalNamespace(useBinder())}>
            {props.children}
          </NamespaceScope>
        </Show>
      </Scope>
    </CoreSourceFile>
  );
}
