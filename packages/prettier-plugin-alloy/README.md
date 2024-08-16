# Prettier plugin for Alloy JSX/TSX files

Prettier plugin that disable the automatic formatting of JSX elements.
This still allows the rest to be formatted but allows keeping whitespace that are important for Alloy.

## Usage

```
npm install --save-dev @alloy-js/prettier-plugin-alloy
```

Then, add the following to your `.prettierrc.yaml` file:

```yaml
plugins:
  - "@alloy-js/prettier-plugin-alloy"
```

### Override `.jsx` or `.tsx` formatting

If you want to override the formatting for `.jsx` or `.tsx` files, you can use the `overrides` option in your `.prettierrc.yaml` file:

```yaml
overrides:
  - files: "*.tsx"
    options:
      parser: alloy-ts
  - files: "*.jsx"
    options:
      parser: alloy-js
```

Override only `.alloy.tsx` or `.alloy.jsx` files:

```yaml
overrides:
  - files: "*.alloy.tsx"
    options:
      parser: alloy-ts
  - files: "*.alloy.jsx"
    options:
      parser: alloy-js
```
