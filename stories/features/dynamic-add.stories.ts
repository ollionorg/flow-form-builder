import { Story, Meta } from "@storybook/web-components";
import { html } from "lit-html";
import { useArgs, useState } from "@storybook/client-api";
import { FormBuilderConfig, FormBuilderState } from "@cldcvr/flow-form-builder";

export default {
  title: "Features/Dynamic Group Addition or Deletion",
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
      title: "Form",
      description: "Wait for 5 seconds, it will add a group",
      iconTooltip: "Hello",
    },
    groups: {
      firstGroup: {
        type: "object",
        direction: "horizontal",
        isCollapsible: false,
        isCollapsed: true,
        fields: {
          username: {
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
    },
  },
};
const deleteGroup = () => {
  console.log("deleting group");
  delete sampleFormBuilder.config.groups.add;
  setTimeout(addGroup, 5000);
};
const addGroup = () => {
  console.log("adding new group");
  sampleFormBuilder.config.groups.add = {
    type: "object",
    direction: "vertical",
    gap: "medium",
    label: {
      title: "Dynamically added",
      description: "This is Group 5",
      iconTooltip: "This is added dynamically using `setTimeout`",
    },
    fields: {
      added: {
        type: "button",
        label: "Added",
        iconLeft: "i-arrow-rotate",
      },
    },
  };

  setTimeout(deleteGroup, 5000);
};
setTimeout(addGroup, 5000);

const Template: Story<unknown> = (args: any) => {
  const [_, updateArgs] = useArgs();
  const [state, setState] = useState<FormBuilderState | unknown>({});
  const handleSubmit = (event: CustomEvent) => {
    console.log("Submit event", event.detail);
    window.alert("event submit successfully");
  };
  const handleStateChange = (event: CustomEvent) => {
    setState(event.detail);
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
        @stateChange=${handleStateChange}
        @input=${handleInput}
        @keydown=${handleKeydown}
      >
        <f-button
          label="submit"
          type="submit"
          .variant=${args.config.variant}
          .category=${args.config.category}
          ?disabled=${!(state as FormBuilderState).isValid}
        ></f-button> </f-form-builder
    ></f-div>
  `;
};

export const basic = Template.bind({});

basic.args = {
  config: sampleFormBuilder.config,
};
