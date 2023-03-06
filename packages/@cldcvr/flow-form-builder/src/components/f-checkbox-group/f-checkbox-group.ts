// import { FRoot } from "@cldcvr/flow-core";
import { html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { CheckboxOption, CheckboxOptions } from "../../types";
import eleStyle from "./f-checkbox-group.scss";
import { FRoot, FDiv, FText } from "@cldcvr/flow-core";
import { isEqual } from "lodash";
export type FCheckboxGroupValue = string[];

@customElement("f-checkbox-group")
export class FCheckboxGroup extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [...FText.styles, unsafeCSS(eleStyle), ...FDiv.styles];

	/**
	 * @attribute Controls size of all input elements within the form
	 */
	@property({ reflect: true, type: Array })
	options: CheckboxOptions = [];

	/**
	 * @attribute Controls size of all input elements within the form
	 */
	@property({ reflect: true, type: String })
	state?: "primary" | "default" | "success" | "warning" | "danger" = "default";

	/**
	 * @attribute Controls size of all input elements within the form
	 */
	@property({
		reflect: true,
		type: Array,
		hasChanged(newVal: FCheckboxGroupValue, oldVal: FCheckboxGroupValue) {
			return JSON.stringify(newVal) !== JSON.stringify(oldVal);
		}
	})
	value?: CheckboxOptions;

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

	handleChange(e: CustomEvent, option: CheckboxOption) {
		e.stopPropagation();
		let tempValues = this.value && this.value?.length > 0 ? [...this.value] : [];
		if (this.isChecked(option) === "unchecked") {
			tempValues.push(option);
		} else {
			tempValues = tempValues.filter(item => !isEqual(item, option));
		}

		const event = new CustomEvent("input", {
			detail: {
				value: tempValues
			}
		});
		this.value = tempValues;
		this.dispatchEvent(event);
	}

	isChecked(option: CheckboxOption) {
		return this.value?.find(item => isEqual(item, option)) ? "checked" : "unchecked";
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
				<div
					class="f-checkbox-group"
					gap=${this.gap}
					direction=${this.direction}
					state=${this.state}
				>
					${this.options?.map(
						item => html`
							<f-checkbox
								.value=${this.isChecked(item)}
								@input=${(event: CustomEvent) => this.handleChange(event, item)}
								.state=${this.state}
							>
								<f-div slot="label" padding="none" gap="none">${item.title ?? item.id}</f-div>
								${item?.description
									? html` <f-div slot="description" padding="none" gap="none"
											>${item?.description}</f-div
									  >`
									: ""}
								${item?.iconTooltip
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
