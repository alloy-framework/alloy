import { Block, Children, Name, Show } from "@alloy-js/core";
import { useTSNamePolicy } from "../name-policy.js";
import { BaseDeclarationProps, Declaration } from "./Declaration.js";
import { JSDoc } from "./JSDoc.jsx";

export interface InterfaceDeclarationProps extends BaseDeclarationProps {
  extends?: Children;
}

/**
 * Create a TypeScript interface declaration.
 *
 * @remarks
 *
 * This component will declare a symbol for this interface. The `export` and
 * `default` boolean props determine whether and how this symbol is exported
 * from the package.
 */
export function InterfaceDeclaration(props: InterfaceDeclarationProps) {
  const extendsPart = props.extends ? <> extends {props.extends}</> : "";

  return (
    <>
      <Show when={Boolean(props.doc)}>
        <JSDoc children={props.doc} />
        <hbr />
      </Show>
      <Declaration {...props} nameKind="interface">
        interface <Name />
        {extendsPart}{" "}
        <InterfaceExpression>{props.children}</InterfaceExpression>
      </Declaration>
    </>
  );
}

export interface InterfaceExpressionProps {
  children?: Children;
}

export function InterfaceExpression(props: InterfaceExpressionProps) {
  return <Block>{props.children}</Block>;
}

export interface InterfaceMemberProps {
  name?: string;
  indexer?: Children;
  type?: Children;
  children?: Children;
  optional?: boolean;
  readonly?: boolean;
  doc?: Children;
}

/**
 * Create a TypeScript interface member.
 */
export function InterfaceMember(props: InterfaceMemberProps) {
  const namer = useTSNamePolicy();
  const type = props.type ?? props.children;
  const optionality = props.optional ? "?" : "";
  const readonly = props.readonly ? "readonly " : "";
  if (props.indexer) {
    return (
      <>
        [{props.indexer}]: {type}
      </>
    );
  } else {
    return (
      <>
        <Show when={Boolean(props.doc)}>
          <JSDoc children={props.doc} />
          <hbr />
        </Show>
        {readonly}
        {namer.getName(props.name!, "interface-member")}
        {optionality}: {type}
      </>
    );
  }
}
