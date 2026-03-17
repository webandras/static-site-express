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
  }

  // create express server
  const app = express();

  /* =========================================================================
   * MIDDLEWARES
   * =========================================================================
   */

  // Add intentional latency for every request
  // During the build process (when all files are re-copied into the public folder),
  // sometimes not all html files are available on time to be served, so the server will crash.
  // It happens rarely. This modification decreases the frequency / likelihood of this "race condition".
  app.use((req, res, next) => setTimeout(next, 1000));

  // GET favicon.ico
  app.use("/", favicon(path.join("public", "favicon.ico")));

  // to serve the static files from the /public folder
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
  });

  // start the server
  app.listen(port, () => {
    console.log(`Server is listening on localhost:${port}...`);
  });
})();
