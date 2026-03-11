# P02: Core Components

## Goal
Implement all basic Rust declaration components so single-file Rust code can be generated.

## Why This Phase Exists
After foundation, users need renderable components. This phase delivers the first visible output.

## Included Epics
- [E003: Core Declaration Components](../epics/E003-core-components.md) (all tasks)

## Included Tasks
| ID | Title | Type |
|----|-------|------|
| T009 | SourceFile and CrateDirectory | feature |
| T010 | Declaration and Reference basics | feature |
| T011 | StructDeclaration and Field | feature |
| T012 | EnumDeclaration and EnumVariant | feature |
| T013 | FunctionDeclaration and Parameters | feature |
| T014 | TypeAlias and ConstDeclaration | feature |
| T015 | Attribute and DeriveAttribute | feature |
| T016 | DocComment and ModuleDocComment | feature |
| T017 | TypeParameters and WhereClause | feature |
| T018 | Value component | feature |

## Exit Criteria
- `struct.test.tsx`, `enum.test.tsx`, `function.test.tsx`, `attributes.test.tsx` pass.
- Single-file Rust output is syntactically correct.
- All components render with correct visibility, derives, doc comments, type parameters.

## Risks
- SourceFile stub (no imports yet) must be designed to easily add import rendering in P04.
