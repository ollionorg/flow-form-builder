import {
	CanValidateFields,
	FFormInputElements,
	FormBuilderField,
	FormBuilderGenericValidationRule,
	FormBuilderLabel,
	FormBuilderValidationPromise,
	FormBuilderValidationRules,
	ValidationResult,
	ValidationResults
} from "../../types";

import rules from "./rules";
import defaultMessages from "./default-validation-messages";
import { FButton, FIconButton } from "@cldcvr/flow-core";
import defaultValidations from "./default-validations";
import { render } from "lit-html";

export default function validate(
	value: string,
	elementRules: FormBuilderValidationRules,
	name: string
) {
	let result = true;
	let message = null;
	let rule!: FormBuilderGenericValidationRule["name"];
	if (elementRules) {
		for (const r of elementRules) {
			if (r.name !== "custom") {
				result = rules[r.name](value, r.params);
				if (!result) {
					rule = r.name;
					message = getValidationMessage(r, { name, value });
					break;
				}
			} else {
				result = r.validate(value, r.params);
				if (!result) {
					rule = r.name;
					message = getValidationMessage(r, { name, value });
					break;
				}
			}
		}
	}

	return {
		result,
		message,
		rule,
		name
	};
}

function processCustomMessage(message: string, params: Record<string, string>) {
	for (const prop in params) {
		message = message.replace(new RegExp("{{" + prop + "}}", "g"), params[prop]);
	}
	return message;
}

function getValidationMessage(
	r: FormBuilderGenericValidationRule,
	{ name, value }: Record<string, string>
) {
	if (r.message) {
		return processCustomMessage(r.message, {
			name,
			value,
			...(r.params as Record<string, string>)
		});
	} else if (defaultMessages[r.name]) {
		return processCustomMessage(defaultMessages[r.name], {
			name,
			value,
			...(r.params as Record<string, string>)
		});
	} else {
		return "Validation failed";
	}
}

export async function validateField(
	field: CanValidateFields,
	element: FFormInputElements | undefined,
	silent = false,
	filter?: (r: FormBuilderGenericValidationRule) => boolean
): FormBuilderValidationPromise {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars

	let rulesToValidate = field.validationRules?.filter(filter ? filter : () => true);
	if (!rulesToValidate) {
		rulesToValidate = [];
	}

	defaultValidations(field.type, rulesToValidate);
	if (element && rulesToValidate.length > 0 && element.getAttribute("data-hidden") !== "true") {
		let fieldName = element.getAttribute("name") ?? "This";
		if (typeof (field.label as FormBuilderLabel)?.title === "string") {
			fieldName = (field.label as FormBuilderLabel)?.title as string;
		}
		const { result, message, rule, name } = validate(
			(element.value as string) ?? "",
			rulesToValidate as FormBuilderValidationRules,
			fieldName
		);

		if (!result && message && element.offsetHeight > 0) {
			if (!silent) {
				updateMessage(element, message, field, "data-qa-error-for");
				element.state = "danger";
			}
		} else {
			const helpSlot = element.querySelector("[slot='help']");
			if (field.helperText) {
				if (typeof field.helperText === "string") {
					updateMessage(element, field.helperText, field, "data-qa-help-for");
				} else if (typeof field.helperText === "object") {
					updateMessage(element, "", field, "data-qa-help-for");
					const helpSlotToUpdate = element.querySelector<HTMLElement>("[slot='help']");

					if (helpSlotToUpdate) render(field.helperText, helpSlotToUpdate);
				}
			} else if (helpSlot) {
				helpSlot.remove();
			}

			if (field.state) {
				element.state = field.state as "primary" | "default" | "success" | "warning" | "danger";
			} else if (!(element instanceof FButton) && !(element instanceof FIconButton)) {
				element.state = "default";
			}
		}
		return { result, message, rule, name, label: field.label };
	}
	return {
		result: true,
		message: "NA",
		rule: "custom",
		name: "NA",
		label: field.label
	};
}

function updateMessage(
	element: HTMLElement,
	message: string,
	field: FormBuilderField,
	qaAttribute: string
) {
	const helpSlot = element.querySelector<HTMLSlotElement>("[slot='help']");
	if (helpSlot) {
		helpSlot.remove();
		element.insertAdjacentHTML(
			"beforeend",
			`<f-div slot="help" ${qaAttribute}=${field.qaId || field.id}>${message}</f-div>`
		);
	} else {
		element.insertAdjacentHTML(
			"beforeend",
			`<f-div slot="help" ${qaAttribute}=${field.qaId || field.id}>${message}</f-div>`
		);
	}
}

export function extractValidationState(allResults: ValidationResults) {
	const errors: ValidationResult[] = [];
	allResults.forEach(rs => {
		if (!Array.isArray(rs) && !rs.result) {
			errors.push(rs);
		} else if (Array.isArray(rs)) {
			errors.push(...extractValidationState(rs));
		}
	});

	return errors;
}
