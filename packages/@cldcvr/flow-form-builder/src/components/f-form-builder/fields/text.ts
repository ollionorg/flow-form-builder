import { html } from "lit";
import {
  FFormInputElements,
  FormBuilderField,
  FormBuilderTextInputField,
} from "../f-form-builder-types";
import { Ref, ref } from "lit/directives/ref.js";
import { ifDefined } from "lit-html/directives/if-defined.js";
export default function (
  name: string,
  _field: FormBuilderField,
  idx: number,
  fieldRef: Ref<FFormInputElements>,
  params?: any
) {
  const field = _field as FormBuilderTextInputField & { valueIdx?: number };
  return html`
    <f-input
      name=${name}
      .type=${field.type}
      ${ref(fieldRef)}
      id=${params.group.name + name + idx}
      .placeholder=${field.placeholder}
      .type=${field.type}
      icon-left=${ifDefined(field?.iconLeft)}
      icon-right=${ifDefined(field?.iconRight)}
      prefix=${ifDefined(field?.prefix)}
      suffix=${ifDefined(field?.suffix)}
      state=${ifDefined(field?.state)}
      max-length=${ifDefined(field?.maxLength)}
      data-value-idx=${field.valueIdx}
      ?loading=${field?.loading ?? false}
      ?disabled=${field?.disabled ?? false}
      ?clear=${field?.clear ?? true}
      ?read-only=${field?.readonly ?? false}
    >
      ${field.label?.title
        ? html` <f-div slot="label" padding="none" gap="none"
            >${field.label.title}</f-div
          >`
        : html`<f-div slot="label" padding="none" gap="none">${name}</f-div>`}
      ${field.label?.description
        ? html` <f-div slot="description" padding="none" gap="none"
            >${field.label.description}</f-div
          >`
        : ""}
      ${field.helperText
        ? html`<f-div slot="help">${field.helperText}</f-div>`
        : ``}
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
    </f-input>
  `;
}
