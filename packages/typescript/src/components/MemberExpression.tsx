import {
  Children,
  computed,
  createAccessExpression,
  For,
  OutputSymbol,
  Refkey,
  Show,
} from "@alloy-js/core";

import { TSOutputSymbol, TSSymbolFlags } from "../symbols/ts-output-symbol.js";
import { isValidJSIdentifier } from "../utils.js";

export interface MemberExpressionProps {
  children: Children;
}

type PartDescriptorWithId = PartDescriptorBase & {
  id: Children;
};

type PartDescriptorWithIndex = PartDescriptorBase & {
  index: number;
};
type PartDescriptorBase = {
  accessStyle: "dot" | "bracket";
  jsPrivate: boolean;
  quoteId: boolean;
  nullish: boolean;
  type: boolean;
  args?: Children[];
  /**
   * Whether to await the value that results from this part of the member expression.
   */
  await?: boolean;
};

type PartDescriptor = PartDescriptorWithId | PartDescriptorWithIndex;

const exclusiveParts: (keyof MemberExpressionPartProps)[] = [
  "children",
  "args",
  "refkey",
  "symbol",
  "id",
];

const { Expression, Part, registerOuterComponent } = createAccessExpression<
  MemberExpressionPartProps,
  PartDescriptor
>({
  createDescriptor(partProps, sym, first) {
    const foundProps = exclusiveParts.filter((key) => key in partProps);
    if (foundProps.length > 1) {
      throw new Error(
        `Only one of ${foundProps.join(", ")} can be used for a MemberExpression part at a time`,
      );
    }

    let id: Children;
    if (partProps.args) {
      id = undefined;
    } else if (partProps.children !== undefined) {
      id = partProps.children;
    } else if (first && partProps.refkey) {
      id = partProps.refkey;
    } else if (partProps.id !== undefined) {
      id =
        isNumericIdentifier(partProps.id) ?
          partProps.id
        : escapeId(partProps.id);
    } else if (partProps.index !== undefined) {
      id = partProps.index;
    } else if (sym) {
      id = escapeId(sym.name);
    } else {
      id = "<unresolved symbol>";
    }

    let accessStyle: "dot" | "bracket";
    if (partProps.children !== undefined) {
      accessStyle =
        typeof partProps.children === "string" ?
          partProps.quoteId ?
            "bracket"
          : accessStyleForMemberName(partProps.children)
        : "bracket";
    } else if (partProps.args) {
      accessStyle = "dot";
    } else if (partProps.quoteId) {
      accessStyle = "bracket";
    } else if (partProps.id !== undefined) {
      accessStyle =
        isNumericIdentifier(partProps.id) ? "bracket" : (
          accessStyleForMemberName(partProps.id)
        );
    } else if (partProps.index !== undefined) {
      accessStyle = "bracket";
    } else if (sym) {
      accessStyle = accessStyleForMemberName(sym.name);
    } else {
      accessStyle = "dot";
    }

    return {
      id,
      accessStyle,
      quoteId:
        partProps.quoteId ? partProps.quoteId
        : partProps.id !== undefined ?
          isNumericIdentifier(partProps.id) ? false
          : !isValidJSIdentifier(partProps.id)
        : sym ? !isValidJSIdentifier(sym.name)
        : false,
      nullish:
        partProps.nullish ? partProps.nullish
        : sym ? isNullish(sym)
        : false,
      args: partProps.args === true ? [] : partProps.args,
      jsPrivate: !!sym && (sym as TSOutputSymbol).isPrivateMemberSymbol,
      type: !!sym && (sym as TSOutputSymbol).isTypeSymbol,
      await: partProps.await,
    } as PartDescriptor;
  },

  getBase(part) {
    return isIdPartDescriptor(part) ? part.id : part.index;
  },

  formatPart(part, prevPart, _inCallChain) {
    if (prevPart.type) {
      return formatArrayAccess(prevPart, part);
    } else if (part.args !== undefined) {
      return formatCallExpr(prevPart, part);
    } else if (part.accessStyle === "dot") {
      return formatDotAccess(prevPart, part);
    } else {
      return formatArrayAccess(prevPart, part);
    }
  },

  isCallPart(part) {
    return part.args !== undefined;
  },

  canUseCallChains(parts) {
    for (const part of parts) {
      if (part.await) return false;
    }
    return true;
  },

  wrapPartResult(expression, part, _index, isLast) {
    if (part.await) {
      return isLast ? <>await {expression}</> : <>(await {expression})</>;
    }
    return expression;
  },
});

/**
 * Create a member expression from parts. Each part can provide one of
 * the following:
 *
 * * **id**: The identifier for the member expression part
 * * **refkey**: a refkey for a symbol whose name becomes the identifier
 * * **symbol**: a symbol whose name becomes the identifier part
 * * **args**: create a method call with the given args
 * * **children**: arbitrary contents for the identifier part
 * * **await**: whether to await the value that results from this part of the member expression
 *
 * Each part can have a nullish prop, which indicates that the part may be null
 * or undefined.
 *
 * Each part can also have a quoteId prop, which indicates that the identifier
 * of the part should be quoted (i.e. `["foo"]` instead of `.foo`). This is only
 * necessary when providing the children prop, otherwise it is determined
 * automatically.
 *
 * @example
 *
 * ```tsx
 * <MemberExpression>
 *   <MemberExpression.Part id="base" />
 *   <MemberExpression.Part refkey={rk} nullish />
 *   <MemberExpression.Part symbol={sym} />
 *   <MemberExpression.Part args={["hello", "world"]} />
 *   <MemberExpression.Part>SomeValue</MemberExpression.Part>
 * </MemberExpression>
 * ```
 *
 * Assuming `rk` is a refkey to a symbol name "prop1", and `sym` is a symbol
 * with a name of "prop2", this will render:
 *
 * ```ts
 * base.prop1?.prop2("hello", "world").SomeValue
 * ```
 */
export function MemberExpression(props: MemberExpressionProps): Children {
  return Expression(props);
}

/**
 * A part of a member expression. Each part can provide one of the following
 * props:
 *
 * * **id**: The identifier for the member expression part
 * * **refkey**: A refkey for a symbol whose name becomes the identifier
 * * **symbol**: a symbol whose name becomes the identifier part
 * * **args**: create a method call with the given args
 * * **children**: arbitrary contents for the identifier part
 * * **await**: whether to await the value that results from this part of the member expression
 *
 * Each part can have a nullish prop, which indicates that the part may be null
 * or undefined.
 *
 * Each part can also have a quoteId prop, which indicates that the identifier
 * of the part should be quoted (i.e. `["foo"]` instead of `.foo`). This is only
 * necessary when providing the children prop, otherwise it is determined
 * automatically.
 */
MemberExpression.Part = Part;
registerOuterComponent(MemberExpression);

export interface MemberExpressionPartProps {
  /**
   * The identifier for this part of the member expression.
   */
  id?: string | number;

  /**
   * The index for this part of the member expression. This is used when
   * the part is an array access (i.e. `foo[0]`).
   */
  index?: number;

  /**
   * Whether the identifier should be quoted or not. Only needed when
   * providing the `children` prop, otherwise it is determined automatically.
   */
  quoteId?: boolean;

  /**
   * A refkey for a symbol whose name becomes the identifier.
   */
  refkey?: Refkey;
  /**
   * A symbol whose name becomes the identifier.
   */
  symbol?: OutputSymbol;
  /**
   * Arguments to construct a call expression.
   */
  args?: Children[] | boolean;

  /**
   * Whether to await the value that results from this part of the member expression.
   */
  await?: boolean;

  /**
   * This part is nullish. Subsequent parts use conditional access operators.
   */
  nullish?: boolean;

  /**
   * The contents of this part. When passed, overrides the other props except
   * nullish.
   */
  children?: Children;
}

// --- Formatting helpers ---

function formatArrayAccess(prevPart: PartDescriptor, part: PartDescriptor) {
  return (
    <group>
      {!prevPart.type && prevPart.nullish ? "?." : ""}[
      <indent>
        <sbr />
        {(prevPart.type || part.quoteId) && '"'}
        {isIdPartDescriptor(part) ? part.id : part.index}
        {(prevPart.type || part.quoteId) && '"'}
      </indent>
      <sbr />]
    </group>
  );
}

function formatDotAccess(prevPart: PartDescriptor, part: PartDescriptor) {
  return (
    <group>
      <indent>
        <sbr />
        {prevPart.nullish ? "?." : "."}
        {isIdPartDescriptor(part) ?
          part.jsPrivate ?
            `#${part.id}`
          : part.id
        : part.index}
      </indent>
    </group>
  );
}

function formatCallExpr(prevPart: PartDescriptor, part: PartDescriptor) {
  const args = computed(() => {
    return typeof part.args === "boolean" ? [] : (part.args ?? []);
  });

  return (
    <group>
      {prevPart.nullish ? "?." : ""}(
      <Show when={args.value.length <= 1}>{args.value[0]}</Show>
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

function isNullish(symbol: OutputSymbol): boolean {
  return !!((symbol as TSOutputSymbol).tsFlags & TSSymbolFlags.Nullish);
}

function accessStyleForMemberName(name: string) {
  return isValidJSIdentifier(name) ? "dot" : "bracket";
}

function isNumericIdentifier(id: Children) {
  return typeof id === "number";
}

function isIdPartDescriptor(
  part: PartDescriptor,
): part is PartDescriptorWithId {
  return "id" in part;
}
