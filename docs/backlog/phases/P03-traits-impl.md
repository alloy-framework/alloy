# P03: Traits and Impl Blocks

## Goal

Add Rust trait declarations and impl blocks — the novel construct with no direct analog in other Alloy packages.

## Why This Phase Exists

Traits and impls are core to Rust's type system. They're architecturally novel for Alloy and need focused attention.

## Included Epics

- [E004: Traits and Impl Blocks](../epics/E004-traits-and-impl.md) (all tasks)

## Included Tasks

| ID   | Title                                | Type    |
| ---- | ------------------------------------ | ------- |
| T019 | TraitDeclaration                     | feature |
| T020 | ImplBlock                            | feature |
| T021 | Self receiver in FunctionDeclaration | feature |

## Exit Criteria

- `trait.test.tsx` and `impl.test.tsx` pass.
- Traits with methods and default impls render correctly.
- Both inherent and trait impl blocks render correctly.
- Methods inside impl blocks auto-get `&self` receiver.

## Risks

- Impl blocks adding members to existing types is unprecedented in Alloy. Test carefully for symbol conflicts.
