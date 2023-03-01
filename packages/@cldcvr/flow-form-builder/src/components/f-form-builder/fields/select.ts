import { html } from "lit";
import { FFormInputElements, FormBuilderField, FormBuilderSelectField } from "../../../types";
import { Ref, ref } from "lit/directives/ref.js";
import { ifDefined } from "lit-html/directives/if-defined.js";
export default function (
	name: string,
	_field: FormBuilderField,
	fieldRef: Ref<FFormInputElements>,
	value: unknown
) {
	const field = _field as FormBuilderSelectField;
	return html`
		<f-select
			name=${name}
			${ref(fieldRef)}
			.placeholder=${field.placeholder}
			.type=${field.selection}
			.state=${field.state ?? "default"}
			?searchable=${field.searchable}
			.options=${field.options}
			.value=${value}
			?checkbox=${field.checkbox}
			?clear=${field.clear}
			.width=${field.width}
			data-qa-id=${field.qaId || field.id}
			height=${ifDefined(field.height)}
			?disabled=${field.disabled}
			selection-limit=${ifDefined(field.selectionLimit)}
			?create-option=${field.createOption}
			.option-template=${field.optionTemplate}
			icon-left=${ifDefined(field.iconLeft)}
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
						padding="none"
						gap="none"
						data-qa-label-for=${field.qaId || field.id}
						>${field?.label?.title}</f-div
				  >`
				: html`<f-div
						slot="label"
						padding="none"
						gap="none"
						data-qa-label-for=${field.qaId || field.id}
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
							data-qa-info-icon-for=${field.qaId || field.id}
							.tooltip="${field.label?.iconTooltip}"
							size="small"
							clickable
						></f-icon>
				  `
				: ""}
		</f-select>
	`;
}
