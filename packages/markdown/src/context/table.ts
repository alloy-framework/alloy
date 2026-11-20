import { createContext, useContext } from "@alloy-js/core";

/** Whether inline Markdown is being rendered inside a table cell. */
export const TableContext = createContext<boolean>(false);

export function useTableContext(): boolean {
  return useContext(TableContext) === true;
}
