import { FButton } from "@cldcvr/flow-core";
import { render } from "lit";
import { FFormBuilder } from "./../f-form-builder";
import {
  CLONNED_GROUP_NAME_SEPARATOR,
  GROUP_FIELD_NAME_SEPARATOR,
} from "./constants";
import {
  FFormInputElements,
  FormBuilderGenericValidationRule,
  FormBuilderValidationRules,
} from "./types";
import validate from "./validator";

/**
 * validate whole form
 * @param silent
 */
export function validateForm(this: FFormBuilder, silent = false) {
  Object.entries(this.state.refs).forEach(([name, element]) => {
    const inputElement = element.value;
    if (!(inputElement instanceof FButton)) {
      if (
        inputElement &&
        this.state.rules[name] !== undefined &&
        this.state.rules[name]?.length
      ) {
        this.validateField(name, inputElement, silent);
      }
    }
  });
}

/**
 * validation rules listener added on `input` event.
 * @param inputElement
 */
export function bindValidation(
  this: FFormBuilder,
  inputElement: FFormInputElements,
  name: string
) {
  /**
   * Adding validation listener
   */
  if (inputElement && !(inputElement instanceof FButton)) {
    const [preGroupname, fieldname] = name.split(GROUP_FIELD_NAME_SEPARATOR);
    const [groupname] = preGroupname.split(CLONNED_GROUP_NAME_SEPARATOR);
    const groupConfig = this.config.groups[groupname];

    const bindValues = () => {
      if (groupConfig.type === "array") {
        let groupValues = this.values[groupname] as Record<string, unknown>[];
        const idx = Number(inputElement.dataset["valueIdx"]);
        if (!groupValues) {
          this.values[groupname] = groupValues = [];
        }
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
      this.state.rules[name]?.forEach(
        (rule: FormBuilderGenericValidationRule) => {
          if (rule.when && rule.when.length > 0) {
            rule.when.forEach((eventname: any) => {
              bindValues();
              /**
               * custom event triggers for validation
               */
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
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
        }
      );
    }
  }
}
/**
 *
 * @param inputElement ref of field
 * @param silent if true then errors are not rendered, they are added in state only
 */
export function validateField(
  this: FFormBuilder,
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
