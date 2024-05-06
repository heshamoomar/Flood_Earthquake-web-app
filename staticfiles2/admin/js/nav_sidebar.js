'use strict';

{
    if (document.getElementById('toggle-nav-sidebar')) {
        const toggleNavSidebar = document.getElementById('toggle-nav-sidebar');

        toggleNavSidebar.addEventListener('click', function() {
            const navSidebar = document.getElementById('nav-sidebar');
            const main = document.getElementById('main');
            let navSidebarIsOpen = localStorage.getItem('django.admin.navSidebarIsOpen') === 'true';
            navSidebarIsOpen = !navSidebarIsOpen; // Toggle value
            localStorage.setItem('django.admin.navSidebarIsOpen', navSidebarIsOpen);
            main.classList.toggle('shifted', navSidebarIsOpen);
            navSidebar.setAttribute('aria-expanded', navSidebarIsOpen);
        });
    }

    function initSidebarQuickFilter() {
        const navSidebar = document.getElementById('nav-sidebar');
        if (!navSidebar) {
            return;
        }

        const options = Array.from(navSidebar.querySelectorAll('th[scope=row] a')).map((container) => {
            return { title: container.innerHTML.toLowerCase(), node: container.parentNode.parentNode };
        });

        function checkValue(event) {
            const filterValue = event.target.value.trim().toLowerCase();
            const matches = options.filter(option => option.title.includes(filterValue));
            options.forEach(option => {
                option.node.style.display = matches.some(match => match === option) ? '' : 'none';
            });
            event.target.classList.toggle('no-results', matches.length === 0);
            sessionStorage.setItem('django.admin.navSidebarFilterValue', filterValue);
        }

        const nav = document.getElementById('nav-filter');
        ['change', 'input', 'keyup'].forEach(eventType => {
            nav.addEventListener(eventType, checkValue, false);
        });

        const storedValue = sessionStorage.getItem('django.admin.navSidebarFilterValue');
        if (storedValue) {
            nav.value = storedValue;
            checkValue({ target: nav });
        }
    }

    initSidebarQuickFilter();
}
