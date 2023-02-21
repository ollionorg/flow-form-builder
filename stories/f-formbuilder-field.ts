import { FormBuilderField } from "@cldcvr/flow-form-builder/src/components/f-form-builder/mixins/types";

const field: FormBuilderField = {
	type: "object",
	direction: "vertical",
	fieldSeparator: true,
	label: {
		title: "Object level label",
		description: "following fields are used for demo purpose only"
	},
	fields: {
		selectBox: {
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
		textField: {
			type: "text",
			helperText: "This field is a required field",
			suffix: "recommended",
			suffixWhen: value => {
				return value === "vikas";
			},
			validationRules: [
				{
					name: "required"
				}
			]
		},
		eventTestField: {
			type: "text",
			helperText: "This field is a required field",
			validationRules: [
				{
					name: "required"
				}
			],
			showWhen: values => {
				console.log(values, (values as Record<string, string>)?.textField === "vikas");
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
			type: "switchButton",
			validationRules: [
				{
					name: "required"
				}
			]
		},
		radio: {
			type: "radio",
			label: {
				title: "Radios"
			},
			// helperText: "This field is required",
			options: [
				{ id: "1", title: "Orange", iconTooltip: "hello" },
				{
					id: "2",
					title: "Banana",
					iconTooltip: "hello"
				}
			],
			validationRules: [
				{
					name: "required"
				}
			]
		},

		checkboxField: {
			type: "checkbox",
			direction: "horizontal",
			label: {
				title: "Check/Uncheck options",
				description: "this my checkbox"
			},
			// helperText: "This field is required",
			options: [
				{ id: "1", title: "Orange", iconTooltip: "hello" },
				{
					id: "2",
					title: "Banana",
					iconTooltip: "hello"
				}
			],
			validationRules: [
				{
					name: "required"
				}
			]
		},
		textAreaField: {
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
					type: "text",
					validationRules: [{ name: "required" }]
				},
				email: {
					type: "text",
					validationRules: [{ name: "required" }, { name: "email" }]
				}
			}
		},
		nestedArray: {
			type: "array",
			field: {
				type: "text",
				validationRules: [
					{
						name: "required"
					}
				]
			}
		},
		getButton: {
			type: "button",
			label: "get",
			iconLeft: "i-arrow-rotate"
		}
	}
};
export default field;
