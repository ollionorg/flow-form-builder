import { FFormBuilder } from "../f-form-builder";

export function getGroupsProxy(element: FFormBuilder) {
  return {
    get: (target: Record<string, any>, key: string) => {
      if (key !== "__isProxy") {
        return target[key];
      }

      return true;
    },
    set(target: Record<string, any>, key: string, value: any) {
      target[key] = value;
      element.updateTriggerId = key;
      element.requestUpdate();
      return true;
    },
    deleteProperty(target: Record<string, any>, property: string) {
      if (property in target) {
        delete target[property];
        element.updateTriggerId = property;
        element.requestUpdate();
      }
      return true;
    },
  };
}
