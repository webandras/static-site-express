;(function () {
  'use strict'
  // Load processing functions
  const ssg = require('./utils.js')()

  // file system module with extended functionality
  const fse = require('fs-extra')
  const path = require('path')

  // renders ejs layouts to html
  const ejsRender = require('ejs').render

  // render markdown to HTML
  const md = require('markdown-it')()
  const implicitFigures = require('markdown-it-implicit-figures')
  const markdownItTable = require('markdown-it-multimd-table')
  const markdownItSup = require('markdown-it-sup')
  const markdownItSub = require('markdown-it-sub')
  const markdownItAttrs = require('markdown-it-attrs')

  md.use(implicitFigures, {
    dataType: false, // <figure data-type="image">, default: false
    figcaption: true, // <figcaption>alternative text</figcaption>, default: false
    tabindex: false, // <figure tabindex="1+n">..., default: false
    link: false // <a href="img.png"><img src="img.png"></a>, default: false
  })

  md.use(markdownItTable)
  md.use(markdownItSup)
  md.use(markdownItSub)
  md.use(markdownItAttrs)

  // search for matching files, returns array of filenames
  const glob = require('glob')

  // site configuration properties
  const config = require('../site.config')

  // source directory
  const srcPath = './src'
  // destination folder to where the static site will be generated
  const distPath = './public'

  // Store the paths to the blogposts for the links in the index page
  const postsDataForIndexPage = []

  // clear destination folder first, it needs to be synchronous
  fse.emptyDirSync(distPath)

  // copy assets folder (contains images, scripts and css) and favicon folder to destination
  ssg.copyAssetsFaviconFolders(srcPath, distPath)

  // Build the blogposts
  // cwd: current working directory
  const files = glob.sync('**/*.@(ejs|md)', {
    cwd: `${srcPath}/posts`
  })

  try {
    files.forEach((file) => {
      const fileData = path.parse(file)

      // generate canonical url for the post
      const canonicalUrl = ssg.generateCanonicalURL(fileData, config)

      // generate postid for the post (needed for disqus)
      const postId = ssg.generatePostId(fileData)

      // make output directories for the posts
      const destPath = path.join(distPath, fileData.dir)
      fse.mkdirsSync(destPath)

      // file path
      const pathToFile = `${srcPath}/posts/${file}`

      // read data from file and then render post
      const postData = ssg.getPostDataFromMarkdown(pathToFile)

      // change date format
      const dateFormatted = ssg.convertDateFormat(postData, pathToFile)

      // convert md to HTML
      const postContents = md.render(postData.body)

      const templateConfig = Object.assign({}, config, {
        title: postData.attributes.title,
        date: dateFormatted,
        excerpt: postData.attributes.excerpt,
        comments: (postData.attributes.comments) ? postData.attributes.comments : false,
        topic: (postData.attributes.topic) ? postData.attributes.topic : false,
        body: postContents,
        canonicalUrl: canonicalUrl,
        postId: postId,
        postTitleMeta: config.site.title + ': ' + postData.attributes.title
      })

      // save postdata for the index page
      ssg.savePostDataForIndexPage(fileData, dateFormatted, postData, postsDataForIndexPage)

      // read layout data from file and then render layout with post contents
      const layoutContent = ejsRender(fse.readFileSync(`${srcPath}/layouts/blogpost.ejs`, 'utf-8'),
        templateConfig, { filename: `${srcPath}/layouts/blogpost.ejs` })

      // save the rendered blogposts to destination folder
      ssg.saveBlogpostsHTML(fileData, destPath, layoutContent)
    })
    console.log('Successful build. Posts OK...')
  } catch (err) {
    console.error(err)
    console.error('Build posts failed...')
  }

  let blogArchive = []

  // get the postsData for the archive on the index page grouped by year
  ssg.getDataForArchive(postsDataForIndexPage, config, blogArchive)

  // Build subpages (in our example the index, about, book pages)
  // cwd: current working directory
  const pages = glob.sync('**/*.ejs', {
    cwd: `${srcPath}/pages`
  })

  try {
    pages.forEach((file) => {
      const fileData = path.parse(file)
      const destPath = path.join(distPath, fileData.dir)

      // make directory
      fse.mkdirsSync(destPath)

      // read data from file and then render page
      const pageContents = ejsRender(fse.readFileSync(`${srcPath}/pages/${file}`, 'utf-8'), Object.assign({}, config, {
        postsDataForIndexPage: postsDataForIndexPage,
        blogArchive: blogArchive
      }))

      const name = fileData.base
      let layoutContent

      // read layout data from file and then render layout with page contents
      switch (name) {
        case 'index.ejs':
          layoutContent = ejsRender(fse.readFileSync(`${srcPath}/layouts/home.ejs`, 'utf-8'), Object.assign({}, config, postsDataForIndexPage, {
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
