/**
 * Browser stub for trace-writer.
 *
 * Replaces `trace-writer.ts` in browser builds so that `node:sqlite` and
 * `node:fs` are never imported.  Every function is a no-op.
 */

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

export function setChangeListener(_listener: ChangeListener | null): void {
  // No-op in browser
}

export function isTraceEnabled(): boolean {
  return false;
}

export function nextSeq(): number {
  return 0;
}

export function queryChannel(
  _channel: ChangeChannel,
): Record<string, unknown>[] {
  return [];
}

export async function initTrace(_path: string): Promise<void> {
  // No-op in browser
}

export function insertEffect(
  _id: number,
  _name: string | undefined,
  _type: string | undefined,
  _contextId: number | undefined,
  _ownerContextId: number | null | undefined,
  _sourceFile: string | undefined,
  _sourceLine: number | undefined,
  _sourceCol: number | undefined,
): void {
  // No-op in browser
}

export function updateEffectComponent(_id: number, _component: string): void {
  // No-op in browser
}

export function updateEffectComponentByContext(
  _contextId: number,
  _component: string,
): void {
  // No-op in browser
}

export function insertRef(
  _id: number,
  _kind: string | undefined,
  _createdByEffectId: number | undefined,
  _sourceFile: string | undefined,
  _sourceLine: number | undefined,
  _sourceCol: number | undefined,
  _label?: string | undefined,
  _isApproxLocation?: boolean,
): void {
  // No-op in browser
}

export function insertEdge(
  _type: string,
  _effectId: number,
  _refId: number | undefined,
  _targetId: number | undefined,
  _targetKey: string | number | undefined,
  _causedBy: number | undefined,
  _sourceFile?: string | undefined,
  _sourceLine?: number | undefined,
): void {
  // No-op in browser
}

export function insertSchedulerJob(
  _event: string,
  _effectId: number,
  _immediate: boolean,
  _queueSize: number,
): void {
  // No-op in browser
}

export function insertSchedulerFlush(_jobsRun: number): void {
  // No-op in browser
}

export function insertRenderNode(
  _id: number,
  _parentId: number | null,
  _kind: string,
  _name: string | undefined,
  _props: string | undefined,
  _sourceFile: string | undefined,
  _sourceLine: number | undefined,
  _sourceCol: number | undefined,
  _contextId: number | null,
  _value: string | undefined,
): void {
  // No-op in browser
}

export function updateRenderNodeProps(
  _id: number,
  _props: string | undefined,
): void {
  // No-op in browser
}

export function updateRenderNodeContext(
  _id: number,
  _contextId: number,
): void {
  // No-op in browser
}

export function deleteRenderNode(_id: number): void {
  // No-op in browser
}

export function insertSymbol(
  _id: number,
  _name: string,
  _originalName: string | undefined,
  _scopeId: number | undefined,
  _ownerSymbolId: number | undefined,
  _renderNodeId: number | undefined,
  _isMember: boolean,
  _isTransient: boolean,
  _isAlias: boolean,
  _metadata: string | undefined,
): void {
  // No-op in browser
}

export function updateSymbol(
  _id: number,
  _name: string,
  _originalName: string | undefined,
  _scopeId: number | undefined,
  _ownerSymbolId: number | undefined,
  _renderNodeId: number | undefined,
  _isMember: boolean,
  _isTransient: boolean,
  _isAlias: boolean,
  _metadata: string | undefined,
): void {
  // No-op in browser
}

export function deleteSymbol(_id: number): void {
  // No-op in browser
}

export function insertScope(
  _id: number,
  _name: string,
  _parentId: number | undefined,
  _ownerSymbolId: number | undefined,
  _renderNodeId: number | undefined,
  _isMemberScope: boolean,
  _metadata: string | undefined,
): void {
  // No-op in browser
}

export function updateScope(
  _id: number,
  _name: string,
  _parentId: number | undefined,
  _ownerSymbolId: number | undefined,
  _renderNodeId: number | undefined,
  _isMemberScope: boolean,
  _metadata: string | undefined,
): void {
  // No-op in browser
}

export function deleteScope(_id: number): void {
  // No-op in browser
}

export function insertRenderError(
  _name: string | undefined,
  _message: string | undefined,
  _stack: string | undefined,
  _componentStack: string | undefined,
): void {
  // No-op in browser
}

export function insertDiagnostic(
  _message: string,
  _severity: string | undefined,
  _sourceFile: string | undefined,
  _sourceLine: number | undefined,
  _sourceCol: number | undefined,
  _componentStack: string | undefined,
): number | undefined {
  return undefined;
}

export function deleteDiagnostic(_id: number): void {
  // No-op in browser
}

export function notifyDiagnosticsReport(_entries: unknown[]): void {
  // No-op in browser
}

export function insertOutputFile(
  _path: string,
  _filetype: string | undefined,
  _renderNodeId: number | undefined,
): void {
  // No-op in browser
}

export function queryOutputFile(
  _path: string,
): Record<string, unknown> | undefined {
  return undefined;
}

export function updateOutputFileContent(
  _path: string,
  _content: string,
): void {
  // No-op in browser
}

export function deleteOutputFile(_path: string): void {
  // No-op in browser
}

export function insertDirectory(_path: string): void {
  // No-op in browser
}

export function deleteDirectory(_path: string): void {
  // No-op in browser
}

export function insertEffectLifecycle(
  _effectId: number,
  _event: string,
  _triggerRefId: number | undefined,
  _sourceFile: string | undefined,
  _sourceLine: number | undefined,
  _sourceCol: number | undefined,
): void {
  // No-op in browser
}

export function insertSourceMap(
  _outputPath: string,
  _mapJson: string,
  _outputText: string | undefined,
): void {
  // No-op in browser
}

export function beginTransaction(): void {
  // No-op in browser
}

export function commitTransaction(): void {
  // No-op in browser
}

export function closeTrace(): void {
  // No-op in browser
}

export function resetTrace(): void {
  // No-op in browser
}

export function notifyRenderReset(): void {
  // No-op in browser
}

export function notifyRenderComplete(): void {
  // No-op in browser
}

export function notifyFlushComplete(): void {
  // No-op in browser
}
