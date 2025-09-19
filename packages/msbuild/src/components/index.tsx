export interface _AppxBundleResourceFileMapsIntermediateProps {
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
export interface _GetResolvedSDKReferencesOutputProps {
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
export interface _PackagingOutputsUnexpandedProps {
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
export interface _ProjectArchitectureFromPayloadProps {
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
export interface _ProjectArchitectureItemProps {
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
export interface _StoreManifestSchemaDirProps {

}
/**
 * Indicates whether to enable acceleration when building in Visual Studio (boolean).
 */
export interface AccelerateBuildsInVisualStudioProps {

}
export interface AdditionalFileItemNamesProps {

}
export interface AdditionalIncludeDirectoriesProps {

}
export interface AdditionalManifestFilesProps {

}
export interface AdditionalOptionsProps {

}
export interface AdditionalUsingDirectoriesProps {

}
export interface ALProps {
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
export interface AnalyzerProps {
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to include in this item list
   */
  Include: string
  /**
   * Optional expression evaluated to determine whether the items should be evaluated
   */
  Condition: string
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
export interface ApplicationDefinitionProps {
  CopyToOutputDirectory: unknown
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
export interface AppxHashUriProps {
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
export interface AppxManifestProps {
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
export interface AppxManifestImageFileNameQueryProps {
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
 * App manifest metadata item. Can be a literal, or it can be a path to a binary to extract version from.
 */
export interface AppxManifestMetadataProps {
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
 * App manifest schema file.
 */
export interface AppxManifestSchemaProps {
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
export interface AppxPackagePayloadProps {
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
export interface AspNetCompilerProps {
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
export interface AssemblyIdentityProps {

}
export interface AssemblyKeyContainerNameProps {

}
export interface AssemblyKeyProviderNameProps {

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
export interface AssignCultureProps {
  Files: unknown
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
export interface AssignProjectConfigurationProps {
  AssignedProjects: unknown
  CurrentProjectConfiguration: unknown
  CurrentProjectPlatform: unknown
  DefaultToVcxPlatformMapping: unknown
  ProjectReferences: unknown
  ResolveConfigurationPlatformUsingMappings: unknown
  SolutionConfigurationContents: unknown
  UnassignedProjects: unknown
  VcxToDefaultPlatformMapping: unknown
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
export interface AssignTargetPathProps {
  Files: unknown
  RootFolder: unknown
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
export interface AxImpProps {
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
export interface BootstrapperFileProps {
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
export interface BrowseInformationProps {

}
export interface BscmakeProps {
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
export interface BSCMakeProps {
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
export interface CallingConventionProps {

}
export interface CallTargetProps {
  RunEachTargetSeparately: unknown
  Targets: unknown
  UseResultsCache: unknown
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
export interface CharacterSetProps {

}
export interface CheckForOverflowUnderflowProps {

}
export interface CLProps {
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
export interface ClCompileProps {
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
export interface ClientStubFileProps {

}
export interface ClIncludeProps {
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
export interface CLRSupportProps {

}
export interface CodeAnalysisProps {
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
export interface CodeAnalysisDependentAssemblyPathsProps {
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to include in this item list
   */
  Include: string
  /**
   * Optional expression evaluated to determine whether the items should be evaluated
   */
  Condition: string
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
 * Code Analysis custom dictionaries.
 */
export interface CodeAnalysisDictionaryProps {
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to include in this item list
   */
  Include: string
  /**
   * Optional expression evaluated to determine whether the items should be evaluated
   */
  Condition: string
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
export interface CodeAnalysisImportProps {
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to include in this item list
   */
  Include: string
  /**
   * Optional expression evaluated to determine whether the items should be evaluated
   */
  Condition: string
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
export interface CombinePathProps {
  BasePath: unknown
  CombinedPaths: unknown
  Paths: unknown
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
export interface COMFileReferenceProps {
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
export interface ComFilesOutputGroupOutputsProps {
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
export interface CompileProps {
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to include in this item list
   */
  Include: string
  CopyToOutputDirectory: unknown
  /**
   * Optional expression evaluated to determine whether the items should be evaluated
   */
  Condition: string
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
export interface COMReferenceProps {
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to include in this item list
   */
  Include: string
  /**
   * Optional expression evaluated to determine whether the items should be evaluated
   */
  Condition: string
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
export interface ContentProps {
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to include in this item list
   */
  Include: string
  CopyToOutputDirectory: unknown
  /**
   * Optional expression evaluated to determine whether the items should be evaluated
   */
  Condition: string
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
export interface ConvertToAbsolutePathProps {
  AbsolutePaths: unknown
  Paths: unknown
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
export interface CopyProps {
  DestinationFiles: unknown
  DestinationFolder: unknown
  OverwriteReadOnlyFiles: unknown
  Retries: unknown
  RetryDelayMilliseconds: unknown
  SkipUnchangedFiles: unknown
  UseHardlinksIfPossible: unknown
  UseSymboliclinksIfPossible: unknown
  SourceFiles: unknown
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
export interface CopyLocalFilesOutputGroupOutputProps {
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
export interface CopyWinmdArtifactsOutputGroupOutputsProps {
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
export interface CPPCleanProps {
  DeletedFiles: unknown
  DoDelete: unknown
  FilePatternsToDeleteOnClean: unknown
  FilesExcludedFromClean: unknown
  FoldersToClean: unknown
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
export interface CPreprocessOptionsProps {

}
export interface CreateAppStoreContainerProps {
  Items: unknown
  ProjectName: unknown
  OutputPath: unknown
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
export interface CreateCSharpManifestResourceNameProps {
  PrependCultureAsDirectory: unknown
  ResourceFiles: unknown
  ResourceFilesWithManifestResourceNames: unknown
  RootNamespace: unknown
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
export interface CreateDesktopShortcutProps {

}
export interface CreateHotpatchableImageProps {

}
export interface CreateItemProps {
  AdditionalMetadata: unknown
  Exclude: unknown
  Include: unknown
  PreserveExistingMetadata: unknown
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
export interface CreatePriConfigXmlForFullIndexProps {
  LayoutResfilesPath: unknown
  ResourcesResfilesPath: unknown
  PriResfilesPath: unknown
}
export interface CreatePriConfigXmlForMainPackageFileMapProps {
  AppxBundleAutoResourcePackageQualifiers: unknown
}
export interface CreatePriConfigXmlForSplittingProps {
  ResourcesPriFilePath: unknown
}
export interface CreatePriConfigXmlTaskProps {
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
export interface CreatePriFilesForPortableLibrariesProps {
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
export interface CreatePropertyProps {
  Value: unknown
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
export interface CreateVisualBasicManifestResourceNameProps {
  PrependCultureAsDirectory: unknown
  ResourceFiles: unknown
  ResourceFilesWithManifestResourceNames: unknown
  RootNamespace: unknown
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
/**
 * boolean
 */
export interface CreateWebPageOnPublishProps {

}
export interface CscProps {
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
export interface CustomBuildStepProps {
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
export interface DelaySignProps {

}
export interface DeleteProps {
  DeletedFiles: unknown
  Files: unknown
  TreatErrorsAsWarnings: unknown
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
export interface DotNetCliToolReferenceProps {
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to include in this item list
   */
  Include: string
  /**
   * Version of dependency
   */
  Version: string
  /**
   * Optional expression evaluated to determine whether the items should be evaluated
   */
  Condition: string
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
export interface DownloadFileProps {
  DestinationFileName: unknown
  DestinationFolder: unknown
  DownloadedFile: unknown
  Retries: unknown
  RetryDelayMilliseconds: unknown
  SkipUnchangedFiles: unknown
  SourceUrl: unknown
  Timeout: unknown
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
/**
 * Resources to be embedded in the generated assembly
 */
export interface EmbeddedResourceProps {
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to include in this item list
   */
  Include: string
  CopyToOutputDirectory: unknown
  /**
   * Optional expression evaluated to determine whether the items should be evaluated
   */
  Condition: string
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
export interface ErrorProps {
  Code: unknown
  File: unknown
  HelpKeyword: unknown
  Text: unknown
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
export interface ExecProps {
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
export interface ExpandPayloadDirectoriesProps {
  Inputs: unknown
  Expanded: unknown
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
export interface ExpandPriContentProps {
  Inputs: unknown
  Expanded: unknown
  IntermediateFileWrites: unknown
  IntermediateDirectory: unknown
  AdditionalMakepriExeParameters: unknown
  MakePriExeFullPath: unknown
  MakePriExtensionPath: unknown
}
export interface ExtractHashAlgorithmIdProps {
  StoreAssociationFile: unknown
  HashUris: unknown
  HashAlgorithmId: unknown
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
export interface FallbackCultureProps {

}
export interface FileAlignmentProps {

}
export interface FileAssociationProps {
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
export interface FileUpgradeFlagsProps {

}
/**
 * Numeric value of the version for the assembly manifest in the format major.minor.build.revision (e.g. 2.4.0.1)
 */
export interface FileVersionProps {

}
export interface FilterOutUnusedLanguagesResourceFileMapsProps {
  FileMaps: unknown
  FileNamePrefix: unknown
  MapSuffix: unknown
  Languages: unknown
  FilteredFileMaps: unknown
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
export interface FindAppConfigFileProps {
  AppConfigFile: unknown
  PrimaryList: unknown
  SecondaryList: unknown
  TargetPath: unknown
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
export interface FindInListProps {
  CaseSensitive: unknown
  FindLastMatch: unknown
  ItemFound: unknown
  ItemSpecToFind: unknown
  List: unknown
  MatchFileNameOnly: unknown
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
export interface FindUnderPathProps {
  Files: unknown
  InPath: unknown
  OutOfPath: unknown
  Path: unknown
  UpdateToAbsolutePaths: unknown
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
export interface FormatUrlProps {
  InputUrl: unknown
  OutputUrl: unknown
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
export interface FormatVersionProps {
  FormatType: unknown
  OutputVersion: unknown
  Revision: unknown
  Version: unknown
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
export interface FrameworkReferenceProps {
  /**
   * Controls whether the runtime assets of this shared framework can be trimmed by the IL Linker (if PublishTrimmed is true).
   */
  IsTrimmable: string
  /**
   * Controls whether the app will target the latest patch of the runtime.  Defaults to true for self-contained apps, false otherwise.
   */
  TargetLatestRuntimePatch: string
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
export interface FunctionLevelLinkingProps {

}
export interface GenerateApplicationManifestProps {
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
export interface GenerateAppxManifestProps {
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
/**
 * Flag indicating whether to generate app package during the build.
 */
export interface GenerateAppxPackageOnBuildProps {

}
export interface GenerateAppxPackageRecipeProps {
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
export interface GenerateAppxSymbolPackageProps {
  PdbCopyExeFullPath: unknown
  PdbFiles: unknown
  StrippedDirectory: unknown
  AppxSymbolPackageOutput: unknown
  ProjectName: unknown
  StrippedPdbs: unknown
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
export interface GenerateBootstrapperProps {
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
export interface GenerateCatalogFilesProps {

}
export interface GenerateCategoryTagsProps {

}
export interface GenerateClientFilesProps {

}
export interface GenerateDeploymentManifestProps {
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
/**
 * Value indicating whether a documentation file will be generated by the compiler
 */
export interface GenerateDocumentationFileProps {

}
export interface GenerateLauncherProps {
  EntryPoint: unknown
  OutputPath: unknown
  VisualStudioVersion: unknown
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
export interface GenerateLibraryLayoutProps {

}
export interface GenerateManifestsProps {

}
/**
 * Value indicating whether a NuGet package will be generated when the project is built
 */
export interface GeneratePackageOnBuildProps {

}
export interface GeneratePriConfigurationFilesProps {
  LayoutResfilesPath: unknown
  ResourcesResfilesPath: unknown
  PriResfilesPath: unknown
  LayoutFiles: unknown
  PRIResourceFiles: unknown
  PriFiles: unknown
  IntermediateExtension: unknown
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
/**
 * Set this property to 'false' to disable the automatic generation of entry point for VSTest.
 */
export interface GenerateProgramFileProps {

}
export interface GenerateProjectArchitecturesFileProps {
  ProjectArchitectures: unknown
  ProjectArchitecturesFilePath: unknown
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
export interface GenerateProjectPriFileProps {
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
export interface GenerateResourceProps {
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
export interface GenerateTrustInfoProps {
  ApplicationDependencies: unknown
  BaseManifest: unknown
  ExcludedPermissions: unknown
  TargetFrameworkMoniker: unknown
  TargetZone: unknown
  TrustInfoFile: unknown
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
export interface GenerateTypeLibraryProps {

}
export interface GetAppxBundlePlatformsProps {
  Input: unknown
  PackageArchitecture: unknown
  Platforms: unknown
  Last: unknown
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
export interface GetAssemblyIdentityProps {
  Assemblies: unknown
  AssemblyFiles: unknown
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
export interface GetDefaultResourceLanguageProps {
  DefaultLanguage: unknown
  SourceAppxManifest: unknown
  DefaultResourceLanguage: unknown
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
export interface GetFileHashProps {
  Files: unknown
  Algorithm: unknown
  MetadataName: unknown
  HashEncoding: unknown
  Hash: unknown
  Items: unknown
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
export interface GetFrameworkPathProps {
  Path: unknown
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
export interface GetFrameworkSdkPackagesProps {
  FrameworkSdkReferences: unknown
  FrameworkSdkPackages: unknown
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
export interface GetFrameworkSdkPathProps {
  Path: unknown
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
export interface GetOutputFileNameProps {
  OutputExtension: unknown
  OutputFile: unknown
  OutputPath: unknown
  SourceFile: unknown
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
export interface GetPackageArchitectureProps {
  Platform: unknown
  ProjectArchitecture: unknown
  RecursiveProjectArchitecture: unknown
  PackageArchitecture: unknown
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
export interface GetReferenceAssemblyPathsProps {
  RootPath: unknown
  TargetFrameworkMoniker: unknown
  TargetFrameworkMonikerDisplayName: unknown
  BypassFrameworkInstallChecks: unknown
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
export interface GetSdkPropertyValueProps {
  TargetPlatformIdentifier: unknown
  TargetPlatformVersion: unknown
  TargetPlatformSdkRootOverride: unknown
  PropertyName: unknown
  PropertyValue: unknown
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
export interface GetSdkToolFullPathProps {
  ToolName: unknown
  ToolFullPath: unknown
  TargetPlatformIdentifier: unknown
  TargetPlatformVersion: unknown
  TargetPlatformSdkRootOverride: unknown
  MSBuildArchitecture: unknown
  ActualToolFullPath: unknown
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
export interface GetWindowsDesktopSdkDirProps {
  TargetPlatformIdentifier: unknown
  TargetPlatformVersion: unknown
  TargetPlatformSdkRootOverride: unknown
  WindowsDesktopSdkDir: unknown
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
export interface HeaderFileNameProps {

}
export interface HighEntropyVAProps {

}
export interface HostInBrowserProps {

}
export interface IgnoreImportLibraryProps {

}
export interface IgnoreStandardIncludePathProps {

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
export interface InternalsVisibleToProps {
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to include in this item list
   */
  Include: string
  /**
   * Optional public key associated with the strong name signature of the friend assembly.
   */
  Key: string
  /**
   * Optional expression evaluated to determine whether the items should be evaluated
   */
  Condition: string
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
export interface IsAssemblyProps {
  Assemblies: unknown
  AssemblyFiles: unknown
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
export interface JCPAProps {

}
export interface KeywordProps {

}
export interface LangVersionProps {

}
/**
 * Full path to a folder with package layout.
 */
export interface LayoutDirProps {

}
export interface LCProps {
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
export interface LIBProps {
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
export interface LinkProps {
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
export interface LinkIncrementalProps {

}
export interface LocaleIDProps {

}
export interface MakeAppxBundleProps {
  BundleDir: unknown
}
/**
 * Full path to makeappx.exe utility.
 */
export interface MakeAppxExeFullPathProps {

}
export interface MakeAppxPackProps {
  ResourcePack: unknown
  ValidateResourcesReferencedByManifest: unknown
  HashAlgorithmId: unknown
  AppxManifest: unknown
  FileMap: unknown
}
export interface MakeDirProps {
  Directories: unknown
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
export interface ManifestProps {
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
export interface ManifestCertificateThumbprintProps {

}
export interface ManifestFromManagedAssemblyProps {

}
export interface ManifestKeyFileProps {

}
/**
 * boolean
 */
export interface MapFileExtensionsProps {

}
export interface MessageProps {
  Importance: unknown
  Text: unknown
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
export interface MidlProps {
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
export interface MIDLProps {
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
export interface MoveProps {
  DestinationFiles: unknown
  DestinationFolder: unknown
  OverwriteReadOnlyFiles: unknown
  SourceFiles: unknown
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
export interface MSBuildProps {
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
export interface MtProps {
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
export interface MultiProcessorCompilationProps {

}
export interface MyTypeProps {

}
/**
 * Reference to a native manifest file, or to a file that contains a native manifest
 */
export interface NativeReferenceProps {
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to include in this item list
   */
  Include: string
  /**
   * Optional expression evaluated to determine whether the items should be evaluated
   */
  Condition: string
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
 * The locale ID for the NuGet package
 */
export interface NeutralLanguageProps {

}
export interface NoConfigProps {

}
/**
 * Files that should have no role in the build process
 */
export interface NoneProps {
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
export interface OldToolsVersionProps {

}
export interface OmitDefaultLibNameProps {

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
export interface OutDirProps {

}
export interface OutputDirectoryProps {

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
export interface PackageReferenceProps {
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to include in this item list
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
  /**
   * Optional expression evaluated to determine whether the items should be evaluated
   */
  Condition: string
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
export interface PageProps {
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to include in this item list
   */
  Include: string
  CopyToOutputDirectory: unknown
  /**
   * Optional expression evaluated to determine whether the items should be evaluated
   */
  Condition: string
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
export interface ParsePlatformSpecificBundleArtifactsListsProps {
  Files: unknown
  Artifacts: unknown
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
export interface PlatformVersionDescriptionProps {
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
 * Command line to be run at the end of build
 */
export interface PostBuildEventProps {

}
/**
 * Command line to be run at the start of build
 */
export interface PreBuildEventProps {

}
export interface PrecompiledHeaderProps {

}
export interface PrecompiledHeaderFileProps {

}
export interface Prefer32BitProps {

}
export interface PreferNativeArm64Props {

}
export interface PreLinkEventProps {
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
export interface PreprocessorDefinitionsProps {

}
/**
 * Value indicating whether reference assemblies can be used in dynamic compilation
 */
export interface PreserveCompilationContextProps {

}
/**
 * String resources to be indexed in app package's resource index.
 */
export interface PRIResourceProps {
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
export interface ProjectConfigurationProps {
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
export interface ProjectGuidProps {

}
export interface ProjectPriFileProps {
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
export interface ProjectReferenceProps {
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to include in this item list
   */
  Include: string
  /**
   * Optional expression evaluated to determine whether the items should be evaluated
   */
  Condition: string
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
export interface ProjectTypeProps {

}
export interface ProjectTypeGuidsProps {

}
export interface PropertyProps {

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
export interface PublishFileProps {
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
export interface RCProps {
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
export interface ReadLinesFromFileProps {
  File: unknown
  Lines: unknown
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
export interface RecursePathProps {

}
export interface RedirectOutputAndErrorsProps {

}
/**
 * Reference to an assembly
 */
export interface ReferenceProps {
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to include in this item list
   */
  Include: string
  /**
   * Optional expression evaluated to determine whether the items should be evaluated
   */
  Condition: string
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
 * Semi-colon separated list of folders to search during reference resolution
 */
export interface ReferencePathProps {

}
export interface RegisterAssemblyProps {
  Assemblies: unknown
  AssemblyListFile: unknown
  CreateCodeBase: unknown
  TypeLibFiles: unknown
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
export interface RegisterForComInteropProps {

}
export interface RegistrarScriptFileProps {

}
export interface RemoteDebugEnabledProps {

}
export interface RemoteDebugMachineProps {

}
export interface RemoveDirProps {
  Directories: unknown
  RemovedDirectories: unknown
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
export interface RemoveDuplicatePayloadProps {
  Inputs: unknown
  Platform: unknown
  Filtered: unknown
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
export interface RemoveDuplicatePriFilesProps {
  Inputs: unknown
  Platform: unknown
  Filtered: unknown
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
export interface RemoveDuplicatesProps {
  Filtered: unknown
  HadAnyDuplicates: unknown
  Inputs: unknown
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
export interface RemoveDuplicateSDKReferencesProps {
  Inputs: unknown
  Filtered: unknown
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
export interface RequiresFramework35SP1AssemblyProps {
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
/**
 * Full path to a folder containing resgen tool.
 */
export interface ResgenToolPathProps {

}
export interface ResolveAssemblyReferenceProps {
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
export interface ResolveComReferenceProps {
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
export interface ResolveKeySourceProps {
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
export interface ResolveManifestFilesProps {
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
export interface ResolveNativeReferenceProps {
  AdditionalSearchPaths: unknown
  ContainedComComponents: unknown
  ContainedLooseEtcFiles: unknown
  ContainedLooseTlbFiles: unknown
  ContainedPrerequisiteAssemblies: unknown
  ContainedTypeLibraries: unknown
  ContainingReferenceFiles: unknown
  NativeReferences: unknown
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
export interface ResolveNonMSBuildProjectOutputProps {
  PreresolvedProjectOutputs: unknown
  ProjectReferences: unknown
  ResolvedOutputPaths: unknown
  UnresolvedProjectReferences: unknown
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
/**
 * File that is compiled into the assembly
 */
export interface ResourceProps {
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to include in this item list
   */
  Include: string
  CopyToOutputDirectory: unknown
  /**
   * Optional expression evaluated to determine whether the items should be evaluated
   */
  Condition: string
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
export interface ResourceCompileProps {
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
export interface SchemaVersionProps {

}
/**
 * Reference to an extension SDK
 */
export interface SDKReferenceProps {
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to include in this item list
   */
  Include: string
  /**
   * Optional expression evaluated to determine whether the items should be evaluated
   */
  Condition: string
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
export interface SetEnvProps {
  Prefix: unknown
  Target: unknown
  Value: unknown
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
export interface SGenProps {
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
export interface ShowIncludesProps {

}
export interface SignAppxPackageProps {
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
/**
 * Full path to signtool.exe utility.
 */
export interface SignAppxPackageExeFullPathProps {

}
export interface SignAssemblyProps {

}
export interface SignFileProps {
  CertificateThumbprint: unknown
  SigningTarget: unknown
  TimestampUrl: unknown
  TargetFrameworkIdentifier: unknown
  TargetFrameworkVersion: unknown
  DisallowMansignTimestampFallback: unknown
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
export interface SignManifestsProps {

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
export interface StoreAssociationFileProps {
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
 * Name of the store manifest file.
 */
export interface StoreManifestNameProps {

}
/**
 * Store manifest schema file.
 */
export interface StoreManifestSchemaProps {
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
export interface StringPoolingProps {

}
export interface StripPrivateSymbolsProps {
  PdbCopyToolPath: unknown
  InputPdb: unknown
  StrippedPdb: unknown
}
export interface StructMemberAlignmentProps {

}
export interface SuiteNameProps {

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
}
export interface TelemetryProps {
  EventName: unknown
  EventData: unknown
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
export interface TlbImpProps {
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
/**
 * Specifies the command that will invoke the tool after it's installed.
 */
export interface ToolCommandNameProps {

}
export interface TouchProps {
  AlwaysCreate: unknown
  Files: unknown
  ForceTouch: unknown
  Time: unknown
  TouchedFiles: unknown
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
/**
 * Configures the created packages. Possible values are: StoreAndSideload (produces the appxupload and the sideloaded packages), StoreUpload (produces only the appxupload package), and SideloadOnly(produces only the packages for sideloading).
 */
export interface UapAppxPackageBuildModeProps {

}
export interface UICultureProps {

}
export interface UndefinePreprocessorDefinitionsProps {

}
export interface UnregisterAssemblyProps {
  Assemblies: unknown
  AssemblyListFile: unknown
  TypeLibFiles: unknown
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
export interface UnzipProps {
  DestinationFiles: unknown
  DestinationFolder: unknown
  OverwriteReadOnlyFiles: unknown
  SkipUnchangedFiles: unknown
  SourceFiles: unknown
  UnzippedFiles: unknown
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
export interface UpdateAppxManifestForBundleProps {
  FinalAppxManifest: unknown
  AppxManifestForBundle: unknown
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
export interface UpdateMainPackageFileMapProps {
  Input: unknown
  Output: unknown
  SplitResourcesPriPath: unknown
  DefaultResourceLanguage: unknown
  DefaultResourceQualifiers: unknown
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
export interface UpdateManifestProps {
  ApplicationManifest: unknown
  TargetFrameworkVersion: unknown
  ApplicationPath: unknown
  InputManifest: unknown
  OutputManifest: unknown
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
export interface UpToDateCheckBuiltProps {
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
 * Defines an item to be considered an input to the project for the fast up-to-date check.
 */
export interface UpToDateCheckInputProps {
  /**
   * Optional group(s) of inputs and outputs that should be considered in isolation during build. Useful when a build involves multiple discrete compilation/transpilation steps. Semicolon-delimited when multiple sets are required.
   */
  Set: unknown
  /**
   * Optional identifier for this item that allows it to be omitted from the fast up-to-date check via a global property.
   */
  Kind: unknown
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
 * Defines an item to be considered an output of the project for the fast up-to-date check.
 */
export interface UpToDateCheckOutputProps {
  /**
   * Optional group(s) of inputs and outputs that should be considered in isolation during build. Useful when a build involves multiple discrete compilation/transpilation steps. Semicolon-delimited when multiple sets are required.
   */
  Set: unknown
  /**
   * Optional identifier for this item that allows it to be omitted from the fast up-to-date check via a global property.
   */
  Kind: unknown
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
export interface UsingProps {
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to include in this item list
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
  /**
   * Optional expression evaluated to determine whether the items should be evaluated
   */
  Condition: string
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
export interface UTF8OutputProps {

}
export interface ValidateAllParametersProps {

}
export interface ValidateAppxManifestProps {
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
export interface ValidateAppxManifestItemsProps {
  AppxManifestItems: unknown
  CustomAppxManifestItems: unknown
  AppxPackageProject: unknown
  IdentityName: unknown
  IdentityVersion: unknown
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
export interface ValidateAppxPackageProps {
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
export interface ValidateStoreManifestProps {
  Input: unknown
  StoreManifestSchema: unknown
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
export interface VbcProps {
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
export interface VBRuntimeProps {

}
export interface VCBuildProps {
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
export interface VCMessageProps {
  Code: unknown
  Type: unknown
  Arguments: unknown
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
export interface VCTargetsPathProps {

}
export interface VerboseOutputProps {

}
export interface VerifyFileHashProps {
  File: unknown
  Hash: unknown
  HashEncoding: unknown
  Algorithm: unknown
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
export interface WarningProps {
  Code: unknown
  File: unknown
  HelpKeyword: unknown
  Text: unknown
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
export interface WebReferenceUrlProps {
  /**
   * Semi-colon separated list of files (wildcards are allowed) or other item names to include in this item list
   */
  Include: string
  /**
   * Optional expression evaluated to determine whether the items should be evaluated
   */
  Condition: string
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
export interface WholeProgramOptimizationProps {

}
export interface Win32ResourceFileProps {

}
export interface WriteCodeFragmentProps {
  AssemblyAttributes: unknown
  Language: unknown
  OutputDirectory: unknown
  OutputFile: unknown
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
export interface WriteLinesToFileProps {
  Encoding: unknown
  File: unknown
  Lines: unknown
  Overwrite: unknown
  WriteOnlyWhenDifferent: unknown
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
export interface XdcmakeProps {
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
export interface XDCMakeProps {
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
export interface XSDProps {
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
export interface XslTransformationProps {
  OutputPaths: unknown
  Parameters: unknown
  XmlContent: unknown
  XmlInputPaths: unknown
  XslCompiledDllPath: unknown
  XslContent: unknown
  XslInputPath: unknown
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
export interface ZipDirectoryProps {
  /**
   * Specify the compression level to apply. Possible values are Optimal, Fastest, NoCompression and SmallestSize. In the .NET Framework version of MSBuild, the SmallestSize option is unavailable. Using it will on .NET Framework will log warning MSB3945 and use the default compression level instead.
   */
  CompressionLevel: unknown
  DestinationFile: unknown
  Overwrite: unknown
  SourceDirectory: unknown
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
