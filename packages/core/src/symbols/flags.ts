/**
 * Flags that describe an output scope.
 */
export enum OutputScopeFlags {
  None = 0,

  /**
   * This scope is transient, and only exists to be merged with other scopes.
   */
  Transient = 1 << 0,
}

/**
 * Flags that describe an output symbol.
 */
export enum OutputSymbolFlags {
  None = 0,

  /**
   * Transient symbols are not added to symbol tables and do not create
   * referencable refkeys. They are used for temporary symbols that are intended
   * to be used to calculate other symbols.
   */
  Transient = 1 << 0,

  /**
   * This symbol aliases another symbol. Only its name, flags, and scope are
   * stored in this symbol. Otherwise, everything else is located on the alias
   * target.
   */
  Alias = 1 << 1,
}
