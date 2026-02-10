import { isNamekey } from "@alloy-js/core";
import {
  DirectiveLocation,
  GraphQLEnumType,
  GraphQLInputObjectType,
  GraphQLInterfaceType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLUnionType,
  isInputType,
  isNamedType,
  isObjectType,
  isOutputType,
  isType,
  type EnumValueDefinitionNode,
  type GraphQLArgumentConfig,
  type GraphQLDirective,
  type GraphQLField,
  type GraphQLFieldConfig,
  type GraphQLInputFieldConfig,
  type GraphQLInputType,
  type GraphQLNamedType,
  type GraphQLOutputType,
  type GraphQLType,
} from "graphql";
import { builtInScalars, builtInScalarsFallback } from "../constants.js";
import { isTypeRef, normalizeTypeName } from "../refs.js";
import type {
  ArgDefinition,
  EnumTypeDefinition,
  EnumValueDefinition,
  FieldDefinition,
  InputObjectTypeDefinition,
  InterfaceTypeDefinition,
  ObjectTypeDefinition,
  SchemaState,
  TypeDefinition,
  TypeReference,
  UnionTypeDefinition,
} from "../types.js";
import {
  buildAppliedDirectiveNodes,
  createEnumValueDefinitionNode,
  createFieldDefinitionNode,
  createInputValueDefinitionNode,
} from "./ast.js";
import { getDirectiveMap, type BuildContext } from "./context.js";

interface ArgumentBuildOptions {
  ownerLabel?: string;
  directiveMap?: Map<string, GraphQLDirective> | null;
}

export function normalizeTypeRef(
  state: SchemaState,
  context: BuildContext,
  type: TypeReference,
): GraphQLType {
  if (isType(type)) {
    return type;
  }

  if (isTypeRef(type)) {
    switch (type.kind) {
      case "named":
        return normalizeNamedType(state, context, type.name);
      case "list":
        return new GraphQLList(normalizeTypeRef(state, context, type.ofType));
      case "nonNull": {
        const inner = normalizeTypeRef(state, context, type.ofType);
        if (inner instanceof GraphQLNonNull) {
          throw new Error("Non-Null cannot wrap a Non-Null type.");
        }
        return new GraphQLNonNull(inner);
      }
    }
  }

  if (typeof type === "string" || isNamekey(type)) {
    return normalizeNamedType(state, context, type);
  }

  throw new Error("Unable to resolve type reference.");
}

export function resolveNamedType(
  state: SchemaState,
  context: BuildContext,
  name: string,
): GraphQLNamedType {
  const builtIn = builtInScalars.get(name) ?? builtInScalarsFallback.get(name);
  if (builtIn) {
    return builtIn;
  }

  const definition = state.types.get(name);
  if (!definition) {
    throw new Error(`Unknown GraphQL type "${name}".`);
  }

  if (!context.namedTypes.has(name)) {
    context.namedTypes.set(name, createGraphQLType(state, context, definition));
  }

  return context.namedTypes.get(name)!;
}

export function buildArgsMap(
  state: SchemaState,
  context: BuildContext,
  args: ArgDefinition[],
  options?: ArgumentBuildOptions,
): Record<string, GraphQLArgumentConfig> {
  const directiveMap = options?.directiveMap ?? context.directiveMap;
  return Object.fromEntries(
    args.map((arg) => {
      const type = normalizeTypeRef(state, context, arg.type);
      if (!isInputType(type)) {
        throw new Error(`InputValue "${arg.name}" must be an input type.`);
      }

      const directives =
        directiveMap && arg.directives.length > 0 ?
          buildAppliedDirectiveNodes(
            directiveMap,
            arg.directives,
            DirectiveLocation.ARGUMENT_DEFINITION,
            options?.ownerLabel ?
              `argument "${arg.name}" on ${options.ownerLabel}`
            : `argument "${arg.name}"`,
          )
        : undefined;
      const astNode =
        directives && directives.length > 0 ?
          createInputValueDefinitionNode(
            arg.name,
            type,
            arg.defaultValue,
            directives,
          )
        : undefined;

      return [
        arg.name,
        {
          type: type as GraphQLInputType,
          description: arg.description,
          defaultValue: arg.defaultValue,
          deprecationReason: arg.deprecationReason,
          astNode,
        },
      ];
    }),
  );
}

function normalizeNamedType(
  state: SchemaState,
  context: BuildContext,
  type: TypeReference,
): GraphQLNamedType {
  if (isType(type) && isNamedType(type)) {
    return type;
  }

  if (typeof type === "string") {
    return resolveNamedType(state, context, normalizeTypeName(state, type));
  }

  if (isNamekey(type)) {
    const name =
      type.options.ignoreNamePolicy ?
        type.name
      : normalizeTypeName(state, type.name);
    return resolveNamedType(state, context, name);
  }

  if (isTypeRef(type) && type.kind === "named") {
    return normalizeNamedType(state, context, type.name);
  }

  throw new Error("Expected a named GraphQL type.");
}

function resolveInterfaces(
  state: SchemaState,
  context: BuildContext,
  ownerName: string,
  interfaces: TypeReference[],
): GraphQLInterfaceType[] {
  const resolvedInterfaces: GraphQLInterfaceType[] = [];
  const seen = new Set<string>();

  const addInterface = (typeRef: TypeReference) => {
    const resolved = normalizeNamedType(state, context, typeRef);
    if (!(resolved instanceof GraphQLInterfaceType)) {
      throw new Error(
        `Interface "${ownerName}" references non-interface type "${resolved.name}".`,
      );
    }
    if (seen.has(resolved.name)) {
      return;
    }
    seen.add(resolved.name);
    resolvedInterfaces.push(resolved);

    const definition = state.types.get(resolved.name);
    if (definition?.kind === "interface") {
      for (const iface of definition.interfaces) {
        addInterface(iface);
      }
    }
  };

  for (const iface of interfaces) {
    addInterface(iface);
  }

  return resolvedInterfaces;
}

function createGraphQLType(
  state: SchemaState,
  context: BuildContext,
  definition: TypeDefinition,
): GraphQLNamedType {
  switch (definition.kind) {
    case "object":
      return new GraphQLObjectType({
        name: definition.name,
        description: definition.description,
        fields: () => buildFieldMap(state, context, definition),
        interfaces: () =>
          resolveInterfaces(
            state,
            context,
            definition.name,
            definition.interfaces,
          ),
      });
    case "interface":
      return new GraphQLInterfaceType({
        name: definition.name,
        description: definition.description,
        fields: () => buildFieldMap(state, context, definition),
        interfaces: () =>
          resolveInterfaces(
            state,
            context,
            definition.name,
            definition.interfaces,
          ),
      });
    case "input":
      return new GraphQLInputObjectType({
        name: definition.name,
        description: definition.description,
        fields: () => buildInputFieldMap(state, context, definition),
        isOneOf: definition.isOneOf,
      });
    case "enum":
      return new GraphQLEnumType({
        name: definition.name,
        description: definition.description,
        values: buildEnumValueMap(state, definition, context),
      });
    case "union":
      return new GraphQLUnionType({
        name: definition.name,
        description: definition.description,
        types: () => buildUnionMembers(state, context, definition),
      });
    case "scalar":
      return new GraphQLScalarType({
        name: definition.name,
        description: definition.description,
        serialize: definition.serialize,
        parseValue: definition.parseValue,
        parseLiteral: definition.parseLiteral,
        specifiedByURL: definition.specifiedByUrl,
      });
    default:
      throw new Error("Unknown type definition.");
  }
}

function buildFieldMap(
  state: SchemaState,
  context: BuildContext,
  definition: ObjectTypeDefinition | InterfaceTypeDefinition,
): Record<string, GraphQLFieldConfig<unknown, unknown>> {
  const fields = new Map<string, GraphQLFieldConfig<unknown, unknown>>();

  const interfaceFields = collectInterfaceFieldConfigs(
    state,
    context,
    definition,
    new Set(),
  );
  for (const [name, config] of interfaceFields) {
    fields.set(name, config);
  }

  const ownFields = buildFieldConfigsFromDefinitions(
    state,
    context,
    definition,
    definition.fields,
  );
  for (const [name, config] of ownFields) {
    fields.set(name, config);
  }

  if (fields.size === 0) {
    throw new Error(`Type "${definition.name}" must define fields.`);
  }

  return Object.fromEntries(fields);
}

function collectInterfaceFieldConfigs(
  state: SchemaState,
  context: BuildContext,
  definition: ObjectTypeDefinition | InterfaceTypeDefinition,
  visited: Set<string>,
): Map<string, GraphQLFieldConfig<unknown, unknown>> {
  const fields = new Map<string, GraphQLFieldConfig<unknown, unknown>>();

  for (const iface of definition.interfaces) {
    const resolved = normalizeNamedType(state, context, iface);
    if (!(resolved instanceof GraphQLInterfaceType)) {
      throw new Error(
        `Interface "${definition.name}" references non-interface type "${resolved.name}".`,
      );
    }

    if (visited.has(resolved.name)) {
      continue;
    }
    visited.add(resolved.name);

    const ifaceDefinition = state.types.get(resolved.name);
    if (ifaceDefinition && ifaceDefinition.kind === "interface") {
      const inherited = collectInterfaceFieldConfigs(
        state,
        context,
        ifaceDefinition,
        visited,
      );
      for (const [name, config] of inherited) {
        if (!fields.has(name)) {
          fields.set(name, config);
        }
      }

      const own = buildFieldConfigsFromDefinitions(
        state,
        context,
        ifaceDefinition,
        ifaceDefinition.fields,
      );
      for (const [name, config] of own) {
        if (!fields.has(name)) {
          fields.set(name, config);
        }
      }
    } else {
      const external = buildFieldConfigsFromGraphQLInterface(resolved);
      for (const [name, config] of external) {
        if (!fields.has(name)) {
          fields.set(name, config);
        }
      }
    }
  }

  return fields;
}

function buildFieldConfigsFromDefinitions(
  state: SchemaState,
  context: BuildContext,
  definition: ObjectTypeDefinition | InterfaceTypeDefinition,
  fields: FieldDefinition[],
): Map<string, GraphQLFieldConfig<unknown, unknown>> {
  const entries = new Map<string, GraphQLFieldConfig<unknown, unknown>>();

  for (const field of fields) {
    const type = normalizeTypeRef(state, context, field.type);
    if (!isOutputType(type)) {
      throw new Error(
        `Field "${field.name}" on "${definition.name}" must be an output type.`,
      );
    }
    const args = buildArgsMap(state, context, field.args, {
      ownerLabel: `field "${definition.name}.${field.name}"`,
    });
    const directives = buildAppliedDirectiveNodes(
      getDirectiveMap(context),
      field.directives,
      DirectiveLocation.FIELD_DEFINITION,
      `field "${definition.name}.${field.name}"`,
    );
    const astNode =
      directives && directives.length > 0 ?
        createFieldDefinitionNode(field.name, type, directives)
      : undefined;
    entries.set(field.name, {
      type: type as GraphQLOutputType,
      description: field.description,
      deprecationReason: field.deprecationReason,
      args,
      astNode,
    });
  }

  return entries;
}

function buildFieldConfigsFromGraphQLInterface(
  iface: GraphQLInterfaceType,
): Map<string, GraphQLFieldConfig<unknown, unknown>> {
  const entries = new Map<string, GraphQLFieldConfig<unknown, unknown>>();
  const fields = iface.getFields();
  for (const field of Object.values(fields) as GraphQLField<
    unknown,
    unknown
  >[]) {
    const args = Object.fromEntries(
      field.args.map((arg) => [
        arg.name,
        {
          type: arg.type,
          description: arg.description,
          defaultValue: arg.defaultValue,
          deprecationReason: arg.deprecationReason,
          astNode: arg.astNode ?? undefined,
        },
      ]),
    );
    entries.set(field.name, {
      type: field.type,
      description: field.description,
      deprecationReason: field.deprecationReason,
      args,
      astNode: field.astNode ?? undefined,
    });
  }

  return entries;
}

function buildInputFieldMap(
  state: SchemaState,
  context: BuildContext,
  definition: InputObjectTypeDefinition,
): Record<string, GraphQLInputFieldConfig> {
  const entries: [string, GraphQLInputFieldConfig][] = [];
  for (const field of definition.fields) {
    const type = normalizeTypeRef(state, context, field.type);
    if (!isInputType(type)) {
      throw new Error(
        `Input field "${field.name}" on "${definition.name}" must be an input type.`,
      );
    }
    const directives = buildAppliedDirectiveNodes(
      getDirectiveMap(context),
      field.directives,
      DirectiveLocation.INPUT_FIELD_DEFINITION,
      `input field "${definition.name}.${field.name}"`,
    );
    const astNode =
      directives && directives.length > 0 ?
        createInputValueDefinitionNode(
          field.name,
          type,
          field.defaultValue,
          directives,
        )
      : undefined;
    entries.push([
      field.name,
      {
        type: type as GraphQLInputType,
        description: field.description,
        defaultValue: field.defaultValue,
        deprecationReason: field.deprecationReason,
        astNode,
      },
    ]);
  }

  return Object.fromEntries(entries);
}

function buildEnumValueMap(
  state: SchemaState,
  definition: EnumTypeDefinition,
  context: BuildContext,
): Record<string, { description?: string; deprecationReason?: string }> {
  return Object.fromEntries(
    definition.values.map((value) => [
      value.name,
      buildEnumValueConfig(state, value, definition, context),
    ]),
  );
}

function buildUnionMembers(
  state: SchemaState,
  context: BuildContext,
  definition: UnionTypeDefinition,
): GraphQLObjectType[] {
  return definition.members.map((member) => {
    const type = normalizeTypeRef(state, context, member.type);
    if (!isObjectType(type)) {
      const name = isNamedType(type) ? type.name : "(unknown)";
      throw new Error(
        `Union "${definition.name}" member "${name}" must be an object type.`,
      );
    }
    return type;
  });
}

function buildEnumValueConfig(
  state: SchemaState,
  value: EnumValueDefinition,
  definition: EnumTypeDefinition,
  context: BuildContext,
): {
  description?: string;
  deprecationReason?: string;
  astNode?: EnumValueDefinitionNode;
} {
  const directives =
    value.directives.length > 0 ?
      buildAppliedDirectiveNodes(
        getDirectiveMap(context),
        value.directives,
        DirectiveLocation.ENUM_VALUE,
        `enum value "${definition.name}.${value.name}"`,
      )
    : [];
  const astNode =
    directives.length > 0 ?
      createEnumValueDefinitionNode(value.name, directives)
    : undefined;
  return {
    description: value.description,
    deprecationReason: value.deprecationReason,
    astNode,
  };
}
