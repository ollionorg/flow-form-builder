import text from "./text";
import checkbox from "./checkbox";
import radio from "./radio";
import switchButton from "./switch";
import select from "./select";
import button from "./button";
import { FormBuilderFieldRenderFunction } from "../mixins/types";
import textarea from "./textarea";
import iconButton from "./icon-button";
import array from "./array";

const all: Record<string, FormBuilderFieldRenderFunction> = {
  text,
  checkbox,
  textarea,
  radio,
  switchButton,
  select,
  button,
  array,
  ["icon-button"]: iconButton,
};

export default all;

/**
 * check field type and return genric
 * @param type
 */
export function checkFieldType(type: string) {
  if (
    type === "text" ||
    type === "tel" ||
    type === "number" ||
    type === "email" ||
    type === "url" ||
    type === "password"
  ) {
    return "text";
  } else {
    return type;
  }
}
