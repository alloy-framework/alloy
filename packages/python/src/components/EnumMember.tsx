import { Children, Namekey, Refkey, Show } from "@alloy-js/core";
import { enumModule } from "../builtins/python.js";
import { createPythonSymbol } from "../symbol-creation.js";
import { PythonOutputSymbol } from "../symbols/index.js";
import { Atom } from "./Atom.jsx";
import { SimpleInlineMemberComment } from "./index.js";

export interface EnumMemberProps {
  /**
   * The name of the enum member.
   */
  name: string | Namekey;

  /**
   * Refkey for the enum member symbol. If the refkey is not provided, a symbol
   * will be created and the member cannot be referenced by refkey.
   */
  refkey?: Refkey;

  /**
   * The value of the enum member.
   */
  value?: Children;

  /**
   * The JS value of the enum member.
   */
  jsValue?: string | number;

  /**
   * Functional mappings/list
   */
  functional?: boolean;

  /**
   * Will use auto() to generate the value if set to true.
   */
  auto?: boolean;

  /**
   * Documentation for the enum member.
   */
  doc?: Children;
}

/**
 * A Python enum member.
 *
 * @example
 * ```tsx
 * <EnumMember name="NORTH" />
 * ```
 * This will generate:
 * ```python
 * NORTH
 * ```
 */
export function EnumMember(props: EnumMemberProps) {
  const autoReference = props.auto === true ? enumModule["."].auto : undefined;
  const value = props.auto === true ? <>{autoReference}()</> : props.value;
  const sym: PythonOutputSymbol = createPythonSymbol(
    props.name,
    {
      refkeys: props.refkey,
    },
    "enum-member",
  );
  const valueCode =
    props.jsValue !== undefined ? <Atom jsValue={props.jsValue} /> : value;

  if (props.functional) {
    return (
      <>
        '{sym.name}'<Show when={valueCode !== undefined}> : {valueCode}</Show>
        <Show when={props.doc !== undefined}>
          <SimpleInlineMemberComment>{props.doc}</SimpleInlineMemberComment>
        </Show>
      </>
    );
  }
  return (
    <>
      {sym.name}
      <Show when={valueCode !== undefined}> = {valueCode}</Show>
      <Show when={props.doc !== undefined}>
        <SimpleInlineMemberComment>{props.doc}</SimpleInlineMemberComment>
      </Show>
    </>
  );
}
