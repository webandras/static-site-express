const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')

// set port number
const port = process.env.PORT || 4000

// create express server
const app = express()

// Middlewares.
// GET favicon.ico
// app.use(favicon(path.join(__dirname, 'public/favicon.ico')))

// to serve the static files from the /public folder
app.use('/', express.static(path.join('public')))

// start the server
app.listen(port, () => {
  console.log(`Server is listening on localhost:${port}...`)
})
