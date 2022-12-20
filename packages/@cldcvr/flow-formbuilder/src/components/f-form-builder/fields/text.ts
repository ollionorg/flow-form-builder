import { html } from "lit";
import { FormBuilderField } from "../f-form-builder-types";
import { Ref, ref } from "lit/directives/ref.js";
export default function (
  field: FormBuilderField,
  idx: number,
  fieldRef: Ref<HTMLInputElement>
) {
  return html`<input
    type="text"
    id=${"form-ele" + idx}
    name=${field.name}
    ${ref(fieldRef)}
  />`;
}
