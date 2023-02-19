import { Story, Meta } from "@storybook/web-components";
import { html } from "lit-html";
import { FormBuilderField } from "@cldcvr/flow-form-builder/src/components/f-form-builder/mixins/types";
import { createRef, Ref, ref } from "lit/directives/ref.js";

export default {
  title: "Features/Array with Object fields",
  argTypes: {
    field: {
      control: false,
    },
  },
} as Meta;

type SampleFormBuilder = {
  field: FormBuilderField;
};

const sampleFormBuilder: SampleFormBuilder = {
  field: {
    type: "object",
    direction: "horizontal",
    isCollapsible: false,
    isCollapsed: true,
    fields: {
      username: {
        type: "array",
        field: {
          type: "object",
          fields: {
            firstname: {
              type: "text",
            },
            lastname: {
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
        .field=${args.field}
        .value=${args.value}
        @keydown=${handleKeydown}
        @input=${handleInput}
      >
        <f-button label="submit" type="submit"></f-button>
      </f-form-builder>

      <code><pre ${ref(fieldRef)}>${JSON.stringify(args.value)}</pre></code>
    </f-div>
  `;
};

export const basic = Template.bind({});

basic.args = {
  field: sampleFormBuilder.field,
  value: {
    username: [
      {
        firstname: "Tony",
        lastname: "Stark",
      },
    ],
  },
};
