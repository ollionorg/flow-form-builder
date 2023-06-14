import { FSelectOptionObject, FSelectSingleOption } from "@cldcvr/flow-core";
import { FormBuilderField } from "@cldcvr/flow-form-builder/src/types";
import { html } from "lit";
const test = () => alert("test called");
const lucky = () => alert("Lucky function called");

const field: FormBuilderField = {
	type: "object",
	direction: "vertical",
	fieldSeparator: false,
	label: {
		title: "Object level label",
		description: "following fields are used for demo purpose only"
	},
	fields: {
		hiddenField: {
			type: "hidden",
			qaId: "hiddenQA"
		},
		orgDetails: {
			type: "object",
			fields: {
				name: {
					label: {
						title: "Org name",
						subTitle: html`<f-text size="small">
							<a href="#" @click=${lucky}>I'm Feeling Lucky</a>
						</f-text>`
					},
					type: "text",
					validationRules: [
						{
							name: "required",
							message: "{{name}} field is compulsary"
						}
					],
					helperText: "Test",
					autofocus: true,
					state: "success"
				},
				logo: {
					label: { title: "Logo" },
					type: "emoji",
					clear: true
				}
			}
		},
		selectBox: {
			qaId: "selectQa",
			label: {
				title: "Select multiple option to test"
			},
			selection: "multiple",
			options: ["option 1", "option 2", "option 3"],
			type: "select",
			placeholder: "This is a placeholder",
			iconLeft: "i-app",
			disabled: false,
			clear: false,
			validationRules: [
				{
					name: "required"
				}
			],
			helperText: html`<f-text size="small" state="secondary"
				>Testing&nbsp;<a href="#" @click=${test}> link</a>&nbsp;inside text.</f-text
			>`
		},
		mySeparator: {
			type: "separator",
			title: "OR"
		},
		singleSelect: {
			qaId: "singleSelectQa",
			label: {
				title: "Select option from dropdown",
				description: "Here is another description"
			},
			selection: "multiple",
			options: [
				{
					title:
						"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a m"
				},
				{ title: "Second" },
				{ title: "Third", disabled: true }
			],
			type: "select",
			placeholder: "This is a placeholder",
			validationRules: [
				{
					name: "required"
				}
			],
			optionTemplate: function (option: FSelectSingleOption) {
				option = option as FSelectOptionObject;
				return html`<f-div align="middle-left" padding="small" gap="small"> <f-pictogram source="i-plus" size="small"></f-pictogram><f-text ellipsis
				>${option.title}</f-tag></f-div>`;
			}
		},
		textField: {
			qaId: "sampleQAId",
			label: {
				title: "Test for QA field",
				description: "Hello description",
				iconTooltip: "Tooltip QA help"
			},
			type: "text",
			helperText: "This field is a required field",
			suffix: "recommended",
			suffixWhen: (value: string) => {
				return value === "vikas";
			},
			showWhen: values => {
				return (values as Record<string, any>)?.orgDetails?.name === "vikas";
			},
			validationRules: [
				{
					name: "required"
				}
			]
		},
		eventTestField: {
			qaId: "eventTestQa",
			type: "number",
			helperText: "This field is a required field",
			validationRules: [
				{
					name: "required"
				}
			],
			showWhen: values => {
				return (values as Record<string, string>)?.textField === "vikas";
			},
			onClick: (event: PointerEvent) => {
				console.log("onClick callback triggered", event);
			},
			onInput: (event: Event) => {
				console.log("onInput callback triggered", event);
			},
			onFocus: (event: FocusEvent) => {
				console.log("onFocus callback triggered", event);
			},
			onKeyPress: (event: KeyboardEvent) => {
				console.log("onKeyPress callback triggered", event);
			},
			onKeyDown: (event: KeyboardEvent) => {
				console.log("onKeyDown callback triggered", event);
			},
			onKeyUp: (event: KeyboardEvent) => {
				console.log("onKeyUp callback triggered", event);
			},
			onMouseOver: (event: MouseEvent) => {
				console.log("onMouseOver callback triggered", event);
			}
		},

		switchButton: {
			qaId: "switchQA",
			type: "switchButton",
			validationRules: [
				{
					name: "required"
				}
			]
		},
		radio: {
			qaId: "radioQA",
			type: "radio",
			label: {
				title: html`<f-text state="warning" weight="bold">Radios</f-text>`,
				subTitle: "Optional",
				iconTooltip: "Test Radio tooltip"
			},
			helperText: html`<f-text size="small" state="subtle">Checking helper text</f-text>`,
			options: [
				{
					id: "or",
					title: html` <f-div gap="small">
						<f-text size="medium">Terraform Variable</f-text>
						<f-tag size="small" label="TF" state="custom, #924AEE"> </f-tag
					></f-div>`,
					iconTooltip: "hello",
					subTitle: "Fruit"
				},
				{
					id: "banannaId",
					title: html`<f-div gap="small"
						><f-text size="medium">Environment Variable</f-text>
						<f-tag size="small" label="Env" state="custom, #008272"></f-tag
					></f-div>`,
					iconTooltip: "hello",
					description: "Check if you like Banana"
				}
			],
			validationRules: [
				{
					name: "required"
				}
			]
		},

		checkboxField: {
			qaId: "checkboxQA",
			type: "checkbox",
			direction: "horizontal",
			label: {
				title: "Check/Uncheck options",
				subTitle: "this my checkbox"
			},
			helperText: html`<f-text size="small" state="subtle">Checking helper text</f-text>`,
			options: [
				{ id: "or", title: "Orange", iconTooltip: "hello", description: "Orange has Vitamin C" },
				{
					id: "banannaId",
					iconTooltip: "hello",
					subTitle: "Fruit"
				}
			],
			validationRules: [
				{
					name: "required"
				}
			]
		},
		textAreaField: {
			qaId: "textAreaQA",
			label: {
				title: "I am textarea",
				description: "This is my decription",
				iconTooltip:
					"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
			},
			type: "textarea",
			placeholder: "This is a placeholder",
			maxLength: 100,
			disabled: false,
			readonly: false,
			clear: true,
			validationRules: [
				{
					name: "required"
				}
			]
		},
		nestedObject: {
			type: "object",
			fields: {
				username: {
					qaId: "nestedUsernameQA",
					type: "text",
					validationRules: [{ name: "required" }],
					label: {
						title: "Username",
						subTitle: html`<f-checkbox><f-text slot="label">Mask this</f-text></f-checkbox>`
					}
				},
				email: {
					qaId: "emailQA",
					type: "text",
					validationRules: [{ name: "required" }, { name: "email" }]
				}
			}
		},
		nestedArray: {
			type: "array",
			allowEmpty: true,
			label: {
				title: "Optional Array"
			},
			field: {
				qaId: "nestedArrayText",
				type: "text"
			}
		},
		buttons: {
			type: "object",
			direction: "horizontal",
			fields: {
				getButton: {
					qaId: "getButtonQA",
					type: "button",
					label: "get",
					iconLeft: "i-arrow-rotate"
				},
				transparentButton: {
					type: "button",
					label: "add description",
					iconLeft: "i-plus",
					category: "transparent",
					size: "small"
				},
				testButton: {
					type: "object",
					direction: "horizontal",
					fields: {
						innerButton: {
							qaId: "testButtonQA",
							type: "button",
							label: "Custom State",
							variant: "curved",
							category: "outline",
							size: "small",
							iconLeft: "i-crown",
							state: "custom, orange"
						}
					}
				}
			}
		},
		iconButtons: {
			type: "object",
			direction: "horizontal",
			fields: {
				fillIconButton: {
					type: "icon-button",
					icon: "i-plus",
					size: "small"
				},
				outlinedIconButton: {
					type: "icon-button",
					icon: "i-plus",
					category: "outline",
					size: "small"
				},
				packedIconButton: {
					type: "icon-button",
					icon: "i-plus",
					category: "transparent",
					size: "small"
				}
			}
		},
		uploadFiles: {
			qaId: "uploadFilesQA",
			label: {
				title: "Files to upload",
				subTitle: "Select any file from native os file browser"
			},
			type: "file",
			multiple: true
		},
		suggestValues: {
			qaId: "suggestQA",
			type: "suggest",
			label: {
				title: "Click inside field to see suggestions",
				description: "Select suggestion to fill value"
			},
			suggestions: [
				"Suggestion 1",
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut mattis vitae turpis sit amet vehicula. Mauris leo nulla, venenatis vel ullamcorper vel, scelerisque at sem. Donec venenatis nisl in eros consequat, vitae condimentum odio gravida.",
				"Suggestion 3",
				"Mauris efficitur tincidunt viverra. Praesent est velit, tincidunt ut ullamcorper et, commodo sed nibh. Fusce iaculis libero non arcu imperdiet laoreet. Phasellus vitae tortor vestibulum, interdum sem sit amet, semper risus. Pellentesque risus mauris, venenatis ut nunc non, lobortis venenatis nibh."
			]
		}
	}
};
export default field;
