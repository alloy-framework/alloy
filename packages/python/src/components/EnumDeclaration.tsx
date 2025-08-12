import {
  Children,
  Declaration as CoreDeclaration,
  For,
  Show,
} from "@alloy-js/core";
import { enumModule } from "../builtins/python.js";
import { createPythonSymbol } from "../symbol-creation.js";
import { BaseDeclarationProps } from "./Declaration.js";
import { EnumMember } from "./EnumMember.js";
import { SimpleCommentBlock } from "./index.js";
import { MemberScope } from "./MemberScope.jsx";
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
    doc?: string;
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

/**
 * Create a Python enum using the functional syntax.
 *
 * This generates enums using the `Enum('Name', [...])` or `Enum('Name', {...})` syntax.
 * The format depends on whether enum members have explicit values:
 * - Members without values: `Enum('Direction', ['NORTH', 'SOUTH', 'EAST', 'WEST'])`
 * - Members with values: `Enum('Direction', {'NORTH': 1, 'SOUTH': 2, 'EAST': 3, 'WEST': 4})`
 *
 * @example
 * ```tsx
 * <FunctionalEnumDeclaration
 *   name="Direction"
 *   members={[
 *     { name: "NORTH" },
 *     { name: "SOUTH" },
 *     { name: "EAST" },
 *     { name: "WEST" }
 *   ]}
 * />
 * ```
 * renders to:
 * ```python
 * Direction = Enum('Direction', ['NORTH', 'SOUTH', 'EAST', 'WEST'])
 * ```
 *
 * @example
 * ```tsx
 * <FunctionalEnumDeclaration
 *   name="Status"
 *   members={[
 *     { name: "PENDING", value: 1 },
 *     { name: "ACTIVE", value: 2 },
 *     { name: "INACTIVE", value: 3 }
 *   ]}
 * />
 * ```
 * renders to:
 * ```python
 * Status = Enum('Status', {'PENDING': 1, 'ACTIVE': 2, 'INACTIVE': 3})
 * ```
 */
export function FunctionalEnumDeclaration(props: EnumProps) {
  const sym = createPythonSymbol(
    props.name,
    {
      refkeys: props.refkey,
    },
    "enum",
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
        <MemberScope ownerSymbol={sym}>{memberExpr}</MemberScope>)
      </CoreDeclaration>
    </>
  );
}

/**
 * Create a Python enum using the class-based syntax.
 *
 * This generates enums using the `class Name(Enum):` syntax with member definitions
 * inside the class body. Supports various member value styles including auto-generated
 * values, explicit values, and custom base types.
 *
 * @example
 * ```tsx
 * <ClassEnumDeclaration
 *   name="Direction"
 *   members={[
 *     { name: "NORTH" },
 *     { name: "SOUTH" },
 *     { name: "EAST" },
 *     { name: "WEST" }
 *   ]}
 * />
 * ```
 * renders to:
 * ```python
 * class Direction(Enum):
 *     NORTH = "NORTH"
 *     SOUTH = "SOUTH"
 *     EAST = "EAST"
 *     WEST = "WEST"
 * ```
 *
 * @example
 * With explicit values:
 * ```tsx
 * <ClassEnumDeclaration
 *   name="Status"
 *   members={[
 *     { name: "PENDING", value: 1 },
 *     { name: "ACTIVE", value: 2 },
 *     { name: "INACTIVE", value: 3 }
 *   ]}
 * />
 * ```
 * renders to:
 * ```python
 * class Status(Enum):
 *     PENDING = 1
 *     ACTIVE = 2
 *     INACTIVE = 3
 * ```
 *
 * @example
 * With auto() values:
 * ```tsx
 * <ClassEnumDeclaration
 *   name="Color"
 *   style="auto"
 *   members={[
 *     { name: "RED" },
 *     { name: "GREEN" },
 *     { name: "BLUE" }
 *   ]}
 * />
 * ```
 * renders to:
 * ```python
 * class Color(Enum):
 *     RED = auto()
 *     GREEN = auto()
 *     BLUE = auto()
 * ```
 */
export function ClassEnumDeclaration(props: EnumProps) {
  const baseType = props.baseType || "Enum";
  const sym = createPythonSymbol(
    props.name,
    {
      refkeys: props.refkey,
    },
    "enum",
  );
  let memberList: Array<{
    name: string;
    value?: Children;
    jsValue?: string | number;
    auto?: boolean;
    doc?: string;
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
      <Show when={Boolean(props.doc)}>
        <SimpleCommentBlock children={props.doc} />
        <hbr />
      </Show>
      class {sym.name}({enumModule["."][baseType]})
      <MemberScope ownerSymbol={sym}>
        <PythonBlock opener=":">
          <For each={memberList} hardline>
            {(member) => (
              <EnumMember
                name={member.name}
                value={member.value}
                jsValue={member.jsValue}
                auto={member.auto}
                doc={member.doc}
              />
            )}
          </For>
          {props.children}
        </PythonBlock>
      </MemberScope>
    </CoreDeclaration>
  );
}
