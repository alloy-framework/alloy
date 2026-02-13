import { isNamekey } from "@alloy-js/core";
import {
  DirectiveLocation,
  specifiedDirectives,
  type GraphQLDirective,
} from "graphql";
import type { GraphQLNameElement } from "../name-policy.js";
import {
  builtInScalars,
  builtInScalarsFallback,
  GRAPHQL_NAME_REGEX,
} from "./constants.js";
import { extractNamedTypeName, isNonNullTypeReference } from "./refs.js";
import type {
  ArgDefinition,
  ArgTargetContextValue,
  DeprecatedProps,
  DirectiveDefinition,
  EnumTypeDefinition,
  EnumValueDefinition,
  FieldDefinition,
  InputFieldDefinition,
  InputObjectTypeDefinition,
  InterfaceTypeDefinition,
  NameInput,
  ObjectTypeDefinition,
  ScalarTypeDefinition,
  SchemaState,
  TypeDefinition,
  TypeReference,
  UnionMemberDefinition,
  UnionTypeDefinition,
} from "./types.js";

/**
 * Registers a type definition in the schema state.
 */
export function registerType(state: SchemaState, definition: TypeDefinition) {
  ensureNameValid(state, definition.name, "type", {
    ignoreNamePolicy: definition.ignoreNamePolicy,
  });
  ensureTypeNameAvailable(state, definition.name);

  state.types.set(definition.name, definition);
}

/**
 * Registers a directive definition in the schema state.
 */
export function registerDirective(
  state: SchemaState,
  definition: DirectiveDefinition,
) {
  ensureNameValid(state, definition.name, "directive", {
    ignoreNamePolicy: definition.ignoreNamePolicy,
  });

  const specifiedName = specifiedDirectives.find(
    (directive: GraphQLDirective) => directive.name === definition.name,
  );
  if (specifiedName) {
    throw new Error(
      `Directive name "${definition.name}" conflicts with a specified directive.`,
    );
  }

  if (state.directives.has(definition.name)) {
    throw new Error(`Directive "${definition.name}" is already defined.`);
  }

  if (definition.locations.length === 0) {
    throw new Error(`Directive "${definition.name}" must have locations.`);
  }

  state.directives.set(definition.name, definition);
}

/**
 * Creates an object type definition, applying name policies.
 */
export function createObjectTypeDefinition(
  state: SchemaState,
  name: NameInput,
  description?: string,
  interfaces: TypeReference[] = [],
): ObjectTypeDefinition {
  const resolved = resolveNameInput(state, name, "type");
  return {
    kind: "object",
    name: resolved.name,
    description,
    ignoreNamePolicy: resolved.ignoreNamePolicy,
    directives: [],
    fields: [],
    fieldNames: new Set(),
    interfaces,
  };
}

/**
 * Creates an interface type definition, applying name policies.
 */
export function createInterfaceTypeDefinition(
  state: SchemaState,
  name: NameInput,
  description?: string,
  interfaces: TypeReference[] = [],
): InterfaceTypeDefinition {
  const resolved = resolveNameInput(state, name, "type");
  return {
    kind: "interface",
    name: resolved.name,
    description,
    ignoreNamePolicy: resolved.ignoreNamePolicy,
    directives: [],
    fields: [],
    fieldNames: new Set(),
    interfaces,
  };
}

/**
 * Creates an input object type definition, applying name policies.
 */
export function createInputObjectTypeDefinition(
  state: SchemaState,
  name: NameInput,
  description?: string,
  isOneOf = false,
): InputObjectTypeDefinition {
  const resolved = resolveNameInput(state, name, "type");
  return {
    kind: "input",
    name: resolved.name,
    description,
    ignoreNamePolicy: resolved.ignoreNamePolicy,
    isOneOf,
    directives: [],
    fields: [],
    fieldNames: new Set(),
  };
}

/**
 * Creates an enum type definition, applying name policies.
 */
export function createEnumTypeDefinition(
  state: SchemaState,
  name: NameInput,
  description?: string,
): EnumTypeDefinition {
  const resolved = resolveNameInput(state, name, "type");
  return {
    kind: "enum",
    name: resolved.name,
    description,
    ignoreNamePolicy: resolved.ignoreNamePolicy,
    directives: [],
    values: [],
    valueNames: new Set(),
  };
}

/**
 * Creates a union type definition, applying name policies.
 */
export function createUnionTypeDefinition(
  state: SchemaState,
  name: NameInput,
  description?: string,
): UnionTypeDefinition {
  const resolved = resolveNameInput(state, name, "type");
  return {
    kind: "union",
    name: resolved.name,
    description,
    ignoreNamePolicy: resolved.ignoreNamePolicy,
    directives: [],
    members: [],
    memberNames: new Set(),
  };
}

/**
 * Creates a scalar type definition, applying name policies.
 */
export function createScalarTypeDefinition(
  state: SchemaState,
  name: NameInput,
  description?: string,
): ScalarTypeDefinition {
  const resolved = resolveNameInput(state, name, "type");
  return {
    kind: "scalar",
    name: resolved.name,
    description,
    ignoreNamePolicy: resolved.ignoreNamePolicy,
    directives: [],
  };
}

/**
 * Creates a field definition, applying name policies.
 */
export function createFieldDefinition(
  state: SchemaState,
  name: NameInput,
  type: TypeReference,
  description?: string,
  deprecationReason?: string,
): FieldDefinition {
  const resolved = resolveNameInput(state, name, "field");
  return {
    name: resolved.name,
    type,
    args: [],
    argNames: new Set(),
    description,
    deprecationReason,
    directives: [],
  };
}

/**
 * Creates an argument definition, applying name policies.
 */
export function createArgDefinition(
  state: SchemaState,
  name: NameInput,
  type: TypeReference,
  description?: string,
  defaultValue?: unknown,
  deprecationReason?: string,
): ArgDefinition {
  const resolved = resolveNameInput(state, name, "argument");
  return {
    name: resolved.name,
    type,
    description,
    defaultValue,
    deprecationReason,
    directives: [],
  };
}

/**
 * Creates an input field definition, applying name policies.
 */
export function createInputFieldDefinition(
  state: SchemaState,
  name: NameInput,
  type: TypeReference,
  description?: string,
  defaultValue?: unknown,
  deprecationReason?: string,
): InputFieldDefinition {
  const resolved = resolveNameInput(state, name, "inputField");
  return {
    name: resolved.name,
    type,
    description,
    defaultValue,
    deprecationReason,
    directives: [],
  };
}

/**
 * Creates an enum value definition, applying name policies.
 */
export function createEnumValueDefinition(
  state: SchemaState,
  name: NameInput,
  description?: string,
  deprecationReason?: string,
): EnumValueDefinition {
  const resolved = resolveNameInput(state, name, "enumValue");
  return {
    name: resolved.name,
    description,
    deprecationReason,
    directives: [],
  };
}

/**
 * Creates a union member definition.
 */
export function createUnionMemberDefinition(
  type: TypeReference,
): UnionMemberDefinition {
  return { type };
}

/**
 * Creates a directive definition, applying name policies.
 */
export function createDirectiveDefinition(
  state: SchemaState,
  name: NameInput,
  locations: DirectiveLocation[],
  repeatable = false,
  description?: string,
): DirectiveDefinition {
  const resolved = resolveNameInput(state, name, "directive");
  return {
    name: resolved.name,
    description,
    ignoreNamePolicy: resolved.ignoreNamePolicy,
    repeatable,
    locations,
    args: [],
    argNames: new Set(),
    directives: [],
  };
}

/**
 * Adds a field to an object or interface type definition.
 */
export function addFieldToType(
  type: ObjectTypeDefinition | InterfaceTypeDefinition,
  field: FieldDefinition,
) {
  if (type.fieldNames.has(field.name)) {
    throw new Error(
      `Field "${field.name}" is already defined on "${type.name}".`,
    );
  }
  type.fieldNames.add(field.name);
  type.fields.push(field);
}

/**
 * Adds an input field to an input object type definition.
 */
export function addInputFieldToType(
  type: InputObjectTypeDefinition,
  field: InputFieldDefinition,
) {
  if (type.fieldNames.has(field.name)) {
    throw new Error(
      `Input field "${field.name}" is already defined on "${type.name}".`,
    );
  }

  const isNonNull = isNonNullTypeReference(field.type);
  const hasDefault = field.defaultValue !== undefined;
  if (type.isOneOf) {
    if (isNonNull) {
      throw new Error(
        `OneOf input "${type.name}" field "${field.name}" must be nullable.`,
      );
    }
    if (hasDefault) {
      throw new Error(
        `OneOf input "${type.name}" field "${field.name}" must not define a default value.`,
      );
    }
  }
  if (field.deprecationReason && isNonNull && !hasDefault) {
    throw new Error(
      `Input field "${field.name}" on "${type.name}" cannot be deprecated because it is required.`,
    );
  }
  type.fieldNames.add(field.name);
  type.fields.push(field);
}

/**
 * Adds a value to an enum type definition.
 */
export function addEnumValueToType(
  type: EnumTypeDefinition,
  value: EnumValueDefinition,
) {
  if (type.valueNames.has(value.name)) {
    throw new Error(
      `Enum value "${value.name}" is already defined on "${type.name}".`,
    );
  }
  type.valueNames.add(value.name);
  type.values.push(value);
}

/**
 * Adds a member to a union type definition.
 */
export function addUnionMemberToType(
  state: SchemaState,
  type: UnionTypeDefinition,
  member: UnionMemberDefinition,
) {
  const memberName = extractNamedTypeName(state, member.type);
  if (memberName && type.memberNames.has(memberName)) {
    throw new Error(
      `Union member "${memberName}" is already defined on "${type.name}".`,
    );
  }
  if (memberName) {
    type.memberNames.add(memberName);
  }
  type.members.push(member);
}

/**
 * Adds an input value to the current input value target.
 */
export function addArgToTarget(
  target: ArgTargetContextValue,
  arg: ArgDefinition,
) {
  if (target.argNames.has(arg.name)) {
    throw new Error(`InputValue "${arg.name}" is already defined.`);
  }
  target.argNames.add(arg.name);
  target.args.push(arg);
}

/**
 * Resolves a deprecation reason from `DeprecatedProps`.
 */
export function resolveDeprecationReason(
  props: DeprecatedProps,
): string | undefined {
  if (props.deprecationReason !== undefined) {
    return props.deprecationReason;
  }
  if (props.deprecated === true) {
    return "No longer supported";
  }
  if (typeof props.deprecated === "string") {
    return props.deprecated;
  }
  return undefined;
}

function ensureNameValid(
  state: SchemaState,
  name: string,
  kind: GraphQLNameElement,
  options: { ignoreNamePolicy?: boolean } = {},
) {
  if (!GRAPHQL_NAME_REGEX.test(name)) {
    throw new Error(`Name "${name}" does not match GraphQL naming rules.`);
  }
  if (name.startsWith("__")) {
    throw new Error(`Name "${name}" must not begin with "__".`);
  }
  if (
    kind === "enumValue" &&
    (name === "true" || name === "false" || name === "null")
  ) {
    throw new Error(
      `Enum value name "${name}" is reserved and cannot be used.`,
    );
  }
  const policy = state.namePolicy?.rules?.[kind];
  if (policy && !options.ignoreNamePolicy && !policy.test(name)) {
    throw new Error(`Name "${name}" does not match the ${kind} naming policy.`);
  }
}

function applyNamePolicy(
  state: SchemaState,
  name: string,
  kind: GraphQLNameElement,
): string {
  if (!state.namePolicy) {
    return name;
  }
  return state.namePolicy.getName(name, kind);
}

function resolveNameInput(
  state: SchemaState,
  name: NameInput,
  kind: GraphQLNameElement,
): { name: string; ignoreNamePolicy?: boolean } {
  if (isNamekey(name)) {
    const ignoreNamePolicy = name.options.ignoreNamePolicy ?? false;
    const normalizedName =
      ignoreNamePolicy ? name.name : applyNamePolicy(state, name.name, kind);
    ensureNameValid(state, normalizedName, kind, { ignoreNamePolicy });
    return { name: normalizedName, ignoreNamePolicy };
  }

  const normalizedName = applyNamePolicy(state, name, kind);
  ensureNameValid(state, normalizedName, kind);
  return { name: normalizedName };
}

function ensureTypeNameAvailable(state: SchemaState, name: string) {
  if (state.types.has(name)) {
    throw new Error(`Type "${name}" is already defined.`);
  }
  if (builtInScalars.has(name) || builtInScalarsFallback.has(name)) {
    throw new Error(
      `Type name "${name}" conflicts with a built-in scalar type.`,
    );
  }
}

function normalizeDirectiveLocations(
  locations: (DirectiveLocation | string)[],
): DirectiveLocation[] {
  const normalized = locations.map((location) => {
    if (typeof location !== "string") {
      return location;
    }
    const key = location as keyof typeof DirectiveLocation;
    if (!(key in DirectiveLocation)) {
      throw new Error(`Unknown directive location "${location}".`);
    }
    return DirectiveLocation[key];
  });
  const seen = new Set<DirectiveLocation>();
  for (const location of normalized) {
    if (seen.has(location)) {
      throw new Error(`Directive location "${location}" cannot be repeated.`);
    }
    seen.add(location);
  }
  return normalized;
}

/**
 * Normalizes directive locations and creates a directive definition.
 */
export function normalizeDirectiveDefinition(
  state: SchemaState,
  name: NameInput,
  locations: (DirectiveLocation | string)[],
  repeatable = false,
  description?: string,
): DirectiveDefinition {
  return createDirectiveDefinition(
    state,
    name,
    normalizeDirectiveLocations(locations),
    repeatable,
    description,
  );
}
