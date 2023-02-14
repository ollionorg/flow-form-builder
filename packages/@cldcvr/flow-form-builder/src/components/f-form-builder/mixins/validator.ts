import {
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
  for (const r of elementRules) {
    if (r.name !== "custom") {
      result = rules[r.name](value);
      if (!result) {
        message = getValidationMessage(r, { name, value });
        break;
      }
    } else {
      result = r.validate(value);
      if (!result) {
        message = getValidationMessage(r, { name, value });
        break;
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
    return processCustomMessage(r.message, { name, value });
  } else if (defaultMessages[r.name]) {
    return processCustomMessage(defaultMessages[r.name], {
      name,
      value,
    });
  } else {
    return "Validation failed";
  }
}
