# Analyzer Memory

_Updated: 2026-04-24T01:23:56Z_

## Iteration 2 findings

- Baseline: emitter-like-schema 4299ms CPU avg, 119MB mem avg (5 runs) [REVISED — baseline.json has new numbers]
- Latest.json identical to baseline.json — no slices applied yet to benchmark.
- CPU profile again captured during module load (97.8% idle, 33586/34347 samples idle). Useless for hot frames.

## Correct trace CLI syntax (CRITICAL)

Commands use space-separated subcommands, NOT quoted strings:
  - `effect hotspots` ← correct
  - `"effect hotspots"` ← WRONG (returns Unknown command error)
Use: `node …/cli.js --db <path> effect hotspots`
     `node …/cli.js --db <path> ref hotspots`
     `node …/cli.js --db <path> component stats`
     `node …/cli.js --db <path> query "<SQL>"`

## Known trace DB schema notes

Table schema highlights:
  - `effects`: id, name, type, component, context_id, owner_context_id, source_file, source_line, source_col, seq
  - `refs`: id, kind, label, created_by_effect_id, source_file, source_line, source_col, seq
  - `edges`: seq, type (track|trigger), effect_id, ref_id
  - `effect_lifecycle`: effect_id, event (ran|skipped), trigger_ref_id
  - `render_nodes`, `symbols`, `scopes`, `output_files`, `scheduler_jobs`, `scheduler_flushes`, `source_maps`

Counting tricks:
  - `COUNT(*)` on a JOIN counts EDGE ROWS not distinct effects. Use `COUNT(DISTINCT e.id)` for effect counts.
  - `COUNT(CASE WHEN ed.type='track' THEN 1 END)` for track edges, `...='trigger'...` for trigger edges.

## Confirmed hotspots (iteration 2 trace evidence)

1. InterfaceMember:moveTakenMembers (Interface.tsx:226) — 640 effects, 1,672 total trigger edges.
   Each InterfaceMember fires this effect ~2.6 times/instance as child symbols are emitted.
   NEW SLICE: interface-member-take-batching

2. ImportStatements mapJoin (ImportStatement.js:15) — 948 trigger edges.
   ~118 re-sorts/instance as import records fill up incrementally during symbol resolution.
   NEW SLICE: import-statements-sort-debounce

3. reactiveUnionSet:subsetSync (symbol-table.js:70) — 320 effects, 2,320 tracks, 640 triggers.
   Each subsetSync effect unexpectedly tracks name/refkeys/spaces for each symbol in subset.
   NEW SLICE: subset-sync-tracking-leak

4. nodesToContext WeakMap (render.ts:307) — 1MB heap retention, 35,447 entries.
   NEW SLICE: nodes-to-context-map-overhead

5. Previously found (iter 1), now with updated counts:
   - binder:notifySymbolCreated: 1,666 effects, ~5.3 tracks/effect
   - reactiveUnionSet:index:mapper: 4,612 effects, 7,414 tracking edges
   - Unused refs: 36.2% never tracked + 34.0% completely unused = 70.2%
   - output-scope ownerSymbol (line 188): 36-44 trackers/ref, 0 writes

## Applied slices (implemented in code but not yet benchmarked)

- import-statement-monolith-memo: DONE
- reactive-union-set-per-element-effect: implemented
- unused-reactive-refs: implemented
- binder-per-symbol-notify-effect: implemented
- output-scope-owner-symbol-static-ref: implemented
- import-binding-memo-merge: implemented

## Pending slices (priority order)

1. interface-member-take-batching (180ms est, medium risk)
2. import-statements-sort-debounce (120ms est, medium risk)
3. subset-sync-tracking-leak (80ms est, medium risk)
4. symbolflow-emitref-static-opt (60ms est, low risk) — emitSymbol Ref path, 632 effects, 0 triggers
5. nodes-to-context-map-overhead (20ms/30MB est, low risk)

## Added in this pass

- symbolflow-emitref-static-opt: symbolFlow:emitRef, 632 effects at symbol-flow.js:54, each tracking
  ~7 computed refs (4108 total), 0 triggers. All tracked refs are stable computed symbols. Optimize
  by peeking at `symbol.value` via `untrack()` before creating the effect; if already defined, use
  imperative path + onCleanup only. (Added 2026-04-24T08:40:00Z)

