import { TemplateResult } from "lit";
import { Ref } from "lit-html/directives/ref.js";
import {
  FCheckbox,
  FInput,
  FRadio,
  FSelect,
  FSelectOptions,
  FSwitch,
  FTextArea,
} from "@cldcvr/flow-core";
import { FCheckboxGroup } from "../f-checkbox-group/f-checkbox-group";

export type FormBuilderConfig = {
  gap?: "small" | "medium" | "large" | "x-small";
  variant?: "round" | "curved" | "block";
  category?: "fill" | "transparent" | "outline";
  groupSeparator?: boolean;
  fieldSize?: "small" | "medium";
  label?: FormBuilderLabel;
  groups: Record<string, FormBuilderGroup>;
};

export type FormBuilderGroup = {
  direction?: "vertical" | "horizontal";
  gap?: "small" | "medium" | "large" | "x-small";
  variant?: "normal" | "compact";
  isCollapsible?: boolean;
  isCollapsed?: boolean;
  canDuplicate?: boolean;
  label?: FormBuilderLabel;
  fields: Record<string, FormBuilderField>;
  showWhen?: FormBuilderShowCondition;
};

export type FormBuilderBaseField = {
  id?: string; // id to uniquely identify in DOM
  state?: "default" | "success" | "danger" | "warning" | "primary";
  className?: string; // any additional css class name
  dataQA?: string; // data dq attribute for qa automation
  label?: FormBuilderLabel; // label of field
  description?: string; // description displayed at bottom of field
  canDuplicate?: boolean; // plus icon will displayed besides field to duplicate
  validationRules?: FormBuilderValidationRules; // validation rules to validate field
  disabled?: boolean;
  helperText?: string;
  showWhen?: FormBuilderShowCondition;
};
// text input type field
export type FormBuilderTextInputField = FormBuilderBaseField & {
  type: "text" | "email" | "password" | "url" | "tel" | "number";
  placeholder?: string;
  autoComplete?: boolean; // to disabled browser's auto-complete behavior
  iconLeft?: string;
  iconRight?: string;
  prefix?: string;
  suffix?: string;
  maxLength?: number;
  loading?: boolean;
  readonly?: boolean;
  clear?: boolean;
};

// checkbox type field
export type FormBuilderCheckboxField = FormBuilderBaseField & {
  type: "checkbox";
  options: CheckboxOptionsType;
};

// radio type field
export type FormBuilderRadioField = FormBuilderBaseField & {
  type: "radio";
  options: CheckboxOptionsType;
};

// switch type field
export type FormBuilderSwitchField = FormBuilderBaseField & {
  type: "switchButton";
};

//select type field
export type FormBuilderSelectField = FormBuilderBaseField & {
  type: "select";
  selection: "single" | "multiple";
  placeholder?: string;
  options: FSelectOptions;
  optionTemplate?: string;
  iconLeft?: string;
  height?: number;
  width?: string;
  searchable?: boolean;
  clear?: boolean;
  checkbox?: boolean;
  selectionLimit?: number;
  createOption?: boolean;
};

// text-area type field
export type FormBuilderTextAreaField = FormBuilderBaseField & {
  type: "textarea";
  placeholder?: string;
  maxLength?: number;
  readonly?: boolean;
  clear?: boolean;
  rows?: string;
  resizable?: boolean;
};

export type CheckboxOptions = {
  id: string;
  title: string;
  description?: string;
  iconTooltip?: string;
};
export type CheckboxOptionsType = CheckboxOptions[];

export type FormBuilderField =
  | FormBuilderTextInputField
  | FormBuilderCheckboxField
  | FormBuilderTextAreaField
  | FormBuilderRadioField
  | FormBuilderSwitchField
  | FormBuilderSelectField; // add other field types

export type FormBuilderShowCondition = (values: FormBuilderValues) => boolean;

export type FormBuilderLabel = {
  title: string; // title of field/group/form
  description?: string; // more info about title (displayed at bottom of label)
  iconTooltip?: string; //icon to display besides title
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

export type FormBuilderState = {
  isValid: boolean;
  isChanged: boolean;
  errors: Record<string, string>;
  refs: Record<string, Ref<FFormInputElements>>;
  helperTexts: Record<string, string | undefined>;
  rules: Record<string, FormBuilderValidationRules | undefined>;
  errorRefs: Record<string, Ref<HTMLElement>>;
  showFunctions: Map<Ref<HTMLElement>, FormBuilderShowCondition>;
};

export type FormBuilderValues = Record<
  string,
  Record<string, string | string[] | number | number[] | undefined>
>;

export type FormBuilderFieldRenderFunction = (
  name: string,
  field: FormBuilderField,
  idx: number,
  fieldRef: Ref<FFormInputElements>,
  params?: Record<string, unknown>,
  fieldErrorRef?: Ref<HTMLElement>
) => TemplateResult;

export type FFormInputElements =
  | FInput
  | FCheckbox
  | FRadio
  | FSwitch
  | FTextArea
  | FSelect
  | FCheckboxGroup;
