import { FormBuilderField } from "@cldcvr/flow-form-builder/src/types";

const field: FormBuilderField = {
	type: "object",
	direction: "vertical",
	fieldSeparator: false,
	label: {
		title: "Object level label",
		description: "following fields are used for demo purpose only"
	},
	fields: {
		orgDetails: {
			type: "object",
			fields: {
				name: {
					label: { title: "Org name" },
					type: "text",
					validationRules: [
						{
							name: "required",
							message: "{{name}} field is compulsary"
						}
					]
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
			clear: true,
			validationRules: [
				{
					name: "required"
				}
			]
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
			selection: "single",
			options: ["First", "Second", "Third"],
			type: "select",
			placeholder: "This is a placeholder",
			validationRules: [
				{
					name: "required"
				}
			]
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
				title: "Radios"
			},
			// helperText: "This field is required",
			options: [
				{ id: "or", title: "Orange", iconTooltip: "hello" },
				{
					id: "banannaId",
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
				description: "this my checkbox"
			},
			// helperText: "This field is required",
			options: [
				{ id: "or", title: "Orange", iconTooltip: "hello", description: "Orange has Vitamin C" },
				{
					id: "banannaId",
					iconTooltip: "hello",
					description: "Banana is cheap but rich in fiber"
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
				description: "This is my decription"
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
					validationRules: [{ name: "required" }]
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
		getButton: {
			qaId: "getButtonQA",
			type: "button",
			label: "get",
			iconLeft: "i-arrow-rotate"
		},
		uploadFiles: {
			qaId: "uploadFilesQA",
			label: {
				title: "Files to upload",
				description: "Select any file from native os file browser"
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
