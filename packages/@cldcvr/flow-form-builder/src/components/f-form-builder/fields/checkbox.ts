import { html } from "lit";
import {
  FFormInputElements,
  FormBuilderCheckboxField,
  FormBuilderField,
  FormBuilderGroup,
} from "../mixins/types";
import { Ref, ref } from "lit/directives/ref.js";
import { ifDefined } from "lit-html/directives/if-defined.js";
export default function (
  name: string,
  _field: FormBuilderField,
  idx: number,
  fieldRef: Ref<FFormInputElements>,
  params?: Record<string, unknown>
) {
  const field = _field as FormBuilderCheckboxField & { valueIdx?: number };
  const group = params?.group as FormBuilderGroup;
  return html`
    <f-checkbox-group
      name=${name}
      id=${"form-ele" + idx}
      ${ref(fieldRef)}
      .options=${field.options}
      gap=${ifDefined(group?.gap)}
      direction=${ifDefined(group?.direction)}
      state=${ifDefined(field.state)}
      helperText=${ifDefined(field.helperText)}
      data-value-idx=${field.valueIdx}
      @click=${ifDefined(field.onClick)}
      @focus=${ifDefined(field.onFocus)}
      @input=${ifDefined(field.onInput)}
      @keypress=${ifDefined(field.onKeyPress)}
      @keydown=${ifDefined(field.onKeyDown)}
      @keyup=${ifDefined(field.onKeyUp)}
      @mouseover=${ifDefined(field.onMouseOver)}
    >
    </f-checkbox-group>
  `;
}
