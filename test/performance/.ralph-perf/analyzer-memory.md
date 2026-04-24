# Analyzer Memory

_Updated: 2026-04-24T07:37:00Z_

## Iteration 1 findings

- Baseline: emitter-like-schema 6174ms CPU avg, 125MB mem avg (5 runs)
- First trace + heap profiling run.
- CPU profile was captured during module load (97.5% idle); useless for hot-frame analysis.
  Future iterations should ensure cpuprofile is captured during actual execution.

## Known trace DB schema notes

The `alloy-trace` CLI subcommands use spaces as separators: `effect hotspots`, `ref hotspots`,
`component stats`. The `--db` flag format is `--db=<path>` or `--db <path>`.
Table schema highlights:
  - `effects`: id, name, type, component, source_file, source_line
  - `refs`: id, kind, label, created_by_effect_id, source_file, source_line
  - `edges`: seq, type (track|trigger), effect_id, ref_id, target_id, target_key
  - `effect_lifecycle`: effect_id, event (ran|skipped), trigger_ref_id

## Confirmed hotspots (by trace evidence)

1. ImportStatement.js:42 memo — 77 instances, 11,793 total tracking edges (14.9% of all),
   448 trigger events. Top priority.
2. reactiveUnionSet:index:mapper effects — 4,612 effects (8.1% of all), 1 per symbol per index.
3. Unused reactive refs — 68.9% of 43,696 refs have no subscribers. 30,072 wasted allocations.
4. binder:notifySymbolCreated — 1,666 effects, 1 per symbol for refkey watch.
5. output-scope ownerSymbol (line 188 dist) — 36–44 trackers per ref, 0 writes.

## Slice status

- import-statement-monolith-memo: pending (highest priority)
- reactive-union-set-per-element-effect: pending
- unused-reactive-refs: pending
- binder-per-symbol-notify-effect: pending
- output-scope-owner-symbol-static-ref: pending
- import-binding-memo-merge: pending
