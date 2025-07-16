import {
  Children,
  Declaration as CoreDeclaration,
  For,
  MemberScope,
  OutputSymbolFlags,
  Scope,
  useBinder,
} from "@alloy-js/core";
import { enumModule } from "../builtins/python.js";
import { createPythonSymbol } from "../symbol-creation.js";
import { usePythonScope } from "../symbols/scopes.js";
import { BaseDeclarationProps } from "./Declaration.js";
import { EnumMember } from "./EnumMember.js";
import { PythonBlock } from "./PythonBlock.jsx";

export interface EnumProps extends BaseDeclarationProps {
  /**
   * The base type of the enum. One of: 'Enum', 'IntEnum', 'StrEnum', 'Flag', 'IntFlag'.
   * Defaults to 'Enum'.
   */
  baseType?: "Enum" | "IntEnum" | "StrEnum" | "Flag" | "IntFlag";
  /**
   * Members of the enum as an array of objects.
   */
  members?: Array<{
    name: string;
    value?: Children;
    jsValue?: string | number;
  }>;
  /**
   * The enum style: 'classic' (default), 'auto', or 'functional'.
   */
  style?: "classic" | "auto" | "functional";
  /**
   * Optional docstring for the enum.
   */
  doc?: Children;
}

/**
 * A Python enum declaration, following https://docs.python.org/3.11/library/enum.html.
 *
 * @example
 * ```tsx
 * <EnumDeclaration name="Direction" style="functional">
 *   members={[
 *     { name: "NORTH" },
 *     { name: "SOUTH" },
 *     { name: "EAST" },
 *     { name: "WEST" },
 *   ]}
 * />
 * ```
 * This will generate:
 * ```python
 * from enum import Enum
 * class Direction(Enum):
 *     NORTH = "NORTH"
 *     SOUTH = "SOUTH"
 *     EAST = "EAST"
 *     WEST = "WEST"
 * ```
 */
export function EnumDeclaration(props: EnumProps) {
  // Handle enum styles
  if (props.style === "functional") {
    return <FunctionalEnumDeclaration {...props} />;
  }
  return <ClassEnumDeclaration {...props} />;
}

export function FunctionalEnumDeclaration(props: EnumProps) {
  const binder = useBinder();
  const scope = usePythonScope();
  const sym = createPythonSymbol(
    props.name,
    {
      binder: binder,
      scope: scope,
      refkeys: props.refkey,
      flags: OutputSymbolFlags.StaticMemberContainer,
    },
    "enum",
    false,
  );
  const members = props.members ?? [];
  let opener, ender;
  if (members.length && members.every((m) => m.value === undefined)) {
    // List of names: Enum('Direction', ['NORTH', ...])
    opener = "[";
    ender = "]";
  } else {
    // List of name-value pairs: Enum('Direction', {'NORTH': 1, ...})
    opener = "{";
    ender = "}";
  }
  const memberExpr = (
    <>
      {opener}
      <For each={members} joiner=", ">
        {(m) => <EnumMember name={m.name} value={m.value} functional={true} />}
      </For>
      {ender}
    </>
  );
  return (
    <>
      <CoreDeclaration symbol={sym}>
        {sym.name} = {enumModule["."].Enum}('{sym.name}',{" "}
        <MemberScope owner={sym}>
          <Scope name={props.name} kind="enum">
            {memberExpr}
          </Scope>
        </MemberScope>
        )
      </CoreDeclaration>
    </>
  );
}

export function ClassEnumDeclaration(props: EnumProps) {
  const baseType = props.baseType || "Enum";
  const binder = useBinder();
  const scope = usePythonScope();
  const sym = createPythonSymbol(
    props.name,
    {
      binder: binder,
      scope: scope,
      refkeys: props.refkey,
      flags: OutputSymbolFlags.StaticMemberContainer,
    },
    "enum",
    false,
  );
  let memberList: Array<{
    name: string;
    value?: Children;
    jsValue?: string | number;
    auto?: boolean;
  }> = (props.members ?? []).map((m) =>
    m.value === undefined ? { ...m, auto: false } : m,
  );
  if (props.style === "auto") {
    memberList = memberList.map((m) =>
      m.value === undefined ? { name: m.name, auto: true } : m,
    );
  }
  return (
    <CoreDeclaration symbol={sym}>
      class {sym.name}({enumModule["."][baseType]})
      <MemberScope owner={sym}>
        <Scope name={sym.name} kind="enum">
          <PythonBlock opener=":">
            <For each={memberList} hardline>
              {(member) => (
                <EnumMember
                  name={member.name}
                  value={member.value}
                  jsValue={member.jsValue}
                  auto={member.auto}
                />
              )}
            </For>
            {props.children}
          </PythonBlock>
        </Scope>
      </MemberScope>
    </CoreDeclaration>
  );
}
