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
