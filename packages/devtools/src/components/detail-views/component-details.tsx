import type { RenderTreeNode } from "@/components/render-tree";
import { SourceLocationLink } from "@/components/source-location-link";
import { useDebugConnectionContext } from "@/hooks/debug-connection-context";
import { NoneText } from "./none-text";

export interface ComponentDetailsProps {
  node: RenderTreeNode;
  onRerender: () => void;
  onRerenderAndBreak: () => void;
}

export function ComponentDetails({
  node,
  onRerender,
  onRerenderAndBreak,
}: ComponentDetailsProps) {
  const { formatPath } = useDebugConnectionContext();
  const source = node.source;
  const sourceLabel =
    source && source.fileName ?
      `${formatPath(source.fileName)}:${source.lineNumber}:${source.columnNumber}`
    : undefined;
  return (
    <div className="p-4 text-sm">
      <div className="text-muted-foreground">Render node #{node.id}</div>
      <div className="mt-3">
      <div>
          <span className="font-medium">Source:</span>{" "}
          {sourceLabel ?
            <SourceLocationLink
              source={source!}
              className="text-primary underline font-normal"
            >
              {sourceLabel}
            </SourceLocationLink>
          : <span className="text-muted-foreground/70">
              No source info available.
            </span>
          }
        </div>
      </div>
      <div className="mt-3">
        <div className="font-medium">Props</div>
        {(
          node.props &&
          (typeof node.props !== "object" || Object.keys(node.props).length > 0)
        ) ?
          <div className="mt-2 overflow-hidden">
            <table className="w-auto">
              <tbody>
                {(typeof node.props === "string" ?
                  [["value", node.props]]
                : Object.entries(node.props)
                ).map(([key, value]) => (
                  <tr key={key}>
                    <td className="px-2 py-1 align-top text-muted-foreground font-semibold whitespace-nowrap">
                      {key}
                    </td>
                    <td className="px-2 py-1">
                      <pre className="whitespace-pre-wrap break-words">
                        {typeof value === "string" ?
                          value
                        : JSON.stringify(value, null, 2)}
                      </pre>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        : <div className="mt-1">
            <NoneText />
          </div>
        }
      </div>
      <div className="mt-3 flex gap-2">
        <a
          className="px-2 py-1 rounded border border-border hover:bg-accent"
          href="#"
          onClick={(event) => {
            event.preventDefault();
            onRerender();
          }}
        >
          Rerender
        </a>
        <a
          className="px-2 py-1 rounded border border-border hover:bg-accent"
          href="#"
          onClick={(event) => {
            event.preventDefault();
            onRerenderAndBreak();
          }}
        >
          Rerender + Break
        </a>
      </div>
    </div>
  );
}
