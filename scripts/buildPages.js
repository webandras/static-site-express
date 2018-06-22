;(function () {
  'use strict'
  // file system module with extended functionality
  const fse = require('fs-extra')
  const path = require('path')

  // renders ejs layouts to html
  const ejsRender = require('ejs').render

  // search for matching files, returns array of filenames
  const glob = require('glob')

  // site configuration properties and blogpost metadata imported from MySQL database in JSON format
  const config = require('../site.config')

  const pathsToPosts = require('../src/data/postUrls.json')

  // source directory
  const srcPath = './src'
  // destination folder to where the static site will be generated
  const distPath = './public'

  // Build subpages (in our example the index, about, book pages)
  // cwd: current working directory
  const files = glob.sync('**/*.ejs', {
    cwd: `${srcPath}/pages`
  })

  try {
    files.forEach((file) => {
      const fileData = path.parse(file)
      const destPath = path.join(distPath, fileData.dir)

      // make directory
      fse.mkdirsSync(destPath)

      // read data from file and then render page
      const pageContents = ejsRender(fse.readFileSync(`${srcPath}/pages/${file}`, 'utf-8'), Object.assign({}, config, {
        pathsToPosts: pathsToPosts
      }))

      let name = fileData.base
      let layoutContent

      // read layout data from file and then render layout with page contents
      switch (name) {
        case 'index.ejs':
          layoutContent = ejsRender(fse.readFileSync(`${srcPath}/layouts/home.ejs`, 'utf-8'), Object.assign({}, config, {
            title: config.site.title,
            body: pageContents,
            canonicalUrl: config.site.url,
            description: config.site.quote
          }), { filename: `${srcPath}/layouts/home.ejs` })
          break
        case 'about.ejs':
          layoutContent = ejsRender(fse.readFileSync(`${srcPath}/layouts/about.ejs`, 'utf-8'), Object.assign({}, config, {
            title: 'About / ' + config.site.title,
            body: pageContents,
            canonicalUrl: config.site.url + '/about',
            description: config.site.description
          }), { filename: `${srcPath}/layouts/about.ejs` })
          break
        case 'book.ejs':
          layoutContent = ejsRender(fse.readFileSync(`${srcPath}/layouts/book.ejs`, 'utf-8'), Object.assign({}, config, {
            title: 'Book / ' + config.site.title,
            body: pageContents,
            canonicalUrl: config.site.url + '/book',
            description: config.site.bookTitle
          }), { filename: `${srcPath}/layouts/book.ejs` })
          break
        case 'moderation_rules.ejs':
          layoutContent = ejsRender(fse.readFileSync(`${srcPath}/layouts/default.ejs`, 'utf-8'), Object.assign({}, config, {
            title: 'Moderation rules / ' + config.site.title,
            body: pageContents,
            canonicalUrl: config.site.url + '/' + fileData.name,
            description: `My blog's moderation rules`
          }), { filename: `${srcPath}/layouts/default.ejs` })
          break
        default:
          layoutContent = ejsRender(fse.readFileSync(`${srcPath}/layouts/not-found.ejs`, 'utf-8'), Object.assign({}, config, {
            title: '404: Not Found / ' + config.site.title,
            body: pageContents,
            canonicalUrl: config.site.url + '/' + fileData.name,
            description: 'Are you sure this is the right url?'
          }), { filename: `${srcPath}/layouts/not-found.ejs` })
          break
      }
      // save the html file
      fse.writeFileSync(`${destPath}/${fileData.name}.html`, layoutContent)
    })
    console.log('Successful build. Pages OK...')
  } catch (err) {
    console.error(err)
    console.error('Build pages failed...')
  }
})()
