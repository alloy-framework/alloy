import { useDebugConnectionContext } from "@/hooks/debug-connection-context";
import { useToast } from "@/hooks/use-toast";

export interface SourceLocationLinkProps {
  source: {
    fileName: string;
    lineNumber: number;
    columnNumber: number;
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

  const sourceLabel = `${formatPath(source.fileName)}:${source.lineNumber}:${source.columnNumber}`;

  const handleClick = async (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const normalized = source.fileName.replace(/\\/g, "/");
    const command = `code -g ${normalized}:${source.lineNumber}:${source.columnNumber}`;
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
