import { FormBuilderValidatorFunction } from "../mixins/types";
import required from "./required";

const all: Record<string, FormBuilderValidatorFunction> = {
  required,
};

export default all;
