// Add your global site properties here
module.exports = {
  site: {
    // BASE
    title: `static-site-express`,
    quote: "A Node.js-based static site generator that uses EJS and Markdown",
    description:
      "A Node.js based static-site generator that uses EJS and Markdown. Deploy your static site to Netlify or any platform to your liking. Suited for landing pages, portfolio, blogs, documentation, hobby projects.",
    author: "András Gulácsi",
    lang: "en", // currently, the static site generator has no multi-language support
    defaultImage: "/assets/images/static.jpg",
    github: "https://github.com/SalsaBoy990/static-site-express",
    currentYear: new Date().getFullYear(),

    // CONFIGURATION

    // for local development, leave it empty or use http://localhost:PORT (without trailing "/" at the end!)
    // This url is pasted before all of your "/links" in the website
    url: "",

    // Used it for creating canonical urls
    seoUrl: "https://static-site-express.netlify.app",

    // Using Algolia Search requires configuration
    // For local development set it to false (no need to send in the postdata for the search index)
    enableSearch: true,

    // Change these to the language you want to use
    monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],

    // Switch website to the dark mode
    darkMode: false,

    // Link for the deploy button url
    netlifyDeployLink: "https://app.netlify.com/start/deploy?repository=https://github.com/SalsaBoy990/static-site-express",
    netlifyDeployButtonId: "#deploy",

    // Supported languages (used for i18n)
    languages: {
      hu: { nativeName: "Magyar" },
      en: { nativeName: "English" },
    },
  },
};
