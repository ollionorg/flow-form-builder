import { html } from "lit";
import {
  FFormInputElements,
  FormBuilderField,
  FormBuilderSwitchField,
} from "../f-form-builder-types";
import { Ref, ref } from "lit/directives/ref.js";
import { ifDefined } from "lit-html/directives/if-defined.js";
export default function (
  name: string,
  _field: FormBuilderField,
  idx: number,
  fieldRef: Ref<FFormInputElements>
) {
  const field = _field as FormBuilderSwitchField & { valueIdx?: number };
  return html`
    <f-switch
      name=${name}
      ${ref(fieldRef)}
      id=${"form-ele" + idx}
      state=${ifDefined(field.state)}
      data-value-idx=${field.valueIdx}
      ?disabled=${field.disabled ?? false}
    >
      ${field?.label?.title
        ? html` <f-div slot="label" padding="none" gap="none"
            >${field.label?.title}</f-div
          >`
        : html`<f-div slot="label" padding="none" gap="none">${name}</f-div>`}
      ${field.helperText
        ? html`<f-div slot="help">${field.helperText}</f-div>`
        : html``}
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
    </f-switch>
  `;
}
