import {
  FormBuilderConfig,
  FormBuilderValues,
} from "@cldcvr/flow-form-builder/src";
type SampleFormBuilder = {
  config: FormBuilderConfig;
};

const sampleFormBuilder: SampleFormBuilder = {
  config: {
    groups: {
      group1: {
        direction: "horizontal",
        fields: {
          abc: {
            type: "text",
            validationRules: [
              {
                name: "required",
              },
            ],
          },
          xyz: {
            type: "text",
            validationRules: [
              {
                name: "required",
              },
            ],
          },
        },
      },
      group2: {
        show: (formValues: FormBuilderValues) => {
          return formValues.group1.xyz === "show";
        },
        fields: {
          username: {
            type: "text",
            validationRules: [
              {
                name: "required",
              },
            ],
          },
          email: {
            type: "text",
            validationRules: [
              {
                name: "required",
              },
            ],
            show: (formValues: FormBuilderValues) => {
              return formValues.group2.username === "abc";
            },
          },
          lastname: {
            type: "text",
            validationRules: [
              {
                name: "required",
                when: ["click"],
                message: "The {{name}} is mandatory",
              },
              {
                name: "custom",
                message: "{{value}} is not available",
                validate: (value: unknown) => {
                  return value !== "vikas";
                },
              },
            ],
          },
        },
      },
    },
  },
};
export default sampleFormBuilder;
