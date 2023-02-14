import { FInput } from "@cldcvr/flow-core";
import { FFormBuilder } from "./f-form-builder";

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
