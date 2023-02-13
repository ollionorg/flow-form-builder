import { html, PropertyValueMap, PropertyValues, render, unsafeCSS } from "lit";
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
  FormBuilderTextInputField,
  FormBuilderArrayGroup,
} from "./f-form-builder-types";
import eleStyle from "./f-form-builder.scss";
import validate from "./f-form-validator";
import { isEmptyObject } from "./utils";
import { FRoot } from "@cldcvr/flow-core/src/mixins/components/f-root/f-root";
import flowCoreCSS from "@cldcvr/flow-core/dist/style.css";
import fieldRenderer from "./fields";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { FInput } from "@cldcvr/flow-core";
import defaultValidations from "./default-validations/index";
import { cloneDeep } from "lodash";

const GROUP_FIELD_NAME_SEPARATOR = ".$";
const CLONNED_GROUP_NAME_SEPARATOR = "_$";
type InternalFormBuilderGroup = FormBuilderGroup & {
  name: string;
  fields: Record<string, FormBuilderField & { valueIdx?: number }>;
};
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
  @property({
    type: Object,
    reflect: true,
    hasChanged(newVal: FormBuilderValues, oldVal: FormBuilderValues) {
      return JSON.stringify(newVal) !== JSON.stringify(oldVal);
    },
  })
  values!: FormBuilderValues;

  /**
   * Internal state of formbuilder
   */
  state!: FormBuilderState;

  /**
   * form reference
   */
  formRef!: Ref<HTMLFormElement>;

  private groups: InternalFormBuilderGroup[] = [];

  willUpdate(changedProperties: PropertyValues<this>) {
    if (changedProperties.has("config") || changedProperties.has("values")) {
      this.groups = [];

      Object.entries(this.config.groups).forEach(
        ([groupName, groupConfig], idx) => {
          this.groups[idx] = { name: groupName, ...groupConfig };
          Object.entries(this.groups[idx].fields).forEach(
            ([_fieldName, fieldConfig]) => {
              fieldConfig.valueIdx = 0;
            }
          );
        }
      );

      Object.entries(this.values).forEach(([groupName, fieldValues]) => {
        if (this.config.groups[groupName].type === "array") {
          for (let d = 1; d < (fieldValues as unknown[]).length; d++) {
            this.duplicateGroup(groupName, d);
          }
        }
      });
    }
    super.willUpdate(changedProperties);
  }

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
      suffixFunctions: new Map(),
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
    // this.checkAllShowConditions();
    this.checkSuffixConditions();
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
      <!--label,description and info icon-->
      <f-div
        padding="none"
        gap="x-small"
        direction="column"
        width="fill-container"
      >
        <f-div
          padding="none"
          gap="small"
          direction="row"
          width="hug-content"
          height="hug-content"
        >
          <!--label-->
          <f-div
            padding="none"
            direction="row"
            width="hug-content"
            height="hug-content"
          >
            <f-text variant="heading" size="medium" weight="regular"
              >${this.config.label?.title}</f-text
            >
          </f-div>
          <!--info icon-->
          ${this.config.label?.iconTooltip
            ? html` <f-icon
                source="i-question-filled"
                size="small"
                state="default"
                .tooltip="${this.config.label?.iconTooltip}"
                clickable
              ></f-icon>`
            : ""}
        </f-div>
        <!--field description-->
        ${this.config.label?.description
          ? html` <f-text variant="para" size="medium" weight="regular"
              >${this.config.label?.description}</f-text
            >`
          : ""}
      </f-div>
      ${this.groups.map((gr) => {
        const name = gr.name;
        const groupWrapperRef: Ref<HTMLElement> = createRef();
        // if (gr.showWhen) {
        //   this.state.showFunctions.set(groupWrapperRef, gr.showWhen);
        // }

        return html`
          <f-form-group
            id=${gr.name}
            .direction=${gr.direction}
            .variant=${gr.variant}
            .label=${gr.label}
            gap=${gr.gap ?? "small"}
            ?can-duplicate=${(gr as FormBuilderArrayGroup).canDuplicate ??
            false}
            @duplicate-group=${() => this.handleGroupDuplicate(gr)}
            .collapse=${gr.isCollapsible ? "accordion" : "none"}
            ${ref(groupWrapperRef)}
          >
            ${this.buildFields(name, gr.fields, gr)}
          </f-form-group>
        `;
      })}
      <f-form-group>
        <slot @click=${this.checkSubmit}></slot>
      </f-form-group>
    </f-form>`;
  }
  handleGroupDuplicate(group: InternalFormBuilderGroup) {
    const avialableGrps = this.groups.filter(
      (gr) =>
        gr.name.startsWith(group.name + CLONNED_GROUP_NAME_SEPARATOR) ||
        gr.name === group.name
    );
    this.duplicateGroup(group.name, avialableGrps.length);
  }
  duplicateGroup(groupName: string, d: number) {
    const clonnedGroupName = `${groupName}${CLONNED_GROUP_NAME_SEPARATOR}${d}`;

    const grIdx = this.groups.findIndex((gr) => gr.name === groupName);
    const clonnedGroupIdx = grIdx + d;

    const clonnedGroup = {
      name: clonnedGroupName,
      ...cloneDeep(this.config.groups[groupName]),
    };

    clonnedGroup.label = undefined;
    this.groups.splice(clonnedGroupIdx, 0, clonnedGroup);

    Object.entries(this.groups[clonnedGroupIdx].fields).forEach(
      ([_fieldName, fieldConfig]) => {
        fieldConfig.valueIdx = d;
      }
    );

    this.requestUpdate();
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
   * check condition to display suffix or not
   */
  checkSuffixConditions() {
    this.state.suffixFunctions?.forEach((suffixObject, field) => {
      const suffixDefined = suffixObject.suffix;
      const suffixFunction = suffixObject?.suffixFunction;
      if (suffixDefined && suffixFunction) {
        const suffixField = suffixFunction(
          (field.value as FInput)?.value ?? ""
        );
        if (field.value) {
          if (suffixField) {
            field.value.setAttribute("suffix", suffixDefined);
          } else {
            field.value.setAttribute("suffix", "");
          }
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

      if (
        inputElement &&
        this.state.rules[name] !== undefined &&
        this.state.rules[name]?.length
      ) {
        this.validateField(name, inputElement, silent);
      }
    });
  }
  /**
   * check field type and return genric
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
      const validations = field.validationRules
        ? [...field.validationRules]
        : [];
      defaultValidations(field.type, validations);
      this.state.rules[relativeName] = validations;

      if (field.helperText) {
        this.state.helperTexts[relativeName] = field.helperText;
      }
      const params = { group: { ...group } };
      if (field.showWhen) {
        this.state.showFunctions.set(fieldRef, field.showWhen);
      }
      /**
       * check suffix for inputs
       */
      if (
        (field as FormBuilderTextInputField).suffixWhen &&
        this.checkFieldType(field.type) === "text" &&
        (field as FormBuilderTextInputField)?.suffix
      ) {
        this.state.suffixFunctions?.set(fieldRef, {
          suffixFunction: (field as FormBuilderTextInputField).suffixWhen,
          suffix: (field as FormBuilderTextInputField)?.suffix,
        });
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
  protected updated(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    super.updated(_changedProperties);
    Object.entries(this.state.refs).forEach(([name, element]) => {
      const inputElement = element.value as FFormInputElements;

      this.bindValues(inputElement, name);

      this.bindValidation(inputElement, name);
    });

    //this.checkAllShowConditions();
    this.checkSuffixConditions();
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
      const [preGroupname, fieldname] = name.split(GROUP_FIELD_NAME_SEPARATOR);

      const [groupname] = preGroupname.split(CLONNED_GROUP_NAME_SEPARATOR);

      const groupConfig = this.config.groups[groupname];
      if (
        groupConfig.type === "array" &&
        this.values &&
        this.values[groupname]
      ) {
        if (inputElement.dataset["valueIdx"]) {
          const groupValues = (
            this.values[groupname] as Record<string, unknown>[]
          )[+inputElement.dataset["valueIdx"]];
          if (groupValues) {
            (inputElement.value as unknown) = groupValues[fieldname];
          }
        }
      } else if (
        this.values &&
        this.values[groupname] &&
        (this.values[groupname] as Record<string, unknown>)[fieldname]
      ) {
        (inputElement.value as unknown) = (
          this.values[groupname] as Record<string, unknown>
        )[fieldname];
      }
    }
  }

  /**
   * validation rules listener added on `input` event.
   * @param inputElement
   */
  bindValidation(inputElement: FFormInputElements, name: string) {
    /**
     * Adding validation listener
     */
    if (inputElement) {
      const [preGroupname, fieldname] = name.split(GROUP_FIELD_NAME_SEPARATOR);
      const [groupname] = preGroupname.split(CLONNED_GROUP_NAME_SEPARATOR);
      const groupConfig = this.config.groups[groupname];

      const bindValues = () => {
        if (groupConfig.type === "array") {
          const groupValues = this.values[groupname] as Record<
            string,
            unknown
          >[];
          const idx = Number(inputElement.dataset["valueIdx"]);
          if (!(groupValues && groupValues[idx])) {
            groupValues[idx] = {};
          }
          groupValues[idx][fieldname] = inputElement.value;
        } else {
          const groupValues = this.values[groupname] as Record<string, unknown>;
          if (groupValues && groupValues[fieldname]) {
            groupValues[fieldname] = inputElement?.value;
          } else {
            this.values[groupname] = {
              ...this.values[groupname],
              [fieldname]: inputElement?.value,
            };
          }
        }
      };
      const validation = () => {
        bindValues();
        // checking validaiton rules if any
        if (
          this.state.rules[name] !== undefined &&
          this.state.rules[name]?.length
        ) {
          this.validateField(name, inputElement);
        }
      };

      /**
       * default event triggers for validation
       */
      inputElement.oninput = validation;
      inputElement.onblur = validation;

      // on special events if user has specified
      if (
        this.state.rules[name] !== undefined &&
        this.state.rules[name]?.length
      ) {
        this.state.rules[name]?.forEach((rule) => {
          if (rule.when && rule.when.length > 0) {
            rule.when.forEach((eventname) => {
              bindValues();
              /**
               * custom event triggers for validation
               */
              inputElement[`on${eventname}`] = () => {
                this.validateField(
                  name,
                  inputElement,
                  false,
                  (r: FormBuilderGenericValidationRule) => {
                    return r.name === rule.name;
                  }
                );
              };
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
    const rulesToValidate = this.state.rules[name]?.filter(
      filter ? filter : () => true
    );

    const { result, message } = validate(
      (inputElement.value as string) ?? "",
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
          inputElement.insertAdjacentHTML(
            "beforeend",
            `<f-div slot="help">${message}</f-div>`
          );
        }
        inputElement.state = "danger";
      }
    } else {
      delete this.state.errors[name];
      if (!this.state.helperTexts[name]) {
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
