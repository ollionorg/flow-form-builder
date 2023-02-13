// import { FRoot } from "@cldcvr/flow-core";
import { html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { RadioOptionsType } from "../f-form-builder/f-form-builder-types";
import eleStyle from "./f-radio-group.scss";
import { FDiv, FRoot, FText } from "@cldcvr/flow-core";

/**
 * @summary Text component includes Headings, titles, body texts and links.
 */
@customElement("f-radio-group")
export class FRadioGroup extends FRoot {
  /**
   * css loaded from scss file
   */
  static styles = [unsafeCSS(eleStyle), ...FDiv.styles, ...FText.styles];

  /**
   * @attribute Controls size of all input elements within the form
   */
  @property({ reflect: true, type: Array })
  options: RadioOptionsType = [];

  /**
   * @attribute Controls size of all input elements within the form
   */
  @property({ reflect: true, type: String })
  state?: "primary" | "default" | "success" | "warning" | "danger" = "default";

  /**
   * @attribute Controls size of all input elements within the form
   */
  @property({ reflect: true, type: String })
  value?: string;

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
    const event = new CustomEvent("input", {
      detail: {
        value: id,
      },
    });
    this.value = id;
    this.dispatchEvent(event);
  }

  isChecked(id: string) {
    return this.value === id ? "selected" : "unselected";
  }

  render() {
    /**
     * Final html to render
     */
    return html`
      <f-div .gap=${this.gap} direction="column">
        <div class="f-radio-group" gap=${this.gap} direction=${this.direction}>
          ${this.options?.map(
            (item) => html`
              <f-radio
                .value=${this.isChecked(item.id)}
                @input=${() => this.handleChange(item.id)}
                .state=${this.state}
              >
                ${item.title
                  ? html` <f-div slot="label" padding="none" gap="none"
                      >${item.title}</f-div
                    >`
                  : html`<f-div slot="label" padding="none" gap="none"
                      >${item.id}</f-div
                    >`}
                ${item.description
                  ? html` <f-div slot="description" padding="none" gap="none"
                      >${item.description}</f-div
                    >`
                  : ""}
                ${item.iconTooltip
                  ? html`
                      <f-icon
                        slot="icon-tooltip"
                        source="i-question-filled"
                        size="small"
                        .tooltip="${item.iconTooltip}"
                        clickable
                      ></f-icon>
                    `
                  : ""}
              </f-radio>
            `
          )}
        </div>
        ${this?.helperText
          ? html`<f-text
              variant="para"
              size="small"
              weight="regular"
              .state=${this.state}
              >${this?.helperText}</f-text
            >`
          : html`<slot name="help"></slot>`}
      </f-div>
    `;
  }
}
