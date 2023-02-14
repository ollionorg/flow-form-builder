import { cloneDeep } from "lodash";
import { FFormBuilder } from "./../f-form-builder";
import { CLONNED_GROUP_NAME_SEPARATOR } from "./constants";
import { FormBuilderArrayGroupValues, InternalFormBuilderGroup } from "./types";

export function handleGroupDuplicate(
  this: FFormBuilder,
  group: InternalFormBuilderGroup
) {
  const clonnedGroupIdices = this.groups.map((gr) => {
    if (gr.name.startsWith(group.name + CLONNED_GROUP_NAME_SEPARATOR)) {
      return +gr.name.split(CLONNED_GROUP_NAME_SEPARATOR)[1];
    }
    return 0;
  });

  const newIndex = Math.max(...clonnedGroupIdices) + 1;
  this.duplicateGroup(group.name, newIndex);
}
export function duplicateGroup(
  this: FFormBuilder,
  groupName: string,
  d: number
) {
  const clonnedGroupName = `${groupName}${CLONNED_GROUP_NAME_SEPARATOR}${d}`;

  const grIdx = this.groups.findIndex((gr) => gr.name === groupName);
  const clonnedGroupIdx = grIdx + d;

  const clonnedGroup = {
    name: clonnedGroupName,
    ...cloneDeep(this.config.groups[groupName]),
  };

  clonnedGroup.fields["remove_"] = {
    type: "button",
    label: "remove",
    onClick: () => {
      this.removeGroup(clonnedGroupName);
    },
  };

  clonnedGroup.label = undefined;
  this.groups.splice(clonnedGroupIdx, 0, clonnedGroup);

  Object.entries(this.groups[clonnedGroupIdx].fields).forEach(
    ([_fieldName, fieldConfig]) => {
      fieldConfig.valueIdx = d;
    }
  );

  if (
    this.values[groupName] &&
    !(this.values as FormBuilderArrayGroupValues)[groupName][d]
  ) {
    (this.values as FormBuilderArrayGroupValues)[groupName][d] = {};
  }
  this.requestUpdate();
}

export function removeGroup(this: FFormBuilder, groupName: string) {
  const idxToRemove = this.groups.findIndex((gr) => gr.name === groupName);
  this.groups.splice(idxToRemove, 1);

  const [maingroupname, valueIdx] = groupName.split(
    CLONNED_GROUP_NAME_SEPARATOR
  );

  if (this.values[maingroupname]) {
    this.values[maingroupname] = [
      ...(this.values[maingroupname] as []).filter(
        (_val, idx) => idx !== +valueIdx
      ),
    ];
  }
  this.removedGroupName = groupName;
}
