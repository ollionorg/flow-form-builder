import { html } from "lit";
import { FFormInputElements, FormBuilderButtonField, FormBuilderField } from "../mixins/types";
import { Ref, ref } from "lit/directives/ref.js";
import { ifDefined } from "lit-html/directives/if-defined.js";
export default function (
	name: string,
	_field: FormBuilderField,
	fieldRef: Ref<FFormInputElements>
) {
	const field = _field as FormBuilderButtonField;
	return html`
		<f-button
			name=${name}
			${ref(fieldRef)}
			.state=${field.state ?? "primary"}
			.label=${ifDefined(field.label)}
			.iconLeft=${ifDefined(field.iconLeft)}
			.iconRight=${ifDefined(field.iconRight)}
			.counter=${ifDefined(field.counter)}
			?disabled=${field.disabled ?? false}
			?loading=${field.loading ?? false}
			@click=${ifDefined(field.onClick)}
			@focus=${ifDefined(field.onFocus)}
			@input=${ifDefined(field.onInput)}
			@keypress=${ifDefined(field.onKeyPress)}
			@keydown=${ifDefined(field.onKeyDown)}
			@keyup=${ifDefined(field.onKeyUp)}
			@mouseover=${ifDefined(field.onMouseOver)}
			@mouseleave=${ifDefined(field.onMouseLeave)}
		>
		</f-button>
	`;
}
