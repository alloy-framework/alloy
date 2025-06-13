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
   * This scope is transient, and only exists to be merged with other scopes.
   */
  Transient = 1 << 2,

  /**
   * This scope is a member scope. Scopes with this flag will have an `owner`
   * property that points to the symbol whose member this scope holds.
   */
  MemberScope = StaticMemberScope | InstanceMemberScope,
}

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
   * Transient symbols are not added to symbol tables and do not create
   * referencable refkeys. They are used for temporary symbols that are intended
   * to be used to calculate other symbols.
   */
  Transient = 1 << 4,

  /**
   * This symbol aliases another symbol. Only its name, flags, and scope are
   * stored in this symbol. Otherwise, everything else is located on the alias
   * target.
   */
  Alias = 1 << 5,

  /**
   * Whether this is an instance member or static member of another symbol.
   */
  Member = InstanceMember | StaticMember,
}
