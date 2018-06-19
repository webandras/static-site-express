(function () {
  'use strict'
  const express = require('express')
  const path = require('path')
  const favicon = require('serve-favicon')
  const fs = require('fs-extra')

  // set port number
  const port = process.env.PORT || 4000

  // create express server
  const app = express()

  // Middlewares.
  // GET favicon.ico
  app.use('/', favicon(path.join('public', 'favicon.ico')))

  // to serve the static files from the /public folder
  app.use('/', express.static(path.join('public')))

  app.get('*', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    fs.readFile(path.join('public', '404.html'), { encoding: 'utf8' }, (err, data) => {
      if (err) throw err
      res.end(data)
    })
  })

  // start the server
  app.listen(port, () => {
    console.log(`Server is listening on localhost:${port}...`)
  })
})()
