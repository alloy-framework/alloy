# E008: Expression and Statement Components

## Summary

Add expression-level and statement-level components for generating Rust function bodies, control flow, and common expression patterns. Moves the package beyond declaration-only generation.

## Why This Epic Exists

The initial MVP only provides declaration-level components (structs, functions, traits, etc.). Function bodies must be written as raw `code` template literals. Analysis of `samples/rust-example/` found 24 raw code instances that could be replaced by dedicated components. TypeScript and C# Alloy packages already provide expression/statement components.

## Goals

- Provide struct literal expression components (covers the most common raw code pattern).
- Provide control flow components (match, if, for, while, loop).
- Provide expression components (function calls, closures, method chains).
- Provide utility expression components (return, break, continue, macros, try, await).
- Update the rust-example sample to demonstrate the new components.

## In Scope

- T046: StructExpression + FieldInit
- T047: MatchExpression + MatchArm
- T048: IfExpression + ElseIfClause + ElseClause
- T049: LetBinding
- T050: FunctionCallExpression
- T051: ClosureExpression
- T052: ReturnExpression + MacroCall
- T053: Update rust-example sample
- T055: ForExpression
- T056: WhileExpression + LoopExpression
- T057: BreakExpression + ContinueExpression
- T060: AwaitExpression
- T061: MethodChainExpression
- T064: TryExpression (? operator)
- T065: UnsafeBlock
- T067: BlockExpression

## Out of Scope

- Pattern matching DSL (destructuring patterns remain as raw strings).
- Async blocks.
- Full iterator adapter library.

## Dependencies

- E007 (bug fixes) — T039 (Reference scope traversal) unblocks using Reference in expressions.

## What It Enables

- Code generators can produce complete Rust function bodies with structured components.
- Composable expression trees instead of raw string templates.
- The sample project becomes a full showcase of the package's capabilities.

## Risks / Notes

- Expression components are pure rendering components — no symbol/scope integration initially.
- MatchExpression and IfExpression are the highest-value additions.
- StructExpression covers the most raw code instances (8 of 24).
- STC wrappers should be created for each new component.

## Task List

### Tier 1 — High Impact

- [T046: StructExpression + FieldInit](../tasks/T046-struct-expression.md) — P1
- [T047: MatchExpression + MatchArm](../tasks/T047-match-expression.md) — P1
- [T048: IfExpression + ElseIfClause + ElseClause](../tasks/T048-if-expression.md) — P1
- [T055: ForExpression](../tasks/T055-for-expression.md) — P1

### Tier 2 — Medium Impact

- [T049: LetBinding](../tasks/T049-let-binding.md) — P2
- [T050: FunctionCallExpression](../tasks/T050-function-call-expression.md) — P2
- [T051: ClosureExpression](../tasks/T051-closure-expression.md) — P2
- [T056: WhileExpression + LoopExpression](../tasks/T056-while-loop-expression.md) — P2
- [T057: BreakExpression + ContinueExpression](../tasks/T057-break-continue.md) — P2
- [T060: AwaitExpression](../tasks/T060-await-expression.md) — P2
- [T061: MethodChainExpression](../tasks/T061-method-chain-expression.md) — P2
- [T064: TryExpression](../tasks/T064-try-expression.md) — P2

### Tier 3 — Nice to Have

- [T052: ReturnExpression + MacroCall](../tasks/T052-return-macro.md) — P3
- [T065: UnsafeBlock](../tasks/T065-unsafe-block.md) — P3
- [T067: BlockExpression](../tasks/T067-block-expression.md) — P3

### Integration

- [T053: Update rust-example sample](../tasks/T053-update-rust-example.md) — P2

## Sequencing Notes

Tier 1 tasks are independent and can be parallelized. Tier 2 tasks can also be parallelized. T057 depends on T055/T056. T061 depends on T050. T053 depends on all other tasks plus E007 bug fixes.

## Completion Criteria

- All expression/statement components implemented with tests.
- STC wrappers exported for each new component.
- `samples/rust-example/` updated to use new components with minimal raw code remaining.
