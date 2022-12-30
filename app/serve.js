(function () {
  "use strict";

  require("dotenv").config();

  const express = require("express");

  const path = require("path");

  const favicon = require("serve-favicon");

  const fs = require("fs-extra");

  const port = process.env.PORT || 4000;
  const nodeEnvironment = process.env.NODE_ENV || "development";

  if (port === undefined) {
    throw new Error(`Argument missing: port number not supplied`);
  } // create express server


  const app = express();

  if (nodeEnvironment === "production") {
    // Set Security Headers.
    const helmet = require("helmet");

    app.use(helmet()); // Content Security Policy.
    //const csp = require('helmet-csp')
    // These settings should be changed (these are just examples)

    /*app.use(csp({
      directives: {
        defaultSrc: [`'none'`],
        styleSrc: [`'self'`,
          'https://fonts.googleapis.com',
          'https://www.youtube.com',
          'https://maxcdn.bootstrapcdn.com/',
          '//cdnjs.cloudflare.com'
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
          'https://maxcdn.bootstrapcdn.com',
          '//cdnjs.cloudflare.com'
        ],
        childSrc: [`'self'`, 'https://www.youtube.com'],
        imgSrc: [`'self'`,
          'www.google-analytics.com',
          'https://use.fontawesome.com',
          'https://cloud.netlifyusercontent.com'
        ],
        objectSrc: [`'none'`],
        connectSrc: [`'self'`]
      }
    }))*/
  } // Middlewares.
  // GET favicon.ico


  app.use("/", favicon(path.join("public", "favicon.ico"))); // to serve the static files from the /public folder

  app.use("/", express.static(path.join("public")));
  app.get("*", (req, res) => {
    res.writeHead(200, {
      "Content-Type": "text/html"
    });
    fs.readFile(path.join("public", "404.html"), {
      encoding: "utf8"
    }, (err, data) => {
      if (err) throw err;
      res.end(data);
    });
  }); // start the server

  app.listen(port, () => {
    console.log(`Server is listening on localhost:${port}...`);
  });
})();