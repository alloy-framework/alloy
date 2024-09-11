import type { ApiFunction } from "@microsoft/api-extractor-model";
import {
  Examples,
  FunctionOptions,
  FunctionParameters,
  FunctionReturn,
  FunctionSignature,
  MdxParagraph,
  MdxSection,
  Remarks,
  SeeAlso,
  Summary,
} from "../stc/index.js";

export interface FunctionOverloadDocProps {
  fn: ApiFunction;
  omitOverloadIndex?: boolean;
}

export function FunctionOverloadDoc(props: FunctionOverloadDocProps) {
  const root =
    props.omitOverloadIndex ?
      MdxSection({ title: `Overload ${props.fn.overloadIndex}`, level: 2 })
    : MdxParagraph();

  return root.children(
    Summary({ type: props.fn }),
    FunctionSignature({ fn: props.fn }),
    FunctionParameters({ fn: props.fn }),
    FunctionOptions({ fn: props.fn }),
    FunctionReturn({ fn: props.fn }),
    Remarks({ type: props.fn }),
    Examples({ type: props.fn }),
    SeeAlso({ type: props.fn }),
  );
}
