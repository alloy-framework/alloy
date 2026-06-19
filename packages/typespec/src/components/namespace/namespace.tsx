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
import { DocWhen } from "../doc/doc-comment.jsx";
import { NamespaceName } from "./namespace-name.jsx";
import { NamespaceScopeComponent } from "./namespace-scope.jsx";

export interface NamespaceProps {
  /** The namespace name, or an array of dotted segments. */
  name: (string | Namekey) | (string | Namekey)[];
  /** Refkey(s) for referencing this namespace from other components. */
  refkey?: Refkey | Refkey[];
  /** Doc comment rendered as `/** ... *\/` above the namespace. */
  doc?: Children;
  /** Directives (`#suppress`, `#deprecated`) to apply to the namespace. */
  directives?: Children;
  /** Decorators (e.g. `@service`) to apply to the namespace. */
  decorators?: Children;
  /** The namespace body contents. */
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
      <DocWhen doc={props.doc} />
      {props.directives}
      {props.decorators}
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
