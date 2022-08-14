// Add your global site properties here
module.exports = {
  site: {
    url: "http://localhost:4000",
    title: `static-site-express`,
    defaultImage: "/assets/images/static.jpg",
    monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    lang: "en",
    author: "András Gulácsi",
    quote: "A Node.js-based static site generator that uses EJS and Markdown",
    description:
      "A Node.js based static-site generator that uses EJS and Markdown. Deploy your static site to Netlify or any platform to your liking. Suited for landing pages, portfolio, blogs, documentation, hobby projects.",
    currentYear: new Date().getFullYear(),
    github: "https://github.com/SalsaBoy990/static-site-express",
  },
};
