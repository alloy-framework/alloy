import { Children, For, Refkey } from "@alloy-js/core";
import { usePythonNamePolicy } from "../name-policy.js";
import { ClassDeclaration } from "./ClassDeclaration.js";
import { DeclarationProps } from "./Declaration.js";
import { EnumMember } from "./EnumMember.js";
import { enumModule } from "../builtins/python.js";

export interface EnumProps extends DeclarationProps {
  /**
   * The base type of the enum. One of: 'Enum', 'IntEnum', 'StrEnum', 'Flag', 'IntFlag'.
   * Defaults to 'Enum'.
   */
  baseType?: "Enum" | "IntEnum" | "StrEnum" | "Flag" | "IntFlag";
  /**
   * Members of the enum as an array of objects.
   */
  members?: Array<{ name: string; value?: string | number }>;
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
 * A Python enum declaration, following https://docs.python.org/3.11/library/enum.html
 */
export function EnumDeclaration(props: EnumProps) {
  const baseType = props.baseType || "Enum";

  // Handle enum styles
  if (props.style === "functional") {
    const name = usePythonNamePolicy().getName(props.name, "enum");
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
          {(m) => (
            <EnumMember name={m.name} value={m.value} functional={true} />
          )}
        </For>
        {ender}
      </>
    );
    return (
      <>
        {name} = {enumModule['.'].Enum}('{name}', {memberExpr})
      </>
    );
  }

  let memberList: Array<{ name: string; value?: string | number; auto?: boolean }> =
    (props.members ?? []).map((m) =>
      m.value === undefined ? { ...m, auto: false } : m,
    );
  if (props.style === "auto") {
    memberList = memberList.map((m) =>
      m.value === undefined ? { name: m.name, auto: true } : m,
    );
  }
  return (
    <ClassDeclaration name={props.name} bases={[enumModule["."][baseType]]}>
      <For each={memberList} hardline>
        {(member) => <EnumMember name={member.name} value={member.value} auto={member.auto} />}
      </For>
      {props.children}
    </ClassDeclaration>
  );
}
