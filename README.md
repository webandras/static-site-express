# static-site-express
A simple static-site generator made in Node.js. You can deploy your static site/blog to Netlify.

## MANUAL

### 1. Install MySQL on your computer
https://dev.mysql.com/downloads/installer/


### 2. Install packages
`npm install`


### 3. Build site and serve it at localhost:4000

`npm run build`
`npm run serve`

Inspect `site.config.js` first. A lot of things are self explanatory. There are comments in the codes.

The `script/` folder contains the JS files used for building the site and serving it at localhost:4000.

The `database/` folder contains the JS scripts that handles the MySQL database (you can create a db and a table with `npm run db`) and exports data to `postdata.json` (with `npm run table`. This JSON file is very important, because it contains the blogposts' properties (title, date etc.) that are needed for the sitebuild.


### 4. Fork my repository, or create a new repository


### 5. Register at Netlify (it's free) anf publish your website/blog

https://www.netlify.com/

See this tutorial video: https://www.netlify.com/docs/continuous-deployment/

Build command is: `npm run build`

Publish directory is: `public`


If you have a question ask me: guland@protonmail.com, or open an issue here: https://github.com/SalsaBoy990/static-site-express/issues


#### The idea of making a static site generator came from this article:

Build a static site generator in 40 lines with Node.js
https://medium.com/douglas-matoso-english/build-static-site-generator-nodejs-8969ebe34b22


#### Future tasks

Make everything sync. Async processing is unnecessary.

