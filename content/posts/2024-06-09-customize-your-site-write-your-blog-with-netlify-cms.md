---
title: Customize your site, write your blog with Netlify CMS
date: "2024-06-09"
excerpt: >-
  Tutorial on how to customize your website, use Netlify Identity, Git Gateway, Netlify Forms, and Netlify Content Management System (CMS) to conveniently write your blog.
coverImage: static.jpg
---

The frontend of website is created by using Tailwind CSS framework with Flowbite UI library. In order to understand static-site-express better, the directory structure is shown below. When you customize your site, you need to modify the site generator code a little bit. For example, if you want to add about page etc. to your site.

For the installation guide, [see this posts](https://static-site-express.netlify.app/2024/06/10/welcome_to_static_site_express).

## Directory Structure (only the main parts are shown)

```plain
├── app
├── assets
    ├── css
        ├── main.css
    ├── js
        ├── identity.js
        └── main.js
├── bin
├── config/site.config.js
├── content
    ├── admin
    ├── assets
        ├── images
            └── uploads
        ├── js
        └── css
    ├── data
    ├── favicon
    ├── lang
    ├── layouts
        └── partials
    ├── pages
    ├── posts
    ├── _headers
    ├── _redirects
    ├── robots.txt
├── site-generator
    ├── core
        ├── generator.js
        ├── modules.js
    ├── methods
        ├── methods.js
    ├── utils
        ├── logger.js
    ├── build.js
    └── serve.js
    └── watch.js
├── public
├── node_modules
├── netlify.toml
├── .env
├── package.json
└── postcss.config.js
└── tailwind.config.js
└── webpack.config.js
└── .gitignore
└── etc.
```

### config/site.config.js

This script contains the main properties of the website. These properties are automatically pasted into the EJS partials:

```javascript
module.exports = {
  site: {
    // BASE
    title: "static-site-express",
    quote: "A Node.js-based static site generator that uses EJS and Markdown",
    description:
      "A Node.js based static-site generator that uses EJS and Markdown. Deploy your static site to Netlify or any platform to your liking. Suited for landing pages, portfolio, blogs, documentation, hobby projects.",
    author: "András Gulácsi",
    defaultImage: "/assets/images/static.jpg",
    github: "https://github.com/SalsaBoy990/static-site-express",
    githubProfile: "https://github.com/SalsaBoy990",
    currentYear: new Date().getFullYear(),
    // [...]
  },
};
```

### What are these folders?

- `app/`: contains the build script and the local server;
- `public/`: the site will be generated into this directory
- `content/`: this is the source directory containing all the files from which the site will be generated.
  - `admin/`: This is for the Content Management System, contains an `index.html` and a `config.yml` configuration file;
  - `assets/`: contains all the images (`images/`, and the images for your posts should go here: `images/uploads/`), stylesheets (`css/`), and scripts (`js/`);
  - `favicon/`: this have to contain your favicon. For example, [use this favicon generator](https://realfavicongenerator.net/);
  - `layouts/`: layouts consisting of partials for the home page, about page etc.
    - `layouts/partials`: here are the EJS partials like head, header, footer etc.;
  - `pages/`: main content, pages like index.ejs, writings.ejs;
  - `posts/`: the place where you create your blogposts in Markdown format

## Write your blogposts

You have to use `Markdown` format for writing posts. The file consists of a YAML header (metadata for your post) and the actual content, the text of your post in `Markdown`. See more about Markdown syntax [in my previous post](https://static-site-express.netlify.com/2018/06/25/markdown_cheatsheet).

**Filename format: `YYYY-MM-DD-your-title-goes-here.md`**

You should stick to this format.

The YAML header (between the two `---`) looks like this:

```markdown
---
title: Welcome to static-site-express. Install guide.
date: '2018-06-22'
excerpt: >-
  static-site-express is a simple Node.js based static site generator that uses EJS and Markdown. Installation and usage guide.
coverImage: node.jpg
---

static-site-express is a simple Node.js based static-site generator that uses EJS and Markdown...
```

Currrently, only string format is allowed for the `date` property, so if you need to post more than once a day, it will lead to problems!

### Use Netlify's Content Management System to write your posts

First, you have to enable [Netlify Identity](https://www.netlify.com/docs/identity/). Add [Git Gateway](https://www.netlify.com/docs/git-gateway/) providers, set up keys, so that you can login with your Github. Alternatively, invite yourself, and set up your password.

Login at Netlify, select your site, click Identity in the navigation: at registration preferences, select the 'Invite only' option, so that no one could register without your invitation.

After logging in to `your-website-name.netlify.com/admin`, you can create your posts.

[Netlify CMS documentation](https://www.netlifycms.org/docs/add-to-your-site/).

## Use Netlify Forms

If you want to use forms, enable [Netlify Forms](https://www.netlify.com/docs/form-handling/).

## Comments

Use third party solutions, for instance [Disqus](https://disqus.com/).

## Tracker code

Add the script in the `scripts.ejs` partial or in the `head.ejs` templates (pages, blogpost use different ones).
