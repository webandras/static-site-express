---
title: Welcome to static-site-express. Install guide
date: "2018-06-22"
excerpt: >-
  static-site-express is a simple Node.js based static site generator that uses EJS and Markdown. Installation and usage guide.
coverImage: node.jpg
---

[![Netlify Status](https://api.netlify.com/api/v1/badges/bb6cf5c7-4ccc-4684-8a82-30e64ac00baa/deploy-status)](https://app.netlify.com/sites/static-site-express/deploys)

static-site-express is a simple Node.js based static-site generator that uses EJS and Markdown. Deploy your static site to Netlify or any platform to your liking. Suited for landing pages, portfolio, blogs, documentation, hobby projects.

## Getting started

### Install static-site-express

1. Fork and clone this repository to get a starter template that uses Flowbite, an open-sorce UI library of components created with TailwindCSS. Use the `master` branch.

```raw
git clone https://github.com/SalsaBoy990/static-site-express project
```

2. To have a basic e-commerce website Flowbite/TailWind starter incorporating the [Snipcart](https://snipcart.com/) ecommerce platform into static-site-express:

- Checkout branch `snipcart`
- Register at [Snipcart](https://snipcart.com/)
- Copy your Snipcart public test key at `src/layouts/partials/scripts.ejs` to the `publicApiKey` property value on line 6:

```html
<div id="snipcart" data-config-modal-style="side" data-api-key="YOUR_PUBLIC_TEST_API_KEY" hidden></div>
```

_Note:_ Only hardcode the test api key for development, not for production! And never commit it to version control, otherwise you need to invalidate the previous keys and create new ones. This for testing locally. For production, paste your key in as env variable.

[Snipcart](https://snipcart.com/) is more than a simple cart: enjoy a full back-office management dashboard to track abandoned carts, sales, orders, customers and more.

- It supports card payments via PayPay, Stripe, and other payment gateways,
- It generates invoices and sends them to customers after purchase,
- etc.

_Note:_ Netlify will build your site from the default branch (usually the `master`) by default.
You can use a different branch other than the default one, but in that case Netlify CMS will not work properly. For example, the images uploaded through the CMS will be pushed into the default branch, not the other you set up in Netlify!)

_Test website:_ Use the 'Deploy to Netlify' button at the [project's website](https://static-site-express.netlify.com/) to have a test website.

### Build your site locally

Use npm scripts defined in package.json

1. Build the site generator into the `app` folder. The `site-generator` folder contains the site builder's source code, and that is the code that you have to modify if you want make changes, not the compiled version in `app` folder. The code uses [flow](https://flow.org/) static type checker annotations. To compile the app code with the Babel transpiler, run:

```raw
bin/generate
```

2. Build site from `./content` into the `./public` folder (in watch mode):

```raw
bin/watch
```

This bash script will call: `npm run watch-chokidar`.
Alternatively, you can also use `npm run watch-nodemon`.

_Issue 1: if you don't see the website updated after file changes, you have to restart the script. Sometimes it happens. TODO_
The build process is intentionally delayed with setTimeout, to have enough time the css to be compiled after changes. Unfortunately, there is an interaction with the css builder script (which is slower). With the delay, crashes are less frequent

3. Serve website on `localhost:4000`:

```raw
bin/serve
```

_Issue 2: very rarerly, the Express dev server also crashes if the build script fails. TODO_

4. Create the css bundle with PostCSS (in watch mode):

```raw
bin/css
```

5. Create the js bundle with Webpack (in watch mode):

```raw
bin/js
```

Check out the `bin` folder and the `package.json` file to know more about the available scripts.

### Modify the site generator's source code

Never change the code in `app` folder since the builder app's code will be generated into this folder automatically!

The JavaScript source is in the `site-generator/` folder. These files also contain the flow type annotations.

**Generally, you only need to modify the `core/generator.js` and the `core/methods.js` files.**

- `methods.js` contains most of the methods for the generator.
- In `generator.js`, you can modify the pages you want to generate in the switch statements starting from **line 209**. You also need to create a page (`.ejs`) in the `pages/` folder, and a template (in `layouts/`) to be used for that page (or use one of the pre-existing templates like `default.ejs`).

- Post properties can be extended **starting at line 136**, in the `templateConfig` object literal (`generator.js`)

After making changes, **the source must be transpiled** by Babel into ES5 into the `app/` folder with:

- `bin/generate` or `npm run generator`

At the end of the process, restart build/watch scripts. This process in sub-optimal, but currently this is the workflow.

### Website content (in the `website/` folder)

- Post data comes from markdown files (in `posts/`) where the front matter block contains the post properties (you can change them, but do not forget to update the `templateConfig` object literal (`generator.js`) as well).
- Pages (in `pages/`) are using templates and partials defined in the `layouts/` folder.
- The `config/site.config.js` file contains some of the site properties (like site title, author, description, social media links etc.) that are used in the EJS partials. Can also be extended it to your liking.

## Publish Website to Netlify

### Register at Netlify and publish your website

- Register on [Netlify](https://www.netlify.com/), and [see this tutorial video](https://www.netlify.com/docs/continuous-deployment/) if you are unfamiliar with the procedure.

- The `netlify.toml` configuration file contains important properties:

```raw
[build]
  base    = "/"
  publish = "public"
  command = "npm run build"
```

The base path, the build command, and the publish directory. You can keep those settings unchanged.

You can also define here some post-processing actions to be run in post-processing stages as part of Netlify's CI/CD pipeline.

Netlify builds your website with its buildbot. It starts a Docker container running the [Netlify build image](https://hub.docker.com/r/netlify/build/#!)
The container is basically a writable OverlayFS layer created on top of the numerous read-only OverlayFS layers of the Docker image (files copied on top of each other: each layer is represents a command in the Dockerfile). Which is destroyed after the build has been completed (the data can be made permanent using volumes which are kept).

The images are based on base images (the FROM statement at the first line of a Dockerfile) that are special distributions that "think they are operating systems", but are more lightweight that a complete OS.

[Alpine Linux](https://hub.docker.com/_/alpine/) if the most lightweight of them (around 5MB). Interesting to note, that [images can built from scratch as well](https://codeburst.io/docker-from-scratch-2a84552470c8) (scratch is a reserved image that is empty, and thus does nothing!). The base images are built this way ("FROM scratch").

Docker is using the kernel and the resources of the host (obviously), and are for process isolation. Containers are more lightweight, don't have the overheads Virtual Machines have. [More about this topic](https://www.simplilearn.com/tutorials/docker-tutorial/docker-vs-virtual-machine).

VMs are used for full isolation including resources (for example, to subdivide the server resources for shared hosting: each hosting having a computing power of X CPUs of X type, have X GB of memory and X GB storage space), and have a separate OS installed along with the host OS, so they do not share the kernel.

For Windows, you need to install Windows Subsystem for Windows 2 (WSL2) to have a distro based on Linux kernel installed. Although, there are container base images available for Windows as well. So, Docker can even use the Windows kernel, and thus a Linux kernel is not necessarly needed to be installed.

Lots of images are pre-compiled for us (like the `netlify/build` image) and stored in the DockerHub registry. You don't need to build them from Dockerfile, you just download them from the register.

If you know the basics of Docker, you can understand some things about Netlify as well.
Check these shell scripts out:

When the Docker fires up, this script runs:
https://github.com/netlify/build-image/blob/focal/run-build.sh

This is the Dockerfile from which the Netlify image is built (based on `ubuntu:20.04`):
https://github.com/netlify/build-image/blob/focal/Dockerfile

In the optional `_headers` file you can specify the HTTP headers and set Content Security Policy (CSP) rules for the Netlify server. Currently, CSP rules are commented out. You can also specify these in `netlify.toml`.

The `_redirects` file is currently empty. When you have a custom domain, you can make a redirect from _.netlify.com_ to your custom domain.

`sitemap.xml` is empty by default. static-site-express currently does not come with a feature to generate an XML sitemap.

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

For [Google Search Console](https://search.google.com/search-console/about) verification, you should have an HTML file from Google included in the root of your Netlify publish folder (in our case, `public`). The build script copies this file from `./content` to `./public`. **Change the filename in the array starting at line 78** in `./site-generator/core/generator.js` and rebuild the source into the `lib/` folder!

### Netlify Forms

Netlify automatically discovers the contact form via custom attributes added to the form.

### Netlify CMS

Set `display_url` to your custom domain in `content/admin/config.yml`

[Netlify CMS Docs](https://github.com/netlify/netlify-cms)

## Changelog

### v2.0.0 (14 August 2022)

**New:**

- This intended to be the last major version release.
- Refactor folder structure **(breaking change)**.
- Asset folder refactoring **(breaking change)**.
- Add config files for Tailwind, PostCSS, and Webpack.
- Webpack will used to bundle JS, and PostCSS to bundle CSS.
- Integrate TailwindCSS, use Flowbite UI component library with flowbite/typography (CSS+JS).
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
- remove Heroku Procfile.

**New/Update/Delete:**

- Define new, rename existing, remove not needed npm scripts.

### v1.0.2-alpha (28 April 2021)

- Update README.md.
- Update package version number.
- Set node version for Netlify to avoid package compatibility errors.
- Update Netlify CMS settings, change media folder, input types.
- Netlify CMS needs to have the website source files in src/ folder.

### v1.0.1-alpha (27 April 2021)

Incorrect configuration in docker-compose.yml.

- fix: "generator" and "devserver" services share volume data. "devserver" is dependent on the "generator" service.

Under testing. I haven't experienced any errors in this version.

### v1.0.0-alpha (25 April 2021) ! breaking change from previous versions !

- version re-started with _v1.0.0_ (from _4.1.0_).
- Update npm dependencies to the newest versions.
- Build script partial code refactoring, code styling.

Correct EJS syntax error after EJS version update.

- fix: From now on, EJS include directives should be in this format:

`<%- include ('partial/element-name') %>`

This is a **breaking change**, you should update your `partials/templates`!

Update build and watch scripts (using chokidar).

- update: build script content moved into a module (`generator.js`) to be used in a build and the chokidar-based watch scripts.

In 2019, chokidar was not watching file changes properly, thus the npm script was named "watch-exp". The default watch script is using nodemon.

Add flow types support and re-structure folders.

- new: add Flow, a static type checker for JavaScript.
- update: site generator source moved to `src/`, Babel will transpile the source into the `lib/` folder where originally the source were.
- update: website source is moved to `website/` folder, necessary code changes are applied.

Refactor site generator, code improvements, config changes.

- update: `package.json` add dotenv package, update npm scripts.
- update/add: refactor static site generator scripts, changes in methods, add types to code with flow, update/add comments to every method.
- add: lang and month names options to site.config.js.

Dockerize project

- new: read variables from `.env` file.
- new: add Dockerfile, docker-compose file, `.dockerignore`.

## Useful resources

- [Netlify Docs](https://docs.netlify.com/)
- [Netlify CMS docs](https://www.netlifycms.org/docs/intro/)
- [How the Netlify buildbot builds websites](https://www.netlify.com/blog/2016/10/18/how-our-build-bots-build-sites/)
- [Netlify Drop - formarly BitBalloon](https://www.netlify.com/blog/2018/08/14/announcing-netlify-drop-the-simplicity-of-bitballoon-with-the-added-power-of-netlify/)
- [Complete Intro to Netlify in 3.5 hours](https://www.netlify.com/blog/2019/10/07/complete-intro-to-netlify-in-3.5-hours/)
- [TailwindCSS Docs](https://tailwindcss.com/docs/installation)
- [TailwindCSS Setup](https://flaviocopes.com/tailwind-setup/)
- [Webpack tutorial](https://www.sitepoint.com/bundle-static-site-webpack/)
- [Terser Webpack plugin](https://webpack.js.org/plugins/terser-webpack-plugin/)
- [Flowbite UI library based on TailwindCSS](https://flowbite.com/docs/getting-started/introduction/)

## Known issues

### Chokidar regurarly crashes on Ubuntu 20.04 LTS (12 August 2022)

Bug: Problems with existing assets folder.

The build script should always delete the folders inside the public folder.
However, the assets folder is sometimes not deleted, so an exception occurs:
`[Error: EEXIST: file already exists, mkdir './public/assets']`

### Chokidar working properly on Ubuntu 20.04 (other distros not tested) (28 April 2021)

- Chokidar now can be safely used on Ubuntu

### Nodemon was not working properly on Ubuntu (2019)

- `nodemon` not trigger re-build on Linux on file changes (this behavior was experienced on Ubuntu 18.04 LTS Bionic Beaver)
- On Ubuntu, you can run `npm run watch-exp` command which uses the [chokidar](https://github.com/paulmillr/chokidar) package.

If you have a problem or a question about static-site-express, [open an issue here](https://github.com/SalsaBoy990/static-site-express/issues).

## Credits

The idea of making a static site generator in Node.js came from this good article by Douglas Matoso (not accessible any more): [Build a static site generator in 40 lines with Node.js](https://medium.com/douglas-matoso-english/build-static-site-generator-nodejs-8969ebe34b22).

This package uses modified code from [**doug2k1/nanogen**](https://github.com/doug2k1/nanogen) (mainly from the `legacy` branch and some ideas from the `master` branch) **Copyright: MIT (c) 2018 Douglas Matoso.**

## Licence

MIT licence - Copyright (c) 2022 András Gulácsi.
