export interface _AppxBundleResourceFileMapsIntermediateProps extends SimpleItemTypeProps {

}
export interface _GetResolvedSDKReferencesOutputProps extends SimpleItemTypeProps {

}
export interface _PackagingOutputsUnexpandedProps extends SimpleItemTypeProps {

}
export interface _ProjectArchitectureFromPayloadProps extends SimpleItemTypeProps {

}
export interface _ProjectArchitectureItemProps extends SimpleItemTypeProps {

}
export interface _StoreManifestSchemaDirProps {

}
/**
 * Indicates whether to enable acceleration when building in Visual Studio (boolean).
 */
export interface AccelerateBuildsInVisualStudioProps {

}
export interface AdditionalDependenciesProps {

}
export interface AdditionalFileItemNamesProps {

}
export interface AdditionalIncludeDirectoriesProps {

}
export interface AdditionalLibraryDirectoriesProps {

}
export interface AdditionalManifestDependenciesProps {

}
export interface AdditionalManifestFilesProps {

}
export interface AdditionalOptionsProps {

}
export interface AdditionalUsingDirectoriesProps {

}
export interface AddModuleNamesToAssemblyProps {

}
export interface ALProps extends TaskTypeProps {
  AlgorithmId: unknown
  BaseAddress: unknown
  CompanyName: unknown
  Configuration: unknown
  Copyright: unknown
  Culture: unknown
  DelaySign: unknown
  Description: unknown
  EmbedResources: unknown
  EnvironmentVariables: unknown
  EvidenceFile: unknown
  FileVersion: unknown
  Flags: unknown
  GenerateFullPaths: unknown
  KeyContainer: unknown
  KeyFile: unknown
  LinkResources: unknown
  LogStandardErrorAsError: unknown
  MainEntryPoint: unknown
  OutputAssembly: unknown
  Platform: unknown
  ProductName: unknown
  ProductVersion: unknown
  ResponseFiles: unknown
  SdkToolsPath: unknown
  SourceModules: unknown
  StandardErrorImportance: unknown
  StandardOutputImportance: unknown
  TargetType: unknown
  TemplateFile: unknown
  Timeout: unknown
  Title: unknown
  ToolExe: unknown
  ToolPath: unknown
  Trademark: unknown
  Version: unknown
  Win32Icon: unknown
  Win32Resource: unknown
}
export interface AllowIsolationProps {

}
/**
 * Flag indicating whether to allow local network loopback.
 */
export interface AllowLocalNetworkLoopbackProps {

}
export interface AllowUnsafeBlocksProps {

}
/**
 * Customizes the set of rules that are enabled by default.
 */
export interface AnalysisLevelProps {

}
/**
 * Customizes the set of rules that are enabled by default.
 */
export interface AnalysisModeProps {

}
/**
 * An assembly containing diagnostic analyzers
 */
export interface AnalyzerProps extends SimpleItemTypeProps {
  /**
   * Relative or absolute path to the assembly (required)
   */
  Include: string
}
/**
 * Used by Xamarin.Android projects. A boolean value that indicates whether the project is for an Android Application (True) or for an Android Library Project (False or not present).
 */
export interface AndroidApplicationProps {

}
/**
 * Used by Xamarin.Android projects. A string property that indicates which Android dex compiler is used during the Xamarin.Android build process.
 */
export interface AndroidDexToolProps {

}
/**
 * Used by Xamarin.Android projects. A boolean property that determines whether or not AOT profiles are used during Ahead-of-Time compilation.
 */
export interface AndroidEnableProfiledAotProps {

}
/**
 * Used by Xamarin.Android projects. A string property that specifies which type of linking should be performed on assemblies contained within the Android package. Only used in Android Application projects.
 */
export interface AndroidLinkModeProps {

}
/**
 * Used by Xamarin.Android projects. Specifies a semicolon-delimited (;) list of assembly names, without file extensions, of assemblies that should not be linked.
 */
export interface AndroidLinkSkipProps {

}
/**
 * Used by Xamarin.Android projects. A string property that indicates which code shrinker is used for Java code.
 */
export interface AndroidLinkToolProps {

}
/**
 * Used by Xamarin.Android projects. A string property that indicates if you want to package the Android application as an APK file or Android App Bundle.
 */
export interface AndroidPackageFormatProps {

}
/**
 * Android resource files to be used within a Xamarin.Android project.
 */
export interface AndroidResourceProps {

}
/**
 * Used by Xamarin.Android projects. A string property that contains a semicolon (;)-delimited list of ABIs which should be included into the application.
 */
export interface AndroidSupportedAbisProps {

}
/**
 * Used by Xamarin.Android projects. A boolean property that determines whether or not assemblies will be Ahead-of-Time compiled into native code.
 */
export interface AotAssembliesProps {

}
export interface AppConfigForCompilerProps {

}
/**
 * Name of folder for Application Designer
 */
export interface AppDesignerFolderProps {

}
export interface ApplicationConfigurationModeProps {

}
/**
 * Customizes the application default font. The format equivalent to the output of FontConverter.ConvertToInvariantString(). Applies only to Windows Forms projects.
 */
export interface ApplicationDefaultFontProps {

}
/**
 * XAML file that contains the application definition, only one can be defined
 */
export interface ApplicationDefinitionProps extends SimpleItemTypeProps {
  CopyToOutputDirectory: unknown
}
/**
 * Customizes the application DPI awareness mode. Applies only to Windows Forms projects.
 */
export interface ApplicationHighDpiModeProps {

}
export interface ApplicationIconProps {

}
/**
 * integer
 */
export interface ApplicationRevisionProps {

}
/**
 * Indicates whether to set UseCompatibleTextRendering property defined on certain controls (boolean). Applies only to Windows Forms projects.
 */
export interface ApplicationUseCompatibleTextRenderingProps {

}
/**
 * Matches the expression "\d\.\d\.\d\.(\d|\*)"
 */
export interface ApplicationVersionProps {

}
/**
 * Indicates whether to enable or disable visual styles (boolean). Applies only to Windows Forms projects.
 */
export interface ApplicationVisualStylesProps {

}
/**
 * Flag indicating whether to auto-increment package revision.
 */
export interface AppxAutoIncrementPackageRevisionProps {

}
/**
 * Flag indicating whether packaging targets will produce an app bundle.
 */
export interface AppxBundleProps {

}
/**
 * '|'-delimited list of resource qualifiers which will be used for automatic resource pack splitting.
 */
export interface AppxBundleAutoResourcePackageQualifiersProps {

}
/**
 * Full path to a folder where app bundle will be produced.
 */
export interface AppxBundleDirProps {

}
/**
 * Suffix to append to app bundle folder.
 */
export interface AppxBundleFolderSuffixProps {

}
/**
 * Full path to a log file containing a list of generated files during generation of main package file map.
 */
export interface AppxBundleMainPackageFileMapGeneratedFilesListPathProps {

}
/**
 * Full path to an intermediate main package file map.
 */
export interface AppxBundleMainPackageFileMapIntermediatePathProps {

}
/**
 * Prefix used for intermediate main package resources .pri and .map.txt files.
 */
export interface AppxBundleMainPackageFileMapIntermediatePrefixProps {

}
/**
 * Full path to an intermediate main package .pri file.
 */
export interface AppxBundleMainPackageFileMapIntermediatePriPathProps {

}
/**
 * Full path to a main package file map.
 */
export interface AppxBundleMainPackageFileMapPathProps {

}
/**
 * Prefix used for main package resources .pri and .map.txt files.
 */
export interface AppxBundleMainPackageFileMapPrefixProps {

}
/**
 * Suffix used before extension of resource map files.
 */
export interface AppxBundleMainPackageFileMapSuffixProps {

}
/**
 * '|'-delimited list of platforms which will be included in an app bundle.
 */
export interface AppxBundlePlatformsProps {

}
/**
 * Full path to the priconfig.xml file used for generating main package file map.
 */
export interface AppxBundlePriConfigXmlForMainPackageFileMapFileNameProps {

}
/**
 * Full path to the priconfig.xml file used for splitting resource packs.
 */
export interface AppxBundlePriConfigXmlForSplittingFileNameProps {

}
/**
 * A platform which will be used to produce an app bundle.
 */
export interface AppxBundleProducingPlatformProps {

}
/**
 * A platform which will be used to produce resource packs for an app bundle.
 */
export interface AppxBundleResourcePacksProducingPlatformProps {

}
/**
 * Full path to a log file containing a list of generated files during resource splitting.
 */
export interface AppxBundleSplitResourcesGeneratedFilesListPathProps {

}
/**
 * Full path to split resources .pri file.
 */
export interface AppxBundleSplitResourcesPriPathProps {

}
/**
 * Prefix used for split resources .pri and .map.txt files.
 */
export interface AppxBundleSplitResourcesPriPrefixProps {

}
/**
 * Full path to a log file containing a detected qualifiers during resource splitting.
 */
export interface AppxBundleSplitResourcesQualifiersPathProps {

}
/**
 * Flag indicating whether CopyLocal files group should include XML files.
 */
export interface AppxCopyLocalFilesOutputGroupIncludeXmlFilesProps {

}
/**
 * Additional parameters to pass to makepri.exe when generating PRI file for a portable library.
 */
export interface AppxCreatePriFilesForPortableLibrariesAdditionalMakepriExeParametersProps {

}
/**
 * Default hash algorithm ID, used for signing an app package.
 */
export interface AppxDefaultHashAlgorithmIdProps {

}
/**
 * '|'-delimited list of key=value pairs representing default resource qualifiers.
 */
export interface AppxDefaultResourceQualifiersProps {

}
/**
 * Flag to exclude XAML files when XBF is present.
 */
export interface AppxExcludeXamlFromLibraryLayoutsWhenXbfIsPresentProps {

}
/**
 * Flag to exclude XBF files when XAML is present.
 */
export interface AppxExcludeXbfFromSdkPayloadWhenXamlIsPresentProps {

}
/**
 * Additional parameters to pass to makepri.exe when extracting payload file names.
 */
export interface AppxExpandPriContentAdditionalMakepriExeParametersProps {

}
/**
 * Flag indicating whether to filter out unused language resource file maps.
 */
export interface AppxFilterOutUnusedLanguagesResourceFileMapsProps {

}
/**
 * Flag indicating whether to generate resource index files (PRI files) during packaging.
 */
export interface AppxGeneratePriEnabledProps {

}
/**
 * Additional parameters to pass to makepri.exe when generating project PRI file.
 */
export interface AppxGenerateProjectPriFileAdditionalMakepriExeParametersProps {

}
/**
 * Flag indicating whether to enable harvesting of WinMD registration information.
 */
export interface AppxHarvestWinmdRegistrationProps {

}
/**
 * Hash algorithm URI.
 */
export interface AppxHashUriProps extends SimpleItemTypeProps {

}
/**
 * Full path to the folder where package layout will be prepared when producing an app bundle.
 */
export interface AppxLayoutDirProps {

}
/**
 * Name of the folder where package layout will be prepared when producing an app bundle.
 */
export interface AppxLayoutFolderNameProps {

}
/**
 * app manifest template
 */
export interface AppxManifestProps extends SimpleItemTypeProps {

}
/**
 * XPath queries used to extract file names from the app manifest.
 */
export interface AppxManifestFileNameQueryProps {
  /**
   * Optional expression evaluated to determine whether the items should be evaluated
   */
  Condition: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to include in this item list
   */
  Include: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to exclude from the Include list
   */
  Exclude: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to remove from the existing list contents
   */
  Remove: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to be updated with the metadata from contained in this xml element
   */
  Update: string
  /**
   * Optional expression. Used to identify or order system and user elements
   */
  Label: string
}
/**
 * XPath queries used to define image files in the app manifest and restrictions on them.
 */
export interface AppxManifestImageFileNameQueryProps extends SimpleItemTypeProps {

}
/**
 * App manifest metadata item. Can be a literal, or it can be a path to a binary to extract version from.
 */
export interface AppxManifestMetadataProps extends SimpleItemTypeProps {

}
/**
 * App manifest schema file.
 */
export interface AppxManifestSchemaProps extends SimpleItemTypeProps {

}
/**
 * Full path to packaging build tasks assembly.
 */
export interface AppxMSBuildTaskAssemblyProps {

}
/**
 * Full path to a folder containing packaging build targets and tasks assembly.
 */
export interface AppxMSBuildToolsPathProps {

}
/**
 * Targeted maximum OS version tested.
 */
export interface AppxOSMaxVersionTestedProps {

}
/**
 * Flag indicating whether maximum OS version tested in app manifest should be replaced.
 */
export interface AppxOSMaxVersionTestedReplaceManifestVersionProps {

}
/**
 * Targeted minimum OS version.
 */
export interface AppxOSMinVersionProps {

}
/**
 * Flag indicating whether minimum OS version in app manifest should be replaced.
 */
export interface AppxOSMinVersionReplaceManifestVersionProps {

}
/**
 * Flag marking current project as capable of being packaged as an app package.
 */
export interface AppxPackageProps {

}
/**
 * Flag indicating whether to allow inclusion of debug framework references in an app manifest.
 */
export interface AppxPackageAllowDebugFrameworkReferencesInManifestProps {

}
/**
 * Additional qualifier to append to AppxPackageDir.
 */
export interface AppxPackageArtifactsDirProps {

}
/**
 * Full path to a folder where app packages will be saved.
 */
export interface AppxPackageDirProps {

}
/**
 * Name of the folder where app packages are produced.
 */
export interface AppxPackageDirNameProps {

}
/**
 * Full path to app package file map.
 */
export interface AppxPackageFileMapProps {

}
/**
 * Flag indicating whether to include private symbols in symbol packages.
 */
export interface AppxPackageIncludePrivateSymbolsProps {

}
/**
 * Name of the app package to generate.
 */
export interface AppxPackageNameProps {

}
/**
 * Full path to the app package file.
 */
export interface AppxPackageOutputProps {

}
export interface AppxPackagePayloadProps extends SimpleItemTypeProps {

}
/**
 * Full path to the app package recipe.
 */
export interface AppxPackageRecipeProps {

}
/**
 * Flag indicating whether to enable signing of app packages.
 */
export interface AppxPackageSigningEnabledProps {

}
/**
 * Digest algorithm used by the RFC 3161 timestamp server.
 */
export interface AppxPackageSigningTimestampDigestAlgorithmProps {

}
/**
 * RFC 3161 timestamp server's URL.
 */
export interface AppxPackageSigningTimestampServerUrlProps {

}
/**
 * Name of the folder where test app packages will be copied
 */
export interface AppxPackageTestDirProps {

}
/**
 * Flag indicating whether to enable validation of app packages.
 */
export interface AppxPackageValidationEnabledProps {

}
/**
 * Full path to the packaging info file which will contain paths to produced packages.
 */
export interface AppxPackagingInfoFileProps {

}
/**
 * Flag indicating whether to enable prepending initial path when indexing RESW and RESJSON files in class libraries.
 */
export interface AppxPrependPriInitialPathProps {

}
/**
 * Path to an XML file containing default element for priconfi.xml file.
 */
export interface AppxPriConfigXmlDefaultSnippetPathProps {

}
/**
 * Path to an XML file containing packaging element for priconfi.xml file.
 */
export interface AppxPriConfigXmlPackagingSnippetPathProps {

}
/**
 * Initial path when indexing RESW and RESJSON files in class libraries.
 */
export interface AppxPriInitialPathProps {

}
/**
 * Reserved file name which cannot appear in the app package.
 */
export interface AppxReservedFileNameProps {
  /**
   * Optional expression evaluated to determine whether the items should be evaluated
   */
  Condition: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to include in this item list
   */
  Include: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to exclude from the Include list
   */
  Exclude: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to remove from the existing list contents
   */
  Remove: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to be updated with the metadata from contained in this xml element
   */
  Update: string
  /**
   * Optional expression. Used to identify or order system and user elements
   */
  Label: string
}
/**
 * Flag indicating whether to skip unchanged files when copying files during creation of app packages.
 */
export interface AppxSkipUnchangedFilesProps {

}
/**
 * Name of the app store container to generate.
 */
export interface AppxStoreContainerProps {

}
/**
 * Flag indicating whether to enable strict manifest validation.
 */
export interface AppxStrictManifestValidationEnabledProps {

}
/**
 * Flag indicating whether to generate a symbol package when an app package is created.
 */
export interface AppxSymbolPackageEnabledProps {

}
/**
 * Full path to the app symbol package file.
 */
export interface AppxSymbolPackageOutputProps {

}
/**
 * Full path to a directory where stripped PDBs will be stored.
 */
export interface AppxSymbolStrippedDirProps {

}
/**
 * Name of any file which is present on the machine and should not be part of the app payload.
 */
export interface AppxSystemBinaryProps {
  /**
   * Optional expression evaluated to determine whether the items should be evaluated
   */
  Condition: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to include in this item list
   */
  Include: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to exclude from the Include list
   */
  Exclude: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to remove from the existing list contents
   */
  Remove: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to be updated with the metadata from contained in this xml element
   */
  Update: string
  /**
   * Optional expression. Used to identify or order system and user elements
   */
  Label: string
}
/**
 * Flag indicating whether to create test layout when an app package is created.
 */
export interface AppxTestLayoutEnabledProps {

}
/**
 * Flag indicating whether to use hard links if possible when copying files during creation of app packages.
 */
export interface AppxUseHardlinksIfPossibleProps {

}
/**
 * Flag indicating whether to validate app manifest.
 */
export interface AppxValidateAppxManifestProps {

}
/**
 * Flag indicating whether to validate store manifest.
 */
export interface AppxValidateStoreManifestProps {

}
/**
 * Path to the folder where harvested WinMD registration information will be cached.
 */
export interface AppxWinMdCacheDirProps {

}
/**
 * Flag indicating whether to cache the harvested WinMD registration information.
 */
export interface AppxWinMdCacheEnabledProps {

}
/**
 * The path to use for the centralized outputs - if set, UseArtifactsOutput will be defaulted to true. Project outputs will be placed under this path grouped by kind, then by project. See https://learn.microsoft.com/en-us/dotnet/core/sdk/artifacts-output for complete details.
 */
export interface ArtifactsPathProps {

}
export interface AspNetCompilerProps extends TaskTypeProps {
  AllowPartiallyTrustedCallers: unknown
  Clean: unknown
  Debug: unknown
  DelaySign: unknown
  EnvironmentVariables: unknown
  FixedNames: unknown
  Force: unknown
  KeyContainer: unknown
  KeyFile: unknown
  LogStandardErrorAsError: unknown
  MetabasePath: unknown
  PhysicalPath: unknown
  StandardErrorImportance: unknown
  StandardOutputImportance: unknown
  TargetFrameworkMoniker: unknown
  TargetPath: unknown
  Timeout: unknown
  ToolExe: unknown
  ToolPath: unknown
  Updateable: unknown
  VirtualPath: unknown
}
export interface AspNetConfigurationProps {

}
/**
 * Indicates whether to run an ASP.NET Core application using IIS in-process or out-of-process.
 */
export interface AspNetCoreHostingModelProps {

}
/**
 * Indicates which AspNetCoreModule version to use. Versions include V1 and V2.
 */
export interface AspNetCoreModuleNameProps {

}
export interface AssemblyDebugProps {

}
export interface AssemblyIdentityProps {

}
export interface AssemblyKeyContainerNameProps {

}
export interface AssemblyKeyProviderNameProps {

}
export interface AssemblyLinkResourceProps {

}
/**
 * Name of output assembly
 */
export interface AssemblyNameProps {

}
export interface AssemblyOriginatorKeyFileProps {

}
export interface AssemblyOriginatorKeyFileTypeProps {

}
export interface AssemblyOriginatorKeyModeProps {

}
export interface AssemblySearchPath_UseAssemblyFoldersProps {

}
export interface AssemblySearchPath_UseAssemblyFoldersConfigFileSearchPathProps {

}
export interface AssemblySearchPath_UseCandidateAssemblyFilesProps {

}
export interface AssemblySearchPath_UseGACProps {

}
export interface AssemblySearchPath_UseHintPathFromItemProps {

}
export interface AssemblySearchPath_UseOutDirProps {

}
export interface AssemblySearchPath_UseRawFileNameProps {

}
export interface AssemblySearchPath_UseReferencePathProps {

}
export interface AssemblySearchPath_UseRegistryProps {

}
export interface AssemblySearchPath_UseTargetFrameworkDirectoryProps {

}
/**
 * Semicolon-delimited ordered list of paths to search when the ResolveAssemblyReference task looks for an assembly. Some non-path locations like the Global Assembly Cache can also be searched using curly braces: {GAC}.
 */
export interface AssemblySearchPathsProps {

}
/**
 * Description for the assembly manifest
 */
export interface AssemblyTitleProps {

}
export interface AssemblyTypeProps {

}
/**
 * Numeric value of the version for the assembly manifest in the format major.minor.patch (e.g. 2.4.0)
 */
export interface AssemblyVersionProps {

}
/**
 * Can be set to one or more target framework monikers. When determining package compatibility, if the package does not have compatible assets for the project's real target framework, compatibility will be rechecked using each target framework from the AssetTargetFramework project of the referencing project.
 */
export interface AssetTargetFallbackProps {

}
export interface AssignCultureProps extends TaskTypeProps {
  Files: unknown
}
export interface AssignProjectConfigurationProps extends TaskTypeProps {
  AssignedProjects: unknown
  CurrentProjectConfiguration: unknown
  CurrentProjectPlatform: unknown
  DefaultToVcxPlatformMapping: unknown
  ProjectReferences: unknown
  ResolveConfigurationPlatformUsingMappings: unknown
  SolutionConfigurationContents: unknown
  UnassignedProjects: unknown
  VcxToDefaultPlatformMapping: unknown
}
export interface AssignTargetPathProps extends TaskTypeProps {
  Files: unknown
  RootFolder: unknown
}
/**
 * A comma-separated list of NuGet packages authors
 */
export interface AuthorsProps {

}
/**
 * Indicates whether BindingRedirect elements should be automatically generated for referenced assemblies.
 */
export interface AutoGenerateBindingRedirectsProps {

}
/**
 * Flag indicating whether to enable auto increment of an app package revision.
 */
export interface AutoIncrementPackageRevisionProps {

}
/**
 * boolean
 */
export interface AutorunEnabledProps {

}
export interface AxImpProps extends TaskTypeProps {
  ActiveXControlName: unknown
  DelaySign: unknown
  EnvironmentVariables: unknown
  GenerateSource: unknown
  KeyContainer: unknown
  KeyFile: unknown
  LogStandardErrorAsError: unknown
  NoLogo: unknown
  OutputAssembly: unknown
  RuntimeCallableWrapperAssembly: unknown
  SdkToolsPath: unknown
  Silent: unknown
  StandardErrorImportance: unknown
  StandardOutputImportance: unknown
  Timeout: unknown
  ToolExe: unknown
  ToolPath: unknown
  Verbose: unknown
}
export interface BaseAddressProps {

}
/**
 * The base application manifest for the build. Contains ClickOnce security information.
 */
export interface BaseApplicationManifestProps {
  /**
   * Optional expression evaluated to determine whether the items should be evaluated
   */
  Condition: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to include in this item list
   */
  Include: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to exclude from the Include list
   */
  Exclude: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to remove from the existing list contents
   */
  Remove: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to be updated with the metadata from contained in this xml element
   */
  Update: string
  /**
   * Optional expression. Used to identify or order system and user elements
   */
  Label: string
}
/**
 * Base path of output folder, where all configuration-specific output folders will be created. Default value is bin\.
 */
export interface BaseOutputPathProps {

}
export interface BasicRuntimeChecksProps {

}
/**
 * HomeSite, Relative, or Absolute
 */
export interface BootstrapperComponentsLocationProps {

}
export interface BootstrapperComponentsUrlProps {

}
/**
 * boolean
 */
export interface BootstrapperEnabledProps {

}
export interface BootstrapperFileProps extends SimpleItemTypeProps {

}
export interface BrowseInformationProps {

}
export interface BscmakeProps extends SimpleItemTypeProps {

}
export interface BSCMakeProps extends TaskTypeProps {
  AcceptableNonZeroExitCodes: unknown
  ActiveToolSwitchesValues: unknown
  AdditionalOptions: unknown
  EnvironmentVariables: unknown
  ExcludedInputPaths: unknown
  LogStandardErrorAsError: unknown
  MinimalRebuildFromTracking: unknown
  OutputFile: unknown
  PathOverride: unknown
  SkippedExecution: unknown
  Sources: unknown
  SourcesCompiled: unknown
  StandardErrorImportance: unknown
  StandardOutputImportance: unknown
  SuppressStartupBanner: unknown
  Timeout: unknown
  TLogReadFiles: unknown
  TLogWriteFiles: unknown
  ToolExe: unknown
  ToolPath: unknown
  TrackedInputFilesToIgnore: unknown
  TrackedOutputFilesToIgnore: unknown
  TrackerLogDirectory: unknown
  TrackFileAccess: unknown
}
export interface CallingConventionProps {

}
export interface CallTargetProps extends TaskTypeProps {
  RunEachTargetSeparately: unknown
  Targets: unknown
  UseResultsCache: unknown
}
export interface CharacterSetProps {

}
export interface CheckForOverflowUnderflowProps {

}
/**
 * Groups When and Otherwise elements
 */
interface ChooseTypeProps {
  /**
   * Optional expression. Used to identify or order system and user elements
   */
  Label: string
}
export interface CLProps extends TaskTypeProps {
  AcceptableNonZeroExitCodes: unknown
  ActiveToolSwitchesValues: unknown
  AdditionalIncludeDirectories: unknown
  AdditionalOptions: unknown
  AdditionalUsingDirectories: unknown
  AssemblerListingLocation: unknown
  AssemblerOutput: unknown
  BasicRuntimeChecks: unknown
  BrowseInformation: unknown
  BrowseInformationFile: unknown
  BufferSecurityCheck: unknown
  CallingConvention: unknown
  CompileAs: unknown
  CompileAsManaged: unknown
  CreateHotpatchableImage: unknown
  DebugInformationFormat: unknown
  DisableLanguageExtensions: unknown
  DisableSpecificWarnings: unknown
  EnableEnhancedInstructionSet: unknown
  EnableFiberSafeOptimizations: unknown
  EnablePREfast: unknown
  EnvironmentVariables: unknown
  ErrorReporting: unknown
  ExceptionHandling: unknown
  ExcludedInputPaths: unknown
  ExpandAttributedSource: unknown
  FavorSizeOrSpeed: unknown
  FloatingPointExceptions: unknown
  FloatingPointModel: unknown
  ForceConformanceInForLoopScope: unknown
  ForcedIncludeFiles: unknown
  ForcedUsingFiles: unknown
  FunctionLevelLinking: unknown
  GenerateXMLDocumentationFiles: unknown
  IgnoreStandardIncludePath: unknown
  InlineFunctionExpansion: unknown
  IntrinsicFunctions: unknown
  LogStandardErrorAsError: unknown
  MinimalRebuild: unknown
  MinimalRebuildFromTracking: unknown
  MultiProcessorCompilation: unknown
  ObjectFileName: unknown
  ObjectFiles: unknown
  OmitDefaultLibName: unknown
  OmitFramePointers: unknown
  OpenMPSupport: unknown
  Optimization: unknown
  PathOverride: unknown
  PrecompiledHeader: unknown
  PrecompiledHeaderFile: unknown
  PrecompiledHeaderOutputFile: unknown
  PreprocessKeepComments: unknown
  PreprocessorDefinitions: unknown
  PreprocessOutput: unknown
  PreprocessSuppressLineNumbers: unknown
  PreprocessToFile: unknown
  ProcessorNumber: unknown
  ProgramDataBaseFileName: unknown
  RuntimeLibrary: unknown
  RuntimeTypeInfo: unknown
  ShowIncludes: unknown
  SkippedExecution: unknown
  SmallerTypeCheck: unknown
  Sources: unknown
  SourcesCompiled: unknown
  StandardErrorImportance: unknown
  StandardOutputImportance: unknown
  StringPooling: unknown
  StructMemberAlignment: unknown
  SuppressStartupBanner: unknown
  Timeout: unknown
  TLogReadFiles: unknown
  TLogWriteFiles: unknown
  ToolExe: unknown
  ToolPath: unknown
  TrackedInputFilesToIgnore: unknown
  TrackedOutputFilesToIgnore: unknown
  TrackerLogDirectory: unknown
  TrackFileAccess: unknown
  TreatSpecificWarningsAsErrors: unknown
  TreatWarningAsError: unknown
  TreatWChar_tAsBuiltInType: unknown
  UndefineAllPreprocessorDefinitions: unknown
  UndefinePreprocessorDefinitions: unknown
  UseFullPaths: unknown
  UseUnicodeForAssemblerListing: unknown
  WarningLevel: unknown
  WholeProgramOptimization: unknown
  XMLDocumentationFileName: unknown
}
export interface ClCompileProps extends SimpleItemTypeProps {

}
export interface ClientStubFileProps {

}
export interface ClIncludeProps extends SimpleItemTypeProps {

}
export interface CLRImageTypeProps {

}
export interface CLRSupportProps {

}
export interface CLRSupportLastErrorProps {

}
export interface CLRThreadAttributeProps {

}
export interface CLRUnmanagedCodeCheckProps {

}
export interface CodeAnalysisProps extends TaskTypeProps {
  AlternativeToolName: unknown
  AnalysisTimeout: unknown
  ApplyLogFileXsl: unknown
  Assemblies: unknown
  ConsoleXsl: unknown
  Culture: unknown
  DependentAssemblyPaths: unknown
  Dictionaries: unknown
  FilesWritten: unknown
  ForceOutput: unknown
  GenerateSuccessFile: unknown
  IgnoreInvalidTargets: unknown
  IgnoreGeneratedCode: unknown
  Imports: unknown
  LogFile: unknown
  LogFileXsl: unknown
  OutputToConsole: unknown
  OverrideRuleVisibilities: unknown
  PlatformPath: unknown
  Project: unknown
  Quiet: unknown
  References: unknown
  RuleAssemblies: unknown
  Rules: unknown
  SaveMessagesToReport: unknown
  SearchGlobalAssemblyCache: unknown
  Summary: unknown
  SuccessFile: unknown
  Timeout: unknown
  TreatWarningsAsErrors: unknown
  ToolPath: unknown
  UpdateProject: unknown
}
/**
 * Additional options to pass to the Code Analysis command line tool.
 */
export interface CodeAnalysisAdditionalOptionsProps {

}
/**
 * Indicates whether to apply the XSL style sheet specified in $(CodeAnalysisLogFileXsl) to the Code Analysis report. This report is specified in $(CodeAnalysisLogFile). The default is false.
 */
export interface CodeAnalysisApplyLogFileXslProps {

}
/**
 * Path to the XSL style sheet that will be applied to the Code Analysis console output. The default is an empty string (''), which causes Code Analysis to use its default console output.
 */
export interface CodeAnalysisConsoleXslProps {

}
/**
 * Culture to use for Code Analysis spelling rules, for example, 'en-US' or 'en-AU'. The default is the current user interface language for Windows.
 */
export interface CodeAnalysisCultureProps {

}
/**
 * Additional reference assembly paths to pass to the Code Analysis command line tool.
 */
export interface CodeAnalysisDependentAssemblyPathsProps extends SimpleItemTypeProps {
  /**
   * A fully qualified path to a directory containing reference assemblies to be used by Code Analysis.
   */
  Include: string
}
/**
 * Code Analysis custom dictionaries.
 */
export interface CodeAnalysisDictionaryProps extends SimpleItemTypeProps {
  /**
   * Semicolon-separated list of Code Analysis custom dictionaries. Wildcards are allowed.
   */
  Include: string
}
/**
 * Indicates whether Code Analysis should fail if a rule or rule set is missing. The default is false.
 */
export interface CodeAnalysisFailOnMissingRulesProps {

}
/**
 * Indicates whether Code Analysis generates a report file, even when there are no active warnings or errors. The default is true.
 */
export interface CodeAnalysisForceOutputProps {

}
/**
 * Indicates whether Code Analysis generates a '$(CodeAnalysisInputAssembly).lastcodeanalysissucceeded' file in the output folder when no build-breaking errors occur. The default is true.
 */
export interface CodeAnalysisGenerateSuccessFileProps {

}
/**
 * Indicates whether Code Analysis will ignore the default rule directories when searching for rules. The default is false.
 */
export interface CodeAnalysisIgnoreBuiltInRulesProps {

}
/**
 * Indicates whether Code Analysis will ignore the default rule set directories when searching for rule sets. The default is false.
 */
export interface CodeAnalysisIgnoreBuiltInRuleSetsProps {

}
/**
 * Indicates whether Code Analysis should fail silently when it analyzes invalid assemblies, such as those without managed code. The default is true.
 */
export interface CodeAnalysisIgnoreGeneratedCodeProps {

}
/**
 * Indicates whether Code Analysis should silently fail when analyzing invalid assemblies, such as those without managed code. The default is true.
 */
export interface CodeAnalysisIgnoreInvalidTargetsProps {

}
/**
 * Code Analysis projects (*.fxcop) or reports to import.
 */
export interface CodeAnalysisImportProps extends SimpleItemTypeProps {
  /**
   * Semicolon-separated list of Code Analysis projects (*.fxcop) or reports to import. Wildcards are allowed.
   */
  Include: string
}
/**
 * Path to the assembly to be analyzed by Code Analysis. The default is '$(OutDir)$(TargetName)$(TargetExt)'.
 */
export interface CodeAnalysisInputAssemblyProps {

}
/**
 * Path to the output file for the Code Analysis report. The default is '$(CodeAnalysisInputAssembly).CodeAnalysisLog.xml'.
 */
export interface CodeAnalysisLogFileProps {

}
/**
 * Path to the XSL style sheet to reference in the Code Analysis output report. This report is specified in $(CodeAnalysisLogFile). The default is an empty string ('').
 */
export interface CodeAnalysisLogFileXslProps {

}
/**
 * Name of the file, without the path, where Code Analysis project-level suppressions are stored. The default is 'GlobalSuppressions$(DefaultLanguageSourceExtension)'.
 */
export interface CodeAnalysisModuleSuppressionsFileProps {

}
/**
 * Indicates whether to output Code Analysis warnings and errors to the console. The default is false.
 */
export interface CodeAnalysisOutputToConsoleProps {

}
/**
 * Indicates whether to run all overridable Code Analysis rules against all targets. This will cause specific rules, such as those within the Design and Naming categories, to run against both public and internal APIs, instead of only public APIs. The default is false.
 */
export interface CodeAnalysisOverrideRuleVisibilitiesProps {

}
/**
 * Path to the Code Analysis installation folder. The default is '$(VSINSTALLDIR)\Team Tools\Static Analysis Tools\FxCop'.
 */
export interface CodeAnalysisPathProps {

}
/**
 * Path to the .NET Framework folder that contains platform assemblies, such as mscorlib.dll and System.dll. The default is an empty string ('').
 */
export interface CodeAnalysisPlatformPathProps {

}
/**
 * Path to the Code Analysis project (*.fxcop) to load. The default is an empty string ('').
 */
export interface CodeAnalysisProjectProps {

}
/**
 * Indicates whether to suppress all Code Analysis console output other than errors and warnings. This applies when $(CodeAnalysisOutputToConsole) is true. The default is false.
 */
export interface CodeAnalysisQuietProps {

}
/**
 * Semicolon-separated list of paths either to Code Analysis rule assemblies or to folders that contain Code Analysis rule assemblies. The paths are in the form '[+|-][!][file|folder]', where '+' enables all rules in rule assembly, '-' disables all rules in rule assembly, and '!' causes all rules in rule assembly to be treated as errors. For example '+D:\Projects\Rules\NamingRules.dll;+!D:\Projects\Rules\SecurityRules.dll'. The default is '$(CodeAnalysisPath)\Rules'.
 */
export interface CodeAnalysisRuleAssembliesProps {

}
/**
 * Semicolon-separated list of directories in which to search for rules when resolving a rule set. The default is '$(CodeAnalysisPath)\Rules' unless the CodeAnalysisIgnoreBuiltInRules property is set to true.
 */
export interface CodeAnalysisRuleDirectoriesProps {

}
/**
 * Semicolon-separated list of Code Analysis rules. The rules are in the form '[+|-][!]Category#CheckId', where '+' enables the rule, '-' disables the rule, and '!' causes the rule to be treated as an error. For example, '-Microsoft.Naming#CA1700;+!Microsoft.Naming#CA1701'. The default is an empty string ('') which enables all rules.
 */
export interface CodeAnalysisRulesProps {

}
/**
 * A .ruleset file which contains a list of rules to run during analysis. The string can be a full path, a path relative to the project file, or a file name. If a file name is specified, the CodeAnalysisRuleSetDirectories property will be searched to find the file. The default is an empty string ('').
 */
export interface CodeAnalysisRuleSetProps {

}
/**
 * Semicolon-separated list of directories in which to search for rule sets. The default is '$(VSINSTALLDIR)\Team Tools\Static Analysis Tools\Rule Sets' unless the CodeAnalysisIgnoreBuiltInRuleSets property is set to true.
 */
export interface CodeAnalysisRuleSetDirectoriesProps {

}
/**
 * Comma-separated list of the type ('Active', 'Excluded', or 'Absent') of warnings and errors to save to the output report file. The default is 'Active'.
 */
export interface CodeAnalysisSaveMessagesToReportProps {

}
/**
 * Indicates whether Code Analysis should search the Global Assembly Cache (GAC) for missing references that are encountered during analysis. The default is true.
 */
export interface CodeAnalysisSearchGlobalAssemblyCacheProps {

}
/**
 * Indicates whether to output a Code Analysis summary to the console after analysis. The default is false.
 */
export interface CodeAnalysisSummaryProps {

}
/**
 * The time, in seconds, that Code Analysis should wait for analysis of a single item to complete before it aborts analysis. Specify 0 to cause Code Analysis to wait indefinitely. The default is 120.
 */
export interface CodeAnalysisTimeoutProps {

}
/**
 * Indicates whether to treat all Code Analysis warnings as errors. The default is false.
 */
export interface CodeAnalysisTreatWarningsAsErrorsProps {

}
/**
 * Indicates whether to update the Code Analysis project (*.fxcop) specified in $(CodeAnalysisProject). This applies when there are changes during analysis. The default is false.
 */
export interface CodeAnalysisUpdateProjectProps {

}
/**
 * Indicates whether to include the name of the rule when Code Analysis emits a suppression. The default is true.
 */
export interface CodeAnalysisUseTypeNameInSuppressionProps {

}
/**
 * Indicates whether to output verbose Code Analysis diagnostic info to the console. The default is false.
 */
export interface CodeAnalysisVerboseProps {

}
export interface CodePageProps {

}
export interface CombinePathProps extends TaskTypeProps {
  BasePath: unknown
  CombinedPaths: unknown
  Paths: unknown
}
export interface COMFileReferenceProps extends SimpleItemTypeProps {

}
export interface ComFilesOutputGroupOutputsProps extends SimpleItemTypeProps {

}
export interface CommandProps {

}
/**
 * Company name for the assembly manifest
 */
export interface CompanyProps {

}
/**
 * Source files for compiler
 */
export interface CompileProps extends SimpleItemTypeProps {
  /**
   * Semi-colon separated list of source files (wildcards are allowed)
   */
  Include: string
  CopyToOutputDirectory: unknown
}
export interface CompileAsManagedProps {

}
/**
 * Controls where source generated files are saved.
 */
export interface CompilerGeneratedFilesOutputPathProps {

}
export interface ComponentFileNameProps {

}
/**
 * Reference to a COM component
 */
export interface COMReferenceProps extends SimpleItemTypeProps {
  /**
   * COM component name
   */
  Include: string
}
export interface ConfigurationProps {

}
export interface ConfigurationNameProps {

}
export interface ConfigurationOverrideFileProps {

}
export interface ConfigurationTypeProps {

}
/**
 * Files that are not compiled, but may be embedded or published
 */
export interface ContentProps extends SimpleItemTypeProps {
  /**
   * Semi-colon separated list of content files (wildcards are allowed)
   */
  Include: string
  CopyToOutputDirectory: unknown
}
export interface ConvertToAbsolutePathProps extends TaskTypeProps {
  AbsolutePaths: unknown
  Paths: unknown
}
export interface CopyProps extends TaskTypeProps {
  DestinationFiles: unknown
  DestinationFolder: unknown
  OverwriteReadOnlyFiles: unknown
  Retries: unknown
  RetryDelayMilliseconds: unknown
  SkipUnchangedFiles: unknown
  UseHardlinksIfPossible: unknown
  UseSymboliclinksIfPossible: unknown
  SourceFiles: unknown
}
/**
 * Value indicating whether symbol files will be copied from NuGet packages by the compiler
 */
export interface CopyDebugSymbolFilesFromPackagesProps {

}
/**
 * Value indicating whether documentation files will be copied from NuGet packages by the compiler
 */
export interface CopyDocumentationFilesFromPackagesProps {

}
export interface CopyLocalFilesOutputGroupOutputProps extends SimpleItemTypeProps {

}
/**
 * Set to true to copy RazorGenerate items (.cshtml) to the publish directory. Typically Razor files are not needed for a published application if they participate in compilation at build-time or publish-time. By default, the Razor SDK will suppress the copying of RazorGenerate items to the publish directory.
 */
export interface CopyRazorGenerateFilesToPublishDirectoryProps {

}
/**
 * Set to true to copy reference assembly items to the publish directory. Typically reference assemblies are not needed for a published application if Razor compilation occurs at build-time or publish-time. By default, the Razor SDK will suppress the copying of reference assemblies to the publish directory.
 */
export interface CopyRefAssembliesToPublishDirectoryProps {

}
/**
 * Copyright details for the NuGet package
 */
export interface CopyrightProps {

}
export interface CopyWinmdArtifactsOutputGroupOutputsProps extends SimpleItemTypeProps {

}
export interface CPPCleanProps extends TaskTypeProps {
  DeletedFiles: unknown
  DoDelete: unknown
  FilePatternsToDeleteOnClean: unknown
  FilesExcludedFromClean: unknown
  FoldersToClean: unknown
}
export interface CPreprocessOptionsProps {

}
export interface CreateAppStoreContainerProps extends TaskTypeProps {
  Items: unknown
  ProjectName: unknown
  OutputPath: unknown
}
export interface CreateCSharpManifestResourceNameProps extends TaskTypeProps {
  PrependCultureAsDirectory: unknown
  ResourceFiles: unknown
  ResourceFilesWithManifestResourceNames: unknown
  RootNamespace: unknown
}
export interface CreateDesktopShortcutProps {

}
export interface CreateHotpatchableImageProps {

}
export interface CreateHotPatchableImageProps {

}
export interface CreateItemProps extends TaskTypeProps {
  AdditionalMetadata: unknown
  Exclude: unknown
  Include: unknown
  PreserveExistingMetadata: unknown
}
export interface CreatePriConfigXmlForFullIndexProps extends CreatePriConfigXmlTaskTypeProps {
  LayoutResfilesPath: unknown
  ResourcesResfilesPath: unknown
  PriResfilesPath: unknown
}
export interface CreatePriConfigXmlForMainPackageFileMapProps extends CreatePriConfigXmlTaskTypeProps {
  AppxBundleAutoResourcePackageQualifiers: unknown
}
export interface CreatePriConfigXmlForSplittingProps extends CreatePriConfigXmlWithPackagingElementTaskTypeProps {
  ResourcesPriFilePath: unknown
}
export interface CreatePriConfigXmlTaskProps extends TaskTypeProps {
  PriConfigXmlPath: unknown
  PriInitialPath: unknown
  DefaultResourceLanguage: unknown
  DefaultResourceQualifiers: unknown
  ConvertDotsToSlashes: unknown
  IntermediateExtension: unknown
  PriConfigXmlPackagingSnippetPath: unknown
  PriConfigXmlDefaultSnippetPath: unknown
  TargetPlatformIdentifier: unknown
  TargetPlatformVersion: unknown
}
interface CreatePriConfigXmlTaskTypeProps extends TaskTypeProps {
  PriConfigXmlPath: unknown
  PriInitialPath: unknown
  DefaultResourceLanguage: unknown
  DefaultResourceQualifiers: unknown
  ConvertDotsToSlashes: unknown
  IntermediateExtension: unknown
  PriConfigXmlPackagingSnippetPath: unknown
  PriConfigXmlDefaultSnippetPath: unknown
  TargetPlatformIdentifier: unknown
  TargetPlatformVersion: unknown
  /**
   * Optional expression evaluated to determine whether the task should be executed
   */
  Condition: string
  /**
   * Optional boolean indicating whether a recoverable task error should be ignored. Default false
   */
  ContinueOnError: unknown
  /**
   * Defines the bitness of the task if it must be run specifically in a 32bit or 64bit process. If not specified, it will run with the bitness of the build process.  If there are multiple tasks defined in UsingTask with the same name but with different Architecture attribute values, the value of the Architecture attribute specified here will be used to match and select the correct task
   */
  Architecture: unknown
  /**
   * Defines the .NET runtime of the task. This must be specified if the task must run on a specific version of the .NET runtime. If not specified, the task will run on the runtime being used by the build process. If there are multiple tasks defined in UsingTask with the same name but with different Runtime attribute values, the value of the Runtime attribute specified here will be used to match and select the correct task
   */
  Runtime: unknown
}
interface CreatePriConfigXmlWithPackagingElementTaskTypeProps extends TaskTypeProps {
  AppxBundleAutoResourcePackageQualifiers: unknown
  PriConfigXmlPath: unknown
  PriInitialPath: unknown
  DefaultResourceLanguage: unknown
  DefaultResourceQualifiers: unknown
  ConvertDotsToSlashes: unknown
  IntermediateExtension: unknown
  PriConfigXmlPackagingSnippetPath: unknown
  PriConfigXmlDefaultSnippetPath: unknown
  TargetPlatformIdentifier: unknown
  TargetPlatformVersion: unknown
  /**
   * Optional expression evaluated to determine whether the task should be executed
   */
  Condition: string
  /**
   * Optional boolean indicating whether a recoverable task error should be ignored. Default false
   */
  ContinueOnError: unknown
  /**
   * Defines the bitness of the task if it must be run specifically in a 32bit or 64bit process. If not specified, it will run with the bitness of the build process.  If there are multiple tasks defined in UsingTask with the same name but with different Architecture attribute values, the value of the Architecture attribute specified here will be used to match and select the correct task
   */
  Architecture: unknown
  /**
   * Defines the .NET runtime of the task. This must be specified if the task must run on a specific version of the .NET runtime. If not specified, the task will run on the runtime being used by the build process. If there are multiple tasks defined in UsingTask with the same name but with different Runtime attribute values, the value of the Runtime attribute specified here will be used to match and select the correct task
   */
  Runtime: unknown
}
export interface CreatePriFilesForPortableLibrariesProps extends TaskTypeProps {
  ContentToIndex: unknown
  MakePriExeFullPath: unknown
  MakePriExtensionPath: unknown
  IntermediateDirectory: unknown
  DefaultResourceLanguage: unknown
  DefaultResourceQualifiers: unknown
  IntermediateFileWrites: unknown
  CreatedPriFiles: unknown
  IntermediateExtension: unknown
  AdditionalMakepriExeParameters: unknown
  TargetPlatformIdentifier: unknown
  TargetPlatformVersion: unknown
}
export interface CreatePropertyProps extends TaskTypeProps {
  Value: unknown
}
export interface CreateVisualBasicManifestResourceNameProps extends TaskTypeProps {
  PrependCultureAsDirectory: unknown
  ResourceFiles: unknown
  ResourceFilesWithManifestResourceNames: unknown
  RootNamespace: unknown
}
/**
 * boolean
 */
export interface CreateWebPageOnPublishProps {

}
export interface CscProps extends TaskTypeProps {
  AdditionalLibPaths: unknown
  AddModules: unknown
  AllowUnsafeBlocks: unknown
  BaseAddress: unknown
  CheckForOverflowUnderflow: unknown
  CodePage: unknown
  DebugType: unknown
  DefineConstants: unknown
  DelaySign: unknown
  DisabledWarnings: unknown
  DocumentationFile: unknown
  EmitDebugInformation: unknown
  EnvironmentVariables: unknown
  ErrorReport: unknown
  FileAlignment: unknown
  GenerateFullPaths: unknown
  KeyContainer: unknown
  KeyFile: unknown
  LangVersion: unknown
  LinkResources: unknown
  LogStandardErrorAsError: unknown
  MainEntryPoint: unknown
  ModuleAssemblyName: unknown
  NoConfig: unknown
  NoLogo: unknown
  NoStandardLib: unknown
  NoWin32Manifest: unknown
  Optimize: unknown
  OutputAssembly: unknown
  PdbFile: unknown
  Platform: unknown
  References: unknown
  Resources: unknown
  ResponseFiles: unknown
  Sources: unknown
  StandardErrorImportance: unknown
  StandardOutputImportance: unknown
  TargetType: unknown
  Timeout: unknown
  ToolExe: unknown
  ToolPath: unknown
  TreatWarningsAsErrors: unknown
  UseHostCompilerIfAvailable: unknown
  Utf8Output: unknown
  WarningLevel: unknown
  WarningsAsErrors: unknown
  WarningsNotAsErrors: unknown
  Win32Icon: unknown
  Win32Manifest: unknown
  Win32Resource: unknown
}
export interface CultureProps {

}
export interface CurrentSolutionConfigurationContentsProps {
  /**
   * Optional expression evaluated to determine whether the property should be evaluated
   */
  Condition: string
  /**
   * Optional expression. Used to identify or order system and user elements
   */
  Label: string
}
export interface CustomBuildStepProps extends SimpleItemTypeProps {

}
export interface DataExecutionPreventionProps {

}
export interface DebugInformationFormatProps {

}
export interface DebugSecurityZoneURLProps {

}
/**
 * Whether to emit symbols (boolean)
 */
export interface DebugSymbolsProps {

}
/**
 * none, pdbonly, embedded, portable, or full. From C# 6 onwards, pdbonly is the same as full.
 */
export interface DebugTypeProps {

}
export interface DefaultCharTypeProps {

}
export interface DefaultClientScriptProps {

}
export interface DefaultHTMLPageLayoutProps {

}
/**
 * Default resource language.
 */
export interface DefaultLanguageProps {

}
export interface DefaultTargetSchemaProps {

}
export interface DefineConstantsProps {

}
/**
 * Whether DEBUG is defined (boolean)
 */
export interface DefineDebugProps {

}
/**
 * Whether TRACE is defined (boolean)
 */
export interface DefineTraceProps {

}
export interface DelayLoadDLLsProps {

}
export interface DelaySignProps {

}
export interface DeleteProps extends TaskTypeProps {
  DeletedFiles: unknown
  Files: unknown
  TreatErrorsAsWarnings: unknown
}
export interface DependencyInformationFileProps {

}
export interface DeployDirSuffixProps {

}
/**
 * A long description of the NuGet package for UI display
 */
export interface DescriptionProps {

}
/**
 * Whether Visual Studio should do its own faster up-to-date check before Building, rather than invoke MSBuild to do a possibly more accurate one. You would set this to true if you have a heavily customized build process and builds in Visual Studio are not occurring when they should.
 */
export interface DisableFastUpToDateCheckProps {

}
export interface DisableLangXtnsProps {

}
/**
 * Indicates whether Design Time Build should be disabled for referenced @(Protobuf) files.
 */
export interface DisableProtobufDesignTimeBuildProps {

}
export interface DisableSpecificWarningsProps {

}
/**
 * When true, do not discover ProjectReference items representing projects referenced by this project's ProjectReferences. Applies only to projects using the .NET SDK.
 */
export interface DisableTransitiveProjectReferencesProps {

}
export interface DisableXbfGenerationProps {

}
/**
 * boolean
 */
export interface DisallowUrlActivationProps {

}
export interface DllDataFileNameProps {

}
export interface DocumentationFileProps {

}
/**
 * The CLI tool that the user wants restored in the context of the project
 */
export interface DotNetCliToolReferenceProps extends SimpleItemTypeProps {
  /**
   * Package name of the tool. This may differ from its associated reference package name.
   */
  Include: string
  /**
   * Version of dependency
   */
  Version: string
}
export interface DownloadFileProps extends TaskTypeProps {
  DestinationFileName: unknown
  DestinationFolder: unknown
  DownloadedFile: unknown
  Retries: unknown
  RetryDelayMilliseconds: unknown
  SkipUnchangedFiles: unknown
  SourceUrl: unknown
  Timeout: unknown
}
export interface DriverProps {

}
/**
 * Resources to be embedded in the generated assembly
 */
export interface EmbeddedResourceProps extends SimpleItemTypeProps {
  /**
   * Semi-colon separated list of resource files (wildcards are allowed)
   */
  Include: string
  CopyToOutputDirectory: unknown
}
export interface EmbedManagedResourceFileProps {

}
export interface EmbedManifestProps {

}
/**
 * Configures whether all of the @(RazorGenerate) items will be added as embedded files to the produced assembly. When true, everything in @(RazorGenerate) will be added to @(RazorEmbeddedFiles) and passed to CSC.
 */
export interface EmbedRazorGenerateSourcesProps {

}
/**
 * Controls whether source generated files will be saved.
 */
export interface EmitCompilerGeneratedFilesProps {

}
export interface EnableASPDebuggingProps {

}
/**
 * Enables the testing support for .NET Aspire application model. This adds a reference to 'Aspire.Hosting.Testing' NuGet package.
 */
export interface EnableAspireTestingProps {

}
export interface EnableASPXDebuggingProps {

}
export interface EnableCOMDATFoldingProps {

}
export interface EnableCustomCultureProps {

}
/**
 * Enable default Compile item globs for source files.
 */
export interface EnableDefaultCompileItemsProps {

}
/**
 * Set to true to automatically include certain file types, such as .cshtml files, as content in the project. When referenced via Microsoft.NET.Sdk.Web, this additionally includes all files under wwwroot, and any config files.
 */
export interface EnableDefaultContentItemsProps {

}
/**
 * Defaults to true, and if set to false will disable all default item globs.
 */
export interface EnableDefaultItemsProps {

}
/**
 * Enable default None item globs (which cover most files in the project not covered by other globs).
 */
export interface EnableDefaultNoneItemsProps {

}
/**
 * Set to true to automatically include Razor (.razor) files in @(RazorComponent) from @(Content).
 */
export interface EnableDefaultRazorComponentItemsProps {

}
/**
 * Set to true to automatically include Razor (.cshtml) files in @(RazorGenerate) from @(Content).
 */
export interface EnableDefaultRazorGenerateItemsProps {

}
/**
 * Enable Store Submission from the packaging wizard.
 */
export interface EnableDirectStoreSubmissionProps {

}
export interface EnableDPIAwarenessProps {

}
export interface EnableErrorChecksProps {

}
/**
 * Enables the Microsoft.Testing.Extensions.CodeCoverage extension. This is not supported by VSTest
 */
export interface EnableMicrosoftTestingExtensionsCodeCoverageProps {

}
/**
 * Enables the Microsoft.Testing.Extensions.CrashDump extension. This is not supported by VSTest.
 */
export interface EnableMicrosoftTestingExtensionsCrashDumpProps {

}
/**
 * Enables the Microsoft.Testing.Extensions.HangDump extension. This is not supported by VSTest.
 */
export interface EnableMicrosoftTestingExtensionsHangDumpProps {

}
/**
 * Enables the Microsoft.Testing.Extensions.HotReload extension (it has restrictive license). This is not supported by VSTest.
 */
export interface EnableMicrosoftTestingExtensionsHotReloadProps {

}
/**
 * Enables the Microsoft.Testing.Extensions.Retry extension (it has restrictive license). This is not supported by VSTest.
 */
export interface EnableMicrosoftTestingExtensionsRetryProps {

}
/**
 * Enables the Microsoft.Testing.Extensions.TrxReport extension. This is not supported by VSTest.
 */
export interface EnableMicrosoftTestingExtensionsTrxReportProps {

}
/**
 * Enables or disables the use of the MSTest runner. The default is 'true' when using MSTest.Sdk, and 'false' otherwise. Supported in MSTest 3.2 and later versions.
 */
export interface EnableMSTestRunnerProps {

}
/**
 * Indicates whether the .NET analyzers are enabled. They are enabled by default for projects that target .NET 5.0 or later.
 */
export interface EnableNETAnalyzersProps {

}
/**
 * Enables end-to-end testing for modern web apps using Playwright. This adds a reference to 'Microsoft.Playwright.MSTest' NuGet package.
 */
export interface EnablePlaywrightProps {

}
export interface EnableSecurityDebuggingProps {

}
/**
 * Flag indicating whether to enable signing checks during app package generation.
 */
export interface EnableSigningChecksProps {

}
export interface EnableSQLServerDebuggingProps {

}
export interface EnableUACProps {

}
export interface EnableUnmanagedDebuggingProps {

}
/**
 * Controls whether code style analysis rules configured as warnings or errors should execute on build and report violations. The default is false.
 */
export interface EnforceCodeStyleInBuildProps {

}
/**
 * Windows Application Packaging project-specific: Enables the packaging of an executable without having the source code available.
 */
export interface EntryPointExeProps {

}
/**
 * Windows Application Packaging project-specific: Relative path to entry point project file.
 */
export interface EntryPointProjectUniqueNameProps {

}
export interface EntryPointSymbolProps {

}
export interface ErrorProps extends TaskTypeProps {
  Code: unknown
  File: unknown
  HelpKeyword: unknown
  Text: unknown
}
export interface ErrorCheckAllocationsProps {

}
export interface ErrorCheckBoundsProps {

}
export interface ErrorCheckEnumRangeProps {

}
export interface ErrorCheckRefPointersProps {

}
export interface ErrorCheckStubDataProps {

}
export interface ErrorLogProps {

}
export interface ErrorReportProps {

}
export interface ErrorReportingProps {

}
export interface ErrorReportUrlProps {

}
export interface ExcludeDeploymentUrlProps {

}
export interface ExcludedPermissionsProps {

}
export interface ExecProps extends TaskTypeProps {
  Command: unknown
  CustomErrorRegularExpression: unknown
  CustomWarningRegularExpression: unknown
  EnvironmentVariables: unknown
  IgnoreExitCode: unknown
  IgnoreStandardErrorWarningFormat: unknown
  LogStandardErrorAsError: unknown
  Outputs: unknown
  StandardErrorImportance: unknown
  StandardOutputImportance: unknown
  StdErrEncoding: unknown
  StdOutEncoding: unknown
  Timeout: unknown
  ToolExe: unknown
  ToolPath: unknown
  WorkingDirectory: unknown
}
export interface ExpandPayloadDirectoriesProps extends TaskTypeProps {
  Inputs: unknown
  Expanded: unknown
}
export interface ExpandPriContentProps extends ToolTaskTypeProps {
  Inputs: unknown
  Expanded: unknown
  IntermediateFileWrites: unknown
  IntermediateDirectory: unknown
  AdditionalMakepriExeParameters: unknown
  MakePriExeFullPath: unknown
  MakePriExtensionPath: unknown
}
export interface ExtractHashAlgorithmIdProps extends TaskTypeProps {
  StoreAssociationFile: unknown
  HashUris: unknown
  HashAlgorithmId: unknown
}
export interface FallbackCultureProps {

}
export interface FileAlignmentProps {

}
export interface FileAssociationProps extends SimpleItemTypeProps {

}
export interface FileUpgradeFlagsProps {

}
/**
 * Numeric value of the version for the assembly manifest in the format major.minor.build.revision (e.g. 2.4.0.1)
 */
export interface FileVersionProps {

}
export interface FilterOutUnusedLanguagesResourceFileMapsProps extends TaskTypeProps {
  FileMaps: unknown
  FileNamePrefix: unknown
  MapSuffix: unknown
  Languages: unknown
  FilteredFileMaps: unknown
}
/**
 * Path to the final app manifest.
 */
export interface FinalAppxManifestNameProps {

}
/**
 * Full path to the final app package recipe.
 */
export interface FinalAppxPackageRecipeProps {

}
export interface FindAppConfigFileProps extends TaskTypeProps {
  AppConfigFile: unknown
  PrimaryList: unknown
  SecondaryList: unknown
  TargetPath: unknown
}
export interface FindInListProps extends TaskTypeProps {
  CaseSensitive: unknown
  FindLastMatch: unknown
  ItemFound: unknown
  ItemSpecToFind: unknown
  List: unknown
  MatchFileNameOnly: unknown
}
export interface FindUnderPathProps extends TaskTypeProps {
  Files: unknown
  InPath: unknown
  OutOfPath: unknown
  Path: unknown
  UpdateToAbsolutePaths: unknown
}
export interface FixedBaseAddressProps {

}
export interface FloatingPointExceptionsProps {

}
export interface FloatingPointModelProps {

}
/**
 * Used by Visual Studio to identify an empty folder.
 */
export interface FolderProps {
  /**
   * Optional expression evaluated to determine whether the items should be evaluated
   */
  Condition: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to include in this item list
   */
  Include: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to exclude from the Include list
   */
  Exclude: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to remove from the existing list contents
   */
  Remove: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to be updated with the metadata from contained in this xml element
   */
  Update: string
  /**
   * Optional expression. Used to identify or order system and user elements
   */
  Label: string
}
export interface ForcedIncludeFilesProps {

}
export interface ForcedUsingFilesProps {

}
export interface ForceFileOutputProps {

}
export interface ForceSymbolReferencesProps {

}
export interface FormatUrlProps extends TaskTypeProps {
  InputUrl: unknown
  OutputUrl: unknown
}
export interface FormatVersionProps extends TaskTypeProps {
  FormatType: unknown
  OutputVersion: unknown
  Revision: unknown
  Version: unknown
}
export interface FormFactorIDProps {

}
/**
 * Sets the /sdkpath switch for a VB project to the specified value
 */
export interface FrameworkPathOverrideProps {

}
/**
 * Reference to a shared framework.
 */
export interface FrameworkReferenceProps extends SimpleItemTypeProps {
  /**
   * Controls whether the runtime assets of this shared framework can be trimmed by the IL Linker (if PublishTrimmed is true).
   */
  IsTrimmable: string
  /**
   * Controls whether the app will target the latest patch of the runtime.  Defaults to true for self-contained apps, false otherwise.
   */
  TargetLatestRuntimePatch: string
}
export interface FunctionLevelLinkingProps {

}
export interface FunctionOrderProps {

}
export interface GenerateApplicationManifestProps extends TaskTypeProps {
  AssemblyName: unknown
  AssemblyVersion: unknown
  ClrVersion: unknown
  ConfigFile: unknown
  Dependencies: unknown
  Description: unknown
  EntryPoint: unknown
  ErrorReportUrl: unknown
  FileAssociations: unknown
  Files: unknown
  HostInBrowser: unknown
  IconFile: unknown
  InputManifest: unknown
  IsolatedComReferences: unknown
  LauncherBasedDeployment: unknown
  ManifestType: unknown
  MaxTargetPath: unknown
  OSVersion: unknown
  OutputManifest: unknown
  Platform: unknown
  Product: unknown
  Publisher: unknown
  RequiresMinimumFramework35SP1: unknown
  SuiteName: unknown
  SupportUrl: unknown
  TargetCulture: unknown
  TargetFrameworkMoniker: unknown
  TargetFrameworkProfile: unknown
  TargetFrameworkSubset: unknown
  TargetFrameworkVersion: unknown
  TrustInfoFile: unknown
  UseApplicationTrust: unknown
}
export interface GenerateAppxManifestProps extends TaskTypeProps {
  ApplicationExecutableName: unknown
  AppxManifestInput: unknown
  CertificateThumbprint: unknown
  CertificateFile: unknown
  PackageArchitecture: unknown
  FrameworkSdkReferences: unknown
  NonFrameworkSdkReferences: unknown
  AppxManifestOutput: unknown
  DefaultResourceLanguage: unknown
  QualifiersPath: unknown
  ManagedWinmdInprocImplementation: unknown
  WinmdFiles: unknown
  SDKWinmdFiles: unknown
  OSMinVersion: unknown
  OSMaxVersionTested: unknown
  OSMinVersionReplaceManifestVersion: unknown
  OSMaxVersionTestedReplaceManifestVersion: unknown
  EnableSigningChecks: unknown
  ManifestMetadata: unknown
  TargetPlatformIdentifier: unknown
  PackageSigningEnabled: unknown
}
/**
 * Flag indicating whether to generate app package during the build.
 */
export interface GenerateAppxPackageOnBuildProps {

}
export interface GenerateAppxPackageRecipeProps extends TaskTypeProps {
  AppxManifestXml: unknown
  SourceAppxManifest: unknown
  SolutionConfiguration: unknown
  PayloadFiles: unknown
  FrameworkSdkPackages: unknown
  RecipeFile: unknown
  SystemBinaries: unknown
  ReservedFileNames: unknown
  QueryNamespacePrefix: unknown
  QueryNamespace81Prefix: unknown
  ManifestFileNameQueries: unknown
  ManifestImageFileNameQueries: unknown
  PackageArchitecture: unknown
  ProjectDir: unknown
  TargetPlatformIdentifier: unknown
  IndexedPayloadFiles: unknown
  MakePriExtensionPath: unknown
}
export interface GenerateAppxSymbolPackageProps extends TaskTypeProps {
  PdbCopyExeFullPath: unknown
  PdbFiles: unknown
  StrippedDirectory: unknown
  AppxSymbolPackageOutput: unknown
  ProjectName: unknown
  StrippedPdbs: unknown
}
export interface GenerateBootstrapperProps extends TaskTypeProps {
  ApplicationFile: unknown
  ApplicationName: unknown
  ApplicationRequiresElevation: unknown
  ApplicationUrl: unknown
  BootstrapperComponentFiles: unknown
  BootstrapperItems: unknown
  BootstrapperKeyFile: unknown
  ComponentsLocation: unknown
  ComponentsUrl: unknown
  CopyComponents: unknown
  Culture: unknown
  FallbackCulture: unknown
  OutputPath: unknown
  Path: unknown
  SupportUrl: unknown
  Validate: unknown
}
export interface GenerateCatalogFilesProps {

}
export interface GenerateCategoryTagsProps {

}
export interface GenerateClientFilesProps {

}
export interface GenerateDebugInformationProps {

}
export interface GenerateDeploymentManifestProps extends TaskTypeProps {
  AssemblyName: unknown
  AssemblyVersion: unknown
  CreateDesktopShortcut: unknown
  DeploymentUrl: unknown
  Description: unknown
  DisallowUrlActivation: unknown
  EntryPoint: unknown
  ErrorReportUrl: unknown
  InputManifest: unknown
  Install: unknown
  LauncherBasedDeployment: unknown
  MapFileExtensions: unknown
  MaxTargetPath: unknown
  MinimumRequiredVersion: unknown
  OutputManifest: unknown
  Platform: unknown
  Product: unknown
  Publisher: unknown
  SuiteName: unknown
  SupportUrl: unknown
  TargetCulture: unknown
  TargetFrameworkMoniker: unknown
  TargetFrameworkVersion: unknown
  TrustUrlParameters: unknown
  UpdateEnabled: unknown
  UpdateInterval: unknown
  UpdateMode: unknown
  UpdateUnit: unknown
}
/**
 * Value indicating whether a documentation file will be generated by the compiler
 */
export interface GenerateDocumentationFileProps {

}
export interface GenerateLauncherProps extends TaskTypeProps {
  EntryPoint: unknown
  OutputPath: unknown
  VisualStudioVersion: unknown
}
export interface GenerateLibraryLayoutProps {

}
export interface GenerateManifestsProps {

}
export interface GenerateMapFileProps {

}
/**
 * Value indicating whether a NuGet package will be generated when the project is built
 */
export interface GeneratePackageOnBuildProps {

}
export interface GeneratePriConfigurationFilesProps extends TaskTypeProps {
  LayoutResfilesPath: unknown
  ResourcesResfilesPath: unknown
  PriResfilesPath: unknown
  LayoutFiles: unknown
  PRIResourceFiles: unknown
  PriFiles: unknown
  IntermediateExtension: unknown
}
/**
 * Set this property to 'false' to disable the automatic generation of entry point for VSTest.
 */
export interface GenerateProgramFileProps {

}
export interface GenerateProjectArchitecturesFileProps extends TaskTypeProps {
  ProjectArchitectures: unknown
  ProjectArchitecturesFilePath: unknown
}
export interface GenerateProjectPriFileProps extends ToolTaskTypeProps {
  MakePriExeFullPath: unknown
  PriConfigXmlPath: unknown
  IndexFilesForQualifiersCollection: unknown
  ProjectPriIndexName: unknown
  MappingFileFormat: unknown
  InsertReverseMap: unknown
  ProjectDirectory: unknown
  OutputFileName: unknown
  MakePriExtensionPath: unknown
  QualifiersPath: unknown
  GeneratedFilesListPath: unknown
  AdditionalMakepriExeParameters: unknown
  MultipleQualifiersPerDimensionFoundPath: unknown
  IntermediateExtension: unknown
}
export interface GenerateResourceProps extends TaskTypeProps {
  AdditionalInputs: unknown
  ExcludedInputPaths: unknown
  ExecuteAsTool: unknown
  MinimalRebuildFromTracking: unknown
  NeverLockTypeAssemblies: unknown
  OutputResources: unknown
  PublicClass: unknown
  References: unknown
  SdkToolsPath: unknown
  Sources: unknown
  StateFile: unknown
  StronglyTypedClassName: unknown
  StronglyTypedFileName: unknown
  StronglyTypedLanguage: unknown
  StronglyTypedManifestPrefix: unknown
  StronglyTypedNamespace: unknown
  TrackerLogDirectory: unknown
  TrackFileAccess: unknown
  UseSourcePath: unknown
  ExtractResWFiles: unknown
  OutputDirectory: unknown
  MSBuildRuntime: unknown
  MSBuildArchitecture: unknown
}
/**
 * Set this property to 'false' to disable auto registration of extensions through the 'AddSelfRegisteredExtensions'.
 */
export interface GenerateSelfRegisteredExtensionsProps {

}
export interface GenerateSerializationAssembliesProps {

}
export interface GenerateServerFilesProps {

}
export interface GenerateStublessProxiesProps {

}
/**
 * Set this property to 'false' to disable the automatic generation of entry point for Microsoft.Testing.Platform.
 */
export interface GenerateTestingPlatformEntryPointProps {

}
export interface GenerateTrustInfoProps extends TaskTypeProps {
  ApplicationDependencies: unknown
  BaseManifest: unknown
  ExcludedPermissions: unknown
  TargetFrameworkMoniker: unknown
  TargetZone: unknown
  TrustInfoFile: unknown
}
export interface GenerateTypeLibraryProps {

}
interface GenericItemTypeProps extends SimpleItemTypeProps {
  /**
   * Optional expression evaluated to determine whether the items should be evaluated
   */
  Condition: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to include in this item list
   */
  Include: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to exclude from the Include list
   */
  Exclude: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to remove from the existing list contents
   */
  Remove: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to be updated with the metadata from contained in this xml element
   */
  Update: string
  /**
   * Optional expression. Used to identify or order system and user elements
   */
  Label: string
}
interface GenericPropertyTypeProps {
  /**
   * Optional expression evaluated to determine whether the property should be evaluated
   */
  Condition: string
  /**
   * Optional expression. Used to identify or order system and user elements
   */
  Label: string
}
export interface GetAppxBundlePlatformsProps extends TaskTypeProps {
  Input: unknown
  PackageArchitecture: unknown
  Platforms: unknown
  Last: unknown
}
export interface GetAssemblyIdentityProps extends TaskTypeProps {
  Assemblies: unknown
  AssemblyFiles: unknown
}
export interface GetDefaultResourceLanguageProps extends TaskTypeProps {
  DefaultLanguage: unknown
  SourceAppxManifest: unknown
  DefaultResourceLanguage: unknown
}
export interface GetFileHashProps extends TaskTypeProps {
  Files: unknown
  Algorithm: unknown
  MetadataName: unknown
  HashEncoding: unknown
  Hash: unknown
  Items: unknown
}
export interface GetFrameworkPathProps extends TaskTypeProps {
  Path: unknown
}
export interface GetFrameworkSdkPackagesProps extends TaskTypeProps {
  FrameworkSdkReferences: unknown
  FrameworkSdkPackages: unknown
}
export interface GetFrameworkSdkPathProps extends TaskTypeProps {
  Path: unknown
}
export interface GetOutputFileNameProps extends TaskTypeProps {
  OutputExtension: unknown
  OutputFile: unknown
  OutputPath: unknown
  SourceFile: unknown
}
export interface GetPackageArchitectureProps extends TaskTypeProps {
  Platform: unknown
  ProjectArchitecture: unknown
  RecursiveProjectArchitecture: unknown
  PackageArchitecture: unknown
}
export interface GetReferenceAssemblyPathsProps extends TaskTypeProps {
  RootPath: unknown
  TargetFrameworkMoniker: unknown
  TargetFrameworkMonikerDisplayName: unknown
  BypassFrameworkInstallChecks: unknown
}
export interface GetSdkPropertyValueProps extends TaskTypeProps {
  TargetPlatformIdentifier: unknown
  TargetPlatformVersion: unknown
  TargetPlatformSdkRootOverride: unknown
  PropertyName: unknown
  PropertyValue: unknown
}
export interface GetSdkToolFullPathProps extends TaskTypeProps {
  ToolName: unknown
  ToolFullPath: unknown
  TargetPlatformIdentifier: unknown
  TargetPlatformVersion: unknown
  TargetPlatformSdkRootOverride: unknown
  MSBuildArchitecture: unknown
  ActualToolFullPath: unknown
}
export interface GetWindowsDesktopSdkDirProps extends TaskTypeProps {
  TargetPlatformIdentifier: unknown
  TargetPlatformVersion: unknown
  TargetPlatformSdkRootOverride: unknown
  WindowsDesktopSdkDir: unknown
}
export interface HeaderFileNameProps {

}
export interface HeapCommitSizeProps {

}
export interface HeapReserveSizeProps {

}
export interface HighEntropyVAProps {

}
export interface HostInBrowserProps {

}
export interface IgnoreAllDefaultLibrariesProps {

}
export interface IgnoreEmbeddedIDLProps {

}
export interface IgnoreImportLibraryProps {

}
export interface IgnoreSpecificDefaultLibrariesProps {

}
export interface IgnoreStandardIncludePathProps {

}
export interface ImageHasSafeExceptionHandlersProps {

}
/**
 * Enable implicit global usings for the C# project. Possible values are enable, true, and disable.
 */
export interface ImplicitUsingsProps {

}
/**
 * Assemblies whose namespaces should be imported by the Visual Basic compiler
 */
export interface ImportProps {
  /**
   * Optional expression evaluated to determine whether the import should occur
   */
  Condition: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to include in this item list
   */
  Include: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to exclude from the Include list
   */
  Exclude: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to remove from the existing list contents
   */
  Remove: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to be updated with the metadata from contained in this xml element
   */
  Update: string
  /**
   * Optional expression. Used to identify or order system and user elements
   */
  Label: string
  /**
   * Project file to import
   */
  Project: unknown
  /**
   * Name of the SDK which contains the project file to import
   */
  Sdk: string
  /**
   * Optional expression used to specify the version of the SDK referenced by this import
   */
  Version: string
  /**
   * Optional expression used to specify the minimum SDK version required by the referring import
   */
  MinimumVersion: string
}
/**
 * Groups import definitions
 */
interface ImportGroupTypeProps {
  /**
   * Optional expression evaluated to determine whether the ImportGroup should be used
   */
  Condition: string
  /**
   * Optional expression. Used to identify or order system and user elements
   */
  Label: string
}
export interface ImportLibraryProps {

}
/**
 * Declares that the contents of another project file should be inserted at this location
 */
interface ImportTypeProps {
  /**
   * Optional expression evaluated to determine whether the import should occur
   */
  Condition: string
  /**
   * Project file to import
   */
  Project: unknown
  /**
   * Optional expression. Used to identify or order system and user elements
   */
  Label: string
  /**
   * Name of the SDK which contains the project file to import
   */
  Sdk: string
  /**
   * Optional expression used to specify the version of the SDK referenced by this import
   */
  Version: string
  /**
   * Optional expression used to specify the minimum SDK version required by the referring import
   */
  MinimumVersion: string
}
/**
 * Flag indicating whether to include primary build outputs into the app package payload.
 */
export interface IncludeBuiltProjectOutputGroupProps {

}
/**
 * Flag indicating whether to include COM files into the app package payload.
 */
export interface IncludeComFilesOutputGroupProps {

}
/**
 * Flag indicating whether to include content files into the app package payload.
 */
export interface IncludeContentFilesProjectOutputGroupProps {

}
/**
 * Flag indicating whether to include files marked as 'Copy local' into the app package payload.
 */
export interface IncludeCopyLocalFilesOutputGroupProps {

}
/**
 * Flag indicating whether to include WinMD artifacts into the app package payload.
 */
export interface IncludeCopyWinmdArtifactsOutputGroupProps {

}
/**
 * Flag indicating whether to include custom output group into the app package payload.
 */
export interface IncludeCustomOutputGroupForPackagingProps {

}
/**
 * Flag indicating whether to include debug symbols into the app package payload.
 */
export interface IncludeDebugSymbolsProjectOutputGroupProps {

}
/**
 * Flag indicating whether to include documentation into the app package payload.
 */
export interface IncludeDocumentationProjectOutputGroupProps {

}
/**
 * Flag indicating whether to include resolved SDK references into the app package payload.
 */
export interface IncludeGetResolvedSDKReferencesProps {

}
/**
 * Flag indicating whether to include resource index (PRI) files into the app package payload.
 */
export interface IncludePriFilesOutputGroupProps {

}
/**
 * Configures whether all Razor content items (.cshtml files) will be marked to be included in the produced NuGet package as content. All Content items are included in a NuGet package as content files. This setting can be used to control this behavior for Razor content items.
 */
export interface IncludeRazorContentInPackProps {

}
/**
 * Flag indicating whether to include satellite DLLs into the app package payload.
 */
export interface IncludeSatelliteDllsProjectOutputGroupProps {

}
/**
 * Flag indicating whether to include SDK redist into the app package payload.
 */
export interface IncludeSDKRedistOutputGroupProps {

}
/**
 * Flag indicating whether to include SGen files into the app package payload.
 */
export interface IncludeSGenFilesOutputGroupProps {

}
/**
 * Flag indicating whether to include source files into the app package payload.
 */
export interface IncludeSourceFilesProjectOutputGroupProps {

}
/**
 * Product version of the assembly for UI display (e.g. 1.0 Beta)
 */
export interface InformationalVersionProps {

}
export interface InputResourceManifestsProps {

}
export interface InputsProps {

}
/**
 * Flag indicating whether to insert reverse resource map during resource index generation.
 */
export interface InsertReverseMapProps {

}
export interface InstallProps {

}
/**
 * Web, Unc, or Disk
 */
export interface InstallFromProps {

}
export interface InstallUrlProps {

}
export interface InterfaceIdentifierFileNameProps {

}
/**
 * Specifies that internal types and members are visible to the specified friend assemblies.
 */
export interface InternalsVisibleToProps extends SimpleItemTypeProps {
  /**
   * The name of the friend assembly to make internal types and members visible to.
   */
  Include: string
  /**
   * Optional public key associated with the strong name signature of the friend assembly.
   */
  Key: string
}
export interface IntrinsicFunctionsProps {

}
/**
 * Indicates whether an app runs in globalization-invariant mode without access to culture-specific data and behavior.
 */
export interface InvariantGlobalizationProps {

}
/**
 * Indicates whether a class library is compatible with native AOT. Setting to true will enable analyzers for trimming, single file, and AOT.
 */
export interface IsAotCompatibleProps {

}
export interface IsAssemblyProps extends TaskTypeProps {
  Assemblies: unknown
  AssemblyFiles: unknown
}
export interface IsCodeSharingProjectProps {

}
/**
 * Indicates whether the project can be used to create a NuGet package.
 */
export interface IsPackableProps {

}
/**
 * Controls whether the application is a test application. Set it to 'false' in a non-test project that references a test project to avoid error CS8892.
 */
export interface IsTestingPlatformApplicationProps {

}
export interface IsWebBootstrapperProps {

}
export interface ItemProps {
  /**
   * Optional expression evaluated to determine whether the items should be evaluated
   */
  Condition: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to include in this item list
   */
  Include: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to exclude from the Include list
   */
  Exclude: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to remove from the existing list contents
   */
  Remove: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to be updated with the metadata from contained in this xml element
   */
  Update: string
  /**
   * Optional expression. Used to identify or order system and user elements
   */
  Label: string
}
/**
 * Groups item metadata definitions
 */
interface ItemDefinitionGroupTypeProps {
  /**
   * Optional expression evaluated to determine whether the ItemDefinitionGroup should be used
   */
  Condition: string
  /**
   * Optional expression. Used to identify or order system and user elements
   */
  Label: string
}
/**
 * Groups item list definitions
 */
interface ItemGroupTypeProps {
  /**
   * Optional expression evaluated to determine whether the ItemGroup should be used
   */
  Condition: string
  /**
   * Optional expression. Used to identify or order system and user elements
   */
  Label: string
}
export interface JCPAProps {

}
export interface KeyContainerProps {

}
export interface KeyFileProps {

}
export interface KeywordProps {

}
export interface LangVersionProps {

}
export interface LargeAddressAwareProps {

}
/**
 * Full path to a folder with package layout.
 */
export interface LayoutDirProps {

}
export interface LCProps extends TaskTypeProps {
  EnvironmentVariables: unknown
  LicenseTarget: unknown
  LogStandardErrorAsError: unknown
  NoLogo: unknown
  OutputDirectory: unknown
  OutputLicense: unknown
  ReferencedAssemblies: unknown
  SdkToolsPath: unknown
  Sources: unknown
  StandardErrorImportance: unknown
  StandardOutputImportance: unknown
  Timeout: unknown
  ToolExe: unknown
  ToolPath: unknown
}
export interface LIBProps extends TaskTypeProps {
  AcceptableNonZeroExitCodes: unknown
  ActiveToolSwitchesValues: unknown
  AdditionalDependencies: unknown
  AdditionalLibraryDirectories: unknown
  AdditionalOptions: unknown
  DisplayLibrary: unknown
  EnvironmentVariables: unknown
  ErrorReporting: unknown
  ExcludedInputPaths: unknown
  ExportNamedFunctions: unknown
  ForceSymbolReferences: unknown
  IgnoreAllDefaultLibraries: unknown
  IgnoreSpecificDefaultLibraries: unknown
  LinkLibraryDependencies: unknown
  LinkTimeCodeGeneration: unknown
  LogStandardErrorAsError: unknown
  MinimalRebuildFromTracking: unknown
  MinimumRequiredVersion: unknown
  ModuleDefinitionFile: unknown
  OutputFile: unknown
  PathOverride: unknown
  RemoveObjects: unknown
  SkippedExecution: unknown
  Sources: unknown
  SourcesCompiled: unknown
  StandardErrorImportance: unknown
  StandardOutputImportance: unknown
  SubSystem: unknown
  SuppressStartupBanner: unknown
  TargetMachine: unknown
  Timeout: unknown
  TLogReadFiles: unknown
  TLogWriteFiles: unknown
  ToolExe: unknown
  ToolPath: unknown
  TrackedInputFilesToIgnore: unknown
  TrackedOutputFilesToIgnore: unknown
  TrackerLogDirectory: unknown
  TrackFileAccess: unknown
  TreatLibWarningAsErrors: unknown
  UseUnicodeResponseFiles: unknown
  Verbose: unknown
}
export interface LinkProps extends SimpleItemTypeProps {
  AcceptableNonZeroExitCodes: unknown
  ActiveToolSwitchesValues: unknown
  AdditionalDependencies: unknown
  AdditionalLibraryDirectories: unknown
  AdditionalManifestDependencies: unknown
  AdditionalOptions: unknown
  AddModuleNamesToAssembly: unknown
  AllowIsolation: unknown
  AssemblyDebug: unknown
  AssemblyLinkResource: unknown
  BaseAddress: unknown
  CLRImageType: unknown
  CLRSupportLastError: unknown
  CLRThreadAttribute: unknown
  CLRUnmanagedCodeCheck: unknown
  CreateHotPatchableImage: unknown
  DataExecutionPrevention: unknown
  DelayLoadDLLs: unknown
  DelaySign: unknown
  Driver: unknown
  EmbedManagedResourceFile: unknown
  EnableCOMDATFolding: unknown
  EnableUAC: unknown
  EntryPointSymbol: unknown
  EnvironmentVariables: unknown
  ExcludedInputPaths: unknown
  FixedBaseAddress: unknown
  ForceFileOutput: unknown
  ForceSymbolReferences: unknown
  FunctionOrder: unknown
  GenerateDebugInformation: unknown
  GenerateManifest: unknown
  GenerateMapFile: unknown
  HeapCommitSize: unknown
  HeapReserveSize: unknown
  IgnoreAllDefaultLibraries: unknown
  IgnoreEmbeddedIDL: unknown
  IgnoreImportLibrary: unknown
  IgnoreSpecificDefaultLibraries: unknown
  ImageHasSafeExceptionHandlers: unknown
  ImportLibrary: unknown
  KeyContainer: unknown
  KeyFile: unknown
  LargeAddressAware: unknown
  LinkDLL: unknown
  LinkErrorReporting: unknown
  LinkIncremental: unknown
  LinkLibraryDependencies: unknown
  LinkStatus: unknown
  LinkTimeCodeGeneration: unknown
  LogStandardErrorAsError: unknown
  ManifestFile: unknown
  MapExports: unknown
  MapFileName: unknown
  MergedIDLBaseFileName: unknown
  MergeSections: unknown
  MidlCommandFile: unknown
  MinimalRebuildFromTracking: unknown
  MinimumRequiredVersion: unknown
  ModuleDefinitionFile: unknown
  MSDOSStubFileName: unknown
  NoEntryPoint: unknown
  ObjectFiles: unknown
  OptimizeReferences: unknown
  OutputFile: unknown
  PathOverride: unknown
  PerUserRedirection: unknown
  PreprocessOutput: unknown
  PreventDllBinding: unknown
  Profile: unknown
  ProfileGuidedDatabase: unknown
  ProgramDatabaseFile: unknown
  RandomizedBaseAddress: unknown
  RegisterOutput: unknown
  SectionAlignment: unknown
  SetChecksum: unknown
  ShowProgress: unknown
  SkippedExecution: unknown
  Sources: unknown
  SourcesCompiled: unknown
  SpecifySectionAttributes: unknown
  StackCommitSize: unknown
  StackReserveSize: unknown
  StandardErrorImportance: unknown
  StandardOutputImportance: unknown
  StripPrivateSymbols: unknown
  SubSystem: unknown
  SupportNobindOfDelayLoadedDLL: unknown
  SupportUnloadOfDelayLoadedDLL: unknown
  SuppressStartupBanner: unknown
  SwapRunFromCD: unknown
  SwapRunFromNET: unknown
  TargetMachine: unknown
  TerminalServerAware: unknown
  Timeout: unknown
  TLogReadFiles: unknown
  TLogWriteFiles: unknown
  ToolExe: unknown
  ToolPath: unknown
  TrackedInputFilesToIgnore: unknown
  TrackedOutputFilesToIgnore: unknown
  TrackerLogDirectory: unknown
  TrackFileAccess: unknown
  TreatLinkerWarningAsErrors: unknown
  TurnOffAssemblyGeneration: unknown
  TypeLibraryFile: unknown
  TypeLibraryResourceID: unknown
  UACExecutionLevel: unknown
  UACUIAccess: unknown
  UseLibraryDependencyInputs: unknown
  Version: unknown
  /**
   * Optional expression evaluated to determine whether the items should be evaluated
   */
  Condition: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to include in this item list
   */
  Include: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to exclude from the Include list
   */
  Exclude: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to remove from the existing list contents
   */
  Remove: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to be updated with the metadata from contained in this xml element
   */
  Update: string
  /**
   * Optional expression. Used to identify or order system and user elements
   */
  Label: string
}
export interface LinkErrorReportingProps {

}
export interface LinkIncrementalProps {

}
interface LinkItemProps extends SimpleItemTypeProps {
  /**
   * Optional expression evaluated to determine whether the items should be evaluated
   */
  Condition: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to include in this item list
   */
  Include: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to exclude from the Include list
   */
  Exclude: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to remove from the existing list contents
   */
  Remove: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to be updated with the metadata from contained in this xml element
   */
  Update: string
  /**
   * Optional expression. Used to identify or order system and user elements
   */
  Label: string
}
export interface LinkStatusProps {

}
export interface LinkTimeCodeGenerationProps {

}
export interface LocaleIDProps {

}
export interface MakeAppxBundleProps extends MakeAppxWithOutputTypeProps {
  BundleDir: unknown
}
/**
 * Full path to makeappx.exe utility.
 */
export interface MakeAppxExeFullPathProps {

}
export interface MakeAppxPackProps extends MakeAppxWithOutputTypeProps {
  ResourcePack: unknown
  ValidateResourcesReferencedByManifest: unknown
  HashAlgorithmId: unknown
  AppxManifest: unknown
  FileMap: unknown
}
interface MakeAppxTypeProps extends TaskTypeProps {
  MakeAppxExeFullPath: unknown
  Parameters: unknown
  ExitCode: unknown
  YieldDuringToolExecution: unknown
  UseCommandProcessor: unknown
  EchoOff: unknown
  ToolExe: unknown
  ToolPath: unknown
  EnvironmentVariables: unknown
  Timeout: unknown
  StandardErrorImportance: unknown
  StandardOutputImportance: unknown
  LogStandardErrorAsError: unknown
  /**
   * Optional expression evaluated to determine whether the task should be executed
   */
  Condition: string
  /**
   * Optional boolean indicating whether a recoverable task error should be ignored. Default false
   */
  ContinueOnError: unknown
  /**
   * Defines the bitness of the task if it must be run specifically in a 32bit or 64bit process. If not specified, it will run with the bitness of the build process.  If there are multiple tasks defined in UsingTask with the same name but with different Architecture attribute values, the value of the Architecture attribute specified here will be used to match and select the correct task
   */
  Architecture: unknown
  /**
   * Defines the .NET runtime of the task. This must be specified if the task must run on a specific version of the .NET runtime. If not specified, the task will run on the runtime being used by the build process. If there are multiple tasks defined in UsingTask with the same name but with different Runtime attribute values, the value of the Runtime attribute specified here will be used to match and select the correct task
   */
  Runtime: unknown
}
interface MakeAppxWithOutputTypeProps extends TaskTypeProps {
  Output: unknown
  MakeAppxExeFullPath: unknown
  Parameters: unknown
  ExitCode: unknown
  YieldDuringToolExecution: unknown
  UseCommandProcessor: unknown
  EchoOff: unknown
  ToolExe: unknown
  ToolPath: unknown
  EnvironmentVariables: unknown
  Timeout: unknown
  StandardErrorImportance: unknown
  StandardOutputImportance: unknown
  LogStandardErrorAsError: unknown
  /**
   * Optional expression evaluated to determine whether the task should be executed
   */
  Condition: string
  /**
   * Optional boolean indicating whether a recoverable task error should be ignored. Default false
   */
  ContinueOnError: unknown
  /**
   * Defines the bitness of the task if it must be run specifically in a 32bit or 64bit process. If not specified, it will run with the bitness of the build process.  If there are multiple tasks defined in UsingTask with the same name but with different Architecture attribute values, the value of the Architecture attribute specified here will be used to match and select the correct task
   */
  Architecture: unknown
  /**
   * Defines the .NET runtime of the task. This must be specified if the task must run on a specific version of the .NET runtime. If not specified, the task will run on the runtime being used by the build process. If there are multiple tasks defined in UsingTask with the same name but with different Runtime attribute values, the value of the Runtime attribute specified here will be used to match and select the correct task
   */
  Runtime: unknown
}
export interface MakeDirProps extends TaskTypeProps {
  Directories: unknown
}
/**
 * Full path to makepri.exe utility.
 */
export interface MakePriExeFullPathProps {

}
/**
 * Name of the binary containing managed WinMD in-proc implementation.
 */
export interface ManagedWinmdInprocImplementationProps {

}
export interface ManifestProps extends SimpleItemTypeProps {

}
export interface ManifestCertificateThumbprintProps {

}
export interface ManifestFromManagedAssemblyProps {

}
export interface ManifestKeyFileProps {

}
export interface MapExportsProps {

}
/**
 * boolean
 */
export interface MapFileExtensionsProps {

}
export interface MapFileNameProps {

}
export interface MergedIDLBaseFileNameProps {

}
export interface MergeSectionsProps {

}
export interface MessageProps extends TaskTypeProps {
  Importance: unknown
  Text: unknown
}
export interface MidlProps extends SimpleItemTypeProps {

}
export interface MIDLProps extends TaskTypeProps {
  AcceptableNonZeroExitCodes: unknown
  ActiveToolSwitchesValues: unknown
  AdditionalIncludeDirectories: unknown
  AdditionalOptions: unknown
  ApplicationConfigurationMode: unknown
  ClientStubFile: unknown
  CPreprocessOptions: unknown
  DefaultCharType: unknown
  DllDataFileName: unknown
  EnableErrorChecks: unknown
  EnvironmentVariables: unknown
  ErrorCheckAllocations: unknown
  ErrorCheckBounds: unknown
  ErrorCheckEnumRange: unknown
  ErrorCheckRefPointers: unknown
  ErrorCheckStubData: unknown
  ExcludedInputPaths: unknown
  GenerateClientFiles: unknown
  GenerateServerFiles: unknown
  GenerateStublessProxies: unknown
  GenerateTypeLibrary: unknown
  HeaderFileName: unknown
  IgnoreStandardIncludePath: unknown
  InterfaceIdentifierFileName: unknown
  LocaleID: unknown
  LogStandardErrorAsError: unknown
  MinimalRebuildFromTracking: unknown
  MkTypLibCompatible: unknown
  OutputDirectory: unknown
  PathOverride: unknown
  PreprocessorDefinitions: unknown
  ProxyFileName: unknown
  RedirectOutputAndErrors: unknown
  ServerStubFile: unknown
  SkippedExecution: unknown
  Source: unknown
  SourcesCompiled: unknown
  StandardErrorImportance: unknown
  StandardOutputImportance: unknown
  StructMemberAlignment: unknown
  SuppressCompilerWarnings: unknown
  SuppressStartupBanner: unknown
  TargetEnvironment: unknown
  Timeout: unknown
  TLogReadFiles: unknown
  TLogWriteFiles: unknown
  ToolExe: unknown
  ToolPath: unknown
  TrackedInputFilesToIgnore: unknown
  TrackedOutputFilesToIgnore: unknown
  TrackerLogDirectory: unknown
  TrackFileAccess: unknown
  TypeLibFormat: unknown
  TypeLibraryName: unknown
  UndefinePreprocessorDefinitions: unknown
  ValidateAllParameters: unknown
  WarnAsError: unknown
  WarningLevel: unknown
}
export interface MidlCommandFileProps {

}
export interface MinimalRebuildProps {

}
/**
 * Matches the expression "\d\.\d\.\d\.\d"
 */
export interface MinimumRequiredVersionProps {

}
export interface MinimumVisualStudioVersionProps {

}
export interface MkTypLibCompatibleProps {

}
export interface ModuleDefinitionFileProps {

}
export interface MoveProps extends TaskTypeProps {
  DestinationFiles: unknown
  DestinationFolder: unknown
  OverwriteReadOnlyFiles: unknown
  SourceFiles: unknown
}
export interface MSBuildProps extends TaskTypeProps {
  BuildInParallel: unknown
  Projects: unknown
  Properties: unknown
  RebaseOutputs: unknown
  RunEachTargetSeparately: unknown
  SkipNonexistentProjects: unknown
  SkipNonexistentTargets: unknown
  StopOnFirstFailure: unknown
  TargetAndPropertyListSeparators: unknown
  Targets: unknown
  ToolsVersion: unknown
  UnloadProjectsOnCompletion: unknown
  UseResultsCache: unknown
}
export interface MSBuildAllProjectsProps {

}
/**
 * Indicates whether to treat all warnings as errors when building a project.
 */
export interface MSBuildTreatWarningsAsErrorsProps {

}
/**
 * Indicates a semicolon delimited list of warnings to treat as errors when building a project.
 */
export interface MSBuildWarningsAsErrorsProps {

}
/**
 * Indicates a semicolon delimited list of warnings to treat as low importance messages when building a project.
 */
export interface MSBuildWarningsAsMessagesProps {

}
export interface MSDOSStubFileNameProps {

}
export interface MtProps extends TaskTypeProps {
  AcceptableNonZeroExitCodes: unknown
  ActiveToolSwitchesValues: unknown
  AdditionalManifestFiles: unknown
  AdditionalOptions: unknown
  AssemblyIdentity: unknown
  ComponentFileName: unknown
  EmbedManifest: unknown
  EnvironmentVariables: unknown
  ExcludedInputPaths: unknown
  GenerateCatalogFiles: unknown
  GenerateCategoryTags: unknown
  InputResourceManifests: unknown
  LogStandardErrorAsError: unknown
  ManifestFromManagedAssembly: unknown
  MinimalRebuildFromTracking: unknown
  OutputManifestFile: unknown
  OutputResourceManifests: unknown
  PathOverride: unknown
  RegistrarScriptFile: unknown
  ReplacementsFile: unknown
  ResourceOutputFileName: unknown
  SkippedExecution: unknown
  Sources: unknown
  SourcesCompiled: unknown
  StandardErrorImportance: unknown
  StandardOutputImportance: unknown
  SuppressDependencyElement: unknown
  SuppressStartupBanner: unknown
  Timeout: unknown
  TLogReadFiles: unknown
  TLogWriteFiles: unknown
  ToolExe: unknown
  ToolPath: unknown
  TrackedInputFilesToIgnore: unknown
  TrackedOutputFilesToIgnore: unknown
  TrackerLogDirectory: unknown
  TrackFileAccess: unknown
  TypeLibraryFile: unknown
  UpdateFileHashes: unknown
  UpdateFileHashesSearchPath: unknown
  VerboseOutput: unknown
}
export interface MultiProcessorCompilationProps {

}
export interface MyTypeProps {

}
/**
 * Reference to a native manifest file, or to a file that contains a native manifest
 */
export interface NativeReferenceProps extends SimpleItemTypeProps {
  /**
   * Reference full name
   */
  Include: string
}
/**
 * The locale ID for the NuGet package
 */
export interface NeutralLanguageProps {

}
export interface NoConfigProps {

}
/**
 * Files that should have no role in the build process
 */
export interface NoneProps extends SimpleItemTypeProps {

}
export interface NoStandardLibrariesProps {

}
/**
 * Whether standard libraries (such as mscorlib) should be referenced automatically (boolean)
 */
export interface NoStdLibProps {

}
/**
 * Comma separated list of disabled warnings
 */
export interface NoWarnProps {

}
/**
 * Set the nullable annotations and warnings context for the C# project. Possible values are enable, disable, warnings and annotations.
 */
export interface NullableProps {

}
export interface NullTerminateStringsProps {

}
export interface OldToolsVersionProps {

}
export interface OmitDefaultLibNameProps {

}
export interface OnErrorProps {
  /**
   * Optional expression evaluated to determine whether the targets should be executed
   */
  Condition: string
  /**
   * Semi-colon separated list of targets to execute
   */
  ExecuteTargets: unknown
  /**
   * Optional expression. Used to identify or order system and user elements
   */
  Label: string
}
/**
 * Specifies targets to execute in the event of a recoverable error
 */
interface OnErrorTypeProps {
  /**
   * Optional expression evaluated to determine whether the targets should be executed
   */
  Condition: string
  /**
   * Semi-colon separated list of targets to execute
   */
  ExecuteTargets: unknown
  /**
   * Optional expression. Used to identify or order system and user elements
   */
  Label: string
}
/**
 * boolean
 */
export interface OpenBrowserOnPublishProps {

}
export interface OpenMPSupportProps {

}
export interface OptimizationProps {

}
/**
 * Should compiler optimize output (boolean)
 */
export interface OptimizeProps {

}
export interface OptimizeReferencesProps {

}
/**
 * Option Compare setting (Text or Binary)
 */
export interface OptionCompareProps {

}
/**
 * Should Option Explicit be set (On or Off)
 */
export interface OptionExplicitProps {

}
/**
 * Should Option Infer be set (On or Off)
 */
export interface OptionInferProps {

}
/**
 * Should Option Strict be set (On or Off)
 */
export interface OptionStrictProps {

}
export interface OSVersionProps {

}
export interface OtherwiseProps {

}
/**
 * Groups PropertyGroup and/or ItemGroup elements that are used if no Conditions on sibling When elements evaluate to true
 */
interface OtherwiseTypeProps {

}
export interface OutDirProps {

}
/**
 * Optional element specifying a specific task output to be gathered
 */
export interface OutputProps {
  /**
   * Task parameter to gather. Matches the name of a .NET Property on the task class that has an [Output] attribute
   */
  TaskParameter: unknown
  /**
   * Optional name of an item list to put the gathered outputs into. Either ItemName or PropertyName must be specified
   */
  ItemName: unknown
  /**
   * Optional name of a property to put the gathered output into. Either PropertyName or ItemName must be specified
   */
  PropertyName: unknown
  /**
   * Optional expression evaluated to determine whether the output should be gathered
   */
  Condition: string
}
export interface OutputDirectoryProps {

}
export interface OutputFileProps {

}
export interface OutputManifestFileProps {

}
/**
 * Path to output folder, with trailing slash
 */
export interface OutputPathProps {

}
export interface OutputResourceManifestsProps {

}
export interface OutputsProps {

}
/**
 * Type of output to generate (WinExe, Exe, or Library)
 */
export interface OutputTypeProps {

}
/**
 * Overwrite Store Submission that has been queued by a previous build.
 */
export interface OverwritePendingSubmissionProps {

}
/**
 * App package certificate key file.
 */
export interface PackageCertificateKeyFileProps {

}
/**
 * The URL for a 64x64 image with transparent background to use as the icon for the NuGet package in UI display
 */
export interface PackageIconUrlProps {

}
/**
 * The case-insensitive NuGet package identifier, which must be unique across nuget.org or whatever gallery the NuGet package will reside in. IDs may not contain spaces or characters that are not valid for a URL, and generally follow .NET namespace rules.
 */
export interface PackageIdProps {

}
/**
 * The project license's SPDX identifier. Only OSI and FSF approved licenses can use an identifier. Other licenses should use PackageLicenseFile.
 */
export interface PackageLicenseExpressionProps {

}
/**
 * A path to the package's license file. Should only be used when the package doesn't use an OSI or FSF approved license.
 */
export interface PackageLicenseFileProps {

}
/**
 * Path to the output folder for the package generated when calling Pack.
 */
export interface PackageOutputPathProps {

}
/**
 * The URL for the NuGet package's home page, often shown in UI displays as well as nuget.org
 */
export interface PackageProjectUrlProps {

}
/**
 * Reference to a package
 */
export interface PackageReferenceProps extends SimpleItemTypeProps {
  /**
   * Name of the package
   */
  Include: string
  /**
   * Version of dependency
   */
  Version: string
  /**
   * Assets to include from this reference
   */
  IncludeAssets: string
  /**
   * Assets to exclude from this reference
   */
  ExcludeAssets: string
  /**
   * Assets that are private in this reference
   */
  PrivateAssets: string
  /**
   * Semicolon-separated list of warning codes to ignore (such as NU1605)
   */
  NoWarn: string
  /**
   * Set to true to generate a Pkg* property that points to the restored location of the NuGet package contents
   */
  GeneratePathProperty: string
  /**
   * When using Central Package Management (CPM), overrides the centrally defined version for this package.  If the project is not using CPM, this attribute has no effect.
   */
  VersionOverride: string
}
/**
 * A description of the changes made in this release of the NuGet package, often used in UI like the Updates tab of the Visual Studio Package Manager in place of the package description
 */
export interface PackageReleaseNotesProps {

}
/**
 * Value indicating whether the client must prompt the consumer to accept the NuGet package license before installing the package
 */
export interface PackageRequireLicenseAcceptanceProps {

}
/**
 * A space-delimited list of tags and keywords that describe the NuGet package and aid discoverability of NuGet packages through search and filtering mechanisms
 */
export interface PackageTagsProps {

}
/**
 * Allows packages using alternative monikers to be referenced in this project, which include older (e.g. dnxcore50, dotnet5.x) and Portable Class Library names.
 */
export interface PackageTargetFallbackProps {

}
/**
 * Indicates what the intended package use is, e.g. .NET CLI global tool, standard dependency, etc.
 */
export interface PackageTypeProps {

}
/**
 * Numeric value of the NuGet package version in the format major.minor.patch pattern (e.g. 1.0.1). Version numbers may include a pre-release suffix (e.g. 1.0.1-beta)
 */
export interface PackageVersionProps {

}
/**
 * Full path to a text file containing packaging directory writes log.
 */
export interface PackagingDirectoryWritesLogPathProps {

}
/**
 * Full path to a text file containing packaging file writes log.
 */
export interface PackagingFileWritesLogPathProps {

}
/**
 * Indicate whether the NuGet package should be configured as a .NET tool suitable for use with "dotnet tool install".
 */
export interface PackAsToolProps {

}
/**
 * XAML files that are converted to binary and compiled into the assembly
 */
export interface PageProps extends SimpleItemTypeProps {
  /**
   * Semi-colon separated list of XAML files (wildcards are allowed)
   */
  Include: string
  CopyToOutputDirectory: unknown
}
export interface ParameterGroupProps {

}
/**
 * Groups parameters that are part of an inline task definition.
 */
interface ParameterGroupTypeProps {

}
export interface ParsePlatformSpecificBundleArtifactsListsProps extends TaskTypeProps {
  Files: unknown
  Artifacts: unknown
}
/**
 * Full path to pdbcopy.exe utility.
 */
export interface PdbCopyExeFullPathProps {

}
export interface PlatformProps {

}
export interface PlatformFamilyNameProps {

}
export interface PlatformIDProps {

}
export interface PlatformNameProps {

}
/**
 * Full path to a folder where platform-specific bundle artifact list files are stored.
 */
export interface PlatformSpecificBundleArtifactsListDirProps {

}
/**
 * Name of the folder where platform-specific bundle artifact lists are stored.
 */
export interface PlatformSpecificBundleArtifactsListDirNameProps {

}
export interface PlatformTargetProps {

}
export interface PlatformToolsetProps {

}
/**
 * Platform version description. Used to map between internal OS version and marketing OS version.
 */
export interface PlatformVersionDescriptionProps extends SimpleItemTypeProps {

}
/**
 * Command line to be run at the end of build
 */
export interface PostBuildEventProps extends SimpleItemTypeProps {
  /**
   * Optional expression evaluated to determine whether the items should be evaluated
   */
  Condition: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to include in this item list
   */
  Include: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to exclude from the Include list
   */
  Exclude: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to remove from the existing list contents
   */
  Remove: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to be updated with the metadata from contained in this xml element
   */
  Update: string
  /**
   * Optional expression. Used to identify or order system and user elements
   */
  Label: string
}
interface PostBuildEventItemProps extends SimpleItemTypeProps {
  /**
   * Optional expression evaluated to determine whether the items should be evaluated
   */
  Condition: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to include in this item list
   */
  Include: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to exclude from the Include list
   */
  Exclude: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to remove from the existing list contents
   */
  Remove: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to be updated with the metadata from contained in this xml element
   */
  Update: string
  /**
   * Optional expression. Used to identify or order system and user elements
   */
  Label: string
}
/**
 * Command line to be run at the start of build
 */
export interface PreBuildEventProps extends SimpleItemTypeProps {
  /**
   * Optional expression evaluated to determine whether the items should be evaluated
   */
  Condition: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to include in this item list
   */
  Include: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to exclude from the Include list
   */
  Exclude: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to remove from the existing list contents
   */
  Remove: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to be updated with the metadata from contained in this xml element
   */
  Update: string
  /**
   * Optional expression. Used to identify or order system and user elements
   */
  Label: string
}
interface PreBuildEventItemProps extends SimpleItemTypeProps {
  /**
   * Optional expression evaluated to determine whether the items should be evaluated
   */
  Condition: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to include in this item list
   */
  Include: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to exclude from the Include list
   */
  Exclude: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to remove from the existing list contents
   */
  Remove: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to be updated with the metadata from contained in this xml element
   */
  Update: string
  /**
   * Optional expression. Used to identify or order system and user elements
   */
  Label: string
}
export interface PrecompiledHeaderProps {

}
export interface PrecompiledHeaderFileProps {

}
export interface Prefer32BitProps {

}
export interface PreferNativeArm64Props {

}
export interface PreLinkEventProps extends SimpleItemTypeProps {

}
export interface PreprocessorDefinitionsProps {

}
/**
 * Value indicating whether reference assemblies can be used in dynamic compilation
 */
export interface PreserveCompilationContextProps {

}
export interface PreventDllBindingProps {

}
/**
 * String resources to be indexed in app package's resource index.
 */
export interface PRIResourceProps extends SimpleItemTypeProps {

}
export interface ProduceReferenceAssemblyProps {

}
/**
 * Product name information for the assembly manifest
 */
export interface ProductProps {

}
export interface ProductNameProps {

}
export interface ProductVersionProps {

}
export interface ProfileProps {

}
export interface ProfileGuidedDatabaseProps {

}
export interface ProgramDatabaseFileProps {

}
/**
 * ProGuard configuration files to be used within a Xamarin.Android project.
 */
export interface ProguardConfigurationProps {

}
/**
 * An MSBuild Project
 */
export interface ProjectProps {
  /**
   * Optional semi-colon separated list of one or more targets that will be built if no targets are otherwise specified
   */
  DefaultTargets: string
  /**
   * Optional semi-colon separated list of targets that should always be built before any other targets
   */
  InitialTargets: string
  /**
   * Optional string describing the MSBuild SDK(s) this project should be built with
   */
  Sdk: string
  /**
   * Optional string describing the toolset version this project should normally be built with
   */
  ToolsVersion: string
}
/**
 * Project Capability that may activate design-time components in an IDE.
 */
export interface ProjectCapabilityProps {

}
export interface ProjectConfigurationProps extends SimpleItemTypeProps {

}
/**
 * Optional section used by MSBuild hosts, that may contain arbitrary XML content that is ignored by MSBuild itself
 */
interface ProjectExtensionsTypeProps {

}
export interface ProjectGuidProps {

}
export interface ProjectPriFileProps extends SimpleItemTypeProps {

}
/**
 * File name to use for project-specific resource index file (PRI).
 */
export interface ProjectPriFileNameProps {

}
/**
 * Full path to project-specific resource index file (PRI).
 */
export interface ProjectPriFullPathProps {

}
/**
 * Name of the resource index used in the generated .pri file.
 */
export interface ProjectPriIndexNameProps {

}
/**
 * Reference to another project
 */
export interface ProjectReferenceProps extends SimpleItemTypeProps {
  /**
   * Path to project file
   */
  Include: string
}
export interface ProjectTypeProps {

}
export interface ProjectTypeGuidsProps {

}
export interface PropertyProps {

}
/**
 * Groups property definitions
 */
interface PropertyGroupTypeProps {
  /**
   * Optional expression evaluated to determine whether the PropertyGroup should be used
   */
  Condition: string
  /**
   * Optional expression. Used to identify or order system and user elements
   */
  Label: string
}
export interface ProxyFileNameProps {

}
/**
 * Indicates whether the project should produce native ahead-of-time compiled images during publish.
 */
export interface PublishAotProps {

}
export interface PublisherNameProps {

}
export interface PublishFileProps extends SimpleItemTypeProps {

}
/**
 * Indicates whether the project should produce ReadyToRun images during publish.
 */
export interface PublishReadyToRunProps {

}
/**
 * Indicates whether the project should bundle all application-dependent files into a single binary during publish.
 */
export interface PublishSingleFileProps {

}
/**
 * Indicates whether the project should produce trimmed assembly images during publish.
 */
export interface PublishTrimmedProps {

}
export interface PublishUrlProps {

}
export interface RandomizedBaseAddressProps {

}
/**
 * Indicates whether Razor files should be compiled at build time.
 */
export interface RazorCompileOnBuildProps {

}
/**
 * Indicates whether Razor files should be compiled at publish time.
 */
export interface RazorCompileOnPublishProps {

}
/**
 * Directory for Razor output.
 */
export interface RazorOutputPathProps {

}
/**
 * File name (without extension) of the assembly produced by Razor.
 */
export interface RazorTargetNameProps {

}
export interface RCProps extends TaskTypeProps {
  AcceptableNonZeroExitCodes: unknown
  ActiveToolSwitchesValues: unknown
  AdditionalIncludeDirectories: unknown
  AdditionalOptions: unknown
  Culture: unknown
  EnvironmentVariables: unknown
  ExcludedInputPaths: unknown
  IgnoreStandardIncludePath: unknown
  LogStandardErrorAsError: unknown
  MinimalRebuildFromTracking: unknown
  NullTerminateStrings: unknown
  PathOverride: unknown
  PreprocessorDefinitions: unknown
  ResourceOutputFileName: unknown
  ShowProgress: unknown
  SkippedExecution: unknown
  Source: unknown
  SourcesCompiled: unknown
  StandardErrorImportance: unknown
  StandardOutputImportance: unknown
  Timeout: unknown
  TLogReadFiles: unknown
  TLogWriteFiles: unknown
  ToolExe: unknown
  ToolPath: unknown
  TrackedInputFilesToIgnore: unknown
  TrackedOutputFilesToIgnore: unknown
  TrackerLogDirectory: unknown
  TrackFileAccess: unknown
  UndefinePreprocessorDefinitions: unknown
}
export interface ReadLinesFromFileProps extends TaskTypeProps {
  File: unknown
  Lines: unknown
}
export interface RecursePathProps {

}
export interface RedirectOutputAndErrorsProps {

}
/**
 * Reference to an assembly
 */
export interface ReferenceProps extends SimpleItemTypeProps {
  /**
   * Assembly name or filename
   */
  Include: string
}
/**
 * Semi-colon separated list of folders to search during reference resolution
 */
export interface ReferencePathProps {

}
export interface RegisterAssemblyProps extends TaskTypeProps {
  Assemblies: unknown
  AssemblyListFile: unknown
  CreateCodeBase: unknown
  TypeLibFiles: unknown
}
export interface RegisterForComInteropProps {

}
export interface RegisterOutputProps {

}
export interface RegistrarScriptFileProps {

}
export interface RemoteDebugEnabledProps {

}
export interface RemoteDebugMachineProps {

}
export interface RemoveDirProps extends TaskTypeProps {
  Directories: unknown
  RemovedDirectories: unknown
}
export interface RemoveDuplicatePayloadProps extends TaskTypeProps {
  Inputs: unknown
  Platform: unknown
  Filtered: unknown
}
export interface RemoveDuplicatePriFilesProps extends TaskTypeProps {
  Inputs: unknown
  Platform: unknown
  Filtered: unknown
}
export interface RemoveDuplicatesProps extends TaskTypeProps {
  Filtered: unknown
  HadAnyDuplicates: unknown
  Inputs: unknown
}
export interface RemoveDuplicateSDKReferencesProps extends TaskTypeProps {
  Inputs: unknown
  Filtered: unknown
}
export interface RemoveIntegerChecksProps {

}
export interface ReplacementsFileProps {

}
export interface ReportAnalyzerProps {

}
/**
 * The type of the repository where the project is stored (e.g. git)
 */
export interface RepositoryTypeProps {

}
/**
 * The URL for the repository where the project is stored
 */
export interface RepositoryUrlProps {

}
export interface RequiresFramework35SP1AssemblyProps extends TaskTypeProps {
  Assemblies: unknown
  CreateDesktopShortcut: unknown
  DeploymentManifestEntryPoint: unknown
  EntryPoint: unknown
  ErrorReportUrl: unknown
  Files: unknown
  ReferencedAssemblies: unknown
  RequiresMinimumFramework35SP1: unknown
  SigningManifests: unknown
  SuiteName: unknown
  TargetFrameworkVersion: unknown
}
/**
 * Full path to a folder containing resgen tool.
 */
export interface ResgenToolPathProps {

}
export interface ResolveAssemblyReferenceProps extends TaskTypeProps {
  AllowedAssemblyExtensions: unknown
  AllowedGlobalAssemblyNamePrefix: unknown
  AllowedRelatedFileExtensions: unknown
  AppConfigFile: unknown
  Assemblies: unknown
  AssemblyFiles: unknown
  AutoUnify: unknown
  CandidateAssemblyFiles: unknown
  FilesWritten: unknown
  FindDependencies: unknown
  FindRelatedFiles: unknown
  FindSatellites: unknown
  FindSerializationAssemblies: unknown
  FullFrameworkAssemblyTables: unknown
  FullFrameworkFolders: unknown
  FullTargetFrameworkSubsetNames: unknown
  IgnoreDefaultInstalledAssemblySubsetTables: unknown
  IgnoreDefaultInstalledAssemblyTables: unknown
  InstalledAssemblySubsetTables: unknown
  InstalledAssemblyTables: unknown
  ProfileName: unknown
  PublicKeysRestrictedForGlobalLocation: unknown
  SearchPaths: unknown
  Silent: unknown
  StateFile: unknown
  TargetedRuntimeVersion: unknown
  TargetFrameworkDirectories: unknown
  TargetFrameworkMoniker: unknown
  TargetFrameworkMonikerDisplayName: unknown
  TargetFrameworkSubsets: unknown
  TargetFrameworkVersion: unknown
  TargetProcessorArchitecture: unknown
}
export interface ResolveComReferenceProps extends TaskTypeProps {
  DelaySign: unknown
  ExecuteAsTool: unknown
  IncludeVersionInInteropName: unknown
  KeyContainer: unknown
  KeyFile: unknown
  NoClassMembers: unknown
  ResolvedAssemblyReferences: unknown
  ResolvedFiles: unknown
  ResolvedModules: unknown
  SdkToolsPath: unknown
  StateFile: unknown
  TargetFrameworkVersion: unknown
  TargetProcessorArchitecture: unknown
  TypeLibFiles: unknown
  TypeLibNames: unknown
  WrapperOutputDirectory: unknown
}
export interface ResolveKeySourceProps extends TaskTypeProps {
  AutoClosePasswordPromptShow: unknown
  AutoClosePasswordPromptTimeout: unknown
  CertificateFile: unknown
  CertificateThumbprint: unknown
  KeyFile: unknown
  ResolvedKeyContainer: unknown
  ResolvedKeyFile: unknown
  ResolvedThumbprint: unknown
  ShowImportDialogDespitePreviousFailures: unknown
  SuppressAutoClosePasswordPrompt: unknown
}
export interface ResolveManifestFilesProps extends TaskTypeProps {
  DeploymentManifestEntryPoint: unknown
  EntryPoint: unknown
  ExtraFiles: unknown
  Files: unknown
  ManagedAssemblies: unknown
  NativeAssemblies: unknown
  OutputAssemblies: unknown
  OutputDeploymentManifestEntryPoint: unknown
  OutputEntryPoint: unknown
  OutputFiles: unknown
  PublishFiles: unknown
  SatelliteAssemblies: unknown
  SigningManifests: unknown
  TargetCulture: unknown
  TargetFrameworkVersion: unknown
}
export interface ResolveNativeReferenceProps extends TaskTypeProps {
  AdditionalSearchPaths: unknown
  ContainedComComponents: unknown
  ContainedLooseEtcFiles: unknown
  ContainedLooseTlbFiles: unknown
  ContainedPrerequisiteAssemblies: unknown
  ContainedTypeLibraries: unknown
  ContainingReferenceFiles: unknown
  NativeReferences: unknown
}
export interface ResolveNonMSBuildProjectOutputProps extends TaskTypeProps {
  PreresolvedProjectOutputs: unknown
  ProjectReferences: unknown
  ResolvedOutputPaths: unknown
  UnresolvedProjectReferences: unknown
}
/**
 * File that is compiled into the assembly
 */
export interface ResourceProps extends SimpleItemTypeProps {
  /**
   * Semi-colon separated list of files (wildcards are allowed)
   */
  Include: string
  CopyToOutputDirectory: unknown
}
export interface ResourceCompileProps extends SimpleItemTypeProps {
  /**
   * Optional expression evaluated to determine whether the items should be evaluated
   */
  Condition: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to include in this item list
   */
  Include: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to exclude from the Include list
   */
  Exclude: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to remove from the existing list contents
   */
  Remove: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to be updated with the metadata from contained in this xml element
   */
  Update: string
  /**
   * Optional expression. Used to identify or order system and user elements
   */
  Label: string
}
export interface ResourceOutputFileNameProps {

}
export interface ResponseFileProps {

}
/**
 * The feeds that NuGet will use for restoring packages for this project.
 */
export interface RestoreSourcesProps {

}
export interface RootNamespaceProps {

}
/**
 * Disables analyzers at both build and design time. This property takes precedence over RunAnalyzersDuringBuild and RunAnalyzersDuringLiveAnalysis. Default is true.
 */
export interface RunAnalyzersProps {

}
/**
 * Controls whether analyzers run at build time. Default is true.
 */
export interface RunAnalyzersDuringBuildProps {

}
/**
 * Controls whether analyzers analyze code live at design time. Default is true.
 */
export interface RunAnalyzersDuringLiveAnalysisProps {

}
/**
 * Indicates whether to run Code Analysis during the build.
 */
export interface RunCodeAnalysisProps {

}
export interface RunPostBuildEventProps {

}
/**
 * Runtime identifier supported by the project (e.g. win-x64)
 */
export interface RuntimeIdentifierProps {

}
/**
 * Semi-colon separated list of runtime identifiers supported by the project (e.g. win-x64;osx-x64;linux-x64)
 */
export interface RuntimeIdentifiersProps {

}
export interface RuntimeLibraryProps {

}
export interface RuntimeTypeInfoProps {

}
/**
 * Semi-colon separated list of culture names to preserve satellite resource assemblies during build and publish. Names must be a valid culture name (like en-US;it; or fr). If left empty, all satellite resource assemblies will be preserved. Defaults to empty.
 */
export interface SatelliteResourceLanguagesProps {

}
export interface SccLocalPathProps {

}
export interface SccProjectNameProps {

}
export interface SccProviderProps {

}
interface SchemaItemTypeProps extends SimpleItemTypeProps {
  /**
   * Optional expression evaluated to determine whether the items should be evaluated
   */
  Condition: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to include in this item list
   */
  Include: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to exclude from the Include list
   */
  Exclude: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to remove from the existing list contents
   */
  Remove: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to be updated with the metadata from contained in this xml element
   */
  Update: string
  /**
   * Optional expression. Used to identify or order system and user elements
   */
  Label: string
}
export interface SchemaVersionProps {

}
/**
 * Reference to an extension SDK
 */
export interface SDKReferenceProps extends SimpleItemTypeProps {
  /**
   * Name and version moniker representing an extension SDK
   */
  Include: string
}
export interface SectionAlignmentProps {

}
export interface SecureScopingProps {

}
/**
 * Indicates whether the runtime should enable the server garbage collection mode.
 */
export interface ServerGarbageCollectionProps {

}
export interface ServerStubFileProps {

}
export interface ServiceProps {
  /**
   * Optional expression evaluated to determine whether the items should be evaluated
   */
  Condition: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to include in this item list
   */
  Include: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to exclude from the Include list
   */
  Exclude: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to remove from the existing list contents
   */
  Remove: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to be updated with the metadata from contained in this xml element
   */
  Update: string
  /**
   * Optional expression. Used to identify or order system and user elements
   */
  Label: string
}
export interface SetEnvProps extends TaskTypeProps {
  Prefix: unknown
  Target: unknown
  Value: unknown
}
export interface SGenProps extends TaskTypeProps {
  BuildAssemblyName: unknown
  BuildAssemblyPath: unknown
  DelaySign: unknown
  EnvironmentVariables: unknown
  KeyContainer: unknown
  KeyFile: unknown
  LogStandardErrorAsError: unknown
  References: unknown
  SdkToolsPath: unknown
  SerializationAssembly: unknown
  ShouldGenerateSerializer: unknown
  StandardErrorImportance: unknown
  StandardOutputImportance: unknown
  Timeout: unknown
  ToolExe: unknown
  ToolPath: unknown
  UseProxyTypes: unknown
}
export interface ShowIncludesProps {

}
export interface ShowProgressProps {

}
export interface SignAppxPackageProps extends TaskTypeProps {
  AppxPackageToSign: unknown
  CertificateThumbprint: unknown
  CertificateFile: unknown
  HashAlgorithmId: unknown
  TargetPlatformIdentifier: unknown
  TargetPlatformVersion: unknown
  TargetPlatformSdkRootOverride: unknown
  SignAppxPackageExeFullPath: unknown
  MSBuildArchitecture: unknown
  EnableSigningChecks: unknown
  ExportCertificate: unknown
  ResolvedThumbprint: unknown
  AppxPackagePublicKeyFile: unknown
}
/**
 * Full path to signtool.exe utility.
 */
export interface SignAppxPackageExeFullPathProps {

}
export interface SignAssemblyProps {

}
export interface SignFileProps extends TaskTypeProps {
  CertificateThumbprint: unknown
  SigningTarget: unknown
  TimestampUrl: unknown
  TargetFrameworkIdentifier: unknown
  TargetFrameworkVersion: unknown
  DisallowMansignTimestampFallback: unknown
}
export interface SignManifestsProps {

}
interface SimpleItemTypeProps {
  /**
   * Optional expression evaluated to determine whether the items should be evaluated
   */
  Condition: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to include in this item list
   */
  Include: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to exclude from the Include list
   */
  Exclude: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to remove from the existing list contents
   */
  Remove: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to be updated with the metadata from contained in this xml element
   */
  Update: string
  /**
   * Optional expression. Used to identify or order system and user elements
   */
  Label: string
}
export interface SolutionDirProps {

}
export interface SolutionExtProps {

}
export interface SolutionFileNameProps {

}
export interface SolutionNameProps {

}
export interface SolutionPathProps {

}
export interface SpecifySectionAttributesProps {

}
export interface StackCommitSizeProps {

}
export interface StackReserveSizeProps {

}
export interface StartActionProps {

}
export interface StartArgumentsProps {

}
export interface StartPageProps {

}
export interface StartProgramProps {

}
/**
 * Type that contains the main entry point
 */
export interface StartupObjectProps {

}
export interface StartURLProps {

}
export interface StartWithIEProps {

}
export interface StartWorkingDirectoryProps {

}
/**
 * A file containing app store association data.
 */
export interface StoreAssociationFileProps extends SimpleItemTypeProps {

}
/**
 * Name of the store manifest file.
 */
export interface StoreManifestNameProps {

}
/**
 * Store manifest schema file.
 */
export interface StoreManifestSchemaProps extends SimpleItemTypeProps {

}
export interface StringPoolingProps {

}
interface StringPropertyTypeProps {

}
export interface StripPrivateSymbolsProps extends ToolTaskTypeProps {
  PdbCopyToolPath: unknown
  InputPdb: unknown
  StrippedPdb: unknown
}
export interface StructMemberAlignmentProps {

}
export interface SubSystemProps {

}
export interface SuiteNameProps {

}
export interface SupportNobindOfDelayLoadedDLLProps {

}
export interface SupportUnloadOfDelayLoadedDLLProps {

}
export interface SupportUrlProps {

}
export interface SuppressCompilerWarningsProps {

}
export interface SuppressDependencyElementProps {

}
export interface SuppressStartupBannerProps {

}
export interface SuppressXamlWarningsProps {

}
export interface SwapRunFromCDProps {

}
export interface SwapRunFromNETProps {

}
export interface TargetCultureProps {

}
export interface TargetEnvironmentProps {

}
export interface TargetExtProps {

}
/**
 * Framework that this project targets. Must be a Target Framework Moniker (e.g. net8.0)
 */
export interface TargetFrameworkProps {

}
export interface TargetFrameworkProfileProps {

}
/**
 * Semi-colon separated list of frameworks that this project targets. Must be a Target Framework Moniker (e.g. net8.0;net461)
 */
export interface TargetFrameworksProps {

}
export interface TargetFrameworkVersionProps {

}
export interface TargetMachineProps {

}
export interface TargetNameProps {

}
/**
 * Target platform in the form of "[Identifier], Version=[Version]", for example, "Windows, Version=8.0"
 */
export interface TargetPlatformProps {

}
export interface TargetPlatformIdentifierProps {

}
export interface TargetPlatformMinVersionProps {

}
/**
 * Full path to platform SDK root.
 */
export interface TargetPlatformSdkRootOverrideProps {

}
export interface TargetPlatformVersionProps {

}
/**
 * Groups tasks into a section of the build process
 */
interface TargetTypeProps {
  /**
   * Name of the target
   */
  Name: unknown
  /**
   * Optional semi-colon separated list of targets that should be run before this target
   */
  DependsOnTargets: string
  /**
   * Optional semi-colon separated list of files that form inputs into this target. Their timestamps will be compared with the timestamps of files in Outputs to determine whether the Target is up to date
   */
  Inputs: string
  /**
   * Optional semi-colon separated list of files that form outputs into this target. Their timestamps will be compared with the timestamps of files in Inputs to determine whether the Target is up to date
   */
  Outputs: string
  /**
   * Optional expression evaluated to determine whether the Target and the targets it depends on should be run
   */
  Condition: string
  /**
   * Optional expression evaluated to determine whether duplicate items in the Target's Returns should be removed before returning them. The default is not to eliminate duplicates.
   */
  KeepDuplicateOutputs: string
  /**
   * Optional expression evaluated to determine which items generated by the target should be returned by the target. If there are no Returns attributes on Targets in the file, the Outputs attributes are used instead for this purpose.
   */
  Returns: string
  /**
   * Optional semi-colon separated list of targets that this target should run before.
   */
  BeforeTargets: string
  /**
   * Optional semi-colon separated list of targets that this target should run after.
   */
  AfterTargets: string
  /**
   * Optional expression. Used to identify or order system and user elements
   */
  Label: string
}
export interface TargetZoneProps {

}
export interface TaskProps {
  /**
   * Optional expression evaluated to determine whether the task should be executed
   */
  Condition: string
  /**
   * Optional boolean indicating whether a recoverable task error should be ignored. Default false
   */
  ContinueOnError: unknown
  /**
   * Defines the bitness of the task if it must be run specifically in a 32bit or 64bit process. If not specified, it will run with the bitness of the build process.  If there are multiple tasks defined in UsingTask with the same name but with different Architecture attribute values, the value of the Architecture attribute specified here will be used to match and select the correct task
   */
  Architecture: unknown
  /**
   * Defines the .NET runtime of the task. This must be specified if the task must run on a specific version of the .NET runtime. If not specified, the task will run on the runtime being used by the build process. If there are multiple tasks defined in UsingTask with the same name but with different Runtime attribute values, the value of the Runtime attribute specified here will be used to match and select the correct task
   */
  Runtime: unknown
  /**
   * Whether the body should have properties expanded before use. Defaults to false.
   */
  Evaluate: unknown
}
interface TaskTypeProps {
  /**
   * Optional expression evaluated to determine whether the task should be executed
   */
  Condition: string
  /**
   * Optional boolean indicating whether a recoverable task error should be ignored. Default false
   */
  ContinueOnError: unknown
  /**
   * Defines the bitness of the task if it must be run specifically in a 32bit or 64bit process. If not specified, it will run with the bitness of the build process.  If there are multiple tasks defined in UsingTask with the same name but with different Architecture attribute values, the value of the Architecture attribute specified here will be used to match and select the correct task
   */
  Architecture: unknown
  /**
   * Defines the .NET runtime of the task. This must be specified if the task must run on a specific version of the .NET runtime. If not specified, the task will run on the runtime being used by the build process. If there are multiple tasks defined in UsingTask with the same name but with different Runtime attribute values, the value of the Runtime attribute specified here will be used to match and select the correct task
   */
  Runtime: unknown
}
export interface TelemetryProps extends TaskTypeProps {
  EventName: unknown
  EventData: unknown
}
export interface TerminalServerAwareProps {

}
/**
 * Controls the set of extensions that are enabled. Note that 'AllMicrosoft' enables all extensions, even those with a restrictive license.
 */
export interface TestingExtensionsProfileProps {

}
/**
 * This property controls whether all console output that a test executable writes is captured and hidden from the user when you use 'dotnet test' to run 'Microsoft.Testing.Platform' tests. By default, the console output is hidden. This is not supported by VSTest.
 */
export interface TestingPlatformCaptureOutputProps {

}
/**
 * The command-line arguments to pass for the test executable. This is not supported by VSTest.
 */
export interface TestingPlatformCommandLineArgumentsProps {

}
/**
 * This property controls whether VSTest is used when you use 'dotnet test' to run tests. If you set this property to 'true', VSTest is disabled and all 'Microsoft.Testing.Platform' tests are run directly. This is not supported by VSTest.
 */
export interface TestingPlatformDotnetTestSupportProps {

}
/**
 * This property controls whether a single failure or all errors in a failed test are reported when you use `dotnet test` to run tests. By default, test failures are summarized into a log file, and a single failure per test project is reported to MSBuild. To show errors per failed test, set this property to 'true'. This is not supported by VSTest.
 */
export interface TestingPlatformShowTestsFailureProps {

}
/**
 * Indicates whether the runtime should enable tiered JIT compilation.
 */
export interface TieredCompilationProps {

}
/**
 * A human-friendly title of the package, typically used in UI displays as on nuget.org and the Package Manager in Visual Studio. If not specified, the package ID is used instead.
 */
export interface TitleProps {

}
export interface TlbImpProps extends TaskTypeProps {
  AssemblyNamespace: unknown
  AssemblyVersion: unknown
  DelaySign: unknown
  EnvironmentVariables: unknown
  KeyContainer: unknown
  KeyFile: unknown
  LogStandardErrorAsError: unknown
  NoLogo: unknown
  OutputAssembly: unknown
  PreventClassMembers: unknown
  SafeArrayAsSystemArray: unknown
  SdkToolsPath: unknown
  Silent: unknown
  StandardErrorImportance: unknown
  StandardOutputImportance: unknown
  Timeout: unknown
  ToolExe: unknown
  ToolPath: unknown
  Transform: unknown
  TypeLibName: unknown
  Verbose: unknown
}
/**
 * Specifies the command that will invoke the tool after it's installed.
 */
export interface ToolCommandNameProps {

}
interface ToolTaskTypeProps extends TaskTypeProps {
  ExitCode: unknown
  YieldDuringToolExecution: unknown
  UseCommandProcessor: unknown
  EchoOff: unknown
  ToolExe: unknown
  ToolPath: unknown
  EnvironmentVariables: unknown
  Timeout: unknown
  StandardErrorImportance: unknown
  StandardOutputImportance: unknown
  LogStandardErrorAsError: unknown
  /**
   * Optional expression evaluated to determine whether the task should be executed
   */
  Condition: string
  /**
   * Optional boolean indicating whether a recoverable task error should be ignored. Default false
   */
  ContinueOnError: unknown
  /**
   * Defines the bitness of the task if it must be run specifically in a 32bit or 64bit process. If not specified, it will run with the bitness of the build process.  If there are multiple tasks defined in UsingTask with the same name but with different Architecture attribute values, the value of the Architecture attribute specified here will be used to match and select the correct task
   */
  Architecture: unknown
  /**
   * Defines the .NET runtime of the task. This must be specified if the task must run on a specific version of the .NET runtime. If not specified, the task will run on the runtime being used by the build process. If there are multiple tasks defined in UsingTask with the same name but with different Runtime attribute values, the value of the Runtime attribute specified here will be used to match and select the correct task
   */
  Runtime: unknown
}
export interface TouchProps extends TaskTypeProps {
  AlwaysCreate: unknown
  Files: unknown
  ForceTouch: unknown
  Time: unknown
  TouchedFiles: unknown
}
export interface TreatLinkerWarningAsErrorsProps {

}
export interface TreatSpecificWarningsAsErrorsProps {

}
export interface TreatWarningsAsErrorsProps {

}
/**
 * Assemblies that should not be trimmed (specify the assembly name without extension).
 */
export interface TrimmerRootAssemblyProps {

}
/**
 * XML files that specify assemblies, types, and their members that should not be trimmed.
 */
export interface TrimmerRootDescriptorProps {

}
/**
 * boolean
 */
export interface TrustUrlParametersProps {

}
export interface TypeComplianceDiagnosticsProps {

}
export interface TypeLibFormatProps {

}
export interface TypeLibraryFileProps {

}
export interface TypeLibraryNameProps {

}
export interface TypeLibraryResourceIDProps {

}
export interface UACExecutionLevelProps {

}
export interface UACUIAccessProps {

}
/**
 * Configures the created packages. Possible values are: StoreAndSideload (produces the appxupload and the sideloaded packages), StoreUpload (produces only the appxupload package), and SideloadOnly(produces only the packages for sideloading).
 */
export interface UapAppxPackageBuildModeProps {

}
export interface UICultureProps {

}
export interface UndefinePreprocessorDefinitionsProps {

}
export interface UnregisterAssemblyProps extends TaskTypeProps {
  Assemblies: unknown
  AssemblyListFile: unknown
  TypeLibFiles: unknown
}
export interface UnzipProps extends TaskTypeProps {
  DestinationFiles: unknown
  DestinationFolder: unknown
  OverwriteReadOnlyFiles: unknown
  SkipUnchangedFiles: unknown
  SourceFiles: unknown
  UnzippedFiles: unknown
}
export interface UpdateAppxManifestForBundleProps extends TaskTypeProps {
  FinalAppxManifest: unknown
  AppxManifestForBundle: unknown
}
/**
 * boolean
 */
export interface UpdateEnabledProps {

}
export interface UpdateFileHashesSearchPathProps {

}
export interface UpdateIntervalProps {

}
/**
 * Hours, Days, or Weeks
 */
export interface UpdateIntervalUnitsProps {

}
export interface UpdateMainPackageFileMapProps extends TaskTypeProps {
  Input: unknown
  Output: unknown
  SplitResourcesPriPath: unknown
  DefaultResourceLanguage: unknown
  DefaultResourceQualifiers: unknown
}
export interface UpdateManifestProps extends TaskTypeProps {
  ApplicationManifest: unknown
  TargetFrameworkVersion: unknown
  ApplicationPath: unknown
  InputManifest: unknown
  OutputManifest: unknown
}
/**
 * Foreground or Background
 */
export interface UpdateModeProps {

}
/**
 * boolean
 */
export interface UpdatePeriodicallyProps {

}
/**
 * boolean
 */
export interface UpdateRequiredProps {

}
export interface UpdateUrlProps {

}
export interface UpgradeBackupLocationProps {

}
/**
 * Defines an item to be considered an output of the project for the fast up-to-date check, with optional corresponding input via 'Original' metadata. When 'Original' metadata is specified, the input and output are considered in isolation. Useful when a single file will be copied (and potentially transformed in doing so) during build.
 */
export interface UpToDateCheckBuiltProps extends SimpleItemTypeProps {
  /**
   * Optional group(s) of inputs and outputs that should be considered in isolation during build. Useful when a build involves multiple discrete compilation/transpilation steps. Semicolon-delimited when multiple sets are required.
   */
  Set: unknown
  /**
   * Optional identifier for this item that allows it to be omitted from the fast up-to-date check via a global property.
   */
  Kind: unknown
  /**
   * Optional location of the input item that produces this output. Useful when a file is copied (and potentially transformed in doing so) during build. If multiple inputs and/or outputs are involved, use 'Set' metadata instead.
   */
  Original: unknown
}
/**
 * Defines an item to be considered an input to the project for the fast up-to-date check.
 */
export interface UpToDateCheckInputProps extends SimpleItemTypeProps {
  /**
   * Optional group(s) of inputs and outputs that should be considered in isolation during build. Useful when a build involves multiple discrete compilation/transpilation steps. Semicolon-delimited when multiple sets are required.
   */
  Set: unknown
  /**
   * Optional identifier for this item that allows it to be omitted from the fast up-to-date check via a global property.
   */
  Kind: unknown
}
/**
 * Defines an item to be considered an output of the project for the fast up-to-date check.
 */
export interface UpToDateCheckOutputProps extends SimpleItemTypeProps {
  /**
   * Optional group(s) of inputs and outputs that should be considered in isolation during build. Useful when a build involves multiple discrete compilation/transpilation steps. Semicolon-delimited when multiple sets are required.
   */
  Set: unknown
  /**
   * Optional identifier for this item that allows it to be omitted from the fast up-to-date check via a global property.
   */
  Kind: unknown
}
export interface UseAppConfigForCompilerProps {

}
export interface UseApplicationTrustProps {

}
/**
 * Use a centralized location for all outputs of this project. The location of the centralized outputs is set by the ArtifactsPath property. Project outputs are grouped by kind, then by project. See https://learn.microsoft.com/en-us/dotnet/core/sdk/artifacts-output for complete details.
 */
export interface UseArtifactsOutputProps {

}
export interface UseDebugLibrariesProps {

}
export interface UseFullPathsProps {

}
/**
 * Flag indicating whether to enable incremental registration of the app layout.
 */
export interface UseIncrementalAppxRegistrationProps {

}
export interface UseOfAtlProps {

}
export interface UseOfMfcProps {

}
/**
 * Indicates whether Razor code generation should use a persistent build server process.
 */
export interface UseRazorBuildServerProps {

}
/**
 * The ID that will be used to locate the file storing secret configuration values for this project at development time.
 */
export interface UserSecretsIdProps {

}
export interface UseUnicodeForAssemblerListingProps {

}
export interface UseVSHostingProcessProps {

}
/**
 * Set to 'true' to use VSTest. The default is 'false' which uses MSTest runner. This property is only applicable when using MSTest.Sdk.
 */
export interface UseVSTestProps {

}
export interface UseWindowsFormsProps {

}
export interface UseWPFProps {

}
/**
 * A C# global using to add to the project.
 */
export interface UsingProps extends SimpleItemTypeProps {
  /**
   * The namespace or type identifier to add, e.g. Microsoft.AspNetCore
   */
  Include: string
  /**
   * Optional alias for the namespace or type.
   */
  Alias: string
  /**
   * Determines whether the identifier should be registered as a static import.
   */
  Static: unknown
}
/**
 * Contains the inline task implementation. Content is opaque to MSBuild.
 */
interface UsingTaskBodyTypeProps {
  /**
   * Whether the body should have properties expanded before use. Defaults to false.
   */
  Evaluate: unknown
}
/**
 * Defines the assembly containing a task's implementation, or contains the implementation itself.
 */
interface UsingTaskTypeProps {
  /**
   * Optional expression evaluated to determine whether the declaration should be evaluated
   */
  Condition: string
  /**
   * Optional name of assembly containing the task. Either AssemblyName or AssemblyFile must be used
   */
  AssemblyName: unknown
  /**
   * Optional path to assembly containing the task. Either AssemblyName or AssemblyFile must be used
   */
  AssemblyFile: unknown
  /**
   * Name of task class in the assembly
   */
  TaskName: unknown
  /**
   * Name of the task factory class in the assembly
   */
  TaskFactory: unknown
  /**
   * Defines the architecture of the task host that this task should be run in.  Currently supported values:  x86, x64, CurrentArchitecture, and * (any).  If Architecture is not specified, either the task will be run within the MSBuild process, or the task host will be launched using the architecture of the parent MSBuild process
   */
  Architecture: unknown
  /**
   * Defines the .NET runtime version of the task host that this task should be run in.  Currently supported values:  CLR2, CLR4, NET, CurrentRuntime, and * (any).  If Runtime is not specified, either the task will be run within the MSBuild process, or the task host will be launched using the runtime of the parent MSBuild process
   */
  Runtime: unknown
}
export interface UTF8OutputProps {

}
export interface ValidateAllParametersProps {

}
export interface ValidateAppxManifestProps extends TaskTypeProps {
  Input: unknown
  SourceAppxManifest: unknown
  AppxManifestSchema: unknown
  StoreAssociationFile: unknown
  TargetPlatformIdentifier: unknown
  TargetPlatformVersion: unknown
  OSMinVersion: unknown
  OSMaxVersionTested: unknown
  PlatformVersionDescriptions: unknown
  ResolvedSDKReferences: unknown
  StrictManifestValidationEnabled: unknown
  ValidateWinmds: unknown
  NonFrameworkSdkReferences: unknown
  WinmdFiles: unknown
  SDKWinmdFiles: unknown
  ManagedWinmdInprocImplementation: unknown
  ValidateManifest: unknown
  Resources: unknown
}
export interface ValidateAppxManifestItemsProps extends TaskTypeProps {
  AppxManifestItems: unknown
  CustomAppxManifestItems: unknown
  AppxPackageProject: unknown
  IdentityName: unknown
  IdentityVersion: unknown
}
export interface ValidateAppxPackageProps extends TaskTypeProps {
  SourceAppxManifest: unknown
  AppxManifest: unknown
  StoreAssociationFile: unknown
  PackageArchitecture: unknown
  AppxPackagePayload: unknown
  QueryNamespacePrefix: unknown
  QueryNamespace81Prefix: unknown
  ManifestImageFileNameQueries: unknown
  ResolvedSDKReferences: unknown
  AllowDebugFrameworkReferencesInManifest: unknown
  ProjectDir: unknown
  IndexedPayloadFiles: unknown
  MakePriExtensionPath: unknown
  OSMinVersion: unknown
}
export interface ValidateStoreManifestProps extends TaskTypeProps {
  Input: unknown
  StoreManifestSchema: unknown
}
export interface VbcProps extends TaskTypeProps {
  AdditionalLibPaths: unknown
  AddModules: unknown
  BaseAddress: unknown
  CodePage: unknown
  DebugType: unknown
  DefineConstants: unknown
  DelaySign: unknown
  DisabledWarnings: unknown
  DocumentationFile: unknown
  EmitDebugInformation: unknown
  EnvironmentVariables: unknown
  ErrorReport: unknown
  FileAlignment: unknown
  GenerateDocumentation: unknown
  Imports: unknown
  KeyContainer: unknown
  KeyFile: unknown
  LangVersion: unknown
  VBRuntime: unknown
  LinkResources: unknown
  LogStandardErrorAsError: unknown
  MainEntryPoint: unknown
  ModuleAssemblyName: unknown
  NoConfig: unknown
  NoLogo: unknown
  NoStandardLib: unknown
  NoVBRuntimeReference: unknown
  NoWarnings: unknown
  NoWin32Manifest: unknown
  Optimize: unknown
  OptionCompare: unknown
  OptionExplicit: unknown
  OptionInfer: unknown
  OptionStrict: unknown
  OptionStrictType: unknown
  OutputAssembly: unknown
  Platform: unknown
  References: unknown
  RemoveIntegerChecks: unknown
  Resources: unknown
  ResponseFiles: unknown
  RootNamespace: unknown
  SdkPath: unknown
  Sources: unknown
  StandardErrorImportance: unknown
  StandardOutputImportance: unknown
  TargetCompactFramework: unknown
  TargetType: unknown
  Timeout: unknown
  ToolExe: unknown
  ToolPath: unknown
  TreatWarningsAsErrors: unknown
  UseHostCompilerIfAvailable: unknown
  Utf8Output: unknown
  Verbosity: unknown
  WarningsAsErrors: unknown
  WarningsNotAsErrors: unknown
  Win32Icon: unknown
  Win32Manifest: unknown
  Win32Resource: unknown
}
export interface VBRuntimeProps {

}
export interface VCBuildProps extends TaskTypeProps {
  AdditionalLibPaths: unknown
  AdditionalLinkLibraryPaths: unknown
  AdditionalOptions: unknown
  Clean: unknown
  Configuration: unknown
  Override: unknown
  Platform: unknown
  Projects: unknown
  Rebuild: unknown
  SolutionFile: unknown
  Timeout: unknown
  ToolPath: unknown
  UseEnvironment: unknown
  UserEnvironment: unknown
}
export interface VCMessageProps extends TaskTypeProps {
  Code: unknown
  Type: unknown
  Arguments: unknown
}
export interface VCTargetsPathProps {

}
export interface VerboseOutputProps {

}
export interface VerifyFileHashProps extends TaskTypeProps {
  File: unknown
  Hash: unknown
  HashEncoding: unknown
  Algorithm: unknown
}
/**
 * Numeric value of the version in the format major.minor.patch (e.g. 2.4.0)
 */
export interface VersionProps {

}
/**
 * When Version is not specified, VersionPrefix represents the first fragment of the version string (e.g. 1.0.0). The syntax is VersionPrefix[-VersionSuffix].
 */
export interface VersionPrefixProps {

}
/**
 * When Version is not specified, VersionSuffix represents the second fragment of the version string (e.g. beta). The syntax is VersionPrefix[-VersionSuffix].
 */
export interface VersionSuffixProps {

}
export interface VisualStudioVersionProps {

}
export interface VSINSTALLDIRProps {

}
export interface VSTO_TrustAssembliesLocationProps {

}
/**
 * Windows Application Packaging project-specific: Path to Windows Application Packaging project root folder.
 */
export interface WapProjPathProps {

}
export interface WarnAsErrorProps {

}
export interface WarningProps extends TaskTypeProps {
  Code: unknown
  File: unknown
  HelpKeyword: unknown
  Text: unknown
}
/**
 * integer between 0 and 5 inclusive
 */
export interface WarningLevelProps {

}
/**
 * Comma separated list of warning numbers to treat as errors
 */
export interface WarningsAsErrorsProps {

}
export interface WcfConfigValidationEnabledProps {

}
export interface WebPageProps {

}
/**
 * Name of Web References folder to display in user interface
 */
export interface WebReferencesProps {
  /**
   * Optional expression evaluated to determine whether the items should be evaluated
   */
  Condition: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to include in this item list
   */
  Include: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to exclude from the Include list
   */
  Exclude: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to remove from the existing list contents
   */
  Remove: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to be updated with the metadata from contained in this xml element
   */
  Update: string
  /**
   * Optional expression. Used to identify or order system and user elements
   */
  Label: string
}
/**
 * Represents a reference to a web service
 */
export interface WebReferenceUrlProps extends SimpleItemTypeProps {
  /**
   * URL to web service
   */
  Include: string
}
export interface WhenProps {
  /**
   * Optional expression evaluated to determine whether the child PropertyGroups and/or ItemGroups should be used
   */
  Condition: string
}
/**
 * Groups PropertyGroup and/or ItemGroup elements
 */
interface WhenTypeProps {
  /**
   * Optional expression evaluated to determine whether the child PropertyGroups and/or ItemGroups should be used
   */
  Condition: string
}
export interface WholeProgramOptimizationProps {

}
export interface Win32ResourceFileProps {

}
export interface WriteCodeFragmentProps extends TaskTypeProps {
  AssemblyAttributes: unknown
  Language: unknown
  OutputDirectory: unknown
  OutputFile: unknown
}
export interface WriteLinesToFileProps extends TaskTypeProps {
  Encoding: unknown
  File: unknown
  Lines: unknown
  Overwrite: unknown
  WriteOnlyWhenDifferent: unknown
}
export interface WsdlXsdCodeGenCollectionTypesProps {

}
export interface WsdlXsdCodeGenEnabledProps {

}
export interface WsdlXsdCodeGenEnableDataBindingProps {

}
export interface WsdlXsdCodeGenGenerateAsynchronousOperationsProps {

}
export interface WsdlXsdCodeGenGenerateDataTypesOnlyProps {

}
export interface WsdlXsdCodeGenGenerateInternalTypesProps {

}
export interface WsdlXsdCodeGenGenerateMessageContractProps {

}
export interface WsdlXsdCodeGenGenerateSerializableTypesProps {

}
export interface WsdlXsdCodeGenImportXmlTypesProps {

}
export interface WsdlXsdCodeGenNamespaceMappingsProps {

}
export interface WsdlXsdCodeGenReuseTypesFlagProps {

}
export interface WsdlXsdCodeGenReuseTypesModeProps {

}
export interface WsdlXsdCodeGenSerializerModeProps {

}
export interface WsdlXsdCodeGenUseSerializerForFaultsProps {

}
export interface WsdlXsdCodeGenWrappedProps {

}
export interface XamlRootsLogProps {

}
export interface XamlSavedStateFilePathProps {

}
export interface XdcmakeProps extends SimpleItemTypeProps {

}
export interface XDCMakeProps extends TaskTypeProps {
  AcceptableNonZeroExitCodes: unknown
  ActiveToolSwitchesValues: unknown
  AdditionalDocumentFile: unknown
  AdditionalOptions: unknown
  DocumentLibraryDependencies: unknown
  EnvironmentVariables: unknown
  ExcludedInputPaths: unknown
  LogStandardErrorAsError: unknown
  MinimalRebuildFromTracking: unknown
  OutputFile: unknown
  PathOverride: unknown
  ProjectName: unknown
  SkippedExecution: unknown
  SlashOld: unknown
  Sources: unknown
  SourcesCompiled: unknown
  StandardErrorImportance: unknown
  StandardOutputImportance: unknown
  SuppressStartupBanner: unknown
  Timeout: unknown
  TLogReadFiles: unknown
  TLogWriteFiles: unknown
  ToolExe: unknown
  ToolPath: unknown
  TrackedInputFilesToIgnore: unknown
  TrackedOutputFilesToIgnore: unknown
  TrackerLogDirectory: unknown
  TrackFileAccess: unknown
}
export interface XSDProps extends TaskTypeProps {
  AcceptableNonZeroExitCodes: unknown
  ActiveToolSwitchesValues: unknown
  AdditionalOptions: unknown
  EnvironmentVariables: unknown
  ExcludedInputPaths: unknown
  GenerateFromSchema: unknown
  Language: unknown
  LogStandardErrorAsError: unknown
  MinimalRebuildFromTracking: unknown
  Namespace: unknown
  PathOverride: unknown
  SkippedExecution: unknown
  Sources: unknown
  SourcesCompiled: unknown
  StandardErrorImportance: unknown
  StandardOutputImportance: unknown
  SuppressStartupBanner: unknown
  Timeout: unknown
  TLogReadFiles: unknown
  TLogWriteFiles: unknown
  ToolExe: unknown
  ToolPath: unknown
  TrackedInputFilesToIgnore: unknown
  TrackedOutputFilesToIgnore: unknown
  TrackerLogDirectory: unknown
  TrackFileAccess: unknown
}
export interface XslTransformationProps extends TaskTypeProps {
  OutputPaths: unknown
  Parameters: unknown
  XmlContent: unknown
  XmlInputPaths: unknown
  XslCompiledDllPath: unknown
  XslContent: unknown
  XslInputPath: unknown
}
export interface ZipDirectoryProps extends TaskTypeProps {
  /**
   * Specify the compression level to apply. Possible values are Optimal, Fastest, NoCompression and SmallestSize. In the .NET Framework version of MSBuild, the SmallestSize option is unavailable. Using it will on .NET Framework will log warning MSB3945 and use the default compression level instead.
   */
  CompressionLevel: unknown
  DestinationFile: unknown
  Overwrite: unknown
  SourceDirectory: unknown
}
