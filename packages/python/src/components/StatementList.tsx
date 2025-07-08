import { Children, List } from "@alloy-js/core";

export interface StatementListProps {
  children: Children;
}

/**
 * A Python statement list, which is a list of statements that can be rendered
 * in a Python source file.
 *
 * @example
 * ```tsx
 * <StatementList>
 *   <FunctionDeclaration name="test" />
 *   <VariableDeclaration name="x" value={42} />
 * </StatementList>
 * ```
 * renders to
 * ```py
 * def test():
 *   pass
 *
 * x = 42
 * ```
 */
export function StatementList(props: StatementListProps) {
  return <List hardline>{props.children}</List>;
}
