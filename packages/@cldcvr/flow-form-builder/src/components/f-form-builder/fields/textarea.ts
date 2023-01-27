import { html } from "lit";
import {
  FFormInputElements,
  FormBuilderField,
  FormBuilderTextAreaField,
} from "../f-form-builder-types";
import { Ref, ref } from "lit/directives/ref.js";
import { ifDefined } from "lit-html/directives/if-defined.js";
export default function (
  name: string,
  _field: FormBuilderField,
  idx: number,
  fieldRef: Ref<FFormInputElements>
) {
  const field = _field as FormBuilderTextAreaField;
  return html`
    <f-text-area
      name=${name}
      ${ref(fieldRef)}
      id=${"form-ele" + idx}
      .placeholder=${field.placeholder}
      max-length=${ifDefined(field?.maxLength)}
      ?disabled=${field?.disabled ?? false}
      ?clear=${field?.clear ?? true}
      ?read-only=${field?.readonly ?? false}
      ?resizable=${field?.resizable ?? false}
      rows=${ifDefined(field?.rows)}
    >
      ${field?.label?.title
        ? html` <f-div slot="label" padding="none" gap="none">${field?.label?.title}</f-div>`
        : html`<f-div slot="label" padding="none" gap="none">${name}</f-div>`}
      ${field?.label?.description
        ? html` <f-div slot="description" padding="none" gap="none"
            >${field?.label?.description}</f-div
          >`
        : ""}
      ${field?.helperText ? html`<f-div slot="help">${field?.helperText}</f-div>` : html``}
      ${field?.label?.iconTooltip
        ? html` <f-icon slot="icon-tooltip" source="i-question-filled" size="small"></f-icon> `
        : ""}
    </f-text-area>
  `;
}
