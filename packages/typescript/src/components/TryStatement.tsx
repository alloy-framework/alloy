import { onCleanup, type Children } from "@alloy-js/core";
import { useTSNamePolicy } from "../name-policy.js";
import type { ParameterDescriptor } from "../parameter-descriptor.js";
import { createValueSymbol, TSSymbolFlags } from "../symbols/index.js";
import { BlockScope } from "./BlockScope.jsx";

export interface TryStatementProps {
  children: Children;
}

/**
 * A try statement.
 *
 * @example
 * ```tsx
 * <TryStatement>
 *   // risky operation
 * </TryStatement>
 * <CatchClause parameter="error">
 *   console.error(error);
 * </CatchClause>
 * ```
 * renders to
 * ```ts
 * try {
 *   // risky operation
 * } catch (error) {
 *   console.error(error);
 * }
 * ```
 */
export function TryStatement(props: TryStatementProps) {
  return (
    <>
      try <BlockScope>{props.children}</BlockScope>
    </>
  );
}

export interface CatchClauseProps {
  parameter?: ParameterDescriptor | string;
  children: Children;
}

/**
 * A catch clause of a try statement.
 *
 * @example
 * ```tsx
 * <CatchClause parameter={{ name: "error", type: "unknown" }}>
 *   console.error(error);
 * </CatchClause>
 * ```
 * renders to
 * ```ts
 * catch (error: unknown) {
 *   console.error(error);
 * }
 * ```
 *
 * @remarks
 * The parameter can be omitted for a catch-all clause, or provided as a string
 * or {@link ParameterDescriptor}. When using a descriptor, a refkey can be provided
 * to reference the parameter within the catch block. Note that TypeScript only allows
 * `any` or `unknown` as catch parameter types.
 */
export function CatchClause(props: CatchClauseProps) {
  if (!props.parameter) {
    return (
      <>
        {" "}
        catch <BlockScope>{props.children}</BlockScope>
      </>
    );
  }

  const namePolicy = useTSNamePolicy();
  const paramDesc =
    typeof props.parameter === "string" ?
      { name: props.parameter }
    : props.parameter;

  const symbol = createValueSymbol(paramDesc.name, {
    refkeys: paramDesc.refkey,
    tsFlags: TSSymbolFlags.ParameterSymbol,
    metadata: paramDesc.metadata,
    namePolicy: namePolicy.for("parameter"),
  });

  onCleanup(() => {
    symbol.delete();
  });

  const param = (
    <>
      {symbol.name}
      {paramDesc.type && <>: {paramDesc.type}</>}
    </>
  );

  return (
    <>
      {" "}
      catch ({param}) <BlockScope>{props.children}</BlockScope>
    </>
  );
}

export interface FinallyClauseProps {
  children: Children;
}

/**
 * A finally clause of a try statement.
 *
 * @example
 * ```tsx
 * <TryStatement>
 *   // risky operation
 * </TryStatement>
 * <FinallyClause>
 *   // cleanup
 * </FinallyClause>
 * ```
 * renders to
 * ```ts
 * try {
 *   // risky operation
 * } finally {
 *   // cleanup
 * }
 * ```
 */
export function FinallyClause(props: FinallyClauseProps) {
  return (
    <>
      {" "}
      finally <BlockScope>{props.children}</BlockScope>
    </>
  );
}
