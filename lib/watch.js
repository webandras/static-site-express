const chokidar = require('chokidar')
const log = require('./utils/logger')
const buildSite = require('./build-module')

// Build site from ./src to ./public folder
buildSite()

// Initialize watcher
const watcher = chokidar.watch('./src', { interval: 1000, persistent:true })
  .on('change', () => {
      // Build site from ./src to ./public folder
      buildSite()
  })
  .on('error', error => log(`Watcher error: ${error}`))
