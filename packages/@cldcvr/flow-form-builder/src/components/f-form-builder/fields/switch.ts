import { html } from "lit";
import { FFormInputElements, FormBuilderField } from "../f-form-builder-types";
import { Ref, ref } from "lit/directives/ref.js";
import { ifDefined } from "lit-html/directives/if-defined.js";
export default function (
  name: string,
  _field: FormBuilderField,
  idx: number,
  fieldRef: Ref<FFormInputElements>
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
      ${_field?.helperText ? html`<f-div slot="help">${_field?.helperText}</f-div>` : html``}
      ${_field?.label?.iconTooltip
        ? html`
            <f-icon slot="icon-tooltip" source="i-question-filled" size="small" clickable></f-icon>
          `
        : ""}
    </f-switch>
  `;
}
