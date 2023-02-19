import { html } from "lit";
import {
  FFormInputElements,
  FormBuilderCheckboxField,
  FormBuilderField,
} from "../mixins/types";
import { Ref, ref } from "lit/directives/ref.js";
import { ifDefined } from "lit-html/directives/if-defined.js";
export default function (
  name: string,
  _field: FormBuilderField,
  fieldRef: Ref<FFormInputElements>
) {
  const field = _field as FormBuilderCheckboxField;
  return html`
    <f-checkbox-group
      name=${name}
      ${ref(fieldRef)}
      .options=${field.options}
      state=${ifDefined(field.state)}
      helperText=${ifDefined(field.helperText)}
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
