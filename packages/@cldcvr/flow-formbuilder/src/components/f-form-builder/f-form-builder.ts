import { html, PropertyValueMap, render, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ref, createRef, Ref } from "lit/directives/ref.js";
import {
  FormBuilderConfig,
  FormBuilderState,
  FormBuilderValues,
  FormBuilderValidationRules,
  FormBuilderField,
  FormBuilderGenericValidationRule,
} from "./f-form-builder-types";
import eleStyle from "./f-form-builder.scss";
import validate from "./f-form-validator";
import { isEmptyObject } from "./utils";
import { FRoot } from "@cldcvr/flow-core/src/mixins/components/f-root/f-root";
import flowCoreCSS from "@cldcvr/flow-core/dist/style.css";
import fieldRenderer from "./fields";
const errorTemplate = (error: string) => html` <f-text state="danger"
  >${error}
</f-text>`;

const GROUP_FIELD_NAME_SEPARATOR = ".$";

@customElement("f-form-builder")
export class FFormBuilder extends FRoot {
  /**
   * css loaded from scss file
   */
  static styles = [unsafeCSS(flowCoreCSS), unsafeCSS(eleStyle)];

  /**
   * @attribute formbuilder config
   */
  @property({ type: Object, reflect: false })
  config!: FormBuilderConfig;

  /**
   * @attribute key value pair of values
   */
  @property({ type: Object, reflect: true })
  values!: FormBuilderValues;

  /**
   * Internal state of formbuilder
   */
  state!: FormBuilderState;

  /**
   * form reference
   */
  formRef!: Ref<HTMLFormElement>;

  render() {
    /**
     * Reset state when render called
     */
    this.state = {
      isChanged: false,
      errors: {},
      refs: {},
      rules: {},
      errorRefs: {},
      showFunctions: new Map(),
      get isValid() {
        return isEmptyObject(this.errors);
      },
    };
    return this.build();
  }
  /**
   * handle input event of form
   */
  handleFormChange(event: Event) {
    event.stopPropagation();
    // setting isChanged to true in state
    this.state.isChanged = true;
    this.checkAllShowConditions();
    /**
     * validate silently
     */
    this.validateForm(true);

    this.emitStateChange();

    const input = new CustomEvent("input", {
      detail: { ...this.values },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(input);
  }

  /**
   * build/render form based on config
   */
  build() {
    this.formRef = createRef();
    return html`<form
      name="sampleForm"
      @submit=${this.onSubmit}
      @input=${this.handleFormChange}
      ${ref(this.formRef)}
    >
      <f-div direction="column" gap="small">
        ${Object.entries(this.config.groups).map(([name, gr]) => {
          const groupWrapperRef: Ref<HTMLElement> = createRef();
          if (gr.show) {
            this.state.showFunctions.set(groupWrapperRef, gr.show);
          }
          return html`
            <f-div gap="medium" direction="column" ${ref(groupWrapperRef)}>
              <f-text variant="heading">${name}</f-text>
              <f-div
                gap="medium"
                .direction=${gr.direction === "horizontal" ? "row" : "column"}
              >
                ${this.buildFields(name, gr.fields)}
              </f-div>
              <f-divider></f-divider>
            </f-div>
          `;
        })}
        <br />
        <slot></slot>
      </f-div>
    </form>`;
  }
  onSubmit(event: SubmitEvent) {
    event.stopPropagation();
    event.preventDefault();
    this.submit();
  }

  submit() {
    this.validateForm();
    if (this.state.isValid) {
      const event = new CustomEvent("submit", {
        detail: this.values,
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(event);
    }
  }

  /**
   * check if condition is satisfying for any element
   */
  checkAllShowConditions() {
    this.state.showFunctions.forEach((showFunction, field) => {
      const showField = showFunction(this.values);

      if (field.value) {
        if (!showField) {
          field.value.dataset.hidden = "true";
        } else {
          field.value.dataset.hidden = "false";
        }
      }
    });
  }

  /**
   * validate whole form
   * @param silent
   */
  validateForm(silent = false) {
    Object.entries(this.state.refs).forEach(([name, element]) => {
      const inputElement = element.value;

      if (inputElement && this.state.rules[name] !== undefined) {
        this.validateField(name, inputElement, silent);
      }
    });
  }
  /**
   * render field based on field config
   * @param fields
   */
  buildFields(groupname: string, fields: Record<string, FormBuilderField>) {
    return html`${Object.entries(fields).map(([name, field], idx) => {
      const fieldRef: Ref<HTMLInputElement> = createRef();

      const fieldErrorRef: Ref<HTMLElement> = createRef();
      const relativeName = `${groupname}${GROUP_FIELD_NAME_SEPARATOR}${name}`;
      this.state.refs[relativeName] = fieldRef;
      this.state.errorRefs[relativeName] = fieldErrorRef;
      this.state.rules[relativeName] = field.validationRules;

      const fieldWrapperRef: Ref<HTMLElement> = createRef();
      if (field.show) {
        this.state.showFunctions.set(fieldWrapperRef, field.show);
      }

      /**
       * fieldRenderer is resposnsible to redner field based on type
       */
      return html`<f-div
        ${ref(fieldWrapperRef)}
        direction="column"
        gap="x-small"
      >
        <f-text>${name}</f-text>
        ${fieldRenderer[field.type](name, field, idx, fieldRef)}
        <f-div direction="column" ${ref(fieldErrorRef)}></f-div>
      </f-div>`;
    })}`;
  }

  /**
   * updated hook of lit element
   * @param _changedProperties
   */
  protected updated(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    // console.log(this.state.refs);
    Object.entries(this.state.refs).forEach(([name, element]) => {
      const inputElement = element.value;

      // console.log(inputElement);
      this.bindValues(inputElement, name);

      this.bindValidation(inputElement, name);
    });

    this.checkAllShowConditions();

    this.emitStateChange();
  }
  emitStateChange() {
    const stateChange = new CustomEvent("stateChange", {
      detail: { ...this.state },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(stateChange);
  }

  /**
   * Add/Display initial values given by user
   * @param inputElement
   * @param name
   * @param index
   * @param isMultiple
   */
  bindValues(inputElement: HTMLInputElement | undefined, name: string) {
    if (inputElement) {
      const [groupname, fieldname] = name.split(GROUP_FIELD_NAME_SEPARATOR);

      /**
       * if value is array (i.e. multiple fields with same name)
       */
      if (
        this.values &&
        this.values[groupname] &&
        this.values[groupname][fieldname]
      ) {
        inputElement.value = String(this.values[groupname][fieldname]);
      }
    }
  }

  /**
   * validation rules listener added on `input` event.
   * @param inputElement
   */
  bindValidation(inputElement: HTMLInputElement | undefined, name: string) {
    /**
     * Adding validation listener
     */
    if (inputElement) {
      const [groupname, fieldname] = name.split(GROUP_FIELD_NAME_SEPARATOR);
      const validation = () => {
        // updating values in object

        this.values[groupname][fieldname] = inputElement.value;

        // checking validaiton rules if any
        if (this.state.rules[name] !== undefined) {
          this.validateField(name, inputElement);
        }
      };
      inputElement.addEventListener("input", validation);

      // on special events if user has specified
      if (this.state.rules[name] !== undefined) {
        this.state.rules[name]?.forEach((rule) => {
          if (rule.when && rule.when.length > 0) {
            rule.when.forEach((eventname) => {
              this.values[groupname][fieldname] = inputElement.value;
              inputElement.addEventListener(eventname, () => {
                this.validateField(
                  name,
                  inputElement,
                  false,
                  (r: FormBuilderGenericValidationRule) => {
                    return r.name === rule.name;
                  }
                );
              });
            });
          }
        });
      }
    }
  }
  /**
   *
   * @param inputElement ref of field
   * @param silent if true then errors are not rendered, they are added in state only
   */
  validateField(
    name: string,
    inputElement: HTMLInputElement,
    silent = false,
    filter?: (r: FormBuilderGenericValidationRule) => boolean
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_groupname, fieldname] = name.split(GROUP_FIELD_NAME_SEPARATOR);
    const rulesToValidate = this.state.rules[name]?.filter(
      filter ? filter : () => true
    );

    const { result, message } = validate(
      inputElement.value,
      rulesToValidate as FormBuilderValidationRules,
      fieldname
    );
    const errorElement = this.state.errorRefs[name].value;
    if (!result && message && inputElement.offsetHeight > 0) {
      this.state.errors[name] = message;

      if (errorElement && !silent) {
        render(errorTemplate(message), errorElement);
      }
    } else {
      delete this.state.errors[name];
      if (errorElement) {
        render("", errorElement);
      }
    }
  }
}
