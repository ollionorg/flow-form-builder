import { FormBuilderConfig, FormBuilderValues } from "@cldcvr/flow-core/src";
type SampleFormBuilder = {
  config: FormBuilderConfig;
};

const sampleFormBuilder: SampleFormBuilder = {
  config: {
    groups: [
      {
        fields: [
          {
            type: "text",
            name: "abc",
            validationRules: [
              {
                name: "required",
              },
            ],
          },
          {
            type: "text",
            name: "abc",
            validationRules: [
              {
                name: "required",
              },
            ],
          },
          {
            type: "text",
            name: "xyz",
            validationRules: [
              {
                name: "required",
              },
            ],
          },
        ],
      },
      {
        fields: [
          {
            type: "text",
            name: "group2abc",
            validationRules: [
              {
                name: "required",
              },
            ],
            if: (formValues: FormBuilderValues) => {
              return formValues.xyz === "abc";
            },
          },
          {
            type: "text",
            name: "group2abc",
            validationRules: [
              {
                name: "required",
              },
            ],
          },
          {
            type: "text",
            name: "surname",
            validationRules: [
              {
                name: "required",
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
        ],
      },
    ],
  },
};
export default sampleFormBuilder;
