import { cloneDeep } from "lodash";
import { FFormBuilder } from "./../f-form-builder";
import { CLONED_GROUP_NAME_SEPARATOR } from "./constants";
import { FormBuilderArrayGroupValues, InternalFormBuilderGroup } from "./types";

export function handleGroupDuplicate(
  this: FFormBuilder,
  group: InternalFormBuilderGroup
) {
  const clonedGroupIdices = this.groups.map((gr) => {
    if (gr.name.startsWith(group.name + CLONED_GROUP_NAME_SEPARATOR)) {
      return +gr.name.split(CLONED_GROUP_NAME_SEPARATOR)[1];
    }
    return 0;
  });

  const newIndex = Math.max(...clonedGroupIdices) + 1;
  this.duplicateGroup(group.name, newIndex);
}

export function duplicateGroup(
  this: FFormBuilder,
  groupName: string,
  d: number
) {
  const clonedGroupName = `${groupName}${CLONED_GROUP_NAME_SEPARATOR}${d}`;

  const grIdx = this.groups.findIndex((gr) => gr.name === groupName);
  const clonedGroupIdx = grIdx + d;

  const clonedGroup = {
    name: clonedGroupName,
    ...cloneDeep(this.config.groups[groupName]),
  };

  clonedGroup.label = undefined;
  this.groups.splice(clonedGroupIdx, 0, clonedGroup);

  Object.entries(this.groups[clonedGroupIdx].fields).forEach(
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
    CLONED_GROUP_NAME_SEPARATOR
  );

  if (this.values[maingroupname]) {
    this.values[maingroupname] = [
      ...(this.values[maingroupname] as []).filter(
        (_val, idx) => idx !== +valueIdx
      ),
    ];
  }
  this.updateTriggerId = groupName;
}
