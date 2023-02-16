import { FButton } from "@cldcvr/flow-core";
import { FFormBuilder } from "./../f-form-builder";
import {
  CLONED_GROUP_NAME_SEPARATOR,
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
    const [groupname] = preGroupname.split(CLONED_GROUP_NAME_SEPARATOR);
    const groupConfig = this.config.groups[groupname];

    const bindValues = () => {
      let values = this.values;

      if (!values) {
        values = {};
      }

      if (groupConfig.type === "array") {
        let groupValues = values[groupname] as Record<string, unknown>[];
        const idx = Number(inputElement.dataset["valueIdx"]);
        if (!groupValues) {
          values[groupname] = groupValues = [];
        }
        if (!(groupValues && groupValues[idx])) {
          groupValues[idx] = {};
        }
        groupValues[idx][fieldname] = inputElement.value;
      } else {
        const groupValues = values[groupname] as Record<string, unknown>;
        if (groupValues && groupValues[fieldname]) {
          groupValues[fieldname] = inputElement?.value;
        } else {
          values[groupname] = {
            ...values[groupname],
            [fieldname]: inputElement?.value,
          };
        }
      }

      this.values = values;
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

  if (!result && message && inputElement.offsetHeight > 0) {
    this.state.errors[name] = message;
    if (!silent) {
      updateMessage(inputElement, message);
      inputElement.state = "danger";
    }
  } else {
    delete this.state.errors[name];
    const slotName = inputElement.lastElementChild?.getAttribute("slot");
    if (this.state.helperTexts[name]) {
      updateMessage(inputElement, this.state.helperTexts[name] as string);
    } else if (slotName === "help") {
      const child = inputElement.children[inputElement.children.length - 1];
      child.remove();
    }
    inputElement.state = "default";
  }
}

function updateMessage(element: HTMLElement, message: string) {
  if (element.lastElementChild?.getAttribute("slot") === "help") {
    const child = element.children[element.children.length - 1];
    child.remove();
    element.insertAdjacentHTML(
      "beforeend",
      `<f-div slot="help">${message}</f-div>`
    );
  } else {
    element.insertAdjacentHTML(
      "beforeend",
      `<f-div slot="help">${message}</f-div>`
    );
  }
}
