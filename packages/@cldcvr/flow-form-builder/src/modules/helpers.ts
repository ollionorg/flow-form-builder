import { FFormArray } from "../components/f-form-array/f-form-array";
import { FFormObject } from "../components/f-form-object/f-form-object";
import { FFormBuilder } from "../components/f-form-builder/f-form-builder";

export function propogateProperties(element: FFormArray | FFormObject | FFormBuilder) {
	const inputElements = element.shadowRoot?.querySelectorAll<HTMLElement>(
		"f-input,f-form-object,f-form-array,f-button,f-checkbox-group,f-radio-group,f-select,f-switch,f-text-area"
	);
	inputElements?.forEach(inputElement => {
		inputElement.setAttribute("size", element.getAttribute("size") as string);
		inputElement.setAttribute("variant", element.getAttribute("variant") as string);
		inputElement.setAttribute("category", element.getAttribute("category") as string);
		if (inputElement instanceof FFormArray || inputElement instanceof FFormObject) {
			inputElement.setAttribute("gap", element.getAttribute("gap") as string);
			inputElement.requestUpdate();
		}
	});
}
