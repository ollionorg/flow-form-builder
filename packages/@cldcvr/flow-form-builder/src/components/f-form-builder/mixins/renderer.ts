import { html } from "lit";
import {
  FFormInputElements,
  FormBuilderArrayGroup,
  FormBuilderField,
  FormBuilderGroup,
  FormBuilderTextInputField,
  InternalFormBuilderGroup,
} from "./types";
import { ref, createRef, Ref } from "lit/directives/ref.js";
import { GROUP_FIELD_NAME_SEPARATOR } from "./constants";
import { FFormBuilder } from "./../f-form-builder";
import defaultValidations from "./../default-validations";
import fieldRenderer from "./../fields";
import { ifDefined } from "lit-html/directives/if-defined.js";

/**
 * build/render form based on config
 */
export function renderGroups(this: FFormBuilder) {
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
    ${this.groups.map((gr: InternalFormBuilderGroup) => {
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
          ?can-duplicate=${(gr as FormBuilderArrayGroup).canDuplicate ?? false}
          @duplicate-group=${() => this.handleGroupDuplicate(gr)}
          .collapse=${gr.isCollapsible ? "accordion" : "none"}
          ${ref(groupWrapperRef)}
        >
          ${this.renderFields(name, gr.fields, gr)}
        </f-form-group>
      `;
    })}
    <f-form-group>
      <slot @click=${this.checkSubmit}></slot>
    </f-form-group>
  </f-form>`;
}
/**
 * render field based on field config
 * @param fields
 */
export function renderFields(
  this: FFormBuilder,
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
    const validations = field.validationRules ? [...field.validationRules] : [];
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
