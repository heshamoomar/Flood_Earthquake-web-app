/*global gettext*/
'use strict';

window.onload = function() {
    const fieldsets = document.querySelectorAll('fieldset.collapse');
    fieldsets.forEach((elem, i) => {
        // Check if fields in this fieldset have errors
        if (elem.querySelectorAll('div.errors, ul.errorlist').length === 0) {
            elem.classList.add('collapsed');
            const h2 = elem.querySelector('h2');
            const link = document.createElement('a');
            link.id = 'fieldsetcollapser' + i;
            link.className = 'collapse-toggle';
            link.href = '#';
            link.textContent = gettext('Show Details');
            h2.appendChild(document.createTextNode(' ('));
            h2.appendChild(link);
            h2.appendChild(document.createTextNode(')'));
        }
    });

    // Toggle collapse functionality
    const toggleFunc = function(ev) {
        if (ev.target.matches('.collapse-toggle')) {
            ev.preventDefault();
            ev.stopPropagation();
            const fieldset = ev.target.closest('fieldset');
            if (fieldset.classList.contains('collapsed')) {
                // Show details
                ev.target.textContent = gettext('Hide Details');
                fieldset.classList.remove('collapsed');
            } else {
                // Hide details
                ev.target.textContent = gettext('Show Details');
                fieldset.classList.add('collapsed');
            }
            // Update aria-expanded attribute for accessibility
            fieldset.setAttribute('aria-expanded', !fieldset.classList.contains('collapsed'));
        }
    };

    // Add event listeners to handle collapse toggle
    document.querySelectorAll('fieldset.module').forEach(function(el) {
        el.addEventListener('click', toggleFunc);
    });
};
