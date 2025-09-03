import { computed, For, Indent, memo } from "@alloy-js/core";
import { basename, join, sep } from "pathe";
import { useModule } from "../scopes/module.js";
import { ImportRecords } from "../scopes/source-file.js";
import { GoSymbol } from "../symbols/go.js";

export interface ImportStatementProps {
  path: string;
  local?: boolean;
  package?: GoSymbol;
  dot?: boolean;
  blank?: boolean;
}

export interface ImportStatementsProps {
  records: ImportRecords;
}

export function ImportStatements(props: ImportStatementsProps) {
  // TODO: allow for manual imports and . imports
  const imports = computed(() => {
    const module = useModule();
    const moduleName = module?.name;
    const builtins: ImportStatementProps[] = [];
    const thirdParty: ImportStatementProps[] = [];
    const local: ImportStatementProps[] = [];
    for (const [pkg, sym] of props.records) {
      const importPath = pkg.fullyQualifiedName;
      if (moduleName && importPath.startsWith(moduleName + sep)) {
        local.push({
          path: importPath,
          package: sym,
        });
      } else if (pkg.builtin) {
        builtins.push({
          path: importPath,
          package: sym,
        });
      } else {
        thirdParty.push({
          path: importPath,
          package: sym,
        });
      }
    }
    local.sort((a, b) => a.path.localeCompare(b.path));
    thirdParty.sort((a, b) => a.path.localeCompare(b.path));
    builtins.sort((a, b) => a.path.localeCompare(b.path));
    const result: (ImportStatementProps | null)[] = [];
    result.push(...builtins);
    if (result.length > 0 && thirdParty.length > 0) {
      result.push(null);
    }
    result.push(...thirdParty);
    if (result.length > 0 && local.length > 0) {
      result.push(null);
    }
    result.push(...local);
    return result;
  });

  const rendered = memo(() => {
    if (imports.value.length > 1) {
      return (
        <>
          import (
          <Indent hardline>
            <For each={imports}>
              {(imp) => (imp === null ? <></> : <ImportStatement {...imp} />)}
            </For>
          </Indent>
          <hbr />)
        </>
      );
    } else if (imports.value.length === 1 && imports.value[0] !== null) {
      return <SingleImportStatement {...imports.value[0]} />;
    } else {
      return null;
    }
  });

  return <>{rendered}</>;
}

function ImportStatement(props: ImportStatementProps) {
  return memo(() => {
    const module = useModule();
    if (props.local) {
      if (!module)
        throw new Error("cannot import local package without module defined");
      props.path = join(module.name, props.path);
    }

    const parts: string[] = [];
    if (props.blank) {
      parts.push("_ ");
    } else if (props.dot) {
      parts.push(". ");
    } else if (props.package) {
      if (props.package.name !== basename(props.path)) {
        parts.push(props.package.name + " ");
      }
    }
    parts.push(`"${props.path}"`);
    return parts;
  });
}

export function SingleImportStatement(props: ImportStatementProps) {
  return (
    <>
      import <ImportStatement {...props} />
    </>
  );
}
