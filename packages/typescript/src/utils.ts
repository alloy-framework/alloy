export function modulePath(path: string) {
  if (path[0] !== ".") {
    path = "./" + path;
  }

  return path.replace(/\.ts$/, ".js");
}
