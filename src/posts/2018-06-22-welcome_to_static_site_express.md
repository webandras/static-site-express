---
title: Welcome to static-site-express. Install guide
date: '2018-06-22'
excerpt: >- 
  static-site-express is a simple Node.js based static site generator that uses EJS and Markdown. Installation and usage guide.
coverImage: node.jpg
---

static-site-express is a simple Node.js based static-site generator that uses EJS and Markdown. You can deploy your static site to Netlify.

*Post updated on Dec 28, 2018*

*Current version: 4.0.0*


**Important notes**

---

  - `nodemon` not trigger re-build on Linux on file changes (this behavior was experienced on Ubuntu 18.04 LTS Bionic Beaver)
  - On Ubuntu, you can run `npm run watch-exp` command which uses the [chokidar](https://github.com/paulmillr/chokidar) package. *Experimental.*


## Install static-site-express

- Use the 'Deploy to Netlify' button on the [example website](https://static-site-express.netlify.com/)

- Or install it from npm package manager:

`npm install static-site-express`


## Build your site locally

Build site from `./src` into `./public` folder:

`npm run build`

Serve website on `localhost:4000`:

`npm run serve`

Or you can watch for changes and trigger re-build with nodemon:

`npm run watch`

You need to add `sudo` before the commands on Linux system.

Inspect `package.json` for more info. The `./lib` folder contains the JavaScript files used for building and serving the website. Check them out.

The `site.config.js` file contains some of the site properties (like site title, author, description, social media links etc.) that are used in the EJS partials.


## Register at Netlify and publish your website

- Register on [Netlify](https://www.netlify.com/), and [see this tutorial video](https://www.netlify.com/docs/continuous-deployment/) if you are unfamiliar with the procedure. You can publish your site in a minute.

- The `netlify.toml` configuration file contains important properties:

````raw
[build]
  base    = "/"
  publish = "public"
  command = "npm run build"
````

The base path, the build command, and the publish directory. You can keep those settings.

In the `_headers` file you can specify the HTTP headers and set Content Security Policy (CSP) rules for the Netlify server. Currently, CSP rules are not set because I don't know which domains you want to whitelist when you create your own website. I recommend you the [CSP Evaluator by Google](https://csp-evaluator.withgoogle.com/).

The `_redirects` file is currently empty. When you have a custom domain, you can make a redirect from *.netlify.com to your custom domain.

`sitemap.xml` is self-explanatory. Currently empty.

For [Google Search Console](https://search.google.com/search-console/about) verification, you should have an HTML file from Google included in the root of your Netlify publish folder (in our case, public). The build script copies this file from `./src` to `./public`. Change line 87 in `./lib/build.js`: 

````javascript
ssg.copyRootFile('YOUR-GOOGLE-FILENAME-COMES-HERE.html', srcPath, distPath)
````

## Alternatively, you can use the Express server app on Heroku (not recommended)

A `Procfile` is already supplied for you with the command to build the site, and after that to run the app server:

`web: npm run heroku`

You need improve security! I already set security headers with the `helmet` npm package, just 2 lines:

````javascript
// Set Security Headers.
const helmet = require('helmet')
app.use(helmet())
````

Also, you can set Content Security Policy (CSP) rules using the `helmet-csp` package. This is just an example:

Keep in mind that the contact form on the example site only works on Netlify!


## The idea of making a static site generator in Node.js

came from this article:

* Douglas Matoso 2017. [Build a static site generator in 40 lines with Node.js](https://medium.com/douglas-matoso-english/build-static-site-generator-nodejs-8969ebe34b22).


## Q&A

If you have a problem or a question about static-site-express, [open an issue](https://github.com/SalsaBoy990/static-site-express/issues).
