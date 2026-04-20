import {
  Children,
  computed,
  createAccessExpression,
  For,
  List,
  OutputSymbol,
  Refkey,
  Show,
} from "@alloy-js/core";

export interface MemberExpressionProps {
  children: Children;
}

type PartDescriptor = {
  type: "call" | "subscription" | "attribute";
  name: Children | undefined;
  expression: Children | undefined;
  quoted: boolean;
  args: Children[] | undefined;
};

const exclusiveParts: (keyof MemberExpressionPartProps)[] = [
  "args",
  "refkey",
  "symbol",
  "id",
  "key",
  "keys",
  "slice",
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

    if (partProps.args !== undefined) {
      return {
        type: "call" as const,
        name: undefined,
        expression: undefined,
        quoted: false,
        args: partProps.args === true ? [] : (partProps.args as Children[]),
      };
    } else if (
      partProps.key !== undefined ||
      partProps.keys !== undefined ||
      partProps.slice !== undefined
    ) {
      return {
        type: "subscription" as const,
        name: undefined,
        expression: getSubscriptionValue(partProps),
        quoted:
          partProps.key !== undefined && typeof partProps.key === "string",
        args: undefined,
      };
    } else {
      let name: Children;
      if (first && partProps.refkey) {
        name = partProps.refkey;
      } else if (partProps.id !== undefined) {
        if (!isValidIdentifier(partProps.id)) {
          throw new Error(`Invalid identifier: ${partProps.id}`);
        }
        name = partProps.id;
      } else if (sym) {
        name = sym.name;
      } else {
        name = "<unresolved symbol>";
      }

      return {
        type: "attribute" as const,
        name,
        expression: undefined,
        quoted: false,
        args: undefined,
      };
    }
  },

  getBase(part) {
    if (part.type !== "attribute") {
      throw new Error(
        "The first part of a MemberExpression must be an id or refkey",
      );
    }
    return part.name;
  },

  formatPart(part, _prevPart, _inCallChain) {
    if (part.type === "call") {
      return formatCallOutput(part);
    } else if (part.type === "attribute") {
      return formatAttributeOutput(part);
    } else {
      return formatSubscriptionOutput(part);
    }
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
 */
MemberExpression.Part = Part;
registerOuterComponent(MemberExpression);

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

// --- Formatting helpers ---

function formatSubscriptionOutput(part: PartDescriptor) {
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

function formatAttributeOutput(part: PartDescriptor) {
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

function formatCallOutput(part: PartDescriptor) {
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

// --- Utilities ---

function isValidIdentifier(id: Children) {
  if (typeof id === "string" && id.includes('"')) {
    return false;
  }
  return true;
}

function getSubscriptionValue(partProps: SubscriptionProps): Children {
  // Handle tuple keys: obj[a, b] → (a, b)
  if (partProps.keys?.length) {
    return <List comma line children={partProps.keys} />;
  }

  // Handle slice: obj[start:stop:step]
  if (partProps.slice && Object.keys(partProps.slice).length > 0) {
    const { start, stop, step } = partProps.slice;
    const parts = [start ? start : "", ":", stop ? stop : ""];

    if (step) {
      parts.push(":", step);
    }

    return parts;
  }

  return partProps.key;
}
