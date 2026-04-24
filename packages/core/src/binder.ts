import { computed, Ref, ShallowRef, shallowRef } from "@vue/reactivity";
import { useBinder } from "./context/binder.js";
import { useMemberContext } from "./context/member-scope.js";
import { useScope } from "./context/scope.js";
import { debug, TracePhase } from "./debug/index.js";
import { emitDiagnostic, type DiagnosticHandle } from "./diagnostics.js";
import { effect, onCleanup, untrack } from "./reactivity.js";
import {
  inspectRefkey,
  isMemberRefkey,
  MemberRefkey,
  refkey,
  Refkey,
  Refkeyable,
  toRefkey,
} from "./refkey.js";
import { OutputScope } from "./symbols/output-scope.js";
import { type OutputSymbol } from "./symbols/output-symbol.js";
import { formatRefkeys, formatSymbolName } from "./tracer.js";
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
    key: Refkey,
    options?: ResolveDeclarationByKeyOptions<TScope, TSymbol>,
  ): Ref<ResolutionResult<TScope, TSymbol> | undefined>;

  /**
   * Get a ref to the symbol associated with the given refkey. The value of the
   * ref is undefined if the symbol has not been created yet.
   */
  getSymbolForRefkey<TSymbol extends OutputSymbol>(
    refkey: Refkeyable,
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

  /**
   * Notifies the binder that a symbol's refkeys have changed.
   * Called directly by OutputSymbol when its refkeys setter is invoked.
   * Optional so existing custom Binder implementations are not broken.
   *
   * @remarks
   * When this method is omitted from a custom Binder implementation, only the
   * initial refkeys set at symbol-construction time are tracked. Any subsequent
   * setter-based refkey changes will not update `knownDeclarations` or fulfill
   * `waitingDeclarations` entries in that custom binder.
   */
  notifySymbolRefkeysChanged?(
    symbol: OutputSymbol,
    oldRefkeys: Refkey[],
    newRefkeys: Refkey[],
  ): void;
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
 * │       └── static members
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
 * * **memberPath**: [bar]
 * * **lexicalDeclaration**: foo
 * For deeper chains (e.g., foo.bar.baz where bar and baz are member symbols, foo is not): memberPath = [bar, baz], lexicalDeclaration = foo.
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
   * The scopes from the root to scope of the lexical declaration.
   */
  fullSymbolPath: TScope[];

  /**
   * The scopes from the root to the scope of the reference.
   */
  fullReferencePath: TScope[];

  /**
   * The lexical scope which contains both the reference and the lexical
   * declaration. Undefined when they do not share a common scope.
   */
  commonScope: TScope | undefined;

  /**
   * Member symbols from the lexical declaration (exclusive) to the resolved symbol
   * (inclusive). Empty when resolving a non-member symbol.
   */
  memberPath: TSymbol[];
}

/**
 * Describes a member in a member access chain, tracking both the symbol
 * and whether this specific member was accessed via a memberRefkey.
 */
export interface MemberDescriptor {
  symbol: OutputSymbol;
  isMemberAccess: boolean;
}

/**
 * A callable interface invoked by the binder when two or more symbols in the
 * same scope share a name. The resolver mutates symbol names to eliminate
 * conflicts (e.g., appending `_2`, `_3`).
 *
 * @remarks
 * The resolver is called with the shared `name` and all symbols in the scope
 * that have that original name. Rename a symbol by assigning to `symbol.name`.
 * Symbols with `ignoreNameConflict: true` are excluded. The default resolver
 * keeps the first symbol unchanged and renames subsequent ones
 * `originalName + "_2"`, `originalName + "_3"`, etc.
 *
 * Assigned names pass through the active name policy before being stored;
 * design suffixes to produce the correct final name after policy
 * transformation, or set `ignoreNamePolicy` on the symbol after resolution.
 *
 * Conflict detection is keyed on `originalName`
 * (see {@link OutputSymbol.originalName}). Symbols that differ in original
 * name but normalize to the same policy-applied name are never detected as
 * conflicting.
 *
 * @example
 * ```ts
 * const resolver: NameConflictResolver = (name, symbols) => {
 *   for (let i = 1; i < symbols.length; i++) {
 *     symbols[i].name = symbols[i].originalName + "_" + (i + 1);
 *   }
 * };
 * ```
 */
export interface NameConflictResolver {
  (name: string, symbols: OutputSymbol[]): void;
}

/**
 * The context for a member resolution. This is used to properly resolve a
 * member in the MemberResolver.
 */
export interface MemberResolutionContext<TScope extends OutputScope> {
  /**
   * The scopes that the member reference occurred in.
   */
  referencePath: TScope[];

  /**
   * Whether we are using member access e.g. via `memberRefkey`.
   * This is true when the member was resolved using a memberRefkey,
   * which may carry additional metadata about the member access in the future.
   */
  isMemberAccess: boolean;
}

/**
 * A callback that performs access-control filtering during member resolution.
 *
 * @remarks
 *
 * When provided to {@link ResolveDeclarationByKeyOptions}, it entirely replaces
 * the default checks (ownership assertion and `isMemberSymbol` assertion).
 *
 * **Contract:**
 * - **Return `void`** to accept the member.
 * - **Throw an error** to reject the member — the error propagates to the caller,
 *   matching the behavior of the default checks.
 *
 * @example
 * ```ts
 * const resolver: MemberResolver<MyScope, MySymbol> = (owner, member, ctx) => {
 *   if (member.isPrivate && !ctx.isMemberAccess) {
 *     throw new Error(`${member.name} is not accessible here`);
 *   }
 * };
 * ```
 *
 * @see {@link MemberResolutionContext} for available context properties.
 */
export interface MemberResolver<
  TScope extends OutputScope,
  TSymbol extends OutputSymbol,
> {
  (
    owner: TSymbol,
    member: TSymbol,
    context: MemberResolutionContext<TScope>,
  ): void;
}
export interface ResolveDeclarationByKeyOptions<
  TScope extends OutputScope,
  TSymbol extends OutputSymbol,
> {
  memberResolver?: MemberResolver<TScope, TSymbol>;
}
export interface BinderOptions {
  nameConflictResolver?: NameConflictResolver;
}

/**
 * Construct a scope instance and register it with devtools. Prefer this over
 * calling `new` directly so that debugging tools can track the scope.
 *
 * @remarks
 *
 * Inside a component, obtain the current scope with `useScope()` and pass it
 * as the `parentScope` constructor argument so the new scope is wired into
 * the scope tree.
 *
 * @example
 * ```tsx
 * function MyScope(props) {
 *   const parentScope = useScope();
 *   const scope = createScope(MyScope, "scope-name", parentScope);
 *   return <Scope value={scope}>{props.children}</Scope>;
 * }
 * ```
 *
 * @param ctor - The scope subclass constructor.
 * @param args - Positional arguments forwarded directly to the scope
 * constructor; see {@link OutputScope} for the base-class constructor
 * signature.
 */
export function createScope<TScope extends OutputScope, Args extends unknown[]>(
  ctor: new (...args: Args) => TScope,
  ...args: Args
): TScope {
  const scope = new ctor(...args);
  debug.symbols.registerScope(scope);
  return scope;
}

/**
 * Construct a symbol instance and register it with devtools. Prefer this over
 * calling `new` directly so that debugging tools can track the symbol.
 *
 * @remarks
 *
 * Binder registration (via `useBinder()` + `notifySymbolCreated()`) happens
 * inside the `OutputSymbol` constructor regardless of whether you use
 * `createSymbol` or `new`. This helper only adds devtools registration.
 *
 * @param ctor - The symbol subclass constructor.
 * @param args - Arguments forwarded to the constructor.
 */
export function createSymbol<
  TSymbol extends OutputSymbol,
  Args extends unknown[],
>(ctor: new (...args: Args) => TSymbol, ...args: Args): TSymbol {
  const symbol = new ctor(...args);
  debug.symbols.registerSymbol(symbol);
  return symbol;
}

export function createOutputBinder(options: BinderOptions = {}): Binder {
  const binder: Binder = {
    resolveDeclarationByKey,
    getSymbolForRefkey,
    notifyScopeCreated,
    notifySymbolCreated,
    notifySymbolDeleted,
    notifySymbolRefkeysChanged,
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
    debug.symbols.unregisterSymbol(symbol);
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
    targetDeclarationBase: TSymbol,
  ): ResolutionResult<TScope, TSymbol> {
    const { memberPath: targetMemberPath, scopeChain: targetChain } =
      scopeAndMemberChain<TScope, TSymbol>(targetDeclarationBase);

    let targetLexicalDeclaration =
      targetMemberPath && targetMemberPath.length > 0 ?
        (targetMemberPath[0].ownerSymbol! as TSymbol)
      : targetDeclarationBase;
    // when we are resolving from a scope which is a member scope and might have
    // member scope parents, and any symbols in the member path are members of
    // the member scope's owner symbol (i.e., those symbols are in scope where
    // the reference is made), we replace the target member path with an entry
    // on the scope chain.

    // So, first we find all the owner symbols for any member scopes in scope
    // for the reference.
    const referenceChain = scopeChain(currentScope);

    const inScopeSymbols = new Map<TSymbol, TScope>();
    for (const scope of referenceChain) {
      if (scope.isMemberScope) {
        inScopeSymbols.set(scope.ownerSymbol! as TSymbol, scope);
      }
    }

    // then if the lexical declaration symbol's members are in scope, remove the
    // symbol from the member path and add its corresponding member scope to the
    // target chain.
    while (
      targetMemberPath.length > 0 &&
      inScopeSymbols.has(targetLexicalDeclaration)
    ) {
      targetChain.push(inScopeSymbols.get(targetLexicalDeclaration)!);
      targetLexicalDeclaration = targetMemberPath.shift()!;
    }

    // Now we replace any scopes in the target chain with corresponding scopes
    // from the reference chain.
    for (const [index, scope] of targetChain.entries()) {
      if (inScopeSymbols.has(scope.ownerSymbol! as TSymbol)) {
        targetChain[index] = inScopeSymbols.get(scope.ownerSymbol! as TSymbol)!;
      }
    }

    // Next we look for member scopes in the target chain that correspond to
    // member scopes in the reference chain. We splice the reference chain into
    // the target chain at that point. This ensures that we establish the proper
    // common scope and path up/down even if the reference chain has additional
    // scopes above it (e.g. a scope for the current source file).
    const commonMemberContainer = targetChain.findIndex(
      (scope) =>
        scope.isMemberScope && inScopeSymbols.has(scope.ownerSymbol as TSymbol),
    );

    if (commonMemberContainer > -1) {
      const sourceLocation = referenceChain.findIndex(
        (scope) =>
          scope.isMemberScope &&
          scope.ownerSymbol === targetChain[commonMemberContainer].ownerSymbol,
      );

      // source location is guaranteed to exist at this point.
      targetChain.splice(
        0,
        commonMemberContainer + 1,
        ...referenceChain.slice(0, sourceLocation + 1),
      );
    }

    // Now that we have the target chain and scopes, we can determine the common
    // scopes and paths.
    let diffStart = 0;
    while (
      targetChain[diffStart] &&
      referenceChain[diffStart] &&
      targetChain[diffStart] === referenceChain[diffStart]
    ) {
      diffStart++;
    }
    const pathUp = referenceChain.slice(diffStart);
    const pathDown = targetChain.slice(diffStart);
    const commonScope = targetChain[diffStart - 1] ?? undefined;

    return {
      pathUp,
      pathDown,
      memberPath: targetMemberPath,
      commonScope,
      symbol: targetDeclarationBase,
      lexicalDeclaration: targetLexicalDeclaration,
      fullSymbolPath: targetChain,
      fullReferencePath: referenceChain,
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
      memberPath: [] as TSymbol[],
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

  function getSymbolForRefkey<TSymbol extends OutputSymbol = OutputSymbol>(
    refkeyable: Refkeyable,
  ) {
    const refkey = toRefkey(refkeyable);

    if (waitingDeclarations.has(refkey)) {
      return waitingDeclarations.get(refkey)! as ShallowRef<TSymbol>;
    }

    let symbolRef: ShallowRef<TSymbol | undefined>;

    if (isMemberRefkey(refkey)) {
      const baseSymbolRef: ShallowRef<TSymbol | undefined> =
        getSymbolForRefkey<TSymbol>(refkey.base);
      const memberSymbolRef: ShallowRef<TSymbol | undefined> =
        getMemberSymbolFromMemberRefkey(refkey) as ShallowRef<
          TSymbol | undefined
        >;

      symbolRef = computed(() => {
        // even though we don't necessarily need the base symbol to be available
        // yet (the member symbol might already be declared on a type), we wait
        // to resolve the member refkey until the base symbol is available.
        const baseSymbol = baseSymbolRef.value;
        const memberSymbol = memberSymbolRef.value;
        if (!baseSymbol || !memberSymbol) {
          return undefined;
        }

        return memberSymbol;
      }) as ShallowRef<TSymbol | undefined>;
    } else {
      symbolRef = shallowRef<TSymbol | undefined>();
    }

    waitingDeclarations.set(refkey, symbolRef);
    if (knownDeclarations.has(refkey)) {
      symbolRef.value = knownDeclarations.get(refkey) as TSymbol;
    }
    return symbolRef;
  }

  /**
   * There are two ways to reference a member symbol - directly via its refkey,
   * and via a member refkey. In the former case, we just find the member
   * symbol, and then compute its path directly from there. In hte latter case,
   * we need to find the base of the member expression, and then add the members
   * from the (possibly nested) member refkey to result.
   */
  function resolveDeclarationByKey<
    TScope extends OutputScope = OutputScope,
    TSymbol extends OutputSymbol = OutputSymbol,
  >(
    currentScope: TScope | undefined,
    refkey: Refkey,
    options: ResolveDeclarationByKeyOptions<TScope, TSymbol> = {},
  ): ShallowRef<ResolutionResult<TScope, TSymbol> | undefined> {
    const resolvedSymbol = getSymbolForRefkey(refkey);

    return computed(() => {
      debug.trace(
        TracePhase.resolve.pending,
        () => `Resolving ${formatRefkeys(refkey)}.`,
      );
      const symbol = resolvedSymbol.value as TSymbol;
      if (!symbol) {
        debug.trace(
          TracePhase.resolve.failure,
          () => `No symbol for ${formatRefkeys(refkey)}.`,
        );
        return undefined;
      }
      debug.trace(
        TracePhase.resolve.pending,
        () =>
          `${formatRefkeys(refkey)} resolved to ${formatSymbolName(symbol)}.`,
      );
      if (symbol.isTransient) {
        debug.trace(
          TracePhase.resolve.failure,
          () => `Symbol ${formatSymbolName(symbol)} is transient.`,
        );
        return undefined;
      }

      const chain = scopeChain(symbol.scope);
      if (chain.some((scope) => scope.isTransient)) {
        debug.trace(
          TracePhase.resolve.failure,
          () => `Symbol ${formatSymbolName(symbol)} is in a transient scope.`,
        );
        return undefined;
      }

      let result: ResolutionResult<TScope, TSymbol>;
      let memberDescriptorsFromRefkey: MemberDescriptor[];

      if (isMemberRefkey(refkey)) {
        memberDescriptorsFromRefkey = getMemberPathFromRefkey(refkey);

        result = buildResult(
          currentScope,
          memberDescriptorsFromRefkey[0].symbol as TSymbol,
        );
      } else {
        memberDescriptorsFromRefkey = [];
        result = buildResult(currentScope, symbol);
      }

      // When we have member descriptors, this first entry is already part of the result due to passing it
      // to buildResult above, so we don't need it here.
      const newMemberPathDescriptors = memberDescriptorsFromRefkey.slice(1);
      const allDescriptors = [
        ...result.memberPath.map((s) => ({ symbol: s, isMemberAccess: false })),
        ...newMemberPathDescriptors,
      ];

      // update the member path and resolved symbol from our member descriptors
      // (if we have them)
      if (memberDescriptorsFromRefkey.length > 0) {
        for (const descriptor of newMemberPathDescriptors) {
          result.memberPath.push(descriptor.symbol as TSymbol);
        }
        result.symbol = memberDescriptorsFromRefkey.at(-1)!.symbol as TSymbol;
      }

      // Fast path: non-member refkeys have no member descriptors to validate.
      // The inner computed below only serves to defer type-availability checks
      // on member symbols; for non-member refkeys allDescriptors is empty so
      // there is nothing to validate — skip the allocation entirely.
      if (allDescriptors.length === 0) {
        debug.trace(
          TracePhase.resolve.success,
          () =>
            `${formatRefkeys(refkey)} successfully resolved to ${formatSymbolName(symbol)}.`,
        );
        return result;
      }

      // a subcomputed here ensures we don't lose the progress above When
      // we fail to resolve because a type isn't available yet.
      return computed(() => {
        // resolve each member in the member path
        let currentBase = result.lexicalDeclaration;

        for (const descriptor of allDescriptors) {
          const member = descriptor.symbol as TSymbol;
          if (currentBase.isTyped && !currentBase.hasTypeSymbol) {
            debug.trace(
              TracePhase.resolve.pending,
              () =>
                `${formatRefkeys(refkey)} needs type information from a parent type.`,
            );
            // waiting for type
            return undefined;
          }

          resolveMember(currentBase, member, options.memberResolver, {
            referencePath: result.fullReferencePath,
            isMemberAccess: descriptor.isMemberAccess,
          });

          currentBase = member;
        }

        debug.trace(
          TracePhase.resolve.success,
          () =>
            `${formatRefkeys(refkey)} successfully resolved to ${formatSymbolName(symbol)}.`,
        );
        return result;
      }).value;
    });
  }

  /**
   * Extracts member descriptors from a refkey, tracking which members
   * were accessed via memberRefkey for proper member resolution context.
   */
  function getMemberPathFromRefkey(refkey: Refkey): MemberDescriptor[] {
    if (isMemberRefkey(refkey)) {
      return [
        ...getMemberPathFromRefkey(refkey.base),
        {
          symbol: getMemberSymbolFromMemberRefkey(refkey).value!,
          isMemberAccess: true,
        },
      ];
    }

    return [
      {
        symbol: getSymbolForRefkey(refkey).value!,
        isMemberAccess: false,
      },
    ];
  }

  function getMemberSymbolFromMemberRefkey(
    refkey: MemberRefkey,
  ): Ref<OutputSymbol | undefined> {
    if (typeof refkey.member === "string") {
      return computed(() => {
        const baseSymbol = getSymbolForRefkey(refkey.base).value;
        if (!baseSymbol) {
          return undefined;
        }

        return baseSymbol.resolveMemberByName(refkey.member as string);
      });
    } else {
      return getSymbolForRefkey(refkey.member);
    }
  }

  function resolveMember(
    base: OutputSymbol,
    member: OutputSymbol,
    memberResolver: MemberResolver<any, any> | undefined,
    context: MemberResolutionContext<any>,
  ) {
    if (memberResolver) {
      memberResolver(base, member, context);
    } else {
      // default member resolution
      if (!member.isMemberSymbol) {
        throw new Error(`${formatSymbolName(member)} is not a member symbol.`);
      }

      const memberOwner = base.hasTypeSymbol ? base.type : base.dealias();
      if (member.ownerSymbol !== memberOwner) {
        throw new Error(
          `${formatSymbolName(
            member,
          )} is not a member of ${formatSymbolName(base)}.`,
        );
      }
    }
  }

  function notifySymbolCreated(symbol: OutputSymbol): void {
    updateRefkeys(symbol, [], untrack(() => symbol.refkeys));
  }

  function notifySymbolRefkeysChanged(
    symbol: OutputSymbol,
    oldRefkeys: Refkey[],
    newRefkeys: Refkey[],
  ): void {
    updateRefkeys(symbol, oldRefkeys, newRefkeys);
  }

  function updateRefkeys(
    symbol: OutputSymbol,
    oldRefkeys: Refkey[],
    newRefkeys: Refkey[],
  ): void {
    if (newRefkeys.length > 0) {
      debug.trace(
        TracePhase.resolve.pending,
        () => `Notifying resolutions for ${formatRefkeys(newRefkeys)}.`,
      );
    }

    for (const refkey of oldRefkeys) {
      if (!newRefkeys.includes(refkey)) {
        knownDeclarations.delete(refkey);
        if (waitingDeclarations.has(refkey)) {
          waitingDeclarations.get(refkey)!.value = undefined;
        }
      }
    }

    for (const refkey of newRefkeys) {
      knownDeclarations.set(refkey, symbol);
      if (waitingDeclarations.has(refkey)) {
        waitingDeclarations.get(refkey)!.value = symbol;
      }

      const scope = symbol.scope;
      if (!scope) {
        continue;
      }

      const waitingScope = waitingSymbolNames.get(scope);
      if (waitingScope) {
        const waitingName = waitingScope.get(symbol.name);
        if (waitingName) {
          waitingName.value = symbol;
        }
      }
    }
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
>(
  refkey: Refkey,
  options: ResolveDeclarationByKeyOptions<TScope, TSymbol> = {},
): Ref<ResolutionResult<TScope, TSymbol>> {
  const scope = useScope();
  const memberScope = useMemberContext();
  const binder = scope?.binder ?? memberScope?.ownerSymbol.binder;

  if (!binder) {
    throw new Error("Can't resolve refkey without a binder");
  }

  const result = binder.resolveDeclarationByKey(
    scope as TScope,
    refkey,
    options,
  ) as any;

  let diagnosticHandle: DiagnosticHandle | null = null;

  effect(
    () => {
      if (result.value === undefined) {
        // Emit diagnostic for this specific reference site
        if (!diagnosticHandle) {
          diagnosticHandle = emitDiagnostic({
            severity: "warning",
            message: `Unresolved refkey: ${inspectRefkey(refkey)}`,
          });
        }
      } else {
        // Dismiss diagnostic when resolved
        if (diagnosticHandle) {
          diagnosticHandle.dismiss();
          diagnosticHandle = null;
        }
      }
    },
    undefined,
    {
      debug: {
        name: `binder:resolve:${inspectRefkey(refkey)}`,
        type: "binder",
      },
    },
  );

  onCleanup(() => {
    if (diagnosticHandle) {
      diagnosticHandle.dismiss();
      diagnosticHandle = null;
    }
  });

  return result;
}

/**
 * Get a ref to the symbol for the given refkey using the current binder. The
 * value of the ref will be undefined when no symbol with that refkey has been
 * created.
 *
 * @remarks
 *
 * This API may return a ref for undefined, but that does not mean that the symbol is
 * not found. The symbol you're looking for may not have been declared yet. When the symbol
 * is declared, the ref will be updated with the symbol.
 */
export function symbolForRefkey(refkey: Refkeyable) {
  const binder = useBinder();
  if (!binder) {
    throw new Error("Can't resolve refkey without a binder");
  }
  return binder.getSymbolForRefkey(refkey);
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

/**
 * An object that can register symbols into a binder. Pass instances to the
 * `externals` prop of `<Output>` to make library symbols resolvable.
 *
 * @remarks
 * `SymbolCreator` is a low-level core mechanism for eager symbol registration.
 * The recommended pattern for language packages is lazy self-registration:
 * implement `[TO_SYMBOL]()` on descriptors to call `useBinder()`, create and
 * cache symbols per binder via a `WeakMap`, and register them into the
 * appropriate scope automatically. This approach does not require `externals`.
 * See the C# package's `createLibrary()` for a reference implementation.
 *
 * See {@link TO_SYMBOL} and {@link REFKEYABLE}.
 */
export interface SymbolCreator {
  [createSymbolsSymbol](binder: Binder): void;
}
