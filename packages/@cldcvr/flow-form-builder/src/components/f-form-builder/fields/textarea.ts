import { html } from "lit";
import { FFormInputElements, FormBuilderField, FormBuilderTextAreaField } from "../../../types";
import { Ref, ref } from "lit/directives/ref.js";
import { ifDefined } from "lit-html/directives/if-defined.js";
export default function (
	name: string,
	_field: FormBuilderField,
	fieldRef: Ref<FFormInputElements>,
	value: unknown
) {
	const field = _field as FormBuilderTextAreaField;
	return html`
		<f-text-area
			name=${name}
			${ref(fieldRef)}
			.value=${value}
			.placeholder=${field.placeholder}
			max-length=${ifDefined(field?.maxLength)}
			data-qa-element-id=${field.qaId || field.id}
			?disabled=${field?.disabled ?? false}
			?clear=${field?.clear ?? true}
			?read-only=${field?.readonly ?? false}
			?resizable=${field?.resizable ?? false}
			rows=${ifDefined(field?.rows)}
			@click=${ifDefined(field.onClick)}
			@focus=${ifDefined(field.onFocus)}
			@input=${ifDefined(field.onInput)}
			@keypress=${ifDefined(field.onKeyPress)}
			@keydown=${ifDefined(field.onKeyDown)}
			@keyup=${ifDefined(field.onKeyUp)}
			@mouseover=${ifDefined(field.onMouseOver)}
		>
			${field?.label?.title
				? html` <f-div
						slot="label"
						data-qa-label-for=${field.qaId || field.id}
						padding="none"
						gap="none"
						>${field?.label?.title}</f-div
				  >`
				: html`<f-div
						slot="label"
						data-qa-label-for=${field.qaId || field.id}
						padding="none"
						gap="none"
						>${name}</f-div
				  >`}
			${field?.label?.description
				? html` <f-div slot="description" padding="none" gap="none"
						>${field?.label?.description}</f-div
				  >`
				: ""}
			${field?.helperText
				? html`<f-div slot="help" data-qa-help-for=${field.qaId || field.id}
						>${field?.helperText}</f-div
				  >`
				: html``}
			${field?.label?.iconTooltip
				? html`
						<f-icon
							slot="icon-tooltip"
							source="i-question-filled"
							size="small"
							state="subtle"
							data-qa-info-icon-for=${field.qaId || field.id}
							.tooltip="${field.label?.iconTooltip}"
							clickable
						></f-icon>
				  `
				: ""}
		</f-text-area>
	`;
}
