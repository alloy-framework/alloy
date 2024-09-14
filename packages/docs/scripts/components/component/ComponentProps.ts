import type { ApiInterface } from "@microsoft/api-extractor-model";
import { InterfaceMembers, MdxSection } from "../stc/index.js";

export interface ComponentPropsProps {
  propType?: ApiInterface;
}

export function ComponentProps(props: ComponentPropsProps) {
  if (!props.propType) return "";

  return MdxSection({ title: "Props", level: 3 }).children(
    InterfaceMembers({ iface: props.propType, flatten: true }),
  );
}
