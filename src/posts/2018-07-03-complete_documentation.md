---
title: "The Complete Documentation"
date: "2018-07-03"
excerpt: "static-site-express is a simple Node.js based static site generator that uses EJS and Markdown for blogging. Complete Documentation."
cover: "./assets/images/static.jpg"
comments: false
topic: null
---

## Installation

### 1. Get static-site-express from npm

`npm install static-site-express`

### 2. Generate website into the `./public` folder

Build website: 

`npm run build`

Serve website on `localhost:4000`:

`npm run serve`

Or you can watch for changes and trigger re-build with nodemon:
`npm run watch`


### 3/a. Publish your website on Netlify

Register [here](https://www.netlify.com/){.underline}, and [see this tutorial video](https://www.netlify.com/docs/continuous-deployment/){.underline}.

Build command is: `npm run build`

Publish directory is: `public`

The `netlify.toml` configuration file already contains these two settings. You can publish your site in a minute.

### 3/b. Use the Express server app on Heroku

A `Procfile` already supplied for you with the command  to execute the app server by the dynos:

`web: node ./heroku/serve.js`

The Express server will run on Heroku, but you need improve security!
I already set security headers with the `helmet` npm package:

````javascript
// Set Security Headers.
const helmet = require('helmet')

app.use(helmet())
````

And also defined the Content Security Policy (CSP) rules with the `helmet-csp` package:

````javascript
// Content Security Policy.
const csp = require('helmet-csp')

app.use(csp({
  directives: {
    defaultSrc: [`'none'`],
    styleSrc: [`'self'`,
      'https://fonts.googleapis.com',
      'https://www.youtube.com',
      'https://maxcdn.bootstrapcdn.com/'
    ],
    fontSrc: [`'self'`,
      'https://fonts.gstatic.com',
      'https://maxcdn.bootstrapcdn.com'
    ],
    scriptSrc: [`'self'`,
      'https://www.youtube.com',
      'https://www.googletagmanager.com',
      'https://www.google-analytics.com',
      'https://code.jquery.com',
      'https://maxcdn.bootstrapcdn.com'
    ],
    childSrc: [`'self'`, 'https://www.youtube.com'],
    imgSrc: [`'self'`,
      'www.google-analytics.com',
      'https://use.fontawesome.com',
      'https://*.cloudfront.net',
      'https://cloud.netlifyusercontent.com'
    ],
    objectSrc: [`'none'`],
    connectSrc: [`'self'`]
  }
}))
````

## Directory Structure of SSE

````none
├── site.config.js
├── lib
|   ├── utils
|       ├── logger.js
|       └── utils.js
|   ├── build.js
|   └── serve.js
├── public
├── src
|   ├── assets
|       ├── images
|       ├── scripts
|       └── stylesheet
|   ├── favicon
|   ├── layouts
|       └── partials
|   ├── pages
|   ├── posts
|   └── _headers
├── node_modules
├── netlify.toml
├── Procfile
├── package.json
└── .gitignore 
````

### site.config.js

This script contains the main properties of the website. These properties are automatically pasted into the EJS partials:

````javascript
module.exports = {
  site: {
    url: '',
    title: `static-site-express`,
    image: 'https://d33wubrfki0l68.cloudfront.net/4aa0c89513e63430707d6360d84d18531e472d80/ceb27/assets/images/profile.png',
    author: 'András Gulácsi',
    quote: 'static-site-express is a simple Node.js based static-site generator (SSG) that uses EJS and Markdown for blogging.',
    description: 'Webdesigner, UI/UX designer, Frontend Developer, JavaScript, Node.js, SQL, Jekyll, Bootstrap 3, Angular 2+',
    bookTitle: 'Your book title (if you have one)',
    email: 'guland@protonmail.com',
    github: 'SalsaBoy990',
    linkedin: 'andrasgulacsi',
    cv: 'link-to-your-cv',
    mailchimp: '',
    currentYear: new Date().getFullYear()
  }
}
````

### What are these folders?
* `lib/`: contains the build script and the app server;
* `public/`: the site will be generated into this directory
* `src/`: this is the source directory containing all the templates from which the site will be generated.
  - `assets/`: contains all the images (`images/`), stylesheets (`stylesheet/`), and scripts (`scripts/`);
  - `favicon/`: this have to contain your favicon. [Use this online favicon generator](https://realfavicongenerator.net/){.underline};
  - `layouts/`: layouts consisting of partials for the home page, about page etc.
    - `layouts/partials`: here are the partials like header, navbar, footer etc.;
  - `pages/`: main content, pages like about.ejs, index.ejs;
  - `posts/`: the place where you create your blogposts in Markdown format

### How to write your blogposts? Important notes.

You have to use `Markdown` format for writing posts. The file consists of a YAML header (metadata for your post) and the actual content, the text of your post in `Markdown`. See more about Markdown syntax in my previous post.

**Filename format: `YYYY-MM-DD-your_title_goes_here.md`.**

You should stick to this format, otherwise it will not work. Use underlines in your title part! **Currently `-` are not allowed in your title.** (*Needs improvements*)

The YAML header (between the two `---`) looks like this:

````none
---
title: "Your title"
date: "2018-06-22"
excerpt: "The post is about the..."
cover: "./assets/images/picture.jpg"
topic: "tag"
comments: false
---

Write your post after the header...
````
Currrently, only string format is allowed for the `date` property, so if you need to post more than once a day, it will lead to problems. *(It will be resolved in the future to allow date format.)*

The `topic` property is currently not used in the templates. *(I am planning to create a tag cloud and group posts by their topic. Also, you will be able to assign multiple topics to a single post.)*

The comment system is not working yet, so set the `comments` to `false`. **Disqus** is not working because of CSP rules, but I need those to enhance security. Netlify is not setting the security headers and CSP by default, so you need to set those manually in the `_headers` file located in `src/`. It will be copied to the root of your generated site (`public/`).

Unfortunately, a lot of HTML features are not available in Markdown, so I enabled HTML tags in Markdown.

### Customise your website

At first, modify these:

1. site.config.js
2. pages
3. create post
4. change layouts, partials (optional)
5. make changes in build.js script (optional)

### This post will be updated regularly...