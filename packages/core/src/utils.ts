export interface MapJoinOptions {
  joiner?: string;
}
const defaultMapJoinOptions: MapJoinOptions = {
  joiner: "\n",
};
export function mapJoin<T, U, V>(
  src: Map<T, U>,
  cb: (key: T, value: U) => V,
  options: MapJoinOptions = defaultMapJoinOptions
): (V | string)[] {
  let mapped: (V | string)[] = [];
  const entries = [...src.entries()];

  for (const [index, [key, value]] of entries.entries()) {
    mapped.push(cb(key, value));
    if (index !== entries.length - 1) {
      mapped.push(options.joiner!);
    }
  }

  return mapped;
}
