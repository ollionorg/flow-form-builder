import { Story, Meta } from "@storybook/web-components";
import { html } from "lit-html";
import { FormBuilderField } from "@cldcvr/flow-form-builder/src/types";
import { createRef, Ref, ref } from "lit/directives/ref.js";
import { FButton } from "@cldcvr/flow-core";

export default {
	title: "Features/In PopOver",
	argTypes: {
		field: {
			control: false
		}
	}
} as Meta;

type SampleFormBuilder = {
	field: FormBuilderField;
};

const sampleFormBuilder: SampleFormBuilder = {
	field: {
		type: "object",
		direction: "vertical",
		isCollapsible: false,
		isCollapsed: true,
		label: {
			title: "Object field form",
			description: "showing object field",
			iconTooltip: "Simple object with 2 fields `name` & `emoji` "
		},
		fields: {
			topField: {
				type: "text",
				label: {
					title: "Top field"
				}
			},
			nameAndEmoji: {
				type: "object",
				direction: "horizontal",
				fields: {
					name: {
						type: "text",
						validationRules: [
							{
								name: "required"
							}
						]
					},
					emoji: {
						type: "emoji"
					}
				}
			}
		}
	}
};

const Template: Story<unknown> = (args: any) => {
	const handleKeydown = (event: Event) => {
		event.stopPropagation();
		event.stopImmediatePropagation();
	};
	const fieldRef: Ref<HTMLElement> = createRef();
	const buttonRef: Ref<FButton> = createRef();
	const stateRef = createRef();
	const handleInput = (event: CustomEvent) => {
		if (fieldRef.value) {
			fieldRef.value.innerHTML = JSON.stringify(event.detail, undefined, 8);
		}
	};
	const handleStateChange = (event: CustomEvent) => {
		if (stateRef.value) {
			stateRef.value.textContent = JSON.stringify(event.detail, undefined, 2);
		}
		if (buttonRef.value) {
			buttonRef.value.disabled = !event.detail.isValid;
		}
	};
	return html`
		<f-popover open size="large">
			<f-div padding="large" height="300px" state="default" gap="large">
				<f-form-builder
					.field=${args.field}
					.values=${args.values}
					@keydown=${handleKeydown}
					@input=${handleInput}
					@state-change=${handleStateChange}
				>
					<f-div>
						<f-button ${ref(buttonRef)} label="submit" type="submit"></f-button>
					</f-div>
				</f-form-builder>
				<f-divider></f-divider>
				<f-div direction="column" height="hug-content">
					<f-div direction="column">
						<f-text>Values : </f-text>
						<pre ${ref(fieldRef)}>${JSON.stringify(args.values, undefined, 8)}</pre>
					</f-div>
					<f-divider></f-divider>
					<f-div direction="column">
						<f-text>State : </f-text>
						<pre ${ref(stateRef)}>${JSON.stringify(args.values, undefined, 8)}</pre>
					</f-div>
				</f-div>
			</f-div>
		</f-popover>
	`;
};

export const basic = Template.bind({});

basic.args = {
	field: sampleFormBuilder.field
};
