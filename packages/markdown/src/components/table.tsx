import {
  code,
  createContext,
  For,
  List,
  TextTransform,
  useContext,
  type Children,
} from "@alloy-js/core";

import { renderTableCell } from "../table-cell.js";

export interface TableColumn {
  /** Inline Markdown for the column heading. */
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

const TableContext = createContext<TableProps>();

/**
 * Render a GFM table with a header and optional body rows.
 *
 * Cells support literal text and composed inline Markdown. Physical newlines
 * become inline HTML breaks; block content does not retain block semantics.
 */
export function Table(props: TableProps) {
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
      <TableContext.Provider value={props}>
        <List>
          <TableRow>
            <For each={props.columns} joiner="">
              {(column) => <TableCell>{column.header}</TableCell>}
            </For>
          </TableRow>
          {code`| ${delimiters.join(" | ")} |`}
          {props.children}
        </List>
      </TableContext.Provider>
    );
  };
}

export interface TableRowProps {
  /** TableCell components, optionally composed with fragments or For. */
  children?: Children;
}

/** Render a single row, validating its cell count against the table's columns. */
export function TableRow(props: TableRowProps) {
  const table = useContext(TableContext);
  if (!table) {
    throw new Error("TableRow must be rendered inside a Table.");
  }

  return (
    <TextTransform
      transform={(text) => {
        const cells = text.split("|").length - 2;
        if (cells !== table.columns.length) {
          throw new Error(
            `TableRow requires ${table.columns.length} cell(s), received ${cells}.`,
          );
        }
        // Cell content already encodes breaks; these are layout between cells.
        return text.replace(/\r\n?|\n/g, "");
      }}
    >
      {code`|${props.children}`}
    </TextTransform>
  );
}

export type TableCellProps =
  | {
      /** Literal text. Markdown punctuation is displayed as written. */
      text: string | number;
      children?: never;
    }
  | {
      /** Composed inline Markdown. Raw HTML is displayed literally. */
      children?: Children;
      text?: never;
    };

/**
 * Render a cell without allowing its contents to introduce table columns.
 *
 * Inline Markdown is serialized to inline HTML with entity-encoded punctuation.
 * Code spans retain literal punctuation, including pipes and backslashes.
 */
export function TableCell(props: TableCellProps) {
  return code` ${(
    <TextTransform
      transform={(text) => renderTableCell(text, props.text !== undefined)}
    >
      {props.text ?? props.children}
    </TextTransform>
  )} |`;
}
