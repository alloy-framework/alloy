import { ImportStatement } from "./ImportStatement.js";
import { SourceFile } from "./SourceFile.js";

export interface BarrelFileProps {
  /**
   * The name of the source file
   */
  path?: string;
}

export function BarrelFile(props: BarrelFileProps) {
  const path = props.path ?? "index.py";

  return (
    <SourceFile path={path}>
      <ImportStatement module="replace_this_for_implementation.py" wildcard />
    </SourceFile>
  );
}
