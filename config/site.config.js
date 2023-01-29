// Make sure to commit it as "production"
// For local development rewrite it to "development"
const mode = "production";

// Add your global site properties here
module.exports = {
  site: {
    // BASE
    title: `static-site-express`,
    quote: "A Node.js-based static site generator that uses EJS and Markdown",
    description:
      "A Node.js based static-site generator that uses EJS and Markdown. Deploy your static site to Netlify or any platform to your liking. Suited for landing pages, portfolio, blogs, documentation, hobby projects.",
    author: "András Gulácsi",
    defaultImage: "/assets/images/static.jpg",
    github: "https://github.com/SalsaBoy990/static-site-express",
    githubProfile: "https://github.com/SalsaBoy990",
    currentYear: new Date().getFullYear(),

    // CONFIGURATION

    // This url is pasted before all of your "/links" in the website
    // Currently, all of your paths are absolute for production
    url: mode === "development" ? "" : "https://static-site-express.netlify.app", // (without trailing "/" at the end!)

    // Used it for creating canonical urls. The urls are generated for this domain that are sent to Algoliasearch for indexing
    // Should always be your LIVE domain, do not send in localhost links.
    seoUrl: "https://static-site-express.netlify.app", // (without trailing "/" at the end!)

    // Using Algolia Search requires configuration
    // For local development set it to false (no need to send in the postdata for the search index)
    enableSearch: true,
    // post request with updated posts to Algolia search index
    // generally, you need to do it if you add new posts to the website
    refreshSearchIndex: false,

    // Change these to the language you want to use
    monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],

    // Switch website to the dark mode
    darkMode: true,

    // Link for the deploy button url
    netlifyDeployLink: "https://app.netlify.com/start/deploy?repository=https://github.com/SalsaBoy990/static-site-express",
    netlifyDeployButtonId: "#deploy",

    // Default language
    lang: "en",
    // Fallback
    fallbackLang: "en",

    // Supported languages (used for i18n)
    languages: {
      hu: { nativeName: "Magyar" },
      en: { nativeName: "English" },
    },
    // Debugging i18n module (console.log messages)
    langDebug: false,
  },
};
