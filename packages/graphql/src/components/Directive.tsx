import { isNamekey, type Children } from "@alloy-js/core";
import {
  DirectiveArgTargetContext,
  useDirectiveTargetContext,
  useSchemaContext,
  type SchemaState,
} from "../schema.js";
import type {
  AppliedDirective,
  DirectiveReference,
  DirectiveTarget,
} from "../schema/types.js";

export interface DirectiveProps {
  name: DirectiveReference;
  children?: Children;
}

function createAppliedDirective(
  state: SchemaState,
  name: DirectiveReference,
): AppliedDirective {
  return {
    name: normalizeDirectiveName(state, name),
    args: [],
    argNames: new Set(),
  };
}

/**
 * Applies a directive to the current schema element.
 *
 * @example Directive with arguments
 * ```tsx
 * <Directive name="auth">
 *   <Argument name="role" value="admin" />
 * </Directive>
 * ```
 *
 * @example Directive with no arguments
 * ```tsx
 * <Directive name="cache" />
 * ```
 *
 * @example Repeatable directive
 * ```tsx
 * <Directive name="tag">
 *   <Argument name="name" value="public" />
 * </Directive>
 * <Directive name="tag">
 *   <Argument name="name" value="internal" />
 * </Directive>
 * ```
 *
 * @remarks
 * Directive names are identity in GraphQL. Prefer using the same name or
 * `Namekey` for both definition and application.
 */
export function Directive(props: DirectiveProps) {
  const state = useSchemaContext();
  const target = useDirectiveTargetContext();
  const resolvedName = normalizeDirectiveName(state, props.name);
  assertNoBuiltInDirectiveConflict(target.target, resolvedName);

  const applied = createAppliedDirective(state, props.name);
  target.directives.push(applied);

  return (
    <DirectiveArgTargetContext.Provider
      value={{ args: applied.args, argNames: applied.argNames }}
    >
      {props.children}
    </DirectiveArgTargetContext.Provider>
  );
}

function assertNoBuiltInDirectiveConflict(
  target: DirectiveTarget,
  name: string,
) {
  if (name === "deprecated") {
    if (
      "deprecationReason" in target &&
      target.deprecationReason !== undefined
    ) {
      throw new Error(
        `Directive "@deprecated" conflicts with deprecated props on ${describeTarget(target)}.`,
      );
    }
  }
  if (name === "oneOf") {
    if ("isOneOf" in target && target.isOneOf) {
      throw new Error(
        `Directive "@oneOf" conflicts with the oneOf prop on ${describeTarget(target)}.`,
      );
    }
  }
  if (name === "specifiedBy") {
    if ("specifiedByUrl" in target && target.specifiedByUrl !== undefined) {
      throw new Error(
        `Directive "@specifiedBy" conflicts with specifiedByUrl on ${describeTarget(target)}.`,
      );
    }
  }
}

function normalizeDirectiveName(
  state: SchemaState,
  name: DirectiveReference,
): string {
  if (isNamekey(name)) {
    if (name.options.ignoreNamePolicy) {
      return name.name;
    }
    return state.namePolicy?.getName(name.name, "directive") ?? name.name;
  }
  return state.namePolicy?.getName(name, "directive") ?? name;
}

function describeTarget(target: DirectiveTarget): string {
  if ("kind" in target) {
    switch (target.kind) {
      case "schema":
        return "the schema";
      case "object":
        return `object type "${target.name}"`;
      case "interface":
        return `interface type "${target.name}"`;
      case "input":
        return `input type "${target.name}"`;
      case "enum":
        return `enum type "${target.name}"`;
      case "union":
        return `union type "${target.name}"`;
      case "scalar":
        return `scalar type "${target.name}"`;
      default:
        break;
    }
  }
  if ("name" in target) {
    return `"${target.name}"`;
  }
  return "this element";
}
