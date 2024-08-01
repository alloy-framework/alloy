import { createContext, useContext } from "./context.js";
import {
  computed,
  isProxy,
  reactive,
  ref,
  Ref,
  shallowRef,
} from "@vue/reactivity";
import { Refkey } from "./refkey.js";
import { useScope } from "./components/Scope.js";
import { T } from "vitest/dist/reporters-yx5ZTtEV.js";
import { memo } from "./jsx-runtime.js";

export type Metadata = object;

export interface OutputSymbol {
  originalName: string;
  name: string;
  scope: OutputScope;
  refkey: Refkey;
}

export interface OutputScope {
  kind: string;
  name: string;
  symbols: Set<OutputSymbol>;
  children: Set<OutputScope>;
  parent: OutputScope | undefined;
  binder: Binder;
  getSymbolNames(): Set<string>;
}

export const BinderContext = createContext<Binder>();

export function useBinder() {
  return useContext(BinderContext)!;
}

type HasAdditionalProps<T, U> = Omit<T, keyof U> extends Record<string, never>
  ? false
  : true;

/**
 * The binder tracks all output scopes and symbols. Scopes are nested containers
 * for symbols.
 *
 * Symbol information is reactive because in certain situations this data may
 * change. For example, when a symbol becomes conflicted with another symbol,
 * one of the symbol names may change. Ensure that you interact with binder
 * values in a reactive context (i.e. within JSX/code template, or within
 * memo/computed/etc).
 *
 * The binder interacts with node context by pulling the current scope out of the
 *
 */
export interface Binder {
  createScope<T extends OutputScope>(
    args: {
      kind: T["kind"];
      name: string;
      parent?: OutputScope | undefined;
    } & Omit<T, keyof OutputScope>
  ): T;

  createSymbol<T extends OutputSymbol>(
    args: {
      name: string;
      scope?: OutputScope;
      refkey?: unknown;
    } & Omit<T, keyof OutputSymbol>
  ): T;

  resolveDeclarationByKey<
    TScope extends OutputScope = OutputScope,
    TSymbol extends OutputSymbol = OutputSymbol
  >(
    currentScope: OutputScope,
    key: unknown
  ): Ref<ResolutionResult<TScope, TSymbol> | undefined>;

  globalScope: OutputScope;
}

export interface ResolutionResult<
  TScope extends OutputScope,
  TSymbol extends OutputSymbol
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
}

export interface NameConflictResolver {
  (name: string, symbols: OutputSymbol[]): void;
}

export interface BinderOptions {
  nameConflictResolver?: NameConflictResolver;
}

export function createOutputBinder(options: BinderOptions = {}): Binder {
  const binder: Binder = {
    createScope,
    createSymbol,
    resolveDeclarationByKey,
    globalScope: undefined as any,
  };

  const globalSymbols = reactive(new Set<OutputSymbol>());

  binder.globalScope = reactive({
    kind: "global",
    name: "<global>",
    symbols: new Set(),
    children: new Set(),
    parent: undefined,
    binder,
    getSymbolNames: symbolNames(globalSymbols),
  });

  const knownDeclarations = new Map<unknown, OutputSymbol>();
  const waitingDeclarations = new Map<unknown, Ref<OutputSymbol | undefined>>();

  return binder;

  function createScope<T extends OutputScope>(
    args: {
      kind: string;
      name: string;
      parent?: OutputScope;
    } & Omit<T, keyof OutputScope>
  ): T {
    const { kind, name, parent, ...rest } = args;

    const parentScope = parent ?? useScope() ?? binder.globalScope;
    const symbols = reactive(new Set<OutputSymbol>());
    const scope: T = reactive({
      kind: kind,
      name: name,
      symbols,
      children: new Set(),
      parent: parentScope,
      binder,
      ...rest,
      getSymbolNames: symbolNames(symbols),
    }) as T;

    parentScope.children.add(scope);

    return scope as T;
  }

  function createSymbol<T extends OutputSymbol>(
    args: {
      name: string;
      scope?: OutputScope;
      refkey?: unknown;
    } & Omit<T, keyof OutputSymbol>
  ): T {
    const { name, scope, refkey, ...rest } = args;

    const parentScope = scope ?? useScope() ?? binder.globalScope;
    const symbol = reactive({
      originalName: name,
      name: name,
      scope: parentScope,
      refkey,
      ...rest,
    }) as T;
    parentScope.symbols.add(symbol);
    deconflict(symbol);

    knownDeclarations.set(refkey, symbol);
    if (waitingDeclarations.has(refkey)) {
      const signal = waitingDeclarations.get(refkey)!;
      signal.value = symbol;
    }
    return symbol;
  }

  function resolveDeclarationByKey<
    TScope extends OutputScope = OutputScope,
    TSymbol extends OutputSymbol = OutputSymbol
  >(
    currentScope: OutputScope,
    key: unknown
  ): Ref<ResolutionResult<TScope, TSymbol> | undefined> {
    const targetDeclaration = knownDeclarations.get(key);
    let declSignal: Ref<TSymbol | undefined>;

    if (targetDeclaration) {
      // this any cast hides a ridiculous error, fix it probably
      declSignal = shallowRef(targetDeclaration) as any;
    } else {
      if (waitingDeclarations.has(key)) {
        declSignal = waitingDeclarations.get(key)! as Ref<TSymbol>;
      } else {
        declSignal = shallowRef();
        waitingDeclarations.set(key, declSignal);
      }
    }

    return computed(() => {
      if (declSignal.value !== undefined) {
        return buildResult(declSignal.value);
      } else {
        return undefined;
      }
    });

    function buildResult<
      TScope extends OutputScope = OutputScope,
      TSymbol extends OutputSymbol = OutputSymbol
    >(targetDeclaration: TSymbol): ResolutionResult<TScope, TSymbol> {
      const targetScope = targetDeclaration.scope;
      const targetChain = scopeChain(targetScope);
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
        pathUp: pathUp as TScope[],
        pathDown: pathDown as TScope[],
        commonScope: commonScope as TScope,
        targetDeclaration,
      };
    }
  }

  function scopeChain(scope: OutputScope | undefined) {
    const chain = [];
    while (scope) {
      chain.unshift(scope);
      scope = scope.parent;
    }

    return chain;
  }

  function deconflict(symbol: OutputSymbol) {
    const scope = symbol.scope;
    const existingNames = [...scope.symbols].filter(
      (sym) => sym.originalName === symbol.name
    );

    if (existingNames.length < 2) {
      return;
    }

    if (options.nameConflictResolver) {
      options.nameConflictResolver(symbol.name, existingNames);
    } else {
      // default disambiguation is first-wins
      for (let i = 1; i < existingNames.length; i++) {
        existingNames[i].name = existingNames[i].originalName + "_" + (i + 1);
      }
    }
  }
}

/**
 * Resolve a refkey in the current scope. Returns a Ref for the resolution result.
 * The value of the ref will be undefined if the identifier hasn't been resolved yet.
 */
export function resolve<
  TScope extends OutputScope,
  TSymbol extends OutputSymbol
>(refkey: Refkey): Ref<ResolutionResult<TScope, TSymbol>> {
  const scope = useScope();
  const binder = scope.binder;

  return binder.resolveDeclarationByKey(scope, refkey) as any;
}

const createSymbolsSymbol: unique symbol = Symbol();
export function getSymbolCreator(
  creator: SymbolCreator
): SymbolCreator[typeof createSymbolsSymbol] {
  return creator[createSymbolsSymbol];
}

export function getSymbolCreatorSymbol(): typeof createSymbolsSymbol {
  return createSymbolsSymbol;
}

export interface SymbolCreator {
  [createSymbolsSymbol](binder: Binder): void;
}

function symbolNames(symbols: Set<OutputSymbol>): () => Set<string> {
  return memo(() => {
    const names = new Set<string>();
    for (const sym of symbols.values()) {
      names.add(sym.name);
    }

    return names;
  });
}
