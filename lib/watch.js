const chokidar = require('chokidar');

const log = require('./utils/logger');

const buildSite = require('./generator'); // Build site from ./src to ./public folder


buildSite(); // Initialize watcher

chokidar.watch('./website', {
  interval: 1000,
  persistent: true
}).on('change', () => {
  // Build site from ./website to ./public folder
  buildSite();
}).on('error', error => log.error(`Watcher error: ${error}`));