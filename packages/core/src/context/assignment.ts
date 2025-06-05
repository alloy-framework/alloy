import {
  ComponentContext,
  createNamedContext,
  useContext,
} from "../context.js";
import type { OutputSymbol } from "../symbols/output-symbol.js";

export interface AssignmentContext {
  /**
   * The symbol that is the target of the current assignment.
   */
  target: OutputSymbol;

  /**
   * Whether the symbol has had a value assigned to it. Once the symbol has been
   * assigned, subsequent assignments will have no effect.
   */
  isAssigned: boolean;
}

/**
 * AssignmentContext provides the symbol that is the target of the current
 * assignment.
 *
 * @remarks
 *
 * When a variable is declared, the symbol for the variable doesn't yet know
 * what value it will hold, because that depends on the assignment to the
 * variable in the variable declaration's initializer. This context provides the
 * symbol that is the target of the current assignment, so that children of an
 * assignment or initializer can provide additional symbol information.
 *
 * For example, when assigning an object value expression to a variable, the
 * object value expression should use assignment context to provide the member
 * symbols for the object value's properties.
 */
export const AssignmentContext: ComponentContext<AssignmentContext> =
  createNamedContext("Assignment");

/**
 * Creates a new {@link (AssignmentContext:interface)}.
 *
 * @param target - The symbol that is the target of the current assignment.
 * @returns A new {@link (AssignmentContext:interface)}.
 */
export function createAssignmentContext(
  target: OutputSymbol,
): AssignmentContext {
  return {
    isAssigned: false,
    target,
  };
}

/**
 * Get the symbol being defined.
 *
 * @returns The symbol currently being defined, or `undefined` if no symbol is
 * being defined.
 */
export function getAssignmentSymbol(): OutputSymbol | undefined {
  const assignmentContext = useContext(AssignmentContext);
  if (assignmentContext) {
    return assignmentContext.target;
  }
  return undefined;
}
