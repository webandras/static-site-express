# static-site-express
A simple static-site generator made in Node.js. You can deploy your static site/blog to Netlify.

Everything in the code is sync (async programming is not needed in this particular application).

The blogposts have to be in Markdown format. They will be rendered to HTML automatically.


## MANUAL

### 1. Install Node packages
`npm install`


### 2. Build site and serve it at localhost:4000

`npm run build`

`npm run serve`

Or you can do both with:

`npm run build-serve`

Inspect `site.config.js` first. A lot of things are self explanatory. There are comments in the codes.

The `script/` folder contains the JS files used for building the site and serving it at localhost:4000.


### 3. Clone / fork my repository, or create a new repository

`git clone https://github.com/SalsaBoy990/static-site-express static-site-express`


### 4. Register at Netlify and publish your website/blog

Register here: https://www.netlify.com/

See this tutorial video: https://www.netlify.com/docs/continuous-deployment/

Build command is: `npm run build`

Publish directory is: `public`

### 5. You can also use the Express server on Heroku

The server will run on Heroku, but you need improve security!
(For serving on localhost there is no need for this).

You should set security headers with the `Helmet` package:

````javascript
// Set Security Headers.
const helmet = require('helmet')

app.use(helmet())
````

You can also add CSP:

````javascript
// Content Security Policy.
const csp = require('helmet-csp')

// An example:
app.use(csp({
  directives: {
    defaultSrc: [`'self'`],
    styleSrc: [`'self'`, 'https://fonts.googleapis.com', 'https://www.youtube.com'],
    fontSrc: [`'self'`, 'https://fonts.gstatic.com/'],
    scriptSrc: [`'self'`, 'https://www.youtube.com','https://www.googletagmanager.com', 'https://www.google-analytics.com'],
    childSrc: [`'self'`, 'https://www.youtube.com'],
    imgSrc: [`'self'`, 'www.google-analytics.com'],
    objectSrc: [`'self'`],
    connectSrc: [`'self'`]
  }
}))
````

You need to have a `Procfile` for Heroku (already supplied for you) with the following content:

`web: node ./scripts/serve.js`

You have to build the site in the `public/` folder first. Change the `.gitignore` rules too!


If you have a question ask me: guland@protonmail.com, or open an issue here: https://github.com/SalsaBoy990/static-site-express/issues


#### The idea of making a static site generator came from this article:

Douglas Matoso 2017. Build a static site generator in 40 lines with Node.js. 
https://medium.com/douglas-matoso-english/build-static-site-generator-nodejs-8969ebe34b22


#### Future tasks

* Use paginator on the index page

