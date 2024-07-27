import { BinderContext, createOutputBinder, getSymbolCreator, SymbolCreator } from "../binder.js";
import { Children } from "../jsx-runtime.js";
import { NamePolicy, NamePolicyContext } from "../name-policy.js";
import { SourceDirectory, SourceDirectoryContext } from "./SourceDirectory.js";

export interface OutputProps {
  children?: Children;
  externals?: SymbolCreator[];
  namePolicy?: NamePolicy<string>;
}

export function Output(props: OutputProps) {
  const binder = createOutputBinder();
  const dir = <SourceDirectory path="./">
    {props.children}
  </SourceDirectory>

  if (props.externals) {
    for (const global of props.externals) {
      getSymbolCreator(global)(binder);
    }
  }
  
  return <BinderContext.Provider value={binder}>
    {
      props.namePolicy ?
        <NamePolicyContext.Provider value={props.namePolicy}>
          {dir}
        </NamePolicyContext.Provider> :
        dir
    }
  </BinderContext.Provider>
}
