# Rust Standard Library Builtins

Auto-generated crate descriptors for `core`, `alloc`, and `std`, produced by a generic tool that works with any rustdoc JSON.

## Directory structure

All files except `index.ts` and `prelude.ts` in the root, and `index.ts` in each crate directory, are generated — do not edit by hand.

```
builtins/
  index.ts              — barrel export (std, core, alloc, PRELUDE_TYPES, etc.)
  prelude.ts            — edition-aware PRELUDE_TYPES sets
  core/
    index.ts            — core crate descriptor (imports all module files)
    fmt.ts              — core::fmt module (Display, Debug, Formatter + methods)
    option.ts           — core::option module (Option + methods)
    iter.ts             — core::iter module (Iterator, Chain, Map, Filter, ...)
    ...                 — 43 module files total
  alloc/
    index.ts            — alloc crate descriptor
    vec.ts              — alloc::vec module (Vec + 70+ methods)
    string.ts           — alloc::string module (String + methods)
    ...                 — 14 module files total
  std/
    index.ts            — std crate descriptor (includes merged core+alloc modules)
    collections.ts      — std::collections (HashMap, BTreeMap, etc. + methods)
    io.ts               — std::io (Read, Write, BufReader, etc.)
    ...                 — 54 module files total
```

Each crate is generated independently from its own rustdoc JSON. The `std` descriptor includes all `core` and `alloc` modules via `--merge-from`.

## What's encoded

Each symbol has:
- **`kind`**: `struct`, `enum`, `trait`, `function`, `type-alias`, `const`, `symbol`
- **`metadata.since`**: minimum Rust version (e.g., `"1.80.0"`) from stability attributes
- **`members`**: inherent methods/associated functions on types (structs, enums, traits)
  - `kind: "function"` for all members
  - `associated: true` for associated functions (no `self`, called with `::` like `HashMap::new()`)
  - Without `associated`: instance methods (has `self`, called with `.` like `map.insert(k, v)`)

## Usage

```ts
import { std, core, alloc } from "@alloy-js/rust";

// Normal crate — use std
<Reference refkey={std.fmt.Display} />             // → use std::fmt::Display;
<Reference refkey={std.collections.HashMap} />     // → use std::collections::HashMap;

// Access member refkeys
std.collections.HashMap.insert   // Refkey for the insert method
std.collections.HashMap.new      // Refkey for the new associated function

// #![no_std] — use core directly
<Reference refkey={core.fmt.Display} />            // → use core::fmt::Display;

// #![no_std] + alloc
<Reference refkey={alloc.vec.Vec} />               // → use alloc::vec::Vec;
```

### Edition-aware preludes

The `reference.tsx` module automatically selects the correct prelude based on the `edition` prop on `<CrateDirectory>`. Types in the active prelude don't generate `use` statements.

```ts
import { PRELUDE_TYPES_2021, PRELUDE_TYPES_2024 } from "@alloy-js/rust";

// 2021 adds: TryFrom, TryInto, FromIterator
// 2024 adds: Future, IntoFuture
```

## Regenerating

### Prerequisites

- Rust **nightly** toolchain with `rust-src` component:
  ```sh
  rustup toolchain install nightly
  rustup component add rust-src --toolchain nightly
  ```
- If `libz.so.1` is not on the default library path (e.g. Nix environments):
  ```sh
  export LD_LIBRARY_PATH=$(dirname $(find /nix/store -name "libz.so.1" 2>/dev/null | head -1))
  ```

### Step 1: Generate rustdoc JSON

Run `cargo doc` inside each library's source tree:

```sh
SYSROOT=$(rustc +nightly --print sysroot)
LIBS="$SYSROOT/lib/rustlib/src/rust/library"

for crate in core alloc std; do
  cd "$LIBS/$crate"
  CARGO_TARGET_DIR=~/rustdoc-output \
    RUSTDOCFLAGS="-Z unstable-options --output-format json" \
    cargo +nightly doc --no-deps
done
```

This produces `~/rustdoc-output/doc/{core,alloc,std}.json`.

> **Why nightly?** The `--output-format json` flag is unstable.

> **`/tmp` won't work** if mounted with `noexec`. Use a home directory path.

### Step 2: Run the generator

From the repository root:

```sh
npx tsx packages/rust/scripts/generate-crate-descriptor.ts \
  ~/rustdoc-output/doc/core.json --builtin

npx tsx packages/rust/scripts/generate-crate-descriptor.ts \
  ~/rustdoc-output/doc/alloc.json --builtin

npx tsx packages/rust/scripts/generate-crate-descriptor.ts \
  ~/rustdoc-output/doc/std.json --builtin \
  --prelude --prelude-source ~/rustdoc-output/doc/core.json \
  --merge-from ~/rustdoc-output/doc/core.json \
  --merge-from ~/rustdoc-output/doc/alloc.json
```

### Step 3: Verify

```sh
cd packages/rust
npx tsc --noEmit
npx vitest run
```

## Using with third-party crates

The generator works with any crate's rustdoc JSON:

```sh
# In a project that depends on serde
RUSTDOCFLAGS="-Z unstable-options --output-format json" cargo +nightly doc
npx tsx packages/rust/scripts/generate-crate-descriptor.ts target/doc/serde.json
```

This generates a descriptor directory with versioned dependency info (the version goes into Cargo.toml `[dependencies]`).

## How the generator works

The generic tool (`scripts/generate-crate-descriptor.ts`):

1. **Walks the module tree** from the root, recording public symbols with their rustdoc item IDs.

2. **Follows re-exports** (`pub use` items). When the target is in the index, it walks into it. When external (cross-crate), it scans the paths table.

3. **Extracts inherent methods** from `impl` blocks for structs, enums, and traits. Classifies as instance method (has `self`) or associated function (no `self`).

4. **Extracts stability metadata** from `#[stable(since = "1.80.0")]` attributes.

5. **Merges from other crates** (`--merge-from`). For std, this pulls in all core and alloc symbols with their methods, so re-exported types like `BTreeMap` get full member listings.

6. **Generates edition-aware preludes** (`--prelude --prelude-source`). Walks `std::prelude::v1` and each edition module, using core's rustdoc to resolve glob re-exports.

7. **Outputs per-module files** in a crate directory, keeping each file small to avoid TS2742 API Extractor portability errors.

### CLI options

```
npx tsx generate-crate-descriptor.ts <rustdoc.json> [options]

  --builtin                Mark as builtin (no Cargo.toml dependency)
  --prelude                Generate prelude.ts with PRELUDE_TYPES sets
  --prelude-source PATH    Core rustdoc JSON for resolving edition prelude globs
  --merge-from PATH        Merge another crate's symbols (repeatable)
  --out PATH               Output directory (default: src/builtins/<crate>/)
  --skip MOD1,MOD2         Comma-separated modules to skip
```

## Excluded modules

Standard library crates automatically skip:

| Module | Reason |
|--------|--------|
| `os`, `arch`, `simd` | Platform-specific |
| `f16`, `f128`, `bstr`, `autodiff` | Nightly-only |
| `intrinsics`, `field`, `hint` | Compiler internals |
| `prelude`, `primitive`, `index` | Meta-modules or naming conflicts |
| `unsafe_binder`, `from`, `async_iter` | Nightly-only |

Override with `--skip` for other crates.

## Versioning

- **core/alloc/std**: version `0.0.0` (implicit toolchain version). Stability is tracked per-symbol via `since`.
- **Third-party crates**: semver from `crate_version` in rustdoc JSON → `version` in descriptor → Cargo.toml `[dependencies]`.

## Rustdoc JSON format

Currently uses format version 57. The format is documented at https://github.com/rust-lang/rust/blob/main/src/rustdoc-json-types/lib.rs.

## What's NOT yet encoded

The following data is available in rustdoc JSON but not yet extracted:

| Data | Available in rustdoc | Potential use |
|---|---|---|
| Generic parameters (`<K, V>`) | Yes | Type-safe generic instantiation |
| Parameter types on functions | Yes | Type-checked JSX props |
| Return types | Yes | Type-checked output |
| Trait implementations | Yes | Derive validation, trait bounds |
| Enum variants | Yes | Match arm generation |
| Struct fields | Yes | Struct literal generation |
| Documentation strings | Yes | Doc comments in generated code |
| Where clauses | Yes | Constraint rendering |
