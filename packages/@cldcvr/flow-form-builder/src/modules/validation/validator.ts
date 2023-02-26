import {
	FFormInputElements,
	FormBuilderField,
	FormBuilderGenericValidationRule,
	FormBuilderValidationPromise,
	FormBuilderValidationRules,
	ValidationResult,
	ValidationResults
} from "../../types";

import rules from "./rules";
import defaultMessages from "./default-validation-messages";
import { FButton, FIconButton } from "@cldcvr/flow-core";
import defaultValidations from "./default-validations";

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
	field: FormBuilderField,
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
	if (element) {
		const { result, message, rule, name } = validate(
			(element.value as string) ?? "",
			rulesToValidate as FormBuilderValidationRules,
			element.getAttribute("name") ?? "This"
		);

		if (!result && message && element.offsetHeight > 0) {
			if (!silent) {
				updateMessage(element, message);
				element.state = "danger";
			}
		} else {
			const slotName = element.lastElementChild?.getAttribute("slot");
			if (field.helperText) {
				updateMessage(element, field.helperText);
			} else if (slotName === "help") {
				const child = element.children[element.children.length - 1];
				child.remove();
			}

			if (!(element instanceof FButton) && !(element instanceof FIconButton)) {
				element.state = "default";
			}
		}
		return { result, message, rule, name };
	}
	return {
		result: true,
		message: "Element removed from dom",
		rule: "custom",
		name: "NA"
	};
}

function updateMessage(element: HTMLElement, message: string) {
	if (element.lastElementChild?.getAttribute("slot") === "help") {
		const child = element.children[element.children.length - 1];
		child.remove();
		element.insertAdjacentHTML("beforeend", `<f-div slot="help">${message}</f-div>`);
	} else {
		element.insertAdjacentHTML("beforeend", `<f-div slot="help">${message}</f-div>`);
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
