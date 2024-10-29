import { Children } from "@alloy-js/core/jsx-runtime";
import {
  createOutputBinder,
  getSymbolCreator,
  SymbolCreator,
} from "../binder.js";
import { BinderContext } from "../context/binder.js";
import { NamePolicyContext } from "../context/name-policy.js";
import { NamePolicy } from "../name-policy.js";
import { SourceDirectory } from "./SourceDirectory.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { extensionEffects } from "../slot.js";
import { SourceFile } from "./SourceFile.js";

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

/**
 * This component is the root component for all your emitted output. Place your
 * various {@link SourceDirectory} and {@link SourceFile} components inside
 * `Output` to create directories and files in your output directory.
 *
 * @see {@link NamePolicyContext}
 */
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
    {() => { extensionEffects.forEach(e => e())}}
    {
      props.namePolicy ?
        <NamePolicyContext.Provider value={props.namePolicy}>
          {dir}
        </NamePolicyContext.Provider> :
        dir
    }
  </BinderContext.Provider>;
}
