import { BinderContext, createOutputBinder, getSymbolCreator, NameConflictResolver, SymbolCreator } from "../binder.js";
import { Children } from "@alloy-js/core/jsx-runtime";
import { NamePolicy, NamePolicyContext } from "../name-policy.js";
import { SourceDirectory, SourceDirectoryContext } from "./SourceDirectory.js";

export interface OutputProps {
  children?: Children;
  externals?: SymbolCreator[];
  namePolicy?: NamePolicy<string>;
  // any[] is used here because otherwise passing a callback that expects subtypes
  // of symbols won't work. Probably making it generic would help.
  nameConflictResolver?: (name: string, symbols: any[]) => void;
}

export function Output(props: OutputProps) {
  const binder = createOutputBinder({
    nameConflictResolver: props.nameConflictResolver
  });
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
