import { Children, code } from "@alloy-js/core";
import {
  CallStatementParameters,
  CallStatementParametersProps,
} from "./Parameters.jsx";

export interface CallStatementProps extends CallStatementParametersProps {
  type: Children;
}

export function CallStatement(props: CallStatementProps) {
  const params = (
    <CallStatementParameters
      parameters={props.parameters}
      args={props.args}
      kwargs={props.kwargs}
    />
  );
  const value = code` ${props.type}(${params})`; // Include params in the value
  return <>{value}</>;
}
