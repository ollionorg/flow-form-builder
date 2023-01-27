// import { FRoot } from "@cldcvr/flow-core";
import { html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { CheckboxOptionsType } from "../f-form-builder/f-form-builder-types";
import eleStyle from "./f-checkbox-group.scss";
import { FDiv, FRoot, FText } from "@cldcvr/flow-core";

export type FCheckboxGroupValue = string[];

/**
 * @summary Text component includes Headings, titles, body texts and links.
 */
@customElement("f-checkbox-group")
export class FCheckboxGroup extends FRoot {
  /**
   * css loaded from scss file
   */
  static styles = [unsafeCSS(eleStyle), ...FDiv.styles, FText.styles];

  /**
   * @attribute Controls size of all input elements within the form
   */
  @property({ reflect: true, type: Array })
  options: CheckboxOptionsType = [];

  /**
   * @attribute Controls size of all input elements within the form
   */
  @property({ reflect: true, type: String })
  state?: "primary" | "default" | "success" | "warning" | "danger" = "default";

  /**
   * @attribute Controls size of all input elements within the form
   */
  @property({ reflect: true, type: Array })
  value?: FCheckboxGroupValue = [];

  /**
   * @attribute Decides the direction of the input elements within the group.
   */
  @property({ type: String, reflect: true })
  direction?: "vertical" | "horizontal" = "vertical";

  /**
   * @attribute decides the gap between elements of a group
   */
  @property({ type: String, reflect: true })
  gap?: "large" | "medium" | "small" | "x-small" = "small";

  @property({ type: String, reflect: true })
  helperText?: string;

  handleChange(id: string) {
    let tempValues = this.value && this.value?.length > 0 ? [...this.value] : [];
    if (this.isChecked(id) === "unchecked") {
      tempValues.push(id);
    } else {
      tempValues = tempValues.filter((item) => item !== id);
    }

    const event = new CustomEvent("input", {
      detail: {
        value: tempValues,
      },
    });
    this.value = tempValues;
    this.dispatchEvent(event);
  }

  isChecked(id: String) {
    return this.value?.some((item) => item === id) ? "checked" : "unchecked";
  }

  render() {
    console.log(this.value);
    /**
     * Final html to render
     */
    return html`
      <f-div .gap=${this.gap} direction="column">
        <div class="f-checkbox-group" gap=${this.gap} direction=${this.direction}>
          ${this.options?.map(
            (item) => html`
              <f-checkbox
                .value=${this.isChecked(item.id)}
                @input=${() => this.handleChange(item.id)}
                .state=${this.state}
              >
                ${item?.title
                  ? html` <f-div slot="label" padding="none" gap="none">${item?.title}</f-div>`
                  : html`<f-div slot="label" padding="none" gap="none">${name}</f-div>`}
                ${item?.description
                  ? html` <f-div slot="description" padding="none" gap="none"
                      >${item?.description}</f-div
                    >`
                  : ""}
                ${item?.iconTooltip
                  ? html`
                      <f-icon slot="icon-tooltip" source="i-question-filled" size="small"></f-icon>
                    `
                  : ""}
              </f-checkbox>
            `
          )}
        </div>
        ${this?.helperText
          ? html`<f-text variant="para" size="small" weight="regular" .state=${this.state}
              >${this?.helperText}</f-text
            >`
          : html`<slot name="help"></slot>`}
      </f-div>
    `;
  }
}
