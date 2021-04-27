// @flow
const md: any = require('markdown-it')()

module.exports = {
  // logger
  log: require('./utils/logger'),

  // load utility functions
  ssg: require('./generator/methods'),

  // file system module with extended functionality
  fse: require('fs-extra'),

  path: require('path'),

  // search for matching files, returns array of filenames
  glob: require('glob'),

  // render markdown to HTML
  md: md,

  // extensions for markdown-it used as middlewares
  implicitFigures: require('markdown-it-implicit-figures'),

  markdownItTable: require('markdown-it-multimd-table'),

  markdownItSup: require('markdown-it-sup'),

  markdownItSub: require('markdown-it-sub'),

  markdownItAttrs: require('markdown-it-attrs'),

  //markdownItHighlightjs: require('markdown-it-highlightjs'),

  markdownItVideo: require('markdown-it-video'),

  markdownItPodcast: require('markdown-it-podcast')
}