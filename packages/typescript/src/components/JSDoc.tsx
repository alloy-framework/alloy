import * as ay from "@alloy-js/core";

/** Props for the JSDoc component. */
export interface JSDocProps {
  /** Main documentation text provided as a single string or an array of strings. */
  content?: string[] | string;
  /** Child content that will be rendered after the JSDoc comment. */
  children?: ay.Children;
}

/**
 * The JSDoc component generates a JSDoc comment block from the provided content and parameter documentation.
 *
 * If no valid documentation is provided, it renders the child content directly.
 *
 * @param props - The props for this component.
 * @returns The rendered JSDoc comment and any children.
 */
export function JSDoc(props: JSDocProps) {
  if (!props.content) {
    return props.children;
  }

  const { content } = props;
  // If neither content nor valid parameter documentation is provided, simply render children.
  if (!content) {
    return props.children;
  }

  // Convert the main content into an array of strings.
  let mainContent: string[] = [];
  if (content) {
    if (typeof content === "string") {
      mainContent = content.split("\n");
    } else {
      mainContent = content;
    }
  }

  const allContent = mainContent.filter((line) => line.trim() !== "");

  if (allContent.length === 0) {
    return props.children;
  }

  // Sanitize the content to prevent premature comment closure.
  const sanitizedContent = allContent.join("\n").replace(/\*\//g, "*\\/");
  const splitContent = sanitizedContent.split("\n");
  const multiline = splitContent.length > 1;

  let jsDoc: ay.Children;
  if (multiline) {
    // Render as a multi-line comment.
    jsDoc = <MultiLineComment content={splitContent} />;
  } else {
    // Render as a single-line comment.
    jsDoc = ay.code`
      /** ${sanitizedContent.trim()} */
    `;
  }

  return <>
      {jsDoc}
      {props.children}
    </>;
}

/**
 * Renders a multi-line comment block.
 *
 * @param {Object} props - Component props.
 * @param {string[]} props.content - An array of strings representing each line of the comment.
 * @returns {string} The formatted multi-line comment.
 */
function MultiLineComment(props: { content: string[] }) {
  return `/**\n * ${props.content.join("\n * ")}\n */`;
}
