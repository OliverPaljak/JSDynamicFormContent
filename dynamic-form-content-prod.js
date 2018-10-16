"use strict";

var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/*
 * This is a source file for a simple JavaScript library "JSDynamicFormContent".
 * "JSDynamicFormContent" helps to get form content dynamically from every input element. It is only pure, Vanilla JS.
 *
 * JSDynamicFormContent is released under Unlicense. For more information, please check the (UN)LICENSE.md file or refer to <http://unlicense.org>
 *
 * For how to's and examples visit <https://>
 */

/**
 * Class for getting form content
 *
 * @version 1.0.0
 */
var FormContent = (function() {
  /**
   * Create new form content object
   *
   * @param {HTMLFormElement} formElement Single form element
   * @param {string} inputSelectors Selectors for elements which will be used to read and display data (like jQuery selectors: # for IDs, . for classes and so on). Separate multiple selectors with comas.
   * @param {HTMLButtonElement | HTMLInputElement} submitButton Submit button to display form data (although the type should be always 'button')
   * @param {Element} outputSection Section where the form data is displayed
   * @since 1.0.0
   */
  function FormContent(
    formElement,
    inputSelectors,
    submitButton,
    outputSection
  ) {
    _classCallCheck(this, FormContent);

    /**
     * Disabled elements (values will not be shown in output). Values can be tag names, attribute 'type' values or certain element (inside form)
     *
     * @type {Array}
     * @since 1.0.0
     */
    this.disabledElements = ["button", "reset", "submit"];

    /**
     * Input elements node list (created by inputSelectors)
     *
     * @type {NodeList}
     * @since 1.0.0
     */
    var inputElements = formElement.querySelectorAll(inputSelectors);

    /**
     * Get input elements
     *
     * @see inputElements
     * @return {NodeList} Input elements
     * @since 1.0.0
     */
    this.getInputElements = function() {
      return inputElements;
    };

    /**
     * Get submit button
     *
     * @return {HTMLButtonElement} Submit button
     * @since 1.0.0
     */
    this.getSubmitButton = function() {
      return submitButton;
    };

    /**
     * Get output section
     *
     * @see outputSection
     * @return {NodeList} Output section
     * @since 1.0.0
     */
    this.getOutputSection = function() {
      return outputSection;
    };

    /**
     * Empty input's alternative (print) value
     *
     * @type {string}
     * @since 1.0.0
     */
    this.emptyValueMessage = "Unknown";

    /**
     * Error message (when there is empty required fields)
     *
     * @type {string}
     * @since 1.0.0
     */
    this.errorMessage =
      "<h4 style='color:#FF0000;'>Please fill all the required inputs!</h4>";

    /**
     * Instance for this class
     *
     * @type {FormContent}
     * @since 1.0.0
     */
    var thisInstance = this;

    if (submitButton && outputSection) {
      submitButton.onclick = function() {
        thisInstance.onSubmitButtonClick();
      };
    }
  }

  /**
   * When submit button is clicked
   *
   * @since 1.0.0
   */

  _createClass(FormContent, [
    {
      key: "onSubmitButtonClick",
      value: function onSubmitButtonClick() {
        var outputMessage = this.areRequiredInputsFilled()
          ? this.getFormattedFormContent()
          : this.errorMessage;

        this.printToOutput(outputMessage);
      }

      /**
       * Are all the required inputs/fields filled?
       *
       * @return {boolean}
       * @since 1.0.0
       */
    },
    {
      key: "areRequiredInputsFilled",
      value: function areRequiredInputsFilled() {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (
            var _iterator = this.getInputElements()[Symbol.iterator](), _step;
            !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
            _iteratorNormalCompletion = true
          ) {
            var node = _step.value;

            if (node.required && !node.value) {
              return false;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        return true;
      }

      /**
       * Print/display form data to output element
       *
       * @see getOutputSections()
       * @since 1.0.0
       */
    },
    {
      key: "printToOutput",
      value: function printToOutput(content) {
        this.getOutputSection().innerHTML = content;
      }

      /**
       * Get form content/data which is formatted
       *
       * @return {string} Formatted form content
       * @since 1.0.0
       */
    },
    {
      key: "getFormattedFormContent",
      value: function getFormattedFormContent() {
        var formContent = "";

        var formData = this.getFormData();

        for (var input in formData) {
          formContent += "<b>" + input + "</b>: " + formData[input] + "<br />";
        }

        return formContent;
      }

      /**
       * Get raw form data
       *
       * @return {json} Form data
       * @since 1.0.0
       */
    },
    {
      key: "getFormData",
      value: function getFormData() {
        var formData = {};

        var noNameCounter = 0;

        var formInputs = this.getFormInputs();

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (
            var _iterator2 = formInputs[Symbol.iterator](), _step2;
            !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done);
            _iteratorNormalCompletion2 = true
          ) {
            var input = _step2.value;

            var inputName = input.name || "no_name_element_" + noNameCounter;
            var inputValue =
              input.data || input.value || this.emptyValueMessage;

            if (!input.name) {
              noNameCounter++;
            }

            formData[inputName] = inputValue;
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        return formData;
      }

      /**
       * Get all the form input elements
       *
       * @return {Array} Inputs and values (form data)
       * @since 1.0.0
       */
    },
    {
      key: "getFormInputs",
      value: function getFormInputs() {
        var formInputs = [];

        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (
            var _iterator3 = this.getInputElements()[Symbol.iterator](), _step3;
            !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done);
            _iteratorNormalCompletion3 = true
          ) {
            var input = _step3.value;

            if (
              !this.disabledElements.includes(input.tagName.toLowerCase()) &&
              !this.disabledElements.includes(input.type) &&
              !this.disabledElements.includes(input)
            ) {
              if (input.type === "radio") {
                if (input.checked) {
                  formInputs.push(input);
                }
              } else if (input.type === "checkbox") {
                input.value = input.checked ? true : false;
                formInputs.push(input);
              } else if (input.multiple) {
                formInputs.push(this.getMultipleInput(input));
              } else if (input.value || input.innerHTML) {
                formInputs.push(input);
              } else {
                formInputs.push(input);
              }
            }
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }

        return formInputs;
      }

      /**
       * Get input which has attribute multiple
       *
       * @param {HTMLInputElement} multipleInput Input with attribute multiple
       * @return {HTMLInputElement} Input instance
       * @since 1.0.0
       */
    },
    {
      key: "getMultipleInput",
      value: function getMultipleInput(multipleInput) {
        var inputInstance = document.createElement("input");
        inputInstance.name = multipleInput.name;

        var values = [];

        if (multipleInput.type !== "file") {
          var _iteratorNormalCompletion4 = true;
          var _didIteratorError4 = false;
          var _iteratorError4 = undefined;

          try {
            for (
              var _iterator4 = multipleInput[Symbol.iterator](), _step4;
              !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done);
              _iteratorNormalCompletion4 = true
            ) {
              var option = _step4.value;

              if (option.selected) {
                values.push(option.value);
              }
            }
          } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion4 && _iterator4.return) {
                _iterator4.return();
              }
            } finally {
              if (_didIteratorError4) {
                throw _iteratorError4;
              }
            }
          }
        } else {
          var _iteratorNormalCompletion5 = true;
          var _didIteratorError5 = false;
          var _iteratorError5 = undefined;

          try {
            for (
              var _iterator5 = multipleInput.files[Symbol.iterator](), _step5;
              !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done);
              _iteratorNormalCompletion5 = true
            ) {
              var file = _step5.value;

              values.push(file.name);
            }
          } catch (err) {
            _didIteratorError5 = true;
            _iteratorError5 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion5 && _iterator5.return) {
                _iterator5.return();
              }
            } finally {
              if (_didIteratorError5) {
                throw _iteratorError5;
              }
            }
          }
        }

        inputInstance.data = values.toString();

        return inputInstance;
      }
    }
  ]);

  return FormContent;
})();
