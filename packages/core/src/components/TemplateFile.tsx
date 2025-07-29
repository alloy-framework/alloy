import { computed } from "@vue/reactivity";
import { createFileResource } from "../resource.js";
import { Children, isComponentCreator } from "../runtime/component.js";
import { childrenArray } from "../utils.jsx";
import { SourceFile } from "./SourceFile.jsx";

export interface TemplateFileProps {
  /**
   * The path to write the compiled template to.
   */
  path: string;

  /**
   * The file path of the template.
   */
  src: string;

  /**
   * Template variable children components.
   */
  children?: Children;
}

/**
 * A component that reads a template file and replaces variable placeholders
 * with actual values.
 *
 * Template files can contain variable placeholders in the format
 * `{{ variable_name }}` which will be replaced with values from `TemplateVariable`
 * children components. Whitespace around variable names is ignored, so
 * `{{ name }}`, `{{name}}`, and `{{  name  }}` are all equivalent.
 *
 * @example
 * Basic usage with template variables:
 * ```tsx
 * // Template file content (greeting.txt):
 * // "Hello {{ name }}! You are {{ age }} years old."
 *
 * <TemplateFile src="greeting.txt" path="output.txt">
 *   <TemplateVariable name="name" value="John" />
 *   <TemplateVariable name="age" value="25" />
 * </TemplateFile>
 * ```
 *
 * @example
 * Using children instead of value prop:
 * ```tsx
 * // Template file content (welcome.txt):
 * // "Welcome {{ greeting }}!"
 *
 * <TemplateFile src="welcome.txt" path="output.txt">
 *   <TemplateVariable name="greeting">Hello World</TemplateVariable>
 * </TemplateFile>
 * ```
 *
 * @example
 * Complex template with multiple variables:
 * ```tsx
 * // Template file content (profile.txt):
 * // "Name: {{ name }}\nAge: {{ age }}\nLocation: {{ location }}"
 *
 * <TemplateFile src="profile.txt" path="profile-output.txt">
 *   <TemplateVariable name="name" value="Alice" />
 *   <TemplateVariable name="age">30</TemplateVariable>
 *   <TemplateVariable name="location" value="New York" />
 * </TemplateFile>
 * ```
 */
export function TemplateFile(props: TemplateFileProps): Children {
  // Get all children and filter for TemplateVariable components
  const children = childrenArray(() => props.children);
  const templateVariables: Record<string, Children> = {};

  // Extract variable values from TemplateVariable children
  for (const child of children) {
    if (!isComponentCreator(child, TemplateVariable)) {
      continue;
    }

    const variableProps = child.props as TemplateVariableProps;
    let value: Children;

    if ("children" in variableProps && variableProps.children !== undefined) {
      value = variableProps.children;
    } else if ("value" in variableProps) {
      value = variableProps.value;
    } else {
      throw new Error(
        `TemplateVariable "${variableProps.name}" must have either children or value`,
      );
    }

    templateVariables[variableProps.name] = value;
  }

  const templateResource = createFileResource(props.src);
  const fileContent = computed(() => {
    if (templateResource.loading) {
      return;
    }

    if (templateResource.error) {
      throw new Error(
        `Failed to read template file "${props.src}": ${templateResource.error}`,
      );
    }

    const templateContent = templateResource.data!;

    // Parse template and replace variables
    const result: Children[] = [];
    let lastIndex = 0;

    // Match {{ var_name }} patterns
    const variableRegex = /\{\{\s*(\w+)\s*\}\}/g;
    let match: RegExpExecArray | null;

    while ((match = variableRegex.exec(templateContent)) !== null) {
      const [fullMatch, variableName] = match;
      const matchStart = match.index;

      // Add content before the variable
      if (matchStart > lastIndex) {
        const beforeContent = templateContent.slice(lastIndex, matchStart);
        if (beforeContent) {
          result.push(beforeContent);
        }
      }

      // Add the variable value
      if (variableName in templateVariables) {
        result.push(templateVariables[variableName]);
      } else {
        throw new Error(
          `Template variable "${variableName}" not found in TemplateVariable children`,
        );
      }

      lastIndex = matchStart + fullMatch.length;
    }

    // Add remaining content after the last variable
    if (lastIndex < templateContent.length) {
      const remainingContent = templateContent.slice(lastIndex);
      if (remainingContent) {
        result.push(remainingContent);
      }
    }

    return result;
  });

  return (
    <SourceFile path={props.path} filetype="text/plain">
      {fileContent}
    </SourceFile>
  );
}

export interface TemplateVariablePropsWithChildren {
  /**
   * The name of the variable.
   */
  name: string;

  /**
   * The value of the variable.
   */
  children: Children;
}

export interface TemplateVariablePropsWithValue {
  /**
   * The name of the variable.
   */
  name: string;

  /**
   * The value of the variable.
   */
  value: string;
}

export type TemplateVariableProps =
  | TemplateVariablePropsWithChildren
  | TemplateVariablePropsWithValue;

export function TemplateVariable(props: TemplateVariableProps) {
  /**
   * This component does nothing except hold props which are retrieved by
   * the `TemplateFile` component.
   */
}
