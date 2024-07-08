export interface ImportStatementProps {
  path: string;
  types: Set<string>;
}

export function ImportStatement(props: ImportStatementProps) {
  // when the `code` template tag is implemented, the lambda won't be needed.
  return () =>
    `import { ${[...props.types.values()].join(", ")} } from "${props.path}";`;
}