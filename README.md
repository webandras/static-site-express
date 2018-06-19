# static-site-express
A simple static-site generator made in Node.js. You can deploy your static site to Netlify.

## MANUAL

### Install MySQL on your computer
https://dev.mysql.com/downloads/installer/


### Install packages
`npm install`


### Build page and serve at localhost:4000
`npm run build`
`npm run serve`

Inspect `site.config.js` first. A lot of things are self explanatory. There are comments in the codes. The `script/` folder
contains the JS files used for building the site and serving it at localhost:4000. The `database/` folder contains the JS scripts
that handles the MySQL database (you can create a db and a table with `npm run db`) and exports data to `postdata.json` (with `npm run table`. This JSON file is very important,
bacause it contains the blogposts' properties (title, date etc.) that are needed for the sitebuild.


### Fork my repository, or create a new repository


### Register at Netlify (it is completely free)

https://www.netlify.com/

See this tutorial video: https://www.netlify.com/docs/continuous-deployment/

Build command is: `npm run build`
Publish directory is: `public`


If you have a question ask me: guland@protonmail.com, or open an issue here: https://github.com/SalsaBoy990/static-site-express/issues
