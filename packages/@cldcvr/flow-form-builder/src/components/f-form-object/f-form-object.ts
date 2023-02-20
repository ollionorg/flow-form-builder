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
	FormBuilderValidationPromise,
	FormBuilderValue
} from "../f-form-builder/mixins/types";
import { validateField } from "../f-form-builder/mixins/validator";
import { Subject } from "rxjs";

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
	@property({
		type: Object,
		hasChanged(newVal: ObjectValueType, oldVal: ObjectValueType) {
			return JSON.stringify(newVal) !== JSON.stringify(oldVal);
		}
	})
	value!: ObjectValueType;

	@property({ reflect: true, type: String })
	state?: "primary" | "default" | "success" | "warning" | "danger" = "default";

	fieldRefs: Record<string, Ref<FFormInputElements>> = {};

	showWhenSubject!: Subject<FormBuilderValue>;

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
					${fieldRenderer[checkFieldType(fieldConfig.type)](fieldname, fieldConfig, fieldRef)}
					${this.config.fieldSeparator
						? html`<f-divider id="${fieldname}-divider"></f-divider>`
						: ""}
				`
			);
		});

		return html` <f-div gap="small" direction="column" width="100%">
			<f-form-group
				.direction=${this.config.direction}
				.variant=${this.config.variant}
				.label=${this.config.label}
				gap=${this.config.gap ?? "medium"}
				.collapse=${this.config.isCollapsible ? "accordion" : "none"}
			>
				${fieldTemplates}
			</f-form-group>

			${this.config.helperText
				? html`<f-text variant="para" size="small" weight="regular" .state=${this.config.state}
						>${this.config?.helperText}</f-text
				  >`
				: ""}
		</f-div>`;
	}

	async validate(silent = false) {
		const allValidations: FormBuilderValidationPromise[] = [];
		Object.entries(this.config.fields).forEach(async ([fieldname, fieldConfig]) => {
			if (
				(fieldConfig.type === "object" || fieldConfig.type === "array") &&
				this.fieldRefs[fieldname].value
			) {
				allValidations.push(
					(this.fieldRefs[fieldname].value as FFormInputElements).validate(silent)
				);
			} else {
				allValidations.push(
					validateField(fieldConfig, this.fieldRefs[fieldname].value as FFormInputElements, silent)
				);
			}
		});
		return Promise.all(allValidations);
	}

	/**
	 * updated hook of lit element
	 * @param _changedProperties
	 */
	protected updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		super.updated(_changedProperties);
		setTimeout(async () => {
			await this.updateComplete;

			Object.entries(this.fieldRefs).forEach(([name, ref]) => {
				if (ref.value && this.value) {
					ref.value.value = this.value[name] as FormBuilderValue;

					if (this.value[name]) {
						ref.value.requestUpdate();
					}
				}
				if (ref.value) {
					ref.value.showWhenSubject = this.showWhenSubject;
					ref.value.oninput = (event: Event) => {
						event.stopPropagation();
						if (!this.value) {
							this.value = {};
						}
						this.value[name] = ref.value?.value;
						this.dispatchInputEvent();

						validateField(this.config.fields[name], ref.value as FFormInputElements, false);
					};
					const fieldConfig = this.config.fields[name];
					if (fieldConfig.showWhen) {
						this.showWhenSubject.subscribe(values => {
							if (fieldConfig.showWhen && ref.value) {
								const showField = fieldConfig.showWhen(values);
								if (!showField) {
									ref.value.dataset.hidden = "true";
									const divider = this.shadowRoot?.querySelector<HTMLElement>(
										`#${ref.value.getAttribute("name")}-divider`
									);
									if (divider) {
										divider.dataset.hidden = "true";
									}
								} else {
									ref.value.dataset.hidden = "false";
									const divider = this.shadowRoot?.querySelector<HTMLElement>(
										`#${ref.value.getAttribute("name")}-divider`
									);
									if (divider) {
										divider.dataset.hidden = "false";
									}
								}
							}
						});
						this.dispatchShowWhenEvent();
					}
				}
			});
		}, 100);
	}

	dispatchInputEvent() {
		const input = new CustomEvent("input", {
			detail: this.value,
			bubbles: true,
			composed: true
		});
		this.dispatchEvent(input);
	}

	/**
	 * dispatch showWhen event so that root will publish new form values
	 */
	dispatchShowWhenEvent() {
		const showWhen = new CustomEvent("showWhen", {
			detail: true,
			bubbles: true,
			composed: true
		});
		this.dispatchEvent(showWhen);
	}
}
