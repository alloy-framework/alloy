import "@alloy-js/core/testing";
import { expect, it } from "vitest";
import { Section } from "../src/components/Section.jsx";
import { mdTest } from "./utils.jsx";

it("renders a section", () => {
  const template = mdTest([<Section heading="hello">world</Section>]);

  expect(template).toRenderTo(`
    # hello
    
    world
  `);
});

it("renders multiple sections", () => {
  const template = mdTest([
    <Section heading="hello">world</Section>,
    <Section heading="hello">world</Section>,
  ]);

  expect(template).toRenderTo(`
    # hello
    
    world

    # hello

    world
  `);
});

it("renders nested sections", () => {
  const template = mdTest([
    <Section heading="hello">
      world
      <Section heading="subhello">subworld</Section>
    </Section>,
    <Section heading="hello">world</Section>,
  ]);

  expect(template).toRenderTo(`
    # hello

    world

    ## subhello

    subworld

    # hello

    world
  `);
});
