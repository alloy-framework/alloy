import {
  Children,
  childrenArray,
  code,
  computed,
  For,
  isComponentCreator,
  OutputSymbol,
  reactive,
  ref,
  Refkey,
  Show,
  takeSymbols,
  ToRefs,
  useBinder,
} from "@alloy-js/core";

export interface MemberExpressionProps {
  children: Children;
}

const MEMBER_ACCESS_TYPES = {
  ATTRIBUTE: "attribute",
  SUBSCRIPTION: "subscription",
  CALL: "call",
} as const;

interface AttributeDescriptor extends PartDescriptorBase {
  type: typeof MEMBER_ACCESS_TYPES.ATTRIBUTE;
  name: Children;
}

interface SubscriptionDescriptor extends PartDescriptorBase {
  type: typeof MEMBER_ACCESS_TYPES.SUBSCRIPTION;
  expression: Children;
  quoted: boolean;
}

interface CallDescriptor extends PartDescriptorBase {
  type: typeof MEMBER_ACCESS_TYPES.CALL;
  args: Children[];
}

interface PartDescriptorBase {
  type:
    | typeof MEMBER_ACCESS_TYPES.CALL
    | typeof MEMBER_ACCESS_TYPES.SUBSCRIPTION
    | typeof MEMBER_ACCESS_TYPES.ATTRIBUTE;
}

type PartDescriptor =
  | AttributeDescriptor
  | SubscriptionDescriptor
  | CallDescriptor;

/**
 * Create a member expression from parts. Each part can provide one of
 * the following:
 *
 * * **id**: The identifier for the member expression part
 * * **refkey**: a refkey for a symbol whose name becomes the identifier
 * * **symbol**: a symbol whose name becomes the identifier part
 * * **args**: create a method call with the given args
 * * **children**: arbitrary contents for the identifier part.
 *
 * @example
 *
 * ```tsx
 * <MemberExpression>
 *   <MemberExpression.Part id="base" />
 *   <MemberExpression.Part refkey={rk} />
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
 * base.prop1.prop2("hello", "world").SomeValue
 * ```
 */
export function MemberExpression(props: MemberExpressionProps): Children {
  const children = childrenArray(() => props.children);
  const parts = childrenToPartDescriptors(children);
  // any symbols emitted from the children won't be relevant to
  // parent scopes. TODO: emit the proper symbol if we know it?
  takeSymbols();

  if (parts.length === 0) {
    return <></>;
  }

  return computed(() => {
    return formatChain(parts);
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

const exclusiveParts: (keyof MemberExpressionPartProps)[] = [
  "args",
  "refkey",
  "symbol",
  "id",
  "key",
  "keys",
  "slice",
];
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
  const foundProps = exclusiveParts.filter((key) => {
    return key in partProps;
  });

  if (foundProps.length > 1) {
    throw new Error(
      `Only one of ${foundProps.join(", ")} can be used for a MemberExpression part at a time`,
    );
  }

  // Validate slice syntax
  if (partProps.slice) {
    const { start, stop, step } = partProps.slice;
    if (!start && !stop && !step) {
      throw new Error("MemberExpression.Part: slice object cannot be empty");
    }
  }

  // Validate keys array
  if (partProps.keys?.length === 0) {
    throw new Error("MemberExpression.Part: keys array cannot be empty");
  }

  const symbolSource = computed(() => {
    if (partProps.refkey) {
      return getSymbolForRefkey(partProps.refkey).value;
    } else if (partProps.symbol) {
      return partProps.symbol;
    } else {
      return undefined;
    }
  });

  // Return different descriptor types based on what props are provided
  let part: ToRefs<PartDescriptor>;
  if (partProps.args !== undefined) {
    // CallDescriptor
    part = {
      type: computed(() => {
        return "call" as const;
      }),
      args: ref<any>(partProps.args === true ? [] : partProps.args),
    };
  } else if (
    partProps.key !== undefined ||
    partProps.keys !== undefined ||
    partProps.slice !== undefined
  ) {
    // SubscriptionDescriptor
    part = {
      type: computed(() => {
        return "subscription" as const;
      }),
      expression: computed(() => {
        return getSubscriptionValue(partProps);
      }),
      quoted: computed(() => {
        return partProps.key !== undefined && typeof partProps.key === "string";
      }),
    };
  } else {
    // IdentifierDescriptor
    part = {
      type: computed(() => {
        return "attribute" as const;
      }),
      name: computed(() => {
        if (first && partProps.refkey) {
          return partProps.refkey;
        } else if (partProps.id !== undefined) {
          if (!isValidIdentifier(partProps.id)) {
            throw new Error(`Invalid identifier: ${partProps.id}`);
          }
          return partProps.id;
        } else if (symbolSource.value) {
          return symbolSource.value.name;
        } else {
          return "<unresolved symbol>";
        }
      }),
    };
  }
  return reactive(part);
}

/**
 * Convert a refkey to a symbol ref using the current binder.
 */
function getSymbolForRefkey(refkey: Refkey) {
  const binder = useBinder();
  return binder!.getSymbolForRefkey(refkey);
}

/**
 * Format a chain of parts into a MemberExpression.
 */
function formatChain(parts: PartDescriptor[]): Children {
  return computed(() => {
    const expression: Children[] = [];

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (i === 0) {
        if (!isAttributeDescriptor(part)) {
          throw new Error(
            "The first part of a MemberExpression must be an id or refkey",
          );
        }
        expression.push(part.name);
      } else {
        if (isCallDescriptor(part)) {
          expression.push(formatCallOutput(part));
        } else if (isAttributeDescriptor(part)) {
          expression.push(formatAttributeOutput(part));
        } else if (isSubscriptionDescriptor(part)) {
          expression.push(formatSubscriptionOutput(part));
        }
      }
    }

    return expression;
  });
}

/**
 * Format a part of a member expression that is an array access.
 * This is used for parts like `foo[0]` or `foo["bar"]`.
 */
function formatSubscriptionOutput(part: SubscriptionDescriptor) {
  return (
    <group>
      {""}[
      <indent>
        <sbr />
        {part.quoted && '"'}
        {part.expression}
        {part.quoted && '"'}
      </indent>
      <sbr />]
    </group>
  );
}

function formatAttributeOutput(part: AttributeDescriptor) {
  return (
    <group>
      <indent>
        <ifBreak> \</ifBreak>
        <sbr />
        {"."}
        {part.name}
      </indent>
    </group>
  );
}

function formatCallOutput(part: CallDescriptor) {
  const args = computed(() => {
    return typeof part.args === "boolean" ? [] : (part.args ?? []);
  });

  return (
    <group>
      {""}(<Show when={args.value.length <= 1}>{args.value[0]}</Show>
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

export interface MemberExpressionPartProps {
  /**
   * The identifier for attribute access (obj.attr).
   * Use this for Python attribute references.
   */
  id?: string | number;

  /**
   * Single key for subscription access (obj[key] or obj[0]).
   * Use this for single subscription access.
   */
  key?: Children;

  /**
   * Multiple keys for tuple subscription access (obj[a, b] -\> obj[(a, b)]).
   * Use this when you need tuple key access.
   */
  keys?: Children[];

  /**
   * Slice notation for subscription access (obj[start:stop:step]).
   * Use this for Python slice syntax.
   */
  slice?: {
    start?: Children;
    stop?: Children;
    step?: Children;
  };

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

function isValidIdentifier(id: Children) {
  if (typeof id === "string" && id.includes('"')) {
    return false;
  }
  return true;
}
function isCallDescriptor(part: PartDescriptor): part is CallDescriptor {
  return "type" in part && part.type === MEMBER_ACCESS_TYPES.CALL;
}

function isAttributeDescriptor(
  part: PartDescriptor,
): part is AttributeDescriptor {
  return "type" in part && part.type === MEMBER_ACCESS_TYPES.ATTRIBUTE;
}

function isSubscriptionDescriptor(
  part: PartDescriptor,
): part is SubscriptionDescriptor {
  return "type" in part && part.type === MEMBER_ACCESS_TYPES.SUBSCRIPTION;
}

function getNameForRefkey(refkey: Children): Children {
  const parsedValue = getSymbolForRefkey(refkey as Refkey).value;
  return parsedValue !== undefined ? parsedValue.name : refkey;
}

export interface SubscriptionProps {
  /**
   * Single key for subscription access (obj[key] or obj[0]).
   * Use this for single subscription access.
   */
  key?: Children;

  /**
   * Multiple keys for tuple subscription access (obj[a, b] -\> obj[(a, b)]).
   * Use this when you need tuple key access.
   */
  keys?: Children[];

  /**
   * Slice notation for subscription access (obj[start:stop:step]).
   * Use this for Python slice syntax.
   */
  slice?: {
    start?: Children;
    stop?: Children;
    step?: Children;
  };
}

function getSubscriptionValue(partProps: SubscriptionProps): Children {
  // Handle tuple keys: obj[a, b] → (a, b)
  if (partProps.keys?.length) {
    const parsedKeys = partProps.keys.map((key) =>
      getNameForRefkey(key as Refkey),
    );
    return code`${parsedKeys.join(", ")}`;
  }

  // Handle slice: obj[start:stop:step]
  if (partProps.slice && Object.keys(partProps.slice).length > 0) {
    const { start, stop, step } = partProps.slice;
    const parts = [
      start ? getNameForRefkey(start as Refkey) : "",
      ":",
      stop ? getNameForRefkey(stop as Refkey) : "",
    ];

    if (step) {
      parts.push(":", getNameForRefkey(step as Refkey));
    }

    return code`${parts.join("")}`;
  }

  // Handle single key: obj[key]
  return getNameForRefkey(partProps.key as Refkey);
}
