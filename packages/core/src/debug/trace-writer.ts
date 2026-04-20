/**
 * SQLite trace writer for ALLOY_DEBUG_TRACE.
 *
 * Writes structured debug data to a SQLite database file using Node's
 * built-in `node:sqlite` module. The database can be queried by the
 * `alloy-trace` CLI or the devtools WebSocket server.
 */
import type {
  DatabaseSync as DatabaseSyncType,
  StatementSync,
} from "node:sqlite";

let db: DatabaseSyncType | null = null;
let seq = 0;

// Prepared statements (initialized in initTrace)
let stmtInsertEffect: StatementSync;
let stmtUpdateEffectComponent: StatementSync;
let stmtUpdateEffectComponentByContext: StatementSync;
let stmtInsertRef: StatementSync;
let stmtInsertEdge: StatementSync;
let stmtInsertSchedulerJob: StatementSync;
let stmtInsertSchedulerFlush: StatementSync;
let stmtInsertRenderNode: StatementSync;
let stmtUpdateRenderNode: StatementSync;
let stmtUpdateRenderNodeContext: StatementSync;
let stmtDeleteRenderNode: StatementSync;
let stmtInsertSymbol: StatementSync;
let stmtUpdateSymbol: StatementSync;
let stmtDeleteSymbol: StatementSync;
let stmtInsertScope: StatementSync;
let stmtUpdateScope: StatementSync;
let stmtDeleteScope: StatementSync;
let stmtInsertRenderError: StatementSync;
let stmtInsertDiagnostic: StatementSync;
let stmtInsertOutputFile: StatementSync;
let stmtUpdateOutputFileContent: StatementSync;
let stmtDeleteOutputFile: StatementSync;
let stmtInsertDirectory: StatementSync;
let stmtDeleteDirectory: StatementSync;
let stmtInsertEffectLifecycle: StatementSync;
let stmtInsertSourceMap: StatementSync;

export function isTraceEnabled(): boolean {
  return db !== null;
}

export function nextSeq(): number {
  return seq++;
}

// ─────────────────────────────────────────────────────────────────────────────
// Change notification bus — streams SQLite changes to devtools WS server
// ─────────────────────────────────────────────────────────────────────────────

export type ChangeChannel =
  | "render"
  | "effects"
  | "refs"
  | "edges"
  | "symbols"
  | "scopes"
  | "files"
  | "directories"
  | "diagnostics"
  | "errors"
  | "lifecycle"
  | "scheduler";

export const ALL_CHANNELS: ChangeChannel[] = [
  "render",
  "effects",
  "refs",
  "edges",
  "symbols",
  "scopes",
  "files",
  "directories",
  "diagnostics",
  "errors",
  "lifecycle",
  "scheduler",
];

export interface ChangeEvent {
  channel: ChangeChannel;
  action: "added" | "updated" | "removed" | "reset";
  data: Record<string, unknown>;
}

type ChangeListener = (event: ChangeEvent) => void;
let changeListener: ChangeListener | null = null;

export function setChangeListener(listener: ChangeListener | null): void {
  changeListener = listener;
}

function notifyChange(
  channel: ChangeChannel,
  action: ChangeEvent["action"],
  data: Record<string, unknown>,
): void {
  if (changeListener) {
    changeListener({ channel, action, data });
  }
}

const channelTableMap: Record<string, string> = {
  render: "render_nodes",
  effects: "effects",
  refs: "refs",
  edges: "edges",
  symbols: "symbols",
  scopes: "scopes",
  files: "output_files",
  directories: "directories",
  diagnostics: "diagnostics",
  errors: "render_errors",
  scheduler: "scheduler_jobs",
};

export function queryChannel(
  channel: ChangeChannel,
): Record<string, unknown>[] {
  if (!db) return [];
  const table = channelTableMap[channel];
  if (!table) return [];
  if (!/^[a-z_]+$/.test(table)) return [];
  return db.prepare(`SELECT * FROM ${table}`).all() as Record<
    string,
    unknown
  >[];
}

export async function initTrace(path: string): Promise<void> {
  // Dynamic import to avoid failing in environments without node:sqlite
  const { DatabaseSync } = await import("node:sqlite");
  const fs = await import("node:fs");
  // Remove existing trace file so each run starts fresh
  try {
    fs.unlinkSync(path);
  } catch {
    /* ignore missing */
  }
  try {
    fs.unlinkSync(path + "-wal");
  } catch {
    /* ignore missing */
  }
  try {
    fs.unlinkSync(path + "-shm");
  } catch {
    /* ignore missing */
  }
  db = new DatabaseSync(path);
  db.exec("PRAGMA journal_mode=WAL");
  db.exec("PRAGMA synchronous=NORMAL");
  createSchema();
  prepareStatements();
}

function createSchema(): void {
  db!.exec(`
    CREATE TABLE IF NOT EXISTS effects (
      id                   INTEGER PRIMARY KEY,
      name                 TEXT,
      type                 TEXT,
      context_id           INTEGER,
      owner_context_id     INTEGER,
      component            TEXT,
      source_file          TEXT,
      source_line          INTEGER,
      source_col           INTEGER,
      seq                  INTEGER
    );
    CREATE INDEX IF NOT EXISTS idx_effects_source ON effects(source_file);
    CREATE INDEX IF NOT EXISTS idx_effects_context ON effects(context_id);
    CREATE INDEX IF NOT EXISTS idx_effects_owner ON effects(owner_context_id);

    CREATE TABLE IF NOT EXISTS refs (
      id                   INTEGER PRIMARY KEY,
      kind                 TEXT,
      label                TEXT,
      created_by_effect_id INTEGER REFERENCES effects(id),
      source_file          TEXT,
      source_line          INTEGER,
      source_col           INTEGER,
      seq                  INTEGER
    );
    CREATE INDEX IF NOT EXISTS idx_refs_source ON refs(source_file);
    CREATE INDEX IF NOT EXISTS idx_refs_creator ON refs(created_by_effect_id);

    CREATE TABLE IF NOT EXISTS edges (
      seq                  INTEGER PRIMARY KEY,
      type                 TEXT NOT NULL,
      effect_id            INTEGER NOT NULL REFERENCES effects(id),
      ref_id               INTEGER,
      target_id            INTEGER,
      target_key           TEXT,
      caused_by            INTEGER,
      source_file          TEXT,
      source_line          INTEGER
    );
    CREATE INDEX IF NOT EXISTS idx_edges_effect ON edges(effect_id);
    CREATE INDEX IF NOT EXISTS idx_edges_ref ON edges(ref_id);
    CREATE INDEX IF NOT EXISTS idx_edges_target ON edges(target_id);
    CREATE INDEX IF NOT EXISTS idx_edges_type ON edges(type);

    CREATE TABLE IF NOT EXISTS scheduler_jobs (
      seq                  INTEGER PRIMARY KEY,
      event                TEXT NOT NULL,
      effect_id            INTEGER REFERENCES effects(id),
      immediate            INTEGER,
      queue_size           INTEGER
    );

    CREATE TABLE IF NOT EXISTS scheduler_flushes (
      seq                  INTEGER PRIMARY KEY,
      jobs_run             INTEGER
    );

    CREATE TABLE IF NOT EXISTS render_nodes (
      id                   INTEGER PRIMARY KEY,
      parent_id            INTEGER,
      kind                 TEXT NOT NULL,
      name                 TEXT,
      props                TEXT,
      source_file          TEXT,
      source_line          INTEGER,
      source_col           INTEGER,
      context_id           INTEGER,
      value                TEXT,
      seq                  INTEGER
    );
    CREATE INDEX IF NOT EXISTS idx_render_nodes_kind ON render_nodes(kind);
    CREATE INDEX IF NOT EXISTS idx_render_nodes_name ON render_nodes(name);
    CREATE INDEX IF NOT EXISTS idx_render_nodes_parent ON render_nodes(parent_id);
    CREATE INDEX IF NOT EXISTS idx_render_nodes_context ON render_nodes(context_id);

    CREATE TABLE IF NOT EXISTS symbols (
      id                   INTEGER PRIMARY KEY,
      name                 TEXT NOT NULL,
      original_name        TEXT,
      scope_id             INTEGER,
      owner_symbol_id      INTEGER,
      render_node_id       INTEGER,
      is_member            INTEGER,
      is_transient         INTEGER,
      is_alias             INTEGER,
      metadata             TEXT,
      seq                  INTEGER
    );
    CREATE INDEX IF NOT EXISTS idx_symbols_name ON symbols(name);
    CREATE INDEX IF NOT EXISTS idx_symbols_scope ON symbols(scope_id);
    CREATE INDEX IF NOT EXISTS idx_symbols_render_node ON symbols(render_node_id);

    CREATE TABLE IF NOT EXISTS scopes (
      id                   INTEGER PRIMARY KEY,
      name                 TEXT NOT NULL,
      parent_id            INTEGER,
      owner_symbol_id      INTEGER,
      render_node_id       INTEGER,
      is_member_scope      INTEGER,
      metadata             TEXT,
      seq                  INTEGER
    );
    CREATE INDEX IF NOT EXISTS idx_scopes_name ON scopes(name);
    CREATE INDEX IF NOT EXISTS idx_scopes_parent ON scopes(parent_id);
    CREATE INDEX IF NOT EXISTS idx_scopes_render_node ON scopes(render_node_id);

    CREATE TABLE IF NOT EXISTS render_errors (
      id                   INTEGER PRIMARY KEY AUTOINCREMENT,
      name                 TEXT,
      message              TEXT,
      stack                TEXT,
      component_stack      TEXT,
      seq                  INTEGER
    );

    CREATE TABLE IF NOT EXISTS diagnostics (
      id                   INTEGER PRIMARY KEY AUTOINCREMENT,
      message              TEXT NOT NULL,
      severity             TEXT,
      source_file          TEXT,
      source_line          INTEGER,
      source_col           INTEGER,
      component_stack      TEXT,
      seq                  INTEGER
    );

    CREATE TABLE IF NOT EXISTS output_files (
      id                   INTEGER PRIMARY KEY AUTOINCREMENT,
      path                 TEXT NOT NULL,
      filetype             TEXT,
      render_node_id       INTEGER,
      content              TEXT,
      seq                  INTEGER
    );
    CREATE INDEX IF NOT EXISTS idx_output_files_path ON output_files(path);

    CREATE TABLE IF NOT EXISTS directories (
      id                   INTEGER PRIMARY KEY AUTOINCREMENT,
      path                 TEXT NOT NULL UNIQUE,
      seq                  INTEGER
    );

    CREATE TABLE IF NOT EXISTS effect_lifecycle (
      id                   INTEGER PRIMARY KEY AUTOINCREMENT,
      effect_id            INTEGER NOT NULL,
      event                TEXT NOT NULL,
      trigger_ref_id       INTEGER,
      source_file          TEXT,
      source_line          INTEGER,
      source_col           INTEGER,
      seq                  INTEGER
    );

    CREATE TABLE IF NOT EXISTS source_maps (
      id                   INTEGER PRIMARY KEY AUTOINCREMENT,
      output_path          TEXT NOT NULL,
      map_json             TEXT NOT NULL,
      output_text          TEXT
    );
  `);
}

function prepareStatements(): void {
  stmtInsertEffect = db!.prepare(
    `INSERT OR REPLACE INTO effects (id, name, type, context_id, owner_context_id, component, source_file, source_line, source_col, seq)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  );
  stmtUpdateEffectComponent = db!.prepare(
    `UPDATE effects SET component = ? WHERE id = ?`,
  );
  stmtUpdateEffectComponentByContext = db!.prepare(
    `UPDATE effects SET component = ? WHERE context_id = ?`,
  );
  stmtInsertRef = db!.prepare(
    `INSERT OR IGNORE INTO refs (id, kind, label, created_by_effect_id, source_file, source_line, source_col, seq)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
  );
  stmtInsertEdge = db!.prepare(
    `INSERT INTO edges (seq, type, effect_id, ref_id, target_id, target_key, caused_by, source_file, source_line)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  );
  stmtInsertSchedulerJob = db!.prepare(
    `INSERT INTO scheduler_jobs (seq, event, effect_id, immediate, queue_size)
     VALUES (?, ?, ?, ?, ?)`,
  );
  stmtInsertSchedulerFlush = db!.prepare(
    `INSERT INTO scheduler_flushes (seq, jobs_run) VALUES (?, ?)`,
  );
  stmtInsertRenderNode = db!.prepare(
    `INSERT OR REPLACE INTO render_nodes (id, parent_id, kind, name, props, source_file, source_line, source_col, context_id, value, seq)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  );
  stmtUpdateRenderNode = db!.prepare(
    `UPDATE render_nodes SET props = ? WHERE id = ?`,
  );
  stmtUpdateRenderNodeContext = db!.prepare(
    `UPDATE render_nodes SET context_id = ? WHERE id = ?`,
  );
  stmtDeleteRenderNode = db!.prepare(`DELETE FROM render_nodes WHERE id = ?`);
  stmtInsertSymbol = db!.prepare(
    `INSERT OR REPLACE INTO symbols (id, name, original_name, scope_id, owner_symbol_id, render_node_id, is_member, is_transient, is_alias, metadata, seq)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  );
  stmtUpdateSymbol = db!.prepare(
    `UPDATE symbols SET name = ?, original_name = ?, scope_id = ?, owner_symbol_id = ?, render_node_id = ?, is_member = ?, is_transient = ?, is_alias = ?, metadata = ? WHERE id = ?`,
  );
  stmtDeleteSymbol = db!.prepare(`DELETE FROM symbols WHERE id = ?`);
  stmtInsertScope = db!.prepare(
    `INSERT OR REPLACE INTO scopes (id, name, parent_id, owner_symbol_id, render_node_id, is_member_scope, metadata, seq)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
  );
  stmtUpdateScope = db!.prepare(
    `UPDATE scopes SET name = ?, parent_id = ?, owner_symbol_id = ?, render_node_id = ?, is_member_scope = ?, metadata = ? WHERE id = ?`,
  );
  stmtDeleteScope = db!.prepare(`DELETE FROM scopes WHERE id = ?`);
  stmtInsertRenderError = db!.prepare(
    `INSERT INTO render_errors (name, message, stack, component_stack, seq)
     VALUES (?, ?, ?, ?, ?)`,
  );
  stmtInsertDiagnostic = db!.prepare(
    `INSERT INTO diagnostics (message, severity, source_file, source_line, source_col, component_stack, seq)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
  );
  stmtInsertOutputFile = db!.prepare(
    `INSERT INTO output_files (path, filetype, render_node_id, seq)
     VALUES (?, ?, ?, ?)`,
  );
  stmtUpdateOutputFileContent = db!.prepare(
    `UPDATE output_files SET content = ? WHERE path = ?`,
  );
  stmtDeleteOutputFile = db!.prepare(`DELETE FROM output_files WHERE path = ?`);
  stmtInsertDirectory = db!.prepare(
    `INSERT OR IGNORE INTO directories (path, seq) VALUES (?, ?)`,
  );
  stmtDeleteDirectory = db!.prepare(`DELETE FROM directories WHERE path = ?`);
  stmtInsertEffectLifecycle = db!.prepare(
    `INSERT INTO effect_lifecycle (effect_id, event, trigger_ref_id, source_file, source_line, source_col, seq)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
  );
  stmtInsertSourceMap = db!.prepare(
    `INSERT INTO source_maps (output_path, map_json, output_text)
     VALUES (?, ?, ?)`,
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Insert methods
// ─────────────────────────────────────────────────────────────────────────────

export function insertEffect(
  id: number,
  name: string | undefined,
  type: string | undefined,
  contextId: number | undefined,
  ownerContextId: number | null | undefined,
  sourceFile: string | undefined,
  sourceLine: number | undefined,
  sourceCol: number | undefined,
): void {
  if (!db) return;
  const s = nextSeq();
  stmtInsertEffect.run(
    id,
    name ?? null,
    type ?? null,
    contextId ?? null,
    ownerContextId ?? null,
    null,
    sourceFile ?? null,
    sourceLine ?? null,
    sourceCol ?? null,
    s,
  );
  notifyChange("effects", "added", {
    id,
    name: name ?? null,
    effect_type: type ?? null,
    context_id: contextId ?? null,
    owner_context_id: ownerContextId ?? null,
    component: null,
    source_file: sourceFile ?? null,
    source_line: sourceLine ?? null,
    source_col: sourceCol ?? null,
    seq: s,
  });
}

export function updateEffectComponent(id: number, component: string): void {
  if (!db) return;
  stmtUpdateEffectComponent.run(component, id);
  notifyChange("effects", "updated", { id, component });
}

export function updateEffectComponentByContext(
  contextId: number,
  component: string,
): void {
  if (!db) return;
  stmtUpdateEffectComponentByContext.run(component, contextId);
  notifyChange("effects", "updated", { context_id: contextId, component });
}

export function insertRef(
  id: number,
  kind: string | undefined,
  createdByEffectId: number | undefined,
  sourceFile: string | undefined,
  sourceLine: number | undefined,
  sourceCol: number | undefined,
  label?: string | undefined,
  isApproxLocation?: boolean,
): void {
  if (!db) return;
  const s = nextSeq();
  stmtInsertRef.run(
    id,
    kind ?? null,
    label ?? null,
    createdByEffectId ?? null,
    sourceFile ?? null,
    sourceLine ?? null,
    sourceCol ?? null,
    s,
  );
  notifyChange("refs", "added", {
    id,
    kind: kind ?? null,
    label: label ?? null,
    created_by_effect_id: createdByEffectId ?? null,
    source_file: sourceFile ?? null,
    source_line: sourceLine ?? null,
    source_col: sourceCol ?? null,
    is_approx_location: isApproxLocation ? 1 : 0,
    seq: s,
  });
}

export function insertEdge(
  type: string,
  effectId: number,
  refId: number | undefined,
  targetId: number | undefined,
  targetKey: string | number | undefined,
  causedBy: number | undefined,
  sourceFile?: string | undefined,
  sourceLine?: number | undefined,
): void {
  if (!db) return;
  const s = nextSeq();
  stmtInsertEdge.run(
    s,
    type,
    effectId,
    refId ?? null,
    targetId ?? null,
    targetKey != null ? String(targetKey) : null,
    causedBy ?? null,
    sourceFile ?? null,
    sourceLine ?? null,
  );
  notifyChange("edges", "added", {
    seq: s,
    edge_type: type,
    effect_id: effectId,
    ref_id: refId ?? null,
    target_id: targetId ?? null,
    target_key: targetKey != null ? String(targetKey) : null,
    caused_by: causedBy ?? null,
    source_file: sourceFile ?? null,
    source_line: sourceLine ?? null,
  });
}

export function insertSchedulerJob(
  event: string,
  effectId: number,
  immediate: boolean,
  queueSize: number,
): void {
  if (!db) return;
  const s = nextSeq();
  stmtInsertSchedulerJob.run(s, event, effectId, immediate ? 1 : 0, queueSize);
  notifyChange("scheduler", "added", {
    seq: s,
    event,
    effect_id: effectId,
    immediate: immediate ? 1 : 0,
    queue_size: queueSize,
  });
}

export function insertSchedulerFlush(jobsRun: number): void {
  if (!db) return;
  stmtInsertSchedulerFlush.run(nextSeq(), jobsRun);
}

export function insertRenderNode(
  id: number,
  parentId: number | null,
  kind: string,
  name: string | undefined,
  props: string | undefined,
  sourceFile: string | undefined,
  sourceLine: number | undefined,
  sourceCol: number | undefined,
  contextId: number | null,
  value: string | undefined,
): void {
  if (!db) return;
  const s = nextSeq();
  stmtInsertRenderNode.run(
    id,
    parentId,
    kind,
    name ?? null,
    props ?? null,
    sourceFile ?? null,
    sourceLine ?? null,
    sourceCol ?? null,
    contextId,
    value ?? null,
    s,
  );
  notifyChange("render", "added", {
    id,
    parent_id: parentId,
    kind,
    name: name ?? null,
    props: props ?? null,
    source_file: sourceFile ?? null,
    source_line: sourceLine ?? null,
    source_col: sourceCol ?? null,
    context_id: contextId,
    value: value ?? null,
    seq: s,
  });
}

export function updateRenderNodeProps(
  id: number,
  props: string | undefined,
): void {
  if (!db) return;
  stmtUpdateRenderNode.run(props ?? null, id);
  notifyChange("render", "updated", { id, props: props ?? null });
}

export function updateRenderNodeContext(id: number, contextId: number): void {
  if (!db) return;
  stmtUpdateRenderNodeContext.run(contextId, id);
  notifyChange("render", "updated", { id, context_id: contextId });
}

export function deleteRenderNode(id: number): void {
  if (!db) return;
  stmtDeleteRenderNode.run(id);
  notifyChange("render", "removed", { id });
}

export function insertSymbol(
  id: number,
  name: string,
  originalName: string | undefined,
  scopeId: number | undefined,
  ownerSymbolId: number | undefined,
  renderNodeId: number | undefined,
  isMember: boolean,
  isTransient: boolean,
  isAlias: boolean,
  metadata: string | undefined,
): void {
  if (!db) return;
  const s = nextSeq();
  stmtInsertSymbol.run(
    id,
    name,
    originalName ?? null,
    scopeId ?? null,
    ownerSymbolId ?? null,
    renderNodeId ?? null,
    isMember ? 1 : 0,
    isTransient ? 1 : 0,
    isAlias ? 1 : 0,
    metadata ?? null,
    s,
  );
  notifyChange("symbols", "added", {
    id,
    name,
    original_name: originalName ?? null,
    scope_id: scopeId ?? null,
    owner_symbol_id: ownerSymbolId ?? null,
    render_node_id: renderNodeId ?? null,
    is_member: isMember ? 1 : 0,
    is_transient: isTransient ? 1 : 0,
    is_alias: isAlias ? 1 : 0,
    metadata: metadata ?? null,
    seq: s,
  });
}

export function updateSymbol(
  id: number,
  name: string,
  originalName: string | undefined,
  scopeId: number | undefined,
  ownerSymbolId: number | undefined,
  renderNodeId: number | undefined,
  isMember: boolean,
  isTransient: boolean,
  isAlias: boolean,
  metadata: string | undefined,
): void {
  if (!db) return;
  stmtUpdateSymbol.run(
    name,
    originalName ?? null,
    scopeId ?? null,
    ownerSymbolId ?? null,
    renderNodeId ?? null,
    isMember ? 1 : 0,
    isTransient ? 1 : 0,
    isAlias ? 1 : 0,
    metadata ?? null,
    id,
  );
  notifyChange("symbols", "updated", {
    id,
    name,
    original_name: originalName ?? null,
    scope_id: scopeId ?? null,
    owner_symbol_id: ownerSymbolId ?? null,
    render_node_id: renderNodeId ?? null,
    is_member: isMember ? 1 : 0,
    is_transient: isTransient ? 1 : 0,
    is_alias: isAlias ? 1 : 0,
    metadata: metadata ?? null,
  });
}

export function deleteSymbol(id: number): void {
  if (!db) return;
  stmtDeleteSymbol.run(id);
  notifyChange("symbols", "removed", { id });
}

export function insertScope(
  id: number,
  name: string,
  parentId: number | undefined,
  ownerSymbolId: number | undefined,
  renderNodeId: number | undefined,
  isMemberScope: boolean,
  metadata: string | undefined,
): void {
  if (!db) return;
  const s = nextSeq();
  stmtInsertScope.run(
    id,
    name,
    parentId ?? null,
    ownerSymbolId ?? null,
    renderNodeId ?? null,
    isMemberScope ? 1 : 0,
    metadata ?? null,
    s,
  );
  notifyChange("scopes", "added", {
    id,
    name,
    parent_id: parentId ?? null,
    owner_symbol_id: ownerSymbolId ?? null,
    render_node_id: renderNodeId ?? null,
    is_member_scope: isMemberScope ? 1 : 0,
    metadata: metadata ?? null,
    seq: s,
  });
}

export function updateScope(
  id: number,
  name: string,
  parentId: number | undefined,
  ownerSymbolId: number | undefined,
  renderNodeId: number | undefined,
  isMemberScope: boolean,
  metadata: string | undefined,
): void {
  if (!db) return;
  stmtUpdateScope.run(
    name,
    parentId ?? null,
    ownerSymbolId ?? null,
    renderNodeId ?? null,
    isMemberScope ? 1 : 0,
    metadata ?? null,
    id,
  );
  notifyChange("scopes", "updated", {
    id,
    name,
    parent_id: parentId ?? null,
    owner_symbol_id: ownerSymbolId ?? null,
    render_node_id: renderNodeId ?? null,
    is_member_scope: isMemberScope ? 1 : 0,
    metadata: metadata ?? null,
  });
}

export function deleteScope(id: number): void {
  if (!db) return;
  stmtDeleteScope.run(id);
  notifyChange("scopes", "removed", { id });
}

export function insertRenderError(
  name: string | undefined,
  message: string | undefined,
  stack: string | undefined,
  componentStack: string | undefined,
): void {
  if (!db) return;
  const s = nextSeq();
  stmtInsertRenderError.run(
    name ?? null,
    message ?? null,
    stack ?? null,
    componentStack ?? null,
    s,
  );
  notifyChange("errors", "added", {
    name: name ?? null,
    message: message ?? null,
    stack: stack ?? null,
    component_stack: componentStack ?? null,
    seq: s,
  });
}

export function insertDiagnostic(
  message: string,
  severity: string | undefined,
  sourceFile: string | undefined,
  sourceLine: number | undefined,
  sourceCol: number | undefined,
  componentStack: string | undefined,
): void {
  if (!db) return;
  const s = nextSeq();
  stmtInsertDiagnostic.run(
    message,
    severity ?? null,
    sourceFile ?? null,
    sourceLine ?? null,
    sourceCol ?? null,
    componentStack ?? null,
    s,
  );
  notifyChange("diagnostics", "added", {
    message,
    severity: severity ?? null,
    source_file: sourceFile ?? null,
    source_line: sourceLine ?? null,
    source_col: sourceCol ?? null,
    component_stack: componentStack ?? null,
    seq: s,
  });
}

/**
 * Batch diagnostics report notification. Individual diagnostics are already
 * inserted via insertDiagnostic during render; this is a no-op placeholder
 * for batch signaling if needed in the future.
 */
export function notifyDiagnosticsReport(_entries: unknown[]): void {
  // Diagnostics are already written individually via insertDiagnostic.
}

export function insertOutputFile(
  path: string,
  filetype: string | undefined,
  renderNodeId: number | undefined,
): void {
  if (!db) return;
  const s = nextSeq();
  stmtInsertOutputFile.run(path, filetype ?? null, renderNodeId ?? null, s);
  notifyChange("files", "added", {
    path,
    filetype: filetype ?? null,
    render_node_id: renderNodeId ?? null,
    seq: s,
  });
}

export function queryOutputFile(
  path: string,
): Record<string, unknown> | undefined {
  if (!db) return undefined;
  return db.prepare("SELECT * FROM output_files WHERE path = ?").get(path) as
    | Record<string, unknown>
    | undefined;
}

export function updateOutputFileContent(path: string, content: string): void {
  if (!db) return;
  stmtUpdateOutputFileContent.run(content, path);
  notifyChange("files", "updated", { path, content });
}

export function deleteOutputFile(path: string): void {
  if (!db) return;
  stmtDeleteOutputFile.run(path);
  notifyChange("files", "removed", { path });
}

export function insertDirectory(path: string): void {
  if (!db) return;
  const s = nextSeq();
  stmtInsertDirectory.run(path, s);
  notifyChange("directories", "added", { path, seq: s });
}

export function deleteDirectory(path: string): void {
  if (!db) return;
  stmtDeleteDirectory.run(path);
  notifyChange("directories", "removed", { path });
}

export function insertEffectLifecycle(
  effectId: number,
  event: string,
  triggerRefId: number | undefined,
  sourceFile: string | undefined,
  sourceLine: number | undefined,
  sourceCol: number | undefined,
): void {
  if (!db) return;
  const s = nextSeq();
  stmtInsertEffectLifecycle.run(
    effectId,
    event,
    triggerRefId ?? null,
    sourceFile ?? null,
    sourceLine ?? null,
    sourceCol ?? null,
    s,
  );
  notifyChange("lifecycle", "added", {
    effect_id: effectId,
    event,
    trigger_ref_id: triggerRefId ?? null,
    source_file: sourceFile ?? null,
    source_line: sourceLine ?? null,
    source_col: sourceCol ?? null,
    seq: s,
  });
}

export function insertSourceMap(
  outputPath: string,
  mapJson: string,
  outputText: string | undefined,
): void {
  if (!db) return;
  stmtInsertSourceMap.run(outputPath, mapJson, outputText ?? null);
}

// ─────────────────────────────────────────────────────────────────────────────
// Transaction helpers
// ─────────────────────────────────────────────────────────────────────────────

export function beginTransaction(): void {
  if (!db) return;
  db.exec("BEGIN");
}

export function commitTransaction(): void {
  if (!db) return;
  db.exec("COMMIT");
}

export function closeTrace(): void {
  db?.close();
  db = null;
}

export function resetTrace(): void {
  seq = 0;
}

// ─────────────────────────────────────────────────────────────────────────────
// Lifecycle signals — broadcast to all WS clients regardless of subscription
// ─────────────────────────────────────────────────────────────────────────────

export function notifyRenderReset(): void {
  notifyChange("render", "reset", { _signal: "render:reset" } as any);
}

export function notifyRenderComplete(): void {
  notifyChange("lifecycle", "added", { _signal: "render:complete" } as any);
}

export function notifyFlushComplete(): void {
  notifyChange("lifecycle", "added", { _signal: "flushJobs:complete" } as any);
}
