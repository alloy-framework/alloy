import { Block } from "@alloy-js/core";
import { Children } from "@alloy-js/core/jsx-runtime";
import { NamespaceContext } from "../contexts/namespace.js";
import { useSourceFileScope } from "../scopes/source-file-scope.js";
import { createNamespaceSymbol } from "../symbols/factories.js";
import { NamespaceScope } from "./namespace-scopes.jsx";

export interface NamespaceProps {
  name: string;
  children?: Children;
}

export function Namespace(props: NamespaceProps) {
  const namespaceSymbol = createNamespaceSymbol(props.name);
  const sfScope = useSourceFileScope();

  if (!sfScope) {
    return (
      <NamespaceContext.Provider value={{ symbol: namespaceSymbol }}>
        {props.children}
      </NamespaceContext.Provider>
    );
  } else {
    sfScope.hasBlockNamespace = true;
    return (
      <>
        namespace {namespaceSymbol.name}{" "}
        <Block>
          <NamespaceContext.Provider value={{ symbol: namespaceSymbol }}>
            <NamespaceScope symbol={namespaceSymbol}>
              {props.children}
            </NamespaceScope>
          </NamespaceContext.Provider>
        </Block>
      </>
    );
  }
}

/*
  const scope = createCSharpNamespaceScope(namespaceSymbol);

  return <Scope value={scope}>{props.children}</Scope>;
}
  */
