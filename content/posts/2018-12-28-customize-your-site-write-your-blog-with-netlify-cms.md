---
title: Customize your site, write your blog with Netlify CMS
date: '2018-12-28'
excerpt: >-
  Tutorial on how to customize your website, use Netlify Identity, Git Gateway, Netlify Forms, and Netlify Content Management System (CMS) to conveniently write your blog.
coverImage: static.jpg
---

This example website is created by using Bootstrap 3 framework with jQuery. In order to understand static-site-express better, I show you the directory structure. When you customize your site, you need to modify the build script a little bit. For example, if you want to add about page, contact page etc. to your site.

For the installation guide, [see one of my previous posts](https://static-site-express.netlify.com/2018/06/22/welcome_to_static_site_express).


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
|   ├── admin
|   ├── assets
|       ├── images
|           └── articles
|       ├── js
|       └── stylesheet
|   ├── favicon
|   ├── layouts
|       └── partials
|   ├── pages
|   ├── posts
|   ├── _headers file
|   ├── _redirects file
|   ├── google517a67c0c3ff6768.html
|   ├── sitemap.xml
├── node_modules
├── netlify.toml
├── Procfile
├── package.json
└── .gitignore 
````
Note that there is a `watch.js` and a `build-module.js` script in lib folder. Those are experimental.

## site.config.js

This script contains the main properties of the website. These properties are automatically pasted into the EJS partials:

````javascript
module.exports = {
  site: {
    url: 'https://static-site-express.netlify.com',
    title: `static-site-express`,
    defaultImage: '/assets/images/static.jpg',
    author: 'András Gulácsi',
    quote: 'A Node.js-based static site generator that uses EJS and Markdown',
    description: 'A Node.js-based static site generator that uses EJS and Markdown',
    currentYear: new Date().getFullYear(),
    google_analytics: 'YOUR-ID-COMES-HERE',
    twitter: 'https://twitter.com/andrasgulacsi'
  }
}
````


## What are these folders?
* `lib/`: contains the build script and the local server;
* `public/`: the site will be generated into this directory
* `src/`: this is the source directory containing all the files from which the site will be generated.
  - `admin/`: This is for the Content Management System, contains an `index.html` and a `config.yml` configuration file;
  - `assets/`: contains all the images (`images/`, and the images for your posts should go here: `images/articles/`), stylesheets (`stylesheet/`), and scripts (`scripts/`);
  - `favicon/`: this have to contain your favicon. For example, [Use this online favicon generator](https://realfavicongenerator.net/);
  - `layouts/`: layouts consisting of partials for the home page, about page etc.
    - `layouts/partials`: here are the EJS partials like head, header, footer etc.;
  - `pages/`: main content, pages like index.ejs, writings.ejs;
  - `posts/`: the place where you create your blogposts in Markdown format


### Write your blogposts

You have to use `Markdown` format for writing posts. The file consists of a YAML header (metadata for your post) and the actual content, the text of your post in `Markdown`. See more about Markdown syntax [in my previous post](https://static-site-express.netlify.com/2018/06/25/markdown_cheatsheet).

**Filename format: `YYYY-MM-DD-your-title-goes-here.md`**

You should stick to this format.

The YAML header (between the two `---`) looks like this:

````raw
---
title: Welcome to static-site-express. Install guide.
date: '2018-06-22'
excerpt: >- 
  static-site-express is a simple Node.js based static site generator that uses EJS and Markdown. Installation and usage guide.
coverImage: node.jpg
---

static-site-express is a simple Node.js based static-site generator that uses EJS and Markdown. You can deploy your static site to Netlify...
````

Currrently, only string format is allowed for the `date` property, so if you need to post more than once a day, it will lead to problems.


## Use Netlify's Content Management System to write your posts

First, you have to enable [Netlify Identity](https://www.netlify.com/docs/identity/). Log in to Netlify. Select your site and click on Identity in the navigation. Click 'Invite users' button and add yourself (your email address). DO NOT accept the invite yet! Add [Git Gateway](https://www.netlify.com/docs/git-gateway/) so that you can login with your Github. (No need to remember an additional password.) Now, go to your email and accept the invite, and login with Github to `your-website-name.netlify.com/admin`.

At registration preferences on Netlify app, select the 'Invite only' option.

After logging in to `your-website-name.netlify.com/admin`, you can create your posts in a graphical user interface. [Netlify CMS documentation](https://www.netlifycms.org/docs/add-to-your-site/).


## Use Netlify Forms

If you want to use forms, enable [Netlify Forms](https://www.netlify.com/docs/form-handling/). For client-side form validation, [webshims](https://afarkas.github.io/webshim/demos/) is used.


## Comments

Use third party solutions: [Disqus](https://disqus.com/), or [Facebook Comments](https://developers.facebook.com/docs/plugins/comments/).


## Tracker code

Go to Google Analitics and create your tracker code for your site. You need a tracker id.

```` javascript
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'YOUR-ID-COMES-HERE');
````

Also add your id to `site.config.js`.


## Netlify Docs

* There is extensive documentation [on Netlify's page](https://www.netlify.com/docs/welcome/). Check it out.

If you have a problem or a question about static-site-express, [open an issue](https://github.com/SalsaBoy990/static-site-express/issues).