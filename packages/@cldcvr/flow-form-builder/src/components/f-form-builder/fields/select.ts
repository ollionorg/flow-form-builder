import { html } from "lit";
import {
  FFormInputElements,
  FormBuilderField,
  FormBuilderSelectField,
} from "../f-form-builder-types";
import { Ref, ref } from "lit/directives/ref.js";
import { ifDefined } from "lit-html/directives/if-defined.js";
export default function (
  name: string,
  _field: FormBuilderField,
  idx: number,
  fieldRef: Ref<FFormInputElements>
) {
  const field = _field as FormBuilderSelectField;
  return html`
    <f-select
      name=${name}
      ${ref(fieldRef)}
      id=${"form-ele" + idx}
      .placeholder=${field.placeholder}
      .type=${field.selection}
      .state=${field.state ?? "default"}
      ?searchable=${field.searchable}
      .options=${field.options}
      ?checkbox=${field.checkbox}
      ?clear=${field.clear}
      .width=${field.width}
      height=${ifDefined(field.height)}
      ?disabled=${field.disabled}
      selection-limit=${ifDefined(field.selectionLimit)}
      ?create-option=${field.createOption}
      .option-template=${field.optionTemplate}
      icon-left=${ifDefined(field.iconLeft)}
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
    </f-select>
  `;
}
