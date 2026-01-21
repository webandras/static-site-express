# static-site-express

[![Netlify Status](https://api.netlify.com/api/v1/badges/bb6cf5c7-4ccc-4684-8a82-30e64ac00baa/deploy-status)](https://app.netlify.com/sites/static-site-express/deploys)

static-site-express is a simple Node.js based static-site generator that uses EJS and Markdown. Deploy your static site
to Netlify or any platform to your liking. Suited for landing pages, portfolio, blogs, documentation, hobby projects.

## Getting started

### Install static-site-express

Click on "Use this template" button to get an exact copy of the repo / site builder. Then use the `master` branch,
which is the default. Or use the GitHub CLI:

```raw
gh repo create your-username/new-repo  -p webandras/static-site-express
```

_Note:_ Netlify will build your site from the default branch (usually the `master`) by default.
You can use a different branch other than the default one, but **in that case Decap CMS (previously: Netlify CMS) will
not work properly**. For
example, the images uploaded through the CMS will be pushed into the default branch, not the other one you set up in
Netlify!)

_Test website:_ Use the 'Deploy to Netlify' button at the [project's website](https://static-site-express.netlify.com/)
to have a test website.

### Build your site locally

First, install or update npm packages.

Second, create a `.env` file (see `.env.example`), and set the variables.

If you want to use Algolia Search, you need
to [register](https://www.algolia.com/doc/guides/getting-started/what-is-algolia/) and generate your API credentials. If
you don't want to use Algolia, set `enableSearch` to false in `config/site.config.js`.

Check out all the settings in the `site.config.js`. There are comments there with additional information.


#### 1. **Build** site from `./content` into the `./public` folder (in watch mode):

```raw
npm run watch-chokidar
```

Or:

```raw
npm run watch-nodemon
```


If you modify `site.config.js` restart the watchers to apply the changes you have made.
For local development, make sure you rewrite the mode to "development"!

Generate the js and css bundles as well (in --watch mode): `npm run webpack-watch`


#### 2. **Serve website** on `localhost:4000` (or the port you set in .env, default port is 4000) (legacy):

```raw
npm run serve
```

Switch to browser-sync to have live reloading in the browser when files change:

```raw
npm run liveserver
```

or run:

```bash
browser-sync start --server 'public' --files 'public'
```

#### 3. Call the `npm run webpack` watcher script to make sure the js and css bundles are recreated after file changes.

If you don't see your changes:

- After the app code changes you have made, restart `npm run watch-chokidar`, or `npm run watch-nodemon`,
- Try to restart `npm run webpack`,
- Try to restart `npm run liveserver`

Make sure to build the live bundle in production mode.

Check out the `bin` folder and the `package.json` file to see the available scripts.

### Modify the application code

The JavaScript source is in the `app/` folder. **Generally, you only need to modify the `core/generator.js` and
the `core/methods.js` files.**

- `methods.js` contains most of the methods for the generator.
- In `generator.js`, you can modify the pages you want to generate in the switch statements starting from **line 280**.
  You also need to create a page (`.ejs`) in the `pages/` folder, and a template (in `layouts/`) to be used for that
  page (or use one of the pre-existing templates like `default.ejs`).
- Post properties can be extended **starting at line 142**, in the `templateConfig` object literal (`generator.js`)

After the changes, restart build/watch scripts. This process in suboptimal, but currently this is the workflow.

### Website content (in the `content/` folder)

- Post data comes from markdown files (in `posts/`) where the front matter block contains the post properties (you can
  change them, but do not forget to update the `templateConfig` object literal (`generator.js`) as well).
- Pages (in `pages/`) are using templates and partials defined in the `layouts/` folder.
- The `config/site.config.js` file contains some of the global site properties (like site title, author, description,
  social media links etc.) that are used in the EJS partials. Can also be extended it to your liking.

## Publish Website to Netlify

### Register at Netlify.com and publish your website

- The `netlify.toml` configuration file contains important properties:

```raw
[build]
  base    = "/"
  publish = "public"
  command = "npm run build"
```

The base path, the build command, and the "publish" directory. You can keep those settings unchanged.

You can also define here some post-processing actions to be run in the post-processing stages, for example as part of
Netlify's CI/CD pipeline.

In the optional `_headers` file you can specify the HTTP headers and set Content Security Policy (CSP) rules for the
Netlify server.
Currently, CSP rules are commented out. You can also specify these in `netlify.toml`.

The `_redirects` file is currently empty. When you have a custom domain, you can make a redirect from _.netlify.com_ to
your custom domain there.

`robots.txt` default settings:

```raw
# Disallow admin page
User-agent: *
Disallow: /admin/

# Disallow message-sent page
User-agent: *
Disallow: /message-sent/

# Rule 3
User-agent: *
Allow: /
```

For [Google Search Console](https://search.google.com/search-console/about) verification, you should have an HTML file
from Google included in the root of your Netlify publish folder (in our case, `public`). The build script copies this
file from `./content` to `./public`.

Add the name of the filename in the `filesToCopy` array at line 100 in `./app/core/generator.js` and restart watch
script!

Netlify builds your website with its buildbot. It starts a Docker container running
the [Netlify build image](https://hub.docker.com/r/netlify/build/#!)

When the Docker fires up, this script runs (unfortunately, Netlify moved the build image to a private repository, so this is archived now):
https://github.com/netlify/build-image/blob/focal/run-build.sh

This is the Dockerfile from which the Netlify image is built (based on the `ubuntu` image):
https://github.com/netlify/build-image/blob/focal/Dockerfile

### Netlify Forms

Netlify automatically discovers the contact form via custom netlify attributes added to the form. A bot field is present
in the form to protect against spam bots. Netlify has first-class spam filter.

[Netlify Forms Docs](https://docs.netlify.com/forms/setup/)

### Decap CMS

[Decap CMS Docs](https://decapcms.org/)

### Algolia Search

These are the key parts in the code for Algolia:

```JavaScript
const algoliasearch = require("algoliasearch");
const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_KEY);
const index = client.initIndex(process.env.ALGOLIA_INDEX);
```

Use the AlgoliaSearch client library to send request to update and/or create records for the posts:

```JavaScript
index.partialUpdateObjects(searchIndexData, {
    createIfNotExists: true,
});
```

This is currently the structure of the search index (as a default example):

```JavaScript
searchIndexData.push({
    /**
     * The object's unique identifier
     */
    objectID: postData.attributes.date,

    /**
     * The URL where the Algolia Crawler found the record
     */
    url: canonicalUrl,

    /**
     * The lang of the page
     * - html[attr=lang]
     */
    lang: config.site.lang,

    /**
     * The title of the page
     * - og:title
     * - head > title
     */
    title: postData.attributes.title,

    /**
     * The description of the page
     * - meta[name=description]
     * - meta[property="og:description"]
     */
    description: postData.attributes.excerpt,

    /**
     * The image of the page
     * - meta[property="og:image"]
     */
    image: config.site.seoUrl + "/assets/images/uploads/" + postData.attributes.coverImage,

    /**
     * The authors of the page
     * - `author` field of JSON-LD Article object: https://schema.org/Article
     * - meta[property="article:author"]
     */
    authors: [config.site.author],

    /**
     * The publish date of the page
     * - `datePublished` field of JSON-LD Article object: https://schema.org/Article
     * - meta[property="article:published_time"]
     */
    datePublished: postData.attributes.date,

    /**
     * The category of the page
     * - meta[property="article:section"
     * - meta[property="product:category"]
     */
    category: postData.attributes.topic || "",

    /**
     * The content of your page
     */
    content: postContents,
});
```

_Note:_ Currently the `objectID` is the post publish date (like "2022-08-17"). Maybe better to change it to the whole
slug to be completely unique. You can't have two posts at the same day now.

### Internationalisation (i18n)

Provided by **i18next** package. See in `assets/js/main.js`. Remove this feature if you don't need it. Some texts (like
the ones coming from config) cannot be made translatable. Probably not a good solution. The code is left there mainly
for reference.

The translations come from `content/lang/translations.json`.

[i18next Docs](https://www.i18next.com/)

### Open Hours library for displaying opening hours.

Credits: © Michael Lee.
[GitHub](https://github.com/michaellee/open-hours)
[His website/blog](https://michaelsoolee.com/)

When I started my journey as web developer, I started using [Jekyll](http://jekyllrb.com/) for my simple websites after
reading some articles from Michael Lee about it. He has a great starter for Jekyll,
the [Jekyll ⍺](https://github.com/michaellee/jekyll-alpha).

The data comes from `content/data/opening-hours.yml`. It can be edited from Decap CMS as well.

## CHANGELOG

### Release 2.3.0 (22 September 2024)

- The Barebone theme became the default, Tailwind/Flowbite is deprecated
  (still available on the "deprecated-tailwind" branch).
- Templates and styles updated to make it look better.
- Update npm package versions.
- Update readme, and other markdown files.
- Fix highlight.js syntax highlighting.
- Fix/update Content Security Policy (update whitelist).

### Release 2.2.2 (10 July 2024)

- Update and improve the README.
- Update EJS package from ^3.1.8 to ^3.1.10.
- Update express from ^4.18.1 to ^4.19.2.
- Update the content of the demo blogposts.
- Change the ordering of posts for index page in descending order - newest first.
- Remove breadcrumb from single blogpost template.
- Header border and background-color fixes.
- Update post title EJS partial.
- Fix typos in code comments.
- Update CSS and JS bundles.
- Extend the safe-list for Tailwind CSS config.

### Release 2.2.1 (27 March 2023)

- fix: Missing glob package (caused an issue on starter/barebone branch - not able to reproduce it on master though).
- update: 3 posts (the ones serve as documentation)

I created the **"Barebone"** theme (branch: `starter/barebone`) without Tailwind CSS, with SASS support and some basic
styling (nothing has changed in the app folder)
It was a mistake to be dependent on one CSS framework. Choose whatever you like for **Barebone**.

### Release 2.2.0 (24 March 2023)

- replace bin/css and bin/js scripts with bin/webpack (it generates both the js and css bundles)
- add browser-sync (run: `bin/livereload`) with local server to refresh the page after the file changes
- updated npm packages (remove unnecessary / add new / put some packages under dev-dependencies)
- updated readme

You can use `bin/livereload` instead of `bin\serve`. The old express local server is not removed.

### Release 2.1.2 (23 March 2023)

- bump webpack from 5.74.0 to 5.76.0 (fix vulnerabilities)
- fix comments, fix newlines in site generator code
- change copyright text

### Release 2.1.1 (30 December 2022)

The project is now in mature state, there will be no more refactoring, only bugfixes and occasional improvements of
features. No breaking changes.
I don't want to be part of the "rewrite culture". Also, not a fan of npm anymore. I use as small amount of packages as
possible.
Having 1000s of interdependent packages (with all these regular rewrites, and security issues as well) is a dependency
hell.

**Delete:**

- Flow static type checker and Babel removed
- `site-generator` folder removed, `bin/generate`, and npm scripts related are deleted as well.

**Update:**

- The source code now is in the `app` folder that you should edit. No need to rebuild all the time with Babel.
- Update Readme

### Release 2.1.0 (16 August 2022)

**New feature:**

- Add Algolia search support for blogposts
- Add: Opening hours table (a small package)
- Add: i18n support (only an example)

**Fix:**

- CSP rules with whitelist for Algolia, Netlify CMS
- fix: Try to create a workaround for "Gotrue-js: failed getting jwt access token error
- seo fixes in head

**Security:**

- fix: Disallow using strings with DOM XSS injection sink functions (CSP)

**Update:**

- Post content

### Release 2.0.0 (14 August 2022)

This intended to be the last major version release.

**New:**

- Refactor folder structure **(breaking change)**.
- Asset folder refactoring **(breaking change)**.
- Add config files for Tailwind, PostCSS, and Webpack.
- Webpack will be used to bundle JS, and PostCSS to bundle CSS.
- Integrate TailwindCSS, use the Flowbite UI component library with flowbite/typography (CSS+JS).
- Add `.env.example`, remove `.env`, change .env vars.
- Add post-processing, http header settings to `netlify.toml` configuration.
- Add Content Security Policy in `netlify.toml` with whitelisting Netlify-specific domains.
- Add bash scripts with meaningful names to type less to call npm scripts.
- Add new favicon and app logos.

**Update:**

- Update package.json version number.
- Update existing, remove not needed, add new npm packages, supported Node version is: `v16.14.0`.
- Update paths in scripts **(breaking change)**.
- Update comments in the code.
- Set node version for Netlify to `v16.14.0`.
- Update layouts, pages and posts (to use TailWindCSS).
- Update Netlify CMS settings.
- Update Netlify CMS needs to have the website source files in `content/` folder.
- Update README.md.
- Update .gitignore.

**Delete:**

- Remove Docker configuration: using the site-builder in Docker would only add unnecessary complexity for zero gain.
- Remove GA scripts.
- Remove Heroku Procfile.

**New/Update/Delete:**

- Define new, rename existing, remove not needed npm scripts.

### Release 1.0.2 (28 April 2021)

- Update README.md.
- Update package version number.
- Set node version for Netlify to avoid package compatibility errors.
- Update Netlify CMS settings, change media folder, input types.
- Netlify CMS needs to have the website source files in src/ folder.

### Release 1.0.1 (27 April 2021)

**Incorrect configuration in docker-compose.yml:**

- fix: "generator" and "devserver" services share volume data. "devserver" is dependent on the "generator" service.

### Release 1.0.0 (25 April 2021) ! breaking change from previous versions !

- version re-started with _1.0.0_ (from _4.1.0_, it was a complete mess before).
- Update npm dependencies to the newest versions.
- Build script partial code refactoring, code styling.

**Correct EJS syntax error after EJS version update:**

- fix: From now on, EJS include directives should be in this format:

`<%- include ('partial/element-name') %>`

This is a **breaking change**, you should update your `partials/templates`!

**Update build and watch scripts (using chokidar):**

- update: build script content moved into a module (`generator.js`) to be used in a build and the chokidar-based watch
  scripts.

In 2019, chokidar was not watching file changes properly, thus the npm script was named "watch-exp". The default watch
script is using nodemon.

**Add flow types support and re-structure folders:**

- new: add Flow, a static type checker for JavaScript.
- update: site generator source moved to `src/`, Babel will transpile the source into the `lib/` folder where originally
  the source were.
- update: website source is moved to `website/` folder, necessary code changes are applied.

**Refactor site generator, code improvements, config changes:**

- update: `package.json` add dotenv package, update npm scripts.
- update/add: refactor static site generator scripts, changes in methods, add types to code with flow, update/add
  comments to every method.
- add: lang and month names options to site.config.js.

**Dockerize project:**

- new: read variables from `.env` file.
- new: add Dockerfile, docker-compose file, `.dockerignore`.

## Useful resources

- [Netlify Docs](https://docs.netlify.com/)
- [Decap CMS Docs](https://decapcms.org/)
- [How the Netlify buildbot builds websites](https://www.netlify.com/blog/2016/10/18/how-our-build-bots-build-sites/)
- [Netlify Drop - formarly BitBalloon](https://www.netlify.com/blog/2018/08/14/announcing-netlify-drop-the-simplicity-of-bitballoon-with-the-added-power-of-netlify/)
- [Complete Intro to Netlify in 3.5 hours](https://www.netlify.com/blog/2019/10/07/complete-intro-to-netlify-in-3.5-hours/)
- [Webpack tutorial](https://www.sitepoint.com/bundle-static-site-webpack/)
- [Terser Webpack plugin](https://webpack.js.org/plugins/terser-webpack-plugin/)

## Known issues

### 1. Chokidar crashes on Ubuntu 20.04 LTS (12 August 2022)

Bug: Problem with an existing folder.

The build script should always delete the folders inside the public folder.
However, the assets folder is sometimes not deleted, so an exception occurs:
`[Error: EEXIST: file already exists, mkdir './public/assets']`

### 2. Nodemon was not working properly on Ubuntu (2019)

- `nodemon` not trigger re-build on Linux on file changes (this behavior was experienced on Ubuntu 18.04 LTS Bionic
  Beaver)
- On Ubuntu, you can run `npm run watch-exp` command which uses the [chokidar](https://github.com/paulmillr/chokidar)
  package.
- Update: Chokidar is working properly on Ubuntu 20.04 (28 April 2021)

If you have a problem or a question about
static-site-express, [open an issue here](https://github.com/SalsaBoy990/static-site-express/issues).

## Credits

The idea of using a Node.js static site generator came from this good article by Douglas Matoso (not accessible any
more): [Build a static site generator in 40 lines with Node.js](https://medium.com/douglas-matoso-english/build-static-site-generator-nodejs-8969ebe34b22).

This package uses some modified code parts from [**doug2k1/nanogen**](https://github.com/doug2k1/nanogen) (mainly from
the `legacy` branch and some ideas from the `master` branch, MIT © Douglas Matoso 2018).

## Licence

MIT licence - Copyright © 2018-2026 András Gulácsi.
