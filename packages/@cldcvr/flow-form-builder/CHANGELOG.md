<h4 class="margin-btm-8">Release Notes</h4>
<hr class="margin-btm-32" />
<p class="margin-btm-24">All notable changes to this project will be documented in this file. See <a>Conventional Commits</a> for commit guidelines. </p>

# Change Log

## [1.5.5] - 2023-03-31

### Bug fixes
- umd : `undefined` check added on validation state.

## [1.5.4] - 2023-03-31

### Bug fixes
- `undefined` check added on field.

## [1.5.3] - 2023-03-31

### Improvements
- `umd` bundle added in package.
## [1.5.2] - 2023-03-23

### Bug fixes
- `emoji` category selection closes popover.

## [1.5.1] - 2023-03-23

### Bug fixes
- `state-change` does not emit deep inner element's validation messages.

## [1.5.0] - 2023-03-23

### Features
- `hidden` field type support added.

### Improvements
- `showWhen` updated to more generic typescript type.
- `button`,`icon-button` updated to support `variant`,`category`,`size`.
## [1.4.4] - 2023-03-21

### Improvements
- Typescript types error fixed for`FDividerState`.
## [1.4.3] - 2023-03-20

### Improvements
- `data-qa-` updated on + - button in `f-form-array`.

## [1.4.2] - 2023-03-17

### Bug fixes
- form render bug fixed.
## [1.4.1] - 2023-03-17

### Bug fixes
- `label.title` not used in error messages.

## [1.4.0] - 2023-03-13

### Features
- `emoji` field added.
## [1.3.0] - 2023-03-13

### Features
- `separator` field added.

## [1.2.11] - 2023-03-09

### Improvements
- Alignment of +, - actions in array field fixed.
## [1.2.10] - 2023-03-09

### Improvements
- Alignment of +, - actions in array field fixed.

## [1.2.9] - 2023-03-09

### Improvements
- Alignment of +, - actions in array field fixed.
## [1.2.8-beta] - 2023-03-07

### Improvements
- `data-qa-*` testing.

## [1.2.7] - 2023-03-07

### Improvements
- UX improvements.

## [1.2.6] - 2023-03-06

### Improvements
- `InfoIcon` tooltip behavior updated.

## [1.2.5] - 2023-03-02

### Improvements
- `allowEmpty` added for array field.

## [1.2.4] - 2023-03-02

### Features
- `suggest` and `file` field implemented.
### Improvements

- `data-qa-*` attributes added.
## [1.2.3] - 2023-02-27

### Improvements

- `value` assignemnt logic updated.

## [1.2.2] - 2023-02-26

### Improvements

- `debounce` added in input event.

## [1.2.1] - 2023-02-26

### Improvements

- `f-form-object`, `f-form-array` css fixed.
## [1.2.0] - 2023-02-23

### Improvements

- `id` made mandatory in checbox and radio options.
## [1.1.9] - 2023-02-22

### Improvements

- `min`, `max`,`min-value`,`max-value`, `regex` validation rules added.

## [1.1.8] - 2023-02-22

### Improvements

- `f-radio-group` and `f-checkbox-group` options and value types updated.
## [1.1.7] - 2023-02-22

### Improvements

- default validations added for `url` and `email` fields.
## [1.1.6] - 2023-02-21

### Improvements

- `variant`, `category`, `size`, `gap` propogation to all inputs.
## [1.1.5] - 2023-02-21

### Improvements

- `label` property added
- `suffixWhen` implementation for text fields.
## [1.1.4] - 2023-02-21

### Bug Fix

- value property renamed to values for vue2 bug
## [1.1.3] - 2023-02-20

### Bug Fix

- setting reflect false on value prop of formbuilder

## [1.1.2] - 2023-02-20

### Bug Fix

- setting reflect false on value prop of formbuilder
## [1.1.1] - 2023-02-20

### Improvements

- setting reflect false on value prop of formbuilder

## [1.1.0] - 2023-02-20

### Improvements

- Schema and architecture changed
## [1.0.0] - 2023-02-15

### Improvements

- `button`, `icon-button` field types added.
- `canDuplicate` feature implemented.
- `type` property added to group which will have either 2 values `object` | `array`.
- `iconTooltip` implemented.
- All code segregated.
- few unit tests added.
- `email`, `between` validation rules added.
- reactivity added for group addition or deletion from consumer.
- multiple event binding issue fixed.

## [0.1.1] - 2023-01-01

### Improvements

- addition of `suffixWhen`conditional prop in schema to show suffix conditionaly.

### Bug fixes

- Vue specific bug fix for `sync` and two way data binding in `f-form-builder`

## [0.1.0] - 2023-01-31

### Bug fixes

- Redio Options type bug fixed.

### Features

- Form Input Elements integration.

## [0.0.7] - 2023-01-05

### Improvements

- package renamed from `@cldcvr/flow-formbuilder` to `@cldcvr/flow-form-builder`

## [0.0.6] - 2023-01-04

### Bug Fixes

- types location updated in package.json.

## [0.0.5] - 2022-12-28

### Features

- spacing updated between fields and groups.

## [0.0.4] - 2022-12-27

### Features

- `input` styled with flow-core's variables.

## [0.0.3] - 2022-12-27

### Features

- Default slot added to add extra eleemnts after groups.
- `submit` method added to submit from using JS.
- `state` value emiitted with new object.

## [0.0.2] - 2022-12-27

### Features

- releasing to test in `vue`.

## [0.0.1] - 2022-12-20

### Initial release

- sample component added.
