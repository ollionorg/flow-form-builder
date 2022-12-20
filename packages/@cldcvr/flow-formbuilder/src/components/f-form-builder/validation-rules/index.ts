import { FormBuilderValidatorFunction } from "../f-form-builder-types";
import required from "./required";

const all: Record<string, FormBuilderValidatorFunction> = {
  required,
};

export default all;
