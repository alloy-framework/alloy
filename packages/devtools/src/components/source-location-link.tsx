import { useDebugConnectionContext } from "@/hooks/debug-connection-context";
import { useToast } from "@/hooks/use-toast";

export interface SourceLocationLinkProps {
  source: {
    fileName?: string;
    lineNumber?: number;
    columnNumber?: number;
  };
  className?: string;
  children?: React.ReactNode;
}

export function SourceLocationLink({
  source,
  className,
  children,
}: SourceLocationLinkProps) {
  const { formatPath } = useDebugConnectionContext();
  const { toast } = useToast();

  const sourceLabel =
    source.fileName ?
      `${formatPath(source.fileName)}:${source.lineNumber ?? "?"}`
    : "";

  const handleClick = async (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (!source.fileName) return;
    const normalized = source.fileName.replace(/\\/g, "/");
    const line = source.lineNumber ?? 1;
    const column = source.columnNumber ?? 1;
    const command = `code -g ${normalized}:${line}:${column}`;
    try {
      await navigator.clipboard.writeText(command);
      toast({
        title: "Copied",
        description: "VSCode open command copied",
      });
    } catch {
      toast({
        title: "Copy failed",
        description: "Unable to copy the source location command.",
      });
    }
  };

  if (!source.fileName) {
    return <span className={className}>{children}</span>;
  }

  return (
    <a
      className={className ?? "text-primary underline"}
      href="#"
      onClick={handleClick}
    >
      {children ?? sourceLabel}
    </a>
  );
}
