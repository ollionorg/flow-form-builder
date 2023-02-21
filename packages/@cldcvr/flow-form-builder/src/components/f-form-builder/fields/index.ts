import text from "./text";
import checkbox from "./checkbox";
import radio from "./radio";
import switchButton from "./switch";
import select from "./select";
import button from "./button";
import { FormBuilderFieldRenderFunction } from "../../../types";
import textarea from "./textarea";
import iconButton from "./icon-button";
import array from "./array";
import object from "./object";

const all: Record<string, FormBuilderFieldRenderFunction> = {
	text,
	checkbox,
	textarea,
	radio,
	switchButton,
	select,
	button,
	array,
	object,
	["icon-button"]: iconButton,
	tel: text,
	number: text,
	email: text,
	url: text,
	password: text
};

export default all;
