import { html } from "lit";
import { FormBuilderRadioField } from "../f-form-builder-types";
import { Ref, ref } from "lit/directives/ref.js";
import { ifDefined } from "lit-html/directives/if-defined.js";
export default function (
  name: string,
  _field: FormBuilderRadioField,
  idx: number,
  fieldRef: Ref<HTMLInputElement>,
  fieldErrorRef: Ref<HTMLElement>,
  params?: Record<string, unknown>
) {
  return html`
    <f-div direction="column" .gap=${ifDefined(params?.gap)}>
      <f-radio-group
        name=${name}
        id=${"form-ele" + idx}
        ${ref(fieldRef)}
        .options=${_field.options}
        gap=${ifDefined(params?.group?.gap)}
        .direction=${params?.group?.direction}
        state=${ifDefined(_field.state)}
        helperText=${ifDefined(_field.helperText)}
      ></f-radio-group>
      ${!_field.helperText ? html` <f-div ${ref(fieldErrorRef)}></f-div>` : ""}</f-div
    >
  `;
}
