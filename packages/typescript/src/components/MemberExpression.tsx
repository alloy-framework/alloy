import {
  Children,
  childrenArray,
  computed,
  For,
  isComponentCreator,
  OutputSymbol,
  reactive,
  ref,
  Refkey,
  Show,
  ToRefs,
  useBinder,
} from "@alloy-js/core";

import { TSOutputSymbol, TSSymbolFlags } from "../symbols/ts-output-symbol.js";
import { isValidJSIdentifier } from "../utils.js";

export interface MemberExpressionProps {
  children: Children;
}

interface PartDescriptor {
  id: Children;
  accessStyle: "dot" | "bracket";
  quoteKey: boolean;
  nullish: boolean;
  args?: Children[];
}

/**
 * Create a member expression from parts. Each part can provide one of
 * the following:
 *
 * * **id**: The identifier for the member expression part
 * * **refkey**: a refkey for a symbol whose name becomes the identifier
 * * **symbol**: a symbol whose name becomes the identifier part
 * * **args**: create a method call with the given args
 * * **children**: the contents of the part, overrides the other props.
 * * **nullish**: indicates whether the part is nullish, affecting access style.
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
  const children = flattenMemberExpression(childrenArray(() => props.children));
  const parts = childrenToPartDescriptors(children);

  if (parts.length === 0) {
    return <></>;
  }

  const isCallChain = computed(() => {
    let callCount = 0;
    for (const part of parts) {
      if (part.args !== undefined) callCount++;
    }

    return callCount > 1;
  });

  // construct a member expression from the parts. When a part is nullish,
  // and there is a subsequent part, we use `?.` instead of `.`. accessStyle determines
  // whether we use dot or bracket notation.

  return computed(() => {
    return isCallChain.value ?
        formatCallChain(parts)
      : formatNonCallChain(parts);
  });
}

/**
 * Build part descriptors from the children of a MemberExpression.
 */
function childrenToPartDescriptors(children: Children[]): PartDescriptor[] {
  const parts: PartDescriptor[] = [];
  for (const child of children) {
    if (!isComponentCreator(child, MemberExpression.Part)) {
      // we ignore non-parts
      continue;
    }

    parts.push(
      createPartDescriptorFromProps(child.props, child === children[0]),
    );
  }

  return parts;
}

/**
 * Creates a reactive part descriptor from the given part props.
 *
 * @param partProps The props for the part.
 * @param first Whether this is the first part in the expression. Refkeys are
 * handled specially for the first part.
 */
function createPartDescriptorFromProps(
  partProps: MemberExpressionPartProps,
  first: boolean,
) {
  const symbolSource = computed(() => {
    if (partProps.refkey) {
      return getSymbolForRefkey(partProps.refkey).value;
    } else if (partProps.symbol) {
      return partProps.symbol;
    } else {
      return undefined;
    }
  });

  const part: ToRefs<PartDescriptor> = {
    id: computed(() => {
      if (partProps.args) {
        return undefined;
      } else if ("children" in partProps && partProps.children !== undefined) {
        return partProps.children;
      } else if (first && partProps.refkey) {
        return partProps.refkey;
      } else if (partProps.id) {
        return escapeId(partProps.id);
      } else if (symbolSource.value) {
        return escapeId(symbolSource.value.name);
      } else {
        return "<unresolved symbol>";
      }
    }),
    accessStyle: computed(() => {
      if (partProps.args) {
        // not used
        return "dot";
      } else if ("children" in partProps && partProps.children !== undefined) {
        // todo: need a way to specify the access style for this
        return "dot";
      } else if (partProps.id) {
        return accessStyleForMemberName(partProps.id);
      } else if (symbolSource.value) {
        return accessStyleForMemberName(symbolSource.value.name);
      } else {
        return "dot";
      }
    }),
    quoteKey: computed(() => {
      if (partProps.quoteId) {
        return partProps.quoteId;
      } else if (partProps.id) {
        return !isValidJSIdentifier(partProps.id);
      } else if (symbolSource.value) {
        return !isValidJSIdentifier(symbolSource.value.name);
      } else {
        return false;
      }
    }),
    nullish: computed(() => {
      if (partProps.nullish) {
        return partProps.nullish;
      }

      if (symbolSource.value) {
        return isNullish(symbolSource.value);
      }

      return false;
    }),
    args: ref<any>(partProps.args === true ? [] : partProps.args),
  };

  return reactive(part);
}

/**
 * replaces quotes with escaped quotes
 */
function escapeId(id: string) {
  return id.replace(/"/g, '\\"');
}

/**
 * Convert a refkey to a symbol ref using the current binder.
 */
function getSymbolForRefkey(refkey: Refkey) {
  const binder = useBinder();
  return binder.getSymbolForRefkey(refkey);
}

/**
 * Check if the given symbol is nullish.
 */
function isNullish(symbol: OutputSymbol): boolean {
  return !!((symbol as TSOutputSymbol).tsFlags & TSSymbolFlags.Nullish);
}

/**
 * Formatting of call chains (i.e. member expressions which have more than one
 * call in them). The general approach is that line breaks occur after each
 * call, and there is only one call per line. When there are non-call elements,
 * they occur prior to the call part. The first part of the member expression
 * contains all but the last non-call part.
 *
 * The following is an example of proper formatting:
 *
 * ```ts
 * z.dummy             // all but the last non-call part for the first element
 *   .object({         // the first call part with line break after
 *      a: 1,
 *   })
 *   .dummy.partial()  // the next call part with non-call parts before it
 * ```
 */
function formatCallChain(parts: PartDescriptor[]): Children {
  return computed(() => {
    const expression: Children[] = [];

    // break the expression into parts.
    const chunks: PartDescriptor[][] = [];

    // the first part is all the non-call parts
    let partIndex = 0;

    function pushPart() {
      const part = parts[partIndex];
      if (!part) throw new Error("No part to push");
      chunks.at(-1)!.push(part);
      partIndex++;
    }

    function pushChunk() {
      chunks.push([]);
    }

    // For the first chunk, take all the non-call parts except the last one
    // and put them in a chunk.
    pushChunk();
    while (
      partIndex < parts.length &&
      (partIndex === parts.length - 1 ||
        chunks.at(-1)!.length === 0 ||
        parts[partIndex + 1].args === undefined)
    ) {
      pushPart();
      if (chunks.at(-1)!.at(-1)!.args !== undefined) {
        // the first segment always ends after we see a call
        // if we happen to take one
        break;
      }
    }

    // then for all remaining parts, collect all the non-call parts and end with
    // a call chunk
    while (partIndex < parts.length) {
      pushChunk();
      while (partIndex < parts.length && !parts[partIndex].args) {
        pushPart();
      }
      while (partIndex < parts.length && parts[partIndex].args) {
        pushPart();
      }
    }

    for (let chunkIndex = 0; chunkIndex < chunks.length; chunkIndex++) {
      const chunk = chunks[chunkIndex];
      const chunkExpression = [];
      for (let partIndex = 0; partIndex < chunk.length; partIndex++) {
        if (chunkIndex === 0 && partIndex === 0) {
          // first part is just gonna be the id
          chunkExpression.push(chunk[0].id);
          continue;
        }
        const part = chunk[partIndex];
        const prevPart =
          partIndex === 0 ?
            chunks[chunkIndex - 1].at(-1)!
          : chunk[partIndex - 1];

        if (part.args !== undefined) {
          // For parts with only args (no name), append function call directly with appropriate nullish operator
          chunkExpression.push(formatCallExpr(prevPart, part));
        } else if (part.accessStyle === "dot") {
          chunkExpression.push(formatDotAccess(prevPart, part));
        } else {
          // bracket notation - don't include the dot
          chunkExpression.push(formatArrayAccess(prevPart, part));
        }
      }

      expression.push(
        chunkIndex === 0 ? chunkExpression : (
          <>
            <sbr />
            {chunkExpression}
          </>
        ),
      );
    }

    return (
      <group>
        <indent>{expression}</indent>
      </group>
    );
  });
}

function formatNonCallChain(parts: PartDescriptor[]): Children {
  return computed(() => {
    const expression: Children[] = [];

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const base = part.id;
      if (i === 0) {
        expression.push(base);
      } else {
        // Determine if we should use nullish operator from previous part
        const prevPart = parts[i - 1];

        if (part.args !== undefined) {
          // For parts with only args (no name), append function call directly with appropriate nullish operator
          expression.push(formatCallExpr(prevPart, part));
        } else if (part.accessStyle === "dot") {
          expression.push(formatDotAccess(prevPart, part));
        } else {
          // bracket notation - don't include the dot
          expression.push(formatArrayAccess(prevPart, part));
        }
      }
    }

    return expression;
  });
}

function formatArrayAccess(prevPart: PartDescriptor, part: PartDescriptor) {
  return (
    <group>
      {prevPart.nullish ? "?." : ""}[
      <indent>
        <sbr />
        {part.quoteKey && '"'}
        {part.id}
        {part.quoteKey && '"'}
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
        {part.id}
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

function accessStyleForMemberName(name: string) {
  if (isValidJSIdentifier(name)) {
    return "dot";
  }
  return "bracket";
}

function flattenMemberExpression(children: Children[]): Children[] {
  const flattened: Children[] = [];
  for (const child of children) {
    if (isComponentCreator(child, MemberExpression)) {
      flattened.push(
        ...flattenMemberExpression(childrenArray(() => child.props.children)),
      );
    } else {
      flattened.push(child);
    }
  }
  return flattened;
}

export interface MemberExpressionPartProps {
  /**
   * The identifier for this part of the member expression.
   */
  id?: string;

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
   * This part is nullish. Subsequent parts use conditional access operators.
   */
  nullish?: boolean;

  /**
   * The contents of this part. When passed, overrides the other props except
   * nullish.
   */
  children?: Children;
}
/**
 * A part of a member expression. Each part can provide one of the following
 * props:
 *
 * * **id**: The identifier for the member expression part
 * * **refkey**: A refkey for a symbol whose name becomes the identifier
 * * **symbol**: a symbol whose name becomes the identifier part
 * * **args**: create a method call with the given args
 */
MemberExpression.Part = function (props: MemberExpressionPartProps) {
  /**
   * This component does nothing except hold props which are retrieved by
   * the `MemberExpression` component.
   */
};
