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
  FormBuilderGroup,
  FFormInputElements,
} from "./f-form-builder-types";
import eleStyle from "./f-form-builder.scss";
import validate from "./f-form-validator";
import { isEmptyObject } from "./utils";
import { FRoot } from "@cldcvr/flow-core/src/mixins/components/f-root/f-root";
import flowCoreCSS from "@cldcvr/flow-core/dist/style.css";
import fieldRenderer from "./fields";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { FInput } from "@cldcvr/flow-core";
// const errorTemplate = (error: string) =>
//   html` <f-text state="danger" variant="para" size="small" weight="regular">${error} </f-text>`;

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
      helperTexts: {},
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
    return html`<f-form
      name="sampleForm"
      @submit=${this.onSubmit}
      @input=${this.handleFormChange}
      ${ref(this.formRef)}
      size=${ifDefined(this.config.fieldSize)}
      category=${ifDefined(this.config.category)}
      variant=${ifDefined(this.config.variant)}
      ?separator=${this.config.groupSeparator}
      gap=${ifDefined(this.config.gap)}
    >
      <f-div padding="none" gap="x-small" direction="column" width="fill-container">
        <f-div padding="none" gap="small" direction="row" width="hug-content" height="hug-content">
          <f-div padding="none" direction="row" width="hug-content" height="hug-content">
            <f-text variant="heading" size="medium" weight="regular"
              >${this.config?.label?.title}</f-text
            >
          </f-div>
          ${this.config?.label?.iconTooltip
            ? html` <f-icon
                source="i-question-filled"
                size="small"
                state="default"
                clickable
              ></f-icon>`
            : ""}
        </f-div>
        ${this.config?.label?.description
          ? html` <f-text variant="para" size="medium" weight="regular"
              >${this.config?.label?.description}</f-text
            >`
          : ""}
      </f-div>
      ${Object.entries(this.config.groups).map(([name, gr]) => {
        const groupWrapperRef: Ref<HTMLElement> = createRef();
        if (gr.show) {
          this.state.showFunctions.set(groupWrapperRef, gr.show);
        }
        return html`
          <f-form-group
            .direction=${gr.direction}
            .label=${gr.label}
            gap=${ifDefined(gr.gap)}
            .collapse=${gr.isCollapsible ? "accordion" : "none"}
            ${ref(groupWrapperRef)}
          >
            ${this.buildFields(name, gr.fields, gr)}
          </f-form-group>
        `;
      })}
      <slot></slot>
    </f-form>`;
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
   * validate whole form
   * @param type
   */
  checkFieldType(type: string) {
    if (
      type === "text" ||
      type === "tel" ||
      type === "number" ||
      type === "email" ||
      type === "url" ||
      type === "password"
    ) {
      return "text";
    } else {
      return type;
    }
  }
  /**
   * render field based on field config
   * @param fields
   */
  buildFields(
    groupname: string,
    fields: Record<string, FormBuilderField>,
    group: FormBuilderGroup
  ) {
    return html`${Object.entries(fields).map(([name, field], idx) => {
      const fieldRef: Ref<FFormInputElements> = createRef();

      const fieldErrorRef: Ref<HTMLElement> = createRef();
      const relativeName = `${groupname}${GROUP_FIELD_NAME_SEPARATOR}${name}`;
      this.state.refs[relativeName] = fieldRef;
      this.state.errorRefs[relativeName] = fieldErrorRef;
      this.state.rules[relativeName] = field.validationRules;
      if (field?.helperText) {
        this.state.helperTexts[relativeName] = field.helperText;
      }
      const params = { group: { ...group } };
      if (field.show) {
        this.state.showFunctions.set(fieldRef, field.show);
      }
      /**
       * fieldRenderer is resposnsible to redner field based on type
       */
      return html` ${fieldRenderer[this.checkFieldType(field.type)](
        name,
        field,
        idx,
        fieldRef,
        params,
        fieldErrorRef
      )}`;
    })}`;
  }

  /**
   * updated hook of lit element
   * @param _changedProperties
   */
  protected updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    Object.entries(this.state.refs).forEach(([name, element]) => {
      const inputElement = element.value;

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
  bindValues(inputElement: FFormInputElements | undefined, name: string) {
    if (inputElement) {
      const [groupname, fieldname] = name.split(GROUP_FIELD_NAME_SEPARATOR);

      /**
       * if value is array (i.e. multiple fields with same name)
       */
      if (this.values && this.values[groupname] && this.values[groupname][fieldname]) {
        (inputElement.value as unknown) = this.values[groupname][fieldname];
      }
    }
  }

  /**
   * validation rules listener added on `input` event.
   * @param inputElement
   */
  bindValidation(inputElement: FFormInputElements | undefined, name: string) {
    /**
     * Adding validation listener
     */
    if (inputElement) {
      const [groupname, fieldname] = name.split(GROUP_FIELD_NAME_SEPARATOR);
      const validation = () => {
        // updating values in object
        if (this.values[groupname] && this.values[groupname][fieldname]) {
          this.values[groupname][fieldname] = (inputElement as FInput)?.value;
        } else {
          this.values[groupname] = {
            ...this.values[groupname],
            [fieldname]: (inputElement as FInput)?.value,
          };
        }
        // checking validaiton rules if any
        if (this.state.rules[name] !== undefined) {
          this.validateField(name, inputElement);
        }
      };

      inputElement.addEventListener("input", validation);
      inputElement.addEventListener("blur", validation);

      // on special events if user has specified
      if (this.state.rules[name] !== undefined) {
        this.state.rules[name]?.forEach((rule) => {
          if (rule.when && rule.when.length > 0) {
            rule.when.forEach((eventname) => {
              if (this.values[groupname]) {
                this.values[groupname][fieldname] = (inputElement as FInput)?.value;
              } else {
                this.values[groupname] = {
                  ...this.values[groupname],
                  [fieldname]: (inputElement as FInput)?.value,
                };
              }
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
    inputElement: FFormInputElements,
    silent = false,
    filter?: (r: FormBuilderGenericValidationRule) => boolean
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_groupname, fieldname] = name.split(GROUP_FIELD_NAME_SEPARATOR);
    const rulesToValidate = this.state.rules[name]?.filter(filter ? filter : () => true);

    const { result, message } = validate(
      (inputElement as FInput).value ?? "",
      rulesToValidate as FormBuilderValidationRules,
      fieldname
    );
    const errorElement = this.state.errorRefs[name].value;
    if (!result && message && inputElement.offsetHeight > 0) {
      this.state.errors[name] = message;
      if (this.state.helperTexts[name] && !silent) {
        inputElement.state = "danger";
      }
      if (!silent && !this.state.helperTexts[name]) {
        if (inputElement.lastElementChild?.getAttribute("slot") !== "help") {
          inputElement.insertAdjacentHTML("beforeend", `<f-div slot="help">${message}</f-div>`);
        }
        // render(errorTemplate(message), errorElement);
        inputElement.state = "danger";
      }
    } else {
      if (!this.state.helperTexts[name]) {
        delete this.state.errors[name];
        if (inputElement.lastElementChild?.getAttribute("slot") === "help") {
          const child = inputElement.children[inputElement.children.length - 1];
          child.remove();
        }
        if (errorElement) {
          render("", errorElement);
        }
      }
      inputElement.state = "default";
    }
  }
}
