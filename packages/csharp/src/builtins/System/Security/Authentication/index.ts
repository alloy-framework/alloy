import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";export { default as ExtendedProtection } from "./ExtendedProtection/index.js";

type AuthenticationLibrary = LibrarySymbolReference & {
  AuthenticationException: LibrarySymbolReference & {
    AuthenticationException: LibrarySymbolReference
  };
  CipherAlgorithmType: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    Null: LibrarySymbolReference;
    Des: LibrarySymbolReference;
    Rc2: LibrarySymbolReference;
    TripleDes: LibrarySymbolReference;
    Aes128: LibrarySymbolReference;
    Aes192: LibrarySymbolReference;
    Aes256: LibrarySymbolReference;
    Aes: LibrarySymbolReference;
    Rc4: LibrarySymbolReference
  };
  ExchangeAlgorithmType: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    RsaSign: LibrarySymbolReference;
    RsaKeyX: LibrarySymbolReference;
    DiffieHellman: LibrarySymbolReference
  };
  HashAlgorithmType: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    Md5: LibrarySymbolReference;
    Sha1: LibrarySymbolReference;
    Sha256: LibrarySymbolReference;
    Sha384: LibrarySymbolReference;
    Sha512: LibrarySymbolReference
  };
  InvalidCredentialException: LibrarySymbolReference & {
    InvalidCredentialException: LibrarySymbolReference
  };
  SslProtocols: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    Ssl2: LibrarySymbolReference;
    Ssl3: LibrarySymbolReference;
    Tls: LibrarySymbolReference;
    Default: LibrarySymbolReference;
    Tls11: LibrarySymbolReference;
    Tls12: LibrarySymbolReference;
    Tls13: LibrarySymbolReference
  }
};
const Authentication: AuthenticationLibrary = createLibrary("System.Security.Authentication", {
  AuthenticationException: {
    kind: "class",
    members: {
      AuthenticationException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  CipherAlgorithmType: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Authentication.CipherAlgorithmType;
        },
      },
      Null: {
        kind: "field",
        type: () => {
          return Authentication.CipherAlgorithmType;
        },
      },
      Des: {
        kind: "field",
        type: () => {
          return Authentication.CipherAlgorithmType;
        },
      },
      Rc2: {
        kind: "field",
        type: () => {
          return Authentication.CipherAlgorithmType;
        },
      },
      TripleDes: {
        kind: "field",
        type: () => {
          return Authentication.CipherAlgorithmType;
        },
      },
      Aes128: {
        kind: "field",
        type: () => {
          return Authentication.CipherAlgorithmType;
        },
      },
      Aes192: {
        kind: "field",
        type: () => {
          return Authentication.CipherAlgorithmType;
        },
      },
      Aes256: {
        kind: "field",
        type: () => {
          return Authentication.CipherAlgorithmType;
        },
      },
      Aes: {
        kind: "field",
        type: () => {
          return Authentication.CipherAlgorithmType;
        },
      },
      Rc4: {
        kind: "field",
        type: () => {
          return Authentication.CipherAlgorithmType;
        },
      },
    },
  },
  ExchangeAlgorithmType: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Authentication.ExchangeAlgorithmType;
        },
      },
      RsaSign: {
        kind: "field",
        type: () => {
          return Authentication.ExchangeAlgorithmType;
        },
      },
      RsaKeyX: {
        kind: "field",
        type: () => {
          return Authentication.ExchangeAlgorithmType;
        },
      },
      DiffieHellman: {
        kind: "field",
        type: () => {
          return Authentication.ExchangeAlgorithmType;
        },
      },
    },
  },
  HashAlgorithmType: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Authentication.HashAlgorithmType;
        },
      },
      Md5: {
        kind: "field",
        type: () => {
          return Authentication.HashAlgorithmType;
        },
      },
      Sha1: {
        kind: "field",
        type: () => {
          return Authentication.HashAlgorithmType;
        },
      },
      Sha256: {
        kind: "field",
        type: () => {
          return Authentication.HashAlgorithmType;
        },
      },
      Sha384: {
        kind: "field",
        type: () => {
          return Authentication.HashAlgorithmType;
        },
      },
      Sha512: {
        kind: "field",
        type: () => {
          return Authentication.HashAlgorithmType;
        },
      },
    },
  },
  InvalidCredentialException: {
    kind: "class",
    members: {
      InvalidCredentialException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  SslProtocols: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Authentication.SslProtocols;
        },
      },
      Ssl2: {
        kind: "field",
        type: () => {
          return Authentication.SslProtocols;
        },
      },
      Ssl3: {
        kind: "field",
        type: () => {
          return Authentication.SslProtocols;
        },
      },
      Tls: {
        kind: "field",
        type: () => {
          return Authentication.SslProtocols;
        },
      },
      Default: {
        kind: "field",
        type: () => {
          return Authentication.SslProtocols;
        },
      },
      Tls11: {
        kind: "field",
        type: () => {
          return Authentication.SslProtocols;
        },
      },
      Tls12: {
        kind: "field",
        type: () => {
          return Authentication.SslProtocols;
        },
      },
      Tls13: {
        kind: "field",
        type: () => {
          return Authentication.SslProtocols;
        },
      },
    },
  },
});
export default Authentication
