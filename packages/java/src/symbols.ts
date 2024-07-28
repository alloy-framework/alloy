/**
 * Specific java symbols used for dep management
 */

import { OutputScope, OutputSymbol } from "@alloy-js/core";

/**
 * Represents an 'exported' symbol from a .java file. Class, enum, interface etc.
 * Not considered exported if private
 */
export interface JavaOutputSymbol extends OutputSymbol {
  /**
   * Fully qualified package name
   */
  package: string;
}

/**
 * Represents the java project itself (maven, gradle, etc)
 */
export interface JavaProjectScope extends OutputScope {
  kind: 'project';
}