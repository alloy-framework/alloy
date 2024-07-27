import { createContext, useContext } from "./context.js";
import { computed, isProxy, ref, Ref, shallowRef } from "@vue/reactivity";
import { Refkey } from "./refkey.js";
import { useScope } from "./components/Scope.js";
import { T } from "vitest/dist/reporters-yx5ZTtEV.js";

export type Metadata = object;

export interface OutputSymbol {
  name: string;
  scope: OutputScope;
  refkey: Refkey;
}

export interface OutputScope {
  kind: string;
  name: string;
  bindings: Map<string, OutputSymbol>;
  bindingsByKey: Map<unknown, OutputSymbol>;
  children: Map<string, OutputScope>;
  parent: OutputScope | undefined;
  binder: Binder;
}

export const BinderContext = createContext<Binder>();

export function useBinder() {
  return useContext(BinderContext)!;
}

type HasAdditionalProps<T, U> = Omit<T, keyof U> extends Record<string, never>
  ? false
  : true;

export interface Binder {
  createScope<T extends OutputScope>(
    kind: T["kind"],
    name: string,
    parent: OutputScope | undefined,
    ...args: HasAdditionalProps<T, OutputScope> extends true
      ? [additionalProps: Omit<T, keyof OutputScope>]
      : []
  ): T;

  createSymbol<T extends OutputSymbol>(
    name: string,
    scope: OutputScope,
    refkey?: unknown,
    ...args: HasAdditionalProps<T, OutputSymbol> extends true
      ? [additionalProps: Omit<T, keyof OutputSymbol>]
      : []
  ): T;

  resolveDeclarationByKey<
    TScope extends OutputScope = OutputScope,
    TSymbol extends OutputSymbol = OutputSymbol
  >(
    currentScope: OutputScope,
    key: unknown
  ): Ref<ResolutionResult<TScope, TSymbol> | undefined>;
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

export function createOutputBinder(): Binder {
  const binder: Binder = {
    createScope,
    createSymbol,
    resolveDeclarationByKey,
  };

  const globalScope: OutputScope = {
    kind: "global",
    name: "<global>",
    bindings: new Map(),
    bindingsByKey: new Map(),
    children: new Map(),
    parent: undefined,
    binder,
  };

  const knownDeclarations = new Map<unknown, OutputSymbol>();
  const waitingDeclarations = new Map<unknown, Ref<OutputSymbol | undefined>>();

  return binder;

  function createScope<T extends OutputScope>(
    kind: string,
    name: string,
    parent: OutputScope | undefined,
    ...args: HasAdditionalProps<T, OutputScope> extends true
      ? [additionalProps: Omit<T, keyof OutputScope>]
      : []
  ): T {
    const scope = {
      kind,
      name,
      bindings: new Map(),
      bindingsByKey: new Map(),
      children: new Map(),
      parent: parent ?? globalScope,
      binder,
      ...args[0],
    } as T;

    if (parent) {
      parent.children.set(name, scope);
    } else {
      globalScope.children.set(name, scope);
    }

    return scope;
  }

  function createSymbol<T extends OutputSymbol>(
    name: string,
    scope: OutputScope,
    refkey?: unknown,
    ...args: HasAdditionalProps<T, OutputSymbol> extends true
      ? [additionalProps: Omit<T, keyof OutputSymbol>]
      : []
  ): T {
    const declaration = {
      name,
      scope,
      refkey,
      ...args[0],
    } as T;

    const targetScope = scope ? scope : globalScope;
    targetScope.bindings.set(name, declaration);
    targetScope.bindingsByKey.set(refkey, declaration);
    knownDeclarations.set(refkey, declaration);
    if (waitingDeclarations.has(refkey)) {
      const signal = waitingDeclarations.get(refkey)!;
      signal.value = declaration;
    }
    return declaration;
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
