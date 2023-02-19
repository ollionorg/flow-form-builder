import {
  FFormInputElements,
  FormBuilderField,
  FormBuilderGenericValidationRule,
  FormBuilderValidationRules,
} from "./types";

import rules from "./../validation-rules";
import defaultMessages from "./../default-validation-messages";

export default function validate(
  value: string,
  elementRules: FormBuilderValidationRules,
  name: string
) {
  let result = true;
  let message = null;
  if (elementRules) {
    for (const r of elementRules) {
      if (r.name !== "custom") {
        result = rules[r.name](value, r.params);
        if (!result) {
          message = getValidationMessage(r, { name, value });
          break;
        }
      } else {
        result = r.validate(value, r.params);
        if (!result) {
          message = getValidationMessage(r, { name, value });
          break;
        }
      }
    }
  }

  return {
    result,
    message,
  };
}

function processCustomMessage(message: string, params: Record<string, string>) {
  for (const prop in params) {
    message = message.replace(
      new RegExp("{{" + prop + "}}", "g"),
      params[prop]
    );
  }
  return message;
}

function getValidationMessage(
  r: FormBuilderGenericValidationRule,
  { name, value }: Record<string, string>
) {
  if (r.message) {
    return processCustomMessage(r.message, {
      name,
      value,
      ...(r.params as Record<string, string>),
    });
  } else if (defaultMessages[r.name]) {
    return processCustomMessage(defaultMessages[r.name], {
      name,
      value,
      ...(r.params as Record<string, string>),
    });
  } else {
    return "Validation failed";
  }
}

export function validateField(
  field: FormBuilderField,
  element: FFormInputElements,
  silent = false,
  filter?: (r: FormBuilderGenericValidationRule) => boolean
) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const rulesToValidate = field.validationRules?.filter(
    filter ? filter : () => true
  );

  const { result, message } = validate(
    (element.value as string) ?? "",
    rulesToValidate as FormBuilderValidationRules,
    element.getAttribute("name") ?? "This"
  );

  if (!result && message && element.offsetHeight > 0) {
    if (!silent) {
      updateMessage(element, message);
      element.state = "danger";
    }
  } else {
    const slotName = element.lastElementChild?.getAttribute("slot");
    if (field.helperText) {
      updateMessage(element, field.helperText);
    } else if (slotName === "help") {
      const child = element.children[element.children.length - 1];
      child.remove();
    }
    element.state = "default";
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
