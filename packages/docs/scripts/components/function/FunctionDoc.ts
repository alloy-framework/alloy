import type { FunctionApi } from "../../build-json.js";
import { DocSourceFile, FunctionOverloadDoc } from "../stc/index.js";

export interface FunctionDocProps {
  fn: FunctionApi;
}

export function FunctionDoc(props: FunctionDocProps) {
  const title = props.fn.functions[0].displayName;

  return DocSourceFile({ title, declares: [props.fn.functions[0]] }).children(
    props.fn.functions.map((fn) =>
      FunctionOverloadDoc({
        fn,
        omitOverloadIndex: props.fn.functions.length === 1,
      }),
    ),
  );
}
