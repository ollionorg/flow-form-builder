import { html } from "lit";
import { FormBuilderTextInputField } from "../f-form-builder-types";
import { Ref, ref } from "lit/directives/ref.js";
import { ifDefined } from "lit-html/directives/if-defined.js";
export default function (
  name: string,
  _field: FormBuilderTextInputField,
  idx: number,
  fieldRef: Ref<HTMLInputElement>,
  fieldErrorRef: Ref<HTMLElement>
) {
  return html`
    <f-switch
      name=${name}
      ${ref(fieldRef)}
      id=${"form-ele" + idx}
      state=${ifDefined(_field?.state)}
      ?disabled=${_field?.disabled ?? false}
    >
      ${_field?.label?.title
        ? html` <f-div slot="label" padding="none" gap="none">${_field?.label?.title}</f-div>`
        : html`<f-div slot="label" padding="none" gap="none">${name}</f-div>`}
      ${_field?.helperText
        ? html`<f-div slot="help">${_field?.helperText}</f-div>`
        : html` <f-div slot="help" ${ref(fieldErrorRef)}></f-div>`}
      ${_field?.label?.iconTooltip
        ? html` <f-icon slot="icon-tooltip" source="i-question-filled" size="small"></f-icon> `
        : ""}
    </f-switch>
  `;
}
