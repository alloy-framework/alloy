import { Children, MemberDeclaration, refkey, Refkey } from "@alloy-js/core";
import { useCSharpNamePolicy } from "../../name-policy.js";
import { CSharpOutputSymbol } from "../../symbols/csharp-output-symbol.js";
import { useCSharpScope } from "../../symbols/scopes.js";

/**
 * Information for a TypeScript generic type parameter.
 */
export interface TypeParameterProps {
  /**
   * The name of the type parameter.
   */
  readonly name: string;

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
  const name = useCSharpNamePolicy().getName(props.name, "type-parameter");
  const scope = useCSharpScope();
  const symbol = new CSharpOutputSymbol(name, {
    scope,
    refkeys: props.refkey ?? refkey(props.name),
  });

  return <MemberDeclaration symbol={symbol}>{name}</MemberDeclaration>;
}
