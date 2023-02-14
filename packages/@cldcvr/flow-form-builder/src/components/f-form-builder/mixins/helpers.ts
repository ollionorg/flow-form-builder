import { FButton, FInput } from "@cldcvr/flow-core";
import { FFormBuilder } from "./../f-form-builder";
import {
  CLONNED_GROUP_NAME_SEPARATOR,
  GROUP_FIELD_NAME_SEPARATOR,
} from "./constants";
import { FFormInputElements } from "./types";

/**
 * check if condition is satisfying for any element
 */
export function checkAllShowConditions(this: FFormBuilder) {
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
export function checkSuffixConditions(this: FFormBuilder) {
  this.state.suffixFunctions?.forEach((suffixObject, field) => {
    const suffixDefined = suffixObject.suffix;
    const suffixFunction = suffixObject?.suffixFunction;
    if (suffixDefined && suffixFunction) {
      const suffixField = suffixFunction((field.value as FInput)?.value ?? "");
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
export function checkFieldType(this: FFormBuilder, type: string) {
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
 * check if submit trigger is added
 */
export function checkSubmit(this: FFormBuilder, event: MouseEvent) {
  if ((event.target as HTMLElement).getAttribute("type") === "submit") {
    this.submit();
  }
}

export function emitStateChange(this: FFormBuilder) {
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
export function bindValues(
  this: FFormBuilder,
  inputElement: FFormInputElements | undefined,
  name: string
) {
  if (inputElement && !(inputElement instanceof FButton)) {
    const [preGroupname, fieldname] = name.split(GROUP_FIELD_NAME_SEPARATOR);

    const [groupname] = preGroupname.split(CLONNED_GROUP_NAME_SEPARATOR);

    const groupConfig = this.config.groups[groupname];
    if (groupConfig.type === "array" && this.values && this.values[groupname]) {
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
 * handle input event of form
 */
export function handleFormChange(this: FFormBuilder, event: Event) {
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

export function onSubmit(this: FFormBuilder, event: SubmitEvent) {
  event.stopPropagation();
  event.preventDefault();
  this.submit();
}

export function submit(this: FFormBuilder) {
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
