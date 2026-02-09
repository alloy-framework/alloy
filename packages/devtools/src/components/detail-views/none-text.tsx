export interface NoneTextProps {
  label?: string;
}

export function NoneText({ label = "None" }: NoneTextProps) {
  return <span className="text-muted-foreground/70">{label}</span>;
}
