import { computed } from "@vue/reactivity";
import { join } from "pathe";
import { useContext } from "../context.js";
import { SourceDirectoryContext } from "../context/source-directory.js";
import { createFileResource } from "../resource.js";
import { Children, isComponentCreator } from "../runtime/component.js";
import { childrenArray } from "../utils.jsx";
import { SourceFile } from "./SourceFile.jsx";

// Regular expression for finding all sigils at once
const SIGIL_REGEX = /^(\s*)(.*alloy-(.+)-(start|end).*)$/gm;

interface SigilInfo {
  id: string;
  start: number | null;
  end: number | null;
}

export interface AppendFileProps {
  /**
   * The path to the file to read and append content to.
   */
  path: string;

  /**
   * List of region IDs to append to. Defaults to ["append"] if not specified.
   * Each region corresponds to an AppendRegion child component.
   */
  regions?: string[];

  /**
   * AppendRegion children components that define content to append.
   */
  children?: Children;
}

/**
 * A component that reads a file and returns content with new content appended
 * at the end or within specific regions marked by alloy-\{region name\}-start/alloy-\{region name\}-end sigils.
 *
 * The component can append content in two ways:
 * 1. **Simple append**: Content is appended to the end of the file
 * 2. **Region-based append**: Content is appended before the end sigil on its own line
 *
 * Region sigils are line-based - any line containing "alloy-\{region name\}-start" or "alloy-\{region name\}-end"
 * is considered a sigil.
 *
 * @example
 * Simple append to end of file:
 * ```tsx
 * <AppendFile path="output.txt">
 *   <AppendRegion id="append">New content to add</AppendRegion>
 * </AppendFile>
 *
 * // Returns:
 * //   Original file content
 * //   New content to add
 * ```
 *
 * @example
 * Append to specific regions:
 * ```tsx
 * // File content before:
 * // Header content
 * // <!-- alloy-main-start -->
 * // <!-- alloy-main-end -->
 * // Footer content
 *
 * <AppendFile path="template.html" regions={["main"]}>
 *   <AppendRegion id="main">New main content</AppendRegion>
 * </AppendFile>
 *
 * // Returns:
 * //   Header content
 * //   <!-- alloy-main-start -->
 * //   New main content
 * //   <!-- alloy-main-end -->
 * //   Footer content
 * ```
 */
export function AppendFile(props: AppendFileProps): Children {
  const regions = props.regions || ["append"];

  // Get all children and filter for AppendRegion components
  const children = childrenArray(() => props.children);
  const appendRegions: Record<string, Children> = {};

  // Check if we have any AppendRegion components
  let hasAppendRegions = false;
  for (const child of children) {
    if (isComponentCreator(child, AppendRegion)) {
      hasAppendRegions = true;
      const regionProps = child.props as AppendRegionProps;
      let content: Children;

      if ("children" in regionProps && regionProps.children !== undefined) {
        content = regionProps.children;
      } else if ("content" in regionProps) {
        content = regionProps.content;
      } else {
        throw new Error(
          `AppendRegion "${regionProps.id}" must have either children or content`,
        );
      }

      appendRegions[regionProps.id] = content;
    }
  }

  // If no AppendRegion components found, treat all children as content for the default "append" region
  if (!hasAppendRegions && children.length > 0) {
    appendRegions["append"] = children;
  }

  // Validate that all requested regions have corresponding AppendRegion children
  for (const regionId of regions) {
    if (!(regionId in appendRegions)) {
      throw new Error(
        `Region "${regionId}" specified but no corresponding AppendRegion child found`,
      );
    }
  }

  // Read existing file content or start with empty string
  const parentDirectory = useContext(SourceDirectoryContext)!;
  const fullPath = join(
    parentDirectory ? parentDirectory.path : "",
    props.path,
  );

  const currentContents = createFileResource(fullPath);
  const newFileContent = computed(() => {
    if (currentContents.loading) {
      return;
    }

    let fileContent = currentContents.error ? "" : currentContents.data!;

    // Find all sigils in the file
    const sigilInfo: Record<string, SigilInfo> = {};
    const endSigils: Array<{
      regionId: string;
      index: number;
      indent: string;
      line: string;
    }> = [];

    // Reset regex and find all sigils
    SIGIL_REGEX.lastIndex = 0;
    let match;
    while ((match = SIGIL_REGEX.exec(fileContent)) !== null) {
      const indent = match[1];
      const fullLine = match[0];
      const regionId = match[3];
      const sigilType = match[4];
      const index = match.index!;

      // Initialize sigil info for this region if not exists
      if (!sigilInfo[regionId]) {
        sigilInfo[regionId] = { id: regionId, start: null, end: null };
      }

      if (sigilType === "start") {
        sigilInfo[regionId].start = index;
      } else if (sigilType === "end") {
        sigilInfo[regionId].end = index;

        // If this is a region we care about, track it for processing
        if (regions.includes(regionId)) {
          endSigils.push({
            regionId,
            index,
            indent,
            line: fullLine,
          });
        }
      }
    }

    // Validate regions - check for unclosed regions
    for (const regionId of regions) {
      const info = sigilInfo[regionId];
      if (info && info.start !== null && info.end === null) {
        throw new Error(
          `Region "${regionId}" has start sigil but no corresponding end sigil`,
        );
      }
    }

    // Check if we have any sigils to process
    if (endSigils.length === 0) {
      // No sigils found, append all regions to the end
      const result: Children[] = [fileContent];
      for (const regionId of regions) {
        if (fileContent && !fileContent.endsWith("\n")) {
          result.push("\n");
        }
        result.push(appendRegions[regionId]);
      }
      return (
        <SourceFile path={props.path} filetype="text/plain">
          {result}
        </SourceFile>
      );
    }

    // Sort end sigils by their position in the file
    endSigils.sort((a, b) => a.index - b.index);

    // Process content with sigils
    const result: Children[] = [];
    let lastIndex = 0;

    // Process each end sigil in order
    for (const { regionId, index, indent, line } of endSigils) {
      // Add content before this sigil
      if (index > lastIndex) {
        const beforeContent = fileContent.substring(lastIndex, index);
        if (beforeContent) {
          result.push(beforeContent);
        }
      }

      // Add the new content with proper indentation
      result.push(indent);
      result.push(appendRegions[regionId]);
      result.push("\n");

      // Add the sigil line
      result.push(line);

      // Update last processed index
      lastIndex = index + line.length;
    }

    // Add any remaining content after the last sigil
    if (lastIndex < fileContent.length) {
      const remainingPart = fileContent.substring(lastIndex);
      if (remainingPart) {
        result.push(remainingPart);
      }
    }
    return result;
  });

  return (
    <SourceFile path={props.path} filetype="text/plain">
      {newFileContent}
    </SourceFile>
  );
}

export interface AppendRegionPropsWithChildren {
  /**
   * The ID of the region.
   */
  id: string;

  /**
   * The content to append to the region.
   */
  children: Children;
}

export interface AppendRegionPropsWithContent {
  /**
   * The ID of the region.
   */
  id: string;

  /**
   * The content to append to the region.
   */
  content: Children;
}

export interface AppendRegionPropsBase {
  /**
   * The ID of the region.
   */
  id: string;
}

export type AppendRegionProps =
  | AppendRegionPropsWithChildren
  | AppendRegionPropsWithContent
  | AppendRegionPropsBase;

export function AppendRegion(props: AppendRegionProps) {
  /**
   * This component does nothing except hold props which are retrieved by
   * the `AppendFile` component.
   */
}
