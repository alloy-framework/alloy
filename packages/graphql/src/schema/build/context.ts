import type { GraphQLDirective, GraphQLNamedType } from "graphql";

export interface BuildContext {
  namedTypes: Map<string, GraphQLNamedType>;
  directiveMap?: Map<string, GraphQLDirective>;
}

export function getDirectiveMap(
  context: BuildContext,
): Map<string, GraphQLDirective> {
  if (!context.directiveMap) {
    throw new Error("Directive map is not initialized.");
  }
  return context.directiveMap;
}
