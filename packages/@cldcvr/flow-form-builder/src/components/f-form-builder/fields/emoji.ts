import { html } from "lit";
import { FFormInputElements, FormBuilderField, FormBuilderEmojiField } from "../../../types";
import { Ref, ref } from "lit/directives/ref.js";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
export default function (
	name: string,
	_field: FormBuilderField,
	fieldRef: Ref<FFormInputElements>,
	value: unknown
) {
	const field = _field as FormBuilderEmojiField;
	return html`
		<f-emoji-picker
			id=${ifDefined(field.id)}
			class=${ifDefined(field.className)}
			name=${name}
			${ref(fieldRef)}
			.placeholder=${field.placeholder}
			value=${value}
			.state=${ifDefined(field.state)}
			data-qa-element-id=${field.qaId || field.id}
			?disabled=${field.disabled ?? false}
			.clear=${field.clear ? true : false}
			.recent=${ifDefined(field.recent)}
			.include="${ifDefined(field.include)};"
			.exclude="${ifDefined(field.exclude)};"
			.exclude-emojis=${ifDefined(field.excludeEmojis)}
			.custom=${ifDefined(field.custom)}
			?close-on-select=${field.closeOnSelect ?? true}
			@click=${(e: PointerEvent) => {
				e.stopPropagation();
				if (field.onClick) {
					field.onClick(e);
				}
			}}
			@mouseup=${(e: PointerEvent) => {
				e.stopPropagation();
			}}
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
						>${unsafeHTML(field.helperText)}</f-div
				  >`
				: ``}
			${field.label?.iconTooltip
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
		</f-emoji-picker>
	`;
}
