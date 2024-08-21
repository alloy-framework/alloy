import { Binder, OutputScope, reactive } from "@alloy-js/core";

/**
 * Declare a scope for enum. Using a custom scope as there are extra rules
 * for defining the enum constants, as well as normal class members
 */
export interface JavaEnumScope extends OutputScope {
  kind: "enum";

  /**
   * List of members in the enum, uses name as value as these are unique
   */
  members: string[];

  /**
   * Dynamically calculate member delimiter based on position in enum declaration.
   * This is because the last member should end with ';', while others end with ','
   */
  getDelimiter(memberName: string): string;
}

export function createJavaEnumScope(
  binder: Binder,
  parent: OutputScope | undefined,
  name: string,
): JavaEnumScope {
  return binder.createScope<JavaEnumScope>({
    kind: "enum",
    name,
    parent,
    members: [],
    getDelimiter(memberName: string): string {
      const memberPosition = this.members.indexOf(memberName);
      // If in last position, end with ;
      return memberPosition === this.members.length - 1 ? ";" : ",";
    },
  });
}
