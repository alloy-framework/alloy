import { BinderContext, createOutputBinder } from "../binder.js";
import { Children } from "../jsx-runtime.js";
import { NamePolicy, NamePolicyContext } from "../name-policy.js";
import { SourceDirectory, SourceDirectoryContext } from "./SourceDirectory.js";

export interface OutputProps {
  children?: Children
  namePolicy?: NamePolicy<string>;
}

export function Output(props: OutputProps) {
  const binder = createOutputBinder();
  const dir = <SourceDirectory path="./">
    {props.children}
  </SourceDirectory>

  
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
