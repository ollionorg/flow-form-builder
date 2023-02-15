import { html } from "lit";
import {
  FFormInputElements,
  FormBuilderIconButtonField,
  FormBuilderField,
} from "../mixins/types";
import { Ref, ref } from "lit/directives/ref.js";
import { ifDefined } from "lit-html/directives/if-defined.js";
export default function (
  name: string,
  _field: FormBuilderField,
  idx: number,
  fieldRef: Ref<FFormInputElements>
) {
  const field = _field as FormBuilderIconButtonField & { valueIdx?: number };
  return html`
    <f-icon-button
      name=${name}
      id=${"form-ele" + idx}
      ${ref(fieldRef)}
      .state=${field.state ?? "primary"}
      .icon=${field.icon}
      type="packed"
      .counter=${ifDefined(field.counter)}
      ?disabled=${field.disabled ?? false}
      ?loading=${field.loading ?? false}
      data-value-idx=${field.valueIdx}
      @click=${ifDefined(field.onClick)}
      @focus=${ifDefined(field.onFocus)}
      @input=${ifDefined(field.onInput)}
      @keypress=${ifDefined(field.onKeyPress)}
      @keydown=${ifDefined(field.onKeyDown)}
      @keyup=${ifDefined(field.onKeyUp)}
      @mouseover=${ifDefined(field.onMouseOver)}
      @mouseleave=${ifDefined(field.onMouseLeave)}
    >
    </f-icon-button>
  `;
}
