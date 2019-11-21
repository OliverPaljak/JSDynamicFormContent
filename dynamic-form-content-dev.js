/*
 * This is a source file for a simple JavaScript library "JSDynamicFormContent".
 * "JSDynamicFormContent" helps to get form content dynamically from every input element. It is only pure, Vanilla JS.
 *
 * JSDynamicFormContent is released under Unlicense. For more information, please check the (UN)LICENSE.md file or refer to <http://unlicense.org>
 *
 * For how to's and examples visit <https://github.com/OliverPaljak/JSDynamicFormContent>
 */


/**
 * Class for getting form content
 *
 * @version 1.0.0
 */
class FormContent{

    /**
     * Create new form content object
     *
     * @param {HTMLFormElement} formElement Single form element
     * @param {string} inputSelectors Selectors for elements which will be used to read and display data (like jQuery selectors: # for IDs, . for classes and so on). Separate multiple selectors with comas.
     * @param {HTMLButtonElement | HTMLInputElement} submitButton Submit button to display form data (although the type should be always 'button')
     * @param {Element} outputSection Section where the form data is displayed
     * @since 1.0.0
     */
    constructor(formElement, inputSelectors, submitButton, outputSection){
        
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
        this.getInputElements = function(){ return inputElements; };

        /**
         * Get submit button
         *
         * @return {HTMLButtonElement} Submit button
         * @since 1.0.0
         */
        this.getSubmitButton = function(){ return submitButton; };
        
        /**
         * Get output section
         *
         * @see outputSection
         * @return {NodeList} Output section
         * @since 1.0.0
         */
        this.getOutputSection = function(){ return outputSection; };


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
        this.errorMessage = "<h4 style='color:#FF0000;'>Please fill all the required inputs!</h4>";

        /**
         * Instance for this class
         *
         * @type {FormContent}
         * @since 1.0.0
         */
        var thisInstance = this;


        if(submitButton && outputSection){
            submitButton.onclick = function(){
                thisInstance.onSubmitButtonClick();
            };
        }
    }

    /**
     * When submit button is clicked
     *
     * @since 1.0.0
     */
    onSubmitButtonClick(){
        var outputMessage = (this.areRequiredInputsFilled()) ? this.getFormattedFormContent() : this.errorMessage;

        this.printToOutput(outputMessage);
    }

    /**
     * Are all the required inputs/fields filled?
     *
     * @return {boolean}
     * @since 1.0.0
     */
    areRequiredInputsFilled(){
        for(var node of this.getInputElements()){
            if(node.required && !node.value){
                return false;
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
    printToOutput(content){
        this.getOutputSection().innerHTML = content;
    }

    /**
     * Get form content/data which is formatted
     *
     * @return {string} Formatted form content
     * @since 1.0.0
     */
    getFormattedFormContent(){
        var formContent = "";

        var formData = this.getFormData();

        for(var input in formData){
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
    getFormData(){
        var formData = {};
        
        var noNameCounter = 0;
        
        var formInputs = this.getFormInputs();
        
        for(var input of formInputs){
            let inputName = input.name || "no_name_element_" + noNameCounter;
            let inputValue = input.data || input.value || this.emptyValueMessage;
            
            if(!input.name){
                noNameCounter++;
            }
            
            formData[inputName] = inputValue;
        }
        
        return formData;
    }

    /**
     * Get all the form input elements
     * 
     * @return {Array} Inputs and values (form data)
     * @since 1.0.0
     */
    getFormInputs(){
        var formInputs = [];

        for(var input of this.getInputElements()){
            if(!this.disabledElements.includes(input.tagName.toLowerCase()) && !this.disabledElements.includes(input.type) && !this.disabledElements.includes(input)){
                if(input.type === "radio"){
                    if(input.checked){
                        formInputs.push(input);
                    }
                }else if(input.type === "checkbox"){
                    input.value = (input.checked) ? true : false;
                    formInputs.push(input);
                }else if(input.multiple){
                    formInputs.push(this.getMultipleInput(input));
                }else if(input.value || input.innerHTML){
                    formInputs.push(input);
                }else{
                    formInputs.push(input);
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
    getMultipleInput(multipleInput){
        var inputInstance = document.createElement("input");
        inputInstance.name = multipleInput.name;

        var values = [];

        if(multipleInput.type !== "file"){
            for(var option of multipleInput){
                if(option.selected){
                    values.push(option.value);
                }
            }
        }else{
            for(var file of multipleInput.files){
                values.push(file.name);
            }
        }

        inputInstance.data = values.toString();

        return inputInstance;
    }
}
