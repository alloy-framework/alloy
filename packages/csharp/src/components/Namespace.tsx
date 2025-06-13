import * as core from "@alloy-js/core";
import { CSharpNamespaceScope } from "../symbols/scopes.js";

// contains the info for the current namespace
export interface NamespaceContext {
  name: string;
}

const NamespaceContext = core.createContext<NamespaceContext>();

// returns the current namespace
export function useNamespace(): NamespaceContext | undefined {
  return core.useContext(NamespaceContext) as NamespaceContext;
}

// properties for creating a C# namespace
export interface NamespaceProps {
  name: string;
  children?: core.Children;
}

// a C# namespace. contains one or more source files
export function Namespace(props: NamespaceProps) {
  const scope = new CSharpNamespaceScope(props.name);

  const namespaceCtx: NamespaceContext = {
    name: props.name,
  };

  return (
    <NamespaceContext.Provider value={namespaceCtx}>
      <core.Scope value={scope}>{props.children}</core.Scope>
    </NamespaceContext.Provider>
  );
}
