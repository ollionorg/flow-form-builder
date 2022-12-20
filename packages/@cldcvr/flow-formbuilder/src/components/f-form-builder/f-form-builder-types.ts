import { TemplateResult } from "lit";
import { Ref } from "lit-html/directives/ref.js";

export type FormBuilderBaseField = {
  id?: string; // id to uniquely identify in DOM
  state?: "default" | "success" | "error" | "warning";
  className?: string; // any additional css class name
  dataQA?: string; // data dq attribute for qa automation
  name: string; // name is required for form output values
  label?: FormBuilderLabel; // label of field
  description?: string; // description displayed at bottom of field
  canDuplicate?: boolean; // plus icon will displayed besides field to duplicate
  validationRules?: FormBuilderValidationRules; // validation rules to validate field
  if?: FormBuilderFieldShowCondition;
};

export type FormBuilderFieldShowCondition = (
  values: FormBuilderValues
) => boolean;

// text input type field
export type FormBuilderTextInputField = FormBuilderBaseField & {
  type: "text";
  placeholder?: string;
  autoComplete?: boolean; // to disabled browser's auto-complete behavior
};

export type FormBuilderLabel = {
  title: string; // title of field/group/form
  description?: string; // more info about title (displayed at bottom of label)
  icon?: string; //icon to display besides title
};

export type FormBuilderValidationRuleTriggers =
  | "blur"
  | "keyup"
  | "click"
  | "keypress"
  | "focus"
  | "input"
  | "change";
export type FormBuilderValidationRule = {
  when?: FormBuilderValidationRuleTriggers[]; // if not specified then validation triggers on @input event.
  message?: string; // custom message by using variables in message e.x. {{name}} is required field.
};
export type FormBuilderValidationRequiredRule = FormBuilderValidationRule & {
  name: "required";
};

export type FormBuilderCustomValidationRule = FormBuilderValidationRule & {
  name: "custom";
  when?: FormBuilderValidationRuleTriggers[];
  validate: FormBuilderValidatorFunction;
};

export type FormBuilderValidatorFunction = (
  value: string | unknown[],
  params?: Record<string, unknown>
) => boolean;

export type FormBuilderGenericValidationRule =
  | FormBuilderValidationRequiredRule
  | FormBuilderCustomValidationRule;
export type FormBuilderValidationRules = FormBuilderGenericValidationRule[];

export type FormBuilderField = FormBuilderTextInputField; // add othe rfield types
export type FormBuilderGroup = {
  direction?: "vertical" | "horizontal";
  variant?: "normal" | "compact";
  isCollapsible?: boolean;
  isCollpased?: boolean;
  canDuplicate?: boolean;
  label?: FormBuilderLabel;
  fields: FormBuilderField[];
};

export type FormBuilderConfig = {
  gap?: "small" | "medium" | "large";
  variant?: "fill" | "transparent";
  groupSeparator?: boolean;
  fieldSize?: "small" | "medium";
  groups: FormBuilderGroup[];
};

export type FormBuilderState = {
  isValid: boolean;
  isChanged: boolean;
  errors: Record<string, string>;
  refs: Record<string, Ref<HTMLInputElement>[]>;
  rules: Record<string, FormBuilderValidationRules | undefined>;
  errorRefs: Record<string, Ref<HTMLElement>[]>;
  ifs: Map<Ref<HTMLInputElement>, FormBuilderFieldShowCondition>;
};

export type FormBuilderValues = Record<
  string,
  string | string[] | number | number[]
>;

export type FormBuilderFieldRenderFunction = (
  field: FormBuilderField,
  idx: number,
  fieldRef: Ref<HTMLInputElement>,
  params?: Record<string, unknown>
) => TemplateResult;
