import text from "./text";
import checkbox from "./checkbox";
import radio from "./radio";
import switchButton from "./switch";
import select from "./select";
import button from "./button";
import { FormBuilderFieldRenderFunction } from "../f-form-builder-types";
import textarea from "./textarea";

const all: Record<string, FormBuilderFieldRenderFunction> = {
  text,
  checkbox,
  textarea,
  radio,
  switchButton,
  select,
  button,
};

export default all;
