import { Block, Namekey, Refkey } from "@alloy-js/core";
import { Children } from "@alloy-js/core/jsx-runtime";
import {
  NamespaceContext,
  useNamespaceContext,
} from "../../contexts/namespace.js";
import { useSourceFileScope } from "../../scopes/source-file.js";
import { createNamespaceSymbol } from "../../symbols/factories.js";
import { NamespaceScopes } from "../namespace-scopes.jsx";
import { NamespaceName } from "./namespace-name.jsx";

export interface NamespaceProps {
  name: string | Namekey | (string | Namekey)[];
  refkey?: Refkey | Refkey[];
  children?: Children;
}

export function Namespace(props: NamespaceProps) {
  const namespaceSymbol = createNamespaceSymbol(props.name, {
    refkeys: props.refkey,
  });
  const sfScope = useSourceFileScope();

  if (!sfScope) {
    return (
      <NamespaceContext.Provider value={{ symbol: namespaceSymbol }}>
        {props.children}
      </NamespaceContext.Provider>
    );
  } else {
    const nsContext = useNamespaceContext();
    const hasOuterNamespace = nsContext && !nsContext.symbol.isGlobal;

    sfScope.hasBlockNamespace = true;
    return (
      <>
        namespace{" "}
        <NamespaceName
          symbol={namespaceSymbol}
          relative={!!hasOuterNamespace}
        />{" "}
        <Block>
          <NamespaceScopes symbol={namespaceSymbol} stopAt={nsContext?.symbol}>
            {props.children}
          </NamespaceScopes>
        </Block>
      </>
    );
  }
}
