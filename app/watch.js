const chokidar = require('chokidar');

const log = require('./utils/logger');

const buildSite = require('./core/generator'); // Initially build site from source to destination


buildSite(); // Initialize watcher

chokidar.watch('./content', {
  interval: 1000,
  persistent: true
}).on('change', () => {
  buildSite();
}).on('error', error => log.error(`Watcher error: ${error}`));