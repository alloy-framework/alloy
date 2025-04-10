import { List } from "@alloy-js/core";
import { Children } from "@alloy-js/core/jsx-runtime";
import { SectionContext, useSectionContext } from "../context/section.js";
import { Heading } from "./Heading.jsx";

export interface SectionProps {
  heading?: Children;
  children: Children;
}

export function Section(props: SectionProps) {
  const sectionContext = useSectionContext();

  return (
    <List doubleHardline>
      {props.heading && <Heading>{props.heading}</Heading>}
      <SectionContext.Provider
        value={{ ...sectionContext, level: sectionContext.level + 1 }}
      >
        <List doubleHardline>{props.children}</List>
      </SectionContext.Provider>
    </List>
  );
}
