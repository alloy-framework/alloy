import { createLibrary } from "#createLibrary";


const Unicode = createLibrary("System.Text.Unicode", {
  Utf8: {
    kind: "class",
    members: {
      FromUtf16: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsValid: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToUtf16: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryWrite: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
});
export default Unicode
