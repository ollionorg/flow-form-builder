import { FormBuilderValidatorFunction } from "../mixins/types";
import required from "./required";
import email from "./email";
import between from "./between";

const all: Record<string, FormBuilderValidatorFunction<unknown, any>> = {
  required,
  email,
  between,
};

export default all;
