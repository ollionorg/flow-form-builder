import { html, PropertyValueMap, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import {
  FormBuilderField,
  FFormInputElements,
  FormBuilderValue,
} from "./mixins/types";
import eleStyle from "./f-form-builder.scss";

import { FRoot } from "@cldcvr/flow-core/src/mixins/components/f-root/f-root";
import flowCoreCSS from "@cldcvr/flow-core/dist/style.css";
import { Ref, createRef } from "lit/directives/ref.js";
import fieldRenderer, { checkFieldType } from "./fields";

@customElement("f-form-builder")
export class FFormBuilder extends FRoot {
  /**
   * css loaded from scss file
   */
  static styles = [unsafeCSS(flowCoreCSS), unsafeCSS(eleStyle)];

  /**
   * @attribute formbuilder config
   */
  @property({ type: Object, reflect: false })
  field!: FormBuilderField;

  /**
   * @attribute key value pair of values
   */
  @property({
    type: Object,
    reflect: true,
    hasChanged(newVal: FormBuilderValue, oldVal: FormBuilderValue) {
      return JSON.stringify(newVal) !== JSON.stringify(oldVal);
    },
  })
  value?: FormBuilderValue;

  fieldRef!: Ref<FFormInputElements>;

  render() {
    this.fieldRef = createRef();

    return html`
      <f-div direction="column" width="100%" gap="medium">
        ${fieldRenderer[checkFieldType(this.field.type)](
          "root",
          this.field,
          this.fieldRef
        )}
        <slot></slot>
      </f-div>
    `;
  }

  /**
   * updated hook of lit element
   * @param _changedProperties
   */
  protected updated(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    super.updated(_changedProperties);

    setTimeout(async () => {
      await this.updateComplete;
      const ref = this.fieldRef;

      if (ref.value && this.value) {
        ref.value.value = this.value;

        ref.value.requestUpdate();
      }
      if (ref.value) {
        ref.value.oninput = (event: Event) => {
          event.stopPropagation();
          if (!this.value) {
            this.value = {};
          }
          this.value = ref.value?.value;
          this.dispatchInputEvent();
        };
      }
    }, 100);
  }

  dispatchInputEvent() {
    const input = new CustomEvent("input", {
      detail: this.value,
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(input);
  }
}
