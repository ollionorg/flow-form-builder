import { html, PropertyValueMap, TemplateResult, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { FRoot } from "@cldcvr/flow-core/src/mixins/components/f-root/f-root";
import eleStyle from "./f-form-object.scss";
import flowCoreCSS from "@cldcvr/flow-core/dist/style.css";

import fieldRenderer, { checkFieldType } from "../f-form-builder/fields";
import { createRef, Ref } from "lit/directives/ref.js";
import {
  FFormInputElements,
  FormBuilderObjectField,
} from "../f-form-builder/mixins/types";
import { FSelectOptions } from "@cldcvr/flow-core";
import { FCheckboxGroupValue } from "../f-checkbox-group/f-checkbox-group";
import { ArrayValueType } from "../f-form-array/f-form-array";

export type ObjectValueType = Record<
  string,
  string | string[] | number | number[] | unknown | unknown[] | undefined
>;
@customElement("f-form-object")
export class FFormObject extends FRoot {
  /**
   * css loaded from scss file
   */
  static styles = [unsafeCSS(flowCoreCSS), unsafeCSS(eleStyle)];

  /**
   * @attribute comments baout title
   */
  @property({ type: Object })
  config!: FormBuilderObjectField;

  /**
   * @attribute value
   */
  @property({ type: Object })
  value!: ObjectValueType;

  @property({ reflect: true, type: String })
  state?: "primary" | "default" | "success" | "warning" | "danger" = "default";

  fieldRefs: Record<string, Ref<FFormInputElements>> = {};

  render() {
    return html`${this.buildFields()}`;
  }

  buildFields() {
    const fieldTemplates: TemplateResult[] = [];
    Object.entries(this.config.fields).forEach(([fieldname, fieldConfig]) => {
      const fieldRef: Ref<FFormInputElements> = createRef();

      this.fieldRefs[fieldname] = fieldRef;
      fieldTemplates.push(
        html`
          ${fieldRenderer[checkFieldType(fieldConfig.type)](
            fieldname,
            fieldConfig,
            fieldRef
          )}
        `
      );
    });

    return html` <f-div gap="small" direction="column" width="100%">
      ${this.config.label
        ? html`<f-div gap="x-small" direction="column" width="fill-container">
            <f-div
              padding="none"
              gap="small"
              direction="row"
              width="hug-content"
              height="hug-content"
            >
              <!--label-->
              <f-div
                padding="none"
                direction="row"
                width="hug-content"
                height="hug-content"
              >
                <f-text variant="heading" size="medium" weight="regular"
                  >${this.config.label?.title}</f-text
                >
              </f-div>
              <!--info icon-->
              ${this.config.label?.iconTooltip
                ? html` <f-icon
                    source="i-question-filled"
                    size="small"
                    state="default"
                    .tooltip="${this.config.label?.iconTooltip}"
                    clickable
                  ></f-icon>`
                : ""}
            </f-div>
            <!--field description-->
            ${this.config.label?.description
              ? html` <f-text variant="para" size="medium" weight="regular"
                  >${this.config.label?.description}</f-text
                >`
              : ""}
          </f-div>`
        : ``}
      <f-form-group
        .direction=${this.config.direction}
        .variant=${this.config.variant}
        .label=${this.config.label}
        gap=${this.config.gap ?? "small"}
        .collapse=${this.config.isCollapsible ? "accordion" : "none"}
      >
        ${fieldTemplates}
      </f-form-group>

      ${this.config.helperText
        ? html`<f-text
            variant="para"
            size="small"
            weight="regular"
            .state=${this.config.state}
            >${this.config?.helperText}</f-text
          >`
        : html`<slot name="help"></slot>`}
    </f-div>`;
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

      Object.entries(this.fieldRefs).forEach(([name, ref]) => {
        if (ref.value && this.value) {
          ref.value.value = this.value[name] as
            | string
            | FSelectOptions
            | FCheckboxGroupValue
            | ArrayValueType
            | undefined;

          ref.value.requestUpdate();
        }
        if (ref.value) {
          ref.value.oninput = (event: Event) => {
            event.stopPropagation();
            if (!this.value) {
              this.value = {};
            }
            this.value[name] = ref.value?.value;
            this.dispatchInputEvent();
          };
        }
      });
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
