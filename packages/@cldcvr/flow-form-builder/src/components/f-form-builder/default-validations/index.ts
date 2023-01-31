import { FormBuilderValidationRules } from "../f-form-builder-types";
import { isValidEmail, isValidHttpUrl } from "../utils";

export default function defaultValidations(
  fieldType: string,
  validations: FormBuilderValidationRules
) {
  if (fieldType === "email") {
    validations.push({
      name: "custom",
      when: ["input"],
      message: "Please Enter a valid Email Address",
      validate: (value: unknown) => {
        return isValidEmail(value as string) ? true : false;
      },
    });
  }
  if (fieldType === "url") {
    validations.push({
      name: "custom",
      when: ["keyup"],
      message: "Please Enter a valid URL",
      validate: (value: unknown) => {
        return isValidHttpUrl(value as string) ? true : false;
      },
    });
  }
}
