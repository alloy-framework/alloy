import { computed, ref, Ref, ShallowRef, shallowRef } from "@vue/reactivity";
import { useMemberScope } from "./context/member-scope.js";
import { useScope } from "./context/scope.js";
import { effect, untrack } from "./reactivity.js";
import { refkey, Refkey } from "./refkey.js";
import { OutputSymbolFlags } from "./symbols/flags.js";
import { OutputScope } from "./symbols/output-scope.js";
import { type OutputSymbol } from "./symbols/output-symbol.js";
import {
  formatRefkeys,
  formatSymbol,
  formatSymbolName,
  trace,
  TracePhase,
} from "./tracer.js";
export type Metadata = object;

/**
 * The binder tracks all output scopes and symbols. Scopes are nested containers
 * for symbols.
 *
 * @remarks
 *
 * Symbol information is reactive because in certain situations this data may
 * change. For example, when a symbol becomes conflicted with another symbol,
 * one of the symbol names may change. Ensure that you interact with binder
 * values in a reactive context (i.e. within JSX/code template, or within
 * memo/computed/etc).
 *
 */
export interface Binder {
  /**
   * Resolve the given refkey in the current scope.
   *
   * @returns a ref for the resolution result.
   * @see {@link resolve} a convenience function that uses the current scope and
   * binder.
   */
  resolveDeclarationByKey<
    TScope extends OutputScope = OutputScope,
    TSymbol extends OutputSymbol = OutputSymbol,
  >(
    currentScope: TScope | undefined,
    currentMemberScope: TScope | undefined,
    key: Refkey,
  ): Ref<ResolutionResult<TScope, TSymbol> | undefined>;

  getSymbolForRefkey<TSymbol extends OutputSymbol>(
    refkey: Refkey,
  ): Ref<TSymbol | undefined>;

  /**
   * Find a symbol with a given name in the given scope. Returns a ref
   * for the symbol, such that when the symbol is available, the ref value
   * will update.
   */
  findSymbolName<
    TScope extends OutputScope = OutputScope,
    TSymbol extends OutputSymbol = OutputSymbol,
  >(
    currentScope: TScope | undefined,
    name: string,
  ): Ref<TSymbol | undefined>;

  findScopeName<TScope extends OutputScope = OutputScope>(
    currentScope: TScope | undefined,
    name: string,
  ): Ref<TScope | undefined>;

  /**
   * Resolve a fully qualified name to a symbol. Access a nested scope by name
   * with `::`, a nested static member with `.` and a nested instance member
   * with `#`.
   *
   * Per-language packages may provide their own resolveFQN function that uses
   * syntax more natural to that  language.
   */
  resolveFQN<
    TScope extends OutputScope = OutputScope,
    TSymbol extends OutputSymbol = OutputSymbol,
  >(
    fqn: string,
  ): Ref<TSymbol | TScope | undefined>;

  /**
   * The global scope. This is the root scope for all symbols.
   */
  globalScope: OutputScope;

  /**
   * The name conflict resolver to use for this binder.
   */
  nameConflictResolver?: NameConflictResolver;

  /**
   * Notifies the binder that a scope has been created.
   */
  notifyScopeCreated(scope: OutputScope): void;

  /**
   * Notifies the binder that a symbol has been created.
   */
  notifySymbolCreated(symbol: OutputSymbol): void;

  /**
   * Notifies the binder that a symbol has been deleted.
   */
  notifySymbolDeleted(symbol: OutputSymbol): void;
}

/**
 * A successful resolution of a refkey.
 *
 * @example
 *
 * Let's say we have the following scopes and symbols:
 *
 * ```
 * scope: global scope
 * ├── scope: namespace scope 1
 * │   └── symbol: foo
 * │       └── static member scope
 * │           └── symbol: bar
 * └── scope: namespace scope 2
 *    └── (resolve bar from here)
 * ```
 *
 * When we resolve the refkey for `bar` from within `namespace scope 2`, we will get the following
 * resolution result:
 *
 * * **targetDeclaration**: symbol bar, the symbol we resolved.
 * * **commonScope**: global scope, because this is the most specific scope that contains both the declaration and the reference.
 * * **pathUp**: [namespace scope 2], because this is the scope between the reference and the common scope.
 * * **pathDown**: [namespace scope 1], because this is the scope between the common scope and the declaration
 * * **memberPath**: [foo, bar], because we resolved a member symbol and these are the symbols that lead from the base declaration to the member symbol.
 */
export interface ResolutionResult<
  TScope extends OutputScope,
  TSymbol extends OutputSymbol,
> {
  /**
   * The symbol for the resolved declaration.
   */
  targetDeclaration: TSymbol;
  /**
   * The scopes between the common scope and the reference
   */
  pathUp: TScope[];

  /**
   * The scopes between the common scope and the declaration.
   */
  pathDown: TScope[];

  /**
   * The scope which contains both the reference and the declaration.
   */
  commonScope: TScope | undefined;

  /**
   * When resolving a member symbol, this is the path of symbols that lead from
   * the base declaration to the member symbol.
   */
  memberPath?: TSymbol[];
}

export interface NameConflictResolver {
  (name: string, symbols: OutputSymbol[]): void;
}

export interface BinderOptions {
  nameConflictResolver?: NameConflictResolver;
}

export function createOutputBinder(options: BinderOptions = {}): Binder {
  const binder: Binder = {
    resolveDeclarationByKey,
    getSymbolForRefkey,
    findSymbolName,
    findScopeName,
    resolveFQN: resolveFQN as any,
    globalScope: undefined as any,
    notifyScopeCreated,
    notifySymbolCreated,
    notifySymbolDeleted,
    nameConflictResolver: options.nameConflictResolver,
  };

  binder.globalScope = new OutputScope("<global>", {
    binder,
    kind: "global",
  });

  const knownDeclarations = new Map<Refkey, OutputSymbol>();
  const waitingDeclarations = new Map<Refkey, Ref<OutputSymbol | undefined>>();
  const waitingSymbolNames = new Map<
    OutputScope,
    Map<string, Ref<OutputSymbol | undefined>>
  >();
  const waitingScopeNames = new Map<
    OutputScope,
    Map<string, Ref<OutputScope | undefined>>
  >();

  return binder;

  function notifyScopeCreated(scope: OutputScope) {
    if (!scope.parent || !waitingScopeNames.has(scope.parent)) {
      return;
    }

    const waiting = waitingScopeNames.get(scope.parent)!;
    if (waiting?.has(scope.name)) {
      const ref = waiting.get(scope.name)!;
      ref.value = scope;
    }
  }

  function notifySymbolDeleted(symbol: OutputSymbol) {
    if (!refkey) {
      return;
    }

    for (const refkey of symbol.refkeys) {
      const resolution = waitingDeclarations.get(refkey);
      if (!resolution) return;
      resolution.value = undefined;
    }
  }

  function hasTransientScope(symbol: OutputSymbol) {
    let sym: OutputSymbol | undefined = symbol;
    let transient = false;
    while (sym) {
      if (sym.flags & OutputSymbolFlags.Transient) {
        transient = true;
        break;
      }
      if (sym.flags & ~OutputSymbolFlags.Member) {
        break;
      }

      sym = sym.scope.owner;
    }

    return transient;
  }
  function buildResult<
    TScope extends OutputScope = OutputScope,
    TSymbol extends OutputSymbol = OutputSymbol,
  >(
    currentScope: TScope | undefined,
    currentMemberScope: TScope | undefined,
    targetDeclarationBase: TSymbol,
  ): ResolutionResult<TScope, TSymbol> {
    trace(TracePhase.resolve.success, () => {
      return `Resolved ${formatRefkeys(targetDeclarationBase.refkeys)} to ${formatSymbol(targetDeclarationBase)}`;
    });
    if (targetDeclarationBase.flags & OutputSymbolFlags.InstanceMember) {
      // todo: handle referencing nested objects by refkey
      return {
        pathUp: [],
        pathDown: [],
        memberPath: [targetDeclarationBase],
        commonScope: currentMemberScope,
        targetDeclaration: targetDeclarationBase,
      };
    }

    const { memberPath, scopeChain: targetChain } = scopeAndMemberChain<
      TScope,
      TSymbol
    >(targetDeclarationBase);
    const currentChain = scopeChain(currentScope);
    let diffStart = 0;
    while (
      targetChain[diffStart] &&
      currentChain[diffStart] &&
      targetChain[diffStart] === currentChain[diffStart]
    ) {
      diffStart++;
    }

    const pathUp = currentChain.slice(diffStart);
    const pathDown = targetChain.slice(diffStart);
    const commonScope = targetChain[diffStart - 1] ?? null;

    return {
      pathUp,
      pathDown,
      memberPath,
      commonScope,
      targetDeclaration:
        memberPath && memberPath.length > 0 ?
          memberPath.at(0)!
        : targetDeclarationBase,
    };
  }

  function scopeAndMemberChain<
    TScope extends OutputScope,
    TSymbol extends OutputSymbol,
  >(symbol: TSymbol) {
    const result = {
      memberPath: [] as TSymbol[],
      scopeChain: [] as TScope[],
    };

    let currentSymbol = symbol;
    while (currentSymbol.flags & OutputSymbolFlags.StaticMember) {
      result.memberPath.unshift(currentSymbol);
      currentSymbol = currentSymbol.scope.owner! as TSymbol;
    }

    if (symbol.flags & OutputSymbolFlags.StaticMember) {
      result.memberPath.unshift(currentSymbol);
    }

    const startScope = currentSymbol.scope as TScope;
    result.scopeChain = scopeChain(startScope);

    return result;
  }

  function scopeChain<TScope extends OutputScope>(scope: TScope | undefined) {
    const chain = [];
    while (scope) {
      chain.unshift(scope);
      scope = scope.parent as TScope;
    }

    return chain;
  }

  function getSymbolForRefkey<TSymbol extends OutputSymbol = OutputSymbol>(
    refkey: Refkey,
  ) {
    if (waitingDeclarations.has(refkey)) {
      return waitingDeclarations.get(refkey)! as ShallowRef<TSymbol>;
    }

    const symbolRef = shallowRef<TSymbol | undefined>();
    waitingDeclarations.set(refkey, symbolRef);
    if (knownDeclarations.has(refkey)) {
      symbolRef.value = knownDeclarations.get(refkey) as TSymbol;
    }
    return symbolRef;
  }

  function resolveDeclarationByKey<
    TScope extends OutputScope = OutputScope,
    TSymbol extends OutputSymbol = OutputSymbol,
  >(
    currentScope: TScope | undefined,
    currentMemberScope: TScope | undefined,
    refkey: Refkey,
  ): ShallowRef<ResolutionResult<TScope, TSymbol> | undefined> {
    const resolvedSymbol = getSymbolForRefkey(refkey);
    return computed(() => {
      trace(
        TracePhase.resolve.pending,
        () => `Resolving ${formatRefkeys(refkey)}.`,
      );
      const symbol = resolvedSymbol.value as TSymbol;
      if (!symbol) {
        trace(
          TracePhase.resolve.failure,
          () => `No symbol for ${formatRefkeys(refkey)}.`,
        );
        return undefined;
      }
      trace(
        TracePhase.resolve.pending,
        () =>
          `${formatRefkeys(refkey)} resolved to ${formatSymbolName(symbol)}.`,
      );
      if (hasTransientScope(symbol)) {
        trace(
          TracePhase.resolve.failure,
          () => `Symbol ${formatSymbolName(symbol)} in transient scope.`,
        );
        return undefined;
      }

      trace(
        TracePhase.resolve.success,
        () =>
          `${formatRefkeys(refkey)} successfully resolved to ${formatSymbolName(symbol)}.`,
      );
      return buildResult(currentScope, currentMemberScope, symbol);
    });
  }

  function notifySymbolCreated(symbol: OutputSymbol): void {
    if (symbol.flags & OutputSymbolFlags.Transient) {
      // just ignore transient symbols.
      return;
    }
    effect<Refkey[]>((oldRefkeys) => {
      trace(
        TracePhase.resolve.pending,
        () => `Notifying resolutions for ${formatRefkeys(symbol.refkeys)}.`,
      );

      if (oldRefkeys) {
        for (const refkey of oldRefkeys) {
          if (!symbol.refkeys.includes(refkey)) {
            // remove the old refkey from the known declarations
            knownDeclarations.delete(refkey);

            // reset any waiting declarations
            if (waitingDeclarations.has(refkey)) {
              const signal = waitingDeclarations.get(refkey)!;
              signal.value = undefined;
            }
          }
        }
      }

      for (const refkey of symbol.refkeys) {
        // notify those waiting for this refkey
        knownDeclarations.set(refkey, symbol);
        if (waitingDeclarations.has(refkey)) {
          const signal = waitingDeclarations.get(refkey)!;
          signal.value = symbol;
        }

        // notify those waiting for this symbol name
        const waitingScope = waitingSymbolNames.get(symbol.scope);
        if (waitingScope) {
          const waitingName = waitingScope.get(symbol.name);
          if (waitingName) {
            waitingName.value = symbol;
          }
        }
      }

      return [...symbol.refkeys];
    });
  }

  function findSymbolName<TSymbol extends OutputSymbol = OutputSymbol>(
    scope: OutputScope | undefined,
    name: string,
  ): ShallowRef<TSymbol | undefined> {
    return untrack(() => {
      scope ??= binder.globalScope;
      for (const sym of scope.symbols) {
        if (sym.name === name) {
          return shallowRef(sym) as Ref<TSymbol>;
        }
      }

      const symRef = shallowRef<OutputSymbol | undefined>(undefined);
      if (!waitingSymbolNames.has(scope)) {
        waitingSymbolNames.set(scope, new Map());
      }
      const waiting = waitingSymbolNames.get(scope)!;
      waiting.set(name, symRef);
      return symRef as Ref<TSymbol | undefined>;
    });
  }

  function findScopeName<TScope extends OutputScope = OutputScope>(
    scope: OutputScope | undefined,
    name: string,
  ): ShallowRef<TScope | undefined> {
    return untrack(() => {
      scope ??= binder.globalScope;
      for (const child of scope.children) {
        if (child.name === name) {
          return shallowRef(child) as Ref<TScope>;
        }
      }

      const scopeRef = shallowRef<OutputScope | undefined>(undefined);
      if (!waitingScopeNames.has(scope)) {
        waitingScopeNames.set(scope, new Map());
      }
      const waiting = waitingScopeNames.get(scope)!;
      waiting.set(name, scopeRef);

      return scopeRef as Ref<TScope | undefined>;
    });
  }

  function findScopeOrSymbolName(scope: OutputScope, name: string) {
    return untrack(() => {
      return computed(() => {
        return (
          findSymbolName(scope, name).value ?? findScopeName(scope, name).value
        );
      });
    });
  }

  function resolveFQN(
    fqn: string,
  ): Ref<OutputScope | OutputSymbol | undefined> {
    const parts = fqn.match(/[^.#]+|[.#]/g);
    if (!parts) return ref(undefined);
    if (parts.length === 0) return ref(undefined);

    parts.unshift(".");

    return computed(() => {
      let base: OutputScope | OutputSymbol | undefined = binder.globalScope;

      for (let i = 0; i < parts.length; i += 2) {
        if (base === undefined) {
          return;
        }

        const op = parts[i];
        const name = parts[i + 1];

        if (op === ".") {
          if ("originalName" in base) {
            if (!base.staticMemberScope) {
              return undefined;
            }

            base = findSymbolName(
              (base as OutputSymbol).staticMemberScope,
              name,
            ).value;
          } else {
            base = findScopeOrSymbolName(base, name).value;
          }
        } else if (op === "#") {
          if ("originalName" in base) {
            if (!base.instanceMemberScope) {
              return undefined;
            }
            base = findSymbolName(
              (base as OutputSymbol).instanceMemberScope,
              name,
            ).value;
          } else {
            return undefined;
          }
        }
      }

      return base;
    });
  }
}

/**
 * Resolve a refkey in the current scope. Returns a Ref for the resolution result.
 * The value of the ref will be undefined if the identifier hasn't been resolved yet.
 *
 * @remarks
 *
 * This API may return a ref for undefined, but that does not mean that the symbol is
 * not found. The symbol you're looking for may not have been declared yet. When the symbol
 * is declared, the ref will be updated with the resolution result.
 */
export function resolve<
  TScope extends OutputScope,
  TSymbol extends OutputSymbol,
>(refkey: Refkey): Ref<ResolutionResult<TScope, TSymbol>> {
  const scope = useScope();
  const memberScope = useMemberScope();
  const binder =
    scope?.binder ??
    memberScope?.instanceMembers?.binder ??
    memberScope?.staticMembers?.binder;

  if (!binder) {
    throw new Error("Can't resolve refkey without a binder");
  }

  return binder.resolveDeclarationByKey(
    scope,
    memberScope?.instanceMembers,
    refkey,
  ) as any;
}

const createSymbolsSymbol: unique symbol = Symbol();
export function getSymbolCreator(
  creator: SymbolCreator,
): SymbolCreator[typeof createSymbolsSymbol] {
  return creator[createSymbolsSymbol];
}

export function getSymbolCreatorSymbol(): typeof createSymbolsSymbol {
  return createSymbolsSymbol;
}

export interface SymbolCreator {
  [createSymbolsSymbol](binder: Binder): void;
}

/**
 * Use symbol flags to determine the scope in which a symbol with those flags
 * should be declared given the current context.
 *
 * @param flags - The symbol flags to use to determine the default scope.
 * @returns an {@link OutputScope} that is the default scope for the given
 * flags.
 */
export function useDefaultScope(
  flags: OutputSymbolFlags = OutputSymbolFlags.None,
) {
  if ((flags & OutputSymbolFlags.Member) === 0) {
    return useScope();
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
