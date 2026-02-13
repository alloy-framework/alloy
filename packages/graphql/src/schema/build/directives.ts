import {
  DirectiveLocation,
  GraphQLDirective,
  specifiedDirectives,
  type GraphQLInputType,
} from "graphql";
import type { SchemaState, TypeDefinition } from "../types.js";
import {
  buildAppliedDirectiveNodes,
  createDirectiveDefinitionNode,
  createInputValueDefinitionNode,
  createTypeDefinitionNode,
} from "./ast.js";
import { getDirectiveMap, type BuildContext } from "./context.js";
import { buildArgsMap, normalizeTypeRef } from "./types.js";

export function buildDirectiveMap(
  state: SchemaState,
  context: BuildContext,
): Map<string, GraphQLDirective> {
  const directiveMap = new Map<string, GraphQLDirective>();

  for (const directive of specifiedDirectives) {
    directiveMap.set(directive.name, directive);
  }

  for (const def of state.directives.values()) {
    const directive = new GraphQLDirective({
      name: def.name,
      description: def.description,
      isRepeatable: def.repeatable,
      locations: def.locations,
      args: buildArgsMap(state, context, def.args, { directiveMap: null }),
    });
    directiveMap.set(directive.name, directive);
  }

  return directiveMap;
}

export function attachDirectiveDefinitionAstNodes(
  state: SchemaState,
  context: BuildContext,
) {
  const directiveMap = getDirectiveMap(context);
  for (const def of state.directives.values()) {
    const directive = directiveMap.get(def.name);
    if (!directive) {
      throw new Error(`Directive "${def.name}" is not registered.`);
    }

    const argNodes = def.args.map((arg) =>
      createInputValueDefinitionNode(
        arg.name,
        normalizeTypeRef(state, context, arg.type) as GraphQLInputType,
        arg.defaultValue,
        arg.directives.length > 0 ?
          buildAppliedDirectiveNodes(
            directiveMap,
            arg.directives,
            DirectiveLocation.ARGUMENT_DEFINITION,
            `argument "${arg.name}" on directive "${def.name}"`,
          )
        : undefined,
      ),
    );

    const argNodeMap = new Map(argNodes.map((node) => [node.name.value, node]));
    for (const arg of directive.args) {
      const node = argNodeMap.get(arg.name);
      if (node) {
        arg.astNode = node;
      }
    }

    directive.astNode = createDirectiveDefinitionNode(def, argNodes);
  }
}

export function attachTypeDirectiveAstNodes(
  state: SchemaState,
  context: BuildContext,
) {
  const directiveMap = getDirectiveMap(context);
  for (const definition of state.types.values()) {
    if (definition.directives.length === 0) {
      continue;
    }

    const directives = buildAppliedDirectiveNodes(
      directiveMap,
      definition.directives,
      directiveLocationForType(definition.kind),
      `${definition.kind} type "${definition.name}"`,
    );
    const gqlType = context.namedTypes.get(definition.name);
    if (gqlType && directives.length > 0) {
      gqlType.astNode = createTypeDefinitionNode(definition, directives);
    }
  }
}

function directiveLocationForType(
  kind: TypeDefinition["kind"],
): DirectiveLocation {
  switch (kind) {
    case "object":
      return DirectiveLocation.OBJECT;
    case "interface":
      return DirectiveLocation.INTERFACE;
    case "input":
      return DirectiveLocation.INPUT_OBJECT;
    case "enum":
      return DirectiveLocation.ENUM;
    case "union":
      return DirectiveLocation.UNION;
    case "scalar":
      return DirectiveLocation.SCALAR;
    default:
      throw new Error("Unknown type definition.");
  }
}
