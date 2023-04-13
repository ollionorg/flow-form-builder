# Flow Form builder
The Flow form builder is built on the Flow design framework ([website](https://flow.cldcvr.com/) / [github](https://github.com/cldcvr/flow-core))

## Benefits / Features

#### Speed + Flexibility
Quickly create and customize your form through the form builder schema. Built with developers in mind, the schema is simple and easy to use.

#### TypeScript Support
Out of the box TS support.

#### Built-in + Custom Validation
Validation is natively built and integrated throught the form-builder schema. You can easily reference built-in validations or quickly write your own custom or advanced validation.

#### Dynamic Data
Built with dyanmic complex usecases in mind, you can easily manupilate the form structure + data through built in events.

#### Silent Validation
This form-builder automatically emits a state-change event whenever the internal state is modified, this gives you access to  the validation state of the form builder silently (i.e. Without displaying validation messages). 

This helps in custom or advanced scenarios like calling external APIs, modifying the form layout etc, based on user interactions

#### Custom designs
You can pass custom markup to render custom designs for titles, actions, help text, content, etc

#### Flow components and themes
Built on [flow-core](https://github.com/cldcvr/flow-core) gives you accesss to all themes and components like emoji-picker, datetime-picker , suggestions ,file-upload,multi-select etc.

#### Structural API co-relation
Structural correlation involves defining the data structure that will be transmitted between the frontend and backend, including the format and type of data. To achieve this, we leverage objects and arrays to support any type api payload format. This reduces the complex task of transpiling form builder output to the backend API payload format.


<br>

# Demo
Head over to [Flow form builder Storybook](https://flow.cldcvr.com/form-builder/index.html?path=/story/components-f-form-builder--playground) for a demo. 

<br>

# Getting started

Flow form builder is built on [Flow](https://flow.cldcvr.com/), an open source design framework. To run lineage, please make sure that you have [Flow core](https://github.com/cldcvr/flow-core) as part of your project.

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
import "@cldcvr/flow-lineage/dist/types/vue3";
```
<details>
<summary>For Vue 2</summary>

Copy paste below import types in your `main.ts` file.

```Javascript
import "@cldcvr/flow-lineage/dist/types/vue2";
```
</details>

<details>
<summary>For React</summary>

**React**: Include react type in `tsconfig.json` file like below.
```json
"include": ["src", "./node_modules/@cldcvr/flow-lineage/dist/types/react.ts"]
```
</details>
<br>

# Sample code (Vue JS)
We have created a sample form along with it's schema to get you going, simply copy paste the below language code block in your VueJS project.

## Template
```html
<template>
  @vikas is this required?
</template>
```

## Schema
```Javascript
	{
		type:"object",
		direction:"vertical",
		fields:{
			firstname:{
				type:"text"
			},
			lastname:{
				type:"text"
			},
			hobbies:{
				type:"array",
				field:{
					type:"text"
				}
			},
			addresses:{
				type:"array",
				field:{
					type:"object",
					fields:{
						houseno:{
							type:"text"
						},
						street:{
							type:"text"
						},
						city:{
							type:"text"
						}
					}
				}
			},
		}
	}
```
</p>


Once it's running, you will see a rendered form like the image below.

![image (10)](https://user-images.githubusercontent.com/2121451/211773535-3fbc3b2b-b962-4cb3-9713-d50906b88243.png)


</details>


# Properties

Head over to [Flow form builder Storybook](https://flow.cldcvr.com/form-builder/index.html?path=/story/components-f-form-builder--playground) for all properties and playground.




### Features ( compared to our flow v1 formbuilder + all other open source formbuilder.)
- Full typescript support. (Typescript reduces all compile time errors)
- It accepts `field` and `values` in separate props for better DX.
- `field` and `values` supports nested data that means any type of values we can build through formbuilder.
  - For example i want to generate `values` like below
    ```Javascript
		{
			firstname:"Tony",
			lastname:"Stark",
			hobbies:["cricket","football"],
			addresses:[
				{
					houseno:"101",
					street:"MGRoad",
					city:"Pune"
				},
				{
					houseno:"401",
					street:"Prabhat Road",
					city:"Thane"
				}
			]
		}
	```

	Then my field will look like this
	```Javascript
	{
		type:"object",
		direction:"vertical",
		fields:{
			firstname:{
				type:"text"
			},
			lastname:{
				type:"text"
			},
			hobbies:{
				type:"array",
				field:{
					type:"text"
				}
			},
			addresses:{
				type:"array",
				field:{
					type:"object",
					fields:{
						houseno:{
							type:"text"
						},
						street:{
							type:"text"
						},
						city:{
							type:"text"
						}
					}
				}
			},
		}
	}
	```
- Baked with built in validaiton module, which supports `custom` validaiton for advanced usecases.
- With the help of `array` field, we can build dynamic add/remove feature.
- It saves 50 - 60% of devs time for building any form related use cases.

### Features inherited from `flow-core`
- Framework agnostic.
- Themeable (out-of-the-boxdark and light supported) 