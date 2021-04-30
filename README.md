# static-site-express

static-site-express is a simple Node.js based static-site generator that uses EJS and Markdown. Deploy your static site to Netlify or any platform to your liking. Suited for blogging, documentation sites, hobby projects, etc.


## Documentation 2021


### Install static-site-express

1. Fork and clone this repository to get a bare bone starter where you can work almost from scratch

````raw
git clone https://github.com/SalsaBoy990/static-site-express name-of-your-site
````

2. If you want to have an exact replica of the [project's website](https::static-site-express.netlify.com/), fork and clone this repo instead:

````raw
git clone https://github.com/SalsaBoy990/static-site-express-example
````

(Note: Netlify will build your site from the default branch (usually the `master`).
You can use a different branch other than the default one, but in that case Netlify CMS will not work properly. For example, the images uploaded through the CMS will be pushed into the default branch, not the other you set up in Netlify!)


(Alternative: Use the 'Deploy to Netlify' button at the [project's website](https://static-site-express.netlify.com/), but it is not recommended)


### Build your site locally without Docker

Use npm scripts defined in package.json

1. Build site from `./src` into the `./public` folder:

````raw
npm run build
````

2. Serve website on `localhost:4000`:

````raw
npm run serve
````

3a. Watch for changes and trigger auto re-build with nodemon:

````raw
npm run watch-nodemon
````

3b. Watch for changes and trigger auto re-build with chokidar:

````raw
npm run watch-chokidar
````


### Build your site locally with Docker

Install Docker Engine on your operating system:
https://docs.docker.com/engine/

Build the container for the first time (on Windows):
- `(set -a; source .env; docker-compose up --build)`

On Linux distros add `sudo`:
- `set -a`
- `source .env`
- `sudo docker-compose up --build`

Stop container from running:
`docker-compose down`

Start container:
`docker-compose up`

There are two services
1. your_app_name_generator: watches changes and auto re-builds (default: with chokidar, but nodemon can also be used)
2. your_app_name_devserver: runs Express development server on the port specified in the .env file (default: 4000)


### Modify the site generator's source code

The JavaScript source is in the `site-generator/` folder. These files also contain the flow type annotations.
You only need to modify the `generator.js` and the `generator/methods.js` files.

- `methods.js` contains most of the methods for the generator.
- In `generator.js`, you can modify the pages you want to generate in the switch statements starting from **line 183**. You also need to create a page (`.ejs`) in the `pages/` folder, and a template (in `layouts/`) to be used for that page (or use one of the pre-existing templates like `default.ejs`).

- Post properties can be extended on **line 100**, in the `templateConfig` object literal (`generator.js`)

After making changes, the source must be transpiled by Babel into ES5 into the `lib/` folder with:
- `npm run transpile-flow`

Optionally, the standard style can also be applied:
- `npm run standard-fix`

However, Babel already formats the code into a unified code styling.

At the end of the process, restart build/watch scripts. I know, this process in sub-optimal, but currently this is the workflow.

### Data sources (in the `src/` folder)

- Post data comes from markdown files (in `posts/`) where the front matter block contains the post properties.
- Pages (in `pages/`) are using templates and partials defined in the `layouts/` folder.
- The `site.config.js` file contains some of the site properties (like site title, author, description, social media links etc.) that are used in the EJS partials.


## Updates

### Generator updates in 2021
- Update used npm modules to their newest versions. Re-examine and improve the code... DONE.
- Previously, I did not manage git very well (commit messages, semver, missing version tags etc.), so I decided to change version to 1.0.0 in the newest release... DONE.
- Use git flow and proper semver from now on... DONE.
- Dockerize project... DONE.
- Improve watch mode... DONE.
- Document possible breaking changes from the previous 2019 version... DONE.
- Keep EJS templating, Netlify CMS, Netlify and Heroku support... DONE.
- Re-design the example website... IDEA DROPPED.
- Move the source of the example website to a new repository... DONE.
- Create a minimalistic starter template without any styling and with a little dummy data... DONE.
- Update documentation... DONE.
- TODO: Create a cmd tool to automatically create pages and templates, and update the generator's code
- TODO: Create a minimalistic e-commerce starter template by integrating Snipcart (it is actually very simple to do it :) )

## Changelog

### v1.0.2-alpha (28 April 2021)

- Update README.md
- Update package version number
- Set node version for Netlify to avoid package compatibility errors
- Update Netlify CMS settings, change media folder, input types
- Netlify CMS needs to have the website source files in src/ folder

### v1.0.1-alpha (27 April 2021)

Incorrect configuration in docker-compose.yml
- fix: "generator" and "devserver" services share volume data. "devserver" is dependent on the "generator" service.

Under testing. I haven't experienced any errors in this version.

### v1.0.0-alpha (25 April 2021) ! breaking change from previous versions !

- version re-started with *v1.0.0* (from *4.1.0*)
- Update npm dependencies to the newest versions
- Build script (partial) code refactoring, code styling

Correct EJS syntax error after EJS version update
- fix: From now on, EJS include directives should be in this format:

`<%- include ('partial/element-name') %>`

This is a **breaking change**, you should update your partials/templates!

Update build and watch scripts (using chokidar)
- update: build script content moved into a module (generator.js) to be used in a build and the chokidar-based watch scripts.

In 2019, chokidar was not watching file changes properly, thus the npm script was named "watch-exp". The default watch script is using nodemon. Both will be kept in the future.

Add flow types support and re-structure folders
- new: add Flow, a static type checker for JavaScript
- update: site generator source moved to src/, Babel will transpile the source into the lib/ folder where originally the source were
- update: website source is moved to website/ folder, necessary code changes are applied

Refactor site generator, code improvements, config changes
- update: package.json add dotenv package, update npm scripts
- update/add: refactor static site generator scripts, changes in methods, add types to code with flow, update/add comments to every method
- add: lang and month names options to site.config.js

Dockerize project
- new: read variables from .env file
- new: add Dockerfile, docker-compose file, .dockerignore

See: https://github.com/SalsaBoy990/static-site-express/releases


## Important notes

### Chokidar working properly on Ubuntu 20.04 (other distros not tested) (28 April 2021)
- Chokidar now can be safely used on Ubuntu

### Chokidar was not working properly on Ubuntu (2019)
- `nodemon` not trigger re-build on Linux on file changes (this behavior was experienced on Ubuntu 18.04 LTS Bionic Beaver)
- On Ubuntu, you can run `npm run watch-exp` command which uses the [chokidar](https://github.com/paulmillr/chokidar) package.

### Register at Netlify and publish your website

- Register on [Netlify](https://www.netlify.com/), and [see this tutorial video](https://www.netlify.com/docs/continuous-deployment/) if you are unfamiliar with the procedure.

- The `netlify.toml` configuration file contains important properties:

````raw
[build]
  base    = "/"
  publish = "public"
  command = "npm run build"
````

The base path, the build command, and the publish directory. You can keep those settings.

In the `_headers` file you can specify the HTTP headers and set Content Security Policy (CSP) rules for the Netlify server. Currently, CSP rules are not set. I recommend you the [CSP Evaluator by Google](https://csp-evaluator.withgoogle.com/).

The `_redirects` file is currently empty. When you have a custom domain, you can make a redirect from *.netlify.com* to your custom domain.

`sitemap.xml` is empty by default.

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
````

For [Google Search Console](https://search.google.com/search-console/about) verification, you should have an HTML file from Google included in the root of your Netlify publish folder (in our case, public). The build script copies this file from `./src` to `./public`. **Change the filename in the array at line 67** in `./site-generator/generator.js` and rebuild the source into the `lib/` folder!


### Alternatively, you can use the Express server app on Heroku (not recommended)

A `Procfile` is already supplied for you with the command to build the site, and after that, to run the app server:

````raw
web: npm run heroku
````

You need to improve security! I already set security headers with the `helmet` npm package, just 2 lines:

````javascript
// Set Security Headers.
const helmet = require('helmet')
app.use(helmet())
````

Also, you can set Content Security Policy (CSP) rules using the `helmet-csp` package.

Keep in mind that the contact form on the example site only works on Netlify!!

### Q&A

If you have a problem or a question about static-site-express, [open an issue here](https://github.com/SalsaBoy990/static-site-express/issues).

PS. The idea of making a static site generator in Node.js came from this good article by Douglas Matoso: [Build a static site generator in 40 lines with Node.js](https://medium.com/douglas-matoso-english/build-static-site-generator-nodejs-8969ebe34b22).
