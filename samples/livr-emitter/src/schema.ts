/**
 * Base interface for all LIVR rules.
 * Extend and discriminate with `rule` property.
 */
interface LIVRRuleBase {
  rule: string;
  error_code?: string;
}

// --- Common rules ---
export interface RequiredRule extends LIVRRuleBase {
  rule: "required";
  error_code?: "REQUIRED";
}
export interface NotEmptyRule extends LIVRRuleBase {
  rule: "not_empty";
  error_code?: "CANNOT_BE_EMPTY";
}
export interface NotEmptyList extends LIVRRuleBase {
  rule: "not_empty_list";
  error_code?: "CANNOT_BE_EMPTY" | "FORMAT_ERROR";
}
export interface AnyObject extends LIVRRuleBase {
  rule: "any_object";
  error_code?: "FORMAT_ERROR";
}

// --- String rules ---
export interface StringRule extends LIVRRuleBase {
  rule: "string";
}
export interface EqRule extends LIVRRuleBase {
  rule: "eq";
  value: string;
  error_code?: "NOT_ALLOWED_VALUE";
}
export interface OneOfRule extends LIVRRuleBase {
  rule: "one_of";
  values: string[];
  error_code?: "NOT_ALLOWED_VALUE";
}
export interface MinLengthRule extends LIVRRuleBase {
  rule: "min_length";
  length: number;
  error_code?: "TOO_SHORT";
}
export interface MaxLengthRule extends LIVRRuleBase {
  rule: "max_length";
  length: number;
  error_code?: "TOO_LONG";
}
export interface LengthBetweenRule extends LIVRRuleBase {
  rule: "length_between";
  range: [number, number]; // [min, max]
  error_code?: "TOO_SHORT" | "TOO_LONG";
}
export interface LengthEqualRule extends LIVRRuleBase {
  rule: "length_equal";
  length: number;
  error_code?: "TOO_SHORT" | "TOO_LONG";
}
export interface LikeRule extends LIVRRuleBase {
  rule: "like";
  pattern: string;
  error_code?: "WRONG_FORMAT";
}

// --- Numeric rules ---
export interface IntegerRule extends LIVRRuleBase {
  rule: "integer";
  error_code?: "NOT_INTEGER";
}
export interface PositiveIntegerRule extends LIVRRuleBase {
  rule: "positive_integer";
  error_code?: "NOT_POSITIVE_INTEGER";
}
export interface DecimalRule extends LIVRRuleBase {
  rule: "decimal";
  error_code?: "NOT_DECIMAL";
}
export interface PositiveDecimalRule extends LIVRRuleBase {
  rule: "positive_decimal";
  error_code?: "NOT_POSITIVE_DECIMAL";
}
export interface MaxNumberRule extends LIVRRuleBase {
  rule: "max_number";
  value: number;
  error_code?: "TOO_HIGH" | "NOT_NUMBER";
}
export interface MinNumberRule extends LIVRRuleBase {
  rule: "min_number";
  value: number;
  error_code?: "TOO_LOW" | "NOT_NUMBER";
}
export interface NumberBetweenRule extends LIVRRuleBase {
  rule: "number_between";
  range: [number, number]; // [min, max]
  error_code?: "TOO_LOW" | "TOO_HIGH" | "NOT_NUMBER";
}

// --- Special rules ---
export interface EmailRule extends LIVRRuleBase {
  rule: "email";
  error_code?: "WRONG_EMAIL";
}
export interface UrlRule extends LIVRRuleBase {
  rule: "url";
  error_code?: "WRONG_URL";
}
export interface IsoDateRule extends LIVRRuleBase {
  rule: "iso_date";
  error_code?: "WRONG_DATE";
}
export interface EqualToFieldRule extends LIVRRuleBase {
  rule: "equal_to_field";
  field: string;
  error_code?: "FIELDS_NOT_EQUAL";
}
// --- Meta rules ---
export interface NestedObjectRule extends LIVRRuleBase {
  rule: "nested_object";
  schema: LIVRSchema;
  error_code?: "FORMAT_ERROR";
}
export interface VariableObjectRule extends LIVRRuleBase {
  rule: "variable_object";
  selectorField: string;
  cases: { [key: string]: LIVRSchema };
  error_code?: "FORMAT_ERROR";
}
export interface ListOfRule extends LIVRRuleBase {
  rule: "list_of";
  rules: LIVRFieldRules;
}
export interface ListOfObjectsRule extends LIVRRuleBase {
  rule: "list_of_objects";
  schema: LIVRSchema;
}
export interface ListOfDifferentObjectsRule extends LIVRRuleBase {
  rule: "list_of_different_objects";
  selectorField: string;
  cases: { [key: string]: LIVRSchema };
}
export interface OrRule extends LIVRRuleBase {
  rule: "or";
  /**
   * Each alternative is either:
   *   - a single rule (as an object)
   *   - or an array of rules (if several in a chain)
   */
  alternatives: (LIVRRule | LIVRRule[])[];
}

// --- Modifier rules ---
export interface TrimRule extends LIVRRuleBase {
  rule: "trim";
}
export interface ToLowerCaseRule extends LIVRRuleBase {
  rule: "to_lc";
}
export interface ToUpperCaseRule extends LIVRRuleBase {
  rule: "to_uc";
}
export interface RemoveRule extends LIVRRuleBase {
  rule: "remove";
  characters: string;
}
export interface LeaveOnlyRule extends LIVRRuleBase {
  rule: "leave_only";
  characters: string;
}
export interface DefaultRule extends LIVRRuleBase {
  rule: "default";
  value: string | number | boolean;
}
// --- Main rule type: union of all rule interfaces ---

export type LIVRRule =
  | RequiredRule
  | NotEmptyRule
  | NotEmptyList
  | AnyObject
  | StringRule
  | EqRule
  | OneOfRule
  | MinLengthRule
  | MaxLengthRule
  | LengthBetweenRule
  | LengthEqualRule
  | LikeRule
  | IntegerRule
  | PositiveIntegerRule
  | DecimalRule
  | PositiveDecimalRule
  | MaxNumberRule
  | MinNumberRule
  | NumberBetweenRule
  | EmailRule
  | UrlRule
  | IsoDateRule
  | EqualToFieldRule
  | NestedObjectRule
  | VariableObjectRule
  | ListOfRule
  | ListOfObjectsRule
  | ListOfDifferentObjectsRule
  | OrRule
  | TrimRule
  | ToLowerCaseRule
  | ToUpperCaseRule
  | RemoveRule
  | LeaveOnlyRule
  | DefaultRule;

// LIVR field rules: typically an array, but can be a single rule.
export type LIVRFieldRules = LIVRRule | LIVRRule[];

// A LIVR validation schema: field name -> rules
export interface LIVRSchema {
  [field: string]: LIVRFieldRules;
}

// Define a complete sample LIVR schema
export const livrApi: LIVRSchema = {
  name: [
    { rule: "required" },
    { rule: "string" },
    { rule: "max_length", length: 50 },
  ],
  lastName: [{ rule: "string" }, { rule: "length_between", range: [2, 50] }],
  email: [{ rule: "required" }, { rule: "email" }],
  age: [
    { rule: "integer" },
    { rule: "min_number", value: 18 },
    { rule: "max_number", value: 99 },
  ],
  address: [
    { rule: "required" },
    {
      rule: "nested_object",
      schema: {
        street: { rule: "string" },
        city: { rule: "required" },
        zip: [{ rule: "required" }, { rule: "positive_integer" }],
        geo: {
          rule: "nested_object",
          schema: {
            lat: { rule: "decimal" },
            lng: { rule: "decimal" },
          },
        },
      },
    },
  ],
  phones: [
    {
      rule: "list_of",
      rules: [{ rule: "string" }, { rule: "max_length", length: 15 }],
    },
  ],
  preferences: {
    rule: "variable_object",
    selectorField: "type",
    cases: {
      email: {
        frequency: { rule: "one_of", values: ["daily", "weekly", "monthly"] },
      },
      sms: {
        time: { rule: "string" },
      },
    },
  },
  tags: [{ rule: "list_of", rules: { rule: "string" } }],
  website: { rule: "url" },
  created_at: { rule: "iso_date" },
  status: { rule: "one_of", values: ["active", "inactive", "pending"] },
  password: [{ rule: "required" }, { rule: "min_length", length: 8 }],
  confirm_password: [
    { rule: "required" },
    { rule: "equal_to_field", field: "password" },
  ],
  // Example of the "or" rule
  contact: {
    rule: "or",
    alternatives: [
      [{ rule: "email" }],
      [{ rule: "string" }, { rule: "max_length", length: 15 }],
    ],
  },
};
