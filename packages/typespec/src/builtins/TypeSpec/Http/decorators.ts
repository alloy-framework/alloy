import { Descriptor, LibraryFrom } from "../../../index.js";

const decorators = {
  body: { kind: "decorator" },
  cookie: { kind: "decorator" },
  delete: { kind: "decorator" },
  get: { kind: "decorator" },
  head: { kind: "decorator" },
  header: { kind: "decorator" },
  bodyIgnore: { kind: "decorator" },
  bodyRoot: { kind: "decorator" },
  multipartBody: { kind: "decorator" },
  patch: { kind: "decorator" },
  path: { kind: "decorator" },
  post: { kind: "decorator" },
  put: { kind: "decorator" },
  query: { kind: "decorator" },
  route: { kind: "decorator" },
  server: { kind: "decorator" },
  sharedRoute: { kind: "decorator" },
  statusCode: { kind: "decorator" },
  useAuth: { kind: "decorator" },
} satisfies Record<string, Descriptor>;

export type LibraryDecorators = LibraryFrom<typeof decorators>;

export default decorators;
