---
changeKind: feature
packages:
  - "@alloy-js/python"
---

Create `pydanticModule` (including `alias_generators`, `types`), add `typingModule` and `pydanticSettingsModule`, `modelConfigExpression` on `PydanticClassDeclaration`, and `decorators` on function/method declarations. `ClassMethodDeclaration` / `StaticMethodDeclaration` emit optional `decorators` above `@classmethod` / `@staticmethod` so validators stack correctly.
