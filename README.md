# static-site-express
A simple static-site generator made in Node.js. You can deploy your static site/blog to Netlify.

Everything in the code is sync (async programming is not needed in this particular application).

The blogposts have to be in Markdown format. They will be rendered to HTML automatically.


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

The `database/` folder contains the JS scripts that handle the MySQL database (you can create a db and a table with `npm run db`) and exports data to `postdata.json` (with `npm run table`).

This JSON file is very important, because it contains the blogposts' properties (title, date etc.) that are needed for the sitebuild.

The SQL database have to contain the following columns:

* `id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY`,
* `title VARCHAR(255)`, // The title of the post
* `filename VARCHAR(255)`, // without extension: YYYY-MM-DD-title_of_the_post
* `date DATE`, // YYYY-MM-DD format
* `comments_enabled TINYINT`, // 1 or 0: turns on/off Disquis or the comment engine you prefer
* `topic VARCHAR(255)`, // topic of the post (optional)
* `description TEXT`, // short summary of the post
* `cover_image VARCHAR(255)`  // relative link to cover image, for example: ./assets/images/pic01.jpg


### 4. Fork my repository, or create a new repository

`git clone https://github.com/SalsaBoy990/static-site-express static-site-express`


### 5. Register at Netlify (it's free) anf publish your website/blog

Register here: https://www.netlify.com/

See this tutorial video: https://www.netlify.com/docs/continuous-deployment/

Build command is: `npm run build`

Publish directory is: `public`

If you have a question ask me: guland@protonmail.com, or open an issue here: https://github.com/SalsaBoy990/static-site-express/issues


#### The idea of making a static site generator came from this article:

Douglas Matoso 2017. Build a static site generator in 40 lines with Node.js. 
https://medium.com/douglas-matoso-english/build-static-site-generator-nodejs-8969ebe34b22


#### Future tasks

* Use paginator on the index page
* Blog archive needs improvements

