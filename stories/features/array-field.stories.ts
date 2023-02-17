import { Story, Meta } from "@storybook/web-components";
import { html } from "lit-html";
import { FormBuilderConfig } from "@cldcvr/flow-form-builder/src/components/f-form-builder/mixins/types";
import { createRef, Ref, ref } from "lit/directives/ref.js";

export default {
  title: "Features/Array field",
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
            type: "array",
            field: {
              type: "text",
            },
          },
        },
      },
    },
  },
};

const Template: Story<unknown> = (args: any) => {
  const handleKeydown = (event: Event) => {
    event.stopPropagation();
    event.stopImmediatePropagation();
  };
  const fieldRef: Ref<HTMLElement> = createRef();
  const handleInput = (event: CustomEvent) => {
    if (fieldRef.value) {
      fieldRef.value.innerHTML = JSON.stringify(event.detail);
    }
  };
  return html`
    <f-div padding="medium" direction="column" gap="large">
      <f-form-builder
        .config=${args.config}
        .values=${args.values}
        @keydown=${handleKeydown}
        @input=${handleInput}
      >
        <f-button
          label="submit"
          type="submit"
          .variant=${args.config.variant}
          .category=${args.config.category}
        ></f-button>
      </f-form-builder>

      <code><pre ${ref(fieldRef)}>${JSON.stringify(args.values)}</pre></code>
    </f-div>
  `;
};

export const basic = Template.bind({});

basic.args = {
  config: sampleFormBuilder.config,
  values: {
    firstGroup: {
      username: ["username1", "username2"],
    },
  },
};
