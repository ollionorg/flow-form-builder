/* eslint-disable @typescript-eslint/no-explicit-any */
import { html, PropertyValueMap, unsafeCSS } from "lit";
import { customElement, property, queryAll } from "lit/decorators.js";
import { FRoot } from "@cldcvr/flow-core/src/mixins/components/f-root/f-root";
import eleStyle from "./f-form-array.scss";
import flowCoreCSS from "@cldcvr/flow-core/dist/style.css?inline";
import {
	CanValidateFields,
	FFormInputElements,
	FormBuilderArrayField,
	FormBuilderValidationPromise,
	FormBuilderValues
} from "../../types";
import fieldRenderer from "../f-form-builder/fields";
import { createRef, Ref } from "lit/directives/ref.js";
import { isEmptyArray } from "../../modules/utils";
import { validateField } from "../../modules/validation/validator";
import { Subject } from "rxjs";
import { propogateProperties } from "../../modules/helpers";
import { FFormObject } from "../f-form-object/f-form-object";
import { FIconButton } from "@cldcvr/flow-core";

export type ArrayValueType = (
	| string
	| string[]
	| number
	| number[]
	| unknown
	| unknown[]
	| undefined
)[];
@customElement("f-form-array")
export class FFormArray extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(flowCoreCSS), unsafeCSS(eleStyle)];

	/**
	 * @attribute comments baout title
	 */
	@property({ type: Object })
	config!: FormBuilderArrayField;

	/**
	 * @attribute value
	 */
	@property({
		type: Object,
		hasChanged(newVal: ArrayValueType, oldVal: ArrayValueType) {
			return JSON.stringify(newVal) !== JSON.stringify(oldVal);
		}
	})
	value!: ArrayValueType;

	@property({ reflect: true, type: String })
	state?: "primary" | "default" | "success" | "warning" | "danger" = "default";

	/**
	 * @attribute Gap is used to define the gap between the elements
	 */
	@property({ reflect: true, type: String })
	gap?: "large" | "medium" | "small" | "x-small" = "medium";

	@queryAll("f-icon-button.f-form-array-action")
	actions?: NodeListOf<FIconButton>;

	fieldRefs: Ref<FFormInputElements>[] = [];

	showWhenSubject!: Subject<FormBuilderValues>;

	get isRequired() {
		return !this.config.allowEmpty;
	}

	render() {
		this.fieldRefs = [];

		if (this.isRequired) {
			let valueCount = 1;

			if (this.value && !isEmptyArray(this.value)) {
				valueCount = this.value.length;
			} else {
				this.value = [null];
			}

			return html`${this.buildFields(valueCount)}`;
		} else {
			let valueCount = 0;

			if (this.value && !isEmptyArray(this.value)) {
				valueCount = this.value.length;
			} else {
				this.value = [];
			}

			return html`${this.buildFields(valueCount)}`;
		}
	}
	getFieldValue(index: number) {
		return this.value ? this.value[index] : undefined;
	}
	buildFields(valueCount: number) {
		const fieldTemplates = [];
		for (let i = 0; i < valueCount; i++) {
			const fieldRef: Ref<FFormInputElements> = createRef();

			this.fieldRefs.push(fieldRef);
			fieldTemplates.push(
				html` <f-div gap="small" align="top-left" overflow="scroll"
					>${fieldRenderer[this.config.field.type](
						``,
						this.config.field,
						fieldRef,
						this.getFieldValue(i)
					)}
					${i === 0 && this.isRequired
						? html` <f-icon-button
								data-qa-plus
								data-qa-plus-for=${this.getAttribute("name")}
								class="f-form-array-action"
								icon="i-plus"
								size="x-small"
								state="neutral"
								@click=${this.addField}
						  />`
						: html` <f-icon-button
								data-qa-minus
								data-qa-minus-for=${this.getAttribute("name")}
								class="f-form-array-action"
								icon="i-minus"
								size="x-small"
								state="neutral"
								@click=${() => {
									this.removeField(i);
								}}
						  />`}
				</f-div>`
			);
		}

		return html` <f-div gap="small" direction="column" width="100%">
			${this.config.label
				? html`<f-div gap="x-small" direction="column" width="fill-container">
						<f-div
							padding="none"
							gap="small"
							direction="row"
							width="hug-content"
							height="hug-content"
							align="middle-center"
						>
							<!--label-->
							<f-div direction="row" width="hug-content" height="hug-content">
								<f-text
									data-qa-label-for=${this.config.qaId || this.config.id}
									variant="para"
									size="small"
									weight="medium"
									>${this.config.label?.title}</f-text
								>
							</f-div>
							<!--info icon-->
							${this.config.label?.iconTooltip
								? html` <f-icon
										source="i-question-filled"
										size="small"
										state="subtle"
										data-qa-info-icon-for=${this.config.qaId || this.config.id}
										.tooltip="${this.config.label?.iconTooltip}"
										clickable
								  ></f-icon>`
								: ""}
							${!this.isRequired
								? html`<f-icon-button
										data-qa-plus
										data-qa-plus-for=${this.getAttribute("name")}
										icon="i-plus"
										size="x-small"
										state="neutral"
										@click=${this.addField}
								  />`
								: ``}
						</f-div>
						<!--field description-->
						${this.config.label?.description
							? html` <f-text variant="para" size="medium" weight="regular"
									>${this.config.label?.description}</f-text
							  >`
							: ""}
				  </f-div>`
				: ``}
			${fieldTemplates.length > 0
				? html`<f-div .gap=${this.gap} direction="column"> ${fieldTemplates} </f-div>`
				: ``}
			${this.config.helperText
				? html`<f-text
						variant="para"
						data-qa-help-for=${this.config.qaId || this.config.id}
						size="small"
						weight="regular"
						.state=${this.config.state}
						>${this.config?.helperText}</f-text
				  >`
				: html`<slot name="help"></slot>`}
		</f-div>`;
	}

	async validate(silent = false) {
		await this.updateComplete;
		const fieldConfig = this.config.field;
		const allValidations: FormBuilderValidationPromise[] = [];
		this.fieldRefs.forEach(async fieldRef => {
			if ((fieldConfig.type === "object" || fieldConfig.type === "array") && fieldRef.value) {
				allValidations.push((fieldRef.value as FFormInputElements).validate(silent));
			} else {
				allValidations.push(
					validateField(
						this.config.field as CanValidateFields,
						fieldRef.value as FFormInputElements,
						silent
					)
				);
			}
		});

		return Promise.all(allValidations);
	}
	applyLabelOffSet(element: HTMLElement) {
		let totalHeight = 0;
		if (this.config.field.type === "object") {
			let innerLabelTotal = (element as FFormObject).getLabelOffSet();
			if (innerLabelTotal > 0) {
				innerLabelTotal += 4;
			}
			totalHeight += innerLabelTotal;
		} else {
			const labelHeight: number =
				(element.querySelector("[slot='label']") as HTMLElement)?.offsetHeight ?? 0;
			const descriptionHeight: number =
				(element.querySelector("[slot='description']") as HTMLElement)?.offsetHeight ?? 0;
			totalHeight = labelHeight + descriptionHeight;
			if (totalHeight > 0) {
				totalHeight += 4;
			}
		}

		if (this.actions) {
			this.actions.forEach(el => {
				el.style.marginTop = `${totalHeight + 8}px`;
				el.style.visibility = "visible";
			});
		}
	}
	/**
	 * updated hook of lit element
	 * @param _changedProperties
	 */
	protected async updated(
		_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
	): Promise<void> {
		super.updated(_changedProperties);

		await this.updateComplete;

		this.fieldRefs.forEach((ref, idx) => {
			if (ref.value) {
				if (idx === 0) {
					this.applyLabelOffSet(ref.value);
				}
				ref.value.showWhenSubject = this.showWhenSubject;
				const fieldValidation = async (event: Event) => {
					event.stopPropagation();

					this.value[idx] = ref.value?.value;

					await validateField(
						this.config.field as CanValidateFields,
						ref.value as FFormInputElements,
						false
					);
					if (event.type !== "blur") {
						this.dispatchInputEvent();
					}
				};

				ref.value.oninput = fieldValidation;
				ref.value.onblur = fieldValidation;

				const fieldConfig = this.config.field;
				if (fieldConfig.showWhen) {
					/**
					 * subsscribe to show when subject, whenever new values are there in formbuilder then show when will execute
					 */
					this.showWhenSubject.subscribe(values => {
						if (fieldConfig.showWhen && ref.value) {
							const showField = fieldConfig.showWhen(values);
							if (!showField) {
								ref.value.dataset.hidden = "true";
							} else {
								ref.value.dataset.hidden = "false";
							}
							this.dispatchShowWhenExeEvent();
						}
					});
					this.dispatchShowWhenEvent();
				}
			}
		});
		propogateProperties(this);
	}

	addField() {
		this.value.push(null);
		this.dispatchInputEvent();
		this.requestUpdate();
	}

	removeField(idx: number) {
		this.value.splice(idx, 1);
		this.dispatchInputEvent();
		this.requestUpdate();
	}
	/**
	 * dispatch showWhen event so that root will publish new form values
	 */
	dispatchShowWhenEvent() {
		const showWhen = new CustomEvent("show-when", {
			detail: true,
			bubbles: true,
			composed: true
		});
		this.dispatchEvent(showWhen);
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
	dispatchShowWhenExeEvent() {
		const showWhen = new CustomEvent("show-when-exe", {
			detail: true,
			bubbles: true,
			composed: true
		});
		this.dispatchEvent(showWhen);
	}
}
