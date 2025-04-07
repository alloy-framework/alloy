import { Refkey } from "@alloy-js/core";
import { Children } from "@alloy-js/core/jsx-runtime";
import { useSectionContext } from "../context/section.js";

export interface HeadingProps {
  level?: number;
  children: Children;
  refkey?: Refkey;
}

export function Heading(props: HeadingProps) {
  const level =
    props.level !== undefined ? props.level : useSectionContext().level;
  return (
    <>
      {"#".repeat(level)} {props.children}
    </>
  );
}
