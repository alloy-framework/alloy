import {
  createComponent,
  createScope,
  createSymbol,
  Namekey,
  onCleanup,
  OutputScopeOptions,
  toRef,
} from "@alloy-js/core";
import { useLexicalScope, useMemberOwner } from "../utils.js";
import { useTSScope } from "./scopes.js";
import { TSLexicalScope } from "./ts-lexical-scope.js";
import { TSMemberScope } from "./ts-member-scope.js";
import { CreateTsSymbolOptions, TSOutputSymbol } from "./ts-output-symbol.js";

export * from "./reference.js";
export * from "./scopes.js";
export * from "./ts-lexical-scope.js";
export * from "./ts-member-scope.js";
export * from "./ts-module-scope.js";
export * from "./ts-output-symbol.js";
export * from "./ts-package-scope.js";

export function createTypeAndValueSymbol(
  name: string | Namekey,
  options: CreateTsSymbolOptions = {},
) {
  const scope = useLexicalScope();
  const spaces = scope ? [scope.types, scope.values] : [];
  const binder = options.binder ?? scope?.binder;
  return createSymbol(TSOutputSymbol, name, spaces, { ...options, binder });
}

export function createTypeSymbol(
  name: string | Namekey,
  options: CreateTsSymbolOptions = {},
) {
  const scope = useLexicalScope();
  if (scope && !scope.types) {
    throw new Error(
      "Attempting to create a type symbol in a scope that does not have a type declaration space.",
    );
  }
  const spaces = scope ? [scope.types] : [];
  const binder = options.binder ?? scope?.binder;
  return createSymbol(TSOutputSymbol, name, spaces, { ...options, binder });
}

export function createValueSymbol(
  name: string | Namekey,
  options: CreateTsSymbolOptions = {},
) {
  const scope = useLexicalScope();
  if (scope && !scope.values) {
    throw new Error(
      "Attempting to create a value symbol in a scope that does not have a value declaration space.",
    );
  }
  const spaces = scope ? [scope.values] : [];
  const binder = options.binder ?? scope?.binder;
  return createSymbol(TSOutputSymbol, name, spaces, { ...options, binder });
}

export function createTransientValueSymbol() {
  return createSymbol(TSOutputSymbol, "transient-value", undefined, {
    transient: true,
  });
}

export function createStaticMemberSymbol(
  name: string | Namekey,
  options: CreateTsSymbolOptions = {},
) {
  const owner = useMemberOwner();
  const binder = options.binder ?? owner.binder;
  return createSymbol(TSOutputSymbol, name, owner.staticMembers, {
    ...options,
    binder,
  });
}

export function createInstanceMemberSymbol(
  name: string | Namekey,
  options: CreateTsSymbolOptions = {},
) {
  const owner = useMemberOwner();
  const binder = options.binder ?? owner.binder;
  return createSymbol(TSOutputSymbol, name, owner.instanceMembers, {
    ...options,
    binder,
  });
}

export function createPrivateStaticMemberSymbol(
  name: string | Namekey,
  options: CreateTsSymbolOptions = {},
) {
  const owner = useMemberOwner();
  const binder = options.binder ?? owner.binder;
  return createSymbol(TSOutputSymbol, name, owner.privateStaticMembers, {
    ...options,
    binder,
  });
}

export function createPrivateInstanceMemberSymbol(
  name: string | Namekey,
  options: CreateTsSymbolOptions = {},
) {
  const owner = useMemberOwner();
  const binder = options.binder ?? owner.binder;
  return createSymbol(TSOutputSymbol, name, owner.privateInstanceMembers, {
    ...options,
    binder,
  });
}

export function createMemberSymbol(
  name: string | Namekey,
  locationOptions: { jsPrivate?: boolean; static?: boolean },
  options: CreateTsSymbolOptions = {},
) {
  if (locationOptions.jsPrivate) {
    if (locationOptions.static) {
      return createPrivateStaticMemberSymbol(name, options);
    } else {
      return createPrivateInstanceMemberSymbol(name, options);
    }
  } else {
    if (locationOptions.static) {
      return createStaticMemberSymbol(name, options);
    } else {
      return createInstanceMemberSymbol(name, options);
    }
  }
}

export function createLexicalScope(
  name: string,
  options: OutputScopeOptions = {},
) {
  const parent = useTSScope();

  const binder = options.binder ?? parent?.binder;
  return createScope(TSLexicalScope, name, parent, { ...options, binder });
}

export function createMemberScope(
  name: string,
  ownerSymbol: TSOutputSymbol,
  options: OutputScopeOptions = {},
) {
  const parent = useTSScope();
  const binder = options.binder ?? parent?.binder ?? ownerSymbol.binder;
  return createScope(TSMemberScope, name, parent, ownerSymbol, {
    ...options,
    binder,
  });
}

export function decl(namekey: Namekey, options?: CreateTsSymbolOptions) {
  return createComponent(() => {
    const symbol = createValueSymbol(namekey, options);

    onCleanup(() => {
      symbol.delete();
    });

    return toRef(symbol, "name");
  }, {});
}

export function declType(namekey: Namekey, options?: CreateTsSymbolOptions) {
  return createComponent(() => {
    const symbol = createTypeSymbol(namekey, options);

    onCleanup(() => {
      symbol.delete();
    });

    return toRef(symbol, "name");
  }, {});
}

export function declMember(
  namekey: Namekey,
  locationOptions: { jsPrivate?: boolean; static?: boolean } = {},
  options?: CreateTsSymbolOptions,
) {
  // Create the symbol inside a component so that we only get these side
  // effects when this function is rendered (and not from something like
  // children()/childrenArray() invoking the memo) and we get cleanup logic.
  return createComponent(() => {
    const symbol = createMemberSymbol(namekey, locationOptions, options);

    onCleanup(() => {
      symbol.delete();
    });

    return toRef(symbol, "name");
  }, {});
}
