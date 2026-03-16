import { code, memo } from "@alloy-js/core";
import { useRustModuleScope } from "../scopes/contexts.js";

export interface UseStatementProps {
  path: string;
  symbol: string;
}

interface UseStatementEntry {
  path: string;
  symbols: string[];
}

interface UseStatementGroupProps {
  entries: UseStatementEntry[];
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

function UseStatementPath(props: UseStatementEntry) {
  const sortedSymbols = [...props.symbols].sort((left, right) =>
    left.localeCompare(right),
  );

  if (sortedSymbols.length === 1) {
    return <UseStatement path={props.path} symbol={sortedSymbols[0]} />;
  }

  return (
    <>
      {code`use `}
      {props.path}
      {code`::{`}
      {sortedSymbols.join(", ")}
      {code`};`}
    </>
  );
}

function UseStatementGroup(props: UseStatementGroupProps) {
  return (
    <>
      {props.entries.map((entry, index) => (
        <>
          <UseStatementPath path={entry.path} symbols={entry.symbols} />
          {index < props.entries.length - 1 ?
            <hbr />
          : null}
        </>
      ))}
    </>
  );
}

export function UseStatements() {
  const moduleScope = useRustModuleScope();
  return memo(() => {
    const stdEntries: UseStatementEntry[] = [];
    const externalEntries: UseStatementEntry[] = [];
    const crateEntries: UseStatementEntry[] = [];

    for (const [path, symbols] of moduleScope.imports) {
      const entry = {
        path,
        symbols: [...symbols].map((symbol) => symbol.name),
      };

      if (path === "std" || path.startsWith("std::")) {
        stdEntries.push(entry);
      } else if (path === "crate" || path.startsWith("crate::")) {
        crateEntries.push(entry);
      } else {
        externalEntries.push(entry);
      }
    }

    const sortEntries = (left: UseStatementEntry, right: UseStatementEntry) =>
      left.path.localeCompare(right.path);

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
            {index < groups.length - 1 ?
              <>
                <hbr />
                <hbr />
              </>
            : null}
          </>
        ))}
      </>
    );
  });
}
