'use strict';

{
    window.addEventListener('load', function(e) {

        // Function to set the theme
        function setTheme(mode) {
            const validModes = ["light", "dark", "auto"];
            if (!validModes.includes(mode)) {
                console.error(`Invalid theme mode: ${mode}. Setting to auto.`);
                mode = "auto";
            }
            document.documentElement.setAttribute("data-theme", mode);
            localStorage.setItem("theme", mode);
        }

        // Function to toggle between light and dark themes
        function toggleTheme() {
            const currentTheme = localStorage.getItem("theme") || "auto";
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

            let newTheme;
            if (currentTheme === "auto") {
                newTheme = prefersDark ? "light" : "dark";
            } else {
                newTheme = currentTheme === "light" ? "dark" : "light";
            }

            setTheme(newTheme);
        }

        // Function to initialize the theme based on localStorage or default to auto
        function initTheme() {
            const currentTheme = localStorage.getItem("theme");
            setTheme(currentTheme || "auto");
        }

        // Function to setup theme toggle buttons
        function setupTheme() {
            const themeToggleContainer = document.querySelector(".theme-toggle-container");
            if (themeToggleContainer) {
                themeToggleContainer.addEventListener("click", function(e) {
                    if (e.target.classList.contains("theme-toggle")) {
                        toggleTheme();
                    }
                });
            }
            initTheme();
        }

        setupTheme();
    });
}
