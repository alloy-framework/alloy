import Specialized from "../../Collections/Specialized/index.js";
import System from "../../index.js";
import IO from "../../IO/index.js";
import Net from "../index.js";
import Mime from "../Mime/index.js";
import X509Certificates from "../../Security/Cryptography/X509Certificates/index.js";
import Text from "../../Text/index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type MailLibrary = LibrarySymbolReference & {
  AlternateView: LibrarySymbolReference & {
    AlternateView: LibrarySymbolReference;
    CreateAlternateViewFromString: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    BaseUri: LibrarySymbolReference;
    LinkedResources: LibrarySymbolReference
  };
  AlternateViewCollection: LibrarySymbolReference & {
    ClearItems: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    InsertItem: LibrarySymbolReference;
    RemoveItem: LibrarySymbolReference;
    SetItem: LibrarySymbolReference
  };
  Attachment: LibrarySymbolReference & {
    Attachment: LibrarySymbolReference;
    CreateAttachmentFromString: LibrarySymbolReference;
    ContentDisposition: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    NameEncoding: LibrarySymbolReference
  };
  AttachmentBase: LibrarySymbolReference & {
    AttachmentBase: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    ContentId: LibrarySymbolReference;
    ContentStream: LibrarySymbolReference;
    ContentType: LibrarySymbolReference;
    TransferEncoding: LibrarySymbolReference
  };
  AttachmentCollection: LibrarySymbolReference & {
    ClearItems: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    InsertItem: LibrarySymbolReference;
    RemoveItem: LibrarySymbolReference;
    SetItem: LibrarySymbolReference
  };
  DeliveryNotificationOptions: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    OnSuccess: LibrarySymbolReference;
    OnFailure: LibrarySymbolReference;
    Delay: LibrarySymbolReference;
    Never: LibrarySymbolReference
  };
  LinkedResource: LibrarySymbolReference & {
    LinkedResource: LibrarySymbolReference;
    CreateLinkedResourceFromString: LibrarySymbolReference;
    ContentLink: LibrarySymbolReference
  };
  LinkedResourceCollection: LibrarySymbolReference & {
    ClearItems: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    InsertItem: LibrarySymbolReference;
    RemoveItem: LibrarySymbolReference;
    SetItem: LibrarySymbolReference
  };
  MailAddress: LibrarySymbolReference & {
    MailAddress: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    TryCreate: LibrarySymbolReference;
    Address: LibrarySymbolReference;
    DisplayName: LibrarySymbolReference;
    Host: LibrarySymbolReference;
    User: LibrarySymbolReference
  };
  MailAddressCollection: LibrarySymbolReference & {
    MailAddressCollection: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    InsertItem: LibrarySymbolReference;
    SetItem: LibrarySymbolReference;
    ToString: LibrarySymbolReference
  };
  MailMessage: LibrarySymbolReference & {
    MailMessage: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    AlternateViews: LibrarySymbolReference;
    Attachments: LibrarySymbolReference;
    Bcc: LibrarySymbolReference;
    Body: LibrarySymbolReference;
    BodyEncoding: LibrarySymbolReference;
    BodyTransferEncoding: LibrarySymbolReference;
    CC: LibrarySymbolReference;
    DeliveryNotificationOptions: LibrarySymbolReference;
    From: LibrarySymbolReference;
    Headers: LibrarySymbolReference;
    HeadersEncoding: LibrarySymbolReference;
    IsBodyHtml: LibrarySymbolReference;
    Priority: LibrarySymbolReference;
    ReplyTo: LibrarySymbolReference;
    ReplyToList: LibrarySymbolReference;
    Sender: LibrarySymbolReference;
    Subject: LibrarySymbolReference;
    SubjectEncoding: LibrarySymbolReference;
    To: LibrarySymbolReference
  };
  MailPriority: LibrarySymbolReference & {
    Normal: LibrarySymbolReference;
    Low: LibrarySymbolReference;
    High: LibrarySymbolReference
  };
  SendCompletedEventHandler: LibrarySymbolReference & {
    SendCompletedEventHandler: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  SmtpClient: LibrarySymbolReference & {
    SmtpClient: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    OnSendCompleted: LibrarySymbolReference;
    Send: LibrarySymbolReference;
    SendAsync: LibrarySymbolReference;
    SendAsyncCancel: LibrarySymbolReference;
    SendMailAsync: LibrarySymbolReference;
    ClientCertificates: LibrarySymbolReference;
    Credentials: LibrarySymbolReference;
    DeliveryFormat: LibrarySymbolReference;
    DeliveryMethod: LibrarySymbolReference;
    EnableSsl: LibrarySymbolReference;
    Host: LibrarySymbolReference;
    PickupDirectoryLocation: LibrarySymbolReference;
    Port: LibrarySymbolReference;
    ServicePoint: LibrarySymbolReference;
    TargetName: LibrarySymbolReference;
    Timeout: LibrarySymbolReference;
    UseDefaultCredentials: LibrarySymbolReference
  };
  SmtpDeliveryFormat: LibrarySymbolReference & {
    SevenBit: LibrarySymbolReference;
    International: LibrarySymbolReference
  };
  SmtpDeliveryMethod: LibrarySymbolReference & {
    Network: LibrarySymbolReference;
    SpecifiedPickupDirectory: LibrarySymbolReference;
    PickupDirectoryFromIis: LibrarySymbolReference
  };
  SmtpException: LibrarySymbolReference & {
    SmtpException: LibrarySymbolReference;
    StatusCode: LibrarySymbolReference
  };
  SmtpFailedRecipientException: LibrarySymbolReference & {
    SmtpFailedRecipientException: LibrarySymbolReference;
    FailedRecipient: LibrarySymbolReference
  };
  SmtpFailedRecipientsException: LibrarySymbolReference & {
    SmtpFailedRecipientsException: LibrarySymbolReference;
    InnerExceptions: LibrarySymbolReference
  };
  SmtpStatusCode: LibrarySymbolReference & {
    GeneralFailure: LibrarySymbolReference;
    SystemStatus: LibrarySymbolReference;
    HelpMessage: LibrarySymbolReference;
    ServiceReady: LibrarySymbolReference;
    ServiceClosingTransmissionChannel: LibrarySymbolReference;
    Ok: LibrarySymbolReference;
    UserNotLocalWillForward: LibrarySymbolReference;
    CannotVerifyUserWillAttemptDelivery: LibrarySymbolReference;
    StartMailInput: LibrarySymbolReference;
    ServiceNotAvailable: LibrarySymbolReference;
    MailboxBusy: LibrarySymbolReference;
    LocalErrorInProcessing: LibrarySymbolReference;
    InsufficientStorage: LibrarySymbolReference;
    ClientNotPermitted: LibrarySymbolReference;
    CommandUnrecognized: LibrarySymbolReference;
    SyntaxError: LibrarySymbolReference;
    CommandNotImplemented: LibrarySymbolReference;
    BadCommandSequence: LibrarySymbolReference;
    CommandParameterNotImplemented: LibrarySymbolReference;
    MustIssueStartTlsFirst: LibrarySymbolReference;
    MailboxUnavailable: LibrarySymbolReference;
    UserNotLocalTryAlternatePath: LibrarySymbolReference;
    ExceededStorageAllocation: LibrarySymbolReference;
    MailboxNameNotAllowed: LibrarySymbolReference;
    TransactionFailed: LibrarySymbolReference
  }
};
const Mail: MailLibrary = createLibrary("System.Net.Mail", {
  AlternateView: {
    kind: "class",
    members: {
      AlternateView: {
        kind: "method",
        methodKind: "constructor",
      },
      CreateAlternateViewFromString: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      BaseUri: {
        kind: "property",
        type: () => {
          return System.Uri;
        },
        isNullable: true,
      },
      LinkedResources: {
        kind: "property",
        type: () => {
          return Mail.LinkedResourceCollection;
        },
      },
    },
  },
  AlternateViewCollection: {
    kind: "class",
    members: {
      ClearItems: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      InsertItem: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      RemoveItem: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      SetItem: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
    isSealed: true,
  },
  Attachment: {
    kind: "class",
    members: {
      Attachment: {
        kind: "method",
        methodKind: "constructor",
      },
      CreateAttachmentFromString: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ContentDisposition: {
        kind: "property",
        type: () => {
          return Mime.ContentDisposition;
        },
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      NameEncoding: {
        kind: "property",
        type: () => {
          return Text.Encoding;
        },
        isNullable: true,
      },
    },
  },
  AttachmentBase: {
    kind: "class",
    members: {
      AttachmentBase: {
        kind: "method",
        methodKind: "constructor",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      ContentId: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      ContentStream: {
        kind: "property",
        type: () => {
          return IO.Stream;
        },
      },
      ContentType: {
        kind: "property",
        type: () => {
          return Mime.ContentType;
        },
      },
      TransferEncoding: {
        kind: "property",
        type: () => {
          return Mime.TransferEncoding;
        },
      },
    },
    isAbstract: true,
  },
  AttachmentCollection: {
    kind: "class",
    members: {
      ClearItems: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      InsertItem: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      RemoveItem: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      SetItem: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
    isSealed: true,
  },
  DeliveryNotificationOptions: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Mail.DeliveryNotificationOptions;
        },
      },
      OnSuccess: {
        kind: "field",
        type: () => {
          return Mail.DeliveryNotificationOptions;
        },
      },
      OnFailure: {
        kind: "field",
        type: () => {
          return Mail.DeliveryNotificationOptions;
        },
      },
      Delay: {
        kind: "field",
        type: () => {
          return Mail.DeliveryNotificationOptions;
        },
      },
      Never: {
        kind: "field",
        type: () => {
          return Mail.DeliveryNotificationOptions;
        },
      },
    },
  },
  LinkedResource: {
    kind: "class",
    members: {
      LinkedResource: {
        kind: "method",
        methodKind: "constructor",
      },
      CreateLinkedResourceFromString: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ContentLink: {
        kind: "property",
        type: () => {
          return System.Uri;
        },
        isNullable: true,
      },
    },
  },
  LinkedResourceCollection: {
    kind: "class",
    members: {
      ClearItems: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      InsertItem: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      RemoveItem: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      SetItem: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
    isSealed: true,
  },
  MailAddress: {
    kind: "class",
    members: {
      MailAddress: {
        kind: "method",
        methodKind: "constructor",
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryCreate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Address: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      DisplayName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Host: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      User: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
  },
  MailAddressCollection: {
    kind: "class",
    members: {
      MailAddressCollection: {
        kind: "method",
        methodKind: "constructor",
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
      },
      InsertItem: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      SetItem: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
  },
  MailMessage: {
    kind: "class",
    members: {
      MailMessage: {
        kind: "method",
        methodKind: "constructor",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      AlternateViews: {
        kind: "property",
        type: () => {
          return Mail.AlternateViewCollection;
        },
      },
      Attachments: {
        kind: "property",
        type: () => {
          return Mail.AttachmentCollection;
        },
      },
      Bcc: {
        kind: "property",
        type: () => {
          return Mail.MailAddressCollection;
        },
      },
      Body: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      BodyEncoding: {
        kind: "property",
        type: () => {
          return Text.Encoding;
        },
        isNullable: true,
      },
      BodyTransferEncoding: {
        kind: "property",
        type: () => {
          return Mime.TransferEncoding;
        },
      },
      CC: {
        kind: "property",
        type: () => {
          return Mail.MailAddressCollection;
        },
      },
      DeliveryNotificationOptions: {
        kind: "property",
        type: () => {
          return Mail.DeliveryNotificationOptions;
        },
      },
      From: {
        kind: "property",
        type: () => {
          return Mail.MailAddress;
        },
        isNullable: true,
      },
      Headers: {
        kind: "property",
        type: () => {
          return Specialized.NameValueCollection;
        },
      },
      HeadersEncoding: {
        kind: "property",
        type: () => {
          return Text.Encoding;
        },
        isNullable: true,
      },
      IsBodyHtml: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Priority: {
        kind: "property",
        type: () => {
          return Mail.MailPriority;
        },
      },
      ReplyTo: {
        kind: "property",
        type: () => {
          return Mail.MailAddress;
        },
      },
      ReplyToList: {
        kind: "property",
        type: () => {
          return Mail.MailAddressCollection;
        },
      },
      Sender: {
        kind: "property",
        type: () => {
          return Mail.MailAddress;
        },
        isNullable: true,
      },
      Subject: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      SubjectEncoding: {
        kind: "property",
        type: () => {
          return Text.Encoding;
        },
        isNullable: true,
      },
      To: {
        kind: "property",
        type: () => {
          return Mail.MailAddressCollection;
        },
      },
    },
  },
  MailPriority: {
    kind: "enum",
    members: {
      Normal: {
        kind: "field",
        type: () => {
          return Mail.MailPriority;
        },
      },
      Low: {
        kind: "field",
        type: () => {
          return Mail.MailPriority;
        },
      },
      High: {
        kind: "field",
        type: () => {
          return Mail.MailPriority;
        },
      },
    },
  },
  SendCompletedEventHandler: {
    kind: "generic",
    members: {
      SendCompletedEventHandler: {
        kind: "method",
        methodKind: "constructor",
      },
      Invoke: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      BeginInvoke: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      EndInvoke: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
    },
  },
  SmtpClient: {
    kind: "class",
    members: {
      SmtpClient: {
        kind: "method",
        methodKind: "constructor",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      OnSendCompleted: {
        kind: "method",
        methodKind: "ordinary",
      },
      Send: {
        kind: "method",
        methodKind: "ordinary",
      },
      SendAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      SendAsyncCancel: {
        kind: "method",
        methodKind: "ordinary",
      },
      SendMailAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      ClientCertificates: {
        kind: "property",
        type: () => {
          return X509Certificates.X509CertificateCollection;
        },
      },
      Credentials: {
        kind: "property",
        type: () => {
          return Net.ICredentialsByHost;
        },
      },
      DeliveryFormat: {
        kind: "property",
        type: () => {
          return Mail.SmtpDeliveryFormat;
        },
      },
      DeliveryMethod: {
        kind: "property",
        type: () => {
          return Mail.SmtpDeliveryMethod;
        },
      },
      EnableSsl: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Host: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      PickupDirectoryLocation: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      Port: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      ServicePoint: {
        kind: "property",
        type: () => {
          return Net.ServicePoint;
        },
      },
      TargetName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      Timeout: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      UseDefaultCredentials: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  SmtpDeliveryFormat: {
    kind: "enum",
    members: {
      SevenBit: {
        kind: "field",
        type: () => {
          return Mail.SmtpDeliveryFormat;
        },
      },
      International: {
        kind: "field",
        type: () => {
          return Mail.SmtpDeliveryFormat;
        },
      },
    },
  },
  SmtpDeliveryMethod: {
    kind: "enum",
    members: {
      Network: {
        kind: "field",
        type: () => {
          return Mail.SmtpDeliveryMethod;
        },
      },
      SpecifiedPickupDirectory: {
        kind: "field",
        type: () => {
          return Mail.SmtpDeliveryMethod;
        },
      },
      PickupDirectoryFromIis: {
        kind: "field",
        type: () => {
          return Mail.SmtpDeliveryMethod;
        },
      },
    },
  },
  SmtpException: {
    kind: "class",
    members: {
      SmtpException: {
        kind: "method",
        methodKind: "constructor",
      },
      StatusCode: {
        kind: "property",
        type: () => {
          return Mail.SmtpStatusCode;
        },
      },
    },
  },
  SmtpFailedRecipientException: {
    kind: "class",
    members: {
      SmtpFailedRecipientException: {
        kind: "method",
        methodKind: "constructor",
      },
      FailedRecipient: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
  },
  SmtpFailedRecipientsException: {
    kind: "class",
    members: {
      SmtpFailedRecipientsException: {
        kind: "method",
        methodKind: "constructor",
      },
      InnerExceptions: {
        kind: "property",
        type: () => {
          return System.Array;
        },
      },
    },
  },
  SmtpStatusCode: {
    kind: "enum",
    members: {
      GeneralFailure: {
        kind: "field",
        type: () => {
          return Mail.SmtpStatusCode;
        },
      },
      SystemStatus: {
        kind: "field",
        type: () => {
          return Mail.SmtpStatusCode;
        },
      },
      HelpMessage: {
        kind: "field",
        type: () => {
          return Mail.SmtpStatusCode;
        },
      },
      ServiceReady: {
        kind: "field",
        type: () => {
          return Mail.SmtpStatusCode;
        },
      },
      ServiceClosingTransmissionChannel: {
        kind: "field",
        type: () => {
          return Mail.SmtpStatusCode;
        },
      },
      Ok: {
        kind: "field",
        type: () => {
          return Mail.SmtpStatusCode;
        },
      },
      UserNotLocalWillForward: {
        kind: "field",
        type: () => {
          return Mail.SmtpStatusCode;
        },
      },
      CannotVerifyUserWillAttemptDelivery: {
        kind: "field",
        type: () => {
          return Mail.SmtpStatusCode;
        },
      },
      StartMailInput: {
        kind: "field",
        type: () => {
          return Mail.SmtpStatusCode;
        },
      },
      ServiceNotAvailable: {
        kind: "field",
        type: () => {
          return Mail.SmtpStatusCode;
        },
      },
      MailboxBusy: {
        kind: "field",
        type: () => {
          return Mail.SmtpStatusCode;
        },
      },
      LocalErrorInProcessing: {
        kind: "field",
        type: () => {
          return Mail.SmtpStatusCode;
        },
      },
      InsufficientStorage: {
        kind: "field",
        type: () => {
          return Mail.SmtpStatusCode;
        },
      },
      ClientNotPermitted: {
        kind: "field",
        type: () => {
          return Mail.SmtpStatusCode;
        },
      },
      CommandUnrecognized: {
        kind: "field",
        type: () => {
          return Mail.SmtpStatusCode;
        },
      },
      SyntaxError: {
        kind: "field",
        type: () => {
          return Mail.SmtpStatusCode;
        },
      },
      CommandNotImplemented: {
        kind: "field",
        type: () => {
          return Mail.SmtpStatusCode;
        },
      },
      BadCommandSequence: {
        kind: "field",
        type: () => {
          return Mail.SmtpStatusCode;
        },
      },
      CommandParameterNotImplemented: {
        kind: "field",
        type: () => {
          return Mail.SmtpStatusCode;
        },
      },
      MustIssueStartTlsFirst: {
        kind: "field",
        type: () => {
          return Mail.SmtpStatusCode;
        },
      },
      MailboxUnavailable: {
        kind: "field",
        type: () => {
          return Mail.SmtpStatusCode;
        },
      },
      UserNotLocalTryAlternatePath: {
        kind: "field",
        type: () => {
          return Mail.SmtpStatusCode;
        },
      },
      ExceededStorageAllocation: {
        kind: "field",
        type: () => {
          return Mail.SmtpStatusCode;
        },
      },
      MailboxNameNotAllowed: {
        kind: "field",
        type: () => {
          return Mail.SmtpStatusCode;
        },
      },
      TransactionFailed: {
        kind: "field",
        type: () => {
          return Mail.SmtpStatusCode;
        },
      },
    },
  },
});
export default Mail
