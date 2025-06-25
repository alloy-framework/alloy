import {
  Children,
  Declaration as CoreDeclaration,
  OutputSymbolFlags,
  refkey,
  Refkey,
  useContext,
} from "@alloy-js/core";
import { PythonElements, usePythonNamePolicy } from "../name-policy.js";
import { PythonOutputSymbol } from "../symbols/index.js";
import { SourceFileContext } from "./SourceFile.js";

export interface BaseDeclarationProps {
  /**
   * The base name of this declaration. May change depending on naming policy
   * and any conflicts.
   */
  name: string;

  /**
   * The refkey or array of refkeys for this declaration.
   */
  refkey?: Refkey | Refkey[];

  /**
   * Flags for the symbol created by this component.
   */
  flags?: OutputSymbolFlags;

  children?: Children;

  /**
   * Arbitrary metadata about this declaration.
   */
  metadata?: Record<string, unknown>;

  /**
   * Documentation for this declaration
   */
  doc?: Children;
}

export interface DeclarationProps extends Omit<BaseDeclarationProps, "name"> {
  /**
   * The name of this declaration.
   */
  name?: string;

  /**
   * The name policy kind to apply to the declaration.
   */
  nameKind?: PythonElements;

  /**
   * The symbol to use for this declaration.
   */
  symbol?: PythonOutputSymbol;
}

/**
 * Declare a symbol in the program. Declaring classes, interfaces, enums, etc.
 */
export function Declaration(props: DeclarationProps) {
  let sym: PythonOutputSymbol;
  const sfContext = useContext(SourceFileContext);
  const module = sfContext?.module;

  if (props.symbol) {
    sym = props.symbol;
  } else {
    const name = usePythonNamePolicy().getName(props.name!, props.nameKind!);
    sym = new PythonOutputSymbol(name, {
      refkeys: props.refkey ?? refkey(name!),
      flags:
        (props.flags ?? OutputSymbolFlags.None) |
        OutputSymbolFlags.MemberContainer,
      metadata: props.metadata,
      module: module,
    });
  }

  return <CoreDeclaration symbol={sym}>{props.children}</CoreDeclaration>;
}
