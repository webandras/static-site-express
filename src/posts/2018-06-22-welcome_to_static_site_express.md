---
title: "Welcome to static-site-express"
date: "2018-06-22"
excerpt: "static-site-express is a simple Node.js based static site generator that uses EJS and Markdown."
cover: "./assets/images/blackhole.jpg"
comments: false
topic: null
---

static-site-express is a simple Node.js based static site generator that uses EJS and Markdown.

## Manual

### 1. Installation

`npm install static-site-express`


### 2. Build site and serve it at localhost:4000

`npm run build`

`npm run serve`

Or you can do both with:

`npm run build-serve`

Inspect `site.config.js` first. A lot of things are self explanatory. There are comments in the codes.

The `script/` folder contains the JS files used for building the site and serving it at `localhost:4000`.


### 4. Register at Netlify and publish your website

Register [here](https://www.netlify.com/), and [see this tutorial video](https://www.netlify.com/docs/continuous-deployment/).

Build command is: `npm run build`

Publish directory is: `public`

If you have a question ask me: [guland@protonmail.com](mailto:guland@protonmail.com), or [open an issue here](https://github.com/SalsaBoy990/static-site-express/issues).


## The idea of making a static site generator came from this article:

* Douglas Matoso 2017. [Build a static site generator in 40 lines with Node.js](https://medium.com/douglas-matoso-english/build-static-site-generator-nodejs-8969ebe34b22). 


## Future tasks

* Use paginator on the index page
