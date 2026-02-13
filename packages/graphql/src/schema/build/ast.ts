import {
  GraphQLList,
  GraphQLNonNull,
  Kind,
  astFromValue,
  isRequiredArgument,
  type ConstArgumentNode,
  type ConstDirectiveNode,
  type DirectiveDefinitionNode,
  type DirectiveLocation,
  type EnumValueDefinitionNode,
  type FieldDefinitionNode,
  type GraphQLDirective,
  type GraphQLInputType,
  type GraphQLOutputType,
  type GraphQLType,
  type InputValueDefinitionNode,
  type NameNode,
  type NamedTypeNode,
  type OperationTypeDefinitionNode,
  type SchemaDefinitionNode,
  type TypeDefinitionNode,
  type TypeNode,
} from "graphql";
import type {
  AppliedDirective,
  DirectiveDefinition,
  TypeDefinition,
} from "../types.js";

export function buildAppliedDirectiveNodes(
  directiveMap: Map<string, GraphQLDirective>,
  applied: AppliedDirective[],
  location: DirectiveLocation,
  ownerLabel: string,
): ConstDirectiveNode[] {
  if (applied.length === 0) {
    return [];
  }

  const nodes: ConstDirectiveNode[] = [];
  const usageCounts = new Map<string, number>();
  for (const application of applied) {
    const directiveName = application.name;
    const directive = directiveMap.get(directiveName);
    if (!directive) {
      throw new Error(
        `Directive "@${directiveName}" is not defined for ${ownerLabel}.`,
      );
    }

    if (!directive.locations.includes(location)) {
      throw new Error(
        `Directive "@${directiveName}" cannot be applied to ${ownerLabel}.`,
      );
    }

    const count = (usageCounts.get(directiveName) ?? 0) + 1;
    usageCounts.set(directiveName, count);
    if (!directive.isRepeatable && count > 1) {
      throw new Error(
        `Directive "@${directiveName}" cannot be repeated on ${ownerLabel}.`,
      );
    }

    const argMap = new Map(directive.args.map((arg) => [arg.name, arg]));
    const providedArgs = new Set<string>();
    const argNodes = application.args.map((arg) => {
      const argDef = argMap.get(arg.name);
      if (!argDef) {
        throw new Error(
          `Unknown argument "${arg.name}" for directive "@${directiveName}" on ${ownerLabel}.`,
        );
      }

      providedArgs.add(arg.name);
      const valueNode = astFromValue(arg.value, argDef.type);
      if (!valueNode) {
        throw new Error(
          `Directive "@${directiveName}" argument "${arg.name}" on ${ownerLabel} could not be coerced to ${String(
            argDef.type,
          )}.`,
        );
      }

      return {
        kind: Kind.ARGUMENT,
        name: createNameNode(arg.name),
        value: valueNode,
      } satisfies ConstArgumentNode;
    });

    for (const arg of directive.args) {
      if (isRequiredArgument(arg) && !providedArgs.has(arg.name)) {
        throw new Error(
          `Directive "@${directiveName}" on ${ownerLabel} is missing required argument "${arg.name}".`,
        );
      }
    }

    nodes.push({
      kind: Kind.DIRECTIVE,
      name: createNameNode(directiveName),
      arguments: argNodes.length > 0 ? argNodes : undefined,
    });
  }

  return nodes;
}

export function createSchemaDefinitionNode(
  directives: ConstDirectiveNode[],
  roots: {
    query: { name: string };
    mutation?: { name: string } | undefined;
    subscription?: { name: string } | undefined;
  },
): SchemaDefinitionNode {
  const operationTypes: OperationTypeDefinitionNode[] = [
    {
      kind: Kind.OPERATION_TYPE_DEFINITION,
      operation: "query",
      type: createNamedTypeNode(roots.query.name),
    },
  ];
  if (roots.mutation) {
    operationTypes.push({
      kind: Kind.OPERATION_TYPE_DEFINITION,
      operation: "mutation",
      type: createNamedTypeNode(roots.mutation.name),
    });
  }
  if (roots.subscription) {
    operationTypes.push({
      kind: Kind.OPERATION_TYPE_DEFINITION,
      operation: "subscription",
      type: createNamedTypeNode(roots.subscription.name),
    });
  }

  return {
    kind: Kind.SCHEMA_DEFINITION,
    directives: directives.length > 0 ? directives : undefined,
    operationTypes,
  };
}

export function createDirectiveDefinitionNode(
  definition: DirectiveDefinition,
  args: InputValueDefinitionNode[],
): DirectiveDefinitionNode {
  return {
    kind: Kind.DIRECTIVE_DEFINITION,
    name: createNameNode(definition.name),
    repeatable: definition.repeatable,
    locations: definition.locations.map((location) => createNameNode(location)),
    arguments: args.length > 0 ? args : undefined,
  };
}

export function createFieldDefinitionNode(
  name: string,
  type: GraphQLOutputType,
  directives: ConstDirectiveNode[],
): FieldDefinitionNode {
  return {
    kind: Kind.FIELD_DEFINITION,
    name: createNameNode(name),
    type: createTypeNode(type),
    directives: directives.length > 0 ? directives : undefined,
  };
}

export function createInputValueDefinitionNode(
  name: string,
  type: GraphQLInputType,
  defaultValue: unknown | undefined,
  directives: ConstDirectiveNode[] | undefined,
): InputValueDefinitionNode {
  const defaultValueNode =
    defaultValue === undefined ? undefined : (
      (astFromValue(defaultValue, type) ?? undefined)
    );
  if (defaultValue !== undefined && defaultValueNode === undefined) {
    throw new Error(
      `Default value for "${name}" could not be coerced to ${String(type)}.`,
    );
  }

  return {
    kind: Kind.INPUT_VALUE_DEFINITION,
    name: createNameNode(name),
    type: createTypeNode(type),
    defaultValue: defaultValueNode,
    directives: directives && directives.length > 0 ? directives : undefined,
  };
}

export function createEnumValueDefinitionNode(
  name: string,
  directives: ConstDirectiveNode[],
): EnumValueDefinitionNode {
  return {
    kind: Kind.ENUM_VALUE_DEFINITION,
    name: createNameNode(name),
    directives: directives.length > 0 ? directives : undefined,
  };
}

export function createTypeDefinitionNode(
  definition: TypeDefinition,
  directives: ConstDirectiveNode[],
): TypeDefinitionNode {
  switch (definition.kind) {
    case "object":
      return {
        kind: Kind.OBJECT_TYPE_DEFINITION,
        name: createNameNode(definition.name),
        directives: directives.length > 0 ? directives : undefined,
      };
    case "interface":
      return {
        kind: Kind.INTERFACE_TYPE_DEFINITION,
        name: createNameNode(definition.name),
        directives: directives.length > 0 ? directives : undefined,
      };
    case "input":
      return {
        kind: Kind.INPUT_OBJECT_TYPE_DEFINITION,
        name: createNameNode(definition.name),
        directives: directives.length > 0 ? directives : undefined,
      };
    case "enum":
      return {
        kind: Kind.ENUM_TYPE_DEFINITION,
        name: createNameNode(definition.name),
        directives: directives.length > 0 ? directives : undefined,
      };
    case "union":
      return {
        kind: Kind.UNION_TYPE_DEFINITION,
        name: createNameNode(definition.name),
        directives: directives.length > 0 ? directives : undefined,
      };
    case "scalar":
      return {
        kind: Kind.SCALAR_TYPE_DEFINITION,
        name: createNameNode(definition.name),
        directives: directives.length > 0 ? directives : undefined,
      };
    default:
      throw new Error("Unknown type definition.");
  }
}

function createNameNode(value: string): NameNode {
  return { kind: Kind.NAME, value };
}

function createNamedTypeNode(name: string): NamedTypeNode {
  return { kind: Kind.NAMED_TYPE, name: createNameNode(name) };
}

function createTypeNode(type: GraphQLType): TypeNode {
  if (type instanceof GraphQLNonNull) {
    const inner = createTypeNode(type.ofType);
    if (inner.kind === Kind.NON_NULL_TYPE) {
      throw new Error("Non-Null cannot wrap a Non-Null type.");
    }
    return { kind: Kind.NON_NULL_TYPE, type: inner };
  }
  if (type instanceof GraphQLList) {
    return { kind: Kind.LIST_TYPE, type: createTypeNode(type.ofType) };
  }
  return { kind: Kind.NAMED_TYPE, name: createNameNode(type.name) };
}
