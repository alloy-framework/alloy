import { createNamePolicy, type NamePolicy } from "@alloy-js/core";

/**
 * Names that can be normalized by the GraphQL name policy.
 */
export type GraphQLNameElement =
  | "type"
  | "field"
  | "argument"
  | "inputField"
  | "enumValue"
  | "directive";

/**
 * Validation rules for GraphQL names.
 */
export type GraphQLNameRules = Partial<Record<GraphQLNameElement, RegExp>>;

/**
 * Built-in naming conventions for GraphQL elements.
 */
export const defaultNamePolicyRules: GraphQLNameRules = {
  type: /^[A-Z][A-Za-z0-9_]*$/,
  field: /^[A-Za-z][A-Za-z0-9_]*$/,
  argument: /^[a-z][A-Za-z0-9_]*$/,
  inputField: /^[a-z][A-Za-z0-9_]*$/,
  enumValue: /^[A-Z][A-Z0-9_]*$/,
  directive: /^[a-z][A-Za-z0-9_]*$/,
};

/**
 * Formatter applied to a GraphQL name before validation.
 */
export type GraphQLNameFormatter = (name: string) => string;

/**
 * Name policy with optional validation rules for each GraphQL element.
 */
export interface GraphQLNamePolicy extends NamePolicy<GraphQLNameElement> {
  /**
   * Optional regex rules for GraphQL naming conventions.
   *
   * @remarks
   * These rules enforce style conventions only. GraphQL hard requirements
   * (the spec name regex, `__` reserved prefix, and enum value reserved words)
   * are always enforced regardless of the active policy.
   */
  rules?: GraphQLNameRules;
  kind?: "default" | "relay";
}

/**
 * Options for creating a GraphQL name policy.
 */
export interface GraphQLNamePolicyOptions {
  rules?: GraphQLNameRules;
  format?: Partial<Record<GraphQLNameElement, GraphQLNameFormatter>>;
}

/**
 * Creates a name policy for GraphQL types, fields, and arguments.
 *
 * @example
 * ```ts
 * const policy = createGraphQLNamePolicy({
 *   format: { field: (name) => name.toLowerCase() },
 * });
 * ```
 *
 * @remarks
 * Formatters run before validation rules are applied.
 */
export function createGraphQLNamePolicy(
  options: GraphQLNamePolicyOptions = {},
): GraphQLNamePolicy {
  const formatters = options.format ?? {};
  const policy = createNamePolicy<GraphQLNameElement>((name, element) => {
    const formatter = element ? formatters[element] : undefined;
    return formatter ? formatter(name) : name;
  });
  return Object.assign(policy, { rules: options.rules });
}

/**
 * Default naming policy for GraphQL conventions.
 *
 * @remarks
 * Used when `namePolicy` is omitted.
 */
export const defaultNamePolicy = Object.assign(
  createGraphQLNamePolicy({ rules: defaultNamePolicyRules }),
  { kind: "default" as const },
);

/**
 * Relay naming policy (includes default conventions plus Relay-specific rules).
 *
 * @remarks
 * Selecting this policy also enables Relay schema validation during build.
 */
export const relayNamePolicy = Object.assign(
  createGraphQLNamePolicy({ rules: defaultNamePolicyRules }),
  { kind: "relay" as const },
);

/**
 * Returns true when a policy is the Relay policy.
 */
export function isRelayNamePolicy(
  value: GraphQLNamePolicy | null | undefined,
): value is GraphQLNamePolicy {
  return value?.kind === "relay";
}

/**
 * Returns true when a value looks like a GraphQL name policy.
 */
export function isGraphQLNamePolicy(
  value: unknown,
): value is GraphQLNamePolicy {
  if (!value || typeof value !== "object") {
    return false;
  }
  const candidate = value as { getName?: unknown; for?: unknown };
  return (
    typeof candidate.getName === "function" &&
    typeof candidate.for === "function"
  );
}
