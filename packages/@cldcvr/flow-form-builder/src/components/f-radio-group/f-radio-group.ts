// import { FRoot } from "@cldcvr/flow-core";
import { html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { RadioOption, RadioOptions } from "../../types";
import eleStyle from "./f-radio-group.scss";
import { FDiv, FRoot, FText } from "@cldcvr/flow-core";
import { isEqual } from "lodash";

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
	options: RadioOptions = [];

	/**
	 * @attribute Controls size of all input elements within the form
	 */
	@property({ reflect: true, type: String })
	state?: "primary" | "default" | "success" | "warning" | "danger" = "default";

	/**
	 * @attribute Controls size of all input elements within the form
	 */
	@property({ reflect: true, type: String })
	value?: RadioOption;

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

	handleChange(option: RadioOption) {
		const event = new CustomEvent("input", {
			detail: {
				value: option
			}
		});
		this.value = option;
		this.dispatchEvent(event);
	}

	isChecked(option: RadioOption) {
		return isEqual(option, this.value) ? "selected" : "unselected";
	}

	render() {
		/**
		 * Final html to render
		 */
		return html`
			<f-div .gap=${this.gap} direction="column">
				<f-div padding="none" gap="x-small" direction="column" width="fill-container">
					<f-div
						padding="none"
						gap="small"
						direction="row"
						width="hug-content"
						height="hug-content"
					>
						<f-div padding="none" direction="row" width="hug-content" height="hug-content">
							<slot name="label"></slot>
						</f-div>
						<slot name="icon-toolttip"></slot>
					</f-div>
					<slot name="description"></slot>
				</f-div>
				<div class="f-radio-group" gap=${this.gap} direction=${this.direction}>
					${this.options?.map(
						item => html`
							<f-radio
								.value=${this.isChecked(item)}
								@input=${() => this.handleChange(item)}
								.state=${this.state}
							>
								<f-div slot="label" padding="none" gap="none"
									><f-text weight="regular" size="small">${item.title ?? item.id}</f-text></f-div
								>
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
												state="subtle"
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
					? html`<f-text variant="para" size="small" weight="regular" .state=${this.state}
							>${this?.helperText}</f-text
					  >`
					: html`<slot name="help"></slot>`}
			</f-div>
		`;
	}
}
