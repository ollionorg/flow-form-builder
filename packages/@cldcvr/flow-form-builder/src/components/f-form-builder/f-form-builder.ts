import { html, PropertyValueMap, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import {
	FormBuilderField,
	FFormInputElements,
	FormBuilderValue,
	FormBuilderValidationPromise,
	ValidationResults,
	FormBuilderState
} from "./mixins/types";
import eleStyle from "./f-form-builder.scss";

import { FRoot } from "@cldcvr/flow-core/src/mixins/components/f-root/f-root";
import flowCoreCSS from "@cldcvr/flow-core/dist/style.css";
import { Ref, createRef, ref } from "lit/directives/ref.js";
import fieldRenderer, { checkFieldType } from "./fields";
import { extractValidationState, validateField } from "./mixins/validator";
import { FForm } from "@cldcvr/flow-core";
import { Subject } from "rxjs";

@customElement("f-form-builder")
export class FFormBuilder extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(flowCoreCSS), unsafeCSS(eleStyle)];

	/**
	 * @attribute formbuilder name
	 */
	@property({ type: String, reflect: true })
	name!: string;

	/**
	 * @attribute formbuilder config
	 */
	@property({ type: Object, reflect: false })
	field!: FormBuilderField;

	/**
	 * @attribute key value pair of values
	 */
	@property({
		type: Object,
		hasChanged(newVal: FormBuilderValue, oldVal: FormBuilderValue) {
			return JSON.stringify(newVal) !== JSON.stringify(oldVal);
		}
	})
	value?: FormBuilderValue;

	/**
	 * @attribute Controls size of all input elements within the form
	 */
	@property({ reflect: true, type: String })
	size?: "medium" | "small" = "medium";

	/**
	 * @attribute Variants are various visual representations of all elements inside form.
	 */
	@property({ reflect: true, type: String })
	variant?: "curved" | "round" | "block" = "curved";

	/**
	 * @attribute Categories are various visual representations of all elements inside form.
	 */
	@property({ reflect: true, type: String })
	category?: "fill" | "outline" | "transparent" = "fill";

	/**
	 * @attribute Gap is used to define the gap between the elements
	 */
	@property({ reflect: true, type: String })
	gap?: "large" | "medium" | "small" | "x-small" = "medium";

	/**
	 * @attribute group separator
	 */
	@property({ reflect: true, type: Boolean })
	separator?: boolean = false;

	fieldRef!: Ref<FFormInputElements>;
	formRef!: Ref<FForm>;

	state: FormBuilderState = {
		get isValid() {
			return this.errors?.length === 0;
		},
		isChanged: false
	};

	showWhenSubject!: Subject<FormBuilderValue>;

	render() {
		this.fieldRef = createRef();

		return html`
			<f-form
				name="sampleForm"
				@submit=${this.onSubmit}
				@showWhen=${this.onShowWhen}
				${ref(this.formRef)}
				size=${this.size}
				category=${this.category}
				variant=${this.variant}
				?separator=${this.separator}
				gap=${this.gap}
			>
				${fieldRenderer[checkFieldType(this.field.type)](this.name, this.field, this.fieldRef)}
				<slot @click=${this.checkSubmit}></slot>
			</f-form>
		`;
	}

	checkSubmit(event: MouseEvent) {
		if ((event.target as HTMLElement).getAttribute("type") === "submit") {
			this.submit();
		}
	}

	onSubmit(event: SubmitEvent) {
		event.stopPropagation();
		event.preventDefault();
		this.submit();
	}

	submit(this: FFormBuilder) {
		this.validateForm().then(all => {
			this.updateValidaitonState(all);
			if (this.state.errors?.length === 0) {
				const event = new CustomEvent("submit", {
					detail: this.value,
					bubbles: true,
					composed: true
				});
				this.dispatchEvent(event);
			}
		});
	}

	updateValidaitonState(all: ValidationResults) {
		this.state.errors = extractValidationState(all);
		this.dispatchStateChangeEvent();
	}

	/**
	 * updated hook of lit element
	 * @param _changedProperties
	 */
	protected updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		super.updated(_changedProperties);
		setTimeout(async () => {
			await this.updateComplete;

			this.showWhenSubject = new Subject<FormBuilderValue>();
			const ref = this.fieldRef;

			if (ref.value && this.value) {
				ref.value.value = this.value;

				ref.value.requestUpdate();
			}
			if (ref.value) {
				ref.value.showWhenSubject = this.showWhenSubject;
				ref.value.oninput = async (event: Event) => {
					event.stopPropagation();
					if (!this.value) {
						this.value = {};
					}
					this.value = ref.value?.value;
					this.state.isChanged = true;
					validateField(this.field, ref.value as FFormInputElements, false);
					await this.validateForm(true).then(all => {
						this.updateValidaitonState(all);
					});
					this.dispatchInputEvent();
				};

				if (this.field.showWhen) {
					/**
					 * subsscribe to show when subject, whenever new values are there in formbuilder then show when will execute
					 */
					this.showWhenSubject.subscribe(values => {
						if (this.field.showWhen && ref.value) {
							const showField = this.field.showWhen(values);
							if (!showField) {
								ref.value.dataset.hidden = "true";
							} else {
								ref.value.dataset.hidden = "false";
							}
						}
					});

					this.dispatchShowWhenEvent();
				}
			}
			/**
			 * silent validation and store in state
			 */
			await this.validateForm(true).then(all => {
				this.updateValidaitonState(all);
			});
		}, 100);
	}

	onShowWhen() {
		this.showWhenSubject.next(this.value ?? {});
	}

	async validateForm(silent = false) {
		const allValidations: FormBuilderValidationPromise[] = [];
		if ((this.field.type === "object" || this.field.type === "array") && this.fieldRef.value) {
			allValidations.push(this.fieldRef.value.validate(silent));
		} else {
			allValidations.push(
				validateField(this.field, this.fieldRef.value as FFormInputElements, silent)
			);
		}

		return Promise.all(allValidations);
	}

	/**
	 * dispatching form-builder input event
	 */
	dispatchInputEvent() {
		this.showWhenSubject.next(this.value ?? {});
		const input = new CustomEvent("input", {
			detail: this.value,
			bubbles: true,
			composed: true
		});
		this.dispatchEvent(input);
	}
	dispatchStateChangeEvent() {
		const stateChange = new CustomEvent("stateChange", {
			detail: this.state,
			bubbles: true,
			composed: true
		});
		this.dispatchEvent(stateChange);
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

	disconnectedCallback(): void {
		try {
			super.disconnectedCallback();
		} catch (e) {
			/**
			 * Nothing to worry!
			 * catching weird lit error while disconnected hook in storybook stories
			 */
		}
	}
}
