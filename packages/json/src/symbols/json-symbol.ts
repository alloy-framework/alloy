import {
  CreateSymbolOptions,
  OutputScope,
  OutputSymbol,
  OutputSymbolFlags,
  useBinder,
  useMemberScope,
} from "@alloy-js/core";

// prettier-ignore
export enum JsonSymbolFlags {
  None = 0,
  Object = 1 << 0,
  Array = 1 << 1,
}

/**
 * JsonOutputSymbol is created for JSON Values with a refkey. For JSON objects
 * and arrays, the symbol will have the `StaticMemberContainer` flag. For JSON
 * values that are members of an object or an array, the symbol will have the
 * `StaticMember` flag.
 */
export interface JsonOutputSymbol extends OutputSymbol {
  scope: OutputScope;
  jsonFlags: JsonSymbolFlags;
}

export interface createJsonSymbolOptions extends CreateSymbolOptions {
  jsonFlags?: JsonSymbolFlags;
}

export function createJsonOutputSymbol(
  options: createJsonSymbolOptions,
): JsonOutputSymbol {
  const scope =
    options.scope ??
    (useDefaultScope(options.flags) as OutputScope) ??
    useBinder().globalScope;

  const binder = scope.binder;
  const sym = binder.createSymbol<JsonOutputSymbol>({
    name: options.name,
    scope,
    refkey: options.refkey,
    flags: options.flags ?? OutputSymbolFlags.None,
    jsonFlags: options.jsonFlags ?? JsonSymbolFlags.None,
  });

  return sym;
}

export function useDefaultScope(
  flags: OutputSymbolFlags = OutputSymbolFlags.None,
) {
  if ((flags & OutputSymbolFlags.Member) === 0) {
    return useBinder().globalScope;
  } else {
    const memberScope = useMemberScope();
    if (!memberScope) {
      throw new Error("Cannot declare member symbols without a member scope");
    }
    if (flags & OutputSymbolFlags.InstanceMember) {
      return memberScope.instanceMembers;
    } else {
      return memberScope.staticMembers;
    }
  }
}
