# T058 — TupleStruct Declaration

| Field | Value |
|-------|-------|
| **ID** | T058 |
| **Epic** | [E009](../epics/E009-language-feature-gaps.md) |
| **Type** | feature |
| **Status** | done |
| **Priority** | P1 — must-have |
| **Owner Role** | AI coding agent |
| **AI Executable** | Yes |
| **Human Review Required** | Yes |
| **Dependencies** | T011 (StructDeclaration) |
| **Blocks** | — |

---

## Description

Rust has three struct forms, but only named-field structs are currently supported:

```rust
// Named-field (supported):
struct User { name: String, age: u32 }

// Tuple struct (NOT supported):
struct Point(i32, i32);
struct Wrapper(String);
struct Id(u64);

// Unit struct (partially supported — renders empty braces):
struct Marker;
```

Tuple structs are common for newtype patterns, wrapper types, and simple data containers. They need a different syntax from named-field structs (parentheses instead of braces, types instead of named fields).

---

## Proposed API

Option A — Extend `StructDeclaration` with a `tuple` mode:
```tsx
<StructDeclaration name="Point" pub tuple types={["i32", "i32"]} />
// Renders: pub struct Point(i32, i32);

<StructDeclaration name="Wrapper" pub tuple types={["String"]} derives={["Debug"]} />
// Renders: #[derive(Debug)] pub struct Wrapper(String);
```

Option B — Separate component:
```tsx
<TupleStructDeclaration name="Point" pub types={["i32", "i32"]} />
```

### Props (Option A extension)

```typescript
// Extend existing StructDeclarationProps:
interface StructDeclarationProps {
  // ... existing props ...
  tuple?: boolean;       // Render as tuple struct
  types?: Children[];    // Tuple field types (when tuple=true)
  unit?: boolean;        // Render as unit struct (no body)
}
```

---

## Scope Included

- Support tuple struct syntax `struct Name(Type1, Type2);`
- Support unit struct syntax `struct Name;`
- Visibility, derives, attributes, doc comments, and generics on tuple structs
- Symbol registration (creates NamedTypeSymbol like regular structs)
- STC wrapper
- Unit tests

---

## Scope Excluded

- Tuple struct field visibility (`pub` on individual tuple fields) — add if needed

---

## Acceptance Criteria

- [x] Tuple structs render as `struct Name(Type1, Type2);`
- [x] Unit structs render as `struct Name;` (no braces)
- [x] Derives, attributes, doc comments work on tuple structs
- [x] Generic tuple structs render `struct Name<T>(T);`
- [x] Existing named-field struct tests unaffected
- [x] STC wrapper exported
