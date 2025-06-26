import { computed, Ref, ShallowRef, shallowRef } from "@vue/reactivity";
import { useMemberScope } from "./context/member-scope.js";
import { useScope } from "./context/scope.js";
import { effect } from "./reactivity.js";
import { refkey, Refkey } from "./refkey.js";
import { OutputScope } from "./symbols/output-scope.js";
import { type OutputSymbol } from "./symbols/output-symbol.js";
import {
  formatRefkeys,
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
    currentMemberOwner: TSymbol | undefined,
    key: Refkey,
  ): Ref<ResolutionResult<TScope, TSymbol> | undefined>;

  getSymbolForRefkey<TSymbol extends OutputSymbol>(
    refkey: Refkey,
  ): Ref<TSymbol | undefined>;

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
   * The resolved symbol. May be declared in a lexical scope or be a member symbol.
   */
  symbol: TSymbol;

  /**
   * When the symbol is a member symbol, this is the symbol of the lexical
   * declaration which contains this member symbol, either as one of its own
   * member symbols, or as a member of one of its members.
   *
   * When the symbol is a non-member symbol, this is the same as `symbol`.
   */
  lexicalDeclaration: TSymbol;

  /**
   * The scopes between the common scope and the reference.
   */
  pathUp: TScope[];

  /**
   * The scopes between the common scope and the declaration.
   */
  pathDown: TScope[];

  /**
   * The lexical scope which contains both the reference and the lexical declaration.
   */
  commonScope: TScope | undefined;

  /**
   * When resolving a member symbol, this is the symbol whose members contain
   * both the resolved member and the current member scope.
   */
  commonMemberContainer: TSymbol | undefined;

  /**
   * When resolving a member symbol, this is the path of symbols that lead from
   * the lexical declaration to the member symbol.
   */
  memberPath?: TSymbol[];

  /**
   * When resolving a member symbol, this is the path of symbols that lead from
   * the base declaration to the member symbol.
   */
  memberPathDown?: TSymbol[];

  /**
   * When resolving a member symbol, this is the path of symbols that lead from
   * the current member scope to to the common
   */
  memberPathUp?: TSymbol[];
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
    notifyScopeCreated,
    notifySymbolCreated,
    notifySymbolDeleted,
    nameConflictResolver: options.nameConflictResolver,
  };

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

  function buildResult<
    TScope extends OutputScope = OutputScope,
    TSymbol extends OutputSymbol = OutputSymbol,
  >(
    currentScope: TScope | undefined,
    currentMemberOwner: TSymbol | undefined,
    targetDeclarationBase: TSymbol,
  ): ResolutionResult<TScope, TSymbol> {
    const { memberPath: targetMemberPath, scopeChain: targetChain } =
      scopeAndMemberChain<TScope, TSymbol>(targetDeclarationBase);
    const currentChain = scopeChain(currentScope);
    const currentMemberPath = memberPath(currentMemberOwner);

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
    const commonScope = targetChain[diffStart - 1] ?? undefined;

    let memberPathUp;
    let memberPathDown;
    let commonMemberContainer;

    if (!targetMemberPath) {
      memberPathDown = undefined;
      commonMemberContainer = undefined;
      memberPathUp = currentMemberPath;
    } else if (!currentMemberPath) {
      // we've resolved a member, but are not in member context.
      memberPathDown = targetMemberPath;
      memberPathUp = undefined;
      commonMemberContainer = undefined;
    } else {
      diffStart = 0;
      while (
        targetMemberPath[diffStart] &&
        currentMemberPath[diffStart] &&
        targetMemberPath[diffStart] === currentMemberPath[diffStart]
      ) {
        diffStart++;
      }
      memberPathUp = currentMemberPath.slice(diffStart);
      memberPathDown = targetMemberPath.slice(diffStart);
      commonMemberContainer = targetMemberPath[diffStart - 1] ?? undefined;
    }

    return {
      pathUp,
      pathDown,
      memberPath: targetMemberPath,
      commonScope,
      symbol: targetDeclarationBase,
      commonMemberContainer,
      lexicalDeclaration:
        targetMemberPath && targetMemberPath.length > 0 ?
          (targetMemberPath[0].ownerSymbol! as TSymbol)
        : targetDeclarationBase,
      memberPathDown,
      memberPathUp,
    };
  }

  /**
   * Walk from the provided symbol up to the non-member symbol. This constitutes
   * the member path. Then, walk from the first non-member symbol's scope up to
   * the global scope. This constitutes the scope chain.
   */
  function scopeAndMemberChain<
    TScope extends OutputScope,
    TSymbol extends OutputSymbol,
  >(symbol: TSymbol) {
    const result = {
      memberPath: undefined as TSymbol[] | undefined,
      scopeChain: [] as TScope[],
    };
    let currentSymbol = symbol;

    if (currentSymbol.isMemberSymbol) {
      result.memberPath = [];
      while (currentSymbol.isMemberSymbol) {
        result.memberPath.unshift(currentSymbol);
        currentSymbol = currentSymbol.ownerSymbol as TSymbol;
      }
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

  function memberPath<TSymbol extends OutputSymbol>(
    symbol: TSymbol | undefined,
  ) {
    if (!symbol) {
      return undefined;
    }

    if (!symbol.isMemberSymbol) {
      return undefined;
    }

    const path = [];
    let currentSymbol = symbol;
    while (currentSymbol.isMemberSymbol) {
      path.unshift(currentSymbol);
      currentSymbol = currentSymbol.ownerSymbol as TSymbol;
    }

    return path;
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
    currentMemberOwner: TSymbol | undefined,
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
      if (symbol.isTransient) {
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
      return buildResult(currentScope, currentMemberOwner, symbol);
    });
  }

  function notifySymbolCreated(symbol: OutputSymbol): void {
    effect<Refkey[]>((oldRefkeys) => {
      if (symbol.refkeys) {
        trace(
          TracePhase.resolve.pending,
          () => `Notifying resolutions for ${formatRefkeys(symbol.refkeys)}.`,
        );
      }

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

        const scope = symbol.scope;
        if (!scope) {
          continue;
        }

        // notify those waiting for this symbol name
        const waitingScope = waitingSymbolNames.get(scope);
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
  const binder = scope?.binder ?? memberScope?.ownerSymbol.binder;

  if (!binder) {
    throw new Error("Can't resolve refkey without a binder");
  }

  return binder.resolveDeclarationByKey(
    scope,
    memberScope?.ownerSymbol,
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
