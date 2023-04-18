### Formbuilder properties

<table>
 <thead>
	<tr>
		<th>Name</th>
		<th>Type</th>
		<th>Options</th>
		<th>Description</th>
		<th>Default</th>
	</tr>
 </thead>
 <tbody>
	<tr>
		<td>name</td>
		<td>string</td>
		<td></td>
		<td>name of form</td>
		<td></td>
	</tr>
	<tr>
		<td><a href="#label">label</a></td>
		<td>object</td>
		<td></td>
		<td>label will display on top of form</td>
		<td></td>
	</tr>
	<tr>
		<td><a href="#field">field</a></td>
		<td>object</td>
		<td></td>
		<td>field to render inside form</td>
		<td></td>
	</tr>
	<tr>
		<td>values</td>
		<td>object</td>
		<td></td>
		<td>values to populate fields</td>
		<td></td>
	</tr>
	<tr>
		<td>size</td>
		<td>string</td>
		<td>"medium" | "small"</td>
		<td>size of fields</td>
		<td>"medium"</td>
	</tr>
	<tr>
		<td>variant</td>
		<td>string</td>
		<td>"curved" | "round" | "block"</td>
		<td>variant of fields</td>
		<td>"curved"</td>
	</tr>
	<tr>
		<td>category</td>
		<td>string</td>
		<td> "fill" | "outline" | "transparent"</td>
		<td>category of fields</td>
		<td>"fill"</td>
	</tr>
	<tr>
		<td>gap</td>
		<td>string</td>
		<td> "large" | "medium" | "small" | "x-small"</td>
		<td>gap/space between fields</td>
		<td>"medium"</td>
	</tr>
 </tbody>
</table>

<br/>

<hr/>


### field

<table>
 <thead>
	<tr>
		<th>Name</th>
		<th>Type</th>
		<th>Options</th>
		<th>Description</th>
		<th>Default</th>
	</tr>
 </thead>
 <tbody>
	<tr>
		<td>type</td>
		<td>string</td>
		<td><a href="#object">"object"</a> |<a href="#array"> "array"</a> | "hidden" | <a href="#array">"separator"</a> | <a href="#input">"text"</a> | <a href="#input">"email"</a> | <a href="#input">"password"</a> | <a href="#input">"url"</a> | <a href="#input">"tel"</a> | <a href="#input">"number"</a> | <a href="#emoji">"emoji"</a> | <a href="#suggest">"suggest"</a> | <a href="#file">"file"</a> | <a href="#checkbox">"checkbox"</a> | <a href="#radio">"radio"</a> | "switchButton" | <a href="#select">"select"</a> | <a href="#textarea">"textarea"</a> | <a href="#button">"button"</a> | <a href="#icon-button">"icon-button"</a></td>
		<td>Type of field to render</td>
		<td></td>
	</tr>
	<tr>
		<td><a href="#label">label</a></td>
		<td>object</td>
		<td></td>
		<td>label to display on top </td>
		<td>undefined</td>
	</tr>
	<tr>
		<td>id</td>
		<td>string</td>
		<td></td>
		<td>id to uniquely indentify in DOM</td>
		<td>undefined</td>
	</tr>
	<tr>
		<td>state</td>
		<td>string</td>
		<td>"default" | "success" | "danger" | "warning" | "primary"</td>
		<td>state will apply based on individual field UX</td>
		<td>"default"</td>
	</tr>
	<tr>
		<td>className</td>
		<td>string</td>
		<td></td>
		<td>Additional css class names for any customisation</td>
		<td>undefined</td>
	</tr>
	<tr>
		<td>qaId</td>
		<td>string</td>
		<td></td>
		<td>qaId used for xpath in QA automation </td>
		<td>undefined</td>
	</tr>
	<tr>
		<td>validationRules</td>
		<td>object[]</td>
		<td></td>
		<td></td>
		<td>undefined</td>
	</tr>
	<tr>
		<td>disabled</td>
		<td>boolean</td>
		<td></td>
		<td></td>
		<td>false</td>
	</tr>
	<tr>
		<td>helperText</td>
		<td>string | <a href="https://lit.dev/docs/templates/overview/">HTMLTemplateResult</a></td>
		<td></td>
		<td></td>
		<td>undefined</td>
	</tr>
	<tr>
		<td>showWhen</td>
		<td>function</td>
		<td></td>
		<td></td>
		<td>undefined</td>
	</tr>
	<tr>
		<td>onClick</td>
		<td>function</td>
		<td></td>
		<td></td>
		<td>undefined</td>
	</tr>
	<tr>
		<td>onInput</td>
		<td>function</td>
		<td></td>
		<td></td>
		<td>undefined</td>
	</tr>
	<tr>
		<td>onFocus</td>
		<td>function</td>
		<td></td>
		<td></td>
		<td>undefined</td>
	</tr>
	<tr>
		<td>onKeyPress</td>
		<td>function</td>
		<td></td>
		<td></td>
		<td>undefined</td>
	</tr>
	<tr>
		<td>onKeyDown</td>
		<td>function</td>
		<td></td>
		<td></td>
		<td>undefined</td>
	</tr>
	<tr>
		<td>onKeyUp</td>
		<td>function</td>
		<td></td>
		<td></td>
		<td>undefined</td>
	</tr>
	<tr>
		<td>onMouseOver</td>
		<td>function</td>
		<td></td>
		<td></td>
		<td>undefined</td>
	</tr>
 </tbody>
</table>

<br/>

<hr/>

### object

<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Type</th>
			<th>Options</th>
			<th>Description</th>
			<th>Default</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>direction</td>
			<td>string</td>
			<td>"vertical" | "horizontal"</td>
			<td>Field rendering direction</td>
			<td>"vertical"</td>
		</tr>
		<tr>
			<td>gap</td>
			<td>string</td>
			<td>"small" | "medium" | "large" | "x-small"</td>
			<td>space between fields</td>
			<td>"small"</td>
		</tr>
		<tr>
			<td>variant</td>
			<td>string</td>
			<td>"normal" | "compact"</td>
			<td>In compact version they get stick to each other</td>
			<td>"normal"</td>
		</tr>
		<tr>
			<td>isCollapsible</td>
			<td>boolean</td>
			<td></td>
			<td>All fields will wrap in accordion</td>
			<td>false</td>
		</tr>
		<tr>
			<td>isCollapsed</td>
			<td>boolean</td>
			<td></td>
			<td>is accordion open or closed bydefault</td>
			<td>false</td>
		</tr>
		<tr>
			<td>fields</td>
			<td>object</td>
			<td></td>
			<td>key value pair of string and field object</td>
			<td></td>
		</tr>
		<tr>
			<td>fieldSeparator</td>
			<td>boolean</td>
			<td></td>
			<td>It will add line between the fields</td>
			<td>false</td>
		</tr>
	</tbody>
</table>

<br/>

<hr/>

### array

<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Type</th>
			<th>Options</th>
			<th>Description</th>
			<th>Default</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><a href="#field">field</a></td>
			<td>object</td>
			<td></td>
			<td>field to use for array of values</td>
			<td></td>
		</tr>
		<tr>
			<td><a href="#label">label</a></td>
			<td>object</td>
			<td></td>
			<td>label to display on top</td>
			<td></td>
		</tr>
		<tr>
			<td>allowEmpty</td>
			<td>boolean</td>
			<td></td>
			<td>when true it will display + icon without any field</td>
			<td></td>
		</tr>
	</tbody>
</table>

<br/>

<hr/>

### label

<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Type</th>
			<th>Options</th>
			<th>Description</th>
			<th>Default</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>title</td>
			<td>string | <a href="https://lit.dev/docs/templates/overview/">HTMLTemplateResult</a></td>
			<td></td>
			<td>title to display on top of field. we can use html markup for advance usecase using lit <a href="https://lit.dev/docs/templates/overview/">template syntax</a></td>
			<td></td>
		</tr>
		<tr>
			<td>description</td>
			<td>string</td>
			<td></td>
			<td>description will display bottom of title</td>
			<td></td>
		</tr>
		<tr>
			<td>iconTooltip</td>
			<td>string</td>
			<td></td>
			<td>It will display ? icon with tooltip to show more information about field</td>
			<td></td>
		</tr>
		<tr>
			<td>subTitle</td>
			<td>string | <a href="https://lit.dev/docs/templates/overview/">HTMLTemplateResult</a></td>
			<td></td>
			<td>It will on extreme right of field. we can use html markup for advance usecase using lit <a href="https://lit.dev/docs/templates/overview/">template syntax</a></td>
			<td></td>
		</tr>
	</tbody>
</table>

<br/>

<hr/>

### input

<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Type</th>
			<th>Options</th>
			<th>Description</th>
			<th>Default</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>placeholder</td>
			<td>string</td>
			<td></td>
			<td>Display placeholder string when there is no value in field</td>
			<td></td>
		</tr>
		<tr>
			<td>iconLeft</td>
			<td>string</td>
			<td></td>
			<td>Icon to display left side of input</td>
			<td></td>
		</tr>
		<tr>
			<td>iconRight</td>
			<td>string</td>
			<td></td>
			<td>Icon to display right side of input</td>
			<td></td>
		</tr>
		<tr>
			<td>prefix</td>
			<td>string</td>
			<td></td>
			<td>Text to display left side of input</td>
			<td></td>
		</tr>
		<tr>
			<td>suffix</td>
			<td>string</td>
			<td></td>
			<td>Text to display right side of input</td>
			<td></td>
		</tr>
		<tr>
			<td>maxLength</td>
			<td>number</td>
			<td></td>
			<td>Max length of user's input</td>
			<td></td>
		</tr>
		<tr>
			<td>loading</td>
			<td>boolean</td>
			<td></td>
			<td>loader will display inside input</td>
			<td>false</td>
		</tr>
		<tr>
			<td>readonly</td>
			<td>boolean</td>
			<td></td>
			<td>input becomes readonly</td>
			<td>false</td>
		</tr>
		<tr>
			<td>clear</td>
			<td>boolean</td>
			<td></td>
			<td>X icon displays on right side to clear values</td>
			<td>true</td>
		</tr>
		<tr>
			<td>autofocus</td>
			<td>boolean</td>
			<td></td>
			<td>input gets focus when set to true</td>
			<td>false</td>
		</tr>
		<tr>
			<td>autocomplete</td>
			<td>string</td>
			<td></td>
			<td><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete">learn more</a></td>
			<td></td>
		</tr>
		<tr>
			<td>suffixWhen</td>
			<td>function</td>
			<td>(value) => boolean</td>
			<td>call back function whether to display suffix</td>
			<td></td>
		</tr>
	</tbody>
</table>

<br/>

<hr/>

### separator

<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Type</th>
			<th>Options</th>
			<th>Description</th>
			<th>Default</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>title</td>
			<td>string</td>
			<td></td>
			<td>It will displayed in center of line</td>
			<td></td>
		</tr>
		<tr>
			<td>direction</td>
			<td>string</td>
			<td>"vertical" | "horizontal"</td>
			<td>Direction of separator line</td>
			<td></td>
		</tr>
	</tbody>
</table>

<br/>

<hr/>

### emoji 

<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Type</th>
			<th>Options</th>
			<th>Description</th>
			<th>Default</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>placeholder</td>
			<td>string</td>
			<td></td>
			<td>placeholder icon or emoji to display</td>
			<td></td>
		</tr>
		<tr>
			<td>recent</td>
			<td>string[]</td>
			<td></td>
			<td>recent emoji to display in popover</td>
			<td></td>
		</tr>
		<tr>
			<td>include</td>
			<td>string[]</td>
			<td>"activity" | "flags" | "foods" | "frequent" | "nature" | "objects" | "people" | "places" | "symbols"</td>
			<td>include categories of emoji (by default all included)</td>
			<td></td>
		</tr>
		<tr>
			<td>exclude</td>
			<td>string[]</td>
			<td>"activity" | "flags" | "foods" | "frequent" | "nature" | "objects" | "people" | "places" | "symbols"</td>
			<td>exclude categories of emoji (by default nothing is excluded)</td>
			<td></td>
		</tr>
		<tr>
			<td>excludeEmojis</td>
			<td>string[]</td>
			<td></td>
			<td>array of emoji to exclude</td>
			<td></td>
		</tr>
		<tr>
			<td>closeOnSelect</td>
			<td>boolean</td>
			<td></td>
			<td>it will close popover on selecting emoji</td>
			<td>true</td>
		</tr>
		<tr>
			<td>clear</td>
			<td>boolean</td>
			<td></td>
			<td>X icon will display to clear selection</td>
			<td>true</td>
		</tr>
		<tr>
			<td>disabled</td>
			<td>boolean</td>
			<td></td>
			<td>set true to disbale field</td>
			<td>false</td>
		</tr>
	</tbody>
</table>

<br/>

<hr/>

### suggest 

<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Type</th>
			<th>Options</th>
			<th>Description</th>
			<th>Default</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>placeholder</td>
			<td>string</td>
			<td></td>
			<td>placeholder string to display when no value</td>
			<td></td>
		</tr>
		<tr>
			<td>iconLeft</td>
			<td>string</td>
			<td></td>
			<td>Icon to display left side of input</td>
			<td></td>
		</tr>
		<tr>
			<td>iconRight</td>
			<td>string</td>
			<td></td>
			<td>Icon to display right side of input</td>
			<td></td>
		</tr>
		<tr>
			<td>prefix</td>
			<td>string</td>
			<td></td>
			<td>Text to display left side of input</td>
			<td></td>
		</tr>
		<tr>
			<td>suffix</td>
			<td>string</td>
			<td></td>
			<td>Text to display right side of input</td>
			<td></td>
		</tr>
		<tr>
			<td>maxLength</td>
			<td>number</td>
			<td></td>
			<td>Max length of user's input</td>
			<td></td>
		</tr>
		<tr>
			<td>loading</td>
			<td>boolean</td>
			<td></td>
			<td>loader will display inside input</td>
			<td>false</td>
		</tr>
		<tr>
			<td>readonly</td>
			<td>boolean</td>
			<td></td>
			<td>input becomes readonly</td>
			<td>false</td>
		</tr>
		<tr>
			<td>clear</td>
			<td>boolean</td>
			<td></td>
			<td>X icon displays on right side to clear values</td>
			<td>true</td>
		</tr>
		<tr>
			<td>suffixWhen</td>
			<td>function</td>
			<td>(value) => boolean</td>
			<td>call back function whether to display suffix</td>
			<td></td>
		</tr>
		<tr>
			<td>suggestions</td>
			<td>string[]</td>
			<td></td>
			<td>Array of string to display suggestions</td>
			<td></td>
		</tr>
	</tbody>
</table>

<br/>

<hr/>

### file 

<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Type</th>
			<th>Options</th>
			<th>Description</th>
			<th>Default</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>placeholder</td>
			<td>string</td>
			<td></td>
			<td>placeholder string to display when no value</td>
			<td></td>
		</tr>
		<tr>
			<td>multiple</td>
			<td>boolean</td>
			<td></td>
			<td>is multiple files allowed</td>
			<td></td>
		</tr>
		<tr>
			<td>fileType</td>
			<td>string</td>
			<td></td>
			<td>provide specific file type to accept else it will accept all file types</td>
			<td></td>
		</tr>
		<tr>
			<td>maxSize</td>
			<td>string</td>
			<td>`${number} B` | `${number} KB` | `${number} MB` | `${number} GB` | `${number} TB`</td>
			<td>max file size to accept</td>
			<td></td>
		</tr>
		<tr>
			<td>disabled</td>
			<td>boolean</td>
			<td></td>
			<td>set true to disable field</td>
			<td></td>
		</tr>
		<tr>
			<td>loading</td>
			<td>boolean</td>
			<td></td>
			<td>displays loader when set it to true</td>
			<td></td>
		</tr>
	</tbody>
</table>

<br/>

<hr/>

### option

<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Type</th>
			<th>Options</th>
			<th>Description</th>
			<th>Default</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>id</td>
			<td>string</td>
			<td></td>
			<td>id to uniquely identify option</td>
			<td></td>
		</tr>
		<tr>
			<td>title</td>
			<td>string | <a href="https://lit.dev/docs/templates/overview/">HTMLTemplateResult</a></td>
			<td></td>
			<td>title to display on top of field. we can use html markup for advance usecase using lit <a href="https://lit.dev/docs/templates/overview/">template syntax</a></td>
			<td></td>
		</tr>
		<tr>
			<td>description</td>
			<td>string</td>
			<td></td>
			<td>description will display bottom of title</td>
			<td></td>
		</tr>
		<tr>
			<td>iconTooltip</td>
			<td>string</td>
			<td></td>
			<td>It will display ? icon with tooltip to show more information about field</td>
			<td></td>
		</tr>
		<tr>
			<td>subTitle</td>
			<td>string</td>
			<td></td>
			<td>It will on extreme right of field. </td>
			<td></td>
		</tr>
	</tbody>
</table>

<br/>

<hr/>

### checkbox

<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Type</th>
			<th>Options</th>
			<th>Description</th>
			<th>Default</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>options</td>
			<td>object[]</td>
			<td></td>
			<td>array of <a href="#option">option</a></td>
			<td></td>
		</tr>
		<tr>
			<td>direction</td>
			<td>string</td>
			<td>"vertical" | "horizontal"</td>
			<td>direciton to display options</td>
			<td></td>
		</tr>
		<tr>
			<td>gap</td>
			<td>string</td>
			<td>"large" | "medium" | "small" | "x-small"</td>
			<td>gap between options</td>
			<td>small</td>
		</tr>
	</tbody>
</table>

<br/>

<hr/>

### radio

<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Type</th>
			<th>Options</th>
			<th>Description</th>
			<th>Default</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>options</td>
			<td>object[]</td>
			<td></td>
			<td>array of <a href="#option">option</a></td>
			<td></td>
		</tr>
		<tr>
			<td>direction</td>
			<td>string</td>
			<td>"vertical" | "horizontal"</td>
			<td>direciton to display options</td>
			<td></td>
		</tr>
		<tr>
			<td>gap</td>
			<td>string</td>
			<td>"large" | "medium" | "small" | "x-small"</td>
			<td>gap between options</td>
			<td>small</td>
		</tr>
	</tbody>
</table>

<br/>

<hr/>

### select

<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Type</th>
			<th>Options</th>
			<th>Description</th>
			<th>Default</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>selection</td>
			<td>string</td>
			<td>"single" | "multiple"</td>
			<td>option selection type</td>
			<td>"single"</td>
		</tr>
		<tr>
			<td>placeholder</td>
			<td>string</td>
			<td></td>
			<td>placeholder string to display when no value</td>
			<td></td>
		</tr>
		<tr>
			<td>options</td>
			<td>string[] | <a href="#selectoptionobject">object</a>[]</td>
			<td></td>
			<td>options to display</td>
			<td></td>
		</tr>
		<tr>
			<td>optionTemplate</td>
			<td>string</td>
			<td></td>
			<td>HTML markup template for options</td>
			<td></td>
		</tr>
		<tr>
			<td>iconLeft</td>
			<td>string</td>
			<td></td>
			<td>icon name to display on left side of select</td>
			<td></td>
		</tr>
		<tr>
			<td>height</td>
			<td>number</td>
			<td></td>
			<td>height of select field</td>
			<td></td>
		</tr>
		<tr>
			<td>width</td>
			<td>string</td>
			<td></td>
			<td>width of select field</td>
			<td></td>
		</tr>
		<tr>
			<td>searchable</td>
			<td>boolean</td>
			<td></td>
			<td>set true when you want search feature for options</td>
			<td>true</td>
		</tr>
		<tr>
			<td>clear</td>
			<td>boolean</td>
			<td></td>
			<td>set true when you want X icon to clear value</td>
			<td>true</td>
		</tr>
		<tr>
			<td>checkbox</td>
			<td>boolean</td>
			<td></td>
			<td>set true when you want checkbox to select option</td>
			<td>true</td>
		</tr>
		<tr>
			<td>selectionLimit</td>
			<td>number</td>
			<td></td>
			<td>once selection limit reached it will display ...</td>
			<td>2</td>
		</tr>
		<tr>
			<td>createOption</td>
			<td>boolean</td>
			<td></td>
			<td>will create option link when no result found while searching option</td>
			<td>false</td>
		</tr>
	</tbody>
</table>

<br/>

<hr/>

### selectoptionobject

<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Type</th>
			<th>Options</th>
			<th>Description</th>
			<th>Default</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>icon</td>
			<td>string</td>
			<td></td>
			<td>icon name from flow icon library</td>
			<td></td>
		</tr>
		<tr>
			<td>title</td>
			<td>string</td>
			<td></td>
			<td>title of option</td>
			<td></td>
		</tr>
		<tr>
			<td>data</td>
			<td>object</td>
			<td></td>
			<td>additional data used to consume in template</td>
			<td></td>
		</tr>
		<tr>
			<td>qaId</td>
			<td>string</td>
			<td></td>
			<td>used for qa automation</td>
			<td></td>
		</tr>
	</tbody>
</table>

<br/>

<hr/>

### textarea

<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Type</th>
			<th>Options</th>
			<th>Description</th>
			<th>Default</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>placeholder</td>
			<td>string</td>
			<td></td>
			<td>placeholder string to display when no value</td>
			<td></td>
		</tr>
		<tr>
			<td>maxLength</td>
			<td>number</td>
			<td></td>
			<td>max char allowed</td>
			<td></td>
		</tr>
		<tr>
			<td>readonly</td>
			<td>boolean</td>
			<td></td>
			<td>Used to display readonly textarea</td>
			<td>false</td>
		</tr>
		<tr>
			<td>clear</td>
			<td>boolean</td>
			<td></td>
			<td>Display X icon to clear value</td>
			<td>true</td>
		</tr>
		<tr>
			<td>rows</td>
			<td>string</td>
			<td></td>
			<td>Defines the  no. of rows to display. By default f-text-area provides 3 rows. After 3 rows text area becomes scrollable.</td>
			<td>3</td>
		</tr>
		<tr>
			<td>resizable</td>
			<td>boolean</td>
			<td></td>
			<td>Provides a resize handle on the bottom right of text-area which enables a user to resize the text-area within the parents scope.</td>
			<td>false</td>
		</tr>
	</tbody>
</table>

<br/>

<hr/>

### button

<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Type</th>
			<th>Options</th>
			<th>Description</th>
			<th>Default</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>label</td>
			<td>string</td>
			<td></td>
			<td>label to display inside button</td>
			<td></td>
		</tr>
		<tr>
			<td>category</td>
			<td>string</td>
			<td>"fill" | "outline" | "transparent"</td>
			<td>category of button</td>
			<td>"fill"</td>
		</tr>
		<tr>
			<td>variant</td>
			<td>string</td>
			<td>"round" | "curved" | "block"</td>
			<td>variant of button</td>
			<td>"round"</td>
		</tr>
		<tr>
			<td>size</td>
			<td>string</td>
			<td>"large" | "medium" | "small" | "x-small"</td>
			<td>size of button</td>
			<td>"medium"</td>
		</tr>
		<tr>
			<td>state</td>
			<td>string</td>
			<td>"primary" | "neutral" | "success" | "warning" | "danger" | "inherit" | `custom, ${string}`</td>
			<td>state of button</td>
			<td>"primary"</td>
		</tr>
		<tr>
			<td>iconLeft</td>
			<td>string</td>
			<td></td>
			<td>Icon to display left side of input</td>
			<td></td>
		</tr>
		<tr>
			<td>iconRight</td>
			<td>string</td>
			<td></td>
			<td>Icon to display right side of input</td>
			<td></td>
		</tr>
		<tr>
			<td>counter</td>
			<td>string</td>
			<td></td>
			<td>Counter to display on top of button</td>
			<td></td>
		</tr>
		<tr>
			<td>loading</td>
			<td>boolean</td>
			<td></td>
			<td>set true to display loader</td>
			<td>false</td>
		</tr>
		<tr>
			<td>disabled</td>
			<td>boolean</td>
			<td></td>
			<td>set true to disable button</td>
			<td>false</td>
		</tr>
	</tbody>
</table>

<br/>

<hr/>

### icon-button

<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Type</th>
			<th>Options</th>
			<th>Description</th>
			<th>Default</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>icon</td>
			<td>string</td>
			<td></td>
			<td>icon name to display inside icon-button</td>
			<td></td>
		</tr>
		<tr>
			<td>state</td>
			<td>string</td>
			<td>"primary" | "danger" | "warning" | "success" | "neutral" | "inherit" | `custom, ${string}`</td>
			<td>state of icon-button</td>
			<td>"primary"</td>
		</tr>
		<tr>
			<td>counter</td>
			<td>string</td>
			<td></td>
			<td>Counter to display on top of button</td>
			<td></td>
		</tr>
		<tr>
			<td>loading</td>
			<td>boolean</td>
			<td></td>
			<td>set true to display loader</td>
			<td>false</td>
		</tr>
		<tr>
			<td>disabled</td>
			<td>boolean</td>
			<td></td>
			<td>set true to disable button</td>
			<td>false</td>
		</tr>
		<tr>
			<td>category</td>
			<td>string</td>
			<td>"fill" | "outline" | "transparent"</td>
			<td>category of button</td>
			<td>"fill"</td>
		</tr>
		<tr>
			<td>variant</td>
			<td>string</td>
			<td>"round" | "curved" | "block"</td>
			<td>variant of button</td>
			<td>"round"</td>
		</tr>
		<tr>
			<td>size</td>
			<td>string</td>
			<td>"large" | "medium" | "small" | "x-small"</td>
			<td>size of button</td>
			<td>"medium"</td>
		</tr>
	</tbody>
</table>

<br/>

<hr/>