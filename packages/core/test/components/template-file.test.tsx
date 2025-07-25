import { writeFileSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { describe, expect, it } from "vitest";
import {
  TemplateFile,
  TemplateVariable,
} from "../../src/components/TemplateFile.jsx";
import { renderAsync } from "../../src/render.js";
import "../../testing/extend-expect.js";
import { d } from "../../testing/render.js";

describe("TemplateFile", () => {
  it("should replace template variables with values", async () => {
    // Create a temporary template file
    const templatePath = join(tmpdir(), "test-template.txt");
    const templateContent = "Hello {{ name }}! You are {{ age }} years old.";
    writeFileSync(templatePath, templateContent);

    const result = (
      <TemplateFile src={templatePath} path="output.txt">
        <TemplateVariable name="name" value="John" />
        <TemplateVariable name="age" value="25" />
      </TemplateFile>
    );

    await expect(result).toRenderToAsync("Hello John! You are 25 years old.");
  });

  it("should handle template variables with children", async () => {
    const templatePath = join(tmpdir(), "test-template-children.txt");
    const templateContent = "Welcome {{ greeting }}!";
    writeFileSync(templatePath, templateContent);

    const result = (
      <TemplateFile src={templatePath} path="output.txt">
        <TemplateVariable name="greeting">Hello World</TemplateVariable>
      </TemplateFile>
    );

    await expect(result).toRenderToAsync("Welcome Hello World!");
  });

  it("should handle complex templates with multiple variables", async () => {
    const templatePath = join(tmpdir(), "test-complex-template.txt");
    const templateContent = d`
      Name: {{ name }}
      Age: {{ age }}
      Location: {{ location }}
      Status: {{ status }}
    `;
    writeFileSync(templatePath, templateContent);

    const result = (
      <TemplateFile src={templatePath} path="output.txt">
        <TemplateVariable name="name" value="Alice" />
        <TemplateVariable name="age">30</TemplateVariable>
        <TemplateVariable name="location" value="New York" />
        <TemplateVariable name="status" value="Active" />
      </TemplateFile>
    );

    await expect(result).toRenderToAsync(d`
      Name: Alice
      Age: 30
      Location: New York
      Status: Active
    `);
  });

  it("should handle templates with whitespace around variable names", async () => {
    const templatePath = join(tmpdir(), "test-whitespace-template.txt");
    const templateContent = "Hello {{  name  }}!";
    writeFileSync(templatePath, templateContent);

    const result = (
      <TemplateFile src={templatePath} path="output.txt">
        <TemplateVariable name="name" value="Bob" />
      </TemplateFile>
    );

    await expect(result).toRenderToAsync("Hello Bob!");
  });

  it("should throw error for missing template variables", async () => {
    const templatePath = join(tmpdir(), "test-missing-var-template.txt");
    const templateContent = "Hello {{ name }}! Your age is {{ age }}.";
    writeFileSync(templatePath, templateContent);

    await expect(
      async () =>
        await renderAsync(
          <TemplateFile src={templatePath} path="output.txt">
            <TemplateVariable name="name" value="Charlie" />
          </TemplateFile>,
        ),
    ).rejects.toThrow(
      'Template variable "age" not found in TemplateVariable children',
    );
  });

  it("should handle template with no variables", () => {
    const templatePath = join(tmpdir(), "test-no-vars-template.txt");
    const templateContent = "This is just plain text with no variables.";
    writeFileSync(templatePath, templateContent);

    const result = (
      <TemplateFile src={templatePath} path="output.txt"></TemplateFile>
    );

    expect(result).toRenderToAsync(
      "This is just plain text with no variables.",
    );
  });

  it("should handle empty template", async () => {
    const templatePath = join(tmpdir(), "test-empty-template.txt");
    const templateContent = "";
    writeFileSync(templatePath, templateContent);

    const result = (
      <TemplateFile src={templatePath} path="output.txt"></TemplateFile>
    );

    await expect(result).toRenderToAsync("");
  });
});
