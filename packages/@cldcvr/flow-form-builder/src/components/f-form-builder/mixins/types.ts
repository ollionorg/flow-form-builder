import { TemplateResult } from "lit";
import { Ref } from "lit-html/directives/ref.js";
import {
  FButtonState,
  FCheckbox,
  FIconButtonState,
  FInput,
  FRadio,
  FSelect,
  FSelectOptions,
  FSwitch,
  FTextArea,
} from "@cldcvr/flow-core";
import { FCheckboxGroup } from "../../f-checkbox-group/f-checkbox-group";
import { BetweenParams } from "../validation-rules/between";
import { FFormArray } from "src/components/f-form-array/f-form-array";

export type FormBuilderConfig = {
  gap?: "small" | "medium" | "large" | "x-small";
  variant?: "round" | "curved" | "block";
  category?: "fill" | "transparent" | "outline";
  groupSeparator?: boolean;
  fieldSize?: "small" | "medium";
  label?: FormBuilderLabel;
  groups: Record<string, FormBuilderGroup>;
};

export type FormBuilderBaseGroup = {
  direction?: "vertical" | "horizontal";
  gap?: "small" | "medium" | "large" | "x-small";
  variant?: "normal" | "compact";
  isCollapsible?: boolean;
  isCollapsed?: boolean;
  label?: FormBuilderLabel;
  fields: Record<string, FormBuilderField>;
  showWhen?: FormBuilderShowCondition;
};

export type FormBuilderArrayGroup = FormBuilderBaseGroup & {
  type: "array";
  canDuplicate?: boolean;
};
export type FormBuilderObjectGroup = FormBuilderBaseGroup & {
  type: "object";
};
export type FormBuilderGroup = FormBuilderArrayGroup | FormBuilderObjectGroup;

export type FormBuilderFieldEvents = {
  onClick?: (event: PointerEvent) => void;
  onInput?: (event: Event) => void;
  onFocus?: (event: FocusEvent) => void;
  onKeyPress?: (event: KeyboardEvent) => void;
  onKeyDown?: (event: KeyboardEvent) => void;
  onKeyUp?: (event: KeyboardEvent) => void;
  onMouseOver?: (event: MouseEvent) => void;
};
export type FormBuilderBaseField = {
  id?: string; // id to uniquely identify in DOM
  state?: "default" | "success" | "danger" | "warning" | "primary";
  className?: string; // any additional css class name
  dataQA?: string; // data dq attribute for qa automation
  label?: FormBuilderLabel; // label of field
  description?: string; // description displayed at bottom of field
  validationRules?: FormBuilderValidationRules; // validation rules to validate field
  disabled?: boolean;
  helperText?: string;
  showWhen?: FormBuilderShowCondition;
} & FormBuilderFieldEvents;

export type FormBuilderArrayField = FormBuilderBaseField & {
  type: "array";
  field: FormBuilderField;
};
export type FormBuilderObjectField = FormBuilderBaseField & {
  type: "object";
  direction?: "vertical" | "horizontal";
  gap?: "small" | "medium" | "large" | "x-small";
  variant?: "normal" | "compact";
  isCollapsible?: boolean;
  isCollapsed?: boolean;
  fields: Record<string, FormBuilderField>;
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
  suffixWhen?: FormBuilderSuffixCondition;
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

// button type field
export type FormBuilderButtonField = Omit<FormBuilderBaseField, "label"> & {
  type: "button";
  label: string;
  state?: FButtonState;
  iconLeft?: string;
  iconRight?: string;
  counter?: string;
  loading?: boolean;
  disabled?: boolean;
  onMouseLeave?: (event: MouseEvent) => void;
};

// button type field
export type FormBuilderIconButtonField = Omit<FormBuilderBaseField, "label"> & {
  type: "icon-button";
  icon: string;
  state?: FIconButtonState;
  counter?: string;
  loading?: boolean;
  disabled?: boolean;
  onMouseLeave?: (event: MouseEvent) => void;
};

export type CheckboxOptions = {
  id: string;
  title: string;
  description?: string;
  iconTooltip?: string;
};
export type CheckboxOptionsType = CheckboxOptions[];
export type RadioOptionsType = CheckboxOptionsType;

export type FormBuilderField =
  | FormBuilderTextInputField
  | FormBuilderCheckboxField
  | FormBuilderTextAreaField
  | FormBuilderRadioField
  | FormBuilderSwitchField
  | FormBuilderSelectField
  | FormBuilderButtonField
  | FormBuilderIconButtonField
  | FormBuilderArrayField
  | FormBuilderObjectField; // add other field types

export type FormBuilderShowCondition = (values: FormBuilderValues) => boolean;

export type FormBuilderSuffixCondition = (value: string) => boolean;

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
  params?: Record<string, unknown>;
};
export type FormBuilderValidationRequiredRule = FormBuilderValidationRule & {
  name: "required";
};

export type FormBuilderValidationEmailRule = FormBuilderValidationRule & {
  name: "email";
};

export type FormBuilderValidationBetweenRule = FormBuilderValidationRule & {
  name: "between";
  params: BetweenParams;
};

export type FormBuilderCustomValidationRule = FormBuilderValidationRule & {
  name: "custom";
  when?: FormBuilderValidationRuleTriggers[];
  validate: FormBuilderValidatorFunction;
};

export type FormBuilderValidatorFunction<
  TValue = string | unknown[],
  TParams = Record<string, unknown>
> = (value: TValue, params?: TParams) => boolean;

export type FormBuilderGenericValidationRule =
  | FormBuilderValidationRequiredRule
  | FormBuilderCustomValidationRule
  | FormBuilderValidationEmailRule
  | FormBuilderValidationBetweenRule;
export type FormBuilderValidationRules = FormBuilderGenericValidationRule[];

export type FormBuilderState = {
  isValid: boolean;
  isChanged: boolean;
  errors: Record<string, string>;
  refs: Record<string, Ref<FFormInputElements>>;
  helperTexts: Record<string, string | undefined>;
  rules: Record<string, FormBuilderValidationRules | undefined>;
  showFunctions: Map<Ref<HTMLElement>, FormBuilderShowCondition>;
  suffixFunctions?: Map<Ref<HTMLElement>, FomrBuilderSuffixStateObject>;
};

export type FomrBuilderSuffixStateObject = {
  suffixFunction?: FormBuilderSuffixCondition;
  suffix?: string;
};
export type FormBuilderObjectGroupValues = Record<
  string,
  Record<
    string,
    string | string[] | number | number[] | unknown | unknown[] | undefined
  >
>;

export type FormBuilderArrayGroupValues = Record<
  string,
  Record<
    string,
    string | string[] | number | number[] | unknown | unknown[] | undefined
  >[]
>;
export type FormBuilderValues =
  | FormBuilderObjectGroupValues
  | FormBuilderArrayGroupValues;

export type FormBuilderFieldRenderFunction = (
  name: string,
  field: FormBuilderField,
  fieldRef: Ref<FFormInputElements>,
  params?: Record<string, unknown>
) => TemplateResult;

export type FFormInputElements =
  | FInput
  | FCheckbox
  | FRadio
  | FSwitch
  | FTextArea
  | FSelect
  | FCheckboxGroup
  | FFormArray;
export type InternalFormBuilderGroup = FormBuilderGroup & {
  name: string;
  fields: Record<string, FormBuilderField & { valueIdx?: number }>;
};
