import { Namespace } from "#components/namespace/namespace.jsx";
import {
  Children,
  childrenArray,
  computed,
  SourceFile as CoreSourceFile,
  For,
  isComponentCreator,
  List,
  Match,
  Scope,
  SourceDirectoryContext,
  Switch,
  useContext,
} from "@alloy-js/core";
import { createGlobalNamespace, useProgram } from "../../contexts/program.js";
import { SourceFileScope } from "../../scopes/source-file.js";
import { joinPath } from "../../util.js";
import { NamespaceScopeComponent } from "../namespace/namespace-scope.jsx";

export interface SourceFileProps {
  path: string;

  children?: Children;
}

export function SourceFile(props: SourceFileProps) {
  const directoryContext = useContext(SourceDirectoryContext)!;
  const path = joinPath(directoryContext.path, props.path);
  const programScope = useProgram();
  const scope = new SourceFileScope(path, programScope);
  const globalNamespace = createGlobalNamespace(scope);
  const children = childrenArray(() => props.children);
  if (children.length === 1 && isComponentCreator(children[0], Namespace)) {
    scope.hasFileLevelNamespace = true;
  }
  const imports = computed(() => scope.imports);
  const usings = computed(() => scope.usings);
  return (
    <CoreSourceFile path={props.path} filetype="typespec">
      <List joiner={<hbr />} ender={<hbr />}>
        <For each={imports.value} joiner={<hbr />} ender={<hbr />}>
          {(importPath) => <>import "{importPath}";</>}
        </For>
        <For each={usings.value} joiner={<hbr />} ender={<hbr />}>
          {(using) => <>using {using.name};</>}
        </For>
      </List>
      <Scope value={scope}>
        <Switch>
          <Match when={scope.hasFileLevelNamespace}>{props.children}</Match>
          <Match else>
            <NamespaceScopeComponent symbol={globalNamespace}>
              {props.children}
            </NamespaceScopeComponent>
          </Match>
        </Switch>
      </Scope>
    </CoreSourceFile>
  );
}
