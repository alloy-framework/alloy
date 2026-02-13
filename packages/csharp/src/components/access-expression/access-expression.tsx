import {
  Children,
  computed,
  createAccessExpression,
  For,
  Refkeyable,
  Show,
} from "@alloy-js/core";
import { CSharpSymbol } from "../../symbols/csharp.js";
import { normalizeAttributeName } from "./part-descriptors.js";

export interface AccessExpressionProps {
  children: Children;
}

type CSharpPartDescriptor = {
  id: Children | undefined;
  indexerArgs: Children[];
  conditional: boolean;
  nullable: boolean;
  args: Children[] | undefined;
  typeArgs: Children[] | undefined;
};

const exclusiveParts: (keyof AccessExpressionPartProps)[] = [
  "children",
  "args",
  "refkey",
  "symbol",
  "id",
];

const { Expression, Part, registerOuterComponent } = createAccessExpression<
  AccessExpressionPartProps,
  CSharpPartDescriptor
>({
  createDescriptor(partProps, sym, first) {
    const foundProps = exclusiveParts.filter((key) => key in partProps);
    if (foundProps.length > 1) {
      throw new Error(
        `Only one of ${foundProps.join(", ")} can be used for a MemberExpression part at a time`,
      );
    }

    let id: Children | undefined;
    if (
      partProps.args ||
      partProps.index !== undefined ||
      partProps.indexerArgs
    ) {
      id = undefined;
    } else if (partProps.children !== undefined) {
      id = partProps.children;
    } else if (first && partProps.refkey) {
      id = partProps.refkey;
    } else if (partProps.id !== undefined) {
      id = normalizeIfAttribute(partProps.id, partProps.attribute);
    } else if (sym) {
      id = normalizeIfAttribute(
        escapeId(sym.name),
        partProps.attribute,
      );
    } else {
      id = "<unresolved symbol>";
    }

    let indexerArgs: Children[] = [];
    if (partProps.indexerArgs) {
      indexerArgs = partProps.indexerArgs;
    } else if (partProps.index !== undefined) {
      indexerArgs = [partProps.index];
    }

    return {
      id,
      indexerArgs,
      conditional: !!partProps.conditional,
      nullable: partProps.nullable
        ? true
        : sym
          ? (sym as CSharpSymbol).isNullable
          : false,
      args:
        partProps.args === true ? []
        : Array.isArray(partProps.args) ? partProps.args
        : undefined,
      typeArgs: partProps.typeArgs,
    };
  },

  getBase(part) {
    if (part.id !== undefined) {
      return (
        <>
          {part.id}
          <TypeArgs args={part.typeArgs} />
        </>
      );
    }
    return part.indexerArgs;
  },

  formatPart(part, prevPart, inCallChain) {
    if (part.args !== undefined) {
      return formatCallExpr(part);
    } else if (part.id !== undefined) {
      return formatMemberAccess(prevPart, part, inCallChain);
    } else {
      return formatElementAccess(prevPart, part);
    }
  },

  isCallPart(part) {
    return part.args !== undefined;
  },
});

/**
 * Create a C# access expression from parts. Each part can be a member access,
 * element access, or invocation. Supports conditional access (`?.`), generic
 * type arguments, and call chain formatting.
 */
export function AccessExpression(props: AccessExpressionProps) {
  return Expression(props);
}
AccessExpression.Part = Part;
registerOuterComponent(AccessExpression);

export interface AccessExpressionPartProps {
  children?: Children;
  /**
   * Whether this part should use conditional access.
   */
  conditional?: boolean;
  /**
   * Emit a function call.
   */
  args?: boolean | Children[];

  /**
   * Type arguments to pass to a member access.
   */
  typeArgs?: Children[];

  /**
   * A refkey for the symbol whose name becomes this part's identifier. When a refkey is provided for the first
   * part, it will be fully resolved. Otherwise, just the symbol's name is used.
   */
  refkey?: Refkeyable;

  /**
   * The symbol whose name becomes this part's identifier.
   */
  symbol?: CSharpSymbol;

  /**
   * The identifier to use for this part.
   */
  id?: string;

  /**
   * Create an element access part with a single indexer argument. Mutually
   * exclusive with the `indexerArgs` prop.
   */
  index?: Children;

  /**
   * Create an element access part with multiple indexer arguments. Mutually
   * exclusive with the `index` prop.
   */
  indexerArgs?: Children[];

  /**
   * Whether this part could possibly be null. Will guard member and element
   * access with a conditional access operator. Passing this is not necessary if
   * you provide a symbol or refkey and the symbol's nullable flag is set.
   */
  nullable?: boolean;

  /**
   * Wether this part is an attribute reference (used in an attribute context).
   * In that case the "Attribute" suffix is trimmed from the name if present.
   */
  attribute?: boolean;
}

// --- Formatting helpers ---

function formatElementAccess(
  prevPart: CSharpPartDescriptor,
  part: CSharpPartDescriptor,
) {
  const indexerArgs = computed(() => part.indexerArgs);
  return (
    <group>
      {part.conditional || prevPart.nullable ? "?" : ""}[
      <indent>
        <sbr />
        <For each={indexerArgs} comma line>
          {(arg) => arg}
        </For>
      </indent>
      <sbr />]
    </group>
  );
}

function formatMemberAccess(
  prevPart: CSharpPartDescriptor,
  part: CSharpPartDescriptor,
  noIndent: boolean,
) {
  const content = (
    <>
      {part.conditional || prevPart.nullable ? "?." : "."}
      {part.id}
      <TypeArgs args={part.typeArgs} />
    </>
  );

  if (noIndent) {
    return (
      <group>
        <sbr />
        {content}
      </group>
    );
  }

  return (
    <group>
      <indent>
        <sbr />
        {content}
      </indent>
    </group>
  );
}

function TypeArgs(props: { args?: Children[] }) {
  return (
    <Show when={props.args && props.args.length > 0}>
      {"<"}
      <group>
        <indent>
          <sbr />
          <For each={props.args!} comma line>
            {(arg) => arg}
          </For>
        </indent>
        <sbr />
      </group>
      {">"}
    </Show>
  );
}

function formatCallExpr(part: CSharpPartDescriptor) {
  const args = computed(() => part.args ?? []);
  return (
    <group>
      (<Show when={args.value.length <= 1}>{args.value[0]}</Show>
      <Show when={args.value.length > 1}>
        <indent>
          <sbr />
          <For each={args} comma line>
            {(arg) => arg}
          </For>
        </indent>
        <sbr />
      </Show>
      )
    </group>
  );
}

// --- Utilities ---

function escapeId(id: string) {
  return id.replace(/"/g, '\\"');
}

function normalizeIfAttribute(id: string, isAttribute?: boolean) {
  if (isAttribute) {
    return normalizeAttributeName(id);
  }
  return id;
}
