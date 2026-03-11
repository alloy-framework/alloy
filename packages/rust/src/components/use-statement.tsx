import { code } from "@alloy-js/core";
import { useRustModuleScope } from "../scopes/contexts.js";

export interface UseStatementProps {
  path: string;
  symbol: string;
}

interface UseImportEntry {
  path: string;
  symbol: string;
}

interface UseStatementGroupProps {
  entries: UseImportEntry[];
}

export function UseStatement(props: UseStatementProps) {
  return (
    <>
      {code`use `}
      {props.path}
      {code`::`}
      {props.symbol}
      {code`;`}
    </>
  );
}

function UseStatementGroup(props: UseStatementGroupProps) {
  return (
    <>
      {props.entries.map((entry, index) => (
        <>
          <UseStatement path={entry.path} symbol={entry.symbol} />
          {index < props.entries.length - 1 ? <hbr /> : null}
        </>
      ))}
    </>
  );
}

export function UseStatements() {
  const moduleScope = useRustModuleScope();
  const stdEntries: UseImportEntry[] = [];
  const externalEntries: UseImportEntry[] = [];
  const crateEntries: UseImportEntry[] = [];

  for (const [path, symbols] of moduleScope.imports) {
    for (const symbol of symbols) {
      const entry = { path, symbol: symbol.name };
      if (path === "std" || path.startsWith("std::")) {
        stdEntries.push(entry);
      } else if (path === "crate" || path.startsWith("crate::")) {
        crateEntries.push(entry);
      } else {
        externalEntries.push(entry);
      }
    }
  }

  const sortEntries = (left: UseImportEntry, right: UseImportEntry) =>
    `${left.path}::${left.symbol}`.localeCompare(`${right.path}::${right.symbol}`);

  stdEntries.sort(sortEntries);
  externalEntries.sort(sortEntries);
  crateEntries.sort(sortEntries);

  const groups = [stdEntries, externalEntries, crateEntries].filter(
    (group) => group.length > 0,
  );

  if (groups.length === 0) {
    return <></>;
  }

  return (
    <>
      {groups.map((group, index) => (
        <>
          <UseStatementGroup entries={group} />
          {index < groups.length - 1 ? (
            <>
              <hbr />
              <hbr />
            </>
          ) : null}
        </>
      ))}
    </>
  );
}
