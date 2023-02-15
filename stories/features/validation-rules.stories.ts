import { Story, Meta } from "@storybook/web-components";
import { html } from "lit-html";
import { useArgs } from "@storybook/client-api";
import { FormBuilderConfig } from "@cldcvr/flow-form-builder/src/components/f-form-builder/mixins/types";

export default {
  title: "Features/Validation Rules",
  argTypes: {
    config: {
      control: false,
    },
  },
} as Meta;

type SampleFormBuilder = {
  config: FormBuilderConfig;
};

const sampleFormBuilder: SampleFormBuilder = {
  config: {
    gap: "large",
    groupSeparator: true,
    fieldSize: "medium",
    variant: "curved",
    category: "fill",
    label: {
      title: "Validaiton Rules",
      description: "Click on submit to trigger validation",
      iconTooltip: "This form is created to verify all validaiton rules",
    },
    groups: {
      firstGroup: {
        type: "object",
        direction: "vertical",
        isCollapsible: false,
        isCollapsed: true,
        fields: {
          required: {
            type: "text",
            helperText: "Click Submit to validate",
            validationRules: [
              {
                name: "required",
              },
            ],
          },
          requiredWithoutHelpText: {
            type: "text",
            validationRules: [
              {
                name: "required",
              },
            ],
          },
          email: {
            type: "text",
            helperText: "Type invalid email address to trigger validation",
            validationRules: [
              {
                name: "email",
              },
              {
                name: "required",
              },
            ],
          },
          port: {
            type: "number",
            helperText:
              "Type value less than 10 or greater than 20 to trigger validation",
            validationRules: [
              {
                name: "between",
                params: {
                  min: 10,
                  max: 20,
                },
              },
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

const Template: Story<unknown> = (args: any) => {
  const [_, updateArgs] = useArgs();
  const handleSubmit = (event: CustomEvent) => {
    console.log("Submit event", event.detail);
    window.alert("event submit successfully");
  };
  const handleStateChange = (event: CustomEvent) => {
    console.log("State Change event", event.detail);
  };
  const handleInput = (event: CustomEvent) => {
    {
      updateArgs({ values: event.detail });
    }
    console.log("input event", event.detail);
  };
  const handleKeydown = (event: Event) => {
    event.stopPropagation();
    event.stopImmediatePropagation();
  };

  return html`
    <f-div padding="medium">
      <f-form-builder
        .config=${args.config}
        .values=${args.values}
        @submit=${handleSubmit}
        @input=${handleInput}
        @stateChange=${handleStateChange}
        @keydown=${handleKeydown}
      >
        <f-button
          label="submit"
          type="submit"
          .variant=${args.config.variant}
          .category=${args.config.category}
        ></f-button> </f-form-builder
    ></f-div>
  `;
};

export const basic = Template.bind({});

basic.args = {
  config: sampleFormBuilder.config,
};
