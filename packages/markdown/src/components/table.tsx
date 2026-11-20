import {
  childrenArray,
  code,
  For,
  List,
  memo,
  type Children,
} from "@alloy-js/core";

import { TableContext } from "../context/table.js";

export interface TableColumn {
  /** Column heading. Direct strings are escaped; JSX is passed through. */
  header: Children;
  /** Alignment of the column's contents. */
  align?: "left" | "center" | "right";
}

export interface TableProps {
  /** Columns in output order. At least one column is required. */
  columns: readonly TableColumn[];
  /** TableRow components, with one TableCell per column. */
  children?: Children;
}

/**
 * Render a GFM table with a header and optional body rows.
 *
 * Direct string cells are escaped, with newlines converted to inline HTML
 * breaks. JSX output is not inspected; callers own its escaping and layout.
 */
export function Table(props: TableProps) {
  const rows = memo(() => childrenArray(() => props.children));
  return () => {
    if (props.columns.length === 0) {
      throw new Error("Table requires at least one column.");
    }

    const delimiters = props.columns.map((column) =>
      column.align === "center"
        ? ":---:"
        : column.align === "right"
          ? "---:"
          : column.align === "left"
            ? ":---"
            : "---",
    );

    return (
      <List>
        <TableRow>
          <For each={props.columns} joiner="">
            {(column) => <TableCell>{column.header}</TableCell>}
          </For>
        </TableRow>
        {code`| ${delimiters.join(" | ")} |`}
        <List>{rows}</List>
      </List>
    );
  };
}

export interface TableRowProps {
  /** TableCell components. Use an empty joiner when composing cells with For. */
  children?: Children;
}

/** Render a single row. Provide one TableCell per column. */
export function TableRow(props: TableRowProps) {
  return code`|${props.children}`;
}

export interface TableCellProps {
  /** Direct strings are escaped as literal text. JSX is passed through. */
  children?: Children;
}

/**
 * Escape direct string children without inspecting rendered JSX output.
 * Context-aware Markdown components can escape their own pipes. Other JSX
 * remains uninspected; callers own its escaping and physical line breaks.
 */
export function TableCell(props: TableCellProps) {
  const content = memo(() =>
    childrenArray(() => props.children).map((child) =>
      typeof child === "string" ? escapeTableText(child) : child,
    ),
  );
  return (
    <TableContext.Provider value={true}>
      {code` ${content} |`}
    </TableContext.Provider>
  );
}

function escapeTableText(text: string): string {
  return text.replace(/[&<>\\`*_[\]~|]|\r\n?|\n/g, (character) => {
    switch (character) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "\r":
      case "\n":
      case "\r\n":
        return "<br>";
      default:
        return `\\${character}`;
    }
  });
}
