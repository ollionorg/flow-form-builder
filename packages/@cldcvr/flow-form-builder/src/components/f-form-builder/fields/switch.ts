import { html } from "lit";
import {
  FFormInputElements,
  FormBuilderField,
  FormBuilderSwitchField,
} from "../mixins/types";
import { Ref, ref } from "lit/directives/ref.js";
import { ifDefined } from "lit-html/directives/if-defined.js";
export default function (
  name: string,
  _field: FormBuilderField,
  fieldRef: Ref<FFormInputElements>
) {
  const field = _field as FormBuilderSwitchField;
  return html`
    <f-switch
      name=${name}
      ${ref(fieldRef)}
      state=${ifDefined(field.state)}
      ?disabled=${field.disabled ?? false}
      @click=${ifDefined(field.onClick)}
      @focus=${ifDefined(field.onFocus)}
      @input=${ifDefined(field.onInput)}
      @keypress=${ifDefined(field.onKeyPress)}
      @keydown=${ifDefined(field.onKeyDown)}
      @keyup=${ifDefined(field.onKeyUp)}
      @mouseover=${ifDefined(field.onMouseOver)}
    >
      ${field?.label?.title
        ? html` <f-div slot="label" padding="none" gap="none"
            >${field.label?.title}</f-div
          >`
        : html`<f-div slot="label" padding="none" gap="none">${name}</f-div>`}
      ${field.helperText
        ? html`<f-div slot="help">${field.helperText}</f-div>`
        : html``}
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
    </f-switch>
  `;
}
