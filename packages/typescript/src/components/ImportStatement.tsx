import { computed, mapJoin, memo } from "@alloy-js/core";

export interface ImportSymbol {
  bindingName: string;
  localName: string;
}

export interface ModuleImports {
  default?: ImportSymbol;
  named: Set<ImportSymbol>;
}

export type ImportRecords = Map<string, ModuleImports>;

export interface ImportStatementsProps {
  records: ImportRecords;
}

export function ImportStatements(props: ImportStatementsProps) {
  return memo(() =>
    mapJoin(props.records, (path, types) => (
      <ImportStatement path={path} types={types} />
    ))
  );
}

export interface ImportStatementProps {
  path: string;
  types: ModuleImports;
}

export function ImportStatement(props: ImportStatementProps) {
  const defaultImport = computed(() => {
    if (!props.types.default) {
      return "";

    }
    let defaultImport = props.types.default.localName;

    if (props.types.named.size > 0) {
      defaultImport += ", ";
    }
    return defaultImport;
  })

  const namedImports = computed(() => {
    if (props.types.named.size === 0) {
      return "";
    } else {
      return "{ " + [...props.types.named.values()]
      .map((v) => v.localName === v.bindingName ? v.localName : `${v.bindingName} as ${v.localName}`)
      .join(", ") + " }"
    }
  });

  // when the `code` template tag is implemented, the lambda won't be needed.
  return () =>
    `import ${defaultImport.value}${namedImports.value} from "${props.path}";`;
}
