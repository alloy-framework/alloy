import { computed } from "@vue/reactivity";
import { join } from "pathe";
import { useContext } from "../context.js";
import { SourceDirectoryContext } from "../context/source-directory.js";
import { createFileResource } from "../resource.js";
import { Children } from "../runtime/component.js";
import { SourceFile } from "./SourceFile.jsx";
/**
 * Props for the UpdateFile component.
 */
export interface UpdateFileProps {
  /** The relative path to the file to update or create */
  path: string;
  /** Optional path to a file containing default content to use when the target file doesn't exist */
  defaultContentPath?: string;
  /** Optional default content to use when the target file doesn't exist */
  defaultContent?: Children;
  /** Function that receives the current file contents and returns the new content */
  children: (currentContents: string | null) => Children;
}

/**
 * A component for updating existing files or initializing new files.
 *
 * This component allows you to read the current contents of a file and generate
 * new content based on those contents. If the file doesn't exist, it can use
 * default content from either a file path or inline content.
 *
 * @example
 * ```tsx
 * <UpdateFile path="config.json" defaultContent="{}">
 *   {(currentContents) => {
 *     const config = currentContents ? JSON.parse(currentContents) : {};
 *     config.newProperty = "value";
 *     return code`${JSON.stringify(config, null, 2)}`;
 *   }}
 * </UpdateFile>
 * ```
 */
export function UpdateFile(props: UpdateFileProps) {
  const parentDirectory = useContext(SourceDirectoryContext)!;
  const fullPath = join(
    parentDirectory ? parentDirectory.path : "",
    props.path,
  );
  const fileResource = createFileResource(fullPath);

  const newContent = computed(() => {
    if (fileResource.loading) {
      return;
    }

    if (fileResource.error) {
      if ((fileResource.error as any).code === "ENOENT") {
        if ("defaultContentPath" in props) {
          const defaultContentResource = createFileResource(
            props.defaultContentPath!,
          );
          return computed(() => {
            if (defaultContentResource.loading) {
              return;
            }

            if (defaultContentResource.error) {
              throw defaultContentResource.error;
            }

            return props.children(defaultContentResource.data!);
          });
        } else {
          return props.children(null);
        }
      }

      throw fileResource.error;
    }

    return props.children(fileResource.data!);
  });

  return (
    <SourceFile path={props.path} filetype="text/plain">
      {newContent}
    </SourceFile>
  );
}
