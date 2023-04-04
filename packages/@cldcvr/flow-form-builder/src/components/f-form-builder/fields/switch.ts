import { html } from "lit";
import { FFormInputElements, FormBuilderField, FormBuilderSwitchField } from "../../../types";
import { Ref, ref } from "lit/directives/ref.js";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
export default function (
	name: string,
	_field: FormBuilderField,
	fieldRef: Ref<FFormInputElements>,
	value: unknown
) {
	const field = _field as FormBuilderSwitchField;
	return html`
		<f-switch
			id=${ifDefined(field.id)}
			class=${ifDefined(field.className)}
			name=${name}
			${ref(fieldRef)}
			.value="${value}"
			data-qa-element-id=${field.qaId || field.id}
			state=${ifDefined(field.state)}
			?disabled=${field.disabled ?? false}
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
						>${field.label?.title}</f-div
				  >`
				: html`<f-div
						slot="label"
						padding="none"
						gap="none"
						data-qa-label-for=${field.qaId || field.id}
						>${name}</f-div
				  >`}
			${field.helperText
				? html`<f-div slot="help" data-qa-help-for=${field.qaId || field.id}
						>${unsafeHTML(field.helperText)}</f-div
				  >`
				: html``}
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
			${field.label?.subTitle
				? html`
						<f-text size="small" slot="subtitle" align="right" state="secondary"
							>${field.label?.subTitle}</f-text
						>
				  `
				: ""}
		</f-switch>
	`;
}
