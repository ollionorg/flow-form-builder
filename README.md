# Flow Form builder
![npm](https://badgen.net/npm/v/@cldcvr/flow-form-builder) ![license](https://badgen.net/npm/license/@cldcvr/flow-form-builder) ![types](https://badgen.net/npm/types/@cldcvr/flow-form-builder) ![downloads](https://badgen.net//npm/dw/@cldcvr/flow-form-builder) ![build](https://github.com/cldcvr/flow-form-builder/actions/workflows/build.yml/badge.svg) ![release](https://github.com/cldcvr/flow-form-builder/actions/workflows/release.yml/badge.svg) ![CodeQL](https://github.com/cldcvr/flow-form-builder/workflows/CodeQL/badge.svg) [![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=cldcvr_flow-form-builder&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=cldcvr_flow-form-builder) [![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=cldcvr_flow-form-builder&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=cldcvr_flow-form-builder) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=cldcvr_flow-form-builder&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=cldcvr_flow-form-builder) [![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=cldcvr_flow-form-builder&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=cldcvr_flow-form-builder) [![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=cldcvr_flow-form-builder&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=cldcvr_flow-form-builder) [![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=cldcvr_flow-form-builder&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=cldcvr_flow-form-builder) [![Bugs](https://sonarcloud.io/api/project_badges/measure?project=cldcvr_flow-form-builder&metric=bugs)](https://sonarcloud.io/summary/new_code?id=cldcvr_flow-form-builder)

The Flow form builder is built on the Flow design framework ([website](https://flow.cldcvr.com/) / [github](https://github.com/cldcvr/flow-core))


**Table of contents**
* [Benefits / Features](#Benefits-/-Features)
* [Demo](https://flow.cldcvr.com/form-builder/index.html?path=/story/components-f-form-builder--playground)
* [Getting started](#Getting-started)
* [Installation](#Installation)
* [Sample code](#Sample-code)
* [Properties](https://flow.cldcvr.com/form-builder/index.html?path=/story/components-f-form-builder--playground)

## Benefits / Features

#### ⚡ Speed + Flexibility
Quickly create and customize your form through the form builder schema. Built with developers in mind, the schema is simple and easy to use.

#### 👩‍💻 TypeScript Support
Out of the box TS support.

#### 🚓 Built-in + Custom Validation
Validation is natively built and integrated throught the form-builder schema. You can easily reference built-in validations or quickly write your own custom or advanced validation.

#### 🚀 Dynamic Data
Built with dyanmic complex usecases in mind, you can easily manupilate the form structure + data through built in events.

#### 💤 Silent Validation
This form-builder automatically emits a state-change event whenever the internal state is modified, this gives you access to  the validation state of the form builder silently (i.e. Without displaying validation messages). 

This helps in custom or advanced scenarios like calling external APIs, modifying the form layout etc, based on user interactions

#### 🎨 Custom designs
You can pass custom markup to render custom designs for titles, actions, help text, content, etc

#### 🍭 Flow components and themes
Built on [flow-core](https://github.com/cldcvr/flow-core) gives you accesss to all themes and components like emoji-picker, datetime-picker , suggestions ,file-upload,multi-select etc.

#### 🛠️ Structural API co-relation
Structural correlation involves defining the data structure that will be transmitted between the frontend and backend, including the format and type of data. To achieve this, we leverage objects and arrays to support any type api payload format. This reduces the complex task of transpiling form builder output to the backend API payload format.


<br>

# Demo
Head over to [Flow form builder Storybook](https://flow.cldcvr.com/form-builder/index.html?path=/story/components-f-form-builder--playground) for a demo. 

<br>

# Getting started

Flow form builder is built on [Flow](https://flow.cldcvr.com/), an open source design framework. To run form builder, please make sure that you have [Flow core](https://github.com/cldcvr/flow-core) as part of your project.

<!-- During installation if you run into any issues, head over to our [known issues + solutions document](https://github.com/cldcvr/flow-form-builder/blob/main/KNOWN_SOLUTIONS.md) to see if a solution already exists. -->

**Note:** If you already have Flow packages installed, please update to the latest versions

**Note:** If you do not have an existing front-end project, you can quickly create one from a [flow starter kit](https://github.com/cldcvr/flow-core#starter-kits). 

<br>

## Installation

### 1️⃣ Install flow form builder dependency
```
yarn add @cldcvr/flow-form-builder
```
**Note:** after installation, re-start your application.

<br>

### 2️⃣ Import styles/CSS 
For **Vue JS:** 
Paste the below snippet after the closing `<template>` tag in your `App.vue` file
```html
<style>
 @import "@cldcvr/flow-form-builder/dist/style.css";
</style> 
```
<details>
<summary>For React</summary>

**React:** Paste the below snippet in `src/index.tsx` or `index.jsx` file
```Javascript
import "@cldcvr/flow-form-builder/dist/style.css";
```
</details>

<details><summary>For Angular</summary>

**Angular:** Add css file path in `angular.json` in `styles` property array.

```json
"styles": ["@cldcvr/flow-form-builder/dist/style.css"],
```
</details>

<br>

### 3️⃣ Import flow-form-builder into your project

Paste the below snippet in your project and add your application startup/runtime code to it. 

**Note:** This is required to register Flow elements error-free. We achieve this by importing all flow packages asynchronously and then starting up your application.

For **Vue JS:** 
Paste the below snippet in your project, for `src/main.ts` or `main.js`
```javascript
import("@cldcvr/flow-core").then(async () => {
	await import('@cldcvr/flow-form-builder');
	//add your application startup/runtime code here **
});
```

<details>
<summary>For React</summary>

Paste the below snippet in your project, for `src/main.ts`

```javascript
import("@cldcvr/flow-core").then(async () => {
	await import("@cldcvr/flow-form-builder");
	//add your application startup/runtime code here **
});
```
</details>

<details><summary>For Angular</summary>

Paste the below snippet in your project, for `src/index.tsx` or `index.jsx`

</details>

<br>

### 4️⃣ For a typescript enabled project (optional)

**Note:** After adding, re-start your application. Make sure you are using version >4.5

**For Vue 3:**
Copy paste below import types in your `main.ts` file.
```Javascript
import "@cldcvr/flow-form-builder/dist/types/vue3";
```
<details>
<summary>For Vue 2</summary>

Copy paste below import types in your `main.ts` file.

```Javascript
import "@cldcvr/flow-form-builder/dist/types/vue2";
```
</details>

<details>
<summary>For React</summary>

**React**: Include react type in `tsconfig.json` file like below.
```json
"include": ["src", "./node_modules/@cldcvr/flow-form-builder/dist/types/react.ts"]
```
</details>
<br>

# Sample code
We have created a sample form along with it's schema to get you going, simply copy paste the below language code block in your **VueJS** project.

## Template
```html
<template>
  <f-div padding="large" height="100%" overflow="scroll">
    <f-form-builder
      ref="form"
      :field.prop="field"
      :values.prop="values"
      @submit="handleSubmit"
      @state-change="handleStateChange"
      @input="handleInput"
    >
      <f-div width="200px">
        <f-button
          :disabled="state?.isValid ? false : true"
          label="Submit"
          type="submit"
        ></f-button>
      </f-div>
    </f-form-builder>
  </f-div>
</template>
```

## Schema
```Javascript
<script lang="ts">
import {
  FormBuilderField,
  FormBuilderState,
  FormBuilderValues,
} from "@cldcvr/flow-form-builder";
import { defineComponent } from "vue";

export default defineComponent({
  name: "FlowFormBuilder",
  data(): {
    field: FormBuilderField;
    state: FormBuilderState | null;
    values: FormBuilderValues | undefined;
  } {
    return {
      field: {
        type: "object",
        direction: "vertical",
        fieldSeparator: true,
        fields: {
          selectBox: {
            label: {
              title: "Multi-select Box",
            },
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
          textField: {
            label: {
              title: "Text Field",
            },
            type: "text",
            helperText: "This field is a required field",
            validationRules: [
              {
                name: "required",
              },
            ],
          },
          switchButton: {
            type: "switchButton",
            validationRules: [
              {
                name: "required",
              },
            ],
          },
          radio: {
            type: "radio",
            label: {
              title: "Radios",
            },
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

          checkboxField: {
            type: "checkbox",
            direction: "horizontal",
            label: {
              title: "Check/Uncheck options",
              description: "this my checkbox",
            },
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
          textAreaField: {
            type: "textarea",
            label: {
              title: "Textarea Field",
            },
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
          nestedObject: {
            type: "object",
            label: {
              title: "Nested Object",
            },
            fields: {
              username: {
                label: {
                  title: "Username",
                },
                type: "text",
                validationRules: [{ name: "required" }],
              },
              emoji: {
                label: {
                  title: "Emoji",
                },
                type: "emoji",
                validationRules: [{ name: "required" }],
              },
            },
          },
          nestedArray: {
            type: "array",
            label: {
              title: "Nested array",
              description: "Click on + button to add more",
            },
            field: {
              type: "text",
              validationRules: [
                {
                  name: "required",
                },
              ],
            },
          },
        },
      },
      values: { textField: "vikas" },
      state: null,
    };
  },
  methods: {
    handleSubmit(event: CustomEvent) {
      console.log("Submit", event);
    },
    handleStateChange(event: CustomEvent) {
      this.state = event.detail as FormBuilderState;
      console.log(this.state);
    },
    handleInput(event: CustomEvent) {
      // console.log(event.detail);
      this.values = event.detail as FormBuilderValues;
    },
  },
});
</script>
```
</p>


Once it's running, you will see a rendered form like the image below.

![Screenshot 2023-04-13 at 3 59 54 PM](https://user-images.githubusercontent.com/2121451/231734039-b63dde6a-e427-4300-8ebb-6ac7e6a43f10.png)

</details>


# Properties

Head over to [Flow form builder Storybook](https://flow.cldcvr.com/form-builder/index.html?path=/story/components-f-form-builder--playground) for all properties and playground.
