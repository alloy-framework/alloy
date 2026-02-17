import { DatabaseSync } from "node:sqlite";

const SCHEMA = `
  CREATE TABLE effects (
    id INTEGER PRIMARY KEY, name TEXT, type TEXT, context_id INTEGER,
    owner_context_id INTEGER, component TEXT, source_file TEXT,
    source_line INTEGER, source_col INTEGER, seq INTEGER
  );
  CREATE TABLE refs (
    id INTEGER PRIMARY KEY, kind TEXT, label TEXT,
    created_by_effect_id INTEGER, source_file TEXT,
    source_line INTEGER, source_col INTEGER, seq INTEGER
  );
  CREATE TABLE edges (
    seq INTEGER PRIMARY KEY, type TEXT NOT NULL, effect_id INTEGER NOT NULL,
    ref_id INTEGER, target_id INTEGER, target_key TEXT, caused_by INTEGER,
    source_file TEXT, source_line INTEGER
  );
  CREATE TABLE scheduler_jobs (
    seq INTEGER PRIMARY KEY, event TEXT NOT NULL, effect_id INTEGER,
    immediate INTEGER, queue_size INTEGER
  );
  CREATE TABLE scheduler_flushes (seq INTEGER PRIMARY KEY, jobs_run INTEGER);
  CREATE TABLE render_nodes (
    id INTEGER PRIMARY KEY, parent_id INTEGER, kind TEXT NOT NULL,
    name TEXT, props TEXT, source_file TEXT, source_line INTEGER,
    source_col INTEGER, context_id INTEGER, value TEXT, seq INTEGER
  );
  CREATE TABLE symbols (
    id INTEGER PRIMARY KEY, name TEXT NOT NULL, original_name TEXT,
    scope_id INTEGER, owner_symbol_id INTEGER, render_node_id INTEGER,
    is_member INTEGER, is_transient INTEGER, is_alias INTEGER,
    metadata TEXT, seq INTEGER
  );
  CREATE TABLE scopes (
    id INTEGER PRIMARY KEY, name TEXT NOT NULL, parent_id INTEGER,
    owner_symbol_id INTEGER, render_node_id INTEGER,
    is_member_scope INTEGER, metadata TEXT, seq INTEGER
  );
  CREATE TABLE render_errors (
    id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, message TEXT,
    stack TEXT, component_stack TEXT, seq INTEGER
  );
  CREATE TABLE output_files (
    id INTEGER PRIMARY KEY AUTOINCREMENT, path TEXT NOT NULL,
    filetype TEXT, render_node_id INTEGER, content TEXT, seq INTEGER
  );
  CREATE TABLE directories (
    id INTEGER PRIMARY KEY AUTOINCREMENT, path TEXT NOT NULL UNIQUE,
    seq INTEGER
  );
  CREATE TABLE effect_lifecycle (
    id INTEGER PRIMARY KEY AUTOINCREMENT, effect_id INTEGER NOT NULL,
    event TEXT NOT NULL, trigger_ref_id INTEGER, source_file TEXT,
    source_line INTEGER, source_col INTEGER, seq INTEGER
  );
  CREATE TABLE diagnostics (
    id INTEGER PRIMARY KEY AUTOINCREMENT, message TEXT NOT NULL,
    severity TEXT, source_file TEXT, source_line INTEGER,
    source_col INTEGER, component_stack TEXT, seq INTEGER
  );
  CREATE TABLE source_maps (
    id INTEGER PRIMARY KEY AUTOINCREMENT, output_path TEXT NOT NULL,
    map_json TEXT NOT NULL, output_text TEXT
  );
`;

/**
 * Creates an in-memory SQLite database with the trace schema and seed data.
 * Seed data models a small render tree:
 *   root -> SourceFile(comp) -> Declaration(comp) -> text node
 *   Effects own contexts and track/trigger refs.
 */
export function createTestDb(): DatabaseSync {
  const db = new DatabaseSync(":memory:");
  db.exec(SCHEMA);
  seedData(db);
  return db;
}

function seedData(db: DatabaseSync) {
  // Render tree: root(1) -> SourceFile(2) -> Declaration(3) -> text(4)
  //                                       -> Fragment(5) -> text(6)
  db.exec(`
    INSERT INTO render_nodes VALUES (1, NULL, 'root', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1);
    INSERT INTO render_nodes VALUES (2, 1, 'component', 'SourceFile', '{"path":"src/models.ts"}',
      '/home/user/packages/typescript/src/components/source-file.tsx', 10, 5, 100, NULL, 2);
    INSERT INTO render_nodes VALUES (3, 2, 'component', 'Declaration', NULL,
      '/home/user/packages/typescript/src/components/declaration.tsx', 25, 3, 200, NULL, 5);
    INSERT INTO render_nodes VALUES (4, 3, 'text', NULL, NULL, NULL, NULL, NULL, NULL, 'export interface Foo {
  bar: string;
}', 6);
    INSERT INTO render_nodes VALUES (5, 2, 'fragment', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3);
    INSERT INTO render_nodes VALUES (6, 5, 'text', NULL, NULL, NULL, NULL, NULL, NULL, 'import { Bar } from "bar";
', 4);
    INSERT INTO render_nodes VALUES (7, 2, 'memo', 'mapJoin', NULL,
      '/home/user/packages/core/src/utils.tsx', 100, 1, 300, NULL, 7);
    INSERT INTO render_nodes VALUES (8, 7, 'customContext', 'NamePolicy', NULL, NULL, NULL, NULL, NULL, NULL, 8);
  `);

  // Effects: render effects for the components, plus a computed memo
  db.exec(`
    INSERT INTO effects VALUES (1, 'render:SourceFile', 'render', 100, NULL, 'SourceFile',
      '/home/user/packages/typescript/src/components/source-file.tsx', 15, 1, 1);
    INSERT INTO effects VALUES (2, 'render:Declaration', 'render', 200, 100, 'Declaration',
      '/home/user/packages/typescript/src/components/declaration.tsx', 30, 1, 2);
    INSERT INTO effects VALUES (3, 'content:models', 'content', 300, 200, NULL,
      '/home/user/packages/typescript/src/components/declaration.tsx', 35, 1, 3);
    INSERT INTO effects VALUES (4, 'binder:resolve', 'binder', 400, 100, NULL, NULL, NULL, NULL, 4);
  `);

  // Refs: two reactive values
  db.exec(`
    INSERT INTO refs VALUES (1, 'ref', 'allTypes', 1, '/home/user/packages/typescript/src/models.ts', 10, 1, 1);
    INSERT INTO refs VALUES (2, 'computed', 'typeCount', 3,
      '/home/user/packages/typescript/src/components/declaration.tsx', 40, 1, 2);
    INSERT INTO refs VALUES (3, 'ref', 'unusedRef', 2, '/home/user/packages/typescript/src/other.ts', 5, 1, 3);
  `);

  // Edges: effect 2 tracks ref 1, effect 3 triggers ref 2, effect 3 triggered-by ref 1
  db.exec(`
    INSERT INTO edges VALUES (1, 'track', 2, 1, NULL, NULL, NULL, NULL, NULL);
    INSERT INTO edges VALUES (2, 'trigger', 3, 2, NULL, NULL, NULL, NULL, NULL);
    INSERT INTO edges VALUES (3, 'triggered-by', 3, 1, NULL, NULL, NULL, NULL, NULL);
    INSERT INTO edges VALUES (4, 'track', 3, 1, NULL, NULL, NULL, NULL, NULL);
    INSERT INTO edges VALUES (5, 'track', 4, 1, NULL, NULL, NULL, NULL, NULL);
  `);

  // Scheduler
  db.exec(`
    INSERT INTO scheduler_jobs VALUES (1, 'run', 2, 0, 1);
    INSERT INTO scheduler_jobs VALUES (2, 'run', 3, 0, 2);
    INSERT INTO scheduler_flushes VALUES (1, 2);
  `);

  // Effect lifecycle
  db.exec(`
    INSERT INTO effect_lifecycle VALUES (1, 2, 'ran', NULL, NULL, NULL, NULL, 10);
    INSERT INTO effect_lifecycle VALUES (2, 2, 'ran', 1, NULL, NULL, NULL, 20);
    INSERT INTO effect_lifecycle VALUES (3, 3, 'ran', NULL, NULL, NULL, NULL, 11);
    INSERT INTO effect_lifecycle VALUES (4, 3, 'skipped', NULL, NULL, NULL, NULL, 30);
  `);

  // Scopes: global scope with a child member scope
  db.exec(`
    INSERT INTO scopes VALUES (1, 'global', NULL, NULL, 2, 0, NULL, 1);
    INSERT INTO scopes VALUES (2, 'Foo', 1, 1, 3, 1, NULL, 2);
  `);

  // Symbols
  db.exec(`
    INSERT INTO symbols VALUES (1, 'Foo', 'Foo', 1, NULL, 3, 0, 0, 0, NULL, 1);
    INSERT INTO symbols VALUES (2, 'bar', 'bar', 2, 1, NULL, 1, 0, 0, NULL, 2);
    INSERT INTO symbols VALUES (3, 'Baz', 'BazOriginal', 1, NULL, NULL, 0, 1, 0, NULL, 3);
  `);

  // Output files — content must equal concatenation of descendant text nodes
  db.prepare("INSERT INTO output_files VALUES (1, 'src/models.ts', 'typescript', 2, ?, 1)").run(
    "import { Bar } from \"bar\";\nexport interface Foo {\n  bar: string;\n}",
  );
  db.exec(`
    INSERT INTO output_files VALUES (2, 'src/index.ts', 'typescript', 2, 'export { Foo } from "./models";', 2);
  `);

  // Render errors
  db.prepare(
    "INSERT INTO render_errors VALUES (1, ?, ?, ?, ?, 1)",
  ).run(
    "TypeError",
    "Cannot read property x of undefined",
    "TypeError: Cannot read property x\n    at Declaration (/src/decl.tsx:15:3)",
    JSON.stringify([
      {
        name: "SourceFile",
        source: {
          fileName: "/home/user/packages/typescript/src/components/source-file.tsx",
          lineNumber: 10,
          columnNumber: 5,
        },
      },
      {
        name: "Declaration",
        source: {
          fileName: "/home/user/packages/typescript/src/components/declaration.tsx",
          lineNumber: 25,
          columnNumber: 3,
        },
      },
    ]),
  );
}
