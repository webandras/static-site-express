import './../css/main.css';

import "flowbite";
import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import locI18next from "loc-i18next";

// load translations from file
const translations = require("../../content/lang/translations.json");
// load global site config
const config = require("../../config/site.config").site;

const onLoad = () => {
  // Fast deploy to Netlify
  const deployBtn = document.querySelector(config.netlifyDeployButtonId);
  if (deployBtn) {
    deployBtn.addEventListener("click", () => {
      window.location.href = config.netlifyDeployLink;
    });
  }

  // Enable multi language features
  // detects the browser language and reads the translation strings from file
  i18next.use(LanguageDetector).init(
    {
      fallbackLng: config.fallbackLang,
      debug: config.langDebug,
      resources: translations,
    },
    (err, t) => {
      if (err) return console.error(err);

      // init set content
      const localize = locI18next.init(i18next, {
        selectorAttr: "data-i18n", // selector for translating elements
        targetAttr: "i18n-target",
        optionsAttr: "i18n-options",
        useOptionsAttr: false,
        parseDefaultValueFromContent: true,
      });
      localize("body");
    }
  );

  i18next.on("languageChanged", () => {
    localize("body");
  });

  function changeLng(lng) {
    console.log(lng);
    i18next.changeLanguage(lng);
  }

  toggleDarkMode();

  // darkmode switcher
  function toggleDarkMode() {

    // if darkmode disabled
    if (!config.darkMode) {
      return;
    }

    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

    // Change the icons inside the button based on previous settings
    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      themeToggleLightIcon.classList.remove('hidden');
    } else {
      themeToggleDarkIcon.classList.remove('hidden');
    }

    const themeToggleBtn = document.getElementById('theme-toggle');
    themeToggleBtn.addEventListener('click', function () {

      // toggle icons inside button
      themeToggleDarkIcon.classList.toggle('hidden');
      themeToggleLightIcon.classList.toggle('hidden');

      // if set via local storage previously
      if (localStorage.getItem('color-theme')) {
        if (localStorage.getItem('color-theme') === 'light') {
          document.documentElement.classList.add('dark');
          localStorage.setItem('color-theme', 'dark');
        } else {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('color-theme', 'light');
        }

        // if NOT set via local storage previously
      } else {
        if (document.documentElement.classList.contains('dark')) {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('color-theme', 'light');
        } else {
          document.documentElement.classList.add('dark');
          localStorage.setItem('color-theme', 'dark');
        }
      }

    });

  }
};

// only execute when DOM is ready
window.addEventListener("DOMContentLoaded", onLoad);
