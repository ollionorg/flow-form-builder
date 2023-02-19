import { html, fixture, expect } from "@open-wc/testing";

// import flow-core elements
import "@cldcvr/flow-core";
import "@cldcvr/flow-system-icon";

import { FFormBuilder } from "@cldcvr/flow-form-builder";
// import { FDiv, FIcon, FText } from "@cldcvr/flow-core";

describe("f-form-builder", () => {
  it("is defined", () => {
    const el = document.createElement("f-form-builder");
    expect(el).instanceOf(FFormBuilder);
  });

  //   it("should render with all default properties", async () => {
  //     const el = await fixture(
  //       html` <f-form-builder .config=${{
  //         label: {
  //           title: "Form",
  //           description: "Wait for 5 seconds, it will add a group",
  //           iconTooltip: "Hello",
  //         },
  //         groups: {
  //           firstGroup: {
  //             type: "object",
  //             direction: "horizontal",
  //             isCollapsible: false,
  //             isCollapsed: true,
  //             fields: {
  //               username: {
  //                 type: "text",
  //                 helperText: "This field is a required field",
  //                 validationRules: [
  //                   {
  //                     name: "required",
  //                   },
  //                 ],
  //               },
  //             },
  //           },
  //         },
  //       }} .values=${{ firstGroup: { username: "flow" } }}></f-checkbox> `
  //     );

  //     expect(el).dom.to.equalSnapshot();

  //     const formElement = el.shadowRoot!.querySelector("f-form")!;
  //     expect(formElement).to.not.undefined;

  //     expect(formElement.getAttribute("variant")).to.equal("curved");
  //     expect(formElement.getAttribute("gap")).to.equal("medium");
  //     expect(formElement.getAttribute("separator")).to.equal(null);
  //     expect(formElement.getAttribute("category")).to.equal("fill");

  //     const groups = el.shadowRoot!.querySelectorAll("f-form-group")!;
  //     expect(groups.length).to.equal(2);

  //     const labelContainer = formElement.children.item(0);
  //     expect(labelContainer).instanceOf(FDiv);
  //     const title = labelContainer?.children
  //       .item(0)
  //       ?.children.item(0)
  //       ?.children.item(0);
  //     expect(title).instanceOf(FText);
  //     expect(title?.textContent).to.equal("Form");

  //     const infoIcon = labelContainer?.children.item(0)?.children.item(1);
  //     expect(infoIcon).instanceOf(FIcon);
  //   });
  /**
   *
   * @TODO test validation, events and values + user interaction
   */
});
