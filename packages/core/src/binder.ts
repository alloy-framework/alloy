import { createContext } from "./context.js";
import { computed, ref, Ref } from "@vue/reactivity";

export interface OutputDeclaration {
  name: string;
  scope: OutputScope;
  refkey: unknown;
}

export interface OutputScope {
  kind: string;
  name: string;
  bindings: Map<string, OutputDeclaration>;
  bindingsByKey: Map<unknown, OutputDeclaration>;
  children: Map<string, OutputScope>;
  parent: OutputScope | undefined;
  binder: Binder;
  meta: any;
}

export const BinderContext = createContext<Binder>();

export interface Binder {
  createScope(
    kind: string,
    name: string,
    parent: OutputScope | undefined
  ): OutputScope;
  createDeclaration(
    name: string,
    scope: OutputScope,
    refkey?: unknown
  ): OutputDeclaration;
  resolveDeclarationByKey(
    currentScope: OutputScope,
    refkey: unknown
  ): Ref<ResolutionResult | undefined>;
}

export interface ResolutionResult {
  targetDeclaration: OutputDeclaration;
  pathUp: OutputScope[];
  pathDown: OutputScope[];
  commonScope: OutputScope | undefined;
}

export function createOutputBinder(): Binder {
  const binder: Binder = {
    createScope,
    createDeclaration,
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
    meta: {},
  };

  const knownDeclarations = new Map<unknown, OutputDeclaration>();
  const waitingDeclarations = new Map<
    unknown,
    Ref<OutputDeclaration | undefined>
  >();

  return binder;

  function createScope(
    kind: string,
    name: string,
    parent: OutputScope | undefined,
    meta?: unknown
  ): OutputScope {
    const scope: OutputScope = {
      kind,
      name,
      bindings: new Map(),
      bindingsByKey: new Map(),
      children: new Map(),
      parent,
      binder,
      meta,
    };

    if (parent) {
      parent.children.set(name, scope);
    } else {
      globalScope.children.set(name, scope);
    }

    return scope;
  }

  function createDeclaration(
    name: string,
    scope: OutputScope,
    refkey: unknown
  ): OutputDeclaration {
    const declaration: OutputDeclaration = {
      name,
      scope,
      refkey,
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
    currentScope: OutputScope,
    key: unknown
  ): Ref<ResolutionResult | undefined> {
    const targetDeclaration = knownDeclarations.get(key);
    let declSignal: Ref<OutputDeclaration | undefined>;

    if (targetDeclaration) {
      declSignal = ref(targetDeclaration);
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
      targetDeclaration: OutputDeclaration
    ): ResolutionResult {
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

  function scopeChain(scope: OutputScope | undefined) {
    const chain = [];
    while (scope) {
      chain.unshift(scope);
      scope = scope.parent;
    }

    return chain;
  }
}
