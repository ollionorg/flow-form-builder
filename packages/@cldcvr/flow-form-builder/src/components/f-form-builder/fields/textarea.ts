import { html } from "lit";
import { FormBuilderTextAreaField } from "../f-form-builder-types";
import { Ref, ref } from "lit/directives/ref.js";
import { ifDefined } from "lit-html/directives/if-defined.js";
export default function (
  name: string,
  _field: FormBuilderTextAreaField,
  idx: number,
  fieldRef: Ref<HTMLInputElement>,
  fieldErrorRef: Ref<HTMLElement>,
  params?: Record<string, unknown>
) {
  return html`
    <f-text-area
      name=${name}
      .category=${(params?.variant as "fill" | "transparent" | "outline") ?? "fill"}
      ${ref(fieldRef)}
      id=${"form-ele" + idx}
      .placeholder=${_field.placeholder}
      max-length=${ifDefined(_field?.maxLength)}
      ?disabled=${_field?.disabled ?? false}
      ?clear=${_field?.clear ?? true}
      ?read-only=${_field?.readonly ?? false}
      ?resizable=${_field?.resizable ?? false}
      rows=${ifDefined(_field?.rows)}
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
        : html` <f-div slot="help" ${ref(fieldErrorRef)}></f-div>`}
      ${_field?.label?.iconTooltip
        ? html` <f-icon slot="icon-tooltip" source="i-question-filled" size="small"></f-icon> `
        : ""}
    </f-text-area>
  `;
}
