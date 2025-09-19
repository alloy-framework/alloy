import "@alloy-js/core";import { makeTag } from "./utils/make-tag.js";
export interface _AppxBundleResourceFileMapsIntermediateProps extends SimpleItemTypeProps {

}

export const _AppxBundleResourceFileMapsIntermediate = makeTag<_AppxBundleResourceFileMapsIntermediateProps>("_AppxBundleResourceFileMapsIntermediate")

export interface _GetResolvedSDKReferencesOutputProps extends SimpleItemTypeProps {

}

export const _GetResolvedSDKReferencesOutput = makeTag<_GetResolvedSDKReferencesOutputProps>("_GetResolvedSDKReferencesOutput")

export interface _PackagingOutputsUnexpandedProps extends SimpleItemTypeProps {

}

export const _PackagingOutputsUnexpanded = makeTag<_PackagingOutputsUnexpandedProps>("_PackagingOutputsUnexpanded")

export interface _ProjectArchitectureFromPayloadProps extends SimpleItemTypeProps {

}

export const _ProjectArchitectureFromPayload = makeTag<_ProjectArchitectureFromPayloadProps>("_ProjectArchitectureFromPayload")

export interface _ProjectArchitectureItemProps extends SimpleItemTypeProps {

}

export const _ProjectArchitectureItem = makeTag<_ProjectArchitectureItemProps>("_ProjectArchitectureItem")

export interface _StoreManifestSchemaDirProps extends StringPropertyTypeProps {

}

export const _StoreManifestSchemaDir = makeTag<_StoreManifestSchemaDirProps>("_StoreManifestSchemaDir")

/**
 * Indicates whether to enable acceleration when building in Visual Studio (boolean).
 */
export interface AccelerateBuildsInVisualStudioProps {

}

/**
 * Indicates whether to enable acceleration when building in Visual Studio (boolean).
 */
export const AccelerateBuildsInVisualStudio = makeTag<AccelerateBuildsInVisualStudioProps>("AccelerateBuildsInVisualStudio")

export interface AdditionalDependenciesProps {

}

export const AdditionalDependencies = makeTag<AdditionalDependenciesProps>("AdditionalDependencies")

export interface AdditionalFileItemNamesProps extends StringPropertyTypeProps {

}

export const AdditionalFileItemNames = makeTag<AdditionalFileItemNamesProps>("AdditionalFileItemNames")

export interface AdditionalIncludeDirectoriesProps {

}

export const AdditionalIncludeDirectories = makeTag<AdditionalIncludeDirectoriesProps>("AdditionalIncludeDirectories")

export interface AdditionalLibraryDirectoriesProps {

}

export const AdditionalLibraryDirectories = makeTag<AdditionalLibraryDirectoriesProps>("AdditionalLibraryDirectories")

export interface AdditionalManifestDependenciesProps {

}

export const AdditionalManifestDependencies = makeTag<AdditionalManifestDependenciesProps>("AdditionalManifestDependencies")

export interface AdditionalManifestFilesProps {

}

export const AdditionalManifestFiles = makeTag<AdditionalManifestFilesProps>("AdditionalManifestFiles")

export interface AdditionalOptionsProps {

}

export const AdditionalOptions = makeTag<AdditionalOptionsProps>("AdditionalOptions")

export interface AdditionalUsingDirectoriesProps {

}

export const AdditionalUsingDirectories = makeTag<AdditionalUsingDirectoriesProps>("AdditionalUsingDirectories")

export interface AddModuleNamesToAssemblyProps {

}

export const AddModuleNamesToAssembly = makeTag<AddModuleNamesToAssemblyProps>("AddModuleNamesToAssembly")

export interface ALProps extends TaskTypeProps {
  AlgorithmId?: unknown
  BaseAddress?: unknown
  CompanyName?: unknown
  Configuration?: unknown
  Copyright?: unknown
  Culture?: unknown
  DelaySign?: boolean
  Description?: unknown
  EmbedResources?: unknown
  EnvironmentVariables?: unknown
  EvidenceFile?: unknown
  FileVersion?: unknown
  Flags?: unknown
  GenerateFullPaths?: boolean
  KeyContainer?: unknown
  KeyFile?: unknown
  LinkResources?: unknown
  LogStandardErrorAsError?: boolean
  MainEntryPoint?: unknown
  OutputAssembly: unknown
  Platform?: unknown
  ProductName?: unknown
  ProductVersion?: unknown
  ResponseFiles?: unknown
  SdkToolsPath?: unknown
  SourceModules?: unknown
  StandardErrorImportance?: unknown
  StandardOutputImportance?: unknown
  TargetType?: unknown
  TemplateFile?: unknown
  Timeout?: unknown
  Title?: unknown
  ToolExe?: unknown
  ToolPath?: unknown
  Trademark?: unknown
  Version?: unknown
  Win32Icon?: unknown
  Win32Resource?: unknown
}

export const AL = makeTag<ALProps>("AL")

export interface AllowIsolationProps {

}

export const AllowIsolation = makeTag<AllowIsolationProps>("AllowIsolation")

/**
 * Flag indicating whether to allow local network loopback.
 */
export interface AllowLocalNetworkLoopbackProps extends StringPropertyTypeProps {

}

/**
 * Flag indicating whether to allow local network loopback.
 */
export const AllowLocalNetworkLoopback = makeTag<AllowLocalNetworkLoopbackProps>("AllowLocalNetworkLoopback")

export interface AllowUnsafeBlocksProps extends StringPropertyTypeProps {

}

export const AllowUnsafeBlocks = makeTag<AllowUnsafeBlocksProps>("AllowUnsafeBlocks")

/**
 * Customizes the set of rules that are enabled by default.
 */
export interface AnalysisLevelProps {

}

/**
 * Customizes the set of rules that are enabled by default.
 */
export const AnalysisLevel = makeTag<AnalysisLevelProps>("AnalysisLevel")

/**
 * Customizes the set of rules that are enabled by default.
 */
export interface AnalysisModeProps {

}

/**
 * Customizes the set of rules that are enabled by default.
 */
export const AnalysisMode = makeTag<AnalysisModeProps>("AnalysisMode")

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
 * An assembly containing diagnostic analyzers
 */
export const Analyzer = makeTag<AnalyzerProps>("Analyzer")

/**
 * Used by Xamarin.Android projects. A boolean value that indicates whether the project is for an Android Application (True) or for an Android Library Project (False or not present).
 */
export interface AndroidApplicationProps {

}

/**
 * Used by Xamarin.Android projects. A boolean value that indicates whether the project is for an Android Application (True) or for an Android Library Project (False or not present).
 */
export const AndroidApplication = makeTag<AndroidApplicationProps>("AndroidApplication")

/**
 * Used by Xamarin.Android projects. A string property that indicates which Android dex compiler is used during the Xamarin.Android build process.
 */
export interface AndroidDexToolProps {

}

/**
 * Used by Xamarin.Android projects. A string property that indicates which Android dex compiler is used during the Xamarin.Android build process.
 */
export const AndroidDexTool = makeTag<AndroidDexToolProps>("AndroidDexTool")

/**
 * Used by Xamarin.Android projects. A boolean property that determines whether or not AOT profiles are used during Ahead-of-Time compilation.
 */
export interface AndroidEnableProfiledAotProps {

}

/**
 * Used by Xamarin.Android projects. A boolean property that determines whether or not AOT profiles are used during Ahead-of-Time compilation.
 */
export const AndroidEnableProfiledAot = makeTag<AndroidEnableProfiledAotProps>("AndroidEnableProfiledAot")

/**
 * Used by Xamarin.Android projects. A string property that specifies which type of linking should be performed on assemblies contained within the Android package. Only used in Android Application projects.
 */
export interface AndroidLinkModeProps {

}

/**
 * Used by Xamarin.Android projects. A string property that specifies which type of linking should be performed on assemblies contained within the Android package. Only used in Android Application projects.
 */
export const AndroidLinkMode = makeTag<AndroidLinkModeProps>("AndroidLinkMode")

/**
 * Used by Xamarin.Android projects. Specifies a semicolon-delimited (;) list of assembly names, without file extensions, of assemblies that should not be linked.
 */
export interface AndroidLinkSkipProps extends StringPropertyTypeProps {

}

/**
 * Used by Xamarin.Android projects. Specifies a semicolon-delimited (;) list of assembly names, without file extensions, of assemblies that should not be linked.
 */
export const AndroidLinkSkip = makeTag<AndroidLinkSkipProps>("AndroidLinkSkip")

/**
 * Used by Xamarin.Android projects. A string property that indicates which code shrinker is used for Java code.
 */
export interface AndroidLinkToolProps {

}

/**
 * Used by Xamarin.Android projects. A string property that indicates which code shrinker is used for Java code.
 */
export const AndroidLinkTool = makeTag<AndroidLinkToolProps>("AndroidLinkTool")

/**
 * Used by Xamarin.Android projects. A string property that indicates if you want to package the Android application as an APK file or Android App Bundle.
 */
export interface AndroidPackageFormatProps {

}

/**
 * Used by Xamarin.Android projects. A string property that indicates if you want to package the Android application as an APK file or Android App Bundle.
 */
export const AndroidPackageFormat = makeTag<AndroidPackageFormatProps>("AndroidPackageFormat")

/**
 * Android resource files to be used within a Xamarin.Android project.
 */
export interface AndroidResourceProps {

}

/**
 * Android resource files to be used within a Xamarin.Android project.
 */
export const AndroidResource = makeTag<AndroidResourceProps>("AndroidResource")

/**
 * Used by Xamarin.Android projects. A string property that contains a semicolon (;)-delimited list of ABIs which should be included into the application.
 */
export interface AndroidSupportedAbisProps extends StringPropertyTypeProps {

}

/**
 * Used by Xamarin.Android projects. A string property that contains a semicolon (;)-delimited list of ABIs which should be included into the application.
 */
export const AndroidSupportedAbis = makeTag<AndroidSupportedAbisProps>("AndroidSupportedAbis")

/**
 * Used by Xamarin.Android projects. A boolean property that determines whether or not assemblies will be Ahead-of-Time compiled into native code.
 */
export interface AotAssembliesProps {

}

/**
 * Used by Xamarin.Android projects. A boolean property that determines whether or not assemblies will be Ahead-of-Time compiled into native code.
 */
export const AotAssemblies = makeTag<AotAssembliesProps>("AotAssemblies")

export interface AppConfigForCompilerProps extends StringPropertyTypeProps {

}

export const AppConfigForCompiler = makeTag<AppConfigForCompilerProps>("AppConfigForCompiler")

/**
 * Name of folder for Application Designer
 */
export interface AppDesignerFolderProps extends StringPropertyTypeProps {

}

/**
 * Name of folder for Application Designer
 */
export const AppDesignerFolder = makeTag<AppDesignerFolderProps>("AppDesignerFolder")

export interface ApplicationConfigurationModeProps {

}

export const ApplicationConfigurationMode = makeTag<ApplicationConfigurationModeProps>("ApplicationConfigurationMode")

/**
 * Customizes the application default font. The format equivalent to the output of FontConverter.ConvertToInvariantString(). Applies only to Windows Forms projects.
 */
export interface ApplicationDefaultFontProps extends StringPropertyTypeProps {

}

/**
 * Customizes the application default font. The format equivalent to the output of FontConverter.ConvertToInvariantString(). Applies only to Windows Forms projects.
 */
export const ApplicationDefaultFont = makeTag<ApplicationDefaultFontProps>("ApplicationDefaultFont")

/**
 * XAML file that contains the application definition, only one can be defined
 */
export interface ApplicationDefinitionProps extends SimpleItemTypeProps {
  CopyToOutputDirectory?: unknown
}

/**
 * XAML file that contains the application definition, only one can be defined
 */
export const ApplicationDefinition = makeTag<ApplicationDefinitionProps>("ApplicationDefinition")

/**
 * Customizes the application DPI awareness mode. Applies only to Windows Forms projects.
 */
export interface ApplicationHighDpiModeProps {

}

/**
 * Customizes the application DPI awareness mode. Applies only to Windows Forms projects.
 */
export const ApplicationHighDpiMode = makeTag<ApplicationHighDpiModeProps>("ApplicationHighDpiMode")

export interface ApplicationIconProps extends StringPropertyTypeProps {

}

export const ApplicationIcon = makeTag<ApplicationIconProps>("ApplicationIcon")

/**
 * integer
 */
export interface ApplicationRevisionProps extends StringPropertyTypeProps {

}

/**
 * integer
 */
export const ApplicationRevision = makeTag<ApplicationRevisionProps>("ApplicationRevision")

/**
 * Indicates whether to set UseCompatibleTextRendering property defined on certain controls (boolean). Applies only to Windows Forms projects.
 */
export interface ApplicationUseCompatibleTextRenderingProps {

}

/**
 * Indicates whether to set UseCompatibleTextRendering property defined on certain controls (boolean). Applies only to Windows Forms projects.
 */
export const ApplicationUseCompatibleTextRendering = makeTag<ApplicationUseCompatibleTextRenderingProps>("ApplicationUseCompatibleTextRendering")

/**
 * Matches the expression "\d\.\d\.\d\.(\d|\*)"
 */
export interface ApplicationVersionProps extends StringPropertyTypeProps {

}

/**
 * Matches the expression "\d\.\d\.\d\.(\d|\*)"
 */
export const ApplicationVersion = makeTag<ApplicationVersionProps>("ApplicationVersion")

/**
 * Indicates whether to enable or disable visual styles (boolean). Applies only to Windows Forms projects.
 */
export interface ApplicationVisualStylesProps {

}

/**
 * Indicates whether to enable or disable visual styles (boolean). Applies only to Windows Forms projects.
 */
export const ApplicationVisualStyles = makeTag<ApplicationVisualStylesProps>("ApplicationVisualStyles")

/**
 * Flag indicating whether to auto-increment package revision.
 */
export interface AppxAutoIncrementPackageRevisionProps extends StringPropertyTypeProps {

}

/**
 * Flag indicating whether to auto-increment package revision.
 */
export const AppxAutoIncrementPackageRevision = makeTag<AppxAutoIncrementPackageRevisionProps>("AppxAutoIncrementPackageRevision")

/**
 * Flag indicating whether packaging targets will produce an app bundle.
 */
export interface AppxBundleProps extends StringPropertyTypeProps {

}

/**
 * Flag indicating whether packaging targets will produce an app bundle.
 */
export const AppxBundle = makeTag<AppxBundleProps>("AppxBundle")

/**
 * '|'-delimited list of resource qualifiers which will be used for automatic resource pack splitting.
 */
export interface AppxBundleAutoResourcePackageQualifiersProps extends StringPropertyTypeProps {

}

/**
 * '|'-delimited list of resource qualifiers which will be used for automatic resource pack splitting.
 */
export const AppxBundleAutoResourcePackageQualifiers = makeTag<AppxBundleAutoResourcePackageQualifiersProps>("AppxBundleAutoResourcePackageQualifiers")

/**
 * Full path to a folder where app bundle will be produced.
 */
export interface AppxBundleDirProps extends StringPropertyTypeProps {

}

/**
 * Full path to a folder where app bundle will be produced.
 */
export const AppxBundleDir = makeTag<AppxBundleDirProps>("AppxBundleDir")

/**
 * Suffix to append to app bundle folder.
 */
export interface AppxBundleFolderSuffixProps extends StringPropertyTypeProps {

}

/**
 * Suffix to append to app bundle folder.
 */
export const AppxBundleFolderSuffix = makeTag<AppxBundleFolderSuffixProps>("AppxBundleFolderSuffix")

/**
 * Full path to a log file containing a list of generated files during generation of main package file map.
 */
export interface AppxBundleMainPackageFileMapGeneratedFilesListPathProps extends StringPropertyTypeProps {

}

/**
 * Full path to a log file containing a list of generated files during generation of main package file map.
 */
export const AppxBundleMainPackageFileMapGeneratedFilesListPath = makeTag<AppxBundleMainPackageFileMapGeneratedFilesListPathProps>("AppxBundleMainPackageFileMapGeneratedFilesListPath")

/**
 * Full path to an intermediate main package file map.
 */
export interface AppxBundleMainPackageFileMapIntermediatePathProps extends StringPropertyTypeProps {

}

/**
 * Full path to an intermediate main package file map.
 */
export const AppxBundleMainPackageFileMapIntermediatePath = makeTag<AppxBundleMainPackageFileMapIntermediatePathProps>("AppxBundleMainPackageFileMapIntermediatePath")

/**
 * Prefix used for intermediate main package resources .pri and .map.txt files.
 */
export interface AppxBundleMainPackageFileMapIntermediatePrefixProps extends StringPropertyTypeProps {

}

/**
 * Prefix used for intermediate main package resources .pri and .map.txt files.
 */
export const AppxBundleMainPackageFileMapIntermediatePrefix = makeTag<AppxBundleMainPackageFileMapIntermediatePrefixProps>("AppxBundleMainPackageFileMapIntermediatePrefix")

/**
 * Full path to an intermediate main package .pri file.
 */
export interface AppxBundleMainPackageFileMapIntermediatePriPathProps extends StringPropertyTypeProps {

}

/**
 * Full path to an intermediate main package .pri file.
 */
export const AppxBundleMainPackageFileMapIntermediatePriPath = makeTag<AppxBundleMainPackageFileMapIntermediatePriPathProps>("AppxBundleMainPackageFileMapIntermediatePriPath")

/**
 * Full path to a main package file map.
 */
export interface AppxBundleMainPackageFileMapPathProps extends StringPropertyTypeProps {

}

/**
 * Full path to a main package file map.
 */
export const AppxBundleMainPackageFileMapPath = makeTag<AppxBundleMainPackageFileMapPathProps>("AppxBundleMainPackageFileMapPath")

/**
 * Prefix used for main package resources .pri and .map.txt files.
 */
export interface AppxBundleMainPackageFileMapPrefixProps extends StringPropertyTypeProps {

}

/**
 * Prefix used for main package resources .pri and .map.txt files.
 */
export const AppxBundleMainPackageFileMapPrefix = makeTag<AppxBundleMainPackageFileMapPrefixProps>("AppxBundleMainPackageFileMapPrefix")

/**
 * Suffix used before extension of resource map files.
 */
export interface AppxBundleMainPackageFileMapSuffixProps extends StringPropertyTypeProps {

}

/**
 * Suffix used before extension of resource map files.
 */
export const AppxBundleMainPackageFileMapSuffix = makeTag<AppxBundleMainPackageFileMapSuffixProps>("AppxBundleMainPackageFileMapSuffix")

/**
 * '|'-delimited list of platforms which will be included in an app bundle.
 */
export interface AppxBundlePlatformsProps extends StringPropertyTypeProps {

}

/**
 * '|'-delimited list of platforms which will be included in an app bundle.
 */
export const AppxBundlePlatforms = makeTag<AppxBundlePlatformsProps>("AppxBundlePlatforms")

/**
 * Full path to the priconfig.xml file used for generating main package file map.
 */
export interface AppxBundlePriConfigXmlForMainPackageFileMapFileNameProps extends StringPropertyTypeProps {

}

/**
 * Full path to the priconfig.xml file used for generating main package file map.
 */
export const AppxBundlePriConfigXmlForMainPackageFileMapFileName = makeTag<AppxBundlePriConfigXmlForMainPackageFileMapFileNameProps>("AppxBundlePriConfigXmlForMainPackageFileMapFileName")

/**
 * Full path to the priconfig.xml file used for splitting resource packs.
 */
export interface AppxBundlePriConfigXmlForSplittingFileNameProps extends StringPropertyTypeProps {

}

/**
 * Full path to the priconfig.xml file used for splitting resource packs.
 */
export const AppxBundlePriConfigXmlForSplittingFileName = makeTag<AppxBundlePriConfigXmlForSplittingFileNameProps>("AppxBundlePriConfigXmlForSplittingFileName")

/**
 * A platform which will be used to produce an app bundle.
 */
export interface AppxBundleProducingPlatformProps extends StringPropertyTypeProps {

}

/**
 * A platform which will be used to produce an app bundle.
 */
export const AppxBundleProducingPlatform = makeTag<AppxBundleProducingPlatformProps>("AppxBundleProducingPlatform")

/**
 * A platform which will be used to produce resource packs for an app bundle.
 */
export interface AppxBundleResourcePacksProducingPlatformProps extends StringPropertyTypeProps {

}

/**
 * A platform which will be used to produce resource packs for an app bundle.
 */
export const AppxBundleResourcePacksProducingPlatform = makeTag<AppxBundleResourcePacksProducingPlatformProps>("AppxBundleResourcePacksProducingPlatform")

/**
 * Full path to a log file containing a list of generated files during resource splitting.
 */
export interface AppxBundleSplitResourcesGeneratedFilesListPathProps extends StringPropertyTypeProps {

}

/**
 * Full path to a log file containing a list of generated files during resource splitting.
 */
export const AppxBundleSplitResourcesGeneratedFilesListPath = makeTag<AppxBundleSplitResourcesGeneratedFilesListPathProps>("AppxBundleSplitResourcesGeneratedFilesListPath")

/**
 * Full path to split resources .pri file.
 */
export interface AppxBundleSplitResourcesPriPathProps extends StringPropertyTypeProps {

}

/**
 * Full path to split resources .pri file.
 */
export const AppxBundleSplitResourcesPriPath = makeTag<AppxBundleSplitResourcesPriPathProps>("AppxBundleSplitResourcesPriPath")

/**
 * Prefix used for split resources .pri and .map.txt files.
 */
export interface AppxBundleSplitResourcesPriPrefixProps extends StringPropertyTypeProps {

}

/**
 * Prefix used for split resources .pri and .map.txt files.
 */
export const AppxBundleSplitResourcesPriPrefix = makeTag<AppxBundleSplitResourcesPriPrefixProps>("AppxBundleSplitResourcesPriPrefix")

/**
 * Full path to a log file containing a detected qualifiers during resource splitting.
 */
export interface AppxBundleSplitResourcesQualifiersPathProps extends StringPropertyTypeProps {

}

/**
 * Full path to a log file containing a detected qualifiers during resource splitting.
 */
export const AppxBundleSplitResourcesQualifiersPath = makeTag<AppxBundleSplitResourcesQualifiersPathProps>("AppxBundleSplitResourcesQualifiersPath")

/**
 * Flag indicating whether CopyLocal files group should include XML files.
 */
export interface AppxCopyLocalFilesOutputGroupIncludeXmlFilesProps extends StringPropertyTypeProps {

}

/**
 * Flag indicating whether CopyLocal files group should include XML files.
 */
export const AppxCopyLocalFilesOutputGroupIncludeXmlFiles = makeTag<AppxCopyLocalFilesOutputGroupIncludeXmlFilesProps>("AppxCopyLocalFilesOutputGroupIncludeXmlFiles")

/**
 * Additional parameters to pass to makepri.exe when generating PRI file for a portable library.
 */
export interface AppxCreatePriFilesForPortableLibrariesAdditionalMakepriExeParametersProps extends StringPropertyTypeProps {

}

/**
 * Additional parameters to pass to makepri.exe when generating PRI file for a portable library.
 */
export const AppxCreatePriFilesForPortableLibrariesAdditionalMakepriExeParameters = makeTag<AppxCreatePriFilesForPortableLibrariesAdditionalMakepriExeParametersProps>("AppxCreatePriFilesForPortableLibrariesAdditionalMakepriExeParameters")

/**
 * Default hash algorithm ID, used for signing an app package.
 */
export interface AppxDefaultHashAlgorithmIdProps extends StringPropertyTypeProps {

}

/**
 * Default hash algorithm ID, used for signing an app package.
 */
export const AppxDefaultHashAlgorithmId = makeTag<AppxDefaultHashAlgorithmIdProps>("AppxDefaultHashAlgorithmId")

/**
 * '|'-delimited list of key=value pairs representing default resource qualifiers.
 */
export interface AppxDefaultResourceQualifiersProps extends StringPropertyTypeProps {

}

/**
 * '|'-delimited list of key=value pairs representing default resource qualifiers.
 */
export const AppxDefaultResourceQualifiers = makeTag<AppxDefaultResourceQualifiersProps>("AppxDefaultResourceQualifiers")

/**
 * Flag to exclude XAML files when XBF is present.
 */
export interface AppxExcludeXamlFromLibraryLayoutsWhenXbfIsPresentProps extends StringPropertyTypeProps {

}

/**
 * Flag to exclude XAML files when XBF is present.
 */
export const AppxExcludeXamlFromLibraryLayoutsWhenXbfIsPresent = makeTag<AppxExcludeXamlFromLibraryLayoutsWhenXbfIsPresentProps>("AppxExcludeXamlFromLibraryLayoutsWhenXbfIsPresent")

/**
 * Flag to exclude XBF files when XAML is present.
 */
export interface AppxExcludeXbfFromSdkPayloadWhenXamlIsPresentProps extends StringPropertyTypeProps {

}

/**
 * Flag to exclude XBF files when XAML is present.
 */
export const AppxExcludeXbfFromSdkPayloadWhenXamlIsPresent = makeTag<AppxExcludeXbfFromSdkPayloadWhenXamlIsPresentProps>("AppxExcludeXbfFromSdkPayloadWhenXamlIsPresent")

/**
 * Additional parameters to pass to makepri.exe when extracting payload file names.
 */
export interface AppxExpandPriContentAdditionalMakepriExeParametersProps extends StringPropertyTypeProps {

}

/**
 * Additional parameters to pass to makepri.exe when extracting payload file names.
 */
export const AppxExpandPriContentAdditionalMakepriExeParameters = makeTag<AppxExpandPriContentAdditionalMakepriExeParametersProps>("AppxExpandPriContentAdditionalMakepriExeParameters")

/**
 * Flag indicating whether to filter out unused language resource file maps.
 */
export interface AppxFilterOutUnusedLanguagesResourceFileMapsProps extends StringPropertyTypeProps {

}

/**
 * Flag indicating whether to filter out unused language resource file maps.
 */
export const AppxFilterOutUnusedLanguagesResourceFileMaps = makeTag<AppxFilterOutUnusedLanguagesResourceFileMapsProps>("AppxFilterOutUnusedLanguagesResourceFileMaps")

/**
 * Flag indicating whether to generate resource index files (PRI files) during packaging.
 */
export interface AppxGeneratePriEnabledProps extends StringPropertyTypeProps {

}

/**
 * Flag indicating whether to generate resource index files (PRI files) during packaging.
 */
export const AppxGeneratePriEnabled = makeTag<AppxGeneratePriEnabledProps>("AppxGeneratePriEnabled")

/**
 * Additional parameters to pass to makepri.exe when generating project PRI file.
 */
export interface AppxGenerateProjectPriFileAdditionalMakepriExeParametersProps extends StringPropertyTypeProps {

}

/**
 * Additional parameters to pass to makepri.exe when generating project PRI file.
 */
export const AppxGenerateProjectPriFileAdditionalMakepriExeParameters = makeTag<AppxGenerateProjectPriFileAdditionalMakepriExeParametersProps>("AppxGenerateProjectPriFileAdditionalMakepriExeParameters")

/**
 * Flag indicating whether to enable harvesting of WinMD registration information.
 */
export interface AppxHarvestWinmdRegistrationProps extends StringPropertyTypeProps {

}

/**
 * Flag indicating whether to enable harvesting of WinMD registration information.
 */
export const AppxHarvestWinmdRegistration = makeTag<AppxHarvestWinmdRegistrationProps>("AppxHarvestWinmdRegistration")

/**
 * Hash algorithm URI.
 */
export interface AppxHashUriProps extends SimpleItemTypeProps {

}

/**
 * Hash algorithm URI.
 */
export const AppxHashUri = makeTag<AppxHashUriProps>("AppxHashUri")

/**
 * Full path to the folder where package layout will be prepared when producing an app bundle.
 */
export interface AppxLayoutDirProps extends StringPropertyTypeProps {

}

/**
 * Full path to the folder where package layout will be prepared when producing an app bundle.
 */
export const AppxLayoutDir = makeTag<AppxLayoutDirProps>("AppxLayoutDir")

/**
 * Name of the folder where package layout will be prepared when producing an app bundle.
 */
export interface AppxLayoutFolderNameProps extends StringPropertyTypeProps {

}

/**
 * Name of the folder where package layout will be prepared when producing an app bundle.
 */
export const AppxLayoutFolderName = makeTag<AppxLayoutFolderNameProps>("AppxLayoutFolderName")

/**
 * app manifest template
 */
export interface AppxManifestProps extends SimpleItemTypeProps {

}

/**
 * app manifest template
 */
export const AppxManifest = makeTag<AppxManifestProps>("AppxManifest")

/**
 * XPath queries used to extract file names from the app manifest.
 */
export interface AppxManifestFileNameQueryProps extends SimpleItemTypeProps {
  /**
   * Optional expression evaluated to determine whether the items should be evaluated
   */
  Condition?: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to include in this item list
   */
  Include?: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to exclude from the Include list
   */
  Exclude?: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to remove from the existing list contents
   */
  Remove?: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to be updated with the metadata from contained in this xml element
   */
  Update?: string
  /**
   * Optional expression. Used to identify or order system and user elements
   */
  Label?: string
}

/**
 * XPath queries used to extract file names from the app manifest.
 */
export const AppxManifestFileNameQuery = makeTag<AppxManifestFileNameQueryProps>("AppxManifestFileNameQuery")

/**
 * XPath queries used to define image files in the app manifest and restrictions on them.
 */
export interface AppxManifestImageFileNameQueryProps extends SimpleItemTypeProps {

}

/**
 * XPath queries used to define image files in the app manifest and restrictions on them.
 */
export const AppxManifestImageFileNameQuery = makeTag<AppxManifestImageFileNameQueryProps>("AppxManifestImageFileNameQuery")

/**
 * App manifest metadata item. Can be a literal, or it can be a path to a binary to extract version from.
 */
export interface AppxManifestMetadataProps extends SimpleItemTypeProps {

}

/**
 * App manifest metadata item. Can be a literal, or it can be a path to a binary to extract version from.
 */
export const AppxManifestMetadata = makeTag<AppxManifestMetadataProps>("AppxManifestMetadata")

/**
 * App manifest schema file.
 */
export interface AppxManifestSchemaProps extends SchemaItemTypeProps {

}

/**
 * App manifest schema file.
 */
export const AppxManifestSchema = makeTag<AppxManifestSchemaProps>("AppxManifestSchema")

/**
 * Full path to packaging build tasks assembly.
 */
export interface AppxMSBuildTaskAssemblyProps extends StringPropertyTypeProps {

}

/**
 * Full path to packaging build tasks assembly.
 */
export const AppxMSBuildTaskAssembly = makeTag<AppxMSBuildTaskAssemblyProps>("AppxMSBuildTaskAssembly")

/**
 * Full path to a folder containing packaging build targets and tasks assembly.
 */
export interface AppxMSBuildToolsPathProps extends StringPropertyTypeProps {

}

/**
 * Full path to a folder containing packaging build targets and tasks assembly.
 */
export const AppxMSBuildToolsPath = makeTag<AppxMSBuildToolsPathProps>("AppxMSBuildToolsPath")

/**
 * Targeted maximum OS version tested.
 */
export interface AppxOSMaxVersionTestedProps extends StringPropertyTypeProps {

}

/**
 * Targeted maximum OS version tested.
 */
export const AppxOSMaxVersionTested = makeTag<AppxOSMaxVersionTestedProps>("AppxOSMaxVersionTested")

/**
 * Flag indicating whether maximum OS version tested in app manifest should be replaced.
 */
export interface AppxOSMaxVersionTestedReplaceManifestVersionProps extends StringPropertyTypeProps {

}

/**
 * Flag indicating whether maximum OS version tested in app manifest should be replaced.
 */
export const AppxOSMaxVersionTestedReplaceManifestVersion = makeTag<AppxOSMaxVersionTestedReplaceManifestVersionProps>("AppxOSMaxVersionTestedReplaceManifestVersion")

/**
 * Targeted minimum OS version.
 */
export interface AppxOSMinVersionProps extends StringPropertyTypeProps {

}

/**
 * Targeted minimum OS version.
 */
export const AppxOSMinVersion = makeTag<AppxOSMinVersionProps>("AppxOSMinVersion")

/**
 * Flag indicating whether minimum OS version in app manifest should be replaced.
 */
export interface AppxOSMinVersionReplaceManifestVersionProps extends StringPropertyTypeProps {

}

/**
 * Flag indicating whether minimum OS version in app manifest should be replaced.
 */
export const AppxOSMinVersionReplaceManifestVersion = makeTag<AppxOSMinVersionReplaceManifestVersionProps>("AppxOSMinVersionReplaceManifestVersion")

/**
 * Flag marking current project as capable of being packaged as an app package.
 */
export interface AppxPackageProps extends StringPropertyTypeProps {

}

/**
 * Flag marking current project as capable of being packaged as an app package.
 */
export const AppxPackage = makeTag<AppxPackageProps>("AppxPackage")

/**
 * Flag indicating whether to allow inclusion of debug framework references in an app manifest.
 */
export interface AppxPackageAllowDebugFrameworkReferencesInManifestProps extends StringPropertyTypeProps {

}

/**
 * Flag indicating whether to allow inclusion of debug framework references in an app manifest.
 */
export const AppxPackageAllowDebugFrameworkReferencesInManifest = makeTag<AppxPackageAllowDebugFrameworkReferencesInManifestProps>("AppxPackageAllowDebugFrameworkReferencesInManifest")

/**
 * Additional qualifier to append to AppxPackageDir.
 */
export interface AppxPackageArtifactsDirProps extends StringPropertyTypeProps {

}

/**
 * Additional qualifier to append to AppxPackageDir.
 */
export const AppxPackageArtifactsDir = makeTag<AppxPackageArtifactsDirProps>("AppxPackageArtifactsDir")

/**
 * Full path to a folder where app packages will be saved.
 */
export interface AppxPackageDirProps extends StringPropertyTypeProps {

}

/**
 * Full path to a folder where app packages will be saved.
 */
export const AppxPackageDir = makeTag<AppxPackageDirProps>("AppxPackageDir")

/**
 * Name of the folder where app packages are produced.
 */
export interface AppxPackageDirNameProps extends StringPropertyTypeProps {

}

/**
 * Name of the folder where app packages are produced.
 */
export const AppxPackageDirName = makeTag<AppxPackageDirNameProps>("AppxPackageDirName")

/**
 * Full path to app package file map.
 */
export interface AppxPackageFileMapProps extends StringPropertyTypeProps {

}

/**
 * Full path to app package file map.
 */
export const AppxPackageFileMap = makeTag<AppxPackageFileMapProps>("AppxPackageFileMap")

/**
 * Flag indicating whether to include private symbols in symbol packages.
 */
export interface AppxPackageIncludePrivateSymbolsProps extends StringPropertyTypeProps {

}

/**
 * Flag indicating whether to include private symbols in symbol packages.
 */
export const AppxPackageIncludePrivateSymbols = makeTag<AppxPackageIncludePrivateSymbolsProps>("AppxPackageIncludePrivateSymbols")

/**
 * Name of the app package to generate.
 */
export interface AppxPackageNameProps extends StringPropertyTypeProps {

}

/**
 * Name of the app package to generate.
 */
export const AppxPackageName = makeTag<AppxPackageNameProps>("AppxPackageName")

/**
 * Full path to the app package file.
 */
export interface AppxPackageOutputProps extends StringPropertyTypeProps {

}

/**
 * Full path to the app package file.
 */
export const AppxPackageOutput = makeTag<AppxPackageOutputProps>("AppxPackageOutput")

export interface AppxPackagePayloadProps extends SimpleItemTypeProps {

}

export const AppxPackagePayload = makeTag<AppxPackagePayloadProps>("AppxPackagePayload")

/**
 * Full path to the app package recipe.
 */
export interface AppxPackageRecipeProps extends StringPropertyTypeProps {

}

/**
 * Full path to the app package recipe.
 */
export const AppxPackageRecipe = makeTag<AppxPackageRecipeProps>("AppxPackageRecipe")

/**
 * Flag indicating whether to enable signing of app packages.
 */
export interface AppxPackageSigningEnabledProps extends StringPropertyTypeProps {

}

/**
 * Flag indicating whether to enable signing of app packages.
 */
export const AppxPackageSigningEnabled = makeTag<AppxPackageSigningEnabledProps>("AppxPackageSigningEnabled")

/**
 * Digest algorithm used by the RFC 3161 timestamp server.
 */
export interface AppxPackageSigningTimestampDigestAlgorithmProps extends StringPropertyTypeProps {

}

/**
 * Digest algorithm used by the RFC 3161 timestamp server.
 */
export const AppxPackageSigningTimestampDigestAlgorithm = makeTag<AppxPackageSigningTimestampDigestAlgorithmProps>("AppxPackageSigningTimestampDigestAlgorithm")

/**
 * RFC 3161 timestamp server's URL.
 */
export interface AppxPackageSigningTimestampServerUrlProps extends StringPropertyTypeProps {

}

/**
 * RFC 3161 timestamp server's URL.
 */
export const AppxPackageSigningTimestampServerUrl = makeTag<AppxPackageSigningTimestampServerUrlProps>("AppxPackageSigningTimestampServerUrl")

/**
 * Name of the folder where test app packages will be copied
 */
export interface AppxPackageTestDirProps extends StringPropertyTypeProps {

}

/**
 * Name of the folder where test app packages will be copied
 */
export const AppxPackageTestDir = makeTag<AppxPackageTestDirProps>("AppxPackageTestDir")

/**
 * Flag indicating whether to enable validation of app packages.
 */
export interface AppxPackageValidationEnabledProps extends StringPropertyTypeProps {

}

/**
 * Flag indicating whether to enable validation of app packages.
 */
export const AppxPackageValidationEnabled = makeTag<AppxPackageValidationEnabledProps>("AppxPackageValidationEnabled")

/**
 * Full path to the packaging info file which will contain paths to produced packages.
 */
export interface AppxPackagingInfoFileProps extends StringPropertyTypeProps {

}

/**
 * Full path to the packaging info file which will contain paths to produced packages.
 */
export const AppxPackagingInfoFile = makeTag<AppxPackagingInfoFileProps>("AppxPackagingInfoFile")

/**
 * Flag indicating whether to enable prepending initial path when indexing RESW and RESJSON files in class libraries.
 */
export interface AppxPrependPriInitialPathProps extends StringPropertyTypeProps {

}

/**
 * Flag indicating whether to enable prepending initial path when indexing RESW and RESJSON files in class libraries.
 */
export const AppxPrependPriInitialPath = makeTag<AppxPrependPriInitialPathProps>("AppxPrependPriInitialPath")

/**
 * Path to an XML file containing default element for priconfi.xml file.
 */
export interface AppxPriConfigXmlDefaultSnippetPathProps extends StringPropertyTypeProps {

}

/**
 * Path to an XML file containing default element for priconfi.xml file.
 */
export const AppxPriConfigXmlDefaultSnippetPath = makeTag<AppxPriConfigXmlDefaultSnippetPathProps>("AppxPriConfigXmlDefaultSnippetPath")

/**
 * Path to an XML file containing packaging element for priconfi.xml file.
 */
export interface AppxPriConfigXmlPackagingSnippetPathProps extends StringPropertyTypeProps {

}

/**
 * Path to an XML file containing packaging element for priconfi.xml file.
 */
export const AppxPriConfigXmlPackagingSnippetPath = makeTag<AppxPriConfigXmlPackagingSnippetPathProps>("AppxPriConfigXmlPackagingSnippetPath")

/**
 * Initial path when indexing RESW and RESJSON files in class libraries.
 */
export interface AppxPriInitialPathProps extends StringPropertyTypeProps {

}

/**
 * Initial path when indexing RESW and RESJSON files in class libraries.
 */
export const AppxPriInitialPath = makeTag<AppxPriInitialPathProps>("AppxPriInitialPath")

/**
 * Reserved file name which cannot appear in the app package.
 */
export interface AppxReservedFileNameProps extends SimpleItemTypeProps {
  /**
   * Optional expression evaluated to determine whether the items should be evaluated
   */
  Condition?: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to include in this item list
   */
  Include?: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to exclude from the Include list
   */
  Exclude?: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to remove from the existing list contents
   */
  Remove?: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to be updated with the metadata from contained in this xml element
   */
  Update?: string
  /**
   * Optional expression. Used to identify or order system and user elements
   */
  Label?: string
}

/**
 * Reserved file name which cannot appear in the app package.
 */
export const AppxReservedFileName = makeTag<AppxReservedFileNameProps>("AppxReservedFileName")

/**
 * Flag indicating whether to skip unchanged files when copying files during creation of app packages.
 */
export interface AppxSkipUnchangedFilesProps extends StringPropertyTypeProps {

}

/**
 * Flag indicating whether to skip unchanged files when copying files during creation of app packages.
 */
export const AppxSkipUnchangedFiles = makeTag<AppxSkipUnchangedFilesProps>("AppxSkipUnchangedFiles")

/**
 * Name of the app store container to generate.
 */
export interface AppxStoreContainerProps extends StringPropertyTypeProps {

}

/**
 * Name of the app store container to generate.
 */
export const AppxStoreContainer = makeTag<AppxStoreContainerProps>("AppxStoreContainer")

/**
 * Flag indicating whether to enable strict manifest validation.
 */
export interface AppxStrictManifestValidationEnabledProps extends StringPropertyTypeProps {

}

/**
 * Flag indicating whether to enable strict manifest validation.
 */
export const AppxStrictManifestValidationEnabled = makeTag<AppxStrictManifestValidationEnabledProps>("AppxStrictManifestValidationEnabled")

/**
 * Flag indicating whether to generate a symbol package when an app package is created.
 */
export interface AppxSymbolPackageEnabledProps extends StringPropertyTypeProps {

}

/**
 * Flag indicating whether to generate a symbol package when an app package is created.
 */
export const AppxSymbolPackageEnabled = makeTag<AppxSymbolPackageEnabledProps>("AppxSymbolPackageEnabled")

/**
 * Full path to the app symbol package file.
 */
export interface AppxSymbolPackageOutputProps extends StringPropertyTypeProps {

}

/**
 * Full path to the app symbol package file.
 */
export const AppxSymbolPackageOutput = makeTag<AppxSymbolPackageOutputProps>("AppxSymbolPackageOutput")

/**
 * Full path to a directory where stripped PDBs will be stored.
 */
export interface AppxSymbolStrippedDirProps extends StringPropertyTypeProps {

}

/**
 * Full path to a directory where stripped PDBs will be stored.
 */
export const AppxSymbolStrippedDir = makeTag<AppxSymbolStrippedDirProps>("AppxSymbolStrippedDir")

/**
 * Name of any file which is present on the machine and should not be part of the app payload.
 */
export interface AppxSystemBinaryProps extends SimpleItemTypeProps {
  /**
   * Optional expression evaluated to determine whether the items should be evaluated
   */
  Condition?: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to include in this item list
   */
  Include?: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to exclude from the Include list
   */
  Exclude?: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to remove from the existing list contents
   */
  Remove?: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to be updated with the metadata from contained in this xml element
   */
  Update?: string
  /**
   * Optional expression. Used to identify or order system and user elements
   */
  Label?: string
}

/**
 * Name of any file which is present on the machine and should not be part of the app payload.
 */
export const AppxSystemBinary = makeTag<AppxSystemBinaryProps>("AppxSystemBinary")

/**
 * Flag indicating whether to create test layout when an app package is created.
 */
export interface AppxTestLayoutEnabledProps extends StringPropertyTypeProps {

}

/**
 * Flag indicating whether to create test layout when an app package is created.
 */
export const AppxTestLayoutEnabled = makeTag<AppxTestLayoutEnabledProps>("AppxTestLayoutEnabled")

/**
 * Flag indicating whether to use hard links if possible when copying files during creation of app packages.
 */
export interface AppxUseHardlinksIfPossibleProps extends StringPropertyTypeProps {

}

/**
 * Flag indicating whether to use hard links if possible when copying files during creation of app packages.
 */
export const AppxUseHardlinksIfPossible = makeTag<AppxUseHardlinksIfPossibleProps>("AppxUseHardlinksIfPossible")

/**
 * Flag indicating whether to validate app manifest.
 */
export interface AppxValidateAppxManifestProps extends StringPropertyTypeProps {

}

/**
 * Flag indicating whether to validate app manifest.
 */
export const AppxValidateAppxManifest = makeTag<AppxValidateAppxManifestProps>("AppxValidateAppxManifest")

/**
 * Flag indicating whether to validate store manifest.
 */
export interface AppxValidateStoreManifestProps extends StringPropertyTypeProps {

}

/**
 * Flag indicating whether to validate store manifest.
 */
export const AppxValidateStoreManifest = makeTag<AppxValidateStoreManifestProps>("AppxValidateStoreManifest")

/**
 * Path to the folder where harvested WinMD registration information will be cached.
 */
export interface AppxWinMdCacheDirProps extends StringPropertyTypeProps {

}

/**
 * Path to the folder where harvested WinMD registration information will be cached.
 */
export const AppxWinMdCacheDir = makeTag<AppxWinMdCacheDirProps>("AppxWinMdCacheDir")

/**
 * Flag indicating whether to cache the harvested WinMD registration information.
 */
export interface AppxWinMdCacheEnabledProps extends StringPropertyTypeProps {

}

/**
 * Flag indicating whether to cache the harvested WinMD registration information.
 */
export const AppxWinMdCacheEnabled = makeTag<AppxWinMdCacheEnabledProps>("AppxWinMdCacheEnabled")

/**
 * The path to use for the centralized outputs - if set, UseArtifactsOutput will be defaulted to true. Project outputs will be placed under this path grouped by kind, then by project. See https://learn.microsoft.com/en-us/dotnet/core/sdk/artifacts-output for complete details.
 */
export interface ArtifactsPathProps extends StringPropertyTypeProps {

}

/**
 * The path to use for the centralized outputs - if set, UseArtifactsOutput will be defaulted to true. Project outputs will be placed under this path grouped by kind, then by project. See https://learn.microsoft.com/en-us/dotnet/core/sdk/artifacts-output for complete details.
 */
export const ArtifactsPath = makeTag<ArtifactsPathProps>("ArtifactsPath")

export interface AspNetCompilerProps extends TaskTypeProps {
  AllowPartiallyTrustedCallers?: boolean
  Clean?: boolean
  Debug?: boolean
  DelaySign?: boolean
  EnvironmentVariables?: unknown
  FixedNames?: boolean
  Force?: boolean
  KeyContainer?: unknown
  KeyFile?: unknown
  LogStandardErrorAsError?: boolean
  MetabasePath?: unknown
  PhysicalPath?: unknown
  StandardErrorImportance?: unknown
  StandardOutputImportance?: unknown
  TargetFrameworkMoniker?: unknown
  TargetPath?: unknown
  Timeout?: unknown
  ToolExe?: unknown
  ToolPath?: unknown
  Updateable?: boolean
  VirtualPath?: unknown
}

export const AspNetCompiler = makeTag<AspNetCompilerProps>("AspNetCompiler")

export interface AspNetConfigurationProps extends StringPropertyTypeProps {

}

export const AspNetConfiguration = makeTag<AspNetConfigurationProps>("AspNetConfiguration")

/**
 * Indicates whether to run an ASP.NET Core application using IIS in-process or out-of-process.
 */
export interface AspNetCoreHostingModelProps extends StringPropertyTypeProps {

}

/**
 * Indicates whether to run an ASP.NET Core application using IIS in-process or out-of-process.
 */
export const AspNetCoreHostingModel = makeTag<AspNetCoreHostingModelProps>("AspNetCoreHostingModel")

/**
 * Indicates which AspNetCoreModule version to use. Versions include V1 and V2.
 */
export interface AspNetCoreModuleNameProps extends StringPropertyTypeProps {

}

/**
 * Indicates which AspNetCoreModule version to use. Versions include V1 and V2.
 */
export const AspNetCoreModuleName = makeTag<AspNetCoreModuleNameProps>("AspNetCoreModuleName")

export interface AssemblyDebugProps {

}

export const AssemblyDebug = makeTag<AssemblyDebugProps>("AssemblyDebug")

export interface AssemblyIdentityProps {

}

export const AssemblyIdentity = makeTag<AssemblyIdentityProps>("AssemblyIdentity")

export interface AssemblyKeyContainerNameProps extends StringPropertyTypeProps {

}

export const AssemblyKeyContainerName = makeTag<AssemblyKeyContainerNameProps>("AssemblyKeyContainerName")

export interface AssemblyKeyProviderNameProps extends StringPropertyTypeProps {

}

export const AssemblyKeyProviderName = makeTag<AssemblyKeyProviderNameProps>("AssemblyKeyProviderName")

export interface AssemblyLinkResourceProps {

}

export const AssemblyLinkResource = makeTag<AssemblyLinkResourceProps>("AssemblyLinkResource")

/**
 * Name of output assembly
 */
export interface AssemblyNameProps extends StringPropertyTypeProps {

}

/**
 * Name of output assembly
 */
export const AssemblyName = makeTag<AssemblyNameProps>("AssemblyName")

export interface AssemblyOriginatorKeyFileProps extends StringPropertyTypeProps {

}

export const AssemblyOriginatorKeyFile = makeTag<AssemblyOriginatorKeyFileProps>("AssemblyOriginatorKeyFile")

export interface AssemblyOriginatorKeyFileTypeProps extends StringPropertyTypeProps {

}

export const AssemblyOriginatorKeyFileType = makeTag<AssemblyOriginatorKeyFileTypeProps>("AssemblyOriginatorKeyFileType")

export interface AssemblyOriginatorKeyModeProps extends StringPropertyTypeProps {

}

export const AssemblyOriginatorKeyMode = makeTag<AssemblyOriginatorKeyModeProps>("AssemblyOriginatorKeyMode")

export interface AssemblySearchPath_UseAssemblyFoldersProps {

}

export const AssemblySearchPath_UseAssemblyFolders = makeTag<AssemblySearchPath_UseAssemblyFoldersProps>("AssemblySearchPath_UseAssemblyFolders")

export interface AssemblySearchPath_UseAssemblyFoldersConfigFileSearchPathProps {

}

export const AssemblySearchPath_UseAssemblyFoldersConfigFileSearchPath = makeTag<AssemblySearchPath_UseAssemblyFoldersConfigFileSearchPathProps>("AssemblySearchPath_UseAssemblyFoldersConfigFileSearchPath")

export interface AssemblySearchPath_UseCandidateAssemblyFilesProps {

}

export const AssemblySearchPath_UseCandidateAssemblyFiles = makeTag<AssemblySearchPath_UseCandidateAssemblyFilesProps>("AssemblySearchPath_UseCandidateAssemblyFiles")

export interface AssemblySearchPath_UseGACProps {

}

export const AssemblySearchPath_UseGAC = makeTag<AssemblySearchPath_UseGACProps>("AssemblySearchPath_UseGAC")

export interface AssemblySearchPath_UseHintPathFromItemProps {

}

export const AssemblySearchPath_UseHintPathFromItem = makeTag<AssemblySearchPath_UseHintPathFromItemProps>("AssemblySearchPath_UseHintPathFromItem")

export interface AssemblySearchPath_UseOutDirProps {

}

export const AssemblySearchPath_UseOutDir = makeTag<AssemblySearchPath_UseOutDirProps>("AssemblySearchPath_UseOutDir")

export interface AssemblySearchPath_UseRawFileNameProps {

}

export const AssemblySearchPath_UseRawFileName = makeTag<AssemblySearchPath_UseRawFileNameProps>("AssemblySearchPath_UseRawFileName")

export interface AssemblySearchPath_UseReferencePathProps {

}

export const AssemblySearchPath_UseReferencePath = makeTag<AssemblySearchPath_UseReferencePathProps>("AssemblySearchPath_UseReferencePath")

export interface AssemblySearchPath_UseRegistryProps {

}

export const AssemblySearchPath_UseRegistry = makeTag<AssemblySearchPath_UseRegistryProps>("AssemblySearchPath_UseRegistry")

export interface AssemblySearchPath_UseTargetFrameworkDirectoryProps {

}

export const AssemblySearchPath_UseTargetFrameworkDirectory = makeTag<AssemblySearchPath_UseTargetFrameworkDirectoryProps>("AssemblySearchPath_UseTargetFrameworkDirectory")

/**
 * Semicolon-delimited ordered list of paths to search when the ResolveAssemblyReference task looks for an assembly. Some non-path locations like the Global Assembly Cache can also be searched using curly braces: {GAC}.
 */
export interface AssemblySearchPathsProps extends StringPropertyTypeProps {

}

/**
 * Semicolon-delimited ordered list of paths to search when the ResolveAssemblyReference task looks for an assembly. Some non-path locations like the Global Assembly Cache can also be searched using curly braces: {GAC}.
 */
export const AssemblySearchPaths = makeTag<AssemblySearchPathsProps>("AssemblySearchPaths")

/**
 * Description for the assembly manifest
 */
export interface AssemblyTitleProps extends StringPropertyTypeProps {

}

/**
 * Description for the assembly manifest
 */
export const AssemblyTitle = makeTag<AssemblyTitleProps>("AssemblyTitle")

export interface AssemblyTypeProps extends StringPropertyTypeProps {

}

export const AssemblyType = makeTag<AssemblyTypeProps>("AssemblyType")

/**
 * Numeric value of the version for the assembly manifest in the format major.minor.patch (e.g. 2.4.0)
 */
export interface AssemblyVersionProps extends StringPropertyTypeProps {

}

/**
 * Numeric value of the version for the assembly manifest in the format major.minor.patch (e.g. 2.4.0)
 */
export const AssemblyVersion = makeTag<AssemblyVersionProps>("AssemblyVersion")

/**
 * Can be set to one or more target framework monikers. When determining package compatibility, if the package does not have compatible assets for the project's real target framework, compatibility will be rechecked using each target framework from the AssetTargetFramework project of the referencing project.
 */
export interface AssetTargetFallbackProps extends StringPropertyTypeProps {

}

/**
 * Can be set to one or more target framework monikers. When determining package compatibility, if the package does not have compatible assets for the project's real target framework, compatibility will be rechecked using each target framework from the AssetTargetFramework project of the referencing project.
 */
export const AssetTargetFallback = makeTag<AssetTargetFallbackProps>("AssetTargetFallback")

export interface AssignCultureProps extends TaskTypeProps {
  Files: unknown
}

export const AssignCulture = makeTag<AssignCultureProps>("AssignCulture")

export interface AssignProjectConfigurationProps extends TaskTypeProps {
  AssignedProjects?: unknown
  CurrentProjectConfiguration?: unknown
  CurrentProjectPlatform?: unknown
  DefaultToVcxPlatformMapping?: unknown
  ProjectReferences: unknown
  ResolveConfigurationPlatformUsingMappings?: boolean
  SolutionConfigurationContents?: unknown
  UnassignedProjects?: unknown
  VcxToDefaultPlatformMapping?: unknown
}

export const AssignProjectConfiguration = makeTag<AssignProjectConfigurationProps>("AssignProjectConfiguration")

export interface AssignTargetPathProps extends TaskTypeProps {
  Files?: unknown
  RootFolder: unknown
}

export const AssignTargetPath = makeTag<AssignTargetPathProps>("AssignTargetPath")

/**
 * A comma-separated list of NuGet packages authors
 */
export interface AuthorsProps extends StringPropertyTypeProps {

}

/**
 * A comma-separated list of NuGet packages authors
 */
export const Authors = makeTag<AuthorsProps>("Authors")

/**
 * Indicates whether BindingRedirect elements should be automatically generated for referenced assemblies.
 */
export interface AutoGenerateBindingRedirectsProps extends StringPropertyTypeProps {

}

/**
 * Indicates whether BindingRedirect elements should be automatically generated for referenced assemblies.
 */
export const AutoGenerateBindingRedirects = makeTag<AutoGenerateBindingRedirectsProps>("AutoGenerateBindingRedirects")

/**
 * Flag indicating whether to enable auto increment of an app package revision.
 */
export interface AutoIncrementPackageRevisionProps extends StringPropertyTypeProps {

}

/**
 * Flag indicating whether to enable auto increment of an app package revision.
 */
export const AutoIncrementPackageRevision = makeTag<AutoIncrementPackageRevisionProps>("AutoIncrementPackageRevision")

/**
 * boolean
 */
export interface AutorunEnabledProps {

}

/**
 * boolean
 */
export const AutorunEnabled = makeTag<AutorunEnabledProps>("AutorunEnabled")

export interface AxImpProps extends TaskTypeProps {
  ActiveXControlName?: unknown
  DelaySign?: boolean
  EnvironmentVariables?: unknown
  GenerateSource?: boolean
  KeyContainer?: unknown
  KeyFile?: unknown
  LogStandardErrorAsError?: boolean
  NoLogo?: boolean
  OutputAssembly?: unknown
  RuntimeCallableWrapperAssembly?: unknown
  SdkToolsPath?: unknown
  Silent?: boolean
  StandardErrorImportance?: unknown
  StandardOutputImportance?: unknown
  Timeout?: unknown
  ToolExe?: unknown
  ToolPath?: unknown
  Verbose?: boolean
}

export const AxImp = makeTag<AxImpProps>("AxImp")

export interface BaseAddressProps extends StringPropertyTypeProps {

}

export const BaseAddress = makeTag<BaseAddressProps>("BaseAddress")

/**
 * The base application manifest for the build. Contains ClickOnce security information.
 */
export interface BaseApplicationManifestProps extends SimpleItemTypeProps {
  /**
   * Optional expression evaluated to determine whether the items should be evaluated
   */
  Condition?: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to include in this item list
   */
  Include?: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to exclude from the Include list
   */
  Exclude?: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to remove from the existing list contents
   */
  Remove?: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to be updated with the metadata from contained in this xml element
   */
  Update?: string
  /**
   * Optional expression. Used to identify or order system and user elements
   */
  Label?: string
}

/**
 * The base application manifest for the build. Contains ClickOnce security information.
 */
export const BaseApplicationManifest = makeTag<BaseApplicationManifestProps>("BaseApplicationManifest")

/**
 * Base path of output folder, where all configuration-specific output folders will be created. Default value is bin\.
 */
export interface BaseOutputPathProps extends StringPropertyTypeProps {

}

/**
 * Base path of output folder, where all configuration-specific output folders will be created. Default value is bin\.
 */
export const BaseOutputPath = makeTag<BaseOutputPathProps>("BaseOutputPath")

export interface BasicRuntimeChecksProps {

}

export const BasicRuntimeChecks = makeTag<BasicRuntimeChecksProps>("BasicRuntimeChecks")

/**
 * HomeSite, Relative, or Absolute
 */
export interface BootstrapperComponentsLocationProps extends StringPropertyTypeProps {

}

/**
 * HomeSite, Relative, or Absolute
 */
export const BootstrapperComponentsLocation = makeTag<BootstrapperComponentsLocationProps>("BootstrapperComponentsLocation")

export interface BootstrapperComponentsUrlProps extends StringPropertyTypeProps {

}

export const BootstrapperComponentsUrl = makeTag<BootstrapperComponentsUrlProps>("BootstrapperComponentsUrl")

/**
 * boolean
 */
export interface BootstrapperEnabledProps {

}

/**
 * boolean
 */
export const BootstrapperEnabled = makeTag<BootstrapperEnabledProps>("BootstrapperEnabled")

export interface BootstrapperFileProps extends SimpleItemTypeProps {

}

export const BootstrapperFile = makeTag<BootstrapperFileProps>("BootstrapperFile")

export interface BrowseInformationProps {

}

export const BrowseInformation = makeTag<BrowseInformationProps>("BrowseInformation")

export interface BscmakeProps extends SimpleItemTypeProps {

}

export const Bscmake = makeTag<BscmakeProps>("Bscmake")

export interface BSCMakeProps extends TaskTypeProps {
  AcceptableNonZeroExitCodes?: unknown
  ActiveToolSwitchesValues?: unknown
  AdditionalOptions?: unknown
  EnvironmentVariables?: unknown
  ExcludedInputPaths?: unknown
  LogStandardErrorAsError?: boolean
  MinimalRebuildFromTracking?: boolean
  OutputFile?: unknown
  PathOverride?: unknown
  SkippedExecution?: boolean
  Sources?: unknown
  SourcesCompiled?: unknown
  StandardErrorImportance?: unknown
  StandardOutputImportance?: unknown
  SuppressStartupBanner?: boolean
  Timeout?: unknown
  TLogReadFiles?: unknown
  TLogWriteFiles?: unknown
  ToolExe?: unknown
  ToolPath?: unknown
  TrackedInputFilesToIgnore?: unknown
  TrackedOutputFilesToIgnore?: unknown
  TrackerLogDirectory?: unknown
  TrackFileAccess?: boolean
}

export const BSCMake = makeTag<BSCMakeProps>("BSCMake")

export interface CallingConventionProps {

}

export const CallingConvention = makeTag<CallingConventionProps>("CallingConvention")

export interface CallTargetProps extends TaskTypeProps {
  RunEachTargetSeparately?: boolean
  Targets?: unknown
  UseResultsCache?: boolean
}

export const CallTarget = makeTag<CallTargetProps>("CallTarget")

export interface CharacterSetProps extends StringPropertyTypeProps {

}

export const CharacterSet = makeTag<CharacterSetProps>("CharacterSet")

export interface CheckForOverflowUnderflowProps extends StringPropertyTypeProps {

}

export const CheckForOverflowUnderflow = makeTag<CheckForOverflowUnderflowProps>("CheckForOverflowUnderflow")

export interface ChooseProps {
  /**
   * Optional expression. Used to identify or order system and user elements
   */
  Label?: string
}

export const Choose = makeTag<ChooseProps>("Choose")

export interface CLProps extends TaskTypeProps {
  AcceptableNonZeroExitCodes?: unknown
  ActiveToolSwitchesValues?: unknown
  AdditionalIncludeDirectories?: unknown
  AdditionalOptions?: unknown
  AdditionalUsingDirectories?: unknown
  AssemblerListingLocation?: unknown
  AssemblerOutput?: unknown
  BasicRuntimeChecks?: unknown
  BrowseInformation?: boolean
  BrowseInformationFile?: unknown
  BufferSecurityCheck?: boolean
  CallingConvention?: unknown
  CompileAs?: unknown
  CompileAsManaged?: unknown
  CreateHotpatchableImage?: boolean
  DebugInformationFormat?: unknown
  DisableLanguageExtensions?: boolean
  DisableSpecificWarnings?: unknown
  EnableEnhancedInstructionSet?: unknown
  EnableFiberSafeOptimizations?: boolean
  EnablePREfast?: boolean
  EnvironmentVariables?: unknown
  ErrorReporting?: unknown
  ExceptionHandling?: unknown
  ExcludedInputPaths?: unknown
  ExpandAttributedSource?: boolean
  FavorSizeOrSpeed?: unknown
  FloatingPointExceptions?: boolean
  FloatingPointModel?: unknown
  ForceConformanceInForLoopScope?: boolean
  ForcedIncludeFiles?: unknown
  ForcedUsingFiles?: unknown
  FunctionLevelLinking?: boolean
  GenerateXMLDocumentationFiles?: boolean
  IgnoreStandardIncludePath?: boolean
  InlineFunctionExpansion?: unknown
  IntrinsicFunctions?: boolean
  LogStandardErrorAsError?: boolean
  MinimalRebuild?: boolean
  MinimalRebuildFromTracking?: boolean
  MultiProcessorCompilation?: boolean
  ObjectFileName?: unknown
  ObjectFiles?: unknown
  OmitDefaultLibName?: boolean
  OmitFramePointers?: boolean
  OpenMPSupport?: boolean
  Optimization?: unknown
  PathOverride?: unknown
  PrecompiledHeader?: unknown
  PrecompiledHeaderFile?: unknown
  PrecompiledHeaderOutputFile?: unknown
  PreprocessKeepComments?: boolean
  PreprocessorDefinitions?: unknown
  PreprocessOutput?: unknown
  PreprocessSuppressLineNumbers?: boolean
  PreprocessToFile?: boolean
  ProcessorNumber?: unknown
  ProgramDataBaseFileName?: unknown
  RuntimeLibrary?: unknown
  RuntimeTypeInfo?: boolean
  ShowIncludes?: boolean
  SkippedExecution?: boolean
  SmallerTypeCheck?: boolean
  Sources: unknown
  SourcesCompiled?: unknown
  StandardErrorImportance?: unknown
  StandardOutputImportance?: unknown
  StringPooling?: boolean
  StructMemberAlignment?: unknown
  SuppressStartupBanner?: boolean
  Timeout?: unknown
  TLogReadFiles?: unknown
  TLogWriteFiles?: unknown
  ToolExe?: unknown
  ToolPath?: unknown
  TrackedInputFilesToIgnore?: unknown
  TrackedOutputFilesToIgnore?: unknown
  TrackerLogDirectory?: unknown
  TrackFileAccess?: boolean
  TreatSpecificWarningsAsErrors?: unknown
  TreatWarningAsError?: boolean
  TreatWChar_tAsBuiltInType?: boolean
  UndefineAllPreprocessorDefinitions?: boolean
  UndefinePreprocessorDefinitions?: unknown
  UseFullPaths?: boolean
  UseUnicodeForAssemblerListing?: boolean
  WarningLevel?: unknown
  WholeProgramOptimization?: boolean
  XMLDocumentationFileName?: unknown
}

export const CL = makeTag<CLProps>("CL")

export interface ClCompileProps extends SimpleItemTypeProps {

}

export const ClCompile = makeTag<ClCompileProps>("ClCompile")

export interface ClientStubFileProps {

}

export const ClientStubFile = makeTag<ClientStubFileProps>("ClientStubFile")

export interface ClIncludeProps extends SimpleItemTypeProps {

}

export const ClInclude = makeTag<ClIncludeProps>("ClInclude")

export interface CLRImageTypeProps {

}

export const CLRImageType = makeTag<CLRImageTypeProps>("CLRImageType")

export interface CLRSupportProps extends StringPropertyTypeProps {

}

export const CLRSupport = makeTag<CLRSupportProps>("CLRSupport")

export interface CLRSupportLastErrorProps {

}

export const CLRSupportLastError = makeTag<CLRSupportLastErrorProps>("CLRSupportLastError")

export interface CLRThreadAttributeProps {

}

export const CLRThreadAttribute = makeTag<CLRThreadAttributeProps>("CLRThreadAttribute")

export interface CLRUnmanagedCodeCheckProps {

}

export const CLRUnmanagedCodeCheck = makeTag<CLRUnmanagedCodeCheckProps>("CLRUnmanagedCodeCheck")

export interface CodeAnalysisProps extends TaskTypeProps {
  AlternativeToolName?: unknown
  AnalysisTimeout?: unknown
  ApplyLogFileXsl?: boolean
  Assemblies?: unknown
  ConsoleXsl?: unknown
  Culture?: unknown
  DependentAssemblyPaths?: unknown
  Dictionaries?: unknown
  FilesWritten?: unknown
  ForceOutput?: boolean
  GenerateSuccessFile?: boolean
  IgnoreInvalidTargets?: boolean
  IgnoreGeneratedCode?: boolean
  Imports?: unknown
  LogFile?: unknown
  LogFileXsl?: unknown
  OutputToConsole?: boolean
  OverrideRuleVisibilities?: boolean
  PlatformPath?: unknown
  Project?: unknown
  Quiet?: boolean
  References?: unknown
  RuleAssemblies?: unknown
  Rules?: unknown
  SaveMessagesToReport?: unknown
  SearchGlobalAssemblyCache?: boolean
  Summary?: boolean
  SuccessFile?: boolean
  Timeout?: unknown
  TreatWarningsAsErrors?: boolean
  ToolPath?: unknown
  UpdateProject?: boolean
}

export const CodeAnalysis = makeTag<CodeAnalysisProps>("CodeAnalysis")

/**
 * Additional options to pass to the Code Analysis command line tool.
 */
export interface CodeAnalysisAdditionalOptionsProps extends StringPropertyTypeProps {

}

/**
 * Additional options to pass to the Code Analysis command line tool.
 */
export const CodeAnalysisAdditionalOptions = makeTag<CodeAnalysisAdditionalOptionsProps>("CodeAnalysisAdditionalOptions")

/**
 * Indicates whether to apply the XSL style sheet specified in $(CodeAnalysisLogFileXsl) to the Code Analysis report. This report is specified in $(CodeAnalysisLogFile). The default is false.
 */
export interface CodeAnalysisApplyLogFileXslProps {

}

/**
 * Indicates whether to apply the XSL style sheet specified in $(CodeAnalysisLogFileXsl) to the Code Analysis report. This report is specified in $(CodeAnalysisLogFile). The default is false.
 */
export const CodeAnalysisApplyLogFileXsl = makeTag<CodeAnalysisApplyLogFileXslProps>("CodeAnalysisApplyLogFileXsl")

/**
 * Path to the XSL style sheet that will be applied to the Code Analysis console output. The default is an empty string (''), which causes Code Analysis to use its default console output.
 */
export interface CodeAnalysisConsoleXslProps extends StringPropertyTypeProps {

}

/**
 * Path to the XSL style sheet that will be applied to the Code Analysis console output. The default is an empty string (''), which causes Code Analysis to use its default console output.
 */
export const CodeAnalysisConsoleXsl = makeTag<CodeAnalysisConsoleXslProps>("CodeAnalysisConsoleXsl")

/**
 * Culture to use for Code Analysis spelling rules, for example, 'en-US' or 'en-AU'. The default is the current user interface language for Windows.
 */
export interface CodeAnalysisCultureProps extends StringPropertyTypeProps {

}

/**
 * Culture to use for Code Analysis spelling rules, for example, 'en-US' or 'en-AU'. The default is the current user interface language for Windows.
 */
export const CodeAnalysisCulture = makeTag<CodeAnalysisCultureProps>("CodeAnalysisCulture")

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
 * Additional reference assembly paths to pass to the Code Analysis command line tool.
 */
export const CodeAnalysisDependentAssemblyPaths = makeTag<CodeAnalysisDependentAssemblyPathsProps>("CodeAnalysisDependentAssemblyPaths")

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
 * Code Analysis custom dictionaries.
 */
export const CodeAnalysisDictionary = makeTag<CodeAnalysisDictionaryProps>("CodeAnalysisDictionary")

/**
 * Indicates whether Code Analysis should fail if a rule or rule set is missing. The default is false.
 */
export interface CodeAnalysisFailOnMissingRulesProps {

}

/**
 * Indicates whether Code Analysis should fail if a rule or rule set is missing. The default is false.
 */
export const CodeAnalysisFailOnMissingRules = makeTag<CodeAnalysisFailOnMissingRulesProps>("CodeAnalysisFailOnMissingRules")

/**
 * Indicates whether Code Analysis generates a report file, even when there are no active warnings or errors. The default is true.
 */
export interface CodeAnalysisForceOutputProps {

}

/**
 * Indicates whether Code Analysis generates a report file, even when there are no active warnings or errors. The default is true.
 */
export const CodeAnalysisForceOutput = makeTag<CodeAnalysisForceOutputProps>("CodeAnalysisForceOutput")

/**
 * Indicates whether Code Analysis generates a '$(CodeAnalysisInputAssembly).lastcodeanalysissucceeded' file in the output folder when no build-breaking errors occur. The default is true.
 */
export interface CodeAnalysisGenerateSuccessFileProps {

}

/**
 * Indicates whether Code Analysis generates a '$(CodeAnalysisInputAssembly).lastcodeanalysissucceeded' file in the output folder when no build-breaking errors occur. The default is true.
 */
export const CodeAnalysisGenerateSuccessFile = makeTag<CodeAnalysisGenerateSuccessFileProps>("CodeAnalysisGenerateSuccessFile")

/**
 * Indicates whether Code Analysis will ignore the default rule directories when searching for rules. The default is false.
 */
export interface CodeAnalysisIgnoreBuiltInRulesProps {

}

/**
 * Indicates whether Code Analysis will ignore the default rule directories when searching for rules. The default is false.
 */
export const CodeAnalysisIgnoreBuiltInRules = makeTag<CodeAnalysisIgnoreBuiltInRulesProps>("CodeAnalysisIgnoreBuiltInRules")

/**
 * Indicates whether Code Analysis will ignore the default rule set directories when searching for rule sets. The default is false.
 */
export interface CodeAnalysisIgnoreBuiltInRuleSetsProps {

}

/**
 * Indicates whether Code Analysis will ignore the default rule set directories when searching for rule sets. The default is false.
 */
export const CodeAnalysisIgnoreBuiltInRuleSets = makeTag<CodeAnalysisIgnoreBuiltInRuleSetsProps>("CodeAnalysisIgnoreBuiltInRuleSets")

/**
 * Indicates whether Code Analysis should fail silently when it analyzes invalid assemblies, such as those without managed code. The default is true.
 */
export interface CodeAnalysisIgnoreGeneratedCodeProps {

}

/**
 * Indicates whether Code Analysis should fail silently when it analyzes invalid assemblies, such as those without managed code. The default is true.
 */
export const CodeAnalysisIgnoreGeneratedCode = makeTag<CodeAnalysisIgnoreGeneratedCodeProps>("CodeAnalysisIgnoreGeneratedCode")

/**
 * Indicates whether Code Analysis should silently fail when analyzing invalid assemblies, such as those without managed code. The default is true.
 */
export interface CodeAnalysisIgnoreInvalidTargetsProps {

}

/**
 * Indicates whether Code Analysis should silently fail when analyzing invalid assemblies, such as those without managed code. The default is true.
 */
export const CodeAnalysisIgnoreInvalidTargets = makeTag<CodeAnalysisIgnoreInvalidTargetsProps>("CodeAnalysisIgnoreInvalidTargets")

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
 * Code Analysis projects (*.fxcop) or reports to import.
 */
export const CodeAnalysisImport = makeTag<CodeAnalysisImportProps>("CodeAnalysisImport")

/**
 * Path to the assembly to be analyzed by Code Analysis. The default is '$(OutDir)$(TargetName)$(TargetExt)'.
 */
export interface CodeAnalysisInputAssemblyProps extends StringPropertyTypeProps {

}

/**
 * Path to the assembly to be analyzed by Code Analysis. The default is '$(OutDir)$(TargetName)$(TargetExt)'.
 */
export const CodeAnalysisInputAssembly = makeTag<CodeAnalysisInputAssemblyProps>("CodeAnalysisInputAssembly")

/**
 * Path to the output file for the Code Analysis report. The default is '$(CodeAnalysisInputAssembly).CodeAnalysisLog.xml'.
 */
export interface CodeAnalysisLogFileProps extends StringPropertyTypeProps {

}

/**
 * Path to the output file for the Code Analysis report. The default is '$(CodeAnalysisInputAssembly).CodeAnalysisLog.xml'.
 */
export const CodeAnalysisLogFile = makeTag<CodeAnalysisLogFileProps>("CodeAnalysisLogFile")

/**
 * Path to the XSL style sheet to reference in the Code Analysis output report. This report is specified in $(CodeAnalysisLogFile). The default is an empty string ('').
 */
export interface CodeAnalysisLogFileXslProps extends StringPropertyTypeProps {

}

/**
 * Path to the XSL style sheet to reference in the Code Analysis output report. This report is specified in $(CodeAnalysisLogFile). The default is an empty string ('').
 */
export const CodeAnalysisLogFileXsl = makeTag<CodeAnalysisLogFileXslProps>("CodeAnalysisLogFileXsl")

/**
 * Name of the file, without the path, where Code Analysis project-level suppressions are stored. The default is 'GlobalSuppressions$(DefaultLanguageSourceExtension)'.
 */
export interface CodeAnalysisModuleSuppressionsFileProps extends StringPropertyTypeProps {

}

/**
 * Name of the file, without the path, where Code Analysis project-level suppressions are stored. The default is 'GlobalSuppressions$(DefaultLanguageSourceExtension)'.
 */
export const CodeAnalysisModuleSuppressionsFile = makeTag<CodeAnalysisModuleSuppressionsFileProps>("CodeAnalysisModuleSuppressionsFile")

/**
 * Indicates whether to output Code Analysis warnings and errors to the console. The default is false.
 */
export interface CodeAnalysisOutputToConsoleProps {

}

/**
 * Indicates whether to output Code Analysis warnings and errors to the console. The default is false.
 */
export const CodeAnalysisOutputToConsole = makeTag<CodeAnalysisOutputToConsoleProps>("CodeAnalysisOutputToConsole")

/**
 * Indicates whether to run all overridable Code Analysis rules against all targets. This will cause specific rules, such as those within the Design and Naming categories, to run against both public and internal APIs, instead of only public APIs. The default is false.
 */
export interface CodeAnalysisOverrideRuleVisibilitiesProps {

}

/**
 * Indicates whether to run all overridable Code Analysis rules against all targets. This will cause specific rules, such as those within the Design and Naming categories, to run against both public and internal APIs, instead of only public APIs. The default is false.
 */
export const CodeAnalysisOverrideRuleVisibilities = makeTag<CodeAnalysisOverrideRuleVisibilitiesProps>("CodeAnalysisOverrideRuleVisibilities")

/**
 * Path to the Code Analysis installation folder. The default is '$(VSINSTALLDIR)\Team Tools\Static Analysis Tools\FxCop'.
 */
export interface CodeAnalysisPathProps extends StringPropertyTypeProps {

}

/**
 * Path to the Code Analysis installation folder. The default is '$(VSINSTALLDIR)\Team Tools\Static Analysis Tools\FxCop'.
 */
export const CodeAnalysisPath = makeTag<CodeAnalysisPathProps>("CodeAnalysisPath")

/**
 * Path to the .NET Framework folder that contains platform assemblies, such as mscorlib.dll and System.dll. The default is an empty string ('').
 */
export interface CodeAnalysisPlatformPathProps extends StringPropertyTypeProps {

}

/**
 * Path to the .NET Framework folder that contains platform assemblies, such as mscorlib.dll and System.dll. The default is an empty string ('').
 */
export const CodeAnalysisPlatformPath = makeTag<CodeAnalysisPlatformPathProps>("CodeAnalysisPlatformPath")

/**
 * Path to the Code Analysis project (*.fxcop) to load. The default is an empty string ('').
 */
export interface CodeAnalysisProjectProps extends StringPropertyTypeProps {

}

/**
 * Path to the Code Analysis project (*.fxcop) to load. The default is an empty string ('').
 */
export const CodeAnalysisProject = makeTag<CodeAnalysisProjectProps>("CodeAnalysisProject")

/**
 * Indicates whether to suppress all Code Analysis console output other than errors and warnings. This applies when $(CodeAnalysisOutputToConsole) is true. The default is false.
 */
export interface CodeAnalysisQuietProps {

}

/**
 * Indicates whether to suppress all Code Analysis console output other than errors and warnings. This applies when $(CodeAnalysisOutputToConsole) is true. The default is false.
 */
export const CodeAnalysisQuiet = makeTag<CodeAnalysisQuietProps>("CodeAnalysisQuiet")

/**
 * Semicolon-separated list of paths either to Code Analysis rule assemblies or to folders that contain Code Analysis rule assemblies. The paths are in the form '[+|-][!][file|folder]', where '+' enables all rules in rule assembly, '-' disables all rules in rule assembly, and '!' causes all rules in rule assembly to be treated as errors. For example '+D:\Projects\Rules\NamingRules.dll;+!D:\Projects\Rules\SecurityRules.dll'. The default is '$(CodeAnalysisPath)\Rules'.
 */
export interface CodeAnalysisRuleAssembliesProps extends StringPropertyTypeProps {

}

/**
 * Semicolon-separated list of paths either to Code Analysis rule assemblies or to folders that contain Code Analysis rule assemblies. The paths are in the form '[+|-][!][file|folder]', where '+' enables all rules in rule assembly, '-' disables all rules in rule assembly, and '!' causes all rules in rule assembly to be treated as errors. For example '+D:\Projects\Rules\NamingRules.dll;+!D:\Projects\Rules\SecurityRules.dll'. The default is '$(CodeAnalysisPath)\Rules'.
 */
export const CodeAnalysisRuleAssemblies = makeTag<CodeAnalysisRuleAssembliesProps>("CodeAnalysisRuleAssemblies")

/**
 * Semicolon-separated list of directories in which to search for rules when resolving a rule set. The default is '$(CodeAnalysisPath)\Rules' unless the CodeAnalysisIgnoreBuiltInRules property is set to true.
 */
export interface CodeAnalysisRuleDirectoriesProps extends StringPropertyTypeProps {

}

/**
 * Semicolon-separated list of directories in which to search for rules when resolving a rule set. The default is '$(CodeAnalysisPath)\Rules' unless the CodeAnalysisIgnoreBuiltInRules property is set to true.
 */
export const CodeAnalysisRuleDirectories = makeTag<CodeAnalysisRuleDirectoriesProps>("CodeAnalysisRuleDirectories")

/**
 * Semicolon-separated list of Code Analysis rules. The rules are in the form '[+|-][!]Category#CheckId', where '+' enables the rule, '-' disables the rule, and '!' causes the rule to be treated as an error. For example, '-Microsoft.Naming#CA1700;+!Microsoft.Naming#CA1701'. The default is an empty string ('') which enables all rules.
 */
export interface CodeAnalysisRulesProps extends StringPropertyTypeProps {

}

/**
 * Semicolon-separated list of Code Analysis rules. The rules are in the form '[+|-][!]Category#CheckId', where '+' enables the rule, '-' disables the rule, and '!' causes the rule to be treated as an error. For example, '-Microsoft.Naming#CA1700;+!Microsoft.Naming#CA1701'. The default is an empty string ('') which enables all rules.
 */
export const CodeAnalysisRules = makeTag<CodeAnalysisRulesProps>("CodeAnalysisRules")

/**
 * A .ruleset file which contains a list of rules to run during analysis. The string can be a full path, a path relative to the project file, or a file name. If a file name is specified, the CodeAnalysisRuleSetDirectories property will be searched to find the file. The default is an empty string ('').
 */
export interface CodeAnalysisRuleSetProps extends StringPropertyTypeProps {

}

/**
 * A .ruleset file which contains a list of rules to run during analysis. The string can be a full path, a path relative to the project file, or a file name. If a file name is specified, the CodeAnalysisRuleSetDirectories property will be searched to find the file. The default is an empty string ('').
 */
export const CodeAnalysisRuleSet = makeTag<CodeAnalysisRuleSetProps>("CodeAnalysisRuleSet")

/**
 * Semicolon-separated list of directories in which to search for rule sets. The default is '$(VSINSTALLDIR)\Team Tools\Static Analysis Tools\Rule Sets' unless the CodeAnalysisIgnoreBuiltInRuleSets property is set to true.
 */
export interface CodeAnalysisRuleSetDirectoriesProps extends StringPropertyTypeProps {

}

/**
 * Semicolon-separated list of directories in which to search for rule sets. The default is '$(VSINSTALLDIR)\Team Tools\Static Analysis Tools\Rule Sets' unless the CodeAnalysisIgnoreBuiltInRuleSets property is set to true.
 */
export const CodeAnalysisRuleSetDirectories = makeTag<CodeAnalysisRuleSetDirectoriesProps>("CodeAnalysisRuleSetDirectories")

/**
 * Comma-separated list of the type ('Active', 'Excluded', or 'Absent') of warnings and errors to save to the output report file. The default is 'Active'.
 */
export interface CodeAnalysisSaveMessagesToReportProps extends StringPropertyTypeProps {

}

/**
 * Comma-separated list of the type ('Active', 'Excluded', or 'Absent') of warnings and errors to save to the output report file. The default is 'Active'.
 */
export const CodeAnalysisSaveMessagesToReport = makeTag<CodeAnalysisSaveMessagesToReportProps>("CodeAnalysisSaveMessagesToReport")

/**
 * Indicates whether Code Analysis should search the Global Assembly Cache (GAC) for missing references that are encountered during analysis. The default is true.
 */
export interface CodeAnalysisSearchGlobalAssemblyCacheProps {

}

/**
 * Indicates whether Code Analysis should search the Global Assembly Cache (GAC) for missing references that are encountered during analysis. The default is true.
 */
export const CodeAnalysisSearchGlobalAssemblyCache = makeTag<CodeAnalysisSearchGlobalAssemblyCacheProps>("CodeAnalysisSearchGlobalAssemblyCache")

/**
 * Indicates whether to output a Code Analysis summary to the console after analysis. The default is false.
 */
export interface CodeAnalysisSummaryProps {

}

/**
 * Indicates whether to output a Code Analysis summary to the console after analysis. The default is false.
 */
export const CodeAnalysisSummary = makeTag<CodeAnalysisSummaryProps>("CodeAnalysisSummary")

/**
 * The time, in seconds, that Code Analysis should wait for analysis of a single item to complete before it aborts analysis. Specify 0 to cause Code Analysis to wait indefinitely. The default is 120.
 */
export interface CodeAnalysisTimeoutProps extends StringPropertyTypeProps {

}

/**
 * The time, in seconds, that Code Analysis should wait for analysis of a single item to complete before it aborts analysis. Specify 0 to cause Code Analysis to wait indefinitely. The default is 120.
 */
export const CodeAnalysisTimeout = makeTag<CodeAnalysisTimeoutProps>("CodeAnalysisTimeout")

/**
 * Indicates whether to treat all Code Analysis warnings as errors. The default is false.
 */
export interface CodeAnalysisTreatWarningsAsErrorsProps {

}

/**
 * Indicates whether to treat all Code Analysis warnings as errors. The default is false.
 */
export const CodeAnalysisTreatWarningsAsErrors = makeTag<CodeAnalysisTreatWarningsAsErrorsProps>("CodeAnalysisTreatWarningsAsErrors")

/**
 * Indicates whether to update the Code Analysis project (*.fxcop) specified in $(CodeAnalysisProject). This applies when there are changes during analysis. The default is false.
 */
export interface CodeAnalysisUpdateProjectProps {

}

/**
 * Indicates whether to update the Code Analysis project (*.fxcop) specified in $(CodeAnalysisProject). This applies when there are changes during analysis. The default is false.
 */
export const CodeAnalysisUpdateProject = makeTag<CodeAnalysisUpdateProjectProps>("CodeAnalysisUpdateProject")

/**
 * Indicates whether to include the name of the rule when Code Analysis emits a suppression. The default is true.
 */
export interface CodeAnalysisUseTypeNameInSuppressionProps {

}

/**
 * Indicates whether to include the name of the rule when Code Analysis emits a suppression. The default is true.
 */
export const CodeAnalysisUseTypeNameInSuppression = makeTag<CodeAnalysisUseTypeNameInSuppressionProps>("CodeAnalysisUseTypeNameInSuppression")

/**
 * Indicates whether to output verbose Code Analysis diagnostic info to the console. The default is false.
 */
export interface CodeAnalysisVerboseProps {

}

/**
 * Indicates whether to output verbose Code Analysis diagnostic info to the console. The default is false.
 */
export const CodeAnalysisVerbose = makeTag<CodeAnalysisVerboseProps>("CodeAnalysisVerbose")

export interface CodePageProps extends StringPropertyTypeProps {

}

export const CodePage = makeTag<CodePageProps>("CodePage")

export interface CombinePathProps extends TaskTypeProps {
  BasePath?: unknown
  CombinedPaths?: unknown
  Paths: unknown
}

export const CombinePath = makeTag<CombinePathProps>("CombinePath")

export interface COMFileReferenceProps extends SimpleItemTypeProps {

}

export const COMFileReference = makeTag<COMFileReferenceProps>("COMFileReference")

export interface ComFilesOutputGroupOutputsProps extends SimpleItemTypeProps {

}

export const ComFilesOutputGroupOutputs = makeTag<ComFilesOutputGroupOutputsProps>("ComFilesOutputGroupOutputs")

export interface CommandProps {

}

export const Command = makeTag<CommandProps>("Command")

/**
 * Company name for the assembly manifest
 */
export interface CompanyProps extends StringPropertyTypeProps {

}

/**
 * Company name for the assembly manifest
 */
export const Company = makeTag<CompanyProps>("Company")

/**
 * Source files for compiler
 */
export interface CompileProps extends SimpleItemTypeProps {
  /**
   * Semi-colon separated list of source files (wildcards are allowed)
   */
  Include?: string
  CopyToOutputDirectory?: unknown
}

/**
 * Source files for compiler
 */
export const Compile = makeTag<CompileProps>("Compile")

export interface CompileAsManagedProps {

}

export const CompileAsManaged = makeTag<CompileAsManagedProps>("CompileAsManaged")

/**
 * Controls where source generated files are saved.
 */
export interface CompilerGeneratedFilesOutputPathProps extends StringPropertyTypeProps {

}

/**
 * Controls where source generated files are saved.
 */
export const CompilerGeneratedFilesOutputPath = makeTag<CompilerGeneratedFilesOutputPathProps>("CompilerGeneratedFilesOutputPath")

export interface ComponentFileNameProps {

}

export const ComponentFileName = makeTag<ComponentFileNameProps>("ComponentFileName")

/**
 * Reference to a COM component
 */
export interface COMReferenceProps extends SimpleItemTypeProps {
  /**
   * COM component name
   */
  Include?: string
}

/**
 * Reference to a COM component
 */
export const COMReference = makeTag<COMReferenceProps>("COMReference")

export interface ConfigurationProps extends StringPropertyTypeProps {

}

export const Configuration = makeTag<ConfigurationProps>("Configuration")

export interface ConfigurationNameProps extends StringPropertyTypeProps {

}

export const ConfigurationName = makeTag<ConfigurationNameProps>("ConfigurationName")

export interface ConfigurationOverrideFileProps extends StringPropertyTypeProps {

}

export const ConfigurationOverrideFile = makeTag<ConfigurationOverrideFileProps>("ConfigurationOverrideFile")

export interface ConfigurationTypeProps extends StringPropertyTypeProps {

}

export const ConfigurationType = makeTag<ConfigurationTypeProps>("ConfigurationType")

/**
 * Files that are not compiled, but may be embedded or published
 */
export interface ContentProps extends SimpleItemTypeProps {
  /**
   * Semi-colon separated list of content files (wildcards are allowed)
   */
  Include?: string
  CopyToOutputDirectory?: unknown
}

/**
 * Files that are not compiled, but may be embedded or published
 */
export const Content = makeTag<ContentProps>("Content")

export interface ConvertToAbsolutePathProps extends TaskTypeProps {
  AbsolutePaths?: unknown
  Paths: unknown
}

export const ConvertToAbsolutePath = makeTag<ConvertToAbsolutePathProps>("ConvertToAbsolutePath")

export interface CopyProps extends TaskTypeProps {
  DestinationFiles?: unknown
  DestinationFolder?: unknown
  OverwriteReadOnlyFiles?: boolean
  Retries?: unknown
  RetryDelayMilliseconds?: unknown
  SkipUnchangedFiles?: boolean
  UseHardlinksIfPossible?: boolean
  UseSymboliclinksIfPossible?: boolean
  SourceFiles: unknown
}

export const Copy = makeTag<CopyProps>("Copy")

/**
 * Value indicating whether symbol files will be copied from NuGet packages by the compiler
 */
export interface CopyDebugSymbolFilesFromPackagesProps {

}

/**
 * Value indicating whether symbol files will be copied from NuGet packages by the compiler
 */
export const CopyDebugSymbolFilesFromPackages = makeTag<CopyDebugSymbolFilesFromPackagesProps>("CopyDebugSymbolFilesFromPackages")

/**
 * Value indicating whether documentation files will be copied from NuGet packages by the compiler
 */
export interface CopyDocumentationFilesFromPackagesProps {

}

/**
 * Value indicating whether documentation files will be copied from NuGet packages by the compiler
 */
export const CopyDocumentationFilesFromPackages = makeTag<CopyDocumentationFilesFromPackagesProps>("CopyDocumentationFilesFromPackages")

export interface CopyLocalFilesOutputGroupOutputProps extends SimpleItemTypeProps {

}

export const CopyLocalFilesOutputGroupOutput = makeTag<CopyLocalFilesOutputGroupOutputProps>("CopyLocalFilesOutputGroupOutput")

/**
 * Set to true to copy RazorGenerate items (.cshtml) to the publish directory. Typically Razor files are not needed for a published application if they participate in compilation at build-time or publish-time. By default, the Razor SDK will suppress the copying of RazorGenerate items to the publish directory.
 */
export interface CopyRazorGenerateFilesToPublishDirectoryProps {

}

/**
 * Set to true to copy RazorGenerate items (.cshtml) to the publish directory. Typically Razor files are not needed for a published application if they participate in compilation at build-time or publish-time. By default, the Razor SDK will suppress the copying of RazorGenerate items to the publish directory.
 */
export const CopyRazorGenerateFilesToPublishDirectory = makeTag<CopyRazorGenerateFilesToPublishDirectoryProps>("CopyRazorGenerateFilesToPublishDirectory")

/**
 * Set to true to copy reference assembly items to the publish directory. Typically reference assemblies are not needed for a published application if Razor compilation occurs at build-time or publish-time. By default, the Razor SDK will suppress the copying of reference assemblies to the publish directory.
 */
export interface CopyRefAssembliesToPublishDirectoryProps {

}

/**
 * Set to true to copy reference assembly items to the publish directory. Typically reference assemblies are not needed for a published application if Razor compilation occurs at build-time or publish-time. By default, the Razor SDK will suppress the copying of reference assemblies to the publish directory.
 */
export const CopyRefAssembliesToPublishDirectory = makeTag<CopyRefAssembliesToPublishDirectoryProps>("CopyRefAssembliesToPublishDirectory")

/**
 * Copyright details for the NuGet package
 */
export interface CopyrightProps extends StringPropertyTypeProps {

}

/**
 * Copyright details for the NuGet package
 */
export const Copyright = makeTag<CopyrightProps>("Copyright")

export interface CopyWinmdArtifactsOutputGroupOutputsProps extends SimpleItemTypeProps {

}

export const CopyWinmdArtifactsOutputGroupOutputs = makeTag<CopyWinmdArtifactsOutputGroupOutputsProps>("CopyWinmdArtifactsOutputGroupOutputs")

export interface CPPCleanProps extends TaskTypeProps {
  DeletedFiles?: unknown
  DoDelete?: boolean
  FilePatternsToDeleteOnClean: unknown
  FilesExcludedFromClean?: unknown
  FoldersToClean: unknown
}

export const CPPClean = makeTag<CPPCleanProps>("CPPClean")

export interface CPreprocessOptionsProps {

}

export const CPreprocessOptions = makeTag<CPreprocessOptionsProps>("CPreprocessOptions")

export interface CreateAppStoreContainerProps extends TaskTypeProps {
  Items: unknown
  ProjectName: unknown
  OutputPath?: unknown
}

export const CreateAppStoreContainer = makeTag<CreateAppStoreContainerProps>("CreateAppStoreContainer")

export interface CreateCSharpManifestResourceNameProps extends TaskTypeProps {
  PrependCultureAsDirectory?: boolean
  ResourceFiles: unknown
  ResourceFilesWithManifestResourceNames?: unknown
  RootNamespace?: unknown
}

export const CreateCSharpManifestResourceName = makeTag<CreateCSharpManifestResourceNameProps>("CreateCSharpManifestResourceName")

export interface CreateDesktopShortcutProps {

}

export const CreateDesktopShortcut = makeTag<CreateDesktopShortcutProps>("CreateDesktopShortcut")

export interface CreateHotpatchableImageProps {

}

export const CreateHotpatchableImage = makeTag<CreateHotpatchableImageProps>("CreateHotpatchableImage")

export interface CreateHotPatchableImageProps {

}

export const CreateHotPatchableImage = makeTag<CreateHotPatchableImageProps>("CreateHotPatchableImage")

export interface CreateItemProps extends TaskTypeProps {
  AdditionalMetadata?: unknown
  Exclude?: unknown
  Include?: unknown
  PreserveExistingMetadata?: boolean
}

export const CreateItem = makeTag<CreateItemProps>("CreateItem")

export interface CreatePriConfigXmlForFullIndexProps extends CreatePriConfigXmlTaskTypeProps {
  LayoutResfilesPath: unknown
  ResourcesResfilesPath: unknown
  PriResfilesPath: unknown
}

export const CreatePriConfigXmlForFullIndex = makeTag<CreatePriConfigXmlForFullIndexProps>("CreatePriConfigXmlForFullIndex")

export interface CreatePriConfigXmlForMainPackageFileMapProps extends CreatePriConfigXmlWithPackagingElementTaskTypeProps {
  AppxBundleAutoResourcePackageQualifiers: unknown
}

export const CreatePriConfigXmlForMainPackageFileMap = makeTag<CreatePriConfigXmlForMainPackageFileMapProps>("CreatePriConfigXmlForMainPackageFileMap")

export interface CreatePriConfigXmlForSplittingProps extends CreatePriConfigXmlWithPackagingElementTaskTypeProps {
  ResourcesPriFilePath: unknown
}

export const CreatePriConfigXmlForSplitting = makeTag<CreatePriConfigXmlForSplittingProps>("CreatePriConfigXmlForSplitting")

export interface CreatePriConfigXmlTaskProps extends CreatePriConfigXmlTaskTypeProps {
  PriConfigXmlPath: unknown
  PriInitialPath?: unknown
  DefaultResourceLanguage: unknown
  DefaultResourceQualifiers: unknown
  ConvertDotsToSlashes?: boolean
  IntermediateExtension: unknown
  PriConfigXmlPackagingSnippetPath?: unknown
  PriConfigXmlDefaultSnippetPath?: unknown
  TargetPlatformIdentifier: unknown
  TargetPlatformVersion: unknown
}

export const CreatePriConfigXmlTask = makeTag<CreatePriConfigXmlTaskProps>("CreatePriConfigXmlTask")

interface CreatePriConfigXmlTaskTypeProps {
  PriConfigXmlPath: unknown
  PriInitialPath?: unknown
  DefaultResourceLanguage: unknown
  DefaultResourceQualifiers: unknown
  ConvertDotsToSlashes?: boolean
  IntermediateExtension: unknown
  PriConfigXmlPackagingSnippetPath?: unknown
  PriConfigXmlDefaultSnippetPath?: unknown
  TargetPlatformIdentifier: unknown
  TargetPlatformVersion: unknown
}

export const CreatePriConfigXmlTaskType = makeTag<CreatePriConfigXmlTaskTypeProps>("CreatePriConfigXmlTaskType")

interface CreatePriConfigXmlWithPackagingElementTaskTypeProps {
  AppxBundleAutoResourcePackageQualifiers: unknown
}

export const CreatePriConfigXmlWithPackagingElementTaskType = makeTag<CreatePriConfigXmlWithPackagingElementTaskTypeProps>("CreatePriConfigXmlWithPackagingElementTaskType")

export interface CreatePriFilesForPortableLibrariesProps extends TaskTypeProps {
  ContentToIndex: unknown
  MakePriExeFullPath: unknown
  MakePriExtensionPath?: unknown
  IntermediateDirectory: unknown
  DefaultResourceLanguage: unknown
  DefaultResourceQualifiers: unknown
  IntermediateFileWrites?: unknown
  CreatedPriFiles?: unknown
  IntermediateExtension: unknown
  AdditionalMakepriExeParameters?: unknown
  TargetPlatformIdentifier: unknown
  TargetPlatformVersion: unknown
}

export const CreatePriFilesForPortableLibraries = makeTag<CreatePriFilesForPortableLibrariesProps>("CreatePriFilesForPortableLibraries")

export interface CreatePropertyProps extends TaskTypeProps {
  Value?: unknown
}

export const CreateProperty = makeTag<CreatePropertyProps>("CreateProperty")

export interface CreateVisualBasicManifestResourceNameProps extends TaskTypeProps {
  PrependCultureAsDirectory?: boolean
  ResourceFiles: unknown
  ResourceFilesWithManifestResourceNames?: unknown
  RootNamespace?: unknown
}

export const CreateVisualBasicManifestResourceName = makeTag<CreateVisualBasicManifestResourceNameProps>("CreateVisualBasicManifestResourceName")

/**
 * boolean
 */
export interface CreateWebPageOnPublishProps {

}

/**
 * boolean
 */
export const CreateWebPageOnPublish = makeTag<CreateWebPageOnPublishProps>("CreateWebPageOnPublish")

export interface CscProps extends TaskTypeProps {
  AdditionalLibPaths?: unknown
  AddModules?: unknown
  AllowUnsafeBlocks?: boolean
  BaseAddress?: unknown
  CheckForOverflowUnderflow?: boolean
  CodePage?: unknown
  DebugType?: unknown
  DefineConstants?: unknown
  DelaySign?: boolean
  DisabledWarnings?: unknown
  DocumentationFile?: unknown
  EmitDebugInformation?: boolean
  EnvironmentVariables?: unknown
  ErrorReport?: unknown
  FileAlignment?: unknown
  GenerateFullPaths?: boolean
  KeyContainer?: unknown
  KeyFile?: unknown
  LangVersion?: unknown
  LinkResources?: unknown
  LogStandardErrorAsError?: boolean
  MainEntryPoint?: unknown
  ModuleAssemblyName?: unknown
  NoConfig?: boolean
  NoLogo?: boolean
  NoStandardLib?: boolean
  NoWin32Manifest?: boolean
  Optimize?: boolean
  OutputAssembly?: unknown
  PdbFile?: unknown
  Platform?: unknown
  References?: unknown
  Resources?: unknown
  ResponseFiles?: unknown
  Sources?: unknown
  StandardErrorImportance?: unknown
  StandardOutputImportance?: unknown
  TargetType?: unknown
  Timeout?: unknown
  ToolExe?: unknown
  ToolPath?: unknown
  TreatWarningsAsErrors?: boolean
  UseHostCompilerIfAvailable?: boolean
  Utf8Output?: boolean
  WarningLevel?: unknown
  WarningsAsErrors?: unknown
  WarningsNotAsErrors?: unknown
  Win32Icon?: unknown
  Win32Manifest?: unknown
  Win32Resource?: unknown
}

export const Csc = makeTag<CscProps>("Csc")

export interface CultureProps {

}

export const Culture = makeTag<CultureProps>("Culture")

export interface CurrentSolutionConfigurationContentsProps extends GenericPropertyTypeProps {
  /**
   * Optional expression evaluated to determine whether the property should be evaluated
   */
  Condition?: string
  /**
   * Optional expression. Used to identify or order system and user elements
   */
  Label?: string
}

export const CurrentSolutionConfigurationContents = makeTag<CurrentSolutionConfigurationContentsProps>("CurrentSolutionConfigurationContents")

export interface CustomBuildStepProps extends SimpleItemTypeProps {

}

export const CustomBuildStep = makeTag<CustomBuildStepProps>("CustomBuildStep")

export interface DataExecutionPreventionProps {

}

export const DataExecutionPrevention = makeTag<DataExecutionPreventionProps>("DataExecutionPrevention")

export interface DebugInformationFormatProps {

}

export const DebugInformationFormat = makeTag<DebugInformationFormatProps>("DebugInformationFormat")

export interface DebugSecurityZoneURLProps extends StringPropertyTypeProps {

}

export const DebugSecurityZoneURL = makeTag<DebugSecurityZoneURLProps>("DebugSecurityZoneURL")

/**
 * Whether to emit symbols (boolean)
 */
export interface DebugSymbolsProps {

}

/**
 * Whether to emit symbols (boolean)
 */
export const DebugSymbols = makeTag<DebugSymbolsProps>("DebugSymbols")

/**
 * none, pdbonly, embedded, portable, or full. From C# 6 onwards, pdbonly is the same as full.
 */
export interface DebugTypeProps {

}

/**
 * none, pdbonly, embedded, portable, or full. From C# 6 onwards, pdbonly is the same as full.
 */
export const DebugType = makeTag<DebugTypeProps>("DebugType")

export interface DefaultCharTypeProps {

}

export const DefaultCharType = makeTag<DefaultCharTypeProps>("DefaultCharType")

export interface DefaultClientScriptProps extends StringPropertyTypeProps {

}

export const DefaultClientScript = makeTag<DefaultClientScriptProps>("DefaultClientScript")

export interface DefaultHTMLPageLayoutProps extends StringPropertyTypeProps {

}

export const DefaultHTMLPageLayout = makeTag<DefaultHTMLPageLayoutProps>("DefaultHTMLPageLayout")

/**
 * Default resource language.
 */
export interface DefaultLanguageProps extends StringPropertyTypeProps {

}

/**
 * Default resource language.
 */
export const DefaultLanguage = makeTag<DefaultLanguageProps>("DefaultLanguage")

export interface DefaultTargetSchemaProps extends StringPropertyTypeProps {

}

export const DefaultTargetSchema = makeTag<DefaultTargetSchemaProps>("DefaultTargetSchema")

export interface DefineConstantsProps extends StringPropertyTypeProps {

}

export const DefineConstants = makeTag<DefineConstantsProps>("DefineConstants")

/**
 * Whether DEBUG is defined (boolean)
 */
export interface DefineDebugProps {

}

/**
 * Whether DEBUG is defined (boolean)
 */
export const DefineDebug = makeTag<DefineDebugProps>("DefineDebug")

/**
 * Whether TRACE is defined (boolean)
 */
export interface DefineTraceProps {

}

/**
 * Whether TRACE is defined (boolean)
 */
export const DefineTrace = makeTag<DefineTraceProps>("DefineTrace")

export interface DelayLoadDLLsProps {

}

export const DelayLoadDLLs = makeTag<DelayLoadDLLsProps>("DelayLoadDLLs")

export interface DelaySignProps extends StringPropertyTypeProps {

}

export const DelaySign = makeTag<DelaySignProps>("DelaySign")

export interface DeleteProps extends TaskTypeProps {
  DeletedFiles?: unknown
  Files: unknown
  TreatErrorsAsWarnings?: boolean
}

export const Delete = makeTag<DeleteProps>("Delete")

export interface DependencyInformationFileProps {

}

export const DependencyInformationFile = makeTag<DependencyInformationFileProps>("DependencyInformationFile")

export interface DeployDirSuffixProps extends StringPropertyTypeProps {

}

export const DeployDirSuffix = makeTag<DeployDirSuffixProps>("DeployDirSuffix")

/**
 * A long description of the NuGet package for UI display
 */
export interface DescriptionProps extends StringPropertyTypeProps {

}

/**
 * A long description of the NuGet package for UI display
 */
export const Description = makeTag<DescriptionProps>("Description")

/**
 * Whether Visual Studio should do its own faster up-to-date check before Building, rather than invoke MSBuild to do a possibly more accurate one. You would set this to true if you have a heavily customized build process and builds in Visual Studio are not occurring when they should.
 */
export interface DisableFastUpToDateCheckProps {

}

/**
 * Whether Visual Studio should do its own faster up-to-date check before Building, rather than invoke MSBuild to do a possibly more accurate one. You would set this to true if you have a heavily customized build process and builds in Visual Studio are not occurring when they should.
 */
export const DisableFastUpToDateCheck = makeTag<DisableFastUpToDateCheckProps>("DisableFastUpToDateCheck")

export interface DisableLangXtnsProps extends StringPropertyTypeProps {

}

export const DisableLangXtns = makeTag<DisableLangXtnsProps>("DisableLangXtns")

/**
 * Indicates whether Design Time Build should be disabled for referenced @(Protobuf) files.
 */
export interface DisableProtobufDesignTimeBuildProps {

}

/**
 * Indicates whether Design Time Build should be disabled for referenced @(Protobuf) files.
 */
export const DisableProtobufDesignTimeBuild = makeTag<DisableProtobufDesignTimeBuildProps>("DisableProtobufDesignTimeBuild")

export interface DisableSpecificWarningsProps {

}

export const DisableSpecificWarnings = makeTag<DisableSpecificWarningsProps>("DisableSpecificWarnings")

/**
 * When true, do not discover ProjectReference items representing projects referenced by this project's ProjectReferences. Applies only to projects using the .NET SDK.
 */
export interface DisableTransitiveProjectReferencesProps {

}

/**
 * When true, do not discover ProjectReference items representing projects referenced by this project's ProjectReferences. Applies only to projects using the .NET SDK.
 */
export const DisableTransitiveProjectReferences = makeTag<DisableTransitiveProjectReferencesProps>("DisableTransitiveProjectReferences")

export interface DisableXbfGenerationProps {

}

export const DisableXbfGeneration = makeTag<DisableXbfGenerationProps>("DisableXbfGeneration")

/**
 * boolean
 */
export interface DisallowUrlActivationProps {

}

/**
 * boolean
 */
export const DisallowUrlActivation = makeTag<DisallowUrlActivationProps>("DisallowUrlActivation")

export interface DllDataFileNameProps {

}

export const DllDataFileName = makeTag<DllDataFileNameProps>("DllDataFileName")

export interface DocumentationFileProps extends StringPropertyTypeProps {

}

export const DocumentationFile = makeTag<DocumentationFileProps>("DocumentationFile")

/**
 * The CLI tool that the user wants restored in the context of the project
 */
export interface DotNetCliToolReferenceProps extends SimpleItemTypeProps {
  /**
   * Package name of the tool. This may differ from its associated reference package name.
   */
  Include?: string
  /**
   * Version of dependency
   */
  Version?: string
}

/**
 * The CLI tool that the user wants restored in the context of the project
 */
export const DotNetCliToolReference = makeTag<DotNetCliToolReferenceProps>("DotNetCliToolReference")

export interface DownloadFileProps extends TaskTypeProps {
  DestinationFileName?: unknown
  DestinationFolder: unknown
  DownloadedFile?: unknown
  Retries?: unknown
  RetryDelayMilliseconds?: unknown
  SkipUnchangedFiles?: unknown
  SourceUrl: unknown
  Timeout?: unknown
}

export const DownloadFile = makeTag<DownloadFileProps>("DownloadFile")

export interface DriverProps {

}

export const Driver = makeTag<DriverProps>("Driver")

/**
 * Resources to be embedded in the generated assembly
 */
export interface EmbeddedResourceProps extends SimpleItemTypeProps {
  /**
   * Semi-colon separated list of resource files (wildcards are allowed)
   */
  Include?: string
  CopyToOutputDirectory?: unknown
}

/**
 * Resources to be embedded in the generated assembly
 */
export const EmbeddedResource = makeTag<EmbeddedResourceProps>("EmbeddedResource")

export interface EmbedManagedResourceFileProps {

}

export const EmbedManagedResourceFile = makeTag<EmbedManagedResourceFileProps>("EmbedManagedResourceFile")

export interface EmbedManifestProps extends StringPropertyTypeProps {

}

export const EmbedManifest = makeTag<EmbedManifestProps>("EmbedManifest")

/**
 * Configures whether all of the @(RazorGenerate) items will be added as embedded files to the produced assembly. When true, everything in @(RazorGenerate) will be added to @(RazorEmbeddedFiles) and passed to CSC.
 */
export interface EmbedRazorGenerateSourcesProps {

}

/**
 * Configures whether all of the @(RazorGenerate) items will be added as embedded files to the produced assembly. When true, everything in @(RazorGenerate) will be added to @(RazorEmbeddedFiles) and passed to CSC.
 */
export const EmbedRazorGenerateSources = makeTag<EmbedRazorGenerateSourcesProps>("EmbedRazorGenerateSources")

/**
 * Controls whether source generated files will be saved.
 */
export interface EmitCompilerGeneratedFilesProps {

}

/**
 * Controls whether source generated files will be saved.
 */
export const EmitCompilerGeneratedFiles = makeTag<EmitCompilerGeneratedFilesProps>("EmitCompilerGeneratedFiles")

export interface EnableASPDebuggingProps extends StringPropertyTypeProps {

}

export const EnableASPDebugging = makeTag<EnableASPDebuggingProps>("EnableASPDebugging")

/**
 * Enables the testing support for .NET Aspire application model. This adds a reference to 'Aspire.Hosting.Testing' NuGet package.
 */
export interface EnableAspireTestingProps {

}

/**
 * Enables the testing support for .NET Aspire application model. This adds a reference to 'Aspire.Hosting.Testing' NuGet package.
 */
export const EnableAspireTesting = makeTag<EnableAspireTestingProps>("EnableAspireTesting")

export interface EnableASPXDebuggingProps extends StringPropertyTypeProps {

}

export const EnableASPXDebugging = makeTag<EnableASPXDebuggingProps>("EnableASPXDebugging")

export interface EnableCOMDATFoldingProps {

}

export const EnableCOMDATFolding = makeTag<EnableCOMDATFoldingProps>("EnableCOMDATFolding")

export interface EnableCustomCultureProps {

}

export const EnableCustomCulture = makeTag<EnableCustomCultureProps>("EnableCustomCulture")

/**
 * Enable default Compile item globs for source files.
 */
export interface EnableDefaultCompileItemsProps {

}

/**
 * Enable default Compile item globs for source files.
 */
export const EnableDefaultCompileItems = makeTag<EnableDefaultCompileItemsProps>("EnableDefaultCompileItems")

/**
 * Set to true to automatically include certain file types, such as .cshtml files, as content in the project. When referenced via Microsoft.NET.Sdk.Web, this additionally includes all files under wwwroot, and any config files.
 */
export interface EnableDefaultContentItemsProps {

}

/**
 * Set to true to automatically include certain file types, such as .cshtml files, as content in the project. When referenced via Microsoft.NET.Sdk.Web, this additionally includes all files under wwwroot, and any config files.
 */
export const EnableDefaultContentItems = makeTag<EnableDefaultContentItemsProps>("EnableDefaultContentItems")

/**
 * Defaults to true, and if set to false will disable all default item globs.
 */
export interface EnableDefaultItemsProps {

}

/**
 * Defaults to true, and if set to false will disable all default item globs.
 */
export const EnableDefaultItems = makeTag<EnableDefaultItemsProps>("EnableDefaultItems")

/**
 * Enable default None item globs (which cover most files in the project not covered by other globs).
 */
export interface EnableDefaultNoneItemsProps {

}

/**
 * Enable default None item globs (which cover most files in the project not covered by other globs).
 */
export const EnableDefaultNoneItems = makeTag<EnableDefaultNoneItemsProps>("EnableDefaultNoneItems")

/**
 * Set to true to automatically include Razor (.razor) files in @(RazorComponent) from @(Content).
 */
export interface EnableDefaultRazorComponentItemsProps {

}

/**
 * Set to true to automatically include Razor (.razor) files in @(RazorComponent) from @(Content).
 */
export const EnableDefaultRazorComponentItems = makeTag<EnableDefaultRazorComponentItemsProps>("EnableDefaultRazorComponentItems")

/**
 * Set to true to automatically include Razor (.cshtml) files in @(RazorGenerate) from @(Content).
 */
export interface EnableDefaultRazorGenerateItemsProps {

}

/**
 * Set to true to automatically include Razor (.cshtml) files in @(RazorGenerate) from @(Content).
 */
export const EnableDefaultRazorGenerateItems = makeTag<EnableDefaultRazorGenerateItemsProps>("EnableDefaultRazorGenerateItems")

/**
 * Enable Store Submission from the packaging wizard.
 */
export interface EnableDirectStoreSubmissionProps extends StringPropertyTypeProps {

}

/**
 * Enable Store Submission from the packaging wizard.
 */
export const EnableDirectStoreSubmission = makeTag<EnableDirectStoreSubmissionProps>("EnableDirectStoreSubmission")

export interface EnableDPIAwarenessProps {

}

export const EnableDPIAwareness = makeTag<EnableDPIAwarenessProps>("EnableDPIAwareness")

export interface EnableErrorChecksProps {

}

export const EnableErrorChecks = makeTag<EnableErrorChecksProps>("EnableErrorChecks")

/**
 * Enables the Microsoft.Testing.Extensions.CodeCoverage extension. This is not supported by VSTest
 */
export interface EnableMicrosoftTestingExtensionsCodeCoverageProps {

}

/**
 * Enables the Microsoft.Testing.Extensions.CodeCoverage extension. This is not supported by VSTest
 */
export const EnableMicrosoftTestingExtensionsCodeCoverage = makeTag<EnableMicrosoftTestingExtensionsCodeCoverageProps>("EnableMicrosoftTestingExtensionsCodeCoverage")

/**
 * Enables the Microsoft.Testing.Extensions.CrashDump extension. This is not supported by VSTest.
 */
export interface EnableMicrosoftTestingExtensionsCrashDumpProps {

}

/**
 * Enables the Microsoft.Testing.Extensions.CrashDump extension. This is not supported by VSTest.
 */
export const EnableMicrosoftTestingExtensionsCrashDump = makeTag<EnableMicrosoftTestingExtensionsCrashDumpProps>("EnableMicrosoftTestingExtensionsCrashDump")

/**
 * Enables the Microsoft.Testing.Extensions.HangDump extension. This is not supported by VSTest.
 */
export interface EnableMicrosoftTestingExtensionsHangDumpProps {

}

/**
 * Enables the Microsoft.Testing.Extensions.HangDump extension. This is not supported by VSTest.
 */
export const EnableMicrosoftTestingExtensionsHangDump = makeTag<EnableMicrosoftTestingExtensionsHangDumpProps>("EnableMicrosoftTestingExtensionsHangDump")

/**
 * Enables the Microsoft.Testing.Extensions.HotReload extension (it has restrictive license). This is not supported by VSTest.
 */
export interface EnableMicrosoftTestingExtensionsHotReloadProps {

}

/**
 * Enables the Microsoft.Testing.Extensions.HotReload extension (it has restrictive license). This is not supported by VSTest.
 */
export const EnableMicrosoftTestingExtensionsHotReload = makeTag<EnableMicrosoftTestingExtensionsHotReloadProps>("EnableMicrosoftTestingExtensionsHotReload")

/**
 * Enables the Microsoft.Testing.Extensions.Retry extension (it has restrictive license). This is not supported by VSTest.
 */
export interface EnableMicrosoftTestingExtensionsRetryProps {

}

/**
 * Enables the Microsoft.Testing.Extensions.Retry extension (it has restrictive license). This is not supported by VSTest.
 */
export const EnableMicrosoftTestingExtensionsRetry = makeTag<EnableMicrosoftTestingExtensionsRetryProps>("EnableMicrosoftTestingExtensionsRetry")

/**
 * Enables the Microsoft.Testing.Extensions.TrxReport extension. This is not supported by VSTest.
 */
export interface EnableMicrosoftTestingExtensionsTrxReportProps {

}

/**
 * Enables the Microsoft.Testing.Extensions.TrxReport extension. This is not supported by VSTest.
 */
export const EnableMicrosoftTestingExtensionsTrxReport = makeTag<EnableMicrosoftTestingExtensionsTrxReportProps>("EnableMicrosoftTestingExtensionsTrxReport")

/**
 * Enables or disables the use of the MSTest runner. The default is 'true' when using MSTest.Sdk, and 'false' otherwise. Supported in MSTest 3.2 and later versions.
 */
export interface EnableMSTestRunnerProps {

}

/**
 * Enables or disables the use of the MSTest runner. The default is 'true' when using MSTest.Sdk, and 'false' otherwise. Supported in MSTest 3.2 and later versions.
 */
export const EnableMSTestRunner = makeTag<EnableMSTestRunnerProps>("EnableMSTestRunner")

/**
 * Indicates whether the .NET analyzers are enabled. They are enabled by default for projects that target .NET 5.0 or later.
 */
export interface EnableNETAnalyzersProps {

}

/**
 * Indicates whether the .NET analyzers are enabled. They are enabled by default for projects that target .NET 5.0 or later.
 */
export const EnableNETAnalyzers = makeTag<EnableNETAnalyzersProps>("EnableNETAnalyzers")

/**
 * Enables end-to-end testing for modern web apps using Playwright. This adds a reference to 'Microsoft.Playwright.MSTest' NuGet package.
 */
export interface EnablePlaywrightProps {

}

/**
 * Enables end-to-end testing for modern web apps using Playwright. This adds a reference to 'Microsoft.Playwright.MSTest' NuGet package.
 */
export const EnablePlaywright = makeTag<EnablePlaywrightProps>("EnablePlaywright")

export interface EnableSecurityDebuggingProps extends StringPropertyTypeProps {

}

export const EnableSecurityDebugging = makeTag<EnableSecurityDebuggingProps>("EnableSecurityDebugging")

/**
 * Flag indicating whether to enable signing checks during app package generation.
 */
export interface EnableSigningChecksProps extends StringPropertyTypeProps {

}

/**
 * Flag indicating whether to enable signing checks during app package generation.
 */
export const EnableSigningChecks = makeTag<EnableSigningChecksProps>("EnableSigningChecks")

export interface EnableSQLServerDebuggingProps extends StringPropertyTypeProps {

}

export const EnableSQLServerDebugging = makeTag<EnableSQLServerDebuggingProps>("EnableSQLServerDebugging")

export interface EnableUACProps {

}

export const EnableUAC = makeTag<EnableUACProps>("EnableUAC")

export interface EnableUnmanagedDebuggingProps extends StringPropertyTypeProps {

}

export const EnableUnmanagedDebugging = makeTag<EnableUnmanagedDebuggingProps>("EnableUnmanagedDebugging")

/**
 * Controls whether code style analysis rules configured as warnings or errors should execute on build and report violations. The default is false.
 */
export interface EnforceCodeStyleInBuildProps {

}

/**
 * Controls whether code style analysis rules configured as warnings or errors should execute on build and report violations. The default is false.
 */
export const EnforceCodeStyleInBuild = makeTag<EnforceCodeStyleInBuildProps>("EnforceCodeStyleInBuild")

/**
 * Windows Application Packaging project-specific: Enables the packaging of an executable without having the source code available.
 */
export interface EntryPointExeProps extends StringPropertyTypeProps {

}

/**
 * Windows Application Packaging project-specific: Enables the packaging of an executable without having the source code available.
 */
export const EntryPointExe = makeTag<EntryPointExeProps>("EntryPointExe")

/**
 * Windows Application Packaging project-specific: Relative path to entry point project file.
 */
export interface EntryPointProjectUniqueNameProps extends StringPropertyTypeProps {

}

/**
 * Windows Application Packaging project-specific: Relative path to entry point project file.
 */
export const EntryPointProjectUniqueName = makeTag<EntryPointProjectUniqueNameProps>("EntryPointProjectUniqueName")

export interface EntryPointSymbolProps {

}

export const EntryPointSymbol = makeTag<EntryPointSymbolProps>("EntryPointSymbol")

export interface ErrorProps extends TaskTypeProps {
  Code?: unknown
  File?: unknown
  HelpKeyword?: unknown
  Text?: unknown
}

export const Error = makeTag<ErrorProps>("Error")

export interface ErrorCheckAllocationsProps {

}

export const ErrorCheckAllocations = makeTag<ErrorCheckAllocationsProps>("ErrorCheckAllocations")

export interface ErrorCheckBoundsProps {

}

export const ErrorCheckBounds = makeTag<ErrorCheckBoundsProps>("ErrorCheckBounds")

export interface ErrorCheckEnumRangeProps {

}

export const ErrorCheckEnumRange = makeTag<ErrorCheckEnumRangeProps>("ErrorCheckEnumRange")

export interface ErrorCheckRefPointersProps {

}

export const ErrorCheckRefPointers = makeTag<ErrorCheckRefPointersProps>("ErrorCheckRefPointers")

export interface ErrorCheckStubDataProps {

}

export const ErrorCheckStubData = makeTag<ErrorCheckStubDataProps>("ErrorCheckStubData")

export interface ErrorLogProps extends StringPropertyTypeProps {

}

export const ErrorLog = makeTag<ErrorLogProps>("ErrorLog")

export interface ErrorReportProps extends StringPropertyTypeProps {

}

export const ErrorReport = makeTag<ErrorReportProps>("ErrorReport")

export interface ErrorReportingProps {

}

export const ErrorReporting = makeTag<ErrorReportingProps>("ErrorReporting")

export interface ErrorReportUrlProps extends StringPropertyTypeProps {

}

export const ErrorReportUrl = makeTag<ErrorReportUrlProps>("ErrorReportUrl")

export interface ExcludeDeploymentUrlProps {

}

export const ExcludeDeploymentUrl = makeTag<ExcludeDeploymentUrlProps>("ExcludeDeploymentUrl")

export interface ExcludedPermissionsProps extends StringPropertyTypeProps {

}

export const ExcludedPermissions = makeTag<ExcludedPermissionsProps>("ExcludedPermissions")

export interface ExecProps extends TaskTypeProps {
  Command: unknown
  CustomErrorRegularExpression?: unknown
  CustomWarningRegularExpression?: unknown
  EnvironmentVariables?: unknown
  IgnoreExitCode?: boolean
  IgnoreStandardErrorWarningFormat?: boolean
  LogStandardErrorAsError?: boolean
  Outputs?: unknown
  StandardErrorImportance?: unknown
  StandardOutputImportance?: unknown
  StdErrEncoding?: unknown
  StdOutEncoding?: unknown
  Timeout?: unknown
  ToolExe?: unknown
  ToolPath?: unknown
  WorkingDirectory?: unknown
}

export const Exec = makeTag<ExecProps>("Exec")

export interface ExpandPayloadDirectoriesProps extends TaskTypeProps {
  Inputs: unknown
  Expanded?: unknown
}

export const ExpandPayloadDirectories = makeTag<ExpandPayloadDirectoriesProps>("ExpandPayloadDirectories")

export interface ExpandPriContentProps extends ToolTaskTypeProps {
  Inputs: unknown
  Expanded?: unknown
  IntermediateFileWrites?: unknown
  IntermediateDirectory: unknown
  AdditionalMakepriExeParameters?: unknown
  MakePriExeFullPath: unknown
  MakePriExtensionPath?: unknown
}

export const ExpandPriContent = makeTag<ExpandPriContentProps>("ExpandPriContent")

export interface ExtractHashAlgorithmIdProps extends TaskTypeProps {
  StoreAssociationFile?: unknown
  HashUris: unknown
  HashAlgorithmId?: unknown
}

export const ExtractHashAlgorithmId = makeTag<ExtractHashAlgorithmIdProps>("ExtractHashAlgorithmId")

export interface FallbackCultureProps extends StringPropertyTypeProps {

}

export const FallbackCulture = makeTag<FallbackCultureProps>("FallbackCulture")

export interface FileAlignmentProps extends StringPropertyTypeProps {

}

export const FileAlignment = makeTag<FileAlignmentProps>("FileAlignment")

export interface FileAssociationProps extends SimpleItemTypeProps {

}

export const FileAssociation = makeTag<FileAssociationProps>("FileAssociation")

export interface FileUpgradeFlagsProps extends StringPropertyTypeProps {

}

export const FileUpgradeFlags = makeTag<FileUpgradeFlagsProps>("FileUpgradeFlags")

/**
 * Numeric value of the version for the assembly manifest in the format major.minor.build.revision (e.g. 2.4.0.1)
 */
export interface FileVersionProps extends StringPropertyTypeProps {

}

/**
 * Numeric value of the version for the assembly manifest in the format major.minor.build.revision (e.g. 2.4.0.1)
 */
export const FileVersion = makeTag<FileVersionProps>("FileVersion")

export interface FilterOutUnusedLanguagesResourceFileMapsProps extends TaskTypeProps {
  FileMaps: unknown
  FileNamePrefix: unknown
  MapSuffix: unknown
  Languages: unknown
  FilteredFileMaps?: unknown
}

export const FilterOutUnusedLanguagesResourceFileMaps = makeTag<FilterOutUnusedLanguagesResourceFileMapsProps>("FilterOutUnusedLanguagesResourceFileMaps")

/**
 * Path to the final app manifest.
 */
export interface FinalAppxManifestNameProps extends StringPropertyTypeProps {

}

/**
 * Path to the final app manifest.
 */
export const FinalAppxManifestName = makeTag<FinalAppxManifestNameProps>("FinalAppxManifestName")

/**
 * Full path to the final app package recipe.
 */
export interface FinalAppxPackageRecipeProps extends StringPropertyTypeProps {

}

/**
 * Full path to the final app package recipe.
 */
export const FinalAppxPackageRecipe = makeTag<FinalAppxPackageRecipeProps>("FinalAppxPackageRecipe")

export interface FindAppConfigFileProps extends TaskTypeProps {
  AppConfigFile?: unknown
  PrimaryList: unknown
  SecondaryList: unknown
  TargetPath: unknown
}

export const FindAppConfigFile = makeTag<FindAppConfigFileProps>("FindAppConfigFile")

export interface FindInListProps extends TaskTypeProps {
  CaseSensitive?: boolean
  FindLastMatch?: boolean
  ItemFound?: unknown
  ItemSpecToFind: unknown
  List: unknown
  MatchFileNameOnly?: boolean
}

export const FindInList = makeTag<FindInListProps>("FindInList")

export interface FindUnderPathProps extends TaskTypeProps {
  Files?: unknown
  InPath?: unknown
  OutOfPath?: unknown
  Path: unknown
  UpdateToAbsolutePaths?: boolean
}

export const FindUnderPath = makeTag<FindUnderPathProps>("FindUnderPath")

export interface FixedBaseAddressProps {

}

export const FixedBaseAddress = makeTag<FixedBaseAddressProps>("FixedBaseAddress")

export interface FloatingPointExceptionsProps {

}

export const FloatingPointExceptions = makeTag<FloatingPointExceptionsProps>("FloatingPointExceptions")

export interface FloatingPointModelProps {

}

export const FloatingPointModel = makeTag<FloatingPointModelProps>("FloatingPointModel")

/**
 * Used by Visual Studio to identify an empty folder.
 */
export interface FolderProps extends SimpleItemTypeProps {
  /**
   * Optional expression evaluated to determine whether the items should be evaluated
   */
  Condition?: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to include in this item list
   */
  Include?: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to exclude from the Include list
   */
  Exclude?: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to remove from the existing list contents
   */
  Remove?: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to be updated with the metadata from contained in this xml element
   */
  Update?: string
  /**
   * Optional expression. Used to identify or order system and user elements
   */
  Label?: string
}

/**
 * Used by Visual Studio to identify an empty folder.
 */
export const Folder = makeTag<FolderProps>("Folder")

export interface ForcedIncludeFilesProps {

}

export const ForcedIncludeFiles = makeTag<ForcedIncludeFilesProps>("ForcedIncludeFiles")

export interface ForcedUsingFilesProps {

}

export const ForcedUsingFiles = makeTag<ForcedUsingFilesProps>("ForcedUsingFiles")

export interface ForceFileOutputProps {

}

export const ForceFileOutput = makeTag<ForceFileOutputProps>("ForceFileOutput")

export interface ForceSymbolReferencesProps {

}

export const ForceSymbolReferences = makeTag<ForceSymbolReferencesProps>("ForceSymbolReferences")

export interface FormatUrlProps extends TaskTypeProps {
  InputUrl?: unknown
  OutputUrl?: unknown
}

export const FormatUrl = makeTag<FormatUrlProps>("FormatUrl")

export interface FormatVersionProps extends TaskTypeProps {
  FormatType?: unknown
  OutputVersion?: unknown
  Revision?: unknown
  Version?: unknown
}

export const FormatVersion = makeTag<FormatVersionProps>("FormatVersion")

export interface FormFactorIDProps extends StringPropertyTypeProps {

}

export const FormFactorID = makeTag<FormFactorIDProps>("FormFactorID")

/**
 * Sets the /sdkpath switch for a VB project to the specified value
 */
export interface FrameworkPathOverrideProps extends StringPropertyTypeProps {

}

/**
 * Sets the /sdkpath switch for a VB project to the specified value
 */
export const FrameworkPathOverride = makeTag<FrameworkPathOverrideProps>("FrameworkPathOverride")

/**
 * Reference to a shared framework.
 */
export interface FrameworkReferenceProps extends SimpleItemTypeProps {
  /**
   * Controls whether the runtime assets of this shared framework can be trimmed by the IL Linker (if PublishTrimmed is true).
   */
  IsTrimmable?: string
  /**
   * Controls whether the app will target the latest patch of the runtime.  Defaults to true for self-contained apps, false otherwise.
   */
  TargetLatestRuntimePatch?: string
}

/**
 * Reference to a shared framework.
 */
export const FrameworkReference = makeTag<FrameworkReferenceProps>("FrameworkReference")

export interface FunctionLevelLinkingProps {

}

export const FunctionLevelLinking = makeTag<FunctionLevelLinkingProps>("FunctionLevelLinking")

export interface FunctionOrderProps {

}

export const FunctionOrder = makeTag<FunctionOrderProps>("FunctionOrder")

export interface GenerateApplicationManifestProps extends TaskTypeProps {
  AssemblyName?: unknown
  AssemblyVersion?: unknown
  ClrVersion?: unknown
  ConfigFile?: unknown
  Dependencies?: unknown
  Description?: unknown
  EntryPoint?: unknown
  ErrorReportUrl?: unknown
  FileAssociations?: unknown
  Files?: unknown
  HostInBrowser?: boolean
  IconFile?: unknown
  InputManifest?: unknown
  IsolatedComReferences?: unknown
  LauncherBasedDeployment?: boolean
  ManifestType?: unknown
  MaxTargetPath?: unknown
  OSVersion?: unknown
  OutputManifest?: unknown
  Platform?: unknown
  Product?: unknown
  Publisher?: unknown
  RequiresMinimumFramework35SP1?: boolean
  SuiteName?: unknown
  SupportUrl?: unknown
  TargetCulture?: unknown
  TargetFrameworkMoniker?: unknown
  TargetFrameworkProfile?: unknown
  TargetFrameworkSubset?: unknown
  TargetFrameworkVersion?: unknown
  TrustInfoFile?: unknown
  UseApplicationTrust?: boolean
}

export const GenerateApplicationManifest = makeTag<GenerateApplicationManifestProps>("GenerateApplicationManifest")

export interface GenerateAppxManifestProps extends TaskTypeProps {
  ApplicationExecutableName?: unknown
  AppxManifestInput: unknown
  CertificateThumbprint?: unknown
  CertificateFile?: unknown
  PackageArchitecture: unknown
  FrameworkSdkReferences: unknown
  NonFrameworkSdkReferences: unknown
  AppxManifestOutput: unknown
  DefaultResourceLanguage: unknown
  QualifiersPath: unknown
  ManagedWinmdInprocImplementation: unknown
  WinmdFiles: unknown
  SDKWinmdFiles: unknown
  OSMinVersion?: unknown
  OSMaxVersionTested?: unknown
  OSMinVersionReplaceManifestVersion?: boolean
  OSMaxVersionTestedReplaceManifestVersion?: boolean
  EnableSigningChecks?: boolean
  ManifestMetadata?: unknown
  TargetPlatformIdentifier?: unknown
  PackageSigningEnabled?: boolean
}

export const GenerateAppxManifest = makeTag<GenerateAppxManifestProps>("GenerateAppxManifest")

/**
 * Flag indicating whether to generate app package during the build.
 */
export interface GenerateAppxPackageOnBuildProps extends StringPropertyTypeProps {

}

/**
 * Flag indicating whether to generate app package during the build.
 */
export const GenerateAppxPackageOnBuild = makeTag<GenerateAppxPackageOnBuildProps>("GenerateAppxPackageOnBuild")

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
  IndexedPayloadFiles?: unknown
  MakePriExtensionPath?: unknown
}

export const GenerateAppxPackageRecipe = makeTag<GenerateAppxPackageRecipeProps>("GenerateAppxPackageRecipe")

export interface GenerateAppxSymbolPackageProps extends TaskTypeProps {
  PdbCopyExeFullPath: unknown
  PdbFiles: unknown
  StrippedDirectory: unknown
  AppxSymbolPackageOutput: unknown
  ProjectName: unknown
  StrippedPdbs?: unknown
}

export const GenerateAppxSymbolPackage = makeTag<GenerateAppxSymbolPackageProps>("GenerateAppxSymbolPackage")

export interface GenerateBootstrapperProps extends TaskTypeProps {
  ApplicationFile?: unknown
  ApplicationName?: unknown
  ApplicationRequiresElevation?: boolean
  ApplicationUrl?: unknown
  BootstrapperComponentFiles?: unknown
  BootstrapperItems?: unknown
  BootstrapperKeyFile?: unknown
  ComponentsLocation?: unknown
  ComponentsUrl?: unknown
  CopyComponents?: boolean
  Culture?: unknown
  FallbackCulture?: unknown
  OutputPath?: unknown
  Path?: unknown
  SupportUrl?: unknown
  Validate?: boolean
}

export const GenerateBootstrapper = makeTag<GenerateBootstrapperProps>("GenerateBootstrapper")

export interface GenerateCatalogFilesProps {

}

export const GenerateCatalogFiles = makeTag<GenerateCatalogFilesProps>("GenerateCatalogFiles")

export interface GenerateCategoryTagsProps {

}

export const GenerateCategoryTags = makeTag<GenerateCategoryTagsProps>("GenerateCategoryTags")

export interface GenerateClientFilesProps {

}

export const GenerateClientFiles = makeTag<GenerateClientFilesProps>("GenerateClientFiles")

export interface GenerateDebugInformationProps {

}

export const GenerateDebugInformation = makeTag<GenerateDebugInformationProps>("GenerateDebugInformation")

export interface GenerateDeploymentManifestProps extends TaskTypeProps {
  AssemblyName?: unknown
  AssemblyVersion?: unknown
  CreateDesktopShortcut?: boolean
  DeploymentUrl?: unknown
  Description?: unknown
  DisallowUrlActivation?: boolean
  EntryPoint?: unknown
  ErrorReportUrl?: unknown
  InputManifest?: unknown
  Install?: boolean
  LauncherBasedDeployment?: boolean
  MapFileExtensions?: boolean
  MaxTargetPath?: unknown
  MinimumRequiredVersion?: unknown
  OutputManifest?: unknown
  Platform?: unknown
  Product?: unknown
  Publisher?: unknown
  SuiteName?: unknown
  SupportUrl?: unknown
  TargetCulture?: unknown
  TargetFrameworkMoniker?: unknown
  TargetFrameworkVersion?: unknown
  TrustUrlParameters?: boolean
  UpdateEnabled?: boolean
  UpdateInterval?: unknown
  UpdateMode?: unknown
  UpdateUnit?: unknown
}

export const GenerateDeploymentManifest = makeTag<GenerateDeploymentManifestProps>("GenerateDeploymentManifest")

/**
 * Value indicating whether a documentation file will be generated by the compiler
 */
export interface GenerateDocumentationFileProps {

}

/**
 * Value indicating whether a documentation file will be generated by the compiler
 */
export const GenerateDocumentationFile = makeTag<GenerateDocumentationFileProps>("GenerateDocumentationFile")

export interface GenerateLauncherProps extends TaskTypeProps {
  EntryPoint?: unknown
  OutputPath?: unknown
  VisualStudioVersion?: unknown
}

export const GenerateLauncher = makeTag<GenerateLauncherProps>("GenerateLauncher")

export interface GenerateLibraryLayoutProps {

}

export const GenerateLibraryLayout = makeTag<GenerateLibraryLayoutProps>("GenerateLibraryLayout")

export interface GenerateManifestsProps extends StringPropertyTypeProps {

}

export const GenerateManifests = makeTag<GenerateManifestsProps>("GenerateManifests")

export interface GenerateMapFileProps {

}

export const GenerateMapFile = makeTag<GenerateMapFileProps>("GenerateMapFile")

/**
 * Value indicating whether a NuGet package will be generated when the project is built
 */
export interface GeneratePackageOnBuildProps {

}

/**
 * Value indicating whether a NuGet package will be generated when the project is built
 */
export const GeneratePackageOnBuild = makeTag<GeneratePackageOnBuildProps>("GeneratePackageOnBuild")

export interface GeneratePriConfigurationFilesProps extends TaskTypeProps {
  LayoutResfilesPath: unknown
  ResourcesResfilesPath: unknown
  PriResfilesPath: unknown
  LayoutFiles: unknown
  PRIResourceFiles: unknown
  PriFiles: unknown
  IntermediateExtension: unknown
}

export const GeneratePriConfigurationFiles = makeTag<GeneratePriConfigurationFilesProps>("GeneratePriConfigurationFiles")

/**
 * Set this property to 'false' to disable the automatic generation of entry point for VSTest.
 */
export interface GenerateProgramFileProps {

}

/**
 * Set this property to 'false' to disable the automatic generation of entry point for VSTest.
 */
export const GenerateProgramFile = makeTag<GenerateProgramFileProps>("GenerateProgramFile")

export interface GenerateProjectArchitecturesFileProps extends TaskTypeProps {
  ProjectArchitectures: unknown
  ProjectArchitecturesFilePath: unknown
}

export const GenerateProjectArchitecturesFile = makeTag<GenerateProjectArchitecturesFileProps>("GenerateProjectArchitecturesFile")

export interface GenerateProjectPriFileProps extends ToolTaskTypeProps {
  MakePriExeFullPath: unknown
  PriConfigXmlPath: unknown
  IndexFilesForQualifiersCollection?: unknown
  ProjectPriIndexName: unknown
  MappingFileFormat?: unknown
  InsertReverseMap?: unknown
  ProjectDirectory: unknown
  OutputFileName: unknown
  MakePriExtensionPath?: unknown
  QualifiersPath?: unknown
  GeneratedFilesListPath?: unknown
  AdditionalMakepriExeParameters?: unknown
  MultipleQualifiersPerDimensionFoundPath?: unknown
  IntermediateExtension: unknown
}

export const GenerateProjectPriFile = makeTag<GenerateProjectPriFileProps>("GenerateProjectPriFile")

export interface GenerateResourceProps extends TaskTypeProps {
  AdditionalInputs?: unknown
  ExcludedInputPaths?: unknown
  ExecuteAsTool?: boolean
  MinimalRebuildFromTracking?: boolean
  NeverLockTypeAssemblies?: boolean
  OutputResources?: unknown
  PublicClass?: boolean
  References?: unknown
  SdkToolsPath?: unknown
  Sources: unknown
  StateFile?: unknown
  StronglyTypedClassName?: unknown
  StronglyTypedFileName?: unknown
  StronglyTypedLanguage?: unknown
  StronglyTypedManifestPrefix?: unknown
  StronglyTypedNamespace?: unknown
  TrackerLogDirectory?: unknown
  TrackFileAccess?: boolean
  UseSourcePath?: boolean
  ExtractResWFiles?: boolean
  OutputDirectory?: unknown
  MSBuildRuntime?: unknown
  MSBuildArchitecture?: unknown
}

export const GenerateResource = makeTag<GenerateResourceProps>("GenerateResource")

/**
 * Set this property to 'false' to disable auto registration of extensions through the 'AddSelfRegisteredExtensions'.
 */
export interface GenerateSelfRegisteredExtensionsProps {

}

/**
 * Set this property to 'false' to disable auto registration of extensions through the 'AddSelfRegisteredExtensions'.
 */
export const GenerateSelfRegisteredExtensions = makeTag<GenerateSelfRegisteredExtensionsProps>("GenerateSelfRegisteredExtensions")

export interface GenerateSerializationAssembliesProps extends StringPropertyTypeProps {

}

export const GenerateSerializationAssemblies = makeTag<GenerateSerializationAssembliesProps>("GenerateSerializationAssemblies")

export interface GenerateServerFilesProps {

}

export const GenerateServerFiles = makeTag<GenerateServerFilesProps>("GenerateServerFiles")

export interface GenerateStublessProxiesProps {

}

export const GenerateStublessProxies = makeTag<GenerateStublessProxiesProps>("GenerateStublessProxies")

/**
 * Set this property to 'false' to disable the automatic generation of entry point for Microsoft.Testing.Platform.
 */
export interface GenerateTestingPlatformEntryPointProps {

}

/**
 * Set this property to 'false' to disable the automatic generation of entry point for Microsoft.Testing.Platform.
 */
export const GenerateTestingPlatformEntryPoint = makeTag<GenerateTestingPlatformEntryPointProps>("GenerateTestingPlatformEntryPoint")

export interface GenerateTrustInfoProps extends TaskTypeProps {
  ApplicationDependencies?: unknown
  BaseManifest?: unknown
  ExcludedPermissions?: unknown
  TargetFrameworkMoniker?: unknown
  TargetZone?: unknown
  TrustInfoFile: unknown
}

export const GenerateTrustInfo = makeTag<GenerateTrustInfoProps>("GenerateTrustInfo")

export interface GenerateTypeLibraryProps {

}

export const GenerateTypeLibrary = makeTag<GenerateTypeLibraryProps>("GenerateTypeLibrary")

interface GenericPropertyTypeProps {
  /**
   * Optional expression evaluated to determine whether the property should be evaluated
   */
  Condition?: string
  /**
   * Optional expression. Used to identify or order system and user elements
   */
  Label?: string
}

export const GenericPropertyType = makeTag<GenericPropertyTypeProps>("GenericPropertyType")

export interface GetAppxBundlePlatformsProps extends TaskTypeProps {
  Input: unknown
  PackageArchitecture: unknown
  Platforms?: unknown
  Last?: unknown
}

export const GetAppxBundlePlatforms = makeTag<GetAppxBundlePlatformsProps>("GetAppxBundlePlatforms")

export interface GetAssemblyIdentityProps extends TaskTypeProps {
  Assemblies?: unknown
  AssemblyFiles: unknown
}

export const GetAssemblyIdentity = makeTag<GetAssemblyIdentityProps>("GetAssemblyIdentity")

export interface GetDefaultResourceLanguageProps extends TaskTypeProps {
  DefaultLanguage?: unknown
  SourceAppxManifest?: unknown
  DefaultResourceLanguage?: unknown
}

export const GetDefaultResourceLanguage = makeTag<GetDefaultResourceLanguageProps>("GetDefaultResourceLanguage")

export interface GetFileHashProps extends TaskTypeProps {
  Files: unknown
  Algorithm?: unknown
  MetadataName?: unknown
  HashEncoding?: unknown
  Hash?: unknown
  Items?: unknown
}

export const GetFileHash = makeTag<GetFileHashProps>("GetFileHash")

export interface GetFrameworkPathProps extends TaskTypeProps {
  Path?: unknown
}

export const GetFrameworkPath = makeTag<GetFrameworkPathProps>("GetFrameworkPath")

export interface GetFrameworkSdkPackagesProps extends TaskTypeProps {
  FrameworkSdkReferences: unknown
  FrameworkSdkPackages?: unknown
}

export const GetFrameworkSdkPackages = makeTag<GetFrameworkSdkPackagesProps>("GetFrameworkSdkPackages")

export interface GetFrameworkSdkPathProps extends TaskTypeProps {
  Path?: unknown
}

export const GetFrameworkSdkPath = makeTag<GetFrameworkSdkPathProps>("GetFrameworkSdkPath")

export interface GetOutputFileNameProps extends TaskTypeProps {
  OutputExtension: unknown
  OutputFile?: unknown
  OutputPath?: unknown
  SourceFile: unknown
}

export const GetOutputFileName = makeTag<GetOutputFileNameProps>("GetOutputFileName")

export interface GetPackageArchitectureProps extends TaskTypeProps {
  Platform: unknown
  ProjectArchitecture: unknown
  RecursiveProjectArchitecture: unknown
  PackageArchitecture?: unknown
}

export const GetPackageArchitecture = makeTag<GetPackageArchitectureProps>("GetPackageArchitecture")

export interface GetReferenceAssemblyPathsProps extends TaskTypeProps {
  RootPath?: unknown
  TargetFrameworkMoniker?: unknown
  TargetFrameworkMonikerDisplayName?: unknown
  BypassFrameworkInstallChecks?: unknown
}

export const GetReferenceAssemblyPaths = makeTag<GetReferenceAssemblyPathsProps>("GetReferenceAssemblyPaths")

export interface GetSdkPropertyValueProps extends TaskTypeProps {
  TargetPlatformIdentifier: unknown
  TargetPlatformVersion: unknown
  TargetPlatformSdkRootOverride?: unknown
  PropertyName: unknown
  PropertyValue?: unknown
}

export const GetSdkPropertyValue = makeTag<GetSdkPropertyValueProps>("GetSdkPropertyValue")

export interface GetSdkToolFullPathProps extends TaskTypeProps {
  ToolName: unknown
  ToolFullPath?: unknown
  TargetPlatformIdentifier: unknown
  TargetPlatformVersion: unknown
  TargetPlatformSdkRootOverride?: unknown
  MSBuildArchitecture?: unknown
  ActualToolFullPath?: unknown
}

export const GetSdkToolFullPath = makeTag<GetSdkToolFullPathProps>("GetSdkToolFullPath")

export interface GetWindowsDesktopSdkDirProps extends TaskTypeProps {
  TargetPlatformIdentifier: unknown
  TargetPlatformVersion: unknown
  TargetPlatformSdkRootOverride?: unknown
  WindowsDesktopSdkDir?: unknown
}

export const GetWindowsDesktopSdkDir = makeTag<GetWindowsDesktopSdkDirProps>("GetWindowsDesktopSdkDir")

export interface HeaderFileNameProps {

}

export const HeaderFileName = makeTag<HeaderFileNameProps>("HeaderFileName")

export interface HeapCommitSizeProps {

}

export const HeapCommitSize = makeTag<HeapCommitSizeProps>("HeapCommitSize")

export interface HeapReserveSizeProps {

}

export const HeapReserveSize = makeTag<HeapReserveSizeProps>("HeapReserveSize")

export interface HighEntropyVAProps {

}

export const HighEntropyVA = makeTag<HighEntropyVAProps>("HighEntropyVA")

export interface HostInBrowserProps {

}

export const HostInBrowser = makeTag<HostInBrowserProps>("HostInBrowser")

export interface IgnoreAllDefaultLibrariesProps {

}

export const IgnoreAllDefaultLibraries = makeTag<IgnoreAllDefaultLibrariesProps>("IgnoreAllDefaultLibraries")

export interface IgnoreEmbeddedIDLProps {

}

export const IgnoreEmbeddedIDL = makeTag<IgnoreEmbeddedIDLProps>("IgnoreEmbeddedIDL")

export interface IgnoreImportLibraryProps {

}

export const IgnoreImportLibrary = makeTag<IgnoreImportLibraryProps>("IgnoreImportLibrary")

export interface IgnoreSpecificDefaultLibrariesProps {

}

export const IgnoreSpecificDefaultLibraries = makeTag<IgnoreSpecificDefaultLibrariesProps>("IgnoreSpecificDefaultLibraries")

export interface IgnoreStandardIncludePathProps {

}

export const IgnoreStandardIncludePath = makeTag<IgnoreStandardIncludePathProps>("IgnoreStandardIncludePath")

export interface ImageHasSafeExceptionHandlersProps {

}

export const ImageHasSafeExceptionHandlers = makeTag<ImageHasSafeExceptionHandlersProps>("ImageHasSafeExceptionHandlers")

/**
 * Enable implicit global usings for the C# project. Possible values are enable, true, and disable.
 */
export interface ImplicitUsingsProps {

}

/**
 * Enable implicit global usings for the C# project. Possible values are enable, true, and disable.
 */
export const ImplicitUsings = makeTag<ImplicitUsingsProps>("ImplicitUsings")

/**
 * Assemblies whose namespaces should be imported by the Visual Basic compiler
 */
export interface ImportProps extends SimpleItemTypeProps {
  /**
   * Optional expression evaluated to determine whether the import should occur
   */
  Condition?: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to include in this item list
   */
  Include?: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to exclude from the Include list
   */
  Exclude?: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to remove from the existing list contents
   */
  Remove?: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to be updated with the metadata from contained in this xml element
   */
  Update?: string
  /**
   * Optional expression. Used to identify or order system and user elements
   */
  Label?: string
  /**
   * Project file to import
   */
  Project: unknown /* msb:non_empty_string */
  /**
   * Name of the SDK which contains the project file to import
   */
  Sdk?: string
  /**
   * Optional expression used to specify the version of the SDK referenced by this import
   */
  Version?: string
  /**
   * Optional expression used to specify the minimum SDK version required by the referring import
   */
  MinimumVersion?: string
}

/**
 * Assemblies whose namespaces should be imported by the Visual Basic compiler
 */
export const Import = makeTag<ImportProps>("Import")

export interface ImportGroupProps {
  /**
   * Optional expression evaluated to determine whether the ImportGroup should be used
   */
  Condition?: string
  /**
   * Optional expression. Used to identify or order system and user elements
   */
  Label?: string
}

export const ImportGroup = makeTag<ImportGroupProps>("ImportGroup")

export interface ImportLibraryProps {

}

export const ImportLibrary = makeTag<ImportLibraryProps>("ImportLibrary")

/**
 * Flag indicating whether to include primary build outputs into the app package payload.
 */
export interface IncludeBuiltProjectOutputGroupProps extends StringPropertyTypeProps {

}

/**
 * Flag indicating whether to include primary build outputs into the app package payload.
 */
export const IncludeBuiltProjectOutputGroup = makeTag<IncludeBuiltProjectOutputGroupProps>("IncludeBuiltProjectOutputGroup")

/**
 * Flag indicating whether to include COM files into the app package payload.
 */
export interface IncludeComFilesOutputGroupProps extends StringPropertyTypeProps {

}

/**
 * Flag indicating whether to include COM files into the app package payload.
 */
export const IncludeComFilesOutputGroup = makeTag<IncludeComFilesOutputGroupProps>("IncludeComFilesOutputGroup")

/**
 * Flag indicating whether to include content files into the app package payload.
 */
export interface IncludeContentFilesProjectOutputGroupProps extends StringPropertyTypeProps {

}

/**
 * Flag indicating whether to include content files into the app package payload.
 */
export const IncludeContentFilesProjectOutputGroup = makeTag<IncludeContentFilesProjectOutputGroupProps>("IncludeContentFilesProjectOutputGroup")

/**
 * Flag indicating whether to include files marked as 'Copy local' into the app package payload.
 */
export interface IncludeCopyLocalFilesOutputGroupProps extends StringPropertyTypeProps {

}

/**
 * Flag indicating whether to include files marked as 'Copy local' into the app package payload.
 */
export const IncludeCopyLocalFilesOutputGroup = makeTag<IncludeCopyLocalFilesOutputGroupProps>("IncludeCopyLocalFilesOutputGroup")

/**
 * Flag indicating whether to include WinMD artifacts into the app package payload.
 */
export interface IncludeCopyWinmdArtifactsOutputGroupProps extends StringPropertyTypeProps {

}

/**
 * Flag indicating whether to include WinMD artifacts into the app package payload.
 */
export const IncludeCopyWinmdArtifactsOutputGroup = makeTag<IncludeCopyWinmdArtifactsOutputGroupProps>("IncludeCopyWinmdArtifactsOutputGroup")

/**
 * Flag indicating whether to include custom output group into the app package payload.
 */
export interface IncludeCustomOutputGroupForPackagingProps extends StringPropertyTypeProps {

}

/**
 * Flag indicating whether to include custom output group into the app package payload.
 */
export const IncludeCustomOutputGroupForPackaging = makeTag<IncludeCustomOutputGroupForPackagingProps>("IncludeCustomOutputGroupForPackaging")

/**
 * Flag indicating whether to include debug symbols into the app package payload.
 */
export interface IncludeDebugSymbolsProjectOutputGroupProps extends StringPropertyTypeProps {

}

/**
 * Flag indicating whether to include debug symbols into the app package payload.
 */
export const IncludeDebugSymbolsProjectOutputGroup = makeTag<IncludeDebugSymbolsProjectOutputGroupProps>("IncludeDebugSymbolsProjectOutputGroup")

/**
 * Flag indicating whether to include documentation into the app package payload.
 */
export interface IncludeDocumentationProjectOutputGroupProps extends StringPropertyTypeProps {

}

/**
 * Flag indicating whether to include documentation into the app package payload.
 */
export const IncludeDocumentationProjectOutputGroup = makeTag<IncludeDocumentationProjectOutputGroupProps>("IncludeDocumentationProjectOutputGroup")

/**
 * Flag indicating whether to include resolved SDK references into the app package payload.
 */
export interface IncludeGetResolvedSDKReferencesProps extends StringPropertyTypeProps {

}

/**
 * Flag indicating whether to include resolved SDK references into the app package payload.
 */
export const IncludeGetResolvedSDKReferences = makeTag<IncludeGetResolvedSDKReferencesProps>("IncludeGetResolvedSDKReferences")

/**
 * Flag indicating whether to include resource index (PRI) files into the app package payload.
 */
export interface IncludePriFilesOutputGroupProps extends StringPropertyTypeProps {

}

/**
 * Flag indicating whether to include resource index (PRI) files into the app package payload.
 */
export const IncludePriFilesOutputGroup = makeTag<IncludePriFilesOutputGroupProps>("IncludePriFilesOutputGroup")

/**
 * Configures whether all Razor content items (.cshtml files) will be marked to be included in the produced NuGet package as content. All Content items are included in a NuGet package as content files. This setting can be used to control this behavior for Razor content items.
 */
export interface IncludeRazorContentInPackProps {

}

/**
 * Configures whether all Razor content items (.cshtml files) will be marked to be included in the produced NuGet package as content. All Content items are included in a NuGet package as content files. This setting can be used to control this behavior for Razor content items.
 */
export const IncludeRazorContentInPack = makeTag<IncludeRazorContentInPackProps>("IncludeRazorContentInPack")

/**
 * Flag indicating whether to include satellite DLLs into the app package payload.
 */
export interface IncludeSatelliteDllsProjectOutputGroupProps extends StringPropertyTypeProps {

}

/**
 * Flag indicating whether to include satellite DLLs into the app package payload.
 */
export const IncludeSatelliteDllsProjectOutputGroup = makeTag<IncludeSatelliteDllsProjectOutputGroupProps>("IncludeSatelliteDllsProjectOutputGroup")

/**
 * Flag indicating whether to include SDK redist into the app package payload.
 */
export interface IncludeSDKRedistOutputGroupProps extends StringPropertyTypeProps {

}

/**
 * Flag indicating whether to include SDK redist into the app package payload.
 */
export const IncludeSDKRedistOutputGroup = makeTag<IncludeSDKRedistOutputGroupProps>("IncludeSDKRedistOutputGroup")

/**
 * Flag indicating whether to include SGen files into the app package payload.
 */
export interface IncludeSGenFilesOutputGroupProps extends StringPropertyTypeProps {

}

/**
 * Flag indicating whether to include SGen files into the app package payload.
 */
export const IncludeSGenFilesOutputGroup = makeTag<IncludeSGenFilesOutputGroupProps>("IncludeSGenFilesOutputGroup")

/**
 * Flag indicating whether to include source files into the app package payload.
 */
export interface IncludeSourceFilesProjectOutputGroupProps extends StringPropertyTypeProps {

}

/**
 * Flag indicating whether to include source files into the app package payload.
 */
export const IncludeSourceFilesProjectOutputGroup = makeTag<IncludeSourceFilesProjectOutputGroupProps>("IncludeSourceFilesProjectOutputGroup")

/**
 * Product version of the assembly for UI display (e.g. 1.0 Beta)
 */
export interface InformationalVersionProps extends StringPropertyTypeProps {

}

/**
 * Product version of the assembly for UI display (e.g. 1.0 Beta)
 */
export const InformationalVersion = makeTag<InformationalVersionProps>("InformationalVersion")

export interface InputResourceManifestsProps {

}

export const InputResourceManifests = makeTag<InputResourceManifestsProps>("InputResourceManifests")

export interface InputsProps {

}

export const Inputs = makeTag<InputsProps>("Inputs")

/**
 * Flag indicating whether to insert reverse resource map during resource index generation.
 */
export interface InsertReverseMapProps extends StringPropertyTypeProps {

}

/**
 * Flag indicating whether to insert reverse resource map during resource index generation.
 */
export const InsertReverseMap = makeTag<InsertReverseMapProps>("InsertReverseMap")

export interface InstallProps extends StringPropertyTypeProps {

}

export const Install = makeTag<InstallProps>("Install")

/**
 * Web, Unc, or Disk
 */
export interface InstallFromProps extends StringPropertyTypeProps {

}

/**
 * Web, Unc, or Disk
 */
export const InstallFrom = makeTag<InstallFromProps>("InstallFrom")

export interface InstallUrlProps extends StringPropertyTypeProps {

}

export const InstallUrl = makeTag<InstallUrlProps>("InstallUrl")

export interface InterfaceIdentifierFileNameProps {

}

export const InterfaceIdentifierFileName = makeTag<InterfaceIdentifierFileNameProps>("InterfaceIdentifierFileName")

/**
 * Specifies that internal types and members are visible to the specified friend assemblies.
 */
export interface InternalsVisibleToProps extends SimpleItemTypeProps {
  /**
   * The name of the friend assembly to make internal types and members visible to.
   */
  Include?: string
  /**
   * Optional public key associated with the strong name signature of the friend assembly.
   */
  Key?: string
}

/**
 * Specifies that internal types and members are visible to the specified friend assemblies.
 */
export const InternalsVisibleTo = makeTag<InternalsVisibleToProps>("InternalsVisibleTo")

export interface IntrinsicFunctionsProps {

}

export const IntrinsicFunctions = makeTag<IntrinsicFunctionsProps>("IntrinsicFunctions")

/**
 * Indicates whether an app runs in globalization-invariant mode without access to culture-specific data and behavior.
 */
export interface InvariantGlobalizationProps {

}

/**
 * Indicates whether an app runs in globalization-invariant mode without access to culture-specific data and behavior.
 */
export const InvariantGlobalization = makeTag<InvariantGlobalizationProps>("InvariantGlobalization")

/**
 * Indicates whether a class library is compatible with native AOT. Setting to true will enable analyzers for trimming, single file, and AOT.
 */
export interface IsAotCompatibleProps {

}

/**
 * Indicates whether a class library is compatible with native AOT. Setting to true will enable analyzers for trimming, single file, and AOT.
 */
export const IsAotCompatible = makeTag<IsAotCompatibleProps>("IsAotCompatible")

export interface IsAssemblyProps extends TaskTypeProps {
  Assemblies?: unknown
  AssemblyFiles: unknown
}

export const IsAssembly = makeTag<IsAssemblyProps>("IsAssembly")

export interface IsCodeSharingProjectProps {

}

export const IsCodeSharingProject = makeTag<IsCodeSharingProjectProps>("IsCodeSharingProject")

/**
 * Indicates whether the project can be used to create a NuGet package.
 */
export interface IsPackableProps {

}

/**
 * Indicates whether the project can be used to create a NuGet package.
 */
export const IsPackable = makeTag<IsPackableProps>("IsPackable")

/**
 * Controls whether the application is a test application. Set it to 'false' in a non-test project that references a test project to avoid error CS8892.
 */
export interface IsTestingPlatformApplicationProps {

}

/**
 * Controls whether the application is a test application. Set it to 'false' in a non-test project that references a test project to avoid error CS8892.
 */
export const IsTestingPlatformApplication = makeTag<IsTestingPlatformApplicationProps>("IsTestingPlatformApplication")

export interface IsWebBootstrapperProps {

}

export const IsWebBootstrapper = makeTag<IsWebBootstrapperProps>("IsWebBootstrapper")

export interface ItemProps extends SimpleItemTypeProps {
  /**
   * Optional expression evaluated to determine whether the items should be evaluated
   */
  Condition?: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to include in this item list
   */
  Include?: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to exclude from the Include list
   */
  Exclude?: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to remove from the existing list contents
   */
  Remove?: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to be updated with the metadata from contained in this xml element
   */
  Update?: string
  /**
   * Optional expression. Used to identify or order system and user elements
   */
  Label?: string
}

export const Item = makeTag<ItemProps>("Item")

export interface ItemDefinitionGroupProps {
  /**
   * Optional expression evaluated to determine whether the ItemDefinitionGroup should be used
   */
  Condition?: string
  /**
   * Optional expression. Used to identify or order system and user elements
   */
  Label?: string
}

export const ItemDefinitionGroup = makeTag<ItemDefinitionGroupProps>("ItemDefinitionGroup")

export interface ItemGroupProps {
  /**
   * Optional expression evaluated to determine whether the ItemGroup should be used
   */
  Condition?: string
  /**
   * Optional expression. Used to identify or order system and user elements
   */
  Label?: string
}

export const ItemGroup = makeTag<ItemGroupProps>("ItemGroup")

export interface JCPAProps extends StringPropertyTypeProps {

}

export const JCPA = makeTag<JCPAProps>("JCPA")

export interface KeyContainerProps {

}

export const KeyContainer = makeTag<KeyContainerProps>("KeyContainer")

export interface KeyFileProps {

}

export const KeyFile = makeTag<KeyFileProps>("KeyFile")

export interface KeywordProps extends StringPropertyTypeProps {

}

export const Keyword = makeTag<KeywordProps>("Keyword")

export interface LangVersionProps extends StringPropertyTypeProps {

}

export const LangVersion = makeTag<LangVersionProps>("LangVersion")

export interface LargeAddressAwareProps {

}

export const LargeAddressAware = makeTag<LargeAddressAwareProps>("LargeAddressAware")

/**
 * Full path to a folder with package layout.
 */
export interface LayoutDirProps extends StringPropertyTypeProps {

}

/**
 * Full path to a folder with package layout.
 */
export const LayoutDir = makeTag<LayoutDirProps>("LayoutDir")

export interface LCProps extends TaskTypeProps {
  EnvironmentVariables?: unknown
  LicenseTarget: unknown
  LogStandardErrorAsError?: boolean
  NoLogo?: boolean
  OutputDirectory?: unknown
  OutputLicense?: unknown
  ReferencedAssemblies?: unknown
  SdkToolsPath?: unknown
  Sources: unknown
  StandardErrorImportance?: unknown
  StandardOutputImportance?: unknown
  Timeout?: unknown
  ToolExe?: unknown
  ToolPath?: unknown
}

export const LC = makeTag<LCProps>("LC")

export interface LIBProps extends TaskTypeProps {
  AcceptableNonZeroExitCodes?: unknown
  ActiveToolSwitchesValues?: unknown
  AdditionalDependencies?: unknown
  AdditionalLibraryDirectories?: unknown
  AdditionalOptions?: unknown
  DisplayLibrary?: unknown
  EnvironmentVariables?: unknown
  ErrorReporting?: unknown
  ExcludedInputPaths?: unknown
  ExportNamedFunctions?: unknown
  ForceSymbolReferences?: unknown
  IgnoreAllDefaultLibraries?: boolean
  IgnoreSpecificDefaultLibraries?: unknown
  LinkLibraryDependencies?: boolean
  LinkTimeCodeGeneration?: boolean
  LogStandardErrorAsError?: boolean
  MinimalRebuildFromTracking?: boolean
  MinimumRequiredVersion?: unknown
  ModuleDefinitionFile?: unknown
  OutputFile?: unknown
  PathOverride?: unknown
  RemoveObjects?: unknown
  SkippedExecution?: boolean
  Sources: unknown
  SourcesCompiled?: unknown
  StandardErrorImportance?: unknown
  StandardOutputImportance?: unknown
  SubSystem?: unknown
  SuppressStartupBanner?: boolean
  TargetMachine?: unknown
  Timeout?: unknown
  TLogReadFiles?: unknown
  TLogWriteFiles?: unknown
  ToolExe?: unknown
  ToolPath?: unknown
  TrackedInputFilesToIgnore?: unknown
  TrackedOutputFilesToIgnore?: unknown
  TrackerLogDirectory?: unknown
  TrackFileAccess?: boolean
  TreatLibWarningAsErrors?: boolean
  UseUnicodeResponseFiles?: boolean
  Verbose?: boolean
}

export const LIB = makeTag<LIBProps>("LIB")

export interface LinkProps extends TaskTypeProps {
  AcceptableNonZeroExitCodes?: unknown
  ActiveToolSwitchesValues?: unknown
  AdditionalDependencies?: unknown
  AdditionalLibraryDirectories?: unknown
  AdditionalManifestDependencies?: unknown
  AdditionalOptions?: unknown
  AddModuleNamesToAssembly?: unknown
  AllowIsolation?: boolean
  AssemblyDebug?: boolean
  AssemblyLinkResource?: unknown
  BaseAddress?: unknown
  CLRImageType?: unknown
  CLRSupportLastError?: unknown
  CLRThreadAttribute?: unknown
  CLRUnmanagedCodeCheck?: boolean
  CreateHotPatchableImage?: unknown
  DataExecutionPrevention?: boolean
  DelayLoadDLLs?: unknown
  DelaySign?: boolean
  Driver?: unknown
  EmbedManagedResourceFile?: unknown
  EnableCOMDATFolding?: boolean
  EnableUAC?: boolean
  EntryPointSymbol?: unknown
  EnvironmentVariables?: unknown
  ExcludedInputPaths?: unknown
  FixedBaseAddress?: boolean
  ForceFileOutput?: unknown
  ForceSymbolReferences?: unknown
  FunctionOrder?: unknown
  GenerateDebugInformation?: boolean
  GenerateManifest?: boolean
  GenerateMapFile?: boolean
  HeapCommitSize?: unknown
  HeapReserveSize?: unknown
  IgnoreAllDefaultLibraries?: boolean
  IgnoreEmbeddedIDL?: boolean
  IgnoreImportLibrary?: boolean
  IgnoreSpecificDefaultLibraries?: unknown
  ImageHasSafeExceptionHandlers?: boolean
  ImportLibrary?: unknown
  KeyContainer?: unknown
  KeyFile?: unknown
  LargeAddressAware?: boolean
  LinkDLL?: boolean
  LinkErrorReporting?: unknown
  LinkIncremental?: boolean
  LinkLibraryDependencies?: boolean
  LinkStatus?: boolean
  LinkTimeCodeGeneration?: unknown
  LogStandardErrorAsError?: boolean
  ManifestFile?: unknown
  MapExports?: boolean
  MapFileName?: unknown
  MergedIDLBaseFileName?: unknown
  MergeSections?: unknown
  MidlCommandFile?: unknown
  MinimalRebuildFromTracking?: boolean
  MinimumRequiredVersion?: unknown
  ModuleDefinitionFile?: unknown
  MSDOSStubFileName?: unknown
  NoEntryPoint?: boolean
  ObjectFiles?: unknown
  OptimizeReferences?: boolean
  OutputFile?: unknown
  PathOverride?: unknown
  PerUserRedirection?: boolean
  PreprocessOutput?: unknown
  PreventDllBinding?: boolean
  Profile?: boolean
  ProfileGuidedDatabase?: unknown
  ProgramDatabaseFile?: unknown
  RandomizedBaseAddress?: boolean
  RegisterOutput?: boolean
  SectionAlignment?: unknown
  SetChecksum?: boolean
  ShowProgress?: unknown
  SkippedExecution?: boolean
  Sources: unknown
  SourcesCompiled?: unknown
  SpecifySectionAttributes?: unknown
  StackCommitSize?: unknown
  StackReserveSize?: unknown
  StandardErrorImportance?: unknown
  StandardOutputImportance?: unknown
  StripPrivateSymbols?: unknown
  SubSystem?: unknown
  SupportNobindOfDelayLoadedDLL?: boolean
  SupportUnloadOfDelayLoadedDLL?: boolean
  SuppressStartupBanner?: boolean
  SwapRunFromCD?: boolean
  SwapRunFromNET?: boolean
  TargetMachine?: unknown
  TerminalServerAware?: boolean
  Timeout?: unknown
  TLogReadFiles?: unknown
  TLogWriteFiles?: unknown
  ToolExe?: unknown
  ToolPath?: unknown
  TrackedInputFilesToIgnore?: unknown
  TrackedOutputFilesToIgnore?: unknown
  TrackerLogDirectory?: unknown
  TrackFileAccess?: boolean
  TreatLinkerWarningAsErrors?: boolean
  TurnOffAssemblyGeneration?: boolean
  TypeLibraryFile?: unknown
  TypeLibraryResourceID?: unknown
  UACExecutionLevel?: unknown
  UACUIAccess?: boolean
  UseLibraryDependencyInputs?: boolean
  Version?: unknown
}

export const Link = makeTag<LinkProps>("Link")

export interface LinkErrorReportingProps {

}

export const LinkErrorReporting = makeTag<LinkErrorReportingProps>("LinkErrorReporting")

export interface LinkIncrementalProps {

}

export const LinkIncremental = makeTag<LinkIncrementalProps>("LinkIncremental")

export interface LinkStatusProps {

}

export const LinkStatus = makeTag<LinkStatusProps>("LinkStatus")

export interface LinkTimeCodeGenerationProps {

}

export const LinkTimeCodeGeneration = makeTag<LinkTimeCodeGenerationProps>("LinkTimeCodeGeneration")

export interface LocaleIDProps {

}

export const LocaleID = makeTag<LocaleIDProps>("LocaleID")

export interface MakeAppxBundleProps extends MakeAppxWithOutputTypeProps {
  BundleDir: unknown
}

export const MakeAppxBundle = makeTag<MakeAppxBundleProps>("MakeAppxBundle")

/**
 * Full path to makeappx.exe utility.
 */
export interface MakeAppxExeFullPathProps extends StringPropertyTypeProps {

}

/**
 * Full path to makeappx.exe utility.
 */
export const MakeAppxExeFullPath = makeTag<MakeAppxExeFullPathProps>("MakeAppxExeFullPath")

export interface MakeAppxPackProps extends MakeAppxWithOutputTypeProps {
  ResourcePack?: boolean
  ValidateResourcesReferencedByManifest?: boolean
  HashAlgorithmId: unknown
  AppxManifest?: unknown
  FileMap: unknown
}

export const MakeAppxPack = makeTag<MakeAppxPackProps>("MakeAppxPack")

interface MakeAppxWithOutputTypeProps {
  Output: unknown
}

export const MakeAppxWithOutputType = makeTag<MakeAppxWithOutputTypeProps>("MakeAppxWithOutputType")

export interface MakeDirProps extends TaskTypeProps {
  Directories: unknown
}

export const MakeDir = makeTag<MakeDirProps>("MakeDir")

/**
 * Full path to makepri.exe utility.
 */
export interface MakePriExeFullPathProps extends StringPropertyTypeProps {

}

/**
 * Full path to makepri.exe utility.
 */
export const MakePriExeFullPath = makeTag<MakePriExeFullPathProps>("MakePriExeFullPath")

/**
 * Name of the binary containing managed WinMD in-proc implementation.
 */
export interface ManagedWinmdInprocImplementationProps extends StringPropertyTypeProps {

}

/**
 * Name of the binary containing managed WinMD in-proc implementation.
 */
export const ManagedWinmdInprocImplementation = makeTag<ManagedWinmdInprocImplementationProps>("ManagedWinmdInprocImplementation")

export interface ManifestProps extends SimpleItemTypeProps {

}

export const Manifest = makeTag<ManifestProps>("Manifest")

export interface ManifestCertificateThumbprintProps extends StringPropertyTypeProps {

}

export const ManifestCertificateThumbprint = makeTag<ManifestCertificateThumbprintProps>("ManifestCertificateThumbprint")

export interface ManifestFromManagedAssemblyProps {

}

export const ManifestFromManagedAssembly = makeTag<ManifestFromManagedAssemblyProps>("ManifestFromManagedAssembly")

export interface ManifestKeyFileProps extends StringPropertyTypeProps {

}

export const ManifestKeyFile = makeTag<ManifestKeyFileProps>("ManifestKeyFile")

export interface MapExportsProps {

}

export const MapExports = makeTag<MapExportsProps>("MapExports")

/**
 * boolean
 */
export interface MapFileExtensionsProps {

}

/**
 * boolean
 */
export const MapFileExtensions = makeTag<MapFileExtensionsProps>("MapFileExtensions")

export interface MapFileNameProps {

}

export const MapFileName = makeTag<MapFileNameProps>("MapFileName")

export interface MergedIDLBaseFileNameProps {

}

export const MergedIDLBaseFileName = makeTag<MergedIDLBaseFileNameProps>("MergedIDLBaseFileName")

export interface MergeSectionsProps {

}

export const MergeSections = makeTag<MergeSectionsProps>("MergeSections")

export interface MessageProps extends TaskTypeProps {
  Importance?: unknown /* msb:importance */
  Text?: unknown
}

export const Message = makeTag<MessageProps>("Message")

export interface MidlProps extends SimpleItemTypeProps {

}

export const Midl = makeTag<MidlProps>("Midl")

export interface MIDLProps extends TaskTypeProps {
  AcceptableNonZeroExitCodes?: unknown
  ActiveToolSwitchesValues?: unknown
  AdditionalIncludeDirectories?: unknown
  AdditionalOptions?: unknown
  ApplicationConfigurationMode?: boolean
  ClientStubFile?: unknown
  CPreprocessOptions?: unknown
  DefaultCharType?: unknown
  DllDataFileName?: unknown
  EnableErrorChecks?: unknown
  EnvironmentVariables?: unknown
  ErrorCheckAllocations?: boolean
  ErrorCheckBounds?: boolean
  ErrorCheckEnumRange?: boolean
  ErrorCheckRefPointers?: boolean
  ErrorCheckStubData?: boolean
  ExcludedInputPaths?: unknown
  GenerateClientFiles?: unknown
  GenerateServerFiles?: unknown
  GenerateStublessProxies?: boolean
  GenerateTypeLibrary?: boolean
  HeaderFileName?: unknown
  IgnoreStandardIncludePath?: boolean
  InterfaceIdentifierFileName?: unknown
  LocaleID?: unknown
  LogStandardErrorAsError?: boolean
  MinimalRebuildFromTracking?: boolean
  MkTypLibCompatible?: boolean
  OutputDirectory?: unknown
  PathOverride?: unknown
  PreprocessorDefinitions?: unknown
  ProxyFileName?: unknown
  RedirectOutputAndErrors?: unknown
  ServerStubFile?: unknown
  SkippedExecution?: boolean
  Source: unknown
  SourcesCompiled?: unknown
  StandardErrorImportance?: unknown
  StandardOutputImportance?: unknown
  StructMemberAlignment?: unknown
  SuppressCompilerWarnings?: boolean
  SuppressStartupBanner?: boolean
  TargetEnvironment?: unknown
  Timeout?: unknown
  TLogReadFiles?: unknown
  TLogWriteFiles?: unknown
  ToolExe?: unknown
  ToolPath?: unknown
  TrackedInputFilesToIgnore?: unknown
  TrackedOutputFilesToIgnore?: unknown
  TrackerLogDirectory?: unknown
  TrackFileAccess?: boolean
  TypeLibFormat?: unknown
  TypeLibraryName?: unknown
  UndefinePreprocessorDefinitions?: unknown
  ValidateAllParameters?: boolean
  WarnAsError?: boolean
  WarningLevel?: unknown
}

export const MIDL = makeTag<MIDLProps>("MIDL")

export interface MidlCommandFileProps {

}

export const MidlCommandFile = makeTag<MidlCommandFileProps>("MidlCommandFile")

export interface MinimalRebuildProps {

}

export const MinimalRebuild = makeTag<MinimalRebuildProps>("MinimalRebuild")

/**
 * Matches the expression "\d\.\d\.\d\.\d"
 */
export interface MinimumRequiredVersionProps extends StringPropertyTypeProps {

}

/**
 * Matches the expression "\d\.\d\.\d\.\d"
 */
export const MinimumRequiredVersion = makeTag<MinimumRequiredVersionProps>("MinimumRequiredVersion")

export interface MinimumVisualStudioVersionProps extends StringPropertyTypeProps {

}

export const MinimumVisualStudioVersion = makeTag<MinimumVisualStudioVersionProps>("MinimumVisualStudioVersion")

export interface MkTypLibCompatibleProps {

}

export const MkTypLibCompatible = makeTag<MkTypLibCompatibleProps>("MkTypLibCompatible")

export interface ModuleDefinitionFileProps {

}

export const ModuleDefinitionFile = makeTag<ModuleDefinitionFileProps>("ModuleDefinitionFile")

export interface MoveProps extends TaskTypeProps {
  DestinationFiles?: unknown
  DestinationFolder?: unknown
  OverwriteReadOnlyFiles?: boolean
  SourceFiles: unknown
}

export const Move = makeTag<MoveProps>("Move")

export interface MSBuildProps extends TaskTypeProps {
  BuildInParallel?: boolean
  Projects: unknown
  Properties?: unknown
  RebaseOutputs?: boolean
  RunEachTargetSeparately?: boolean
  SkipNonexistentProjects?: boolean
  SkipNonexistentTargets?: boolean
  StopOnFirstFailure?: boolean
  TargetAndPropertyListSeparators?: unknown
  Targets?: unknown
  ToolsVersion?: unknown
  UnloadProjectsOnCompletion?: boolean
  UseResultsCache?: boolean
}

export const MSBuild = makeTag<MSBuildProps>("MSBuild")

export interface MSBuildAllProjectsProps extends StringPropertyTypeProps {

}

export const MSBuildAllProjects = makeTag<MSBuildAllProjectsProps>("MSBuildAllProjects")

/**
 * Indicates whether to treat all warnings as errors when building a project.
 */
export interface MSBuildTreatWarningsAsErrorsProps extends StringPropertyTypeProps {

}

/**
 * Indicates whether to treat all warnings as errors when building a project.
 */
export const MSBuildTreatWarningsAsErrors = makeTag<MSBuildTreatWarningsAsErrorsProps>("MSBuildTreatWarningsAsErrors")

/**
 * Indicates a semicolon delimited list of warnings to treat as errors when building a project.
 */
export interface MSBuildWarningsAsErrorsProps extends StringPropertyTypeProps {

}

/**
 * Indicates a semicolon delimited list of warnings to treat as errors when building a project.
 */
export const MSBuildWarningsAsErrors = makeTag<MSBuildWarningsAsErrorsProps>("MSBuildWarningsAsErrors")

/**
 * Indicates a semicolon delimited list of warnings to treat as low importance messages when building a project.
 */
export interface MSBuildWarningsAsMessagesProps extends StringPropertyTypeProps {

}

/**
 * Indicates a semicolon delimited list of warnings to treat as low importance messages when building a project.
 */
export const MSBuildWarningsAsMessages = makeTag<MSBuildWarningsAsMessagesProps>("MSBuildWarningsAsMessages")

export interface MSDOSStubFileNameProps {

}

export const MSDOSStubFileName = makeTag<MSDOSStubFileNameProps>("MSDOSStubFileName")

export interface MtProps extends TaskTypeProps {
  AcceptableNonZeroExitCodes?: unknown
  ActiveToolSwitchesValues?: unknown
  AdditionalManifestFiles?: unknown
  AdditionalOptions?: unknown
  AssemblyIdentity?: unknown
  ComponentFileName?: unknown
  EmbedManifest?: boolean
  EnvironmentVariables?: unknown
  ExcludedInputPaths?: unknown
  GenerateCatalogFiles?: boolean
  GenerateCategoryTags?: boolean
  InputResourceManifests?: unknown
  LogStandardErrorAsError?: boolean
  ManifestFromManagedAssembly?: unknown
  MinimalRebuildFromTracking?: boolean
  OutputManifestFile?: unknown
  OutputResourceManifests?: unknown
  PathOverride?: unknown
  RegistrarScriptFile?: unknown
  ReplacementsFile?: unknown
  ResourceOutputFileName?: unknown
  SkippedExecution?: boolean
  Sources?: unknown
  SourcesCompiled?: unknown
  StandardErrorImportance?: unknown
  StandardOutputImportance?: unknown
  SuppressDependencyElement?: boolean
  SuppressStartupBanner?: boolean
  Timeout?: unknown
  TLogReadFiles?: unknown
  TLogWriteFiles?: unknown
  ToolExe?: unknown
  ToolPath?: unknown
  TrackedInputFilesToIgnore?: unknown
  TrackedOutputFilesToIgnore?: unknown
  TrackerLogDirectory?: unknown
  TrackFileAccess?: boolean
  TypeLibraryFile?: unknown
  UpdateFileHashes?: boolean
  UpdateFileHashesSearchPath?: unknown
  VerboseOutput?: boolean
}

export const Mt = makeTag<MtProps>("Mt")

export interface MultiProcessorCompilationProps {

}

export const MultiProcessorCompilation = makeTag<MultiProcessorCompilationProps>("MultiProcessorCompilation")

export interface MyTypeProps extends StringPropertyTypeProps {

}

export const MyType = makeTag<MyTypeProps>("MyType")

/**
 * Reference to a native manifest file, or to a file that contains a native manifest
 */
export interface NativeReferenceProps extends SimpleItemTypeProps {
  /**
   * Reference full name
   */
  Include?: string
}

/**
 * Reference to a native manifest file, or to a file that contains a native manifest
 */
export const NativeReference = makeTag<NativeReferenceProps>("NativeReference")

/**
 * The locale ID for the NuGet package
 */
export interface NeutralLanguageProps extends StringPropertyTypeProps {

}

/**
 * The locale ID for the NuGet package
 */
export const NeutralLanguage = makeTag<NeutralLanguageProps>("NeutralLanguage")

export interface NoConfigProps extends StringPropertyTypeProps {

}

export const NoConfig = makeTag<NoConfigProps>("NoConfig")

/**
 * Files that should have no role in the build process
 */
export interface NoneProps extends SimpleItemTypeProps {

}

/**
 * Files that should have no role in the build process
 */
export const None = makeTag<NoneProps>("None")

export interface NoStandardLibrariesProps extends StringPropertyTypeProps {

}

export const NoStandardLibraries = makeTag<NoStandardLibrariesProps>("NoStandardLibraries")

/**
 * Whether standard libraries (such as mscorlib) should be referenced automatically (boolean)
 */
export interface NoStdLibProps {

}

/**
 * Whether standard libraries (such as mscorlib) should be referenced automatically (boolean)
 */
export const NoStdLib = makeTag<NoStdLibProps>("NoStdLib")

/**
 * Comma separated list of disabled warnings
 */
export interface NoWarnProps extends StringPropertyTypeProps {

}

/**
 * Comma separated list of disabled warnings
 */
export const NoWarn = makeTag<NoWarnProps>("NoWarn")

/**
 * Set the nullable annotations and warnings context for the C# project. Possible values are enable, disable, warnings and annotations.
 */
export interface NullableProps {

}

/**
 * Set the nullable annotations and warnings context for the C# project. Possible values are enable, disable, warnings and annotations.
 */
export const Nullable = makeTag<NullableProps>("Nullable")

export interface NullTerminateStringsProps {

}

export const NullTerminateStrings = makeTag<NullTerminateStringsProps>("NullTerminateStrings")

export interface OldToolsVersionProps extends StringPropertyTypeProps {

}

export const OldToolsVersion = makeTag<OldToolsVersionProps>("OldToolsVersion")

export interface OmitDefaultLibNameProps {

}

export const OmitDefaultLibName = makeTag<OmitDefaultLibNameProps>("OmitDefaultLibName")

export interface OnErrorProps {
  /**
   * Optional expression evaluated to determine whether the targets should be executed
   */
  Condition?: string
  /**
   * Semi-colon separated list of targets to execute
   */
  ExecuteTargets: unknown /* msb:non_empty_string */
  /**
   * Optional expression. Used to identify or order system and user elements
   */
  Label?: string
}

export const OnError = makeTag<OnErrorProps>("OnError")

/**
 * boolean
 */
export interface OpenBrowserOnPublishProps {

}

/**
 * boolean
 */
export const OpenBrowserOnPublish = makeTag<OpenBrowserOnPublishProps>("OpenBrowserOnPublish")

export interface OpenMPSupportProps {

}

export const OpenMPSupport = makeTag<OpenMPSupportProps>("OpenMPSupport")

export interface OptimizationProps {

}

export const Optimization = makeTag<OptimizationProps>("Optimization")

/**
 * Should compiler optimize output (boolean)
 */
export interface OptimizeProps {

}

/**
 * Should compiler optimize output (boolean)
 */
export const Optimize = makeTag<OptimizeProps>("Optimize")

export interface OptimizeReferencesProps {

}

export const OptimizeReferences = makeTag<OptimizeReferencesProps>("OptimizeReferences")

/**
 * Option Compare setting (Text or Binary)
 */
export interface OptionCompareProps extends StringPropertyTypeProps {

}

/**
 * Option Compare setting (Text or Binary)
 */
export const OptionCompare = makeTag<OptionCompareProps>("OptionCompare")

/**
 * Should Option Explicit be set (On or Off)
 */
export interface OptionExplicitProps extends StringPropertyTypeProps {

}

/**
 * Should Option Explicit be set (On or Off)
 */
export const OptionExplicit = makeTag<OptionExplicitProps>("OptionExplicit")

/**
 * Should Option Infer be set (On or Off)
 */
export interface OptionInferProps extends StringPropertyTypeProps {

}

/**
 * Should Option Infer be set (On or Off)
 */
export const OptionInfer = makeTag<OptionInferProps>("OptionInfer")

/**
 * Should Option Strict be set (On or Off)
 */
export interface OptionStrictProps extends StringPropertyTypeProps {

}

/**
 * Should Option Strict be set (On or Off)
 */
export const OptionStrict = makeTag<OptionStrictProps>("OptionStrict")

export interface OSVersionProps extends StringPropertyTypeProps {

}

export const OSVersion = makeTag<OSVersionProps>("OSVersion")

export interface OtherwiseProps {

}

export const Otherwise = makeTag<OtherwiseProps>("Otherwise")

export interface OutDirProps extends StringPropertyTypeProps {

}

export const OutDir = makeTag<OutDirProps>("OutDir")

/**
 * Optional element specifying a specific task output to be gathered
 */
export interface OutputProps {
  /**
   * Task parameter to gather. Matches the name of a .NET Property on the task class that has an [Output] attribute
   */
  TaskParameter: unknown /* msb:non_empty_string */
  /**
   * Optional name of an item list to put the gathered outputs into. Either ItemName or PropertyName must be specified
   */
  ItemName?: unknown /* msb:non_empty_string */
  /**
   * Optional name of a property to put the gathered output into. Either PropertyName or ItemName must be specified
   */
  PropertyName?: unknown /* msb:non_empty_string */
  /**
   * Optional expression evaluated to determine whether the output should be gathered
   */
  Condition?: string
}

/**
 * Optional element specifying a specific task output to be gathered
 */
export const Output = makeTag<OutputProps>("Output")

export interface OutputDirectoryProps {

}

export const OutputDirectory = makeTag<OutputDirectoryProps>("OutputDirectory")

export interface OutputFileProps {

}

export const OutputFile = makeTag<OutputFileProps>("OutputFile")

export interface OutputManifestFileProps {

}

export const OutputManifestFile = makeTag<OutputManifestFileProps>("OutputManifestFile")

/**
 * Path to output folder, with trailing slash
 */
export interface OutputPathProps extends StringPropertyTypeProps {

}

/**
 * Path to output folder, with trailing slash
 */
export const OutputPath = makeTag<OutputPathProps>("OutputPath")

export interface OutputResourceManifestsProps {

}

export const OutputResourceManifests = makeTag<OutputResourceManifestsProps>("OutputResourceManifests")

export interface OutputsProps {

}

export const Outputs = makeTag<OutputsProps>("Outputs")

/**
 * Type of output to generate (WinExe, Exe, or Library)
 */
export interface OutputTypeProps extends StringPropertyTypeProps {

}

/**
 * Type of output to generate (WinExe, Exe, or Library)
 */
export const OutputType = makeTag<OutputTypeProps>("OutputType")

/**
 * Overwrite Store Submission that has been queued by a previous build.
 */
export interface OverwritePendingSubmissionProps extends StringPropertyTypeProps {

}

/**
 * Overwrite Store Submission that has been queued by a previous build.
 */
export const OverwritePendingSubmission = makeTag<OverwritePendingSubmissionProps>("OverwritePendingSubmission")

/**
 * App package certificate key file.
 */
export interface PackageCertificateKeyFileProps extends StringPropertyTypeProps {

}

/**
 * App package certificate key file.
 */
export const PackageCertificateKeyFile = makeTag<PackageCertificateKeyFileProps>("PackageCertificateKeyFile")

/**
 * The URL for a 64x64 image with transparent background to use as the icon for the NuGet package in UI display
 */
export interface PackageIconUrlProps extends StringPropertyTypeProps {

}

/**
 * The URL for a 64x64 image with transparent background to use as the icon for the NuGet package in UI display
 */
export const PackageIconUrl = makeTag<PackageIconUrlProps>("PackageIconUrl")

/**
 * The case-insensitive NuGet package identifier, which must be unique across nuget.org or whatever gallery the NuGet package will reside in. IDs may not contain spaces or characters that are not valid for a URL, and generally follow .NET namespace rules.
 */
export interface PackageIdProps extends StringPropertyTypeProps {

}

/**
 * The case-insensitive NuGet package identifier, which must be unique across nuget.org or whatever gallery the NuGet package will reside in. IDs may not contain spaces or characters that are not valid for a URL, and generally follow .NET namespace rules.
 */
export const PackageId = makeTag<PackageIdProps>("PackageId")

/**
 * The project license's SPDX identifier. Only OSI and FSF approved licenses can use an identifier. Other licenses should use PackageLicenseFile.
 */
export interface PackageLicenseExpressionProps extends StringPropertyTypeProps {

}

/**
 * The project license's SPDX identifier. Only OSI and FSF approved licenses can use an identifier. Other licenses should use PackageLicenseFile.
 */
export const PackageLicenseExpression = makeTag<PackageLicenseExpressionProps>("PackageLicenseExpression")

/**
 * A path to the package's license file. Should only be used when the package doesn't use an OSI or FSF approved license.
 */
export interface PackageLicenseFileProps extends StringPropertyTypeProps {

}

/**
 * A path to the package's license file. Should only be used when the package doesn't use an OSI or FSF approved license.
 */
export const PackageLicenseFile = makeTag<PackageLicenseFileProps>("PackageLicenseFile")

/**
 * Path to the output folder for the package generated when calling Pack.
 */
export interface PackageOutputPathProps {

}

/**
 * Path to the output folder for the package generated when calling Pack.
 */
export const PackageOutputPath = makeTag<PackageOutputPathProps>("PackageOutputPath")

/**
 * The URL for the NuGet package's home page, often shown in UI displays as well as nuget.org
 */
export interface PackageProjectUrlProps extends StringPropertyTypeProps {

}

/**
 * The URL for the NuGet package's home page, often shown in UI displays as well as nuget.org
 */
export const PackageProjectUrl = makeTag<PackageProjectUrlProps>("PackageProjectUrl")

/**
 * Reference to a package
 */
export interface PackageReferenceProps extends SimpleItemTypeProps {
  /**
   * Name of the package
   */
  Include?: string
  /**
   * Version of dependency
   */
  Version?: string
  /**
   * Assets to include from this reference
   */
  IncludeAssets?: string
  /**
   * Assets to exclude from this reference
   */
  ExcludeAssets?: string
  /**
   * Assets that are private in this reference
   */
  PrivateAssets?: string
  /**
   * Semicolon-separated list of warning codes to ignore (such as NU1605)
   */
  NoWarn?: string
  /**
   * Set to true to generate a Pkg* property that points to the restored location of the NuGet package contents
   */
  GeneratePathProperty?: string
  /**
   * When using Central Package Management (CPM), overrides the centrally defined version for this package.  If the project is not using CPM, this attribute has no effect.
   */
  VersionOverride?: string
}

/**
 * Reference to a package
 */
export const PackageReference = makeTag<PackageReferenceProps>("PackageReference")

/**
 * A description of the changes made in this release of the NuGet package, often used in UI like the Updates tab of the Visual Studio Package Manager in place of the package description
 */
export interface PackageReleaseNotesProps extends StringPropertyTypeProps {

}

/**
 * A description of the changes made in this release of the NuGet package, often used in UI like the Updates tab of the Visual Studio Package Manager in place of the package description
 */
export const PackageReleaseNotes = makeTag<PackageReleaseNotesProps>("PackageReleaseNotes")

/**
 * Value indicating whether the client must prompt the consumer to accept the NuGet package license before installing the package
 */
export interface PackageRequireLicenseAcceptanceProps {

}

/**
 * Value indicating whether the client must prompt the consumer to accept the NuGet package license before installing the package
 */
export const PackageRequireLicenseAcceptance = makeTag<PackageRequireLicenseAcceptanceProps>("PackageRequireLicenseAcceptance")

/**
 * A space-delimited list of tags and keywords that describe the NuGet package and aid discoverability of NuGet packages through search and filtering mechanisms
 */
export interface PackageTagsProps extends StringPropertyTypeProps {

}

/**
 * A space-delimited list of tags and keywords that describe the NuGet package and aid discoverability of NuGet packages through search and filtering mechanisms
 */
export const PackageTags = makeTag<PackageTagsProps>("PackageTags")

/**
 * Allows packages using alternative monikers to be referenced in this project, which include older (e.g. dnxcore50, dotnet5.x) and Portable Class Library names.
 */
export interface PackageTargetFallbackProps {

}

/**
 * Allows packages using alternative monikers to be referenced in this project, which include older (e.g. dnxcore50, dotnet5.x) and Portable Class Library names.
 */
export const PackageTargetFallback = makeTag<PackageTargetFallbackProps>("PackageTargetFallback")

/**
 * Indicates what the intended package use is, e.g. .NET CLI global tool, standard dependency, etc.
 */
export interface PackageTypeProps extends StringPropertyTypeProps {

}

/**
 * Indicates what the intended package use is, e.g. .NET CLI global tool, standard dependency, etc.
 */
export const PackageType = makeTag<PackageTypeProps>("PackageType")

/**
 * Numeric value of the NuGet package version in the format major.minor.patch pattern (e.g. 1.0.1). Version numbers may include a pre-release suffix (e.g. 1.0.1-beta)
 */
export interface PackageVersionProps extends StringPropertyTypeProps {

}

/**
 * Numeric value of the NuGet package version in the format major.minor.patch pattern (e.g. 1.0.1). Version numbers may include a pre-release suffix (e.g. 1.0.1-beta)
 */
export const PackageVersion = makeTag<PackageVersionProps>("PackageVersion")

/**
 * Full path to a text file containing packaging directory writes log.
 */
export interface PackagingDirectoryWritesLogPathProps extends StringPropertyTypeProps {

}

/**
 * Full path to a text file containing packaging directory writes log.
 */
export const PackagingDirectoryWritesLogPath = makeTag<PackagingDirectoryWritesLogPathProps>("PackagingDirectoryWritesLogPath")

/**
 * Full path to a text file containing packaging file writes log.
 */
export interface PackagingFileWritesLogPathProps extends StringPropertyTypeProps {

}

/**
 * Full path to a text file containing packaging file writes log.
 */
export const PackagingFileWritesLogPath = makeTag<PackagingFileWritesLogPathProps>("PackagingFileWritesLogPath")

/**
 * Indicate whether the NuGet package should be configured as a .NET tool suitable for use with "dotnet tool install".
 */
export interface PackAsToolProps {

}

/**
 * Indicate whether the NuGet package should be configured as a .NET tool suitable for use with "dotnet tool install".
 */
export const PackAsTool = makeTag<PackAsToolProps>("PackAsTool")

/**
 * XAML files that are converted to binary and compiled into the assembly
 */
export interface PageProps extends SimpleItemTypeProps {
  /**
   * Semi-colon separated list of XAML files (wildcards are allowed)
   */
  Include?: string
  CopyToOutputDirectory?: unknown
}

/**
 * XAML files that are converted to binary and compiled into the assembly
 */
export const Page = makeTag<PageProps>("Page")

export interface ParameterGroupProps {

}

export const ParameterGroup = makeTag<ParameterGroupProps>("ParameterGroup")

export interface ParsePlatformSpecificBundleArtifactsListsProps extends TaskTypeProps {
  Files: unknown
  Artifacts?: unknown
}

export const ParsePlatformSpecificBundleArtifactsLists = makeTag<ParsePlatformSpecificBundleArtifactsListsProps>("ParsePlatformSpecificBundleArtifactsLists")

/**
 * Full path to pdbcopy.exe utility.
 */
export interface PdbCopyExeFullPathProps extends StringPropertyTypeProps {

}

/**
 * Full path to pdbcopy.exe utility.
 */
export const PdbCopyExeFullPath = makeTag<PdbCopyExeFullPathProps>("PdbCopyExeFullPath")

export interface PlatformProps extends StringPropertyTypeProps {

}

export const Platform = makeTag<PlatformProps>("Platform")

export interface PlatformFamilyNameProps extends StringPropertyTypeProps {

}

export const PlatformFamilyName = makeTag<PlatformFamilyNameProps>("PlatformFamilyName")

export interface PlatformIDProps extends StringPropertyTypeProps {

}

export const PlatformID = makeTag<PlatformIDProps>("PlatformID")

export interface PlatformNameProps extends StringPropertyTypeProps {

}

export const PlatformName = makeTag<PlatformNameProps>("PlatformName")

/**
 * Full path to a folder where platform-specific bundle artifact list files are stored.
 */
export interface PlatformSpecificBundleArtifactsListDirProps extends StringPropertyTypeProps {

}

/**
 * Full path to a folder where platform-specific bundle artifact list files are stored.
 */
export const PlatformSpecificBundleArtifactsListDir = makeTag<PlatformSpecificBundleArtifactsListDirProps>("PlatformSpecificBundleArtifactsListDir")

/**
 * Name of the folder where platform-specific bundle artifact lists are stored.
 */
export interface PlatformSpecificBundleArtifactsListDirNameProps extends StringPropertyTypeProps {

}

/**
 * Name of the folder where platform-specific bundle artifact lists are stored.
 */
export const PlatformSpecificBundleArtifactsListDirName = makeTag<PlatformSpecificBundleArtifactsListDirNameProps>("PlatformSpecificBundleArtifactsListDirName")

export interface PlatformTargetProps extends StringPropertyTypeProps {

}

export const PlatformTarget = makeTag<PlatformTargetProps>("PlatformTarget")

export interface PlatformToolsetProps extends StringPropertyTypeProps {

}

export const PlatformToolset = makeTag<PlatformToolsetProps>("PlatformToolset")

/**
 * Platform version description. Used to map between internal OS version and marketing OS version.
 */
export interface PlatformVersionDescriptionProps extends SimpleItemTypeProps {

}

/**
 * Platform version description. Used to map between internal OS version and marketing OS version.
 */
export const PlatformVersionDescription = makeTag<PlatformVersionDescriptionProps>("PlatformVersionDescription")

/**
 * Command line to be run at the end of build
 */
export interface PostBuildEventProps extends StringPropertyTypeProps {

}

/**
 * Command line to be run at the end of build
 */
export const PostBuildEvent = makeTag<PostBuildEventProps>("PostBuildEvent")

/**
 * Command line to be run at the start of build
 */
export interface PreBuildEventProps extends StringPropertyTypeProps {

}

/**
 * Command line to be run at the start of build
 */
export const PreBuildEvent = makeTag<PreBuildEventProps>("PreBuildEvent")

export interface PrecompiledHeaderProps {

}

export const PrecompiledHeader = makeTag<PrecompiledHeaderProps>("PrecompiledHeader")

export interface PrecompiledHeaderFileProps {

}

export const PrecompiledHeaderFile = makeTag<PrecompiledHeaderFileProps>("PrecompiledHeaderFile")

export interface Prefer32BitProps {

}

export const Prefer32Bit = makeTag<Prefer32BitProps>("Prefer32Bit")

export interface PreferNativeArm64Props {

}

export const PreferNativeArm64 = makeTag<PreferNativeArm64Props>("PreferNativeArm64")

export interface PreLinkEventProps extends SimpleItemTypeProps {

}

export const PreLinkEvent = makeTag<PreLinkEventProps>("PreLinkEvent")

export interface PreprocessorDefinitionsProps {

}

export const PreprocessorDefinitions = makeTag<PreprocessorDefinitionsProps>("PreprocessorDefinitions")

/**
 * Value indicating whether reference assemblies can be used in dynamic compilation
 */
export interface PreserveCompilationContextProps {

}

/**
 * Value indicating whether reference assemblies can be used in dynamic compilation
 */
export const PreserveCompilationContext = makeTag<PreserveCompilationContextProps>("PreserveCompilationContext")

export interface PreventDllBindingProps {

}

export const PreventDllBinding = makeTag<PreventDllBindingProps>("PreventDllBinding")

/**
 * String resources to be indexed in app package's resource index.
 */
export interface PRIResourceProps extends SimpleItemTypeProps {

}

/**
 * String resources to be indexed in app package's resource index.
 */
export const PRIResource = makeTag<PRIResourceProps>("PRIResource")

export interface ProduceReferenceAssemblyProps {

}

export const ProduceReferenceAssembly = makeTag<ProduceReferenceAssemblyProps>("ProduceReferenceAssembly")

/**
 * Product name information for the assembly manifest
 */
export interface ProductProps extends StringPropertyTypeProps {

}

/**
 * Product name information for the assembly manifest
 */
export const Product = makeTag<ProductProps>("Product")

export interface ProductNameProps extends StringPropertyTypeProps {

}

export const ProductName = makeTag<ProductNameProps>("ProductName")

export interface ProductVersionProps extends StringPropertyTypeProps {

}

export const ProductVersion = makeTag<ProductVersionProps>("ProductVersion")

export interface ProfileProps {

}

export const Profile = makeTag<ProfileProps>("Profile")

export interface ProfileGuidedDatabaseProps {

}

export const ProfileGuidedDatabase = makeTag<ProfileGuidedDatabaseProps>("ProfileGuidedDatabase")

export interface ProgramDatabaseFileProps {

}

export const ProgramDatabaseFile = makeTag<ProgramDatabaseFileProps>("ProgramDatabaseFile")

/**
 * ProGuard configuration files to be used within a Xamarin.Android project.
 */
export interface ProguardConfigurationProps {

}

/**
 * ProGuard configuration files to be used within a Xamarin.Android project.
 */
export const ProguardConfiguration = makeTag<ProguardConfigurationProps>("ProguardConfiguration")

/**
 * An MSBuild Project
 */
export interface ProjectProps {
  /**
   * Optional semi-colon separated list of one or more targets that will be built if no targets are otherwise specified
   */
  DefaultTargets?: string
  /**
   * Optional semi-colon separated list of targets that should always be built before any other targets
   */
  InitialTargets?: string
  /**
   * Optional string describing the MSBuild SDK(s) this project should be built with
   */
  Sdk?: string
  /**
   * Optional string describing the toolset version this project should normally be built with
   */
  ToolsVersion?: string
}

/**
 * An MSBuild Project
 */
export const Project = makeTag<ProjectProps>("Project")

/**
 * Project Capability that may activate design-time components in an IDE.
 */
export interface ProjectCapabilityProps {

}

/**
 * Project Capability that may activate design-time components in an IDE.
 */
export const ProjectCapability = makeTag<ProjectCapabilityProps>("ProjectCapability")

export interface ProjectConfigurationProps extends SimpleItemTypeProps {

}

export const ProjectConfiguration = makeTag<ProjectConfigurationProps>("ProjectConfiguration")

export interface ProjectExtensionsProps {

}

export const ProjectExtensions = makeTag<ProjectExtensionsProps>("ProjectExtensions")

export interface ProjectGuidProps extends StringPropertyTypeProps {

}

export const ProjectGuid = makeTag<ProjectGuidProps>("ProjectGuid")

export interface ProjectPriFileProps extends SimpleItemTypeProps {

}

export const ProjectPriFile = makeTag<ProjectPriFileProps>("ProjectPriFile")

/**
 * File name to use for project-specific resource index file (PRI).
 */
export interface ProjectPriFileNameProps extends StringPropertyTypeProps {

}

/**
 * File name to use for project-specific resource index file (PRI).
 */
export const ProjectPriFileName = makeTag<ProjectPriFileNameProps>("ProjectPriFileName")

/**
 * Full path to project-specific resource index file (PRI).
 */
export interface ProjectPriFullPathProps extends StringPropertyTypeProps {

}

/**
 * Full path to project-specific resource index file (PRI).
 */
export const ProjectPriFullPath = makeTag<ProjectPriFullPathProps>("ProjectPriFullPath")

/**
 * Name of the resource index used in the generated .pri file.
 */
export interface ProjectPriIndexNameProps extends StringPropertyTypeProps {

}

/**
 * Name of the resource index used in the generated .pri file.
 */
export const ProjectPriIndexName = makeTag<ProjectPriIndexNameProps>("ProjectPriIndexName")

/**
 * Reference to another project
 */
export interface ProjectReferenceProps extends SimpleItemTypeProps {
  /**
   * Path to project file
   */
  Include?: string
}

/**
 * Reference to another project
 */
export const ProjectReference = makeTag<ProjectReferenceProps>("ProjectReference")

export interface ProjectTypeProps extends StringPropertyTypeProps {

}

export const ProjectType = makeTag<ProjectTypeProps>("ProjectType")

export interface ProjectTypeGuidsProps extends StringPropertyTypeProps {

}

export const ProjectTypeGuids = makeTag<ProjectTypeGuidsProps>("ProjectTypeGuids")

export interface PropertyProps {

}

export const Property = makeTag<PropertyProps>("Property")

export interface PropertyGroupProps {
  /**
   * Optional expression evaluated to determine whether the PropertyGroup should be used
   */
  Condition?: string
  /**
   * Optional expression. Used to identify or order system and user elements
   */
  Label?: string
}

export const PropertyGroup = makeTag<PropertyGroupProps>("PropertyGroup")

export interface ProxyFileNameProps {

}

export const ProxyFileName = makeTag<ProxyFileNameProps>("ProxyFileName")

/**
 * Indicates whether the project should produce native ahead-of-time compiled images during publish.
 */
export interface PublishAotProps {

}

/**
 * Indicates whether the project should produce native ahead-of-time compiled images during publish.
 */
export const PublishAot = makeTag<PublishAotProps>("PublishAot")

export interface PublisherNameProps extends StringPropertyTypeProps {

}

export const PublisherName = makeTag<PublisherNameProps>("PublisherName")

export interface PublishFileProps extends SimpleItemTypeProps {

}

export const PublishFile = makeTag<PublishFileProps>("PublishFile")

/**
 * Indicates whether the project should produce ReadyToRun images during publish.
 */
export interface PublishReadyToRunProps {

}

/**
 * Indicates whether the project should produce ReadyToRun images during publish.
 */
export const PublishReadyToRun = makeTag<PublishReadyToRunProps>("PublishReadyToRun")

/**
 * Indicates whether the project should bundle all application-dependent files into a single binary during publish.
 */
export interface PublishSingleFileProps {

}

/**
 * Indicates whether the project should bundle all application-dependent files into a single binary during publish.
 */
export const PublishSingleFile = makeTag<PublishSingleFileProps>("PublishSingleFile")

/**
 * Indicates whether the project should produce trimmed assembly images during publish.
 */
export interface PublishTrimmedProps {

}

/**
 * Indicates whether the project should produce trimmed assembly images during publish.
 */
export const PublishTrimmed = makeTag<PublishTrimmedProps>("PublishTrimmed")

export interface PublishUrlProps extends StringPropertyTypeProps {

}

export const PublishUrl = makeTag<PublishUrlProps>("PublishUrl")

export interface RandomizedBaseAddressProps {

}

export const RandomizedBaseAddress = makeTag<RandomizedBaseAddressProps>("RandomizedBaseAddress")

/**
 * Indicates whether Razor files should be compiled at build time.
 */
export interface RazorCompileOnBuildProps {

}

/**
 * Indicates whether Razor files should be compiled at build time.
 */
export const RazorCompileOnBuild = makeTag<RazorCompileOnBuildProps>("RazorCompileOnBuild")

/**
 * Indicates whether Razor files should be compiled at publish time.
 */
export interface RazorCompileOnPublishProps {

}

/**
 * Indicates whether Razor files should be compiled at publish time.
 */
export const RazorCompileOnPublish = makeTag<RazorCompileOnPublishProps>("RazorCompileOnPublish")

/**
 * Directory for Razor output.
 */
export interface RazorOutputPathProps extends StringPropertyTypeProps {

}

/**
 * Directory for Razor output.
 */
export const RazorOutputPath = makeTag<RazorOutputPathProps>("RazorOutputPath")

/**
 * File name (without extension) of the assembly produced by Razor.
 */
export interface RazorTargetNameProps extends StringPropertyTypeProps {

}

/**
 * File name (without extension) of the assembly produced by Razor.
 */
export const RazorTargetName = makeTag<RazorTargetNameProps>("RazorTargetName")

export interface RCProps extends TaskTypeProps {
  AcceptableNonZeroExitCodes?: unknown
  ActiveToolSwitchesValues?: unknown
  AdditionalIncludeDirectories?: unknown
  AdditionalOptions?: unknown
  Culture?: unknown
  EnvironmentVariables?: unknown
  ExcludedInputPaths?: unknown
  IgnoreStandardIncludePath?: boolean
  LogStandardErrorAsError?: boolean
  MinimalRebuildFromTracking?: boolean
  NullTerminateStrings?: boolean
  PathOverride?: unknown
  PreprocessorDefinitions?: unknown
  ResourceOutputFileName?: unknown
  ShowProgress?: boolean
  SkippedExecution?: boolean
  Source: unknown
  SourcesCompiled?: unknown
  StandardErrorImportance?: unknown
  StandardOutputImportance?: unknown
  Timeout?: unknown
  TLogReadFiles?: unknown
  TLogWriteFiles?: unknown
  ToolExe?: unknown
  ToolPath?: unknown
  TrackedInputFilesToIgnore?: unknown
  TrackedOutputFilesToIgnore?: unknown
  TrackerLogDirectory?: unknown
  TrackFileAccess?: boolean
  UndefinePreprocessorDefinitions?: unknown
}

export const RC = makeTag<RCProps>("RC")

export interface ReadLinesFromFileProps extends TaskTypeProps {
  File: unknown
  Lines?: unknown
}

export const ReadLinesFromFile = makeTag<ReadLinesFromFileProps>("ReadLinesFromFile")

export interface RecursePathProps extends StringPropertyTypeProps {

}

export const RecursePath = makeTag<RecursePathProps>("RecursePath")

export interface RedirectOutputAndErrorsProps {

}

export const RedirectOutputAndErrors = makeTag<RedirectOutputAndErrorsProps>("RedirectOutputAndErrors")

/**
 * Reference to an assembly
 */
export interface ReferenceProps extends SimpleItemTypeProps {
  /**
   * Assembly name or filename
   */
  Include?: string
}

/**
 * Reference to an assembly
 */
export const Reference = makeTag<ReferenceProps>("Reference")

/**
 * Semi-colon separated list of folders to search during reference resolution
 */
export interface ReferencePathProps extends StringPropertyTypeProps {

}

/**
 * Semi-colon separated list of folders to search during reference resolution
 */
export const ReferencePath = makeTag<ReferencePathProps>("ReferencePath")

export interface RegisterAssemblyProps extends TaskTypeProps {
  Assemblies: unknown
  AssemblyListFile?: unknown
  CreateCodeBase?: boolean
  TypeLibFiles?: unknown
}

export const RegisterAssembly = makeTag<RegisterAssemblyProps>("RegisterAssembly")

export interface RegisterForComInteropProps extends StringPropertyTypeProps {

}

export const RegisterForComInterop = makeTag<RegisterForComInteropProps>("RegisterForComInterop")

export interface RegisterOutputProps {

}

export const RegisterOutput = makeTag<RegisterOutputProps>("RegisterOutput")

export interface RegistrarScriptFileProps {

}

export const RegistrarScriptFile = makeTag<RegistrarScriptFileProps>("RegistrarScriptFile")

export interface RemoteDebugEnabledProps extends StringPropertyTypeProps {

}

export const RemoteDebugEnabled = makeTag<RemoteDebugEnabledProps>("RemoteDebugEnabled")

export interface RemoteDebugMachineProps extends StringPropertyTypeProps {

}

export const RemoteDebugMachine = makeTag<RemoteDebugMachineProps>("RemoteDebugMachine")

export interface RemoveDirProps extends TaskTypeProps {
  Directories: unknown
  RemovedDirectories?: unknown
}

export const RemoveDir = makeTag<RemoveDirProps>("RemoveDir")

export interface RemoveDuplicatePayloadProps extends TaskTypeProps {
  Inputs: unknown
  Platform: unknown
  Filtered?: unknown
}

export const RemoveDuplicatePayload = makeTag<RemoveDuplicatePayloadProps>("RemoveDuplicatePayload")

export interface RemoveDuplicatePriFilesProps extends TaskTypeProps {
  Inputs: unknown
  Platform: unknown
  Filtered?: unknown
}

export const RemoveDuplicatePriFiles = makeTag<RemoveDuplicatePriFilesProps>("RemoveDuplicatePriFiles")

export interface RemoveDuplicatesProps extends TaskTypeProps {
  Filtered?: unknown
  HadAnyDuplicates?: boolean
  Inputs?: unknown
}

export const RemoveDuplicates = makeTag<RemoveDuplicatesProps>("RemoveDuplicates")

export interface RemoveDuplicateSDKReferencesProps extends TaskTypeProps {
  Inputs: unknown
  Filtered?: unknown
}

export const RemoveDuplicateSDKReferences = makeTag<RemoveDuplicateSDKReferencesProps>("RemoveDuplicateSDKReferences")

export interface RemoveIntegerChecksProps extends StringPropertyTypeProps {

}

export const RemoveIntegerChecks = makeTag<RemoveIntegerChecksProps>("RemoveIntegerChecks")

export interface ReplacementsFileProps {

}

export const ReplacementsFile = makeTag<ReplacementsFileProps>("ReplacementsFile")

export interface ReportAnalyzerProps extends StringPropertyTypeProps {

}

export const ReportAnalyzer = makeTag<ReportAnalyzerProps>("ReportAnalyzer")

/**
 * The type of the repository where the project is stored (e.g. git)
 */
export interface RepositoryTypeProps extends StringPropertyTypeProps {

}

/**
 * The type of the repository where the project is stored (e.g. git)
 */
export const RepositoryType = makeTag<RepositoryTypeProps>("RepositoryType")

/**
 * The URL for the repository where the project is stored
 */
export interface RepositoryUrlProps extends StringPropertyTypeProps {

}

/**
 * The URL for the repository where the project is stored
 */
export const RepositoryUrl = makeTag<RepositoryUrlProps>("RepositoryUrl")

export interface RequiresFramework35SP1AssemblyProps extends TaskTypeProps {
  Assemblies?: unknown
  CreateDesktopShortcut?: boolean
  DeploymentManifestEntryPoint?: unknown
  EntryPoint?: unknown
  ErrorReportUrl?: unknown
  Files?: unknown
  ReferencedAssemblies?: unknown
  RequiresMinimumFramework35SP1?: boolean
  SigningManifests?: boolean
  SuiteName?: unknown
  TargetFrameworkVersion?: unknown
}

export const RequiresFramework35SP1Assembly = makeTag<RequiresFramework35SP1AssemblyProps>("RequiresFramework35SP1Assembly")

/**
 * Full path to a folder containing resgen tool.
 */
export interface ResgenToolPathProps extends StringPropertyTypeProps {

}

/**
 * Full path to a folder containing resgen tool.
 */
export const ResgenToolPath = makeTag<ResgenToolPathProps>("ResgenToolPath")

export interface ResolveAssemblyReferenceProps extends TaskTypeProps {
  AllowedAssemblyExtensions?: unknown
  AllowedGlobalAssemblyNamePrefix?: unknown
  AllowedRelatedFileExtensions?: unknown
  AppConfigFile?: unknown
  Assemblies?: unknown
  AssemblyFiles?: unknown
  AutoUnify?: boolean
  CandidateAssemblyFiles?: unknown
  FilesWritten?: unknown
  FindDependencies?: boolean
  FindRelatedFiles?: boolean
  FindSatellites?: boolean
  FindSerializationAssemblies?: boolean
  FullFrameworkAssemblyTables?: unknown
  FullFrameworkFolders?: unknown
  FullTargetFrameworkSubsetNames?: unknown
  IgnoreDefaultInstalledAssemblySubsetTables?: boolean
  IgnoreDefaultInstalledAssemblyTables?: boolean
  InstalledAssemblySubsetTables?: unknown
  InstalledAssemblyTables?: unknown
  ProfileName?: unknown
  PublicKeysRestrictedForGlobalLocation?: unknown
  SearchPaths: unknown
  Silent?: boolean
  StateFile?: unknown
  TargetedRuntimeVersion?: unknown
  TargetFrameworkDirectories?: unknown
  TargetFrameworkMoniker?: unknown
  TargetFrameworkMonikerDisplayName?: unknown
  TargetFrameworkSubsets?: unknown
  TargetFrameworkVersion?: unknown
  TargetProcessorArchitecture?: unknown
}

export const ResolveAssemblyReference = makeTag<ResolveAssemblyReferenceProps>("ResolveAssemblyReference")

export interface ResolveComReferenceProps extends TaskTypeProps {
  DelaySign?: boolean
  ExecuteAsTool?: boolean
  IncludeVersionInInteropName?: boolean
  KeyContainer?: unknown
  KeyFile?: unknown
  NoClassMembers?: boolean
  ResolvedAssemblyReferences?: unknown
  ResolvedFiles?: unknown
  ResolvedModules?: unknown
  SdkToolsPath?: unknown
  StateFile?: unknown
  TargetFrameworkVersion?: unknown
  TargetProcessorArchitecture?: unknown
  TypeLibFiles?: unknown
  TypeLibNames?: unknown
  WrapperOutputDirectory?: unknown
}

export const ResolveComReference = makeTag<ResolveComReferenceProps>("ResolveComReference")

export interface ResolveKeySourceProps extends TaskTypeProps {
  AutoClosePasswordPromptShow?: unknown
  AutoClosePasswordPromptTimeout?: unknown
  CertificateFile?: unknown
  CertificateThumbprint?: unknown
  KeyFile?: unknown
  ResolvedKeyContainer?: unknown
  ResolvedKeyFile?: unknown
  ResolvedThumbprint?: unknown
  ShowImportDialogDespitePreviousFailures?: boolean
  SuppressAutoClosePasswordPrompt?: boolean
}

export const ResolveKeySource = makeTag<ResolveKeySourceProps>("ResolveKeySource")

export interface ResolveManifestFilesProps extends TaskTypeProps {
  DeploymentManifestEntryPoint?: unknown
  EntryPoint?: unknown
  ExtraFiles?: unknown
  Files?: unknown
  ManagedAssemblies?: unknown
  NativeAssemblies?: unknown
  OutputAssemblies?: unknown
  OutputDeploymentManifestEntryPoint?: unknown
  OutputEntryPoint?: unknown
  OutputFiles?: unknown
  PublishFiles?: unknown
  SatelliteAssemblies?: unknown
  SigningManifests?: boolean
  TargetCulture?: unknown
  TargetFrameworkVersion?: unknown
}

export const ResolveManifestFiles = makeTag<ResolveManifestFilesProps>("ResolveManifestFiles")

export interface ResolveNativeReferenceProps extends TaskTypeProps {
  AdditionalSearchPaths: unknown
  ContainedComComponents?: unknown
  ContainedLooseEtcFiles?: unknown
  ContainedLooseTlbFiles?: unknown
  ContainedPrerequisiteAssemblies?: unknown
  ContainedTypeLibraries?: unknown
  ContainingReferenceFiles?: unknown
  NativeReferences: unknown
}

export const ResolveNativeReference = makeTag<ResolveNativeReferenceProps>("ResolveNativeReference")

export interface ResolveNonMSBuildProjectOutputProps extends TaskTypeProps {
  PreresolvedProjectOutputs?: unknown
  ProjectReferences: unknown
  ResolvedOutputPaths?: unknown
  UnresolvedProjectReferences?: unknown
}

export const ResolveNonMSBuildProjectOutput = makeTag<ResolveNonMSBuildProjectOutputProps>("ResolveNonMSBuildProjectOutput")

/**
 * File that is compiled into the assembly
 */
export interface ResourceProps extends SimpleItemTypeProps {
  /**
   * Semi-colon separated list of files (wildcards are allowed)
   */
  Include?: string
  CopyToOutputDirectory?: unknown
}

/**
 * File that is compiled into the assembly
 */
export const Resource = makeTag<ResourceProps>("Resource")

export interface ResourceCompileProps extends SimpleItemTypeProps {

}

export const ResourceCompile = makeTag<ResourceCompileProps>("ResourceCompile")

export interface ResourceOutputFileNameProps {

}

export const ResourceOutputFileName = makeTag<ResourceOutputFileNameProps>("ResourceOutputFileName")

export interface ResponseFileProps extends StringPropertyTypeProps {

}

export const ResponseFile = makeTag<ResponseFileProps>("ResponseFile")

/**
 * The feeds that NuGet will use for restoring packages for this project.
 */
export interface RestoreSourcesProps extends StringPropertyTypeProps {

}

/**
 * The feeds that NuGet will use for restoring packages for this project.
 */
export const RestoreSources = makeTag<RestoreSourcesProps>("RestoreSources")

export interface RootNamespaceProps extends StringPropertyTypeProps {

}

export const RootNamespace = makeTag<RootNamespaceProps>("RootNamespace")

/**
 * Disables analyzers at both build and design time. This property takes precedence over RunAnalyzersDuringBuild and RunAnalyzersDuringLiveAnalysis. Default is true.
 */
export interface RunAnalyzersProps {

}

/**
 * Disables analyzers at both build and design time. This property takes precedence over RunAnalyzersDuringBuild and RunAnalyzersDuringLiveAnalysis. Default is true.
 */
export const RunAnalyzers = makeTag<RunAnalyzersProps>("RunAnalyzers")

/**
 * Controls whether analyzers run at build time. Default is true.
 */
export interface RunAnalyzersDuringBuildProps {

}

/**
 * Controls whether analyzers run at build time. Default is true.
 */
export const RunAnalyzersDuringBuild = makeTag<RunAnalyzersDuringBuildProps>("RunAnalyzersDuringBuild")

/**
 * Controls whether analyzers analyze code live at design time. Default is true.
 */
export interface RunAnalyzersDuringLiveAnalysisProps {

}

/**
 * Controls whether analyzers analyze code live at design time. Default is true.
 */
export const RunAnalyzersDuringLiveAnalysis = makeTag<RunAnalyzersDuringLiveAnalysisProps>("RunAnalyzersDuringLiveAnalysis")

/**
 * Indicates whether to run Code Analysis during the build.
 */
export interface RunCodeAnalysisProps extends StringPropertyTypeProps {

}

/**
 * Indicates whether to run Code Analysis during the build.
 */
export const RunCodeAnalysis = makeTag<RunCodeAnalysisProps>("RunCodeAnalysis")

export interface RunPostBuildEventProps extends StringPropertyTypeProps {

}

export const RunPostBuildEvent = makeTag<RunPostBuildEventProps>("RunPostBuildEvent")

/**
 * Runtime identifier supported by the project (e.g. win-x64)
 */
export interface RuntimeIdentifierProps extends StringPropertyTypeProps {

}

/**
 * Runtime identifier supported by the project (e.g. win-x64)
 */
export const RuntimeIdentifier = makeTag<RuntimeIdentifierProps>("RuntimeIdentifier")

/**
 * Semi-colon separated list of runtime identifiers supported by the project (e.g. win-x64;osx-x64;linux-x64)
 */
export interface RuntimeIdentifiersProps extends StringPropertyTypeProps {

}

/**
 * Semi-colon separated list of runtime identifiers supported by the project (e.g. win-x64;osx-x64;linux-x64)
 */
export const RuntimeIdentifiers = makeTag<RuntimeIdentifiersProps>("RuntimeIdentifiers")

export interface RuntimeLibraryProps {

}

export const RuntimeLibrary = makeTag<RuntimeLibraryProps>("RuntimeLibrary")

export interface RuntimeTypeInfoProps {

}

export const RuntimeTypeInfo = makeTag<RuntimeTypeInfoProps>("RuntimeTypeInfo")

/**
 * Semi-colon separated list of culture names to preserve satellite resource assemblies during build and publish. Names must be a valid culture name (like en-US;it; or fr). If left empty, all satellite resource assemblies will be preserved. Defaults to empty.
 */
export interface SatelliteResourceLanguagesProps extends StringPropertyTypeProps {

}

/**
 * Semi-colon separated list of culture names to preserve satellite resource assemblies during build and publish. Names must be a valid culture name (like en-US;it; or fr). If left empty, all satellite resource assemblies will be preserved. Defaults to empty.
 */
export const SatelliteResourceLanguages = makeTag<SatelliteResourceLanguagesProps>("SatelliteResourceLanguages")

export interface SccLocalPathProps extends StringPropertyTypeProps {

}

export const SccLocalPath = makeTag<SccLocalPathProps>("SccLocalPath")

export interface SccProjectNameProps extends StringPropertyTypeProps {

}

export const SccProjectName = makeTag<SccProjectNameProps>("SccProjectName")

export interface SccProviderProps extends StringPropertyTypeProps {

}

export const SccProvider = makeTag<SccProviderProps>("SccProvider")

interface SchemaItemTypeProps {

}

export const SchemaItemType = makeTag<SchemaItemTypeProps>("SchemaItemType")

export interface SchemaVersionProps extends StringPropertyTypeProps {

}

export const SchemaVersion = makeTag<SchemaVersionProps>("SchemaVersion")

/**
 * Reference to an extension SDK
 */
export interface SDKReferenceProps extends SimpleItemTypeProps {
  /**
   * Name and version moniker representing an extension SDK
   */
  Include?: string
}

/**
 * Reference to an extension SDK
 */
export const SDKReference = makeTag<SDKReferenceProps>("SDKReference")

export interface SectionAlignmentProps {

}

export const SectionAlignment = makeTag<SectionAlignmentProps>("SectionAlignment")

export interface SecureScopingProps extends StringPropertyTypeProps {

}

export const SecureScoping = makeTag<SecureScopingProps>("SecureScoping")

/**
 * Indicates whether the runtime should enable the server garbage collection mode.
 */
export interface ServerGarbageCollectionProps {

}

/**
 * Indicates whether the runtime should enable the server garbage collection mode.
 */
export const ServerGarbageCollection = makeTag<ServerGarbageCollectionProps>("ServerGarbageCollection")

export interface ServerStubFileProps {

}

export const ServerStubFile = makeTag<ServerStubFileProps>("ServerStubFile")

export interface ServiceProps extends SimpleItemTypeProps {
  /**
   * Optional expression evaluated to determine whether the items should be evaluated
   */
  Condition?: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to include in this item list
   */
  Include?: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to exclude from the Include list
   */
  Exclude?: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to remove from the existing list contents
   */
  Remove?: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to be updated with the metadata from contained in this xml element
   */
  Update?: string
  /**
   * Optional expression. Used to identify or order system and user elements
   */
  Label?: string
}

export const Service = makeTag<ServiceProps>("Service")

export interface SetEnvProps extends TaskTypeProps {
  Prefix: boolean
  Target?: unknown
  Value?: unknown
}

export const SetEnv = makeTag<SetEnvProps>("SetEnv")

export interface SGenProps extends TaskTypeProps {
  BuildAssemblyName: unknown
  BuildAssemblyPath: unknown
  DelaySign?: boolean
  EnvironmentVariables?: unknown
  KeyContainer?: unknown
  KeyFile?: unknown
  LogStandardErrorAsError?: boolean
  References?: unknown
  SdkToolsPath?: unknown
  SerializationAssembly?: unknown
  ShouldGenerateSerializer: boolean
  StandardErrorImportance?: unknown
  StandardOutputImportance?: unknown
  Timeout?: unknown
  ToolExe?: unknown
  ToolPath?: unknown
  UseProxyTypes: boolean
}

export const SGen = makeTag<SGenProps>("SGen")

export interface ShowIncludesProps {

}

export const ShowIncludes = makeTag<ShowIncludesProps>("ShowIncludes")

export interface ShowProgressProps {

}

export const ShowProgress = makeTag<ShowProgressProps>("ShowProgress")

export interface SignAppxPackageProps extends TaskTypeProps {
  AppxPackageToSign: unknown
  CertificateThumbprint?: unknown
  CertificateFile?: unknown
  HashAlgorithmId: unknown
  TargetPlatformIdentifier: unknown
  TargetPlatformVersion: unknown
  TargetPlatformSdkRootOverride?: unknown
  SignAppxPackageExeFullPath?: unknown
  MSBuildArchitecture?: unknown
  EnableSigningChecks?: boolean
  ExportCertificate?: boolean
  ResolvedThumbprint?: unknown
  AppxPackagePublicKeyFile?: unknown
}

export const SignAppxPackage = makeTag<SignAppxPackageProps>("SignAppxPackage")

/**
 * Full path to signtool.exe utility.
 */
export interface SignAppxPackageExeFullPathProps extends StringPropertyTypeProps {

}

/**
 * Full path to signtool.exe utility.
 */
export const SignAppxPackageExeFullPath = makeTag<SignAppxPackageExeFullPathProps>("SignAppxPackageExeFullPath")

export interface SignAssemblyProps extends StringPropertyTypeProps {

}

export const SignAssembly = makeTag<SignAssemblyProps>("SignAssembly")

export interface SignFileProps extends TaskTypeProps {
  CertificateThumbprint: unknown
  SigningTarget: unknown
  TimestampUrl?: unknown
  TargetFrameworkIdentifier?: unknown
  TargetFrameworkVersion?: unknown
  DisallowMansignTimestampFallback?: unknown
}

export const SignFile = makeTag<SignFileProps>("SignFile")

export interface SignManifestsProps extends StringPropertyTypeProps {

}

export const SignManifests = makeTag<SignManifestsProps>("SignManifests")

interface SimpleItemTypeProps {
  /**
   * Optional expression evaluated to determine whether the items should be evaluated
   */
  Condition?: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to include in this item list
   */
  Include?: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to exclude from the Include list
   */
  Exclude?: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to remove from the existing list contents
   */
  Remove?: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to be updated with the metadata from contained in this xml element
   */
  Update?: string
  /**
   * Optional expression. Used to identify or order system and user elements
   */
  Label?: string
}

export const SimpleItemType = makeTag<SimpleItemTypeProps>("SimpleItemType")

export interface SolutionDirProps extends StringPropertyTypeProps {

}

export const SolutionDir = makeTag<SolutionDirProps>("SolutionDir")

export interface SolutionExtProps extends StringPropertyTypeProps {

}

export const SolutionExt = makeTag<SolutionExtProps>("SolutionExt")

export interface SolutionFileNameProps extends StringPropertyTypeProps {

}

export const SolutionFileName = makeTag<SolutionFileNameProps>("SolutionFileName")

export interface SolutionNameProps extends StringPropertyTypeProps {

}

export const SolutionName = makeTag<SolutionNameProps>("SolutionName")

export interface SolutionPathProps extends StringPropertyTypeProps {

}

export const SolutionPath = makeTag<SolutionPathProps>("SolutionPath")

export interface SpecifySectionAttributesProps {

}

export const SpecifySectionAttributes = makeTag<SpecifySectionAttributesProps>("SpecifySectionAttributes")

export interface StackCommitSizeProps {

}

export const StackCommitSize = makeTag<StackCommitSizeProps>("StackCommitSize")

export interface StackReserveSizeProps {

}

export const StackReserveSize = makeTag<StackReserveSizeProps>("StackReserveSize")

export interface StartActionProps extends StringPropertyTypeProps {

}

export const StartAction = makeTag<StartActionProps>("StartAction")

export interface StartArgumentsProps extends StringPropertyTypeProps {

}

export const StartArguments = makeTag<StartArgumentsProps>("StartArguments")

export interface StartPageProps extends StringPropertyTypeProps {

}

export const StartPage = makeTag<StartPageProps>("StartPage")

export interface StartProgramProps extends StringPropertyTypeProps {

}

export const StartProgram = makeTag<StartProgramProps>("StartProgram")

/**
 * Type that contains the main entry point
 */
export interface StartupObjectProps extends StringPropertyTypeProps {

}

/**
 * Type that contains the main entry point
 */
export const StartupObject = makeTag<StartupObjectProps>("StartupObject")

export interface StartURLProps extends StringPropertyTypeProps {

}

export const StartURL = makeTag<StartURLProps>("StartURL")

export interface StartWithIEProps extends StringPropertyTypeProps {

}

export const StartWithIE = makeTag<StartWithIEProps>("StartWithIE")

export interface StartWorkingDirectoryProps extends StringPropertyTypeProps {

}

export const StartWorkingDirectory = makeTag<StartWorkingDirectoryProps>("StartWorkingDirectory")

/**
 * A file containing app store association data.
 */
export interface StoreAssociationFileProps extends SimpleItemTypeProps {

}

/**
 * A file containing app store association data.
 */
export const StoreAssociationFile = makeTag<StoreAssociationFileProps>("StoreAssociationFile")

/**
 * Name of the store manifest file.
 */
export interface StoreManifestNameProps extends StringPropertyTypeProps {

}

/**
 * Name of the store manifest file.
 */
export const StoreManifestName = makeTag<StoreManifestNameProps>("StoreManifestName")

/**
 * Store manifest schema file.
 */
export interface StoreManifestSchemaProps extends SchemaItemTypeProps {

}

/**
 * Store manifest schema file.
 */
export const StoreManifestSchema = makeTag<StoreManifestSchemaProps>("StoreManifestSchema")

export interface StringPoolingProps {

}

export const StringPooling = makeTag<StringPoolingProps>("StringPooling")

interface StringPropertyTypeProps {

}

export const StringPropertyType = makeTag<StringPropertyTypeProps>("StringPropertyType")

export interface StripPrivateSymbolsProps extends ToolTaskTypeProps {
  PdbCopyToolPath: unknown
  InputPdb: unknown
  StrippedPdb: unknown
}

export const StripPrivateSymbols = makeTag<StripPrivateSymbolsProps>("StripPrivateSymbols")

export interface StructMemberAlignmentProps {

}

export const StructMemberAlignment = makeTag<StructMemberAlignmentProps>("StructMemberAlignment")

export interface SubSystemProps {

}

export const SubSystem = makeTag<SubSystemProps>("SubSystem")

export interface SuiteNameProps extends StringPropertyTypeProps {

}

export const SuiteName = makeTag<SuiteNameProps>("SuiteName")

export interface SupportNobindOfDelayLoadedDLLProps {

}

export const SupportNobindOfDelayLoadedDLL = makeTag<SupportNobindOfDelayLoadedDLLProps>("SupportNobindOfDelayLoadedDLL")

export interface SupportUnloadOfDelayLoadedDLLProps {

}

export const SupportUnloadOfDelayLoadedDLL = makeTag<SupportUnloadOfDelayLoadedDLLProps>("SupportUnloadOfDelayLoadedDLL")

export interface SupportUrlProps extends StringPropertyTypeProps {

}

export const SupportUrl = makeTag<SupportUrlProps>("SupportUrl")

export interface SuppressCompilerWarningsProps {

}

export const SuppressCompilerWarnings = makeTag<SuppressCompilerWarningsProps>("SuppressCompilerWarnings")

export interface SuppressDependencyElementProps {

}

export const SuppressDependencyElement = makeTag<SuppressDependencyElementProps>("SuppressDependencyElement")

export interface SuppressStartupBannerProps {

}

export const SuppressStartupBanner = makeTag<SuppressStartupBannerProps>("SuppressStartupBanner")

export interface SuppressXamlWarningsProps extends StringPropertyTypeProps {

}

export const SuppressXamlWarnings = makeTag<SuppressXamlWarningsProps>("SuppressXamlWarnings")

export interface SwapRunFromCDProps {

}

export const SwapRunFromCD = makeTag<SwapRunFromCDProps>("SwapRunFromCD")

export interface SwapRunFromNETProps {

}

export const SwapRunFromNET = makeTag<SwapRunFromNETProps>("SwapRunFromNET")

export interface TargetProps {
  /**
   * Name of the target
   */
  Name: unknown /* msb:non_empty_string */
  /**
   * Optional semi-colon separated list of targets that should be run before this target
   */
  DependsOnTargets?: string
  /**
   * Optional semi-colon separated list of files that form inputs into this target. Their timestamps will be compared with the timestamps of files in Outputs to determine whether the Target is up to date
   */
  Inputs?: string
  /**
   * Optional semi-colon separated list of files that form outputs into this target. Their timestamps will be compared with the timestamps of files in Inputs to determine whether the Target is up to date
   */
  Outputs?: string
  /**
   * Optional expression evaluated to determine whether the Target and the targets it depends on should be run
   */
  Condition?: string
  /**
   * Optional expression evaluated to determine whether duplicate items in the Target's Returns should be removed before returning them. The default is not to eliminate duplicates.
   */
  KeepDuplicateOutputs?: string
  /**
   * Optional expression evaluated to determine which items generated by the target should be returned by the target. If there are no Returns attributes on Targets in the file, the Outputs attributes are used instead for this purpose.
   */
  Returns?: string
  /**
   * Optional semi-colon separated list of targets that this target should run before.
   */
  BeforeTargets?: string
  /**
   * Optional semi-colon separated list of targets that this target should run after.
   */
  AfterTargets?: string
  /**
   * Optional expression. Used to identify or order system and user elements
   */
  Label?: string
}

export const Target = makeTag<TargetProps>("Target")

export interface TargetCultureProps extends StringPropertyTypeProps {

}

export const TargetCulture = makeTag<TargetCultureProps>("TargetCulture")

export interface TargetEnvironmentProps {

}

export const TargetEnvironment = makeTag<TargetEnvironmentProps>("TargetEnvironment")

export interface TargetExtProps extends StringPropertyTypeProps {

}

export const TargetExt = makeTag<TargetExtProps>("TargetExt")

/**
 * Framework that this project targets. Must be a Target Framework Moniker (e.g. net8.0)
 */
export interface TargetFrameworkProps extends StringPropertyTypeProps {

}

/**
 * Framework that this project targets. Must be a Target Framework Moniker (e.g. net8.0)
 */
export const TargetFramework = makeTag<TargetFrameworkProps>("TargetFramework")

export interface TargetFrameworkProfileProps extends StringPropertyTypeProps {

}

export const TargetFrameworkProfile = makeTag<TargetFrameworkProfileProps>("TargetFrameworkProfile")

/**
 * Semi-colon separated list of frameworks that this project targets. Must be a Target Framework Moniker (e.g. net8.0;net461)
 */
export interface TargetFrameworksProps extends StringPropertyTypeProps {

}

/**
 * Semi-colon separated list of frameworks that this project targets. Must be a Target Framework Moniker (e.g. net8.0;net461)
 */
export const TargetFrameworks = makeTag<TargetFrameworksProps>("TargetFrameworks")

export interface TargetFrameworkVersionProps extends StringPropertyTypeProps {

}

export const TargetFrameworkVersion = makeTag<TargetFrameworkVersionProps>("TargetFrameworkVersion")

export interface TargetMachineProps {

}

export const TargetMachine = makeTag<TargetMachineProps>("TargetMachine")

export interface TargetNameProps extends StringPropertyTypeProps {

}

export const TargetName = makeTag<TargetNameProps>("TargetName")

/**
 * Target platform in the form of "[Identifier], Version=[Version]", for example, "Windows, Version=8.0"
 */
export interface TargetPlatformProps {

}

/**
 * Target platform in the form of "[Identifier], Version=[Version]", for example, "Windows, Version=8.0"
 */
export const TargetPlatform = makeTag<TargetPlatformProps>("TargetPlatform")

export interface TargetPlatformIdentifierProps extends StringPropertyTypeProps {

}

export const TargetPlatformIdentifier = makeTag<TargetPlatformIdentifierProps>("TargetPlatformIdentifier")

export interface TargetPlatformMinVersionProps extends StringPropertyTypeProps {

}

export const TargetPlatformMinVersion = makeTag<TargetPlatformMinVersionProps>("TargetPlatformMinVersion")

/**
 * Full path to platform SDK root.
 */
export interface TargetPlatformSdkRootOverrideProps extends StringPropertyTypeProps {

}

/**
 * Full path to platform SDK root.
 */
export const TargetPlatformSdkRootOverride = makeTag<TargetPlatformSdkRootOverrideProps>("TargetPlatformSdkRootOverride")

export interface TargetPlatformVersionProps extends StringPropertyTypeProps {

}

export const TargetPlatformVersion = makeTag<TargetPlatformVersionProps>("TargetPlatformVersion")

export interface TargetZoneProps extends StringPropertyTypeProps {

}

export const TargetZone = makeTag<TargetZoneProps>("TargetZone")

export interface TaskProps extends TaskTypeProps {
  /**
   * Optional expression evaluated to determine whether the task should be executed
   */
  Condition?: string
  /**
   * Optional boolean indicating whether a recoverable task error should be ignored. Default false
   */
  ContinueOnError?: boolean
  /**
   * Defines the bitness of the task if it must be run specifically in a 32bit or 64bit process. If not specified, it will run with the bitness of the build process.  If there are multiple tasks defined in UsingTask with the same name but with different Architecture attribute values, the value of the Architecture attribute specified here will be used to match and select the correct task
   */
  Architecture?: unknown /* msb:architecture */
  /**
   * Defines the .NET runtime of the task. This must be specified if the task must run on a specific version of the .NET runtime. If not specified, the task will run on the runtime being used by the build process. If there are multiple tasks defined in UsingTask with the same name but with different Runtime attribute values, the value of the Runtime attribute specified here will be used to match and select the correct task
   */
  Runtime?: unknown /* msb:runtime */
}

export const Task = makeTag<TaskProps>("Task")

interface TaskTypeProps {
  /**
   * Optional expression evaluated to determine whether the task should be executed
   */
  Condition?: string
  /**
   * Optional boolean indicating whether a recoverable task error should be ignored. Default false
   */
  ContinueOnError?: boolean
  /**
   * Defines the bitness of the task if it must be run specifically in a 32bit or 64bit process. If not specified, it will run with the bitness of the build process.  If there are multiple tasks defined in UsingTask with the same name but with different Architecture attribute values, the value of the Architecture attribute specified here will be used to match and select the correct task
   */
  Architecture?: unknown /* msb:architecture */
  /**
   * Defines the .NET runtime of the task. This must be specified if the task must run on a specific version of the .NET runtime. If not specified, the task will run on the runtime being used by the build process. If there are multiple tasks defined in UsingTask with the same name but with different Runtime attribute values, the value of the Runtime attribute specified here will be used to match and select the correct task
   */
  Runtime?: unknown /* msb:runtime */
}

export const TaskType = makeTag<TaskTypeProps>("TaskType")

export interface TelemetryProps extends TaskTypeProps {
  EventName: unknown
  EventData?: unknown
}

export const Telemetry = makeTag<TelemetryProps>("Telemetry")

export interface TerminalServerAwareProps {

}

export const TerminalServerAware = makeTag<TerminalServerAwareProps>("TerminalServerAware")

/**
 * Controls the set of extensions that are enabled. Note that 'AllMicrosoft' enables all extensions, even those with a restrictive license.
 */
export interface TestingExtensionsProfileProps {

}

/**
 * Controls the set of extensions that are enabled. Note that 'AllMicrosoft' enables all extensions, even those with a restrictive license.
 */
export const TestingExtensionsProfile = makeTag<TestingExtensionsProfileProps>("TestingExtensionsProfile")

/**
 * This property controls whether all console output that a test executable writes is captured and hidden from the user when you use 'dotnet test' to run 'Microsoft.Testing.Platform' tests. By default, the console output is hidden. This is not supported by VSTest.
 */
export interface TestingPlatformCaptureOutputProps {

}

/**
 * This property controls whether all console output that a test executable writes is captured and hidden from the user when you use 'dotnet test' to run 'Microsoft.Testing.Platform' tests. By default, the console output is hidden. This is not supported by VSTest.
 */
export const TestingPlatformCaptureOutput = makeTag<TestingPlatformCaptureOutputProps>("TestingPlatformCaptureOutput")

/**
 * The command-line arguments to pass for the test executable. This is not supported by VSTest.
 */
export interface TestingPlatformCommandLineArgumentsProps extends StringPropertyTypeProps {

}

/**
 * The command-line arguments to pass for the test executable. This is not supported by VSTest.
 */
export const TestingPlatformCommandLineArguments = makeTag<TestingPlatformCommandLineArgumentsProps>("TestingPlatformCommandLineArguments")

/**
 * This property controls whether VSTest is used when you use 'dotnet test' to run tests. If you set this property to 'true', VSTest is disabled and all 'Microsoft.Testing.Platform' tests are run directly. This is not supported by VSTest.
 */
export interface TestingPlatformDotnetTestSupportProps {

}

/**
 * This property controls whether VSTest is used when you use 'dotnet test' to run tests. If you set this property to 'true', VSTest is disabled and all 'Microsoft.Testing.Platform' tests are run directly. This is not supported by VSTest.
 */
export const TestingPlatformDotnetTestSupport = makeTag<TestingPlatformDotnetTestSupportProps>("TestingPlatformDotnetTestSupport")

/**
 * This property controls whether a single failure or all errors in a failed test are reported when you use `dotnet test` to run tests. By default, test failures are summarized into a log file, and a single failure per test project is reported to MSBuild. To show errors per failed test, set this property to 'true'. This is not supported by VSTest.
 */
export interface TestingPlatformShowTestsFailureProps {

}

/**
 * This property controls whether a single failure or all errors in a failed test are reported when you use `dotnet test` to run tests. By default, test failures are summarized into a log file, and a single failure per test project is reported to MSBuild. To show errors per failed test, set this property to 'true'. This is not supported by VSTest.
 */
export const TestingPlatformShowTestsFailure = makeTag<TestingPlatformShowTestsFailureProps>("TestingPlatformShowTestsFailure")

/**
 * Indicates whether the runtime should enable tiered JIT compilation.
 */
export interface TieredCompilationProps {

}

/**
 * Indicates whether the runtime should enable tiered JIT compilation.
 */
export const TieredCompilation = makeTag<TieredCompilationProps>("TieredCompilation")

/**
 * A human-friendly title of the package, typically used in UI displays as on nuget.org and the Package Manager in Visual Studio. If not specified, the package ID is used instead.
 */
export interface TitleProps extends StringPropertyTypeProps {

}

/**
 * A human-friendly title of the package, typically used in UI displays as on nuget.org and the Package Manager in Visual Studio. If not specified, the package ID is used instead.
 */
export const Title = makeTag<TitleProps>("Title")

export interface TlbImpProps extends TaskTypeProps {
  AssemblyNamespace?: unknown
  AssemblyVersion?: unknown
  DelaySign?: boolean
  EnvironmentVariables?: unknown
  KeyContainer?: unknown
  KeyFile?: unknown
  LogStandardErrorAsError?: boolean
  NoLogo?: boolean
  OutputAssembly?: unknown
  PreventClassMembers?: boolean
  SafeArrayAsSystemArray?: boolean
  SdkToolsPath?: unknown
  Silent?: boolean
  StandardErrorImportance?: unknown
  StandardOutputImportance?: unknown
  Timeout?: unknown
  ToolExe?: unknown
  ToolPath?: unknown
  Transform?: unknown
  TypeLibName?: unknown
  Verbose?: boolean
}

export const TlbImp = makeTag<TlbImpProps>("TlbImp")

/**
 * Specifies the command that will invoke the tool after it's installed.
 */
export interface ToolCommandNameProps extends StringPropertyTypeProps {

}

/**
 * Specifies the command that will invoke the tool after it's installed.
 */
export const ToolCommandName = makeTag<ToolCommandNameProps>("ToolCommandName")

interface ToolTaskTypeProps {
  ExitCode?: unknown
  YieldDuringToolExecution?: boolean
  UseCommandProcessor?: boolean
  EchoOff?: boolean
  ToolExe?: unknown
  ToolPath?: unknown
  EnvironmentVariables?: unknown
  Timeout?: unknown
  StandardErrorImportance?: unknown
  StandardOutputImportance?: unknown
  LogStandardErrorAsError?: boolean
}

export const ToolTaskType = makeTag<ToolTaskTypeProps>("ToolTaskType")

export interface TouchProps extends TaskTypeProps {
  AlwaysCreate?: boolean
  Files: unknown
  ForceTouch?: boolean
  Time?: unknown
  TouchedFiles?: unknown
}

export const Touch = makeTag<TouchProps>("Touch")

export interface TreatLinkerWarningAsErrorsProps {

}

export const TreatLinkerWarningAsErrors = makeTag<TreatLinkerWarningAsErrorsProps>("TreatLinkerWarningAsErrors")

export interface TreatSpecificWarningsAsErrorsProps {

}

export const TreatSpecificWarningsAsErrors = makeTag<TreatSpecificWarningsAsErrorsProps>("TreatSpecificWarningsAsErrors")

export interface TreatWarningsAsErrorsProps extends StringPropertyTypeProps {

}

export const TreatWarningsAsErrors = makeTag<TreatWarningsAsErrorsProps>("TreatWarningsAsErrors")

/**
 * Assemblies that should not be trimmed (specify the assembly name without extension).
 */
export interface TrimmerRootAssemblyProps extends StringPropertyTypeProps {

}

/**
 * Assemblies that should not be trimmed (specify the assembly name without extension).
 */
export const TrimmerRootAssembly = makeTag<TrimmerRootAssemblyProps>("TrimmerRootAssembly")

/**
 * XML files that specify assemblies, types, and their members that should not be trimmed.
 */
export interface TrimmerRootDescriptorProps extends StringPropertyTypeProps {

}

/**
 * XML files that specify assemblies, types, and their members that should not be trimmed.
 */
export const TrimmerRootDescriptor = makeTag<TrimmerRootDescriptorProps>("TrimmerRootDescriptor")

/**
 * boolean
 */
export interface TrustUrlParametersProps {

}

/**
 * boolean
 */
export const TrustUrlParameters = makeTag<TrustUrlParametersProps>("TrustUrlParameters")

export interface TypeComplianceDiagnosticsProps extends StringPropertyTypeProps {

}

export const TypeComplianceDiagnostics = makeTag<TypeComplianceDiagnosticsProps>("TypeComplianceDiagnostics")

export interface TypeLibFormatProps {

}

export const TypeLibFormat = makeTag<TypeLibFormatProps>("TypeLibFormat")

export interface TypeLibraryFileProps {

}

export const TypeLibraryFile = makeTag<TypeLibraryFileProps>("TypeLibraryFile")

export interface TypeLibraryNameProps {

}

export const TypeLibraryName = makeTag<TypeLibraryNameProps>("TypeLibraryName")

export interface TypeLibraryResourceIDProps {

}

export const TypeLibraryResourceID = makeTag<TypeLibraryResourceIDProps>("TypeLibraryResourceID")

export interface UACExecutionLevelProps {

}

export const UACExecutionLevel = makeTag<UACExecutionLevelProps>("UACExecutionLevel")

export interface UACUIAccessProps {

}

export const UACUIAccess = makeTag<UACUIAccessProps>("UACUIAccess")

/**
 * Configures the created packages. Possible values are: StoreAndSideload (produces the appxupload and the sideloaded packages), StoreUpload (produces only the appxupload package), and SideloadOnly(produces only the packages for sideloading).
 */
export interface UapAppxPackageBuildModeProps extends StringPropertyTypeProps {

}

/**
 * Configures the created packages. Possible values are: StoreAndSideload (produces the appxupload and the sideloaded packages), StoreUpload (produces only the appxupload package), and SideloadOnly(produces only the packages for sideloading).
 */
export const UapAppxPackageBuildMode = makeTag<UapAppxPackageBuildModeProps>("UapAppxPackageBuildMode")

export interface UICultureProps extends StringPropertyTypeProps {

}

export const UICulture = makeTag<UICultureProps>("UICulture")

export interface UndefinePreprocessorDefinitionsProps {

}

export const UndefinePreprocessorDefinitions = makeTag<UndefinePreprocessorDefinitionsProps>("UndefinePreprocessorDefinitions")

export interface UnregisterAssemblyProps extends TaskTypeProps {
  Assemblies?: unknown
  AssemblyListFile?: unknown
  TypeLibFiles?: unknown
}

export const UnregisterAssembly = makeTag<UnregisterAssemblyProps>("UnregisterAssembly")

export interface UnzipProps extends TaskTypeProps {
  DestinationFiles?: unknown
  DestinationFolder: unknown
  OverwriteReadOnlyFiles?: boolean
  SkipUnchangedFiles?: boolean
  SourceFiles: unknown
  UnzippedFiles?: unknown
}

export const Unzip = makeTag<UnzipProps>("Unzip")

export interface UpdateAppxManifestForBundleProps extends TaskTypeProps {
  FinalAppxManifest: unknown
  AppxManifestForBundle: unknown
}

export const UpdateAppxManifestForBundle = makeTag<UpdateAppxManifestForBundleProps>("UpdateAppxManifestForBundle")

/**
 * boolean
 */
export interface UpdateEnabledProps {

}

/**
 * boolean
 */
export const UpdateEnabled = makeTag<UpdateEnabledProps>("UpdateEnabled")

export interface UpdateFileHashesSearchPathProps {

}

export const UpdateFileHashesSearchPath = makeTag<UpdateFileHashesSearchPathProps>("UpdateFileHashesSearchPath")

export interface UpdateIntervalProps extends StringPropertyTypeProps {

}

export const UpdateInterval = makeTag<UpdateIntervalProps>("UpdateInterval")

/**
 * Hours, Days, or Weeks
 */
export interface UpdateIntervalUnitsProps extends StringPropertyTypeProps {

}

/**
 * Hours, Days, or Weeks
 */
export const UpdateIntervalUnits = makeTag<UpdateIntervalUnitsProps>("UpdateIntervalUnits")

export interface UpdateMainPackageFileMapProps extends TaskTypeProps {
  Input: unknown
  Output: unknown
  SplitResourcesPriPath: unknown
  DefaultResourceLanguage: unknown
  DefaultResourceQualifiers: unknown
}

export const UpdateMainPackageFileMap = makeTag<UpdateMainPackageFileMapProps>("UpdateMainPackageFileMap")

export interface UpdateManifestProps extends TaskTypeProps {
  ApplicationManifest: unknown
  TargetFrameworkVersion?: unknown
  ApplicationPath: unknown
  InputManifest: unknown
  OutputManifest?: unknown
}

export const UpdateManifest = makeTag<UpdateManifestProps>("UpdateManifest")

/**
 * Foreground or Background
 */
export interface UpdateModeProps extends StringPropertyTypeProps {

}

/**
 * Foreground or Background
 */
export const UpdateMode = makeTag<UpdateModeProps>("UpdateMode")

/**
 * boolean
 */
export interface UpdatePeriodicallyProps {

}

/**
 * boolean
 */
export const UpdatePeriodically = makeTag<UpdatePeriodicallyProps>("UpdatePeriodically")

/**
 * boolean
 */
export interface UpdateRequiredProps {

}

/**
 * boolean
 */
export const UpdateRequired = makeTag<UpdateRequiredProps>("UpdateRequired")

export interface UpdateUrlProps extends StringPropertyTypeProps {

}

export const UpdateUrl = makeTag<UpdateUrlProps>("UpdateUrl")

export interface UpgradeBackupLocationProps extends StringPropertyTypeProps {

}

export const UpgradeBackupLocation = makeTag<UpgradeBackupLocationProps>("UpgradeBackupLocation")

/**
 * Defines an item to be considered an output of the project for the fast up-to-date check, with optional corresponding input via 'Original' metadata. When 'Original' metadata is specified, the input and output are considered in isolation. Useful when a single file will be copied (and potentially transformed in doing so) during build.
 */
export interface UpToDateCheckBuiltProps extends SimpleItemTypeProps {
  /**
   * Optional group(s) of inputs and outputs that should be considered in isolation during build. Useful when a build involves multiple discrete compilation/transpilation steps. Semicolon-delimited when multiple sets are required.
   */
  Set?: unknown
  /**
   * Optional identifier for this item that allows it to be omitted from the fast up-to-date check via a global property.
   */
  Kind?: unknown
  /**
   * Optional location of the input item that produces this output. Useful when a file is copied (and potentially transformed in doing so) during build. If multiple inputs and/or outputs are involved, use 'Set' metadata instead.
   */
  Original?: unknown
}

/**
 * Defines an item to be considered an output of the project for the fast up-to-date check, with optional corresponding input via 'Original' metadata. When 'Original' metadata is specified, the input and output are considered in isolation. Useful when a single file will be copied (and potentially transformed in doing so) during build.
 */
export const UpToDateCheckBuilt = makeTag<UpToDateCheckBuiltProps>("UpToDateCheckBuilt")

/**
 * Defines an item to be considered an input to the project for the fast up-to-date check.
 */
export interface UpToDateCheckInputProps extends SimpleItemTypeProps {
  /**
   * Optional group(s) of inputs and outputs that should be considered in isolation during build. Useful when a build involves multiple discrete compilation/transpilation steps. Semicolon-delimited when multiple sets are required.
   */
  Set?: unknown
  /**
   * Optional identifier for this item that allows it to be omitted from the fast up-to-date check via a global property.
   */
  Kind?: unknown
}

/**
 * Defines an item to be considered an input to the project for the fast up-to-date check.
 */
export const UpToDateCheckInput = makeTag<UpToDateCheckInputProps>("UpToDateCheckInput")

/**
 * Defines an item to be considered an output of the project for the fast up-to-date check.
 */
export interface UpToDateCheckOutputProps extends SimpleItemTypeProps {
  /**
   * Optional group(s) of inputs and outputs that should be considered in isolation during build. Useful when a build involves multiple discrete compilation/transpilation steps. Semicolon-delimited when multiple sets are required.
   */
  Set?: unknown
  /**
   * Optional identifier for this item that allows it to be omitted from the fast up-to-date check via a global property.
   */
  Kind?: unknown
}

/**
 * Defines an item to be considered an output of the project for the fast up-to-date check.
 */
export const UpToDateCheckOutput = makeTag<UpToDateCheckOutputProps>("UpToDateCheckOutput")

export interface UseAppConfigForCompilerProps {

}

export const UseAppConfigForCompiler = makeTag<UseAppConfigForCompilerProps>("UseAppConfigForCompiler")

export interface UseApplicationTrustProps extends StringPropertyTypeProps {

}

export const UseApplicationTrust = makeTag<UseApplicationTrustProps>("UseApplicationTrust")

/**
 * Use a centralized location for all outputs of this project. The location of the centralized outputs is set by the ArtifactsPath property. Project outputs are grouped by kind, then by project. See https://learn.microsoft.com/en-us/dotnet/core/sdk/artifacts-output for complete details.
 */
export interface UseArtifactsOutputProps {

}

/**
 * Use a centralized location for all outputs of this project. The location of the centralized outputs is set by the ArtifactsPath property. Project outputs are grouped by kind, then by project. See https://learn.microsoft.com/en-us/dotnet/core/sdk/artifacts-output for complete details.
 */
export const UseArtifactsOutput = makeTag<UseArtifactsOutputProps>("UseArtifactsOutput")

export interface UseDebugLibrariesProps {

}

export const UseDebugLibraries = makeTag<UseDebugLibrariesProps>("UseDebugLibraries")

export interface UseFullPathsProps {

}

export const UseFullPaths = makeTag<UseFullPathsProps>("UseFullPaths")

/**
 * Flag indicating whether to enable incremental registration of the app layout.
 */
export interface UseIncrementalAppxRegistrationProps extends StringPropertyTypeProps {

}

/**
 * Flag indicating whether to enable incremental registration of the app layout.
 */
export const UseIncrementalAppxRegistration = makeTag<UseIncrementalAppxRegistrationProps>("UseIncrementalAppxRegistration")

export interface UseOfAtlProps extends StringPropertyTypeProps {

}

export const UseOfAtl = makeTag<UseOfAtlProps>("UseOfAtl")

export interface UseOfMfcProps extends StringPropertyTypeProps {

}

export const UseOfMfc = makeTag<UseOfMfcProps>("UseOfMfc")

/**
 * Indicates whether Razor code generation should use a persistent build server process.
 */
export interface UseRazorBuildServerProps {

}

/**
 * Indicates whether Razor code generation should use a persistent build server process.
 */
export const UseRazorBuildServer = makeTag<UseRazorBuildServerProps>("UseRazorBuildServer")

/**
 * The ID that will be used to locate the file storing secret configuration values for this project at development time.
 */
export interface UserSecretsIdProps extends StringPropertyTypeProps {

}

/**
 * The ID that will be used to locate the file storing secret configuration values for this project at development time.
 */
export const UserSecretsId = makeTag<UserSecretsIdProps>("UserSecretsId")

export interface UseUnicodeForAssemblerListingProps {

}

export const UseUnicodeForAssemblerListing = makeTag<UseUnicodeForAssemblerListingProps>("UseUnicodeForAssemblerListing")

export interface UseVSHostingProcessProps extends StringPropertyTypeProps {

}

export const UseVSHostingProcess = makeTag<UseVSHostingProcessProps>("UseVSHostingProcess")

/**
 * Set to 'true' to use VSTest. The default is 'false' which uses MSTest runner. This property is only applicable when using MSTest.Sdk.
 */
export interface UseVSTestProps {

}

/**
 * Set to 'true' to use VSTest. The default is 'false' which uses MSTest runner. This property is only applicable when using MSTest.Sdk.
 */
export const UseVSTest = makeTag<UseVSTestProps>("UseVSTest")

export interface UseWindowsFormsProps {

}

export const UseWindowsForms = makeTag<UseWindowsFormsProps>("UseWindowsForms")

export interface UseWPFProps {

}

export const UseWPF = makeTag<UseWPFProps>("UseWPF")

/**
 * A C# global using to add to the project.
 */
export interface UsingProps extends SimpleItemTypeProps {
  /**
   * The namespace or type identifier to add, e.g. Microsoft.AspNetCore
   */
  Include?: string
  /**
   * Optional alias for the namespace or type.
   */
  Alias?: string
  /**
   * Determines whether the identifier should be registered as a static import.
   */
  Static?: boolean
}

/**
 * A C# global using to add to the project.
 */
export const Using = makeTag<UsingProps>("Using")

export interface UsingTaskProps {
  /**
   * Optional expression evaluated to determine whether the declaration should be evaluated
   */
  Condition?: string
  /**
   * Optional name of assembly containing the task. Either AssemblyName or AssemblyFile must be used
   */
  AssemblyName?: unknown /* msb:non_empty_string */
  /**
   * Optional path to assembly containing the task. Either AssemblyName or AssemblyFile must be used
   */
  AssemblyFile?: unknown /* msb:non_empty_string */
  /**
   * Name of task class in the assembly
   */
  TaskName: unknown /* msb:non_empty_string */
  /**
   * Name of the task factory class in the assembly
   */
  TaskFactory?: unknown /* msb:non_empty_string */
  /**
   * Defines the architecture of the task host that this task should be run in.  Currently supported values:  x86, x64, CurrentArchitecture, and * (any).  If Architecture is not specified, either the task will be run within the MSBuild process, or the task host will be launched using the architecture of the parent MSBuild process
   */
  Architecture?: unknown /* msb:architecture */
  /**
   * Defines the .NET runtime version of the task host that this task should be run in.  Currently supported values:  CLR2, CLR4, NET, CurrentRuntime, and * (any).  If Runtime is not specified, either the task will be run within the MSBuild process, or the task host will be launched using the runtime of the parent MSBuild process
   */
  Runtime?: unknown /* msb:runtime */
}

export const UsingTask = makeTag<UsingTaskProps>("UsingTask")

export interface UTF8OutputProps extends StringPropertyTypeProps {

}

export const UTF8Output = makeTag<UTF8OutputProps>("UTF8Output")

export interface ValidateAllParametersProps {

}

export const ValidateAllParameters = makeTag<ValidateAllParametersProps>("ValidateAllParameters")

export interface ValidateAppxManifestProps extends TaskTypeProps {
  Input: unknown
  SourceAppxManifest: unknown
  AppxManifestSchema: unknown
  StoreAssociationFile?: unknown
  TargetPlatformIdentifier: unknown
  TargetPlatformVersion: unknown
  OSMinVersion: unknown
  OSMaxVersionTested: unknown
  PlatformVersionDescriptions: unknown
  ResolvedSDKReferences: unknown
  StrictManifestValidationEnabled?: boolean
  ValidateWinmds?: boolean
  NonFrameworkSdkReferences?: unknown
  WinmdFiles?: unknown
  SDKWinmdFiles?: unknown
  ManagedWinmdInprocImplementation?: unknown
  ValidateManifest?: boolean
  Resources?: unknown
}

export const ValidateAppxManifest = makeTag<ValidateAppxManifestProps>("ValidateAppxManifest")

export interface ValidateAppxManifestItemsProps extends TaskTypeProps {
  AppxManifestItems?: unknown
  CustomAppxManifestItems?: unknown
  AppxPackageProject?: boolean
  IdentityName?: unknown
  IdentityVersion?: unknown
}

export const ValidateAppxManifestItems = makeTag<ValidateAppxManifestItemsProps>("ValidateAppxManifestItems")

export interface ValidateAppxPackageProps extends TaskTypeProps {
  SourceAppxManifest: unknown
  AppxManifest: unknown
  StoreAssociationFile?: unknown
  PackageArchitecture: unknown
  AppxPackagePayload: unknown
  QueryNamespacePrefix: unknown
  QueryNamespace81Prefix: unknown
  ManifestImageFileNameQueries: unknown
  ResolvedSDKReferences: unknown
  AllowDebugFrameworkReferencesInManifest?: boolean
  ProjectDir: unknown
  IndexedPayloadFiles?: unknown
  MakePriExtensionPath?: unknown
  OSMinVersion?: unknown
}

export const ValidateAppxPackage = makeTag<ValidateAppxPackageProps>("ValidateAppxPackage")

export interface ValidateStoreManifestProps extends TaskTypeProps {
  Input: unknown
  StoreManifestSchema: unknown
}

export const ValidateStoreManifest = makeTag<ValidateStoreManifestProps>("ValidateStoreManifest")

export interface VbcProps extends TaskTypeProps {
  AdditionalLibPaths?: unknown
  AddModules?: unknown
  BaseAddress?: unknown
  CodePage?: unknown
  DebugType?: unknown
  DefineConstants?: unknown
  DelaySign?: boolean
  DisabledWarnings?: unknown
  DocumentationFile?: unknown
  EmitDebugInformation?: boolean
  EnvironmentVariables?: unknown
  ErrorReport?: unknown
  FileAlignment?: unknown
  GenerateDocumentation?: boolean
  Imports?: unknown
  KeyContainer?: unknown
  KeyFile?: unknown
  LangVersion?: unknown
  VBRuntime?: unknown
  LinkResources?: unknown
  LogStandardErrorAsError?: boolean
  MainEntryPoint?: unknown
  ModuleAssemblyName?: unknown
  NoConfig?: boolean
  NoLogo?: boolean
  NoStandardLib?: boolean
  NoVBRuntimeReference?: boolean
  NoWarnings?: boolean
  NoWin32Manifest?: boolean
  Optimize?: boolean
  OptionCompare?: unknown
  OptionExplicit?: boolean
  OptionInfer?: boolean
  OptionStrict?: boolean
  OptionStrictType?: unknown
  OutputAssembly?: unknown
  Platform?: unknown
  References?: unknown
  RemoveIntegerChecks?: boolean
  Resources?: unknown
  ResponseFiles?: unknown
  RootNamespace?: unknown
  SdkPath?: unknown
  Sources?: unknown
  StandardErrorImportance?: unknown
  StandardOutputImportance?: unknown
  TargetCompactFramework?: boolean
  TargetType?: unknown
  Timeout?: unknown
  ToolExe?: unknown
  ToolPath?: unknown
  TreatWarningsAsErrors?: boolean
  UseHostCompilerIfAvailable?: boolean
  Utf8Output?: boolean
  Verbosity?: unknown
  WarningsAsErrors?: unknown
  WarningsNotAsErrors?: unknown
  Win32Icon?: unknown
  Win32Manifest?: unknown
  Win32Resource?: unknown
}

export const Vbc = makeTag<VbcProps>("Vbc")

export interface VBRuntimeProps extends StringPropertyTypeProps {

}

export const VBRuntime = makeTag<VBRuntimeProps>("VBRuntime")

export interface VCBuildProps extends TaskTypeProps {
  AdditionalLibPaths?: unknown
  AdditionalLinkLibraryPaths?: unknown
  AdditionalOptions?: unknown
  Clean?: boolean
  Configuration?: unknown
  Override?: unknown
  Platform?: unknown
  Projects: unknown
  Rebuild?: boolean
  SolutionFile?: unknown
  Timeout?: unknown
  ToolPath?: unknown
  UseEnvironment?: boolean
  UserEnvironment?: boolean
}

export const VCBuild = makeTag<VCBuildProps>("VCBuild")

export interface VCMessageProps extends TaskTypeProps {
  Code: unknown
  Type?: unknown
  Arguments?: unknown
}

export const VCMessage = makeTag<VCMessageProps>("VCMessage")

export interface VCTargetsPathProps extends StringPropertyTypeProps {

}

export const VCTargetsPath = makeTag<VCTargetsPathProps>("VCTargetsPath")

export interface VerboseOutputProps {

}

export const VerboseOutput = makeTag<VerboseOutputProps>("VerboseOutput")

export interface VerifyFileHashProps extends TaskTypeProps {
  File: unknown
  Hash: unknown
  HashEncoding?: unknown
  Algorithm?: unknown
}

export const VerifyFileHash = makeTag<VerifyFileHashProps>("VerifyFileHash")

/**
 * Numeric value of the version in the format major.minor.patch (e.g. 2.4.0)
 */
export interface VersionProps extends StringPropertyTypeProps {

}

/**
 * Numeric value of the version in the format major.minor.patch (e.g. 2.4.0)
 */
export const Version = makeTag<VersionProps>("Version")

/**
 * When Version is not specified, VersionPrefix represents the first fragment of the version string (e.g. 1.0.0). The syntax is VersionPrefix[-VersionSuffix].
 */
export interface VersionPrefixProps extends StringPropertyTypeProps {

}

/**
 * When Version is not specified, VersionPrefix represents the first fragment of the version string (e.g. 1.0.0). The syntax is VersionPrefix[-VersionSuffix].
 */
export const VersionPrefix = makeTag<VersionPrefixProps>("VersionPrefix")

/**
 * When Version is not specified, VersionSuffix represents the second fragment of the version string (e.g. beta). The syntax is VersionPrefix[-VersionSuffix].
 */
export interface VersionSuffixProps extends StringPropertyTypeProps {

}

/**
 * When Version is not specified, VersionSuffix represents the second fragment of the version string (e.g. beta). The syntax is VersionPrefix[-VersionSuffix].
 */
export const VersionSuffix = makeTag<VersionSuffixProps>("VersionSuffix")

export interface VisualStudioVersionProps extends StringPropertyTypeProps {

}

export const VisualStudioVersion = makeTag<VisualStudioVersionProps>("VisualStudioVersion")

export interface VSINSTALLDIRProps extends StringPropertyTypeProps {

}

export const VSINSTALLDIR = makeTag<VSINSTALLDIRProps>("VSINSTALLDIR")

export interface VSTO_TrustAssembliesLocationProps extends StringPropertyTypeProps {

}

export const VSTO_TrustAssembliesLocation = makeTag<VSTO_TrustAssembliesLocationProps>("VSTO_TrustAssembliesLocation")

/**
 * Windows Application Packaging project-specific: Path to Windows Application Packaging project root folder.
 */
export interface WapProjPathProps extends StringPropertyTypeProps {

}

/**
 * Windows Application Packaging project-specific: Path to Windows Application Packaging project root folder.
 */
export const WapProjPath = makeTag<WapProjPathProps>("WapProjPath")

export interface WarnAsErrorProps {

}

export const WarnAsError = makeTag<WarnAsErrorProps>("WarnAsError")

export interface WarningProps extends TaskTypeProps {
  Code?: unknown
  File?: unknown
  HelpKeyword?: unknown
  Text?: unknown
}

export const Warning = makeTag<WarningProps>("Warning")

/**
 * integer between 0 and 5 inclusive
 */
export interface WarningLevelProps extends StringPropertyTypeProps {

}

/**
 * integer between 0 and 5 inclusive
 */
export const WarningLevel = makeTag<WarningLevelProps>("WarningLevel")

/**
 * Comma separated list of warning numbers to treat as errors
 */
export interface WarningsAsErrorsProps extends StringPropertyTypeProps {

}

/**
 * Comma separated list of warning numbers to treat as errors
 */
export const WarningsAsErrors = makeTag<WarningsAsErrorsProps>("WarningsAsErrors")

export interface WcfConfigValidationEnabledProps {

}

export const WcfConfigValidationEnabled = makeTag<WcfConfigValidationEnabledProps>("WcfConfigValidationEnabled")

export interface WebPageProps extends StringPropertyTypeProps {

}

export const WebPage = makeTag<WebPageProps>("WebPage")

/**
 * Name of Web References folder to display in user interface
 */
export interface WebReferencesProps extends SimpleItemTypeProps {
  /**
   * Optional expression evaluated to determine whether the items should be evaluated
   */
  Condition?: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to include in this item list
   */
  Include?: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to exclude from the Include list
   */
  Exclude?: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to remove from the existing list contents
   */
  Remove?: string
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to be updated with the metadata from contained in this xml element
   */
  Update?: string
  /**
   * Optional expression. Used to identify or order system and user elements
   */
  Label?: string
}

/**
 * Name of Web References folder to display in user interface
 */
export const WebReferences = makeTag<WebReferencesProps>("WebReferences")

/**
 * Represents a reference to a web service
 */
export interface WebReferenceUrlProps extends SimpleItemTypeProps {
  /**
   * URL to web service
   */
  Include?: string
}

/**
 * Represents a reference to a web service
 */
export const WebReferenceUrl = makeTag<WebReferenceUrlProps>("WebReferenceUrl")

export interface WhenProps {
  /**
   * Optional expression evaluated to determine whether the child PropertyGroups and/or ItemGroups should be used
   */
  Condition: string
}

export const When = makeTag<WhenProps>("When")

export interface WholeProgramOptimizationProps extends StringPropertyTypeProps {

}

export const WholeProgramOptimization = makeTag<WholeProgramOptimizationProps>("WholeProgramOptimization")

export interface Win32ResourceFileProps extends StringPropertyTypeProps {

}

export const Win32ResourceFile = makeTag<Win32ResourceFileProps>("Win32ResourceFile")

export interface WriteCodeFragmentProps extends TaskTypeProps {
  AssemblyAttributes?: unknown
  Language: unknown
  OutputDirectory?: unknown
  OutputFile?: unknown
}

export const WriteCodeFragment = makeTag<WriteCodeFragmentProps>("WriteCodeFragment")

export interface WriteLinesToFileProps extends TaskTypeProps {
  Encoding?: unknown
  File: unknown
  Lines?: unknown
  Overwrite?: boolean
  WriteOnlyWhenDifferent?: boolean
}

export const WriteLinesToFile = makeTag<WriteLinesToFileProps>("WriteLinesToFile")

export interface WsdlXsdCodeGenCollectionTypesProps extends StringPropertyTypeProps {

}

export const WsdlXsdCodeGenCollectionTypes = makeTag<WsdlXsdCodeGenCollectionTypesProps>("WsdlXsdCodeGenCollectionTypes")

export interface WsdlXsdCodeGenEnabledProps {

}

export const WsdlXsdCodeGenEnabled = makeTag<WsdlXsdCodeGenEnabledProps>("WsdlXsdCodeGenEnabled")

export interface WsdlXsdCodeGenEnableDataBindingProps {

}

export const WsdlXsdCodeGenEnableDataBinding = makeTag<WsdlXsdCodeGenEnableDataBindingProps>("WsdlXsdCodeGenEnableDataBinding")

export interface WsdlXsdCodeGenGenerateAsynchronousOperationsProps {

}

export const WsdlXsdCodeGenGenerateAsynchronousOperations = makeTag<WsdlXsdCodeGenGenerateAsynchronousOperationsProps>("WsdlXsdCodeGenGenerateAsynchronousOperations")

export interface WsdlXsdCodeGenGenerateDataTypesOnlyProps {

}

export const WsdlXsdCodeGenGenerateDataTypesOnly = makeTag<WsdlXsdCodeGenGenerateDataTypesOnlyProps>("WsdlXsdCodeGenGenerateDataTypesOnly")

export interface WsdlXsdCodeGenGenerateInternalTypesProps {

}

export const WsdlXsdCodeGenGenerateInternalTypes = makeTag<WsdlXsdCodeGenGenerateInternalTypesProps>("WsdlXsdCodeGenGenerateInternalTypes")

export interface WsdlXsdCodeGenGenerateMessageContractProps {

}

export const WsdlXsdCodeGenGenerateMessageContract = makeTag<WsdlXsdCodeGenGenerateMessageContractProps>("WsdlXsdCodeGenGenerateMessageContract")

export interface WsdlXsdCodeGenGenerateSerializableTypesProps {

}

export const WsdlXsdCodeGenGenerateSerializableTypes = makeTag<WsdlXsdCodeGenGenerateSerializableTypesProps>("WsdlXsdCodeGenGenerateSerializableTypes")

export interface WsdlXsdCodeGenImportXmlTypesProps {

}

export const WsdlXsdCodeGenImportXmlTypes = makeTag<WsdlXsdCodeGenImportXmlTypesProps>("WsdlXsdCodeGenImportXmlTypes")

export interface WsdlXsdCodeGenNamespaceMappingsProps extends StringPropertyTypeProps {

}

export const WsdlXsdCodeGenNamespaceMappings = makeTag<WsdlXsdCodeGenNamespaceMappingsProps>("WsdlXsdCodeGenNamespaceMappings")

export interface WsdlXsdCodeGenReuseTypesFlagProps {

}

export const WsdlXsdCodeGenReuseTypesFlag = makeTag<WsdlXsdCodeGenReuseTypesFlagProps>("WsdlXsdCodeGenReuseTypesFlag")

export interface WsdlXsdCodeGenReuseTypesModeProps {

}

export const WsdlXsdCodeGenReuseTypesMode = makeTag<WsdlXsdCodeGenReuseTypesModeProps>("WsdlXsdCodeGenReuseTypesMode")

export interface WsdlXsdCodeGenSerializerModeProps {

}

export const WsdlXsdCodeGenSerializerMode = makeTag<WsdlXsdCodeGenSerializerModeProps>("WsdlXsdCodeGenSerializerMode")

export interface WsdlXsdCodeGenUseSerializerForFaultsProps {

}

export const WsdlXsdCodeGenUseSerializerForFaults = makeTag<WsdlXsdCodeGenUseSerializerForFaultsProps>("WsdlXsdCodeGenUseSerializerForFaults")

export interface WsdlXsdCodeGenWrappedProps {

}

export const WsdlXsdCodeGenWrapped = makeTag<WsdlXsdCodeGenWrappedProps>("WsdlXsdCodeGenWrapped")

export interface XamlRootsLogProps extends StringPropertyTypeProps {

}

export const XamlRootsLog = makeTag<XamlRootsLogProps>("XamlRootsLog")

export interface XamlSavedStateFilePathProps extends StringPropertyTypeProps {

}

export const XamlSavedStateFilePath = makeTag<XamlSavedStateFilePathProps>("XamlSavedStateFilePath")

export interface XdcmakeProps extends SimpleItemTypeProps {

}

export const Xdcmake = makeTag<XdcmakeProps>("Xdcmake")

export interface XDCMakeProps extends TaskTypeProps {
  AcceptableNonZeroExitCodes?: unknown
  ActiveToolSwitchesValues?: unknown
  AdditionalDocumentFile?: unknown
  AdditionalOptions?: unknown
  DocumentLibraryDependencies?: boolean
  EnvironmentVariables?: unknown
  ExcludedInputPaths?: unknown
  LogStandardErrorAsError?: boolean
  MinimalRebuildFromTracking?: boolean
  OutputFile?: unknown
  PathOverride?: unknown
  ProjectName?: unknown
  SkippedExecution?: boolean
  SlashOld?: boolean
  Sources: unknown
  SourcesCompiled?: unknown
  StandardErrorImportance?: unknown
  StandardOutputImportance?: unknown
  SuppressStartupBanner?: boolean
  Timeout?: unknown
  TLogReadFiles?: unknown
  TLogWriteFiles?: unknown
  ToolExe?: unknown
  ToolPath?: unknown
  TrackedInputFilesToIgnore?: unknown
  TrackedOutputFilesToIgnore?: unknown
  TrackerLogDirectory?: unknown
  TrackFileAccess?: boolean
}

export const XDCMake = makeTag<XDCMakeProps>("XDCMake")

export interface XSDProps extends TaskTypeProps {
  AcceptableNonZeroExitCodes?: unknown
  ActiveToolSwitchesValues?: unknown
  AdditionalOptions?: unknown
  EnvironmentVariables?: unknown
  ExcludedInputPaths?: unknown
  GenerateFromSchema?: unknown
  Language?: unknown
  LogStandardErrorAsError?: boolean
  MinimalRebuildFromTracking?: boolean
  Namespace?: unknown
  PathOverride?: unknown
  SkippedExecution?: boolean
  Sources: unknown
  SourcesCompiled?: unknown
  StandardErrorImportance?: unknown
  StandardOutputImportance?: unknown
  SuppressStartupBanner?: boolean
  Timeout?: unknown
  TLogReadFiles?: unknown
  TLogWriteFiles?: unknown
  ToolExe?: unknown
  ToolPath?: unknown
  TrackedInputFilesToIgnore?: unknown
  TrackedOutputFilesToIgnore?: unknown
  TrackerLogDirectory?: unknown
  TrackFileAccess?: boolean
}

export const XSD = makeTag<XSDProps>("XSD")

export interface XslTransformationProps extends TaskTypeProps {
  OutputPaths: unknown
  Parameters?: unknown
  XmlContent?: unknown
  XmlInputPaths?: unknown
  XslCompiledDllPath?: unknown
  XslContent?: unknown
  XslInputPath?: unknown
}

export const XslTransformation = makeTag<XslTransformationProps>("XslTransformation")

export interface ZipDirectoryProps extends TaskTypeProps {
  /**
   * Specify the compression level to apply. Possible values are Optimal, Fastest, NoCompression and SmallestSize. In the .NET Framework version of MSBuild, the SmallestSize option is unavailable. Using it will on .NET Framework will log warning MSB3945 and use the default compression level instead.
   */
  CompressionLevel?: unknown
  DestinationFile: unknown
  Overwrite?: boolean
  SourceDirectory: unknown
}

export const ZipDirectory = makeTag<ZipDirectoryProps>("ZipDirectory")
