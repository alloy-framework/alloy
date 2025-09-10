import System from "../../index.js";
import Principal from "../Principal/index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type AccessControlLibrary = LibrarySymbolReference & {
  AccessControlActions: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    View: LibrarySymbolReference;
    Change: LibrarySymbolReference
  };
  AccessControlModification: LibrarySymbolReference & {
    Add: LibrarySymbolReference;
    Set: LibrarySymbolReference;
    Reset: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    RemoveAll: LibrarySymbolReference;
    RemoveSpecific: LibrarySymbolReference
  };
  AccessControlSections: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    Audit: LibrarySymbolReference;
    Access: LibrarySymbolReference;
    Owner: LibrarySymbolReference;
    Group: LibrarySymbolReference;
    All: LibrarySymbolReference
  };
  AccessControlType: LibrarySymbolReference & {
    Allow: LibrarySymbolReference;
    Deny: LibrarySymbolReference
  };
  AccessRule: LibrarySymbolReference & {
    AccessRule: LibrarySymbolReference;
    Rights: LibrarySymbolReference
  };
  AceEnumerator: LibrarySymbolReference & {
    MoveNext: LibrarySymbolReference;
    Reset: LibrarySymbolReference;
    Current: LibrarySymbolReference
  };
  AceFlags: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    ObjectInherit: LibrarySymbolReference;
    ContainerInherit: LibrarySymbolReference;
    NoPropagateInherit: LibrarySymbolReference;
    InheritOnly: LibrarySymbolReference;
    InheritanceFlags: LibrarySymbolReference;
    Inherited: LibrarySymbolReference;
    SuccessfulAccess: LibrarySymbolReference;
    FailedAccess: LibrarySymbolReference;
    AuditFlags: LibrarySymbolReference
  };
  AceQualifier: LibrarySymbolReference & {
    AccessAllowed: LibrarySymbolReference;
    AccessDenied: LibrarySymbolReference;
    SystemAudit: LibrarySymbolReference;
    SystemAlarm: LibrarySymbolReference
  };
  AceType: LibrarySymbolReference & {
    AccessAllowed: LibrarySymbolReference;
    AccessDenied: LibrarySymbolReference;
    SystemAudit: LibrarySymbolReference;
    SystemAlarm: LibrarySymbolReference;
    AccessAllowedCompound: LibrarySymbolReference;
    AccessAllowedObject: LibrarySymbolReference;
    AccessDeniedObject: LibrarySymbolReference;
    SystemAuditObject: LibrarySymbolReference;
    SystemAlarmObject: LibrarySymbolReference;
    AccessAllowedCallback: LibrarySymbolReference;
    AccessDeniedCallback: LibrarySymbolReference;
    AccessAllowedCallbackObject: LibrarySymbolReference;
    AccessDeniedCallbackObject: LibrarySymbolReference;
    SystemAuditCallback: LibrarySymbolReference;
    SystemAlarmCallback: LibrarySymbolReference;
    SystemAuditCallbackObject: LibrarySymbolReference;
    MaxDefinedAceType: LibrarySymbolReference;
    SystemAlarmCallbackObject: LibrarySymbolReference
  };
  AuditFlags: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    Success: LibrarySymbolReference;
    Failure: LibrarySymbolReference
  };
  AuditRule: LibrarySymbolReference & {
    AuditRule: LibrarySymbolReference;
    Rights: LibrarySymbolReference
  };
  AuthorizationRule: LibrarySymbolReference & {
    AuthorizationRule: LibrarySymbolReference;
    AccessMask: LibrarySymbolReference;
    IdentityReference: LibrarySymbolReference;
    InheritanceFlags: LibrarySymbolReference;
    IsInherited: LibrarySymbolReference;
    PropagationFlags: LibrarySymbolReference
  };
  AuthorizationRuleCollection: LibrarySymbolReference & {
    AuthorizationRuleCollection: LibrarySymbolReference;
    AddRule: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    Item: LibrarySymbolReference
  };
  CommonAce: LibrarySymbolReference & {
    CommonAce: LibrarySymbolReference;
    GetBinaryForm: LibrarySymbolReference;
    MaxOpaqueLength: LibrarySymbolReference;
    BinaryLength: LibrarySymbolReference
  };
  CommonAcl: LibrarySymbolReference & {
    GetBinaryForm: LibrarySymbolReference;
    Purge: LibrarySymbolReference;
    RemoveInheritedAces: LibrarySymbolReference;
    BinaryLength: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    IsCanonical: LibrarySymbolReference;
    IsContainer: LibrarySymbolReference;
    IsDS: LibrarySymbolReference;
    Item: LibrarySymbolReference;
    Revision: LibrarySymbolReference
  };
  CommonObjectSecurity: LibrarySymbolReference & {
    CommonObjectSecurity: LibrarySymbolReference;
    AddAccessRule: LibrarySymbolReference;
    AddAuditRule: LibrarySymbolReference;
    GetAccessRules: LibrarySymbolReference;
    GetAuditRules: LibrarySymbolReference;
    ModifyAccess: LibrarySymbolReference;
    ModifyAudit: LibrarySymbolReference;
    RemoveAccessRule: LibrarySymbolReference;
    RemoveAccessRuleAll: LibrarySymbolReference;
    RemoveAccessRuleSpecific: LibrarySymbolReference;
    RemoveAuditRule: LibrarySymbolReference;
    RemoveAuditRuleAll: LibrarySymbolReference;
    RemoveAuditRuleSpecific: LibrarySymbolReference;
    ResetAccessRule: LibrarySymbolReference;
    SetAccessRule: LibrarySymbolReference;
    SetAuditRule: LibrarySymbolReference
  };
  CommonSecurityDescriptor: LibrarySymbolReference & {
    CommonSecurityDescriptor: LibrarySymbolReference;
    AddDiscretionaryAcl: LibrarySymbolReference;
    AddSystemAcl: LibrarySymbolReference;
    PurgeAccessControl: LibrarySymbolReference;
    PurgeAudit: LibrarySymbolReference;
    SetDiscretionaryAclProtection: LibrarySymbolReference;
    SetSystemAclProtection: LibrarySymbolReference;
    ControlFlags: LibrarySymbolReference;
    DiscretionaryAcl: LibrarySymbolReference;
    Group: LibrarySymbolReference;
    IsContainer: LibrarySymbolReference;
    IsDiscretionaryAclCanonical: LibrarySymbolReference;
    IsDS: LibrarySymbolReference;
    IsSystemAclCanonical: LibrarySymbolReference;
    Owner: LibrarySymbolReference;
    SystemAcl: LibrarySymbolReference
  };
  CompoundAce: LibrarySymbolReference & {
    CompoundAce: LibrarySymbolReference;
    GetBinaryForm: LibrarySymbolReference;
    BinaryLength: LibrarySymbolReference;
    CompoundAceType: LibrarySymbolReference
  };
  CompoundAceType: LibrarySymbolReference & {
    Impersonation: LibrarySymbolReference
  };
  ControlFlags: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    OwnerDefaulted: LibrarySymbolReference;
    GroupDefaulted: LibrarySymbolReference;
    DiscretionaryAclPresent: LibrarySymbolReference;
    DiscretionaryAclDefaulted: LibrarySymbolReference;
    SystemAclPresent: LibrarySymbolReference;
    SystemAclDefaulted: LibrarySymbolReference;
    DiscretionaryAclUntrusted: LibrarySymbolReference;
    ServerSecurity: LibrarySymbolReference;
    DiscretionaryAclAutoInheritRequired: LibrarySymbolReference;
    SystemAclAutoInheritRequired: LibrarySymbolReference;
    DiscretionaryAclAutoInherited: LibrarySymbolReference;
    SystemAclAutoInherited: LibrarySymbolReference;
    DiscretionaryAclProtected: LibrarySymbolReference;
    SystemAclProtected: LibrarySymbolReference;
    RMControlValid: LibrarySymbolReference;
    SelfRelative: LibrarySymbolReference
  };
  CustomAce: LibrarySymbolReference & {
    MaxOpaqueLength: LibrarySymbolReference;
    CustomAce: LibrarySymbolReference;
    GetBinaryForm: LibrarySymbolReference;
    GetOpaque: LibrarySymbolReference;
    SetOpaque: LibrarySymbolReference;
    BinaryLength: LibrarySymbolReference;
    OpaqueLength: LibrarySymbolReference
  };
  DirectoryObjectSecurity: LibrarySymbolReference & {
    DirectoryObjectSecurity: LibrarySymbolReference;
    AccessRuleFactory: LibrarySymbolReference;
    AddAccessRule: LibrarySymbolReference;
    AddAuditRule: LibrarySymbolReference;
    AuditRuleFactory: LibrarySymbolReference;
    GetAccessRules: LibrarySymbolReference;
    GetAuditRules: LibrarySymbolReference;
    ModifyAccess: LibrarySymbolReference;
    ModifyAudit: LibrarySymbolReference;
    RemoveAccessRule: LibrarySymbolReference;
    RemoveAccessRuleAll: LibrarySymbolReference;
    RemoveAccessRuleSpecific: LibrarySymbolReference;
    RemoveAuditRule: LibrarySymbolReference;
    RemoveAuditRuleAll: LibrarySymbolReference;
    RemoveAuditRuleSpecific: LibrarySymbolReference;
    ResetAccessRule: LibrarySymbolReference;
    SetAccessRule: LibrarySymbolReference;
    SetAuditRule: LibrarySymbolReference
  };
  DirectorySecurity: LibrarySymbolReference & {
    DirectorySecurity: LibrarySymbolReference
  };
  DiscretionaryAcl: LibrarySymbolReference & {
    DiscretionaryAcl: LibrarySymbolReference;
    AddAccess: LibrarySymbolReference;
    RemoveAccess: LibrarySymbolReference;
    RemoveAccessSpecific: LibrarySymbolReference;
    SetAccess: LibrarySymbolReference
  };
  FileSecurity: LibrarySymbolReference & {
    FileSecurity: LibrarySymbolReference
  };
  FileSystemAccessRule: LibrarySymbolReference & {
    FileSystemAccessRule: LibrarySymbolReference;
    FileSystemRights: LibrarySymbolReference
  };
  FileSystemAuditRule: LibrarySymbolReference & {
    FileSystemAuditRule: LibrarySymbolReference;
    FileSystemRights: LibrarySymbolReference
  };
  FileSystemRights: LibrarySymbolReference & {
    ListDirectory: LibrarySymbolReference;
    ReadData: LibrarySymbolReference;
    CreateFiles: LibrarySymbolReference;
    WriteData: LibrarySymbolReference;
    AppendData: LibrarySymbolReference;
    CreateDirectories: LibrarySymbolReference;
    ReadExtendedAttributes: LibrarySymbolReference;
    WriteExtendedAttributes: LibrarySymbolReference;
    ExecuteFile: LibrarySymbolReference;
    Traverse: LibrarySymbolReference;
    DeleteSubdirectoriesAndFiles: LibrarySymbolReference;
    ReadAttributes: LibrarySymbolReference;
    WriteAttributes: LibrarySymbolReference;
    Write: LibrarySymbolReference;
    Delete: LibrarySymbolReference;
    ReadPermissions: LibrarySymbolReference;
    Read: LibrarySymbolReference;
    ReadAndExecute: LibrarySymbolReference;
    Modify: LibrarySymbolReference;
    ChangePermissions: LibrarySymbolReference;
    TakeOwnership: LibrarySymbolReference;
    Synchronize: LibrarySymbolReference;
    FullControl: LibrarySymbolReference
  };
  FileSystemSecurity: LibrarySymbolReference & {
    AccessRuleFactory: LibrarySymbolReference;
    AddAccessRule: LibrarySymbolReference;
    AddAuditRule: LibrarySymbolReference;
    AuditRuleFactory: LibrarySymbolReference;
    RemoveAccessRule: LibrarySymbolReference;
    RemoveAccessRuleAll: LibrarySymbolReference;
    RemoveAccessRuleSpecific: LibrarySymbolReference;
    RemoveAuditRule: LibrarySymbolReference;
    RemoveAuditRuleAll: LibrarySymbolReference;
    RemoveAuditRuleSpecific: LibrarySymbolReference;
    ResetAccessRule: LibrarySymbolReference;
    SetAccessRule: LibrarySymbolReference;
    SetAuditRule: LibrarySymbolReference;
    AccessRightType: LibrarySymbolReference;
    AccessRuleType: LibrarySymbolReference;
    AuditRuleType: LibrarySymbolReference
  };
  GenericAce: LibrarySymbolReference & {
    Copy: LibrarySymbolReference;
    CreateFromBinaryForm: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetBinaryForm: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    AceFlags: LibrarySymbolReference;
    AceType: LibrarySymbolReference;
    AuditFlags: LibrarySymbolReference;
    BinaryLength: LibrarySymbolReference;
    InheritanceFlags: LibrarySymbolReference;
    IsInherited: LibrarySymbolReference;
    PropagationFlags: LibrarySymbolReference
  };
  GenericAcl: LibrarySymbolReference & {
    AclRevision: LibrarySymbolReference;
    AclRevisionDS: LibrarySymbolReference;
    MaxBinaryLength: LibrarySymbolReference;
    GenericAcl: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    GetBinaryForm: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    BinaryLength: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    IsSynchronized: LibrarySymbolReference;
    Item: LibrarySymbolReference;
    Revision: LibrarySymbolReference;
    SyncRoot: LibrarySymbolReference
  };
  GenericSecurityDescriptor: LibrarySymbolReference & {
    GetBinaryForm: LibrarySymbolReference;
    GetSddlForm: LibrarySymbolReference;
    IsSddlConversionSupported: LibrarySymbolReference;
    BinaryLength: LibrarySymbolReference;
    ControlFlags: LibrarySymbolReference;
    Group: LibrarySymbolReference;
    Owner: LibrarySymbolReference;
    Revision: LibrarySymbolReference
  };
  InheritanceFlags: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    ContainerInherit: LibrarySymbolReference;
    ObjectInherit: LibrarySymbolReference
  };
  KnownAce: LibrarySymbolReference & {
    AccessMask: LibrarySymbolReference;
    SecurityIdentifier: LibrarySymbolReference
  };
  NativeObjectSecurity: LibrarySymbolReference & {
    ExceptionFromErrorCode: LibrarySymbolReference & {
      ExceptionFromErrorCode: LibrarySymbolReference;
      Invoke: LibrarySymbolReference;
      BeginInvoke: LibrarySymbolReference;
      EndInvoke: LibrarySymbolReference
    }
  };
  ObjectAccessRule: LibrarySymbolReference & {
    ObjectAccessRule: LibrarySymbolReference;
    InheritedObjectType: LibrarySymbolReference;
    ObjectFlags: LibrarySymbolReference;
    ObjectType: LibrarySymbolReference
  };
  ObjectAce: LibrarySymbolReference & {
    ObjectAce: LibrarySymbolReference;
    GetBinaryForm: LibrarySymbolReference;
    MaxOpaqueLength: LibrarySymbolReference;
    BinaryLength: LibrarySymbolReference;
    InheritedObjectAceType: LibrarySymbolReference;
    ObjectAceFlags: LibrarySymbolReference;
    ObjectAceType: LibrarySymbolReference
  };
  ObjectAceFlags: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    ObjectAceTypePresent: LibrarySymbolReference;
    InheritedObjectAceTypePresent: LibrarySymbolReference
  };
  ObjectAuditRule: LibrarySymbolReference & {
    ObjectAuditRule: LibrarySymbolReference;
    InheritedObjectType: LibrarySymbolReference;
    ObjectFlags: LibrarySymbolReference;
    ObjectType: LibrarySymbolReference
  };
  ObjectSecurity: LibrarySymbolReference & {
    ObjectSecurity: LibrarySymbolReference;
    AccessRuleFactory: LibrarySymbolReference;
    AddAccessRule: LibrarySymbolReference;
    AddAuditRule: LibrarySymbolReference;
    AuditRuleFactory: LibrarySymbolReference;
    Persist: LibrarySymbolReference;
    RemoveAccessRule: LibrarySymbolReference;
    RemoveAccessRuleAll: LibrarySymbolReference;
    RemoveAccessRuleSpecific: LibrarySymbolReference;
    RemoveAuditRule: LibrarySymbolReference;
    RemoveAuditRuleAll: LibrarySymbolReference;
    RemoveAuditRuleSpecific: LibrarySymbolReference;
    ResetAccessRule: LibrarySymbolReference;
    SetAccessRule: LibrarySymbolReference;
    SetAuditRule: LibrarySymbolReference;
    AccessRightType: LibrarySymbolReference;
    AccessRuleType: LibrarySymbolReference;
    AuditRuleType: LibrarySymbolReference
  };
  PrivilegeNotHeldException: LibrarySymbolReference & {
    PrivilegeNotHeldException: LibrarySymbolReference;
    PrivilegeName: LibrarySymbolReference
  };
  PropagationFlags: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    NoPropagateInherit: LibrarySymbolReference;
    InheritOnly: LibrarySymbolReference
  };
  QualifiedAce: LibrarySymbolReference & {
    GetOpaque: LibrarySymbolReference;
    SetOpaque: LibrarySymbolReference;
    AceQualifier: LibrarySymbolReference;
    IsCallback: LibrarySymbolReference;
    OpaqueLength: LibrarySymbolReference
  };
  RawAcl: LibrarySymbolReference & {
    RawAcl: LibrarySymbolReference;
    GetBinaryForm: LibrarySymbolReference;
    InsertAce: LibrarySymbolReference;
    RemoveAce: LibrarySymbolReference;
    BinaryLength: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    Item: LibrarySymbolReference;
    Revision: LibrarySymbolReference
  };
  RawSecurityDescriptor: LibrarySymbolReference & {
    RawSecurityDescriptor: LibrarySymbolReference;
    SetFlags: LibrarySymbolReference;
    ControlFlags: LibrarySymbolReference;
    DiscretionaryAcl: LibrarySymbolReference;
    Group: LibrarySymbolReference;
    Owner: LibrarySymbolReference;
    ResourceManagerControl: LibrarySymbolReference;
    SystemAcl: LibrarySymbolReference
  };
  RegistryAccessRule: LibrarySymbolReference & {
    RegistryAccessRule: LibrarySymbolReference;
    RegistryRights: LibrarySymbolReference
  };
  RegistryAuditRule: LibrarySymbolReference & {
    RegistryAuditRule: LibrarySymbolReference;
    RegistryRights: LibrarySymbolReference
  };
  RegistryRights: LibrarySymbolReference & {
    QueryValues: LibrarySymbolReference;
    SetValue: LibrarySymbolReference;
    CreateSubKey: LibrarySymbolReference;
    EnumerateSubKeys: LibrarySymbolReference;
    Notify: LibrarySymbolReference;
    CreateLink: LibrarySymbolReference;
    Delete: LibrarySymbolReference;
    ReadPermissions: LibrarySymbolReference;
    WriteKey: LibrarySymbolReference;
    ExecuteKey: LibrarySymbolReference;
    ReadKey: LibrarySymbolReference;
    ChangePermissions: LibrarySymbolReference;
    TakeOwnership: LibrarySymbolReference;
    FullControl: LibrarySymbolReference
  };
  RegistrySecurity: LibrarySymbolReference & {
    RegistrySecurity: LibrarySymbolReference;
    AccessRuleFactory: LibrarySymbolReference;
    AddAccessRule: LibrarySymbolReference;
    AddAuditRule: LibrarySymbolReference;
    AuditRuleFactory: LibrarySymbolReference;
    RemoveAccessRule: LibrarySymbolReference;
    RemoveAccessRuleAll: LibrarySymbolReference;
    RemoveAccessRuleSpecific: LibrarySymbolReference;
    RemoveAuditRule: LibrarySymbolReference;
    RemoveAuditRuleAll: LibrarySymbolReference;
    RemoveAuditRuleSpecific: LibrarySymbolReference;
    ResetAccessRule: LibrarySymbolReference;
    SetAccessRule: LibrarySymbolReference;
    SetAuditRule: LibrarySymbolReference;
    AccessRightType: LibrarySymbolReference;
    AccessRuleType: LibrarySymbolReference;
    AuditRuleType: LibrarySymbolReference
  };
  ResourceType: LibrarySymbolReference & {
    Unknown: LibrarySymbolReference;
    FileObject: LibrarySymbolReference;
    Service: LibrarySymbolReference;
    Printer: LibrarySymbolReference;
    RegistryKey: LibrarySymbolReference;
    LMShare: LibrarySymbolReference;
    KernelObject: LibrarySymbolReference;
    WindowObject: LibrarySymbolReference;
    DSObject: LibrarySymbolReference;
    DSObjectAll: LibrarySymbolReference;
    ProviderDefined: LibrarySymbolReference;
    WmiGuidObject: LibrarySymbolReference;
    RegistryWow6432Key: LibrarySymbolReference
  };
  SecurityInfos: LibrarySymbolReference & {
    Owner: LibrarySymbolReference;
    Group: LibrarySymbolReference;
    DiscretionaryAcl: LibrarySymbolReference;
    SystemAcl: LibrarySymbolReference
  };
  SystemAcl: LibrarySymbolReference & {
    SystemAcl: LibrarySymbolReference;
    AddAudit: LibrarySymbolReference;
    RemoveAudit: LibrarySymbolReference;
    RemoveAuditSpecific: LibrarySymbolReference;
    SetAudit: LibrarySymbolReference
  }
};
const AccessControl: AccessControlLibrary = createLibrary("System.Security.AccessControl", {
  AccessControlActions: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return AccessControl.AccessControlActions;
        },
      },
      View: {
        kind: "field",
        type: () => {
          return AccessControl.AccessControlActions;
        },
      },
      Change: {
        kind: "field",
        type: () => {
          return AccessControl.AccessControlActions;
        },
      },
    },
  },
  AccessControlModification: {
    kind: "enum",
    members: {
      Add: {
        kind: "field",
        type: () => {
          return AccessControl.AccessControlModification;
        },
      },
      Set: {
        kind: "field",
        type: () => {
          return AccessControl.AccessControlModification;
        },
      },
      Reset: {
        kind: "field",
        type: () => {
          return AccessControl.AccessControlModification;
        },
      },
      Remove: {
        kind: "field",
        type: () => {
          return AccessControl.AccessControlModification;
        },
      },
      RemoveAll: {
        kind: "field",
        type: () => {
          return AccessControl.AccessControlModification;
        },
      },
      RemoveSpecific: {
        kind: "field",
        type: () => {
          return AccessControl.AccessControlModification;
        },
      },
    },
  },
  AccessControlSections: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return AccessControl.AccessControlSections;
        },
      },
      Audit: {
        kind: "field",
        type: () => {
          return AccessControl.AccessControlSections;
        },
      },
      Access: {
        kind: "field",
        type: () => {
          return AccessControl.AccessControlSections;
        },
      },
      Owner: {
        kind: "field",
        type: () => {
          return AccessControl.AccessControlSections;
        },
      },
      Group: {
        kind: "field",
        type: () => {
          return AccessControl.AccessControlSections;
        },
      },
      All: {
        kind: "field",
        type: () => {
          return AccessControl.AccessControlSections;
        },
      },
    },
  },
  AccessControlType: {
    kind: "enum",
    members: {
      Allow: {
        kind: "field",
        type: () => {
          return AccessControl.AccessControlType;
        },
      },
      Deny: {
        kind: "field",
        type: () => {
          return AccessControl.AccessControlType;
        },
      },
    },
  },
  AccessRule: {
    kind: "class",
    members: {
      AccessRule: {
        kind: "method",
        methodKind: "constructor",
      },
      Rights: {
        kind: "property",
        type: undefined,
      },
    },
  },
  AceEnumerator: {
    kind: "class",
    members: {
      MoveNext: {
        kind: "method",
        methodKind: "ordinary",
      },
      Reset: {
        kind: "method",
        methodKind: "ordinary",
      },
      Current: {
        kind: "property",
        type: () => {
          return AccessControl.GenericAce;
        },
      },
    },
    isSealed: true,
  },
  AceFlags: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return AccessControl.AceFlags;
        },
      },
      ObjectInherit: {
        kind: "field",
        type: () => {
          return AccessControl.AceFlags;
        },
      },
      ContainerInherit: {
        kind: "field",
        type: () => {
          return AccessControl.AceFlags;
        },
      },
      NoPropagateInherit: {
        kind: "field",
        type: () => {
          return AccessControl.AceFlags;
        },
      },
      InheritOnly: {
        kind: "field",
        type: () => {
          return AccessControl.AceFlags;
        },
      },
      InheritanceFlags: {
        kind: "field",
        type: () => {
          return AccessControl.AceFlags;
        },
      },
      Inherited: {
        kind: "field",
        type: () => {
          return AccessControl.AceFlags;
        },
      },
      SuccessfulAccess: {
        kind: "field",
        type: () => {
          return AccessControl.AceFlags;
        },
      },
      FailedAccess: {
        kind: "field",
        type: () => {
          return AccessControl.AceFlags;
        },
      },
      AuditFlags: {
        kind: "field",
        type: () => {
          return AccessControl.AceFlags;
        },
      },
    },
  },
  AceQualifier: {
    kind: "enum",
    members: {
      AccessAllowed: {
        kind: "field",
        type: () => {
          return AccessControl.AceQualifier;
        },
      },
      AccessDenied: {
        kind: "field",
        type: () => {
          return AccessControl.AceQualifier;
        },
      },
      SystemAudit: {
        kind: "field",
        type: () => {
          return AccessControl.AceQualifier;
        },
      },
      SystemAlarm: {
        kind: "field",
        type: () => {
          return AccessControl.AceQualifier;
        },
      },
    },
  },
  AceType: {
    kind: "enum",
    members: {
      AccessAllowed: {
        kind: "field",
        type: () => {
          return AccessControl.AceType;
        },
      },
      AccessDenied: {
        kind: "field",
        type: () => {
          return AccessControl.AceType;
        },
      },
      SystemAudit: {
        kind: "field",
        type: () => {
          return AccessControl.AceType;
        },
      },
      SystemAlarm: {
        kind: "field",
        type: () => {
          return AccessControl.AceType;
        },
      },
      AccessAllowedCompound: {
        kind: "field",
        type: () => {
          return AccessControl.AceType;
        },
      },
      AccessAllowedObject: {
        kind: "field",
        type: () => {
          return AccessControl.AceType;
        },
      },
      AccessDeniedObject: {
        kind: "field",
        type: () => {
          return AccessControl.AceType;
        },
      },
      SystemAuditObject: {
        kind: "field",
        type: () => {
          return AccessControl.AceType;
        },
      },
      SystemAlarmObject: {
        kind: "field",
        type: () => {
          return AccessControl.AceType;
        },
      },
      AccessAllowedCallback: {
        kind: "field",
        type: () => {
          return AccessControl.AceType;
        },
      },
      AccessDeniedCallback: {
        kind: "field",
        type: () => {
          return AccessControl.AceType;
        },
      },
      AccessAllowedCallbackObject: {
        kind: "field",
        type: () => {
          return AccessControl.AceType;
        },
      },
      AccessDeniedCallbackObject: {
        kind: "field",
        type: () => {
          return AccessControl.AceType;
        },
      },
      SystemAuditCallback: {
        kind: "field",
        type: () => {
          return AccessControl.AceType;
        },
      },
      SystemAlarmCallback: {
        kind: "field",
        type: () => {
          return AccessControl.AceType;
        },
      },
      SystemAuditCallbackObject: {
        kind: "field",
        type: () => {
          return AccessControl.AceType;
        },
      },
      MaxDefinedAceType: {
        kind: "field",
        type: () => {
          return AccessControl.AceType;
        },
      },
      SystemAlarmCallbackObject: {
        kind: "field",
        type: () => {
          return AccessControl.AceType;
        },
      },
    },
  },
  AuditFlags: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return AccessControl.AuditFlags;
        },
      },
      Success: {
        kind: "field",
        type: () => {
          return AccessControl.AuditFlags;
        },
      },
      Failure: {
        kind: "field",
        type: () => {
          return AccessControl.AuditFlags;
        },
      },
    },
  },
  AuditRule: {
    kind: "class",
    members: {
      AuditRule: {
        kind: "method",
        methodKind: "constructor",
      },
      Rights: {
        kind: "property",
        type: undefined,
      },
    },
  },
  AuthorizationRule: {
    kind: "class",
    members: {
      AuthorizationRule: {
        kind: "method",
        methodKind: "constructor",
      },
      AccessMask: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      IdentityReference: {
        kind: "property",
        type: () => {
          return Principal.IdentityReference;
        },
      },
      InheritanceFlags: {
        kind: "property",
        type: () => {
          return AccessControl.InheritanceFlags;
        },
      },
      IsInherited: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      PropagationFlags: {
        kind: "property",
        type: () => {
          return AccessControl.PropagationFlags;
        },
      },
    },
    isAbstract: true,
  },
  AuthorizationRuleCollection: {
    kind: "class",
    members: {
      AuthorizationRuleCollection: {
        kind: "method",
        methodKind: "constructor",
      },
      AddRule: {
        kind: "method",
        methodKind: "ordinary",
      },
      CopyTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      Item: {
        kind: "property",
        type: () => {
          return AccessControl.AuthorizationRule;
        },
      },
    },
    isSealed: true,
  },
  CommonAce: {
    kind: "class",
    members: {
      CommonAce: {
        kind: "method",
        methodKind: "constructor",
      },
      GetBinaryForm: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      MaxOpaqueLength: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      BinaryLength: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isOverride: true,
      },
    },
    isSealed: true,
  },
  CommonAcl: {
    kind: "class",
    members: {
      GetBinaryForm: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
        isSealed: true,
      },
      Purge: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveInheritedAces: {
        kind: "method",
        methodKind: "ordinary",
      },
      BinaryLength: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isOverride: true,
        isSealed: true,
      },
      Count: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isOverride: true,
        isSealed: true,
      },
      IsCanonical: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsContainer: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsDS: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Item: {
        kind: "property",
        type: () => {
          return AccessControl.GenericAce;
        },
        isOverride: true,
        isSealed: true,
      },
      Revision: {
        kind: "property",
        type: () => {
          return System.Byte;
        },
        isOverride: true,
        isSealed: true,
      },
    },
    isAbstract: true,
  },
  CommonObjectSecurity: {
    kind: "class",
    members: {
      CommonObjectSecurity: {
        kind: "method",
        methodKind: "constructor",
      },
      AddAccessRule: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddAuditRule: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetAccessRules: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetAuditRules: {
        kind: "method",
        methodKind: "ordinary",
      },
      ModifyAccess: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ModifyAudit: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      RemoveAccessRule: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveAccessRuleAll: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveAccessRuleSpecific: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveAuditRule: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveAuditRuleAll: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveAuditRuleSpecific: {
        kind: "method",
        methodKind: "ordinary",
      },
      ResetAccessRule: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetAccessRule: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetAuditRule: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
    isAbstract: true,
  },
  CommonSecurityDescriptor: {
    kind: "class",
    members: {
      CommonSecurityDescriptor: {
        kind: "method",
        methodKind: "constructor",
      },
      AddDiscretionaryAcl: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddSystemAcl: {
        kind: "method",
        methodKind: "ordinary",
      },
      PurgeAccessControl: {
        kind: "method",
        methodKind: "ordinary",
      },
      PurgeAudit: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetDiscretionaryAclProtection: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetSystemAclProtection: {
        kind: "method",
        methodKind: "ordinary",
      },
      ControlFlags: {
        kind: "property",
        type: () => {
          return AccessControl.ControlFlags;
        },
        isOverride: true,
      },
      DiscretionaryAcl: {
        kind: "property",
        type: () => {
          return AccessControl.DiscretionaryAcl;
        },
      },
      Group: {
        kind: "property",
        type: () => {
          return Principal.SecurityIdentifier;
        },
        isNullable: true,
        isOverride: true,
      },
      IsContainer: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsDiscretionaryAclCanonical: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsDS: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsSystemAclCanonical: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Owner: {
        kind: "property",
        type: () => {
          return Principal.SecurityIdentifier;
        },
        isNullable: true,
        isOverride: true,
      },
      SystemAcl: {
        kind: "property",
        type: () => {
          return AccessControl.SystemAcl;
        },
      },
    },
    isSealed: true,
  },
  CompoundAce: {
    kind: "class",
    members: {
      CompoundAce: {
        kind: "method",
        methodKind: "constructor",
      },
      GetBinaryForm: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      BinaryLength: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isOverride: true,
      },
      CompoundAceType: {
        kind: "property",
        type: () => {
          return AccessControl.CompoundAceType;
        },
      },
    },
    isSealed: true,
  },
  CompoundAceType: {
    kind: "enum",
    members: {
      Impersonation: {
        kind: "field",
        type: () => {
          return AccessControl.CompoundAceType;
        },
      },
    },
  },
  ControlFlags: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return AccessControl.ControlFlags;
        },
      },
      OwnerDefaulted: {
        kind: "field",
        type: () => {
          return AccessControl.ControlFlags;
        },
      },
      GroupDefaulted: {
        kind: "field",
        type: () => {
          return AccessControl.ControlFlags;
        },
      },
      DiscretionaryAclPresent: {
        kind: "field",
        type: () => {
          return AccessControl.ControlFlags;
        },
      },
      DiscretionaryAclDefaulted: {
        kind: "field",
        type: () => {
          return AccessControl.ControlFlags;
        },
      },
      SystemAclPresent: {
        kind: "field",
        type: () => {
          return AccessControl.ControlFlags;
        },
      },
      SystemAclDefaulted: {
        kind: "field",
        type: () => {
          return AccessControl.ControlFlags;
        },
      },
      DiscretionaryAclUntrusted: {
        kind: "field",
        type: () => {
          return AccessControl.ControlFlags;
        },
      },
      ServerSecurity: {
        kind: "field",
        type: () => {
          return AccessControl.ControlFlags;
        },
      },
      DiscretionaryAclAutoInheritRequired: {
        kind: "field",
        type: () => {
          return AccessControl.ControlFlags;
        },
      },
      SystemAclAutoInheritRequired: {
        kind: "field",
        type: () => {
          return AccessControl.ControlFlags;
        },
      },
      DiscretionaryAclAutoInherited: {
        kind: "field",
        type: () => {
          return AccessControl.ControlFlags;
        },
      },
      SystemAclAutoInherited: {
        kind: "field",
        type: () => {
          return AccessControl.ControlFlags;
        },
      },
      DiscretionaryAclProtected: {
        kind: "field",
        type: () => {
          return AccessControl.ControlFlags;
        },
      },
      SystemAclProtected: {
        kind: "field",
        type: () => {
          return AccessControl.ControlFlags;
        },
      },
      RMControlValid: {
        kind: "field",
        type: () => {
          return AccessControl.ControlFlags;
        },
      },
      SelfRelative: {
        kind: "field",
        type: () => {
          return AccessControl.ControlFlags;
        },
      },
    },
  },
  CustomAce: {
    kind: "class",
    members: {
      MaxOpaqueLength: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
        isStatic: true,
        isReadOnly: true,
      },
      CustomAce: {
        kind: "method",
        methodKind: "constructor",
      },
      GetBinaryForm: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetOpaque: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetOpaque: {
        kind: "method",
        methodKind: "ordinary",
      },
      BinaryLength: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isOverride: true,
      },
      OpaqueLength: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
    isSealed: true,
  },
  DirectoryObjectSecurity: {
    kind: "class",
    members: {
      DirectoryObjectSecurity: {
        kind: "method",
        methodKind: "constructor",
      },
      AccessRuleFactory: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      AddAccessRule: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddAuditRule: {
        kind: "method",
        methodKind: "ordinary",
      },
      AuditRuleFactory: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetAccessRules: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetAuditRules: {
        kind: "method",
        methodKind: "ordinary",
      },
      ModifyAccess: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ModifyAudit: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      RemoveAccessRule: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveAccessRuleAll: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveAccessRuleSpecific: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveAuditRule: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveAuditRuleAll: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveAuditRuleSpecific: {
        kind: "method",
        methodKind: "ordinary",
      },
      ResetAccessRule: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetAccessRule: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetAuditRule: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
    isAbstract: true,
  },
  DirectorySecurity: {
    kind: "class",
    members: {
      DirectorySecurity: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  DiscretionaryAcl: {
    kind: "class",
    members: {
      DiscretionaryAcl: {
        kind: "method",
        methodKind: "constructor",
      },
      AddAccess: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveAccess: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveAccessSpecific: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetAccess: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
    isSealed: true,
  },
  FileSecurity: {
    kind: "class",
    members: {
      FileSecurity: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  FileSystemAccessRule: {
    kind: "class",
    members: {
      FileSystemAccessRule: {
        kind: "method",
        methodKind: "constructor",
      },
      FileSystemRights: {
        kind: "property",
        type: () => {
          return AccessControl.FileSystemRights;
        },
      },
    },
    isSealed: true,
  },
  FileSystemAuditRule: {
    kind: "class",
    members: {
      FileSystemAuditRule: {
        kind: "method",
        methodKind: "constructor",
      },
      FileSystemRights: {
        kind: "property",
        type: () => {
          return AccessControl.FileSystemRights;
        },
      },
    },
    isSealed: true,
  },
  FileSystemRights: {
    kind: "enum",
    members: {
      ListDirectory: {
        kind: "field",
        type: () => {
          return AccessControl.FileSystemRights;
        },
      },
      ReadData: {
        kind: "field",
        type: () => {
          return AccessControl.FileSystemRights;
        },
      },
      CreateFiles: {
        kind: "field",
        type: () => {
          return AccessControl.FileSystemRights;
        },
      },
      WriteData: {
        kind: "field",
        type: () => {
          return AccessControl.FileSystemRights;
        },
      },
      AppendData: {
        kind: "field",
        type: () => {
          return AccessControl.FileSystemRights;
        },
      },
      CreateDirectories: {
        kind: "field",
        type: () => {
          return AccessControl.FileSystemRights;
        },
      },
      ReadExtendedAttributes: {
        kind: "field",
        type: () => {
          return AccessControl.FileSystemRights;
        },
      },
      WriteExtendedAttributes: {
        kind: "field",
        type: () => {
          return AccessControl.FileSystemRights;
        },
      },
      ExecuteFile: {
        kind: "field",
        type: () => {
          return AccessControl.FileSystemRights;
        },
      },
      Traverse: {
        kind: "field",
        type: () => {
          return AccessControl.FileSystemRights;
        },
      },
      DeleteSubdirectoriesAndFiles: {
        kind: "field",
        type: () => {
          return AccessControl.FileSystemRights;
        },
      },
      ReadAttributes: {
        kind: "field",
        type: () => {
          return AccessControl.FileSystemRights;
        },
      },
      WriteAttributes: {
        kind: "field",
        type: () => {
          return AccessControl.FileSystemRights;
        },
      },
      Write: {
        kind: "field",
        type: () => {
          return AccessControl.FileSystemRights;
        },
      },
      Delete: {
        kind: "field",
        type: () => {
          return AccessControl.FileSystemRights;
        },
      },
      ReadPermissions: {
        kind: "field",
        type: () => {
          return AccessControl.FileSystemRights;
        },
      },
      Read: {
        kind: "field",
        type: () => {
          return AccessControl.FileSystemRights;
        },
      },
      ReadAndExecute: {
        kind: "field",
        type: () => {
          return AccessControl.FileSystemRights;
        },
      },
      Modify: {
        kind: "field",
        type: () => {
          return AccessControl.FileSystemRights;
        },
      },
      ChangePermissions: {
        kind: "field",
        type: () => {
          return AccessControl.FileSystemRights;
        },
      },
      TakeOwnership: {
        kind: "field",
        type: () => {
          return AccessControl.FileSystemRights;
        },
      },
      Synchronize: {
        kind: "field",
        type: () => {
          return AccessControl.FileSystemRights;
        },
      },
      FullControl: {
        kind: "field",
        type: () => {
          return AccessControl.FileSystemRights;
        },
      },
    },
  },
  FileSystemSecurity: {
    kind: "class",
    members: {
      AccessRuleFactory: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
        isSealed: true,
      },
      AddAccessRule: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddAuditRule: {
        kind: "method",
        methodKind: "ordinary",
      },
      AuditRuleFactory: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
        isSealed: true,
      },
      RemoveAccessRule: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveAccessRuleAll: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveAccessRuleSpecific: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveAuditRule: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveAuditRuleAll: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveAuditRuleSpecific: {
        kind: "method",
        methodKind: "ordinary",
      },
      ResetAccessRule: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetAccessRule: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetAuditRule: {
        kind: "method",
        methodKind: "ordinary",
      },
      AccessRightType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isOverride: true,
      },
      AccessRuleType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isOverride: true,
      },
      AuditRuleType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isOverride: true,
      },
    },
    isAbstract: true,
  },
  GenericAce: {
    kind: "class",
    members: {
      Copy: {
        kind: "method",
        methodKind: "ordinary",
      },
      CreateFromBinaryForm: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
        isSealed: true,
      },
      GetBinaryForm: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
        isSealed: true,
      },
      AceFlags: {
        kind: "property",
        type: () => {
          return AccessControl.AceFlags;
        },
      },
      AceType: {
        kind: "property",
        type: () => {
          return AccessControl.AceType;
        },
      },
      AuditFlags: {
        kind: "property",
        type: () => {
          return AccessControl.AuditFlags;
        },
      },
      BinaryLength: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isAbstract: true,
      },
      InheritanceFlags: {
        kind: "property",
        type: () => {
          return AccessControl.InheritanceFlags;
        },
      },
      IsInherited: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      PropagationFlags: {
        kind: "property",
        type: () => {
          return AccessControl.PropagationFlags;
        },
      },
    },
    isAbstract: true,
  },
  GenericAcl: {
    kind: "class",
    members: {
      AclRevision: {
        kind: "field",
        type: () => {
          return System.Byte;
        },
        isStatic: true,
        isReadOnly: true,
      },
      AclRevisionDS: {
        kind: "field",
        type: () => {
          return System.Byte;
        },
        isStatic: true,
        isReadOnly: true,
      },
      MaxBinaryLength: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
        isStatic: true,
        isReadOnly: true,
      },
      GenericAcl: {
        kind: "method",
        methodKind: "constructor",
      },
      CopyTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetBinaryForm: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
      },
      BinaryLength: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isAbstract: true,
      },
      Count: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isAbstract: true,
      },
      IsSynchronized: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Item: {
        kind: "property",
        type: () => {
          return AccessControl.GenericAce;
        },
        isAbstract: true,
      },
      Revision: {
        kind: "property",
        type: () => {
          return System.Byte;
        },
        isAbstract: true,
      },
      SyncRoot: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isVirtual: true,
      },
    },
    isAbstract: true,
  },
  GenericSecurityDescriptor: {
    kind: "class",
    members: {
      GetBinaryForm: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetSddlForm: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsSddlConversionSupported: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      BinaryLength: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      ControlFlags: {
        kind: "property",
        type: () => {
          return AccessControl.ControlFlags;
        },
        isAbstract: true,
      },
      Group: {
        kind: "property",
        type: () => {
          return Principal.SecurityIdentifier;
        },
        isNullable: true,
        isAbstract: true,
      },
      Owner: {
        kind: "property",
        type: () => {
          return Principal.SecurityIdentifier;
        },
        isNullable: true,
        isAbstract: true,
      },
      Revision: {
        kind: "property",
        type: () => {
          return System.Byte;
        },
        isStatic: true,
      },
    },
    isAbstract: true,
  },
  InheritanceFlags: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return AccessControl.InheritanceFlags;
        },
      },
      ContainerInherit: {
        kind: "field",
        type: () => {
          return AccessControl.InheritanceFlags;
        },
      },
      ObjectInherit: {
        kind: "field",
        type: () => {
          return AccessControl.InheritanceFlags;
        },
      },
    },
  },
  KnownAce: {
    kind: "class",
    members: {
      AccessMask: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      SecurityIdentifier: {
        kind: "property",
        type: () => {
          return Principal.SecurityIdentifier;
        },
      },
    },
    isAbstract: true,
  },
  NativeObjectSecurity: {
    kind: "class",
    members: {
      ExceptionFromErrorCode: {
        kind: "generic",
        members: {
          ExceptionFromErrorCode: {
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
    },
  },
  ObjectAccessRule: {
    kind: "class",
    members: {
      ObjectAccessRule: {
        kind: "method",
        methodKind: "constructor",
      },
      InheritedObjectType: {
        kind: "property",
        type: () => {
          return System.Guid;
        },
      },
      ObjectFlags: {
        kind: "property",
        type: () => {
          return AccessControl.ObjectAceFlags;
        },
      },
      ObjectType: {
        kind: "property",
        type: () => {
          return System.Guid;
        },
      },
    },
    isAbstract: true,
  },
  ObjectAce: {
    kind: "class",
    members: {
      ObjectAce: {
        kind: "method",
        methodKind: "constructor",
      },
      GetBinaryForm: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      MaxOpaqueLength: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      BinaryLength: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isOverride: true,
      },
      InheritedObjectAceType: {
        kind: "property",
        type: () => {
          return System.Guid;
        },
      },
      ObjectAceFlags: {
        kind: "property",
        type: () => {
          return AccessControl.ObjectAceFlags;
        },
      },
      ObjectAceType: {
        kind: "property",
        type: () => {
          return System.Guid;
        },
      },
    },
    isSealed: true,
  },
  ObjectAceFlags: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return AccessControl.ObjectAceFlags;
        },
      },
      ObjectAceTypePresent: {
        kind: "field",
        type: () => {
          return AccessControl.ObjectAceFlags;
        },
      },
      InheritedObjectAceTypePresent: {
        kind: "field",
        type: () => {
          return AccessControl.ObjectAceFlags;
        },
      },
    },
  },
  ObjectAuditRule: {
    kind: "class",
    members: {
      ObjectAuditRule: {
        kind: "method",
        methodKind: "constructor",
      },
      InheritedObjectType: {
        kind: "property",
        type: () => {
          return System.Guid;
        },
      },
      ObjectFlags: {
        kind: "property",
        type: () => {
          return AccessControl.ObjectAceFlags;
        },
      },
      ObjectType: {
        kind: "property",
        type: () => {
          return System.Guid;
        },
      },
    },
    isAbstract: true,
  },
  ObjectSecurity: {
    kind: "class",
    members: {
      ObjectSecurity: {
        kind: "method",
        methodKind: "constructor",
      },
      AccessRuleFactory: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      AddAccessRule: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      AddAuditRule: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      AuditRuleFactory: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Persist: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveAccessRule: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      RemoveAccessRuleAll: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      RemoveAccessRuleSpecific: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      RemoveAuditRule: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      RemoveAuditRuleAll: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      RemoveAuditRuleSpecific: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ResetAccessRule: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      SetAccessRule: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      SetAuditRule: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      AccessRightType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isOverride: true,
      },
      AccessRuleType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isOverride: true,
      },
      AuditRuleType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isOverride: true,
      },
    },
    isAbstract: true,
  },
  PrivilegeNotHeldException: {
    kind: "class",
    members: {
      PrivilegeNotHeldException: {
        kind: "method",
        methodKind: "constructor",
      },
      PrivilegeName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  PropagationFlags: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return AccessControl.PropagationFlags;
        },
      },
      NoPropagateInherit: {
        kind: "field",
        type: () => {
          return AccessControl.PropagationFlags;
        },
      },
      InheritOnly: {
        kind: "field",
        type: () => {
          return AccessControl.PropagationFlags;
        },
      },
    },
  },
  QualifiedAce: {
    kind: "class",
    members: {
      GetOpaque: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetOpaque: {
        kind: "method",
        methodKind: "ordinary",
      },
      AceQualifier: {
        kind: "property",
        type: () => {
          return AccessControl.AceQualifier;
        },
      },
      IsCallback: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      OpaqueLength: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
    isAbstract: true,
  },
  RawAcl: {
    kind: "class",
    members: {
      RawAcl: {
        kind: "method",
        methodKind: "constructor",
      },
      GetBinaryForm: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      InsertAce: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveAce: {
        kind: "method",
        methodKind: "ordinary",
      },
      BinaryLength: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isOverride: true,
      },
      Count: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isOverride: true,
      },
      Item: {
        kind: "property",
        type: () => {
          return AccessControl.GenericAce;
        },
        isOverride: true,
      },
      Revision: {
        kind: "property",
        type: () => {
          return System.Byte;
        },
        isOverride: true,
      },
    },
    isSealed: true,
  },
  RawSecurityDescriptor: {
    kind: "class",
    members: {
      RawSecurityDescriptor: {
        kind: "method",
        methodKind: "constructor",
      },
      SetFlags: {
        kind: "method",
        methodKind: "ordinary",
      },
      ControlFlags: {
        kind: "property",
        type: () => {
          return AccessControl.ControlFlags;
        },
        isOverride: true,
      },
      DiscretionaryAcl: {
        kind: "property",
        type: () => {
          return AccessControl.RawAcl;
        },
        isNullable: true,
      },
      Group: {
        kind: "property",
        type: () => {
          return Principal.SecurityIdentifier;
        },
        isNullable: true,
        isOverride: true,
      },
      Owner: {
        kind: "property",
        type: () => {
          return Principal.SecurityIdentifier;
        },
        isNullable: true,
        isOverride: true,
      },
      ResourceManagerControl: {
        kind: "property",
        type: () => {
          return System.Byte;
        },
      },
      SystemAcl: {
        kind: "property",
        type: () => {
          return AccessControl.RawAcl;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  RegistryAccessRule: {
    kind: "class",
    members: {
      RegistryAccessRule: {
        kind: "method",
        methodKind: "constructor",
      },
      RegistryRights: {
        kind: "property",
        type: () => {
          return AccessControl.RegistryRights;
        },
      },
    },
    isSealed: true,
  },
  RegistryAuditRule: {
    kind: "class",
    members: {
      RegistryAuditRule: {
        kind: "method",
        methodKind: "constructor",
      },
      RegistryRights: {
        kind: "property",
        type: () => {
          return AccessControl.RegistryRights;
        },
      },
    },
    isSealed: true,
  },
  RegistryRights: {
    kind: "enum",
    members: {
      QueryValues: {
        kind: "field",
        type: () => {
          return AccessControl.RegistryRights;
        },
      },
      SetValue: {
        kind: "field",
        type: () => {
          return AccessControl.RegistryRights;
        },
      },
      CreateSubKey: {
        kind: "field",
        type: () => {
          return AccessControl.RegistryRights;
        },
      },
      EnumerateSubKeys: {
        kind: "field",
        type: () => {
          return AccessControl.RegistryRights;
        },
      },
      Notify: {
        kind: "field",
        type: () => {
          return AccessControl.RegistryRights;
        },
      },
      CreateLink: {
        kind: "field",
        type: () => {
          return AccessControl.RegistryRights;
        },
      },
      Delete: {
        kind: "field",
        type: () => {
          return AccessControl.RegistryRights;
        },
      },
      ReadPermissions: {
        kind: "field",
        type: () => {
          return AccessControl.RegistryRights;
        },
      },
      WriteKey: {
        kind: "field",
        type: () => {
          return AccessControl.RegistryRights;
        },
      },
      ExecuteKey: {
        kind: "field",
        type: () => {
          return AccessControl.RegistryRights;
        },
      },
      ReadKey: {
        kind: "field",
        type: () => {
          return AccessControl.RegistryRights;
        },
      },
      ChangePermissions: {
        kind: "field",
        type: () => {
          return AccessControl.RegistryRights;
        },
      },
      TakeOwnership: {
        kind: "field",
        type: () => {
          return AccessControl.RegistryRights;
        },
      },
      FullControl: {
        kind: "field",
        type: () => {
          return AccessControl.RegistryRights;
        },
      },
    },
  },
  RegistrySecurity: {
    kind: "class",
    members: {
      RegistrySecurity: {
        kind: "method",
        methodKind: "constructor",
      },
      AccessRuleFactory: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      AddAccessRule: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddAuditRule: {
        kind: "method",
        methodKind: "ordinary",
      },
      AuditRuleFactory: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      RemoveAccessRule: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveAccessRuleAll: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveAccessRuleSpecific: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveAuditRule: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveAuditRuleAll: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveAuditRuleSpecific: {
        kind: "method",
        methodKind: "ordinary",
      },
      ResetAccessRule: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetAccessRule: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetAuditRule: {
        kind: "method",
        methodKind: "ordinary",
      },
      AccessRightType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isOverride: true,
      },
      AccessRuleType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isOverride: true,
      },
      AuditRuleType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isOverride: true,
      },
    },
    isSealed: true,
  },
  ResourceType: {
    kind: "enum",
    members: {
      Unknown: {
        kind: "field",
        type: () => {
          return AccessControl.ResourceType;
        },
      },
      FileObject: {
        kind: "field",
        type: () => {
          return AccessControl.ResourceType;
        },
      },
      Service: {
        kind: "field",
        type: () => {
          return AccessControl.ResourceType;
        },
      },
      Printer: {
        kind: "field",
        type: () => {
          return AccessControl.ResourceType;
        },
      },
      RegistryKey: {
        kind: "field",
        type: () => {
          return AccessControl.ResourceType;
        },
      },
      LMShare: {
        kind: "field",
        type: () => {
          return AccessControl.ResourceType;
        },
      },
      KernelObject: {
        kind: "field",
        type: () => {
          return AccessControl.ResourceType;
        },
      },
      WindowObject: {
        kind: "field",
        type: () => {
          return AccessControl.ResourceType;
        },
      },
      DSObject: {
        kind: "field",
        type: () => {
          return AccessControl.ResourceType;
        },
      },
      DSObjectAll: {
        kind: "field",
        type: () => {
          return AccessControl.ResourceType;
        },
      },
      ProviderDefined: {
        kind: "field",
        type: () => {
          return AccessControl.ResourceType;
        },
      },
      WmiGuidObject: {
        kind: "field",
        type: () => {
          return AccessControl.ResourceType;
        },
      },
      RegistryWow6432Key: {
        kind: "field",
        type: () => {
          return AccessControl.ResourceType;
        },
      },
    },
  },
  SecurityInfos: {
    kind: "enum",
    members: {
      Owner: {
        kind: "field",
        type: () => {
          return AccessControl.SecurityInfos;
        },
      },
      Group: {
        kind: "field",
        type: () => {
          return AccessControl.SecurityInfos;
        },
      },
      DiscretionaryAcl: {
        kind: "field",
        type: () => {
          return AccessControl.SecurityInfos;
        },
      },
      SystemAcl: {
        kind: "field",
        type: () => {
          return AccessControl.SecurityInfos;
        },
      },
    },
  },
  SystemAcl: {
    kind: "class",
    members: {
      SystemAcl: {
        kind: "method",
        methodKind: "constructor",
      },
      AddAudit: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveAudit: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveAuditSpecific: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetAudit: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
    isSealed: true,
  },
});
export default AccessControl
