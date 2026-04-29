/** Browser stub for debug/render — all exports are no-ops. */
export function getRenderNodeId() {}
export function initialize() {}
export function beginComponent() {
  return { recordDirectory() {}, recordFile() {}, dispose() {} };
}
export function appendCustomContext() {}
export function appendPrintHook() {}
export function appendFragmentChild() {}
export function appendTextNode() {}
export function prepareMemoNode() {}
export function error() {}
export function complete() {}
export function flushJobsComplete() {}
