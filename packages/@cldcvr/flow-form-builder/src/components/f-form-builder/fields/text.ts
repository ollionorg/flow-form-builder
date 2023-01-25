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
    <f-input
      name=${name}
      .type=${_field.type}
      ${ref(fieldRef)}
      id=${"form-ele" + idx}
      .placeholder=${_field.placeholder}
      .type=${_field.type}
      icon-left=${ifDefined(_field?.iconLeft)}
      icon-right=${ifDefined(_field?.iconRight)}
      prefix=${ifDefined(_field?.prefix)}
      suffix=${ifDefined(_field?.suffix)}
      state=${ifDefined(_field?.state)}
      max-length=${ifDefined(_field?.maxLength)}
      ?loading=${_field?.loading ?? false}
      ?disabled=${_field?.disabled ?? false}
      ?clear=${_field?.clear ?? true}
      ?read-only=${_field?.readonly ?? false}
    >
      ${_field?.label?.title
        ? html` <f-div slot="label" padding="none" gap="none">${_field?.label?.title}</f-div>`
        : html`<f-div slot="label" padding="none" gap="none">${name}</f-div>`}
      ${_field?.label?.description
        ? html` <f-div slot="description" padding="none" gap="none"
            >${_field?.label?.description}</f-div
          >`
        : ""}
      ${_field?.helperText
        ? html`<f-div slot="help">${_field?.helperText}</f-div>`
        : html` <f-div ${ref(fieldErrorRef)}></f-div>`}
      ${_field?.label?.iconTooltip
        ? html` <f-icon slot="icon-tooltip" source="i-question-filled" size="small"></f-icon> `
        : ""}
    </f-input>
  `;
}
