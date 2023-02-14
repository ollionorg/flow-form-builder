import { html, PropertyValueMap, PropertyValues, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Ref } from "lit/directives/ref.js";
import {
  FormBuilderConfig,
  FormBuilderState,
  FormBuilderValues,
  FormBuilderGenericValidationRule,
  FFormInputElements,
  InternalFormBuilderGroup,
  FormBuilderField,
  FormBuilderGroup,
} from "./f-form-builder-types";
import eleStyle from "./f-form-builder.scss";

import { isEmptyObject } from "./utils";
import { FRoot } from "@cldcvr/flow-core/src/mixins/components/f-root/f-root";
import flowCoreCSS from "@cldcvr/flow-core/dist/style.css";

import { FButton } from "@cldcvr/flow-core";
import {
  bindValidation,
  validateField,
  validateForm,
} from "./f-form-builder-bind-validation";
import {
  CLONNED_GROUP_NAME_SEPARATOR,
  GROUP_FIELD_NAME_SEPARATOR,
} from "./f-form-builder-constants";
import { renderFields, renderGroups } from "./f-form-builder-renderer";
import {
  duplicateGroup,
  handleGroupDuplicate,
  removeGroup,
} from "./f-form-builder-group-manager";
import {
  checkAllShowConditions,
  checkFieldType,
  checkSubmit,
  checkSuffixConditions,
} from "./f-form-builder-helpers";

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

  protected groups: InternalFormBuilderGroup[] = [];

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
      ? html`${this.renderGroups()}`
      : html`${this.renderGroups()}`;
  }
  /**
   * resetting internal state
   */
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

  renderFields!: (
    groupname: string,
    fields: Record<string, FormBuilderField>,
    group: FormBuilderGroup
  ) => void;
  renderGroups!: () => void;
  removeGroup!: (groupName: string) => void;
  duplicateGroup!: (groupName: string, d: number) => void;
  handleGroupDuplicate!: (group: InternalFormBuilderGroup) => void;
  checkSubmit!: (event: MouseEvent) => void;
  checkFieldType!: (type: string) => string;
  checkSuffixConditions!: () => void;
  checkAllShowConditions!: () => void;
}

FFormBuilder.prototype.validateForm = validateForm;
FFormBuilder.prototype.validateField = validateField;
FFormBuilder.prototype.bindValidation = bindValidation;
FFormBuilder.prototype.renderFields = renderFields;
FFormBuilder.prototype.renderGroups = renderGroups;
FFormBuilder.prototype.removeGroup = removeGroup;
FFormBuilder.prototype.duplicateGroup = duplicateGroup;
FFormBuilder.prototype.handleGroupDuplicate = handleGroupDuplicate;
FFormBuilder.prototype.checkSubmit = checkSubmit;
FFormBuilder.prototype.checkFieldType = checkFieldType;
FFormBuilder.prototype.checkSuffixConditions = checkSuffixConditions;
FFormBuilder.prototype.checkAllShowConditions = checkAllShowConditions;
