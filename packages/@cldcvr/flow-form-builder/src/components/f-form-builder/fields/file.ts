import { html } from "lit";
import { FFormInputElements, FormBuilderField, FormBuilderFileField } from "../../../types";
import { Ref, ref } from "lit/directives/ref.js";
import { ifDefined } from "lit-html/directives/if-defined.js";
export default function (
	name: string,
	_field: FormBuilderField,
	fieldRef: Ref<FFormInputElements>,
	value: unknown
) {
	const field = _field as FormBuilderFileField;
	return html`
		<f-file-upload
			name=${name}
			data-qa-id=${field.qaId || field.id}
			${ref(fieldRef)}
			.placeholder=${field.placeholder ?? "Drag and Drop Files or Click here to upload"}
			.value=${value}
			state=${ifDefined(field.state)}
			max-size=${ifDefined(field.maxSize)}
			.type=${field.multiple ? "multiple" : "single"}
			?loading=${field.loading ?? false}
			?disabled=${field.disabled ?? false}
			@click=${ifDefined(field.onClick)}
			@focus=${ifDefined(field.onFocus)}
			@input=${ifDefined(field.onInput)}
			@keypress=${ifDefined(field.onKeyPress)}
			@keydown=${ifDefined(field.onKeyDown)}
			@keyup=${ifDefined(field.onKeyUp)}
			@mouseover=${ifDefined(field.onMouseOver)}
		>
			${field.label?.title
				? html` <f-div
						slot="label"
						padding="none"
						gap="none"
						data-qa-label-for=${field.qaId || field.id}
						>${field.label.title}</f-div
				  >`
				: html`<f-div
						slot="label"
						padding="none"
						gap="none"
						data-qa-label-for=${field.qaId || field.id}
						>${name}</f-div
				  >`}
			${field.label?.description
				? html` <f-div slot="description" padding="none" gap="none"
						>${field.label.description}</f-div
				  >`
				: ""}
			${field.helperText
				? html`<f-div slot="help" data-qa-help-for=${field.qaId || field.id}
						>${field.helperText}</f-div
				  >`
				: ``}
			${field.label?.iconTooltip
				? html`
						<f-icon
							slot="icon-tooltip"
							data-qa-info-icon-for=${field.qaId || field.id}
							source="i-question-filled"
							size="small"
							state="subtle"
							.tooltip="${field.label?.iconTooltip}"
							clickable
						></f-icon>
				  `
				: ""}
		</f-file-upload>
	`;
}
