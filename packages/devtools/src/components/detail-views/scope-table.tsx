import { type DebugScopeListItem } from "./debug-utils.tsx";
import { NoneText } from "./none-text";

export interface ScopeTableProps {
  scopes: DebugScopeListItem[];
  onOpenScope?: (id: number) => void;
}

export function ScopeTable({ scopes, onOpenScope }: ScopeTableProps) {
  if (scopes.length === 0) return <NoneText label="none" />;

  return (
    <table className="w-auto">
      <tbody>
        {scopes.map((scope) => {
          const label = scope.name ?? `#${scope.id}`;
          return (
            <tr key={scope.id}>
              <td className="pr-2 pb-1 align-top">
                {onOpenScope ?
                  <a
                    className="text-primary underline"
                    href="#"
                    onClick={(event) => {
                      event.preventDefault();
                      onOpenScope(scope.id);
                    }}
                  >
                    {label}
                  </a>
                : <span>{label}</span>}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
