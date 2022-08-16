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

  // Enable darkmode
  if (config.darkMode) {
    document.documentElement.classList.add("dark");
  }

  // Enable multi language features
  // detects the browser language and reads the translation strings from file
  i18next.use(LanguageDetector).init(
    {
      fallbackLng: "en",
      debug: true,
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

  function toggleDarkMode() {
    // Whenever the user explicitly chooses light mode
    localStorage.theme = "light";
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Whenever the user explicitly chooses dark mode
    // localStorage.theme = "dark";

    // Whenever the user explicitly chooses to respect the OS preference
    //localStorage.removeItem("theme");
  }
  //toggleDarkMode();
};

// only execute when DOM is ready
window.addEventListener("DOMContentLoaded", onLoad);
