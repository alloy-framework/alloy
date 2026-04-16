export interface ContinueExpressionProps {
  label?: string;
}

export function ContinueExpression(props: ContinueExpressionProps) {
  return (
    <>
      {"continue"}
      {props.label ?
        <> {props.label}</>
      : null}
    </>
  );
}
