'use strict';
{
    const $ = django.jQuery;

    // Define a jQuery plugin for Select2 autocomplete functionality
    $.fn.djangoAdminSelect2 = function() {
        // Apply Select2 to each element in the jQuery collection
        $.each(this, function(i, element) {
            $(element).select2({
                // Configure AJAX settings for remote data retrieval
                ajax: {
                    // Customize data sent in AJAX request based on element attributes
                    data: (params) => {
                        return {
                            term: params.term,
                            page: params.page,
                            app_label: element.dataset.appLabel,
                            model_name: element.dataset.modelName,
                            field_name: element.dataset.fieldName
                        };
                    }
                }
            });
        });
        return this; // Enable method chaining
    };

    // Initialize autocomplete widgets when the DOM is ready
    $(function() {
        // Apply autocomplete functionality to all elements with class 'admin-autocomplete'
        // Exclude elements with 'name' containing '__prefix__' to avoid duplicating behavior
        $('.admin-autocomplete').not('[name*=__prefix__]').djangoAdminSelect2();
    });

    // Handle formset addition event to apply autocomplete to new form elements
    document.addEventListener('formset:added', (event) => {
        // Apply autocomplete functionality to 'admin-autocomplete' elements within the newly added formset
        $(event.target).find('.admin-autocomplete').djangoAdminSelect2();
    });
}
