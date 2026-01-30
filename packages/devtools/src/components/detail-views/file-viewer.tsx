import type { ReactNode } from "react";

export interface FileViewerProps {
  content: ReactNode;
}

export function FileViewer({ content }: FileViewerProps) {
  return <div className="h-full overflow-auto">{content}</div>;
}
