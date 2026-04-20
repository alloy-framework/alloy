import { type Db, type Opts } from "../types.js";

export function runQuery(db: Db, args: string[], opts: Opts) {
  const sql = args.join(" ");
  if (!sql) {
    console.error("Usage: alloy-trace query <sql>");
    process.exit(1);
  }

  try {
    const stmt = db.prepare(sql);
    const rows = stmt.all() as any[];

    if (opts.json) {
      for (const row of rows.slice(0, opts.limit)) {
        console.log(JSON.stringify(row));
      }
      return;
    }

    if (rows.length === 0) {
      console.log("(no results)");
      return;
    }

    const limit = opts.limit ?? 100;
    const display = rows.slice(0, limit);
    const columns = Object.keys(display[0]);

    // Calculate column widths
    const widths = columns.map((col) =>
      Math.max(
        col.length,
        ...display.map((row) => String(row[col] ?? "").length),
      ),
    );

    // Clamp widths to 60
    const clampedWidths = widths.map((w) => Math.min(w, 60));

    // Print header
    console.log(
      columns.map((col, i) => col.padEnd(clampedWidths[i])).join("  "),
    );
    console.log(clampedWidths.map((w) => "─".repeat(w)).join("  "));

    // Print rows
    for (const row of display) {
      console.log(
        columns
          .map((col, i) =>
            String(row[col] ?? "")
              .padEnd(clampedWidths[i])
              .slice(0, clampedWidths[i]),
          )
          .join("  "),
      );
    }

    if (rows.length > limit) {
      console.log(
        `\n(${rows.length - limit} more rows, use --limit to show more)`,
      );
    }
  } catch (e: any) {
    console.error(`SQL error: ${e.message}`);
    process.exit(1);
  }
}
