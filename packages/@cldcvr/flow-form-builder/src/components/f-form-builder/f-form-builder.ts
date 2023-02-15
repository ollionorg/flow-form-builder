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
} from "./mixins/types";
import eleStyle from "./f-form-builder.scss";

import { isEmptyObject } from "./utils";
import { FRoot } from "@cldcvr/flow-core/src/mixins/components/f-root/f-root";
import flowCoreCSS from "@cldcvr/flow-core/dist/style.css";

import {
  bindValidation,
  validateField,
  validateForm,
} from "./mixins/validation";

import { renderFields, renderGroups } from "./mixins/renderer";
import {
  duplicateGroup,
  handleGroupDuplicate,
  removeGroup,
} from "./mixins/group-manager";
import {
  bindValues,
  checkAllShowConditions,
  checkFieldType,
  checkSubmit,
  checkSuffixConditions,
  emitStateChange,
  handleFormChange,
  onSubmit,
  submit,
} from "./mixins/helpers";
import { getGroupsProxy } from "./mixins/proxies";

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
  updateTriggerId: string | undefined = undefined;

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
      changedProperties.has("updateTriggerId")
    ) {
      /**
       * reset groups array
       */
      this.groups = [];
      this.updateTriggerId = undefined;

      /**
       * check given group config add it to groups array
       */

      try {
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
      } catch (e) {
        console.error("No groups specified", e);
      }
      try {
        Object.entries(this.values).forEach(([groupName, fieldValues]) => {
          if (this.config.groups[groupName].type === "array") {
            for (let d = 1; d < (fieldValues as unknown[]).length; d++) {
              this.duplicateGroup(groupName, d);
            }
          }
        });
      } catch (e) {
        console.warn("No values given");
      }
    }

    if (changedProperties.has("config")) {
      if (this.config.groups && !this.config.groups.__isProxy) {
        this.config.groups = new Proxy(
          this.config.groups,
          getGroupsProxy(this)
        );
      }
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
  submit!: () => void;
  onSubmit!: (event: SubmitEvent) => void;
  handleFormChange!: (event: Event) => void;
  bindValues!: (
    inputElement: FFormInputElements | undefined,
    name: string
  ) => void;
  emitStateChange!: () => void;
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
FFormBuilder.prototype.submit = submit;
FFormBuilder.prototype.onSubmit = onSubmit;
FFormBuilder.prototype.handleFormChange = handleFormChange;
FFormBuilder.prototype.bindValues = bindValues;
FFormBuilder.prototype.emitStateChange = emitStateChange;
