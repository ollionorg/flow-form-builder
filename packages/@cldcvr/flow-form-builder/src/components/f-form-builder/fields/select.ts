import { html } from "lit";
import { FormBuilderSelectField } from "../f-form-builder-types";
import { Ref, ref } from "lit/directives/ref.js";
import { ifDefined } from "lit-html/directives/if-defined.js";
export default function (
  name: string,
  _field: FormBuilderSelectField,
  idx: number,
  fieldRef: Ref<HTMLInputElement>,
  fieldErrorRef: Ref<HTMLElement>
) {
  return html`
    <f-select
      name=${name}
      ${ref(fieldRef)}
      id=${"form-ele" + idx}
      .placeholder=${_field.placeholder}
      .type=${_field.selection}
      .state=${_field.state ?? "default"}
      ?searchable=${_field.searchable}
      .options=${_field.options}
      ?checkbox=${_field.checkbox}
      ?clear=${_field.clear}
      .width=${_field.width}
      height=${ifDefined(_field.height)}
      ?disabled=${_field.disabled}
      selection-limit=${ifDefined(_field.selectionLimit)}
      ?create-option=${_field.createOption}
      .option-template=${_field.optionTemplate}
      icon-left=${ifDefined(_field.iconLeft)}
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
    </f-select>
  `;
}
