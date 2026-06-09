export interface SuppressDirectiveProps {
  /** The diagnostic code to suppress. */
  code: string;
  /** A message justifying the suppression. */
  message: string;
}

/**
 * A TypeSpec `#suppress` directive that suppresses a specific diagnostic.
 *
 * @example
 * ```tsx
 * <SuppressDirective code="deprecated" message="Not ready to migrate yet" />
 * ```
 * This will produce:
 * ```typespec
 * #suppress "deprecated" "Not ready to migrate yet"
 * ```
 */
export function SuppressDirective(props: SuppressDirectiveProps) {
  return (
    <>
      <group>
        #suppress "{props.code}" "{props.message}"
      </group>
      <hbr />
    </>
  );
}

export interface DeprecatedDirectiveProps {
  /** The deprecation message. */
  message: string;
}

/**
 * A TypeSpec `#deprecated` directive that marks a declaration as deprecated.
 *
 * @example
 * ```tsx
 * <DeprecatedDirective message="Use NewUser instead" />
 * ```
 * This will produce:
 * ```typespec
 * #deprecated "Use NewUser instead"
 * ```
 */
export function DeprecatedDirective(props: DeprecatedDirectiveProps) {
  return (
    <>
      <group>#deprecated "{props.message}"</group>
      <hbr />
    </>
  );
}
