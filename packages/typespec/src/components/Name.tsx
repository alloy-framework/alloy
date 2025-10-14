export interface NameProps {
  name: string;
}

export function Name({ name }: NameProps) {
  const invalidNameRegex =
    /(?:^model$)|(?:^enum$)|(?:^never$)|(?:^null$)|(?:^unknown$)|[-./[\]]/;
  if (invalidNameRegex.test(name)) {
    return <>{`\`${name}\``}</>;
  }
  return <>{name}</>;
}