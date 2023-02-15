import text from "./text";
import checkbox from "./checkbox";
import radio from "./radio";
import switchButton from "./switch";
import select from "./select";
import button from "./button";
import { FormBuilderFieldRenderFunction } from "../mixins/types";
import textarea from "./textarea";
import iconButton from "./icon-button";

const all: Record<string, FormBuilderFieldRenderFunction> = {
  text,
  checkbox,
  textarea,
  radio,
  switchButton,
  select,
  button,
  ["icon-button"]: iconButton,
};

export default all;
