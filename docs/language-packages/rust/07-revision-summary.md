# Revision Summary

## What Changed

### Design Doc (03-rust-design-notes.md)

| Change | Why |
|---|---|
| Declaration spaces changed from `["types", "values", "macros"]` to `["types", "values"]` | Review G3/A1: "macros" space adds complexity without demonstrated need for MVP. Go uses dual spaces without macros. Can be added later. |
| Directory layout: scopes moved from `src/symbols/` to `src/scopes/` | Review R1: Go and C# both use separate `scopes/` directories. Mixing 14+ files into `symbols/` creates an oversized directory. |
| Added `name-conflict-resolver.ts` to layout | Review G7: TypeScript has a custom resolver; Rust needs one too for imported vs local symbol priority. |
| Component file names changed from PascalCase to kebab-case | Consistency with Alloy component file naming convention. |
| Removed `StaticDeclaration.tsx`, `MatchExpression.tsx`, `DeriveAttribute.tsx` (merged into `attribute.tsx`) | Simplified component set. Static decl deferred. Match deferred. DeriveAttribute is a sub-component of Attribute. |
| Added section 3.14: Prelude Types with full list | Review G6: Prelude list was undefined. Now explicitly enumerated (~55 types). |
| Added section 3.15: Name Conflict Resolver | Review G7: Design decision documented. Import symbols renamed before local declarations. |
| Resolved self receiver design decision | Review A3: Default `&self` inside impl/trait, `none` for standalone fns. Overridable via `receiver` prop. No longer an open question. |
| Fixed SymbolCreator protocol claim | Review R2: Changed to accurately describe the `REFKEYABLE` + `TO_SYMBOL` + `WeakMap<Binder>` pattern. |

### PRD (04-rust-prd.md)

| Change | Why |
|---|---|
| FR-3.1/FR-3.2: declaration spaces `["types", "values"]` | Matches design doc change. |
| Architecture: scopes in `src/scopes/` directory | Matches design doc change. |
| Open questions: 5 of 6 resolved | Review A3: Decisions made — no longer blocking implementation agents. |
| `use` syntax changed to flat for MVP | Review S3/should-fix #12: `use path::A;` per item is simpler. Tree grouping deferred to polish. |

### Backlog

| Change | Why |
|---|---|
| T001: Added api-extractor.json, build scripts, prepack, #imports | Review G1/G2/G3/G5: Missing infrastructure items that every existing package has. |
| T005: Split into T005 (crate/module scopes) + T005b (function/lexical/member scopes) | Review B2: Original T005 was too large (6 scopes + hooks). Now split into manageable pieces. |
| T007b: New task — name conflict resolver | Review G7: Core default is insufficient. Rust needs import-priority conflict resolution. |
| T011: Dependencies reduced from 5 to 2 (T006, T010 only) | Review B1: T015/T016/T017 were soft deps. Struct renders without derives/doc initially. |
| T022: Added PRELUDE_TYPES list to scope | Review G6: Exact prelude types now specified for the implementation agent. |
| T023: Changed from tree grouping to flat `use` statements | Review S3: Simpler for MVP. Tree grouping moved to post-MVP. |
| T026: Added negative test for private symbol visibility | Review T3: No negative tests existed. |
| T035: Added prelude type and private symbol edge cases | Review T3: Expanded edge case coverage. |
| E002 epic: Updated task list with T005b, T007b | Reflects new tasks. |
| P01 phase: Updated task table | Reflects new tasks. |
| Agent rules: Updated sequential chains | Reflects T005→T005b chain. |
| Index: Updated task table with T005b, T007b | Reflects new tasks. Total now 37 tasks. |

## Why It Changed

All changes address concrete findings from the architecture review (`06-review.md`). The review cross-referenced the planning docs against actual repository code and found:

1. **Factual inaccuracies** — scopes directory location, SymbolCreator protocol, missing infrastructure files.
2. **Unresolved decisions** — self receiver, use syntax, prelude handling were left as open questions but must be decided before agents implement.
3. **Oversized tasks** — T005 was one task for 6 scopes; now split into 2 manageable pieces.
4. **Missing tasks** — name conflict resolver, api-extractor config.
5. **Over-engineering** — triple declaration spaces and tree use grouping added complexity without MVP justification.

## Remaining Unresolved Questions

1. **Trailing commas in multi-line contexts** — Recommend yes (matches rustfmt). Low risk, can change later.
2. **`tsconfig.base.json` references** — Go/Python/C# are not in the base tsconfig references. This appears optional. Investigate during T001 if build issues arise.
3. **Integration test with `cargo check`** — Nice to have. Can be added post-MVP if Rust toolchain is available in CI.

## Is the Plan Ready for Implementation?

**Yes.** All "must fix" items from the review have been addressed:

- [x] api-extractor.json and build scripts added to T001
- [x] Scopes moved to `src/scopes/`
- [x] SymbolCreator protocol claim fixed
- [x] Declaration spaces simplified to `["types", "values"]`
- [x] T005 split into T005 + T005b
- [x] Name conflict resolver added (T007b)
- [x] Receiver prop decision resolved in design doc
- [x] Prelude type list defined

All "should fix" items have also been addressed:
- [x] T011 dependencies reduced
- [x] Flat `use` statements for MVP
- [x] Negative tests added to T026 and T035

The plan is **ready for implementation** starting with T001 (package scaffold).
