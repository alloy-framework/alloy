import { Children, For } from "@alloy-js/core";

/**
 * Props for {@link DecoratorList}.
 */
export interface DecoratorListProps {
  /**
   * Decorators rendered top-to-bottom. The first entry is rendered topmost,
   * which (by Python's bottom-up application order) is the outermost decorator
   * — i.e. it is applied **last** and wraps the result of everything below it.
   *
   * Falsy entries (other than `0`) are skipped, so conditional decorators can
   * be written inline as `condition && <Decorator/>`.
   */
  decorators?: Children[];
}

/**
 * Renders a list of decorators, one per line, with a single hardline between
 * adjacent decorators and a trailing hardline only when at least one decorator
 * is present.
 *
 * This is the canonical decorator-rendering primitive for method-, function-,
 * and property-like components. Centralizing it ensures the decorator stack
 * composes consistently — no stray blank lines between decorators, and no
 * trailing newline when the list is empty.
 *
 * @example
 * ```tsx
 * <DecoratorList decorators={[code`@field_validator("name")`, "@classmethod"]} />
 * ```
 * Renders:
 * ```python
 * @field_validator("name")
 * @classmethod
 * ```
 *
 * @remarks
 * Internal helper, not exported from the package. Used by
 * `MethodDeclarationBase`, `ClassMethodDeclaration`, `StaticMethodDeclaration`,
 * and `PropertyDeclaration` to render their `decorators` prop above the
 * intrinsic decorator (`@classmethod`, `@staticmethod`, `@property`) or `def`.
 */
export function DecoratorList(props: DecoratorListProps) {
  return (
    <For each={props.decorators ?? []} hardline ender={<hbr />} skipFalsy>
      {(dec) => dec}
    </For>
  );
}
