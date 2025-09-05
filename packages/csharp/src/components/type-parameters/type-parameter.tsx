import {
  Children,
  MemberDeclaration,
  MemberName,
  Namekey,
  Refkey,
} from "@alloy-js/core";
import { createTypeParameterSymbol } from "../../symbols/factories.js";

/**
 * Information for a TypeScript generic type parameter.
 */
export interface TypeParameterProps {
  /**
   * The name of the type parameter.
   */
  readonly name: string | Namekey;

  /**
   * The parameter constraint
   */
  readonly constraints?: Children | Children[];

  /**
   * A refkey or array of refkeys for this type parameter.
   */
  readonly refkey?: Refkey | Refkey[];
}

export function TypeParameter(props: TypeParameterProps) {
  const symbol = createTypeParameterSymbol(props.name, {
    refkeys: props.refkey,
  });
  return (
    <MemberDeclaration symbol={symbol}>
      <MemberName />
    </MemberDeclaration>
  );
}
