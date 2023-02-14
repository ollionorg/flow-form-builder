import { html, PropertyValueMap, PropertyValues, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { ref, createRef, Ref } from "lit/directives/ref.js";
import {
  FormBuilderConfig,
  FormBuilderState,
  FormBuilderValues,
  FormBuilderField,
  FormBuilderGenericValidationRule,
  FormBuilderGroup,
  FFormInputElements,
  FormBuilderTextInputField,
  FormBuilderArrayGroup,
  FormBuilderArrayGroupValues,
} from "./f-form-builder-types";
import eleStyle from "./f-form-builder.scss";

import { isEmptyObject } from "./utils";
import { FRoot } from "@cldcvr/flow-core/src/mixins/components/f-root/f-root";
import flowCoreCSS from "@cldcvr/flow-core/dist/style.css";
import fieldRenderer from "./fields";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { FButton, FInput } from "@cldcvr/flow-core";
import defaultValidations from "./default-validations/index";
import { cloneDeep } from "lodash";
import {
  bindValidation,
  validateField,
  validateForm,
} from "./f-form-builder-bind-validation";
import {
  CLONNED_GROUP_NAME_SEPARATOR,
  GROUP_FIELD_NAME_SEPARATOR,
} from "./f-form-builder-constants";

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

  /**
   * holds name of last deleted group
   */
  @state()
  removedGroupName: string | undefined = undefined;

  /**
   *
   * @param changedProperties lifecycle hook is called before render
   */
  willUpdate(changedProperties: PropertyValues<this>) {
    /**
     * re-calculate groups only if following properties are changed
     */
    if (
      changedProperties.has("config") ||
      changedProperties.has("values") ||
      changedProperties.has("removedGroupName")
    ) {
      /**
       * reset groups array
       */
      this.groups = [];
      this.removedGroupName = undefined;

      /**
       * check given group config add it to groups array
       */
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
    this.resetState();
    return this.groups.length % 2
      ? html`${this.build()}`
      : html`${this.build()}`;
  }

  resetState() {
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
  }
  /**
   * handle input event of form
   */
  handleFormChange(event: Event) {
    event.stopPropagation();
    // setting isChanged to true in state
    this.state.isChanged = true;
    this.checkAllShowConditions();
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
        if (gr.showWhen) {
          this.state.showFunctions.set(groupWrapperRef, gr.showWhen);
        }

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
    const clonnedGroupIdices = this.groups.map((gr) => {
      if (gr.name.startsWith(group.name + CLONNED_GROUP_NAME_SEPARATOR)) {
        return +gr.name.split(CLONNED_GROUP_NAME_SEPARATOR)[1];
      }
      return 0;
    });

    const newIndex = Math.max(...clonnedGroupIdices) + 1;
    this.duplicateGroup(group.name, newIndex);
  }
  duplicateGroup(groupName: string, d: number) {
    const clonnedGroupName = `${groupName}${CLONNED_GROUP_NAME_SEPARATOR}${d}`;

    const grIdx = this.groups.findIndex((gr) => gr.name === groupName);
    const clonnedGroupIdx = grIdx + d;

    const clonnedGroup = {
      name: clonnedGroupName,
      ...cloneDeep(this.config.groups[groupName]),
    };

    clonnedGroup.fields["remove_"] = {
      type: "button",
      label: "remove",
      onClick: () => {
        this.removeGroup(clonnedGroupName);
      },
    };

    clonnedGroup.label = undefined;
    this.groups.splice(clonnedGroupIdx, 0, clonnedGroup);

    Object.entries(this.groups[clonnedGroupIdx].fields).forEach(
      ([_fieldName, fieldConfig]) => {
        fieldConfig.valueIdx = d;
      }
    );

    if (
      this.values[groupName] &&
      !(this.values as FormBuilderArrayGroupValues)[groupName][d]
    ) {
      (this.values as FormBuilderArrayGroupValues)[groupName][d] = {};
    }
    this.requestUpdate();
  }

  removeGroup(groupName: string) {
    const idxToRemove = this.groups.findIndex((gr) => gr.name === groupName);
    this.groups.splice(idxToRemove, 1);

    const [maingroupname, valueIdx] = groupName.split(
      CLONNED_GROUP_NAME_SEPARATOR
    );

    if (this.values[maingroupname]) {
      this.values[maingroupname] = [
        ...(this.values[maingroupname] as []).filter(
          (_val, idx) => idx !== +valueIdx
        ),
      ];
    }
    this.removedGroupName = groupName;
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

    this.checkAllShowConditions();
    this.checkSuffixConditions();
    setTimeout(async () => {
      await this.updateComplete;
      this.validateForm(true);
      this.emitStateChange();
    }, 100);
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
    if (inputElement && !(inputElement instanceof FButton)) {
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

  validateField!: (
    this: FFormBuilder,
    name: string,
    inputElement: FFormInputElements,
    silent?: boolean,
    filter?: ((r: FormBuilderGenericValidationRule) => boolean) | undefined
  ) => void;
  validateForm!: (this: FFormBuilder, silent?: boolean) => void;
  bindValidation!: (
    this: FFormBuilder,
    inputElement: FFormInputElements,
    name: string
  ) => void;
}

FFormBuilder.prototype.validateForm = validateForm;
FFormBuilder.prototype.validateField = validateField;
FFormBuilder.prototype.bindValidation = bindValidation;
