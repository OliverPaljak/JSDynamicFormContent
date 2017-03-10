# JSDynamicFormContent
Get dynamically form data with vanilla JavaScript.
JSDynamicFormContent doesn't use AJAX or other 'server-side' technologies.

## What are JSDynamicFormContent current features?
JSDynamicFormContent:

1. gets form data and displays it dynamically (duh)
2. works with all form input elements (also with `<select>` and `<textarea>`). Also the input elements can be specifically set.
3. recognizes `required` attribute and shows an error message when one of required fields is empty.
4. recognizes `multiple` attribute and displays it as a list.
5. deals with empty values and names (shows alternative messages)

## How does JSDynamicFormContent work?
JSDynamicFormContent loops through every input element in provided form and displays the name of input and value of the input.

## How to use JSDynamicFormContent?
**First**, you need a form of course. It can contain whatever inputs you want.

**Next**, add JSDynamicFormContent to your website (`<script src="https://raw.githubusercontent.com/OliverPaljak/JSDynamicFormContent/master/dynamic-form-content.min.js" type="text/javascript"></script>`)

**Thirdly**, add your custom script which binds the form with JSDynamicFormContent (`new FormContent(yourForm, inputSelectors, submitButton, outputSection);`)
* inputSelectors - Input elements' (jQuery like) selector - multiple selectors separate with comma
* submitButton - Submit button HTML element (can be outside the form)
* outputSection - HTML element where the form data is finally displayed

You can actually not display the output by providing the `submitButton` parameter value of  `""`. It just won't fire the print function.

`submitButton` isn't fatal getting data from the form. Look at the raw example.
### Examples
1. [Single form](https://htmlpreview.github.io/?https://raw.githubusercontent.com/OliverPaljak/JSDynamicFormContent/master/examples/dynamic-single-form-content-example.html) - [Source](https://github.com/OliverPaljak/JSDynamicFormContent/blob/master/examples/dynamic-single-form-content-example.html)
2. [Multiple forms](http://htmlpreview.github.io/?https://raw.githubusercontent.com/OliverPaljak/JSDynamicFormContent/master/examples/dynamic-multiple-form-content-example.html) - [Source](https://github.com/OliverPaljak/JSDynamicFormContent/blob/master/examples/dynamic-multiple-form-content-example.html)
3. [Raw data](http://htmlpreview.github.io/?https://raw.githubusercontent.com/OliverPaljak/JSDynamicFormContent/master/examples/dynamic-raw-form-content-example.html) - [Source](https://github.com/OliverPaljak/JSDynamicFormContent/blob/master/examples/dynamic-raw-form-content-example.html)

## Bugs or offers
You can contact me through my email at oliver.paljak@ansiveeb.ee or you can open up an issue on github. Always looking to improve my projects :) 

## License
It is (un)licensed under unlicense - so no worries about that.

But if you have some worries for some reasons then refer to unlicense.org
