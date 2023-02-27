import { html } from "lit";
import { FFormInputElements, FormBuilderCheckboxField, FormBuilderField } from "../../../types";
import { Ref, ref } from "lit/directives/ref.js";
import { ifDefined } from "lit-html/directives/if-defined.js";
export default function (
	name: string,
	_field: FormBuilderField,
	fieldRef: Ref<FFormInputElements>,
	value: unknown
) {
	const field = _field as FormBuilderCheckboxField;
	return html`
		<f-checkbox-group
			name=${name}
			${ref(fieldRef)}
			.options=${field.options}
			.value=${value}
			state=${ifDefined(field.state)}
			direction=${ifDefined(field.direction)}
			gap=${ifDefined(field.gap)}
			helperText=${ifDefined(field.helperText)}
			@click=${ifDefined(field.onClick)}
			@focus=${ifDefined(field.onFocus)}
			@input=${ifDefined(field.onInput)}
			@keypress=${ifDefined(field.onKeyPress)}
			@keydown=${ifDefined(field.onKeyDown)}
			@keyup=${ifDefined(field.onKeyUp)}
			@mouseover=${ifDefined(field.onMouseOver)}
		>
			${field.label?.title
				? html` <f-div slot="label" padding="none" gap="none">${field.label.title}</f-div>`
				: html`<f-div slot="label" padding="none" gap="none">${name}</f-div>`}
			${field.label?.description
				? html` <f-div slot="description" padding="none" gap="none"
						>${field.label.description}</f-div
				  >`
				: ""}
			${field.helperText ? html`<f-div slot="help">${field.helperText}</f-div>` : ``}
			${field.label?.iconTooltip
				? html`
						<f-icon
							slot="icon-tooltip"
							source="i-question-filled"
							size="small"
							.tooltip="${field.label?.iconTooltip}"
							clickable
						></f-icon>
				  `
				: ""}
		</f-checkbox-group>
	`;
}
