## Working with Alloy Jsx files

This repository is built on alloy which use JSX to define components. This is NOT the same as React JSX, so you should not use React JSX syntax.

- Alloy syntax
  - Base elements are to be imported from `@alloy-js/core`
  - A generic node is defined as `Children`
  - Use `<></>` instead of `<Fragment></Fragment>`
  - DO NOT use any html elements like `<div>`, `<span>`, etc. Use Alloy components instead.
  - Use `code` string template function to render raw string content
- Components should be structured as followed:
  - in a `components` folder in the package
  - file should use `kebab-case` for the file name
  - component should be named using `PascalCase`
  - if component needs props, an interface should be defined with the name `<ComponentName>Props`
  - DO NOT destructure props in the component definition

Do not update changelogs, these are managed by `npx chronus`.

## TypeScript/Symbol Patterns - Known Gotchas

**Static memberSpaces in Symbol subclasses:** When subclassing symbols with custom `memberSpaces`, declare static `memberSpaces` as `readonly string[]` in both base and subclass. TypeScript tuple widening/narrowing on the static side causes incompatibility errors without explicit readonly string[] typing. Always validate symbol changes with: `pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test` (`pnpm --filter @alloy-js/rust build` runs `alloy build --with-dev` and `generate-docs`, so it also checks API surface generation).
**For SourceFile/CrateDirectory loop changes:** run `pnpm --filter @alloy-js/rust exec vitest run test/source-file-crate-directory.test.tsx` first for fast debugging, then run full `pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test`.
**For TypeAlias/ConstDeclaration loops:** run `pnpm --filter @alloy-js/rust exec vitest run test/type-alias-const.test.tsx` first, then run `pnpm --filter @alloy-js/rust test`.
- Avoid whitespace-only `code` template literals (for example, ``code` ` ``); they can crash core code rendering. Use plain string literals like `" "` for standalone spaces.

Critical rules:
1. Do not invent architecture. Ground every important claim in actual repository code, file structure, symbols, or tests.
2. Prefer concrete evidence over broad summaries.
3. Distinguish clearly between:
   - observed facts from the repo
   - inferences from patterns
   - proposals for the new language package
4. When something is unclear, say so explicitly under "Open Questions" or "Ambiguities".
5. Do not start implementing code unless explicitly asked. This phase is documentation and planning only.
6. Write output directly to the requested markdown file.
7. Use clear headings and bullet points where useful.
8. When referencing repository files, include repository-relative paths.
9. Focus only on the parts of the repo relevant to Alloy core and existing language packages.
10. Optimize for future AI coding agents that will consume these documents.
11. For symbol-model changes (like Rust T003), always validate with `pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test` before moving to dependent tasks.

Quality bar:
- Precise
- Evidence-based
- Dependency-aware
- Implementation-oriented
- Not generic
