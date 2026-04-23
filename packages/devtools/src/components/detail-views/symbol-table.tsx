import { type DebugSymbolListItem } from "./debug-utils.tsx";
import { NoneText } from "./none-text";

export interface SymbolTableProps {
  symbols: DebugSymbolListItem[];
  onOpenSymbol?: (id: number) => void;
}

export function SymbolTable({ symbols, onOpenSymbol }: SymbolTableProps) {
  if (symbols.length === 0) return <NoneText label="none" />;

  return (
    <table className="w-auto">
      <tbody>
        {symbols.map((symbol) => {
          const label = symbol.name ?? `#${symbol.id}`;
          return (
            <tr key={symbol.id}>
              <td className="pr-2 pb-1 align-top">
                {onOpenSymbol ?
                  <a
                    className="text-primary underline"
                    href="#"
                    onClick={(event) => {
                      event.preventDefault();
                      onOpenSymbol(symbol.id);
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
