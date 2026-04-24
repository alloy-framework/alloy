# Developer Memory

## Completed slices

### binder-per-symbol-notify-effect
- Replaced `effect()` per symbol in `notifySymbolCreated()` with synchronous `updateRefkeys()` helper
- Added optional `notifySymbolRefkeysChanged?(symbol, oldRefkeys, newRefkeys)` to `Binder` interface (additive, non-breaking; newRefkeys arg added in review fix)
- `OutputSymbol.refkeys` setter now calls `binder.notifySymbolRefkeysChanged(this, old, this.#refkeys)` directly (passing raw field, no getter tracking)
- `notifySymbolCreated` uses `untrack(() => symbol.refkeys)` to avoid leaking reactive deps into outer effects
- `moveTakenMembersTo` now batches new refkeys and assigns via the setter (not `.push()`) so binder sees all pushed refkeys
- Fast-path in `resolveDeclarationByKey` now emits `resolve.success` debug trace
- Eliminates ~1,666 long-lived reactive effects (one per symbol)
- All 365 core tests pass; monorepo build succeeds

## Notes
- `effect` import still needed in binder.ts for the `resolve()` function's unresolved-refkey diagnostic
- The `refkeys` getter still has `track()` for other reactive consumers; trigger() in setter still runs
