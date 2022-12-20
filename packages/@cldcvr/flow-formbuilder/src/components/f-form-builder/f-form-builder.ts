import { html, PropertyValueMap, render, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ref, createRef, Ref } from "lit/directives/ref.js";
import {
  FormBuilderConfig,
  FormBuilderState,
  FormBuilderValues,
  FormBuilderValidationRules,
  FormBuilderField,
} from "./f-form-builder-types";
import eleStyle from "./f-form-builder.scss";
import validate from "./f-form-validator";
import { isEmptyObject } from "./utils";
import { FDiv, FText } from "@cldcvr/flow-core";
import { FRoot } from "@cldcvr/flow-core/src/mixins/components/f-root/f-root";
import fieldRenderer from "./fields";
const errorTemplate = (error: string) => html` <f-text state="danger"
  >${error}
</f-text>`;

@customElement("f-form-builder")
export class FFormBuilder extends FRoot {
  /**
   * css loaded from scss file
   */
  static styles = [unsafeCSS(eleStyle), ...FDiv.styles, ...FText.styles];

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
      ifs: new Map(),
      get isValid() {
        return isEmptyObject(this.errors);
      },
    };
    return this.build();
  }
  /**
   * handle input event of form
   */
  handleFormChange() {
    // setting isChanged to true in state
    this.state.isChanged = true;

    /**
     * validate silently
     */
    this.validateForm(true);
    this.checkAllIfs();
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
      ${this.config.groups.map((gr) => {
        return html`<f-div
          gap="medium"
          padding="small"
          .direction=${gr.direction === "horizontal" ? "row" : "column"}
        >
          ${this.buildFields(gr.fields)}
        </f-div>`;
      })}
      <input type="submit" value="Submit" />
    </form>`;
  }
  onSubmit(event: SubmitEvent) {
    event.stopPropagation();
    event.preventDefault();

    this.validateForm();

    // TODO : emit submit event
  }

  /**
   * check if condition is satisfying for any element
   */
  checkAllIfs() {
    this.state.ifs.forEach((ifFunction, field) => {
      const showField = ifFunction(this.values);
      console.log(showField, this.values);
      if (field.value) {
        if (!showField) {
          field.value.style.display = "none";
        } else {
          field.value.style.display = "";
        }
      }
    });
  }

  /**
   * validate whole form
   * @param silent
   */
  validateForm(silent = false) {
    Object.entries(this.state.refs).forEach(([_name, elements]) => {
      elements.forEach((element) => {
        const inputElement = element.value;

        if (inputElement && this.state.rules[inputElement.name] !== undefined) {
          this.validateField(inputElement, silent);
        }
      });
    });
  }
  /**
   * render field based on field config
   * @param fields
   */
  buildFields(fields: FormBuilderField[]) {
    return html`${fields.map((field, idx) => {
      const fieldRef: Ref<HTMLInputElement> = createRef();
      if (!this.state.refs[field.name]) {
        this.state.refs[field.name] = [];
      }
      const fieldErrorRef: Ref<HTMLElement> = createRef();
      if (!this.state.errorRefs[field.name]) {
        this.state.errorRefs[field.name] = [];
      }
      this.state.refs[field.name].push(fieldRef);
      this.state.errorRefs[field.name].push(fieldErrorRef);
      this.state.rules[field.name] = field.validationRules;
      if (field.if) {
        this.state.ifs.set(fieldRef, field.if);
      }

      /**
       * fieldRenderer is resposnsible to redner field based on type
       */
      return html`${fieldRenderer[field.type](field, idx, fieldRef)}
        <f-div direction="column" ${ref(fieldErrorRef)}></f-div> `;
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
    Object.entries(this.state.refs).forEach(([name, elements]) => {
      let isMultiple = false;
      if (elements.length > 1) {
        isMultiple = true;
      }
      elements.forEach((element, idx) => {
        const inputElement = element.value;
        if (inputElement) {
          inputElement.dataset.isMultiple = "" + isMultiple;
        }
        // console.log(inputElement);
        this.bindValues(inputElement, name, idx, isMultiple);

        this.bindValidation(inputElement);
      });
    });

    this.checkAllIfs();
  }

  /**
   * Add/Display initial values given by user
   * @param inputElement
   * @param name
   * @param index
   * @param isMultiple
   */
  bindValues(
    inputElement: HTMLInputElement | undefined,
    name: string,
    index: number,
    isMultiple: boolean
  ) {
    if (inputElement) {
      inputElement.dataset.multiFieldIndex = "" + index;
      /**
       * if value is array (i.e. multiple fields with same name)
       */
      if (this.values && this.values[name]) {
        if (isMultiple) {
          inputElement.value = (this.values[name] as string[])[index];
        } else {
          inputElement.value = String(this.values[name]);
        }
      }
    }
  }

  /**
   * validation rules listener added on `input` event.
   * @param inputElement
   */
  bindValidation(inputElement: HTMLInputElement | undefined) {
    /**
     * Adding validation listener
     */
    if (inputElement) {
      inputElement.addEventListener("input", () => {
        // updating values in object
        const fieldIndex = Number(inputElement.dataset.multiFieldIndex);
        const isMultiple = inputElement.dataset.isMultiple === "true";

        if (isMultiple) {
          if (!this.values[inputElement.name]) {
            this.values[inputElement.name] = [];
          }

          (this.values[inputElement.name] as string[])[fieldIndex] =
            inputElement.value;
        } else {
          this.values[inputElement.name] = inputElement.value;
        }

        // checking validaiton rules if any
        if (this.state.rules[inputElement.name] !== undefined) {
          this.validateField(inputElement);
        }
      });
    }
  }
  /**
   *
   * @param inputElement ref of field
   * @param silent if true then errors are not rendered, they are added in state only
   */
  validateField(inputElement: HTMLInputElement, silent = false) {
    const fieldIndex = Number(inputElement.dataset.multiFieldIndex);
    const { result, message } = validate(
      inputElement.value,
      this.state.rules[inputElement.name] as FormBuilderValidationRules,
      inputElement.name
    );
    const errorElement =
      this.state.errorRefs[inputElement.name][fieldIndex].value;

    if (!result && message) {
      this.state.errors[inputElement.name] = message;

      if (errorElement && !silent) {
        render(errorTemplate(message), errorElement);
      }
    } else {
      delete this.state.errors[inputElement.name];
      if (errorElement) {
        render("", errorElement);
      }
    }
  }
}
