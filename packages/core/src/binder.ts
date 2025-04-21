import {
  computed,
  reactive,
  ref,
  Ref,
  ShallowRef,
  shallowRef,
} from "@vue/reactivity";
import { useBinder } from "./context/binder.js";
import { useMemberScope } from "./context/member-scope.js";
import { useScope } from "./context/scope.js";
import { effect, memo, onCleanup, untrack } from "./jsx-runtime.js";
import { refkey, Refkey } from "./refkey.js";
import { queueJob, QueueJob } from "./scheduler.js";
export type Metadata = object;

/**
 * Flags that describe an output symbol.
 */
export enum OutputSymbolFlags {
  None = 0,

  /**
   * The symbol is an instance member container. Symbols with this flag will have a
   * instanceMemberScope property that contains symbols for instance members.
   */
  InstanceMemberContainer = 1 << 0,

  /**
   * The symbol is a static member container. Symbols with this flag will have a
   * staticMemberScope property that contains symbols for static members.
   */
  StaticMemberContainer = 1 << 1,

  /**
   * Whether this symbol contains members of any kind.
   */
  MemberContainer = InstanceMemberContainer | StaticMemberContainer,

  /**
   * Whether this symbol is an instance member of another symbol (i.e that it is
   * stored in an instance member scope).
   */
  InstanceMember = 1 << 2,

  /**
   * Whether this symbol is a static member of another symbol (i.e that it is
   * stored in a static member scope).
   */
  StaticMember = 1 << 3,

  /**
   * Whether this is an instance member or static member of another symbol.
   */
  Member = InstanceMember | StaticMember,
}

/**
 * An output symbol is a named entity that can be referenced in your output
 * code. Referencing symbols is generally accomplished by using a
 * {@link Refkey}.
 *
 * @remarks
 *
 * This interface is the base implementation of symbol. Generally, most
 * languages will have subtypes of this interface that provide additional,
 * language-specific metadata about declared symbols. For example, symbols in
 * TypeScript need to track whether they are exported or what kind of symbol
 * they are (e.g. type, value, parameter, etc.)
 *
 * Symbols are reactive values, which allows you to observe changes to the symbol
 * information. For example, a symbol's name may change if it becomes conflicted
 * with a symbol that is added later.
 */
export interface OutputSymbol {
  /**
   * The original name of the symbol, before any conflicts were resolved.
   */
  originalName: string;

  /**
   * The name of the symbol.
   */
  name: string;

  /**
   * The symbol's flags.
   */
  flags: OutputSymbolFlags;

  /**
   * The scope in which the symbol is defined.
   */
  scope: OutputScope;

  /**
   * The binder instance that created this symbol.
   */
  binder: Binder;

  /**
   * The unique values that reference this symbol.
   */
  refkeys: Refkey[];

  /**
   * The instance members available on this symbol.
   *
   * @remarks
   *
   * Instance members are members that are available when this symbol is
   * instantiated. Instantiation is language-specific. For example, in
   * TypeScript, instance members of symbols for classes are available when the
   * class is instantiated with a new expression.
   *
   * When a symbol cannot have instance members, this is undefined.
   */
  instanceMemberScope?: OutputScope;

  /**
   * The static members available on this symbol.
   *
   * @remarks
   *
   * Static members are members that are available on the symbol itself. These symbols
   * can be accessed off the parent symbol directly with a refkey. There is only ever
   * one static member symbol in the output (i.e., the symbol is unique).
   */
  staticMemberScope?: OutputScope;

  /**
   * Additional custom metadata about this symbol.
   */
  metadata: Record<string, unknown>;
}

/**
 * Flags that describe an output scope.
 */
export enum OutputScopeFlags {
  None = 0,

  /**
   * This scope is a static member scope.
   */
  StaticMemberScope = 1 << 0,

  /**
   * This scope is an instance member scope.
   */
  InstanceMemberScope = 1 << 1,

  /**
   * This scope is a member scope. Scopes with this flag will have an `owner`
   * property that points to the symbol whose member this scope holds.
   */
  MemberScope = StaticMemberScope | InstanceMemberScope,
}

/**
 * A container of symbols accessible within some scope in your output code.
 *
 * @remarks
 *
 * Scopes form a tree. All scopes except the global scope have a parent scope
 * identified by `parent`. Scopes can have nested scopes which can be accessed
 * using the `children` property. Whether a child scope can be accessed from
 * the parent scope is determined by each language's scoping rules.
 *
 * This interface is the base implementation of scope. Generally, most languages
 * will have subtypes of this interface that provide additional metadata about
 * the scope. For example, TypeScript scopes need to track whether the scope
 * represents a package, module, class, function, etc.
 *
 * Scopes are reactive values, which allows you to observe changes to the scope
 * within a reactive context.
 */
export interface OutputScope {
  /**
   * The kind of scope. Subtypes will likely provide a set of known scope kinds.
   * The kind is not used by the binder itself.
   */
  kind?: string;

  /**
   * The name of the scope.
   */
  name: string;

  /**
   * The flags that describe this scope.
   */
  flags: OutputScopeFlags;

  /**
   * The symbols defined within this scope.
   */
  symbols: Set<OutputSymbol>;

  /**
   * The symbols defined within this scope, indexed by refkey.
   */
  symbolsByRefkey: Map<Refkey, OutputSymbol>;

  /**
   * The scopes nested within this scope.
   */
  children: Set<OutputScope>;

  /**
   * The container of this scope.
   */
  parent: OutputScope | undefined;

  /**
   * The symbol that owns this scope. This is only defined for scopes that have
   * the {@link OutputScopeFlags.StaticMemberScope} flag.
   */
  owner?: OutputSymbol;

  /**
   * The binder that created this scope.
   */
  binder: Binder;

  /**
   * Get the names of all symbols in this scope.
   */
  getSymbolNames(): Set<string>;
}

export type CreateSymbolOptions<T extends OutputSymbol = OutputSymbol> = {
  name: string;
  scope?: OutputScope;
  refkey?: Refkey | Refkey[];
  flags?: OutputSymbolFlags;
  metadata?: Record<string, unknown>;
} & Omit<T, keyof OutputSymbol>;

export type CreateScopeOptions<T extends OutputScope = OutputScope> = {
  kind: T["kind"];
  name: string;
  parent?: OutputScope | undefined;
  flags?: OutputScopeFlags;
  owner?: OutputSymbol;
  metadata?: Record<string, unknown>;
} & Omit<T, keyof OutputScope>;

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
   * Create a new scope. The scope will be added to the parent scope's children.
   * The returned scope object is reactive.
   */
  createScope<T extends OutputScope>(args: CreateScopeOptions<T>): T;

  /**
   * Create a new symbol. The symbol will be added to the parent scope's symbols.
   * The returned symbol object is reactive.
   */
  createSymbol<T extends OutputSymbol>(args: CreateSymbolOptions<T>): T;

  /**
   * Delete the given symbol. The symbol will be removed from its parent's
   * scope. Any resolutions to this symbol will become undefined.
   */
  deleteSymbol(symbol: OutputSymbol): void;

  /**
   * Instantiate the static members of a symbol into the instance members of
   * another symbol.
   *
   * @param sourceSym - The symbol to add instance members to.
   * @param targetSym - The symbol with the static members to instantiate.
   */
  instantiateSymbolInto(sourceSym: OutputSymbol, targetSym: OutputSymbol): void;

  /**
   * Add static members to an existing symbol.
   *
   * @param symbol - The symbol to add static members to.
   */
  addStaticMembersToSymbol(symbol: OutputSymbol): void;

  /**
   * Add instance members to an existing symbol.
   *
   * @param symbol - The symbol to add instance members to.
   */
  addInstanceMembersToSymbol(symbol: OutputSymbol): void;

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
    createScope,
    createSymbol,
    deleteSymbol,
    resolveDeclarationByKey,
    getSymbolForRefkey,
    addStaticMembersToSymbol,
    addInstanceMembersToSymbol,
    instantiateSymbolInto,
    findSymbolName,
    findScopeName,
    resolveFQN: resolveFQN as any,
    globalScope: undefined as any,
  };

  const globalSymbols = reactive(new Set<OutputSymbol>());

  binder.globalScope = reactive({
    kind: "global",
    name: "<global>",
    symbols: new Set(),
    symbolsByRefkey: new Map(),
    children: new Set(),
    parent: undefined,
    binder,
    flags: OutputScopeFlags.None,
    getSymbolNames: symbolNames(globalSymbols),
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
  const deconflictJobs = new Map<OutputScope, Map<string, QueueJob>>();

  return binder;

  function createScope<T extends OutputScope>(args: CreateScopeOptions<T>): T {
    const {
      kind,
      name,
      parent,
      owner,
      flags = OutputScopeFlags.None,
      metadata = {},
      ...rest
    } = args;

    if (flags & OutputScopeFlags.MemberScope) {
      if (!owner) {
        throw new Error("Member scopes must have an owner");
      }
    }

    // member scopes don't have a parent regular scope. Perhaps in the future
    // their parent would be something like a prototype object.
    let parentScope: OutputScope | undefined;
    if (parent) {
      parentScope = parent;
    } else if (flags & OutputScopeFlags.MemberScope) {
      parentScope = undefined;
    } else {
      parentScope = useScope() ?? binder.globalScope;
    }

    const symbols = reactive(new Set<OutputSymbol>());
    const symbolsByRefkey = reactive(new Map<Refkey, OutputSymbol>());
    const scope: T = reactive({
      kind: kind,
      name: name,
      symbols,
      symbolsByRefkey,
      children: new Set(),
      parent: parentScope,
      flags,
      owner,
      binder,
      metadata,
      ...rest,
      getSymbolNames: symbolNames(symbols),
    }) as T;

    if (parentScope) {
      parentScope.children.add(scope);
    }

    if (waitingScopeNames.has(parentScope!)) {
      const waiting = waitingScopeNames.get(parentScope!);
      if (waiting?.has(name)) {
        const ref = waiting.get(name)!;
        ref.value = scope;
      }
    }

    return scope as T;
  }

  function createSymbol<T extends OutputSymbol>(
    args: CreateSymbolOptions<T>,
  ): T {
    const {
      name,
      scope = useDefaultScope(args.flags),
      refkey,
      flags = OutputSymbolFlags.None,
      metadata = {},
      ...rest
    } = args;

    const allRefkeys = [refkey ?? []].flat();

    if (!scope) {
      throw new Error(
        "No scope was provided and no scope could be found in context",
      );
    }

    if (
      flags & OutputSymbolFlags.Member &&
      (scope.flags & OutputScopeFlags.MemberScope) === 0
    ) {
      throw new Error("Member symbols must be stored in a member scope.");
    }

    if (scope.flags & OutputScopeFlags.StaticMemberScope) {
      if (
        ~flags & OutputSymbolFlags.InstanceMember &&
        ~flags & OutputSymbolFlags.StaticMember
      ) {
        throw new Error(
          "Symbols stored in a member scope must have either OutputSymbolFlags.InstanceMember or OutputSymbolFlags.StaticMember flags",
        );
      }
    }

    const symbol = reactive({
      originalName: name,
      name: name,
      scope,
      refkeys: allRefkeys,
      binder,
      flags,
      metadata,
      ...rest,
    }) as T;

    if (args.flags && args.flags & OutputSymbolFlags.InstanceMemberContainer) {
      symbol.instanceMemberScope = createScope({
        kind: "member",
        name: "instance members",
        parent: undefined,
        owner: symbol,
        flags: OutputScopeFlags.InstanceMemberScope,
      });
    }

    if (args.flags && args.flags & OutputSymbolFlags.StaticMemberContainer) {
      symbol.staticMemberScope = createScope({
        kind: "member",
        name: "static members",
        parent: undefined,
        owner: symbol,
        flags: OutputScopeFlags.StaticMemberScope,
      });
    }

    scope.symbols.add(symbol);
    for (const refkey of allRefkeys) {
      scope.symbolsByRefkey.set(refkey, symbol);
    }

    deconflict(symbol);
    notifyRefkey(symbol);

    return symbol;
  }

  function deleteSymbol(symbol: OutputSymbol) {
    symbol.scope.symbols.delete(symbol);

    if (!refkey) {
      return;
    }

    for (const refkey of symbol.refkeys) {
      const resolution = waitingDeclarations.get(refkey);
      if (!resolution) return;
      resolution.value = undefined;
    }
  }

  function instantiateSymbolInto(source: OutputSymbol, target: OutputSymbol) {
    if (target.staticMemberScope) {
      return;
    }

    // Ensure static member scope exists
    addStaticMembersToSymbol(target);

    effect(() => {
      // copy instance members if it's an instance‐container
      if (source.flags & OutputSymbolFlags.InstanceMemberContainer) {
        copyMembers(
          source.instanceMemberScope!.symbols,
          target,
          target.staticMemberScope!,
        );
      }

      // copy static members if it's a static‐container
      if (source.flags & OutputSymbolFlags.StaticMemberContainer) {
        copyMembers(
          source.staticMemberScope!.symbols,
          target,
          target.staticMemberScope!,
        );
      }
    });

    /**
     * Recursively copy `symbols` from `sourceSym` into `intoScope` of `targetSym`.
     * Always marks each instantiation as StaticMember so lookups use dot notation (e.g. Parent.child)
     * and preserves any StaticMemberContainer flag to auto create newSym.staticMemberScope.
     */
    function copyMembers(
      symbols: Set<OutputSymbol>,
      targetSym: OutputSymbol,
      intoScope: OutputScope,
    ) {
      for (const srcSym of symbols) {
        untrack(() => {
          const wantKey = refkey(targetSym.refkeys[0], srcSym.refkeys[0]);

          // create the new symbol. Preserve StaticMemberContainer if present
          const newSym = createSymbol({
            name: srcSym.name,
            scope: intoScope,
            refkey: wantKey,
            flags: srcSym.flags | OutputSymbolFlags.StaticMember,
          });

          onCleanup(() => {
            binder.deleteSymbol(newSym);
          });

          // if the source symbol itself was a container of static members,
          // recurse into the newSym.staticMemberScope that createSymbol just gave us
          if (
            srcSym.staticMemberScope &&
            srcSym.staticMemberScope.symbols.size > 0
          ) {
            // ensure we have that scope
            addStaticMembersToSymbol(newSym);

            copyMembers(
              srcSym.staticMemberScope.symbols,
              newSym,
              newSym.staticMemberScope!,
            );
          }
        });
      }
    }
  }

  function addStaticMembersToSymbol(symbol: OutputSymbol) {
    if (symbol.flags & OutputSymbolFlags.StaticMemberContainer) {
      // nothing to do.
      return;
    }

    symbol.flags |= OutputSymbolFlags.StaticMemberContainer;
    symbol.staticMemberScope = createScope({
      kind: "member",
      name: "static members",
      parent: undefined,
      owner: symbol,
      flags: OutputScopeFlags.StaticMemberScope,
    });
  }

  function addInstanceMembersToSymbol(symbol: OutputSymbol) {
    if (symbol.flags & OutputSymbolFlags.InstanceMemberContainer) {
      // nothing to do.
      return;
    }

    symbol.flags |= OutputSymbolFlags.InstanceMemberContainer;
    symbol.instanceMemberScope = createScope({
      kind: "member",
      name: "instance members",
      parent: undefined,
      owner: symbol,
      flags: OutputScopeFlags.InstanceMemberScope,
    });
  }

  function resolveDeclarationByKey<
    TScope extends OutputScope = OutputScope,
    TSymbol extends OutputSymbol = OutputSymbol,
  >(
    currentScope: TScope | undefined,
    currentMemberScope: TScope | undefined,
    key: Refkey,
  ): Ref<ResolutionResult<TScope, TSymbol> | undefined> {
    const targetDeclaration = knownDeclarations.get(key);

    if (targetDeclaration) {
      // this any cast hides a ridiculous error, fix it probably
      return shallowRef(
        buildResult(currentScope, currentMemberScope, targetDeclaration),
      ) as any;
    } else {
      return waitForRefkey(key, (symbol) => {
        if (symbol) {
          return buildResult(currentScope, currentMemberScope, symbol);
        } else {
          return undefined;
        }
      });
    }
  }

  function buildResult<
    TScope extends OutputScope = OutputScope,
    TSymbol extends OutputSymbol = OutputSymbol,
  >(
    currentScope: TScope | undefined,
    currentMemberScope: TScope | undefined,
    targetDeclarationBase: TSymbol,
  ): ResolutionResult<TScope, TSymbol> {
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

  function deconflict(symbol: OutputSymbol) {
    const scope = symbol.scope;
    const existingNames = [...scope.symbols].filter(
      (sym) => sym.name === symbol.name,
    );

    if (existingNames.length < 2) {
      return;
    }

    if (options.nameConflictResolver) {
      queueJob(
        deconflictJobForScopeAndName(
          scope,
          symbol.name,
          options.nameConflictResolver,
        ),
      );
    } else {
      // default disambiguation is first-wins
      for (let i = 1; i < existingNames.length; i++) {
        existingNames[i].name = existingNames[i].originalName + "_" + (i + 1);
      }
    }
  }

  function deconflictJobForScopeAndName(
    scope: OutputScope,
    name: string,
    handler: NameConflictResolver,
  ) {
    if (!deconflictJobs.has(scope)) {
      deconflictJobs.set(scope, new Map());
    }

    const jobs = deconflictJobs.get(scope)!;
    if (jobs.has(name)) {
      return jobs.get(name)!;
    }
    const job = () => {
      const conflictedSymbols = [...scope.symbols].filter(
        (sym) => sym.name === name,
      );
      handler(name, conflictedSymbols);
      jobs.delete(name);
    };

    jobs.set(name, job);
    return job;
  }

  function getSymbolForRefkey<TSymbol extends OutputSymbol>(
    refkey: Refkey,
  ): Ref<TSymbol | undefined> {
    const symbol = knownDeclarations.get(refkey);
    if (symbol) {
      return shallowRef(symbol as TSymbol);
    } else {
      if (waitingDeclarations.has(refkey)) {
        return waitingDeclarations.get(refkey)! as ShallowRef<
          TSymbol | undefined
        >;
      } else {
        const declSignal = shallowRef();
        waitingDeclarations.set(refkey, declSignal);
        return declSignal;
      }
    }
  }

  function waitForRefkey<
    TScope extends OutputScope,
    TSymbol extends OutputSymbol,
  >(
    refkey: Refkey,
    cb: (
      symbol: TSymbol | undefined,
    ) => ResolutionResult<TScope, TSymbol> | undefined,
  ): ShallowRef<ResolutionResult<TScope, TSymbol> | undefined> {
    let declSignal;
    if (waitingDeclarations.has(refkey)) {
      declSignal = waitingDeclarations.get(refkey)! as ShallowRef<TSymbol>;
    } else {
      declSignal = shallowRef();
      waitingDeclarations.set(refkey, declSignal);
    }

    return computed(() => cb(declSignal.value));
  }

  function notifyRefkey(symbol: OutputSymbol): void {
    effect(() => {
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
    });
  }

  function findSymbolName<TSymbol extends OutputSymbol = OutputSymbol>(
    scope: OutputScope | undefined,
    name: string,
  ): Ref<TSymbol | undefined> {
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
  ): Ref<TScope | undefined> {
    return untrack(() => {
      scope ??= binder.globalScope;
      for (const child of scope.children) {
        if (child.name === name) {
          return ref(child) as Ref<TScope>;
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
  const scope = useScope() ?? useBinder().globalScope;
  const memberScope = useMemberScope();
  const binder = scope.binder;

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

function symbolNames(symbols: Set<OutputSymbol>): () => Set<string> {
  return memo(() => {
    const names = new Set<string>();
    for (const sym of symbols.values()) {
      names.add(sym.name);
    }

    return names;
  });
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
