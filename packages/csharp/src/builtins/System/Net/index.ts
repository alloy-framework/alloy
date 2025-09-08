import { createLibrary } from "#createLibrary";


const Net = createLibrary("System.Net", {
  WebUtility: {
    kind: "class",
    members: {
      HtmlDecode: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      HtmlEncode: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      UrlDecode: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      UrlDecodeToBytes: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      UrlEncode: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      UrlEncodeToBytes: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
});
export default Net
