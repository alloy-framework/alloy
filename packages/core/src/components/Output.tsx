import {
  BinderContext,
  createOutputBinder,
  getSymbolCreator,
  NameConflictResolver,
  SymbolCreator,
} from "../binder.js";
import { Children } from "@alloy-js/core/jsx-runtime";
import { NamePolicy, NamePolicyContext } from "../name-policy.js";
import { SourceDirectory, SourceDirectoryContext } from "./SourceDirectory.js";

export interface OutputProps {
  children?: Children;
  /**
   * External libraries whose symbols should be available for reference.
   */
  externals?: SymbolCreator[];

  /**
   * Name policy to use for this output.
   */
  namePolicy?: NamePolicy<string>;

  /**
   * Policy for handling multiple symbols declared with the same name.
   */
  nameConflictResolver?: (name: string, symbols: any[]) => void;

  /**
   * The base path for the output contents. Defaults to "."
   */
  basePath?: string;
}

export function Output(props: OutputProps) {
  const basePath = props.basePath ?? "./";
  const binder = createOutputBinder({
    nameConflictResolver: props.nameConflictResolver,
  });
  const dir =
    <SourceDirectory path={basePath}>
    {props.children}
  </SourceDirectory>;

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
  </BinderContext.Provider>;
}
