import { createContext, useContext } from "./context.js";
import { computed, ref, Ref } from "@vue/reactivity";
import { RefKey } from "./refkey.js";
import { useScope } from "./components/Scope.js";

export type Metadata = object;

export interface OutputSymbol<
  TScopeMeta extends Metadata = Metadata,
  TSymbolMeta extends Metadata = Metadata
> {
  name: string;
  scope: OutputScope<TScopeMeta, TSymbolMeta>;
  refkey: unknown;
  meta: TSymbolMeta;
}

export interface OutputScope<
  TScopeMeta extends Metadata = Metadata,
  TSymbolMeta extends Metadata = Metadata
> {
  kind: string;
  name: string;
  bindings: Map<string, OutputSymbol<TScopeMeta, TSymbolMeta>>;
  bindingsByKey: Map<unknown, OutputSymbol<TScopeMeta, TSymbolMeta>>;
  children: Map<string, OutputScope<TScopeMeta, TSymbolMeta>>;
  parent: OutputScope<TScopeMeta, TSymbolMeta> | undefined;
  binder: Binder;
  meta: TScopeMeta;
}

export const BinderContext = createContext<Binder>();

export function useBinder() {
  return useContext(BinderContext)!;
}

export interface Binder<
  TScopeMeta extends Metadata = {},
  TSymbolMeta extends Metadata = {}
> {
  createScope(
    kind: string,
    name: string,
    parent: OutputScope<TScopeMeta, TSymbolMeta> | undefined
  ): TScopeMeta;
  createSymbol(
    name: string,
    scope: OutputScope<TScopeMeta, TSymbolMeta>,
    refkey?: unknown,
    meta?: TSymbolMeta
  ): OutputSymbol<TScopeMeta, TSymbolMeta>;

  resolveDeclarationByKey(
    currentScope: OutputScope<TScopeMeta, TSymbolMeta>,
    refkey: unknown
  ): Ref<ResolutionResult<TScopeMeta, TSymbolMeta> | undefined>;
}

export interface ResolutionResult<
  TScopeMeta extends Metadata = Metadata,
  TSymbolMeta extends Metadata = Metadata
> {
  targetDeclaration: OutputSymbol<TScopeMeta, TSymbolMeta>;
  pathUp: OutputScope<TScopeMeta, TSymbolMeta>[];
  pathDown: OutputScope<TScopeMeta, TSymbolMeta>[];
  commonScope: OutputScope<TScopeMeta, TSymbolMeta> | undefined;
}

export function createOutputBinder<
  TScopeMeta extends Metadata = {},
  TSymbolMeta extends Metadata = {}
>(): Binder {
  const binder: Binder = {
    createScope,
    createSymbol,
    resolveDeclarationByKey,
  };

  const globalScope: OutputScope<TScopeMeta, TSymbolMeta> = {
    kind: "global",
    name: "<global>",
    bindings: new Map(),
    bindingsByKey: new Map(),
    children: new Map(),
    parent: undefined,
    binder,
    meta: {} as TScopeMeta,
  };

  const knownDeclarations = new Map<
    unknown,
    OutputSymbol<TScopeMeta, TSymbolMeta>
  >();
  const waitingDeclarations = new Map<
    unknown,
    Ref<OutputSymbol<TScopeMeta, TSymbolMeta> | undefined>
  >();

  return binder;

  function createScope(
    kind: string,
    name: string,
    parent: OutputScope<TScopeMeta, TSymbolMeta> | undefined,
    meta?: TScopeMeta
  ): OutputScope<TScopeMeta, TSymbolMeta> {
    const scope: OutputScope<TScopeMeta, TSymbolMeta> = {
      kind,
      name,
      bindings: new Map(),
      bindingsByKey: new Map(),
      children: new Map(),
      parent,
      binder,
      meta: meta ?? ({} as TScopeMeta),
    };

    if (parent) {
      parent.children.set(name, scope);
    } else {
      globalScope.children.set(name, scope);
    }

    return scope;
  }

  function createSymbol(
    name: string,
    scope: OutputScope<TScopeMeta, TSymbolMeta>,
    refkey?: unknown,
    meta?: TSymbolMeta
  ): OutputSymbol<TScopeMeta, TSymbolMeta> {
    const declaration: OutputSymbol<TScopeMeta, TSymbolMeta> = {
      name,
      scope,
      refkey,
      meta: meta ?? ({} as TSymbolMeta),
    };

    const targetScope = scope ? scope : globalScope;
    targetScope.bindings.set(name, declaration);
    knownDeclarations.set(refkey, declaration);
    if (waitingDeclarations.has(refkey)) {
      const signal = waitingDeclarations.get(refkey)!;
      signal.value = declaration;
    }
    return declaration;
  }

  function resolveDeclarationByKey(
    currentScope: OutputScope<TScopeMeta, TSymbolMeta>,
    key: unknown
  ): Ref<ResolutionResult<TScopeMeta, TSymbolMeta> | undefined> {
    const targetDeclaration = knownDeclarations.get(key);
    let declSignal: Ref<OutputSymbol<TScopeMeta, TSymbolMeta> | undefined>;

    if (targetDeclaration) {
      // this any cast hides a ridiculous error, fix it probably
      declSignal = ref(targetDeclaration) as any;
    } else {
      if (waitingDeclarations.has(key)) {
        declSignal = waitingDeclarations.get(key)!;
      } else {
        declSignal = ref();
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

    function buildResult(
      targetDeclaration: OutputSymbol<TScopeMeta, TSymbolMeta>
    ): ResolutionResult<TScopeMeta, TSymbolMeta> {
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

      return { pathUp, pathDown, commonScope, targetDeclaration };
    }
  }

  function scopeChain(scope: OutputScope<TScopeMeta, TSymbolMeta> | undefined) {
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
  TScopeMeta extends Metadata,
  TSymbolMeta extends Metadata
>(refkey: RefKey): Ref<ResolutionResult<TScopeMeta, TSymbolMeta>> {
  const scope = useScope();
  const binder = scope.binder;

  return binder.resolveDeclarationByKey(scope, refkey) as any;
}
