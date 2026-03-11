import {
  Block,
  Match,
  Namekey,
  Refkey,
  Switch,
  useScope,
} from "@alloy-js/core";
import { Children } from "@alloy-js/core/jsx-runtime";
import { NamespaceScope } from "../../scopes/namespace.js";
import { SourceFileScope } from "../../scopes/source-file.js";
import { createNamespaceSymbol } from "../../symbols/factories.js";
import { ValueOrArray } from "../../util.js";
import { NamespaceName } from "./namespace-name.jsx";
import { NamespaceScopeComponent } from "./namespace-scope.jsx";

export interface NamespaceProps {
  name: ValueOrArray<string | Namekey>;
  refkey?: ValueOrArray<Refkey>;
  children?: Children;
}

export function Namespace(props: NamespaceProps) {
  const namespaceSymbol = createNamespaceSymbol(props.name, {
    refkeys: props.refkey,
  });
  const parentScope = useScope() as NamespaceScope | SourceFileScope;

  const isFileLevelNamespace =
    parentScope instanceof SourceFileScope && parentScope.hasFileLevelNamespace;

  return (
    <>
      namespace <NamespaceName symbol={namespaceSymbol} relative />
      <NamespaceScopeComponent symbol={namespaceSymbol}>
        <Switch>
          <Match when={isFileLevelNamespace}>
            ;<hbr />
            <hbr />
            {props.children}
          </Match>
          <Match else>
            {" "}
            <Block>{props.children}</Block>
          </Match>
        </Switch>
      </NamespaceScopeComponent>
    </>
  );
}
