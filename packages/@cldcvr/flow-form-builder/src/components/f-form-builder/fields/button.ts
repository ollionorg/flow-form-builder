import { html } from "lit";
import {
  FFormInputElements,
  FormBuilderButtonField,
  FormBuilderField,
} from "../f-form-builder-types";
import { Ref, ref } from "lit/directives/ref.js";
import { ifDefined } from "lit-html/directives/if-defined.js";
export default function (
  name: string,
  _field: FormBuilderField,
  idx: number,
  fieldRef: Ref<FFormInputElements>
) {
  const field = _field as FormBuilderButtonField & { valueIdx?: number };
  return html`
    <f-button
      name=${name}
      id=${"form-ele" + idx}
      ${ref(fieldRef)}
      .state=${field.state ?? "primary"}
      .label=${ifDefined(field.label)}
      .iconLeft=${ifDefined(field.iconLeft)}
      .iconRight=${ifDefined(field.iconRight)}
      .counter=${ifDefined(field.counter)}
      ?disabled=${field.disabled ?? false}
      ?loading=${field.loading ?? false}
      data-value-idx=${field.valueIdx}
    >
    </f-button>
  `;
}
