import { FFormArray } from "../components/f-form-array/f-form-array";
import { FFormObject } from "../components/f-form-object/f-form-object";
import { FFormBuilder } from "../components/f-form-builder/f-form-builder";
import { LitElement } from "lit";

export function propogateProperties(element: FFormArray | FFormObject | FFormBuilder) {
	const inputElements = element.shadowRoot?.querySelectorAll<LitElement>(
		"f-input,f-form-object,f-form-array,f-button,f-checkbox-group,f-radio-group,f-select,f-switch,f-text-area,f-file-upload,f-suggest,f-field-separator"
	);
	inputElements?.forEach(async inputElement => {
		await inputElement.updateComplete;
		if (
			inputElement.getAttribute("size") === null ||
			inputElement.getAttribute("size") === "medium" ||
			inputElement.getAttribute("size") === "null"
		) {
			inputElement.setAttribute("size", element.getAttribute("size") as string);
		}
		if (
			inputElement.getAttribute("variant") === null ||
			inputElement.getAttribute("variant") === "curved" ||
			inputElement.getAttribute("variant") === "null"
		) {
			inputElement.setAttribute("variant", element.getAttribute("variant") as string);
		}
		if (
			inputElement.getAttribute("category") === null ||
			inputElement.getAttribute("category") === "fill" ||
			inputElement.getAttribute("category") === "null"
		) {
			inputElement.setAttribute("category", element.getAttribute("category") as string);
		}

		if (inputElement instanceof FFormArray || inputElement instanceof FFormObject) {
			inputElement.setAttribute("gap", element.getAttribute("gap") as string);
			inputElement.requestUpdate();
		}
	});
}
