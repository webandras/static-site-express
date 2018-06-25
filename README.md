# static-site-express
static-site-express is a simple Node.js based static-site generator (SSG) that uses EJS and Markdown. You can deploy your static site/blog to Netlify, or to Heroku.


## Manual

### 1. Installation


`npm install static-site-express`

Or clone my repository:

`git clone https://github.com/SalsaBoy990/static-site-express your-folder`


### 2. Generate website into `./public` folder

Build website: 

`npm run build`

Serve website on `localhost:4000`:

`npm run serve`

Or you can watch for changes and trigger re-build with nodemon:
`npm run watch`

Inspect `site.config.js` first. You can change the site properties (title, author, description, social media links etc.) that are used in the EJS partials. The site generator will insert your values into the right place.

The `./lib` folder contains the JS files used for building and serving the website.


### 3. Register at Netlify and publish your website

Register [here](https://www.netlify.com/){.underline}, and [see this tutorial video](https://www.netlify.com/docs/continuous-deployment/){.underline}.

Build command is: `npm run build`

Publish directory is: `public`

The `netlify.toml` configuration file already contains these two settings. You can publish your site in a minute.

### 4. You can use the Express server app on Heroku too

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

// An example, with some exeptions:
app.use(csp({
  directives: {
    defaultSrc: [`'self'`, 'https://maxcdn.bootstrapcdn.com'],
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
      'https://use.fontawesome.com'
    ],
    objectSrc: [`'self'`],
    connectSrc: [`'self'`]
  }
}))
````

## The idea of making a static site generator came from this article:

* Douglas Matoso 2017. [Build a static site generator in 40 lines with Node.js](https://medium.com/douglas-matoso-english/build-static-site-generator-nodejs-8969ebe34b22){.underline}. 


## Future tasks

* Use paginator on the index page


## Q&A

If you have a question ask me: [guland@protonmail.com](mailto:guland@protonmail.com){.underline}, or [open an issue here](https://github.com/SalsaBoy990/static-site-express/issues){.underline}.
