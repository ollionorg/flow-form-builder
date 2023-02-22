/* eslint-disable no-mixed-spaces-and-tabs */
import { LitElement, TemplateResult } from "lit";
import { Ref } from "lit-html/directives/ref.js";
import { FButtonState, FIconButtonState, FSelectOptions } from "@cldcvr/flow-core";
import { BetweenParams } from "./modules/validation/rules/between";
import { Subject } from "rxjs";

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
	fieldSeparator?: boolean;
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
	options: CheckboxOptions;
	direction?: "vertical" | "horizontal";
	gap?: "large" | "medium" | "small" | "x-small";
};

// radio type field
export type FormBuilderRadioField = FormBuilderBaseField & {
	type: "radio";
	options: RadioOptions;
	direction?: "vertical" | "horizontal";
	gap?: "large" | "medium" | "small" | "x-small";
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

export type CheckboxOption = {
	title: string;
	description?: string;
	iconTooltip?: string;
};
export type RadioOption = CheckboxOption;
export type CheckboxOptions = CheckboxOption[];
export type RadioOptions = RadioOption[];

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

export type FormBuilderShowCondition = (value: FormBuilderValues) => boolean;

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

export type FomrBuilderSuffixStateObject = {
	suffixFunction?: FormBuilderSuffixCondition;
	suffix?: string;
};

export type FormBuilderFieldRenderFunction = (
	name: string,
	field: FormBuilderField,
	fieldRef: Ref<FFormInputElements>,
	params?: Record<string, unknown>
) => TemplateResult;

export type FFormInputElements = {
	value: FormBuilderValues;
	state?: "primary" | "default" | "success" | "warning" | "danger";
	validate: (silent: boolean) => FormBuilderValidationPromise;
	showWhenSubject: Subject<FormBuilderValues>;
} & LitElement;

export type FormBuilderValidationPromise = Promise<{
	result: boolean;
	message: string | null;
	name: string;
	rule: FormBuilderGenericValidationRule["name"];
}>;
export type FormBuilderValues =
	| Record<string, unknown>
	| Record<string, unknown>[]
	| string[]
	| string
	| number
	| number[];

export type ValidationResults = (
	| {
			result: boolean;
			message: string | null;
			name: string;
			rule: "required" | "custom" | "email" | "between";
	  }
	| ValidationResults
)[];

export type ValidationResult = {
	result: boolean;
	message: string | null;
	name: string;
	rule: "required" | "custom" | "email" | "between";
};

export type FormBuilderState = {
	errors?: ValidationResult[];
	isValid: boolean;
	isChanged: boolean;
};

export type FormBuilderSize = "medium" | "small";
export type FormBuilderVariant = "curved" | "round" | "block";
export type FormBuilderCategory = "fill" | "outline" | "transparent";
export type FormBuilderGap = "large" | "medium" | "small" | "x-small";
