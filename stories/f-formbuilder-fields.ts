import { FormBuilderConfig, FormBuilderValues } from "@cldcvr/flow-form-builder/src";
type SampleFormBuilder = {
  config: FormBuilderConfig;
};

const sampleFormBuilder: SampleFormBuilder = {
  config: {
    gap: "large",
    groupSeparator: true,
    fieldSize: "small",
    variant: "round",
    category: "fill",
    label: {
      title: "Form",
      description: "This is a form description",
      iconTooltip: "Hello",
    },
    groups: {
      group7: {
        direction: "horizontal",
        isCollapsible: false,
        isCollapsed: true,
        label: {
          title: "Group 7",
          description: "This is Group 1",
          iconTooltip: "Hello",
        },
        fields: {
          select: {
            selection: "multiple",
            options: ["option 1", "option 2", "option 3"],
            type: "select",
            placeholder: "This is a placeholder",
            iconLeft: "i-app",
            disabled: false,
            clear: true,
            validationRules: [
              {
                name: "required",
              },
            ],
          },
          xyz: {
            type: "text",
            helperText: "This field is a required field",
            validationRules: [
              {
                name: "required",
              },
            ],
          },
        },
      },
      group1: {
        direction: "horizontal",
        isCollapsible: true,
        isCollapsed: true,
        label: {
          title: "Group 1",
          description: "This is Group 1",
          iconTooltip: "Hello",
        },
        fields: {
          abc: {
            type: "text",
            placeholder: "This is a placeholder",
            autoComplete: false, // to disabled browser's auto-complete behavior
            iconLeft: "i-app",
            prefix: "+91",
            maxLength: 100,
            loading: false,
            disabled: false,
            readonly: false,
            clear: true,
            validationRules: [
              {
                name: "required",
              },
            ],
          },
          xyz: {
            type: "text",
            helperText: "This field is a required field",
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
      group3: {
        direction: "vertical",
        gap: "medium",
        label: {
          title: "Group 3",
          description: "This is Group 3",
          iconTooltip: "Hello",
        },
        fields: {
          checkbox: {
            type: "checkbox",
            // helperText: "This field is required",
            options: [
              { id: "1", title: "Orange", iconTooltip: "hello" },
              {
                id: "2",
                title: "Banana",
                iconTooltip: "hello",
              },
            ],
            validationRules: [
              {
                name: "required",
              },
            ],
          },
        },
      },
      group4: {
        direction: "vertical",
        label: {
          title: "Textarea",
          description: "This is A textarea",
          iconTooltip: "Hello",
        },
        fields: {
          texthere: {
            type: "textarea",
            placeholder: "This is a placeholder",
            maxLength: 100,
            disabled: false,
            readonly: false,
            clear: true,
            validationRules: [
              {
                name: "required",
              },
            ],
          },
        },
      },
      group5: {
        direction: "vertical",
        gap: "medium",
        label: {
          title: "Group 5",
          description: "This is Group 5",
          iconTooltip: "Hello",
        },
        fields: {
          radio: {
            type: "radio",
            // helperText: "This field is required",
            options: [
              { id: "1", title: "Orange", iconTooltip: "hello" },
              {
                id: "2",
                title: "Banana",
                iconTooltip: "hello",
              },
            ],
            validationRules: [
              {
                name: "required",
              },
            ],
          },
        },
      },
      group6: {
        direction: "vertical",
        gap: "medium",
        label: {
          title: "Group 6",
          description: "This is Group 6",
          iconTooltip: "Hello",
        },
        fields: {
          switchButton: {
            type: "switchButton",
            validationRules: [
              {
                name: "required",
              },
            ],
          },
        },
      },
    },
  },
};
export default sampleFormBuilder;
