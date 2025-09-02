import {
  Children,
  computed,
  isComponentCreator,
  reactive,
  ref,
  symbolForRefkey,
  ToRefs,
} from "@alloy-js/core";
import { CSharpSymbol } from "../../index.js";
import {
  AccessExpression,
  AccessExpressionPartProps,
} from "./access-expression.jsx";

export interface PartDescriptorWithId extends PartDescriptorBase {
  /**
   * The identifier of the access expression part. Will use member access, so must be a valid
   * C# identifier.
   */
  id: Children;
  conditional: boolean;
  typeArgs?: Children[];
}

export interface PartDescriptorWithIndex extends PartDescriptorBase {
  /**
   * The index of the access expression part. Will use element access.
   */
  index: Children;
  conditional: boolean;
}

export interface PartDescriptorWithArgs extends PartDescriptorBase {
  args: Children[];
}

export interface PartDescriptorBase {}

export type PartDescriptor =
  | PartDescriptorWithId
  | PartDescriptorWithIndex
  | PartDescriptorWithArgs;

/**
 * Build part descriptors from the children of a MemberExpression.
 */
export function childrenToPartDescriptors(
  children: Children[],
): PartDescriptor[] {
  const parts: PartDescriptor[] = [];
  for (const child of children) {
    if (!isComponentCreator(child, AccessExpression.Part)) {
      // we ignore non-parts
      continue;
    }

    parts.push(
      createPartDescriptorFromProps(child.props, child === children[0]),
    );
  }

  return parts;
}

const exclusiveParts: (keyof AccessExpressionPartProps)[] = [
  "children",
  "args",
  "refkey",
  "symbol",
  "id",
];
/**
 * Creates a reactive part descriptor from the given part props.
 *
 * @param partProps The props for the part.
 * @param first Whether this is the first part in the expression. Refkeys are
 * handled specially for the first part.
 */
function createPartDescriptorFromProps(
  partProps: AccessExpressionPartProps,
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

  const symbolSource = computed(() => {
    if (partProps.refkey) {
      return symbolForRefkey(partProps.refkey).value as CSharpSymbol;
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
      } else if (partProps.children !== undefined) {
        return partProps.children;
      } else if (first && partProps.refkey) {
        return partProps.refkey;
      } else if (partProps.id !== undefined) {
        return isNumericIdentifier(partProps.id) ?
            partProps.id
          : escapeId(partProps.id);
      } else if (partProps.index !== undefined) {
        return partProps.index;
      } else if (symbolSource.value) {
        return escapeId(symbolSource.value.name);
      } else {
        return "<unresolved symbol>";
      }
    }),
    index: ref<any>(partProps.index),
    conditional: computed(() => {
      if (partProps.conditional) {
        return true;
      }

      if (symbolSource.value) {
        return symbolSource.value.isNullable;
      }

      return false;
    }),
    args: ref<any>(partProps.args),
    typeArgs: ref<any>(partProps.typeArgs),
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
 * Check if the given id is a numeric identifier.
 *
 */
function isNumericIdentifier(id: Children) {
  return typeof id === "number";
}
