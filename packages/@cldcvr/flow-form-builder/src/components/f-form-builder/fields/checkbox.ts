import { html } from "lit";
import { FormBuilderCheckboxField } from "../f-form-builder-types";
import { Ref, ref } from "lit/directives/ref.js";
import { ifDefined } from "lit-html/directives/if-defined.js";
export default function (
  name: string,
  _field: FormBuilderCheckboxField,
  idx: number,
  fieldRef: Ref<HTMLInputElement>,
  fieldErrorRef: Ref<HTMLElement>,
  params?: Record<string, unknown>
) {
  return html`
    <f-div direction="column" .gap=${ifDefined(params?.gap)}>
      <f-checkbox-group
        name=${name}
        id=${"form-ele" + idx}
        ${ref(fieldRef)}
        .options=${_field.options}
        gap=${ifDefined(params?.gap)}
        .direction=${params?.direction}
        state=${ifDefined(_field.state)}
        helperText=${ifDefined(_field.helperText)}
      ></f-checkbox-group>
      ${!_field.helperText ? html` <f-div ${ref(fieldErrorRef)}></f-div>` : ""}
    </f-div>
  `;
}
