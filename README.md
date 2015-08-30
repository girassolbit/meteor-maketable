MakeTable
========

Create your HTML tables from objects in Blaze!

## Installation

Install using Meteor's package management system:

```bash
> meteor add judsonsilva:maketable
```

## Testing (if you clone the package)
```bash 
> meteor test-packages ./
```

# How to use

## Using the blaze helper
You can use the MakeTable from a helper

Just do it:
```handlebars
	<template name="myTemplate">
		{{ makeTable elements tableClass="my-class" }}
	</template>
```
```js
Template.myTemplate.helpers({
	elements: function(){
		return {
			"Names": ["John Doe", "Bob Marley"],
			"Emails": ["john@example.com", "bob@example.com"]
		};
	}
});
```
Results:
```html
	<template name="myTemplate">
		<table class="my-class">
			<thead>
				<tr>
					<th>Names</th>
					<th>Emails</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>John Doe</td>
					<td>john@example.com</td>
				</tr>
				<tr>
					<td>Bob Marley</td>
					<td>bob@example.com</td>
				</tr>
			</tbody>
		</table>
	</template>
```