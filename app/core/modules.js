const md = require('markdown-it')();

module.exports = {
  // logger
  log: require('../utils/logger'),
  // load utility functions
  ssg: require('../methods/methods'),
  // file system module with extended functionality
  fse: require('fs-extra'),
  // path utilities
  path: require('path'),
  // search for matching files, returns array of filenames
  glob: require('glob'),
  // render markdown to HTML
  md: md,
  // EXTENSIONS for markdown-it (used as middlewares)
  implicitFigures: require('markdown-it-implicit-figures'),
  markdownItTable: require('markdown-it-multimd-table'),
  markdownItSup: require('markdown-it-sup'),
  markdownItSub: require('markdown-it-sub'),
  markdownItAttrs: require('markdown-it-attrs'),
  markdownItVideo: require('markdown-it-video'),
  markdownItPodcast: require('markdown-it-podcast')
};