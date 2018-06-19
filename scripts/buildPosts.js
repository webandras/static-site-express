;(function () {
  'use strict'
  // file system module with extended functionality
  const fse = require('fs-extra')
  const path = require('path')

  // use promises to avoid callback hell and simplify code
  const { promisify } = require('util')
  // renders ejs layouts to html
  const ejsRenderFile = promisify(require('ejs').renderFile)

  // search for matching files, returns array of filenames
  const globP = promisify(require('glob'))

  // site configuration properties and blogpost metadata imported from MySQL database in JSON format
  const config = require('../site.config')

  // source directory
  const srcPath = './src'
  // destination folder to where the static site will be generated
  const distPath = './public'

  // clear destination folder first, it needs to be synchronous
  fse.emptyDirSync(distPath)

  // copy assets folder to destination (contains images, scripts and css)
  fse.copy(`${srcPath}/assets`, `${distPath}/assets`, handleError(null, 'assets'))
  // copy favicon folder to the root of /public folder
  fse.copy(`${srcPath}/favicon`, `${distPath}`, handleError(null, 'favicon'))
  function handleError (err, name) {
    if (err) throw err
    console.log(`Successfully copied ${name} folder!`)
  }

  const postData = config.site.postData

  // Store the paths to the blogposts for the links in the index page
  let pathsToPosts = []
  let parts

  // the postdata is in descending order already (newest post first)
  for (let i = 0; i < postData.length; i++) {
    parts = postData[i].filename.split('-')

    // year/month/day/title.html
    // store the post links for the index page
    pathsToPosts.push(`/${parts[0]}/${parts[1]}/${parts[2]}/${parts[3]}.html`)
  }

  fse.writeFileSync('./src/data/postUrls.json', JSON.stringify(pathsToPosts), 'utf8')

  // Iterator to fill the metas in the head with metadata
  let iterator = 0

  // Build the blogposts
  // cwd: current working directory
  globP('**/*.ejs', { cwd: `${srcPath}/posts` })
    .then((files) => {
      files.forEach((file) => {
        const fileData = path.parse(file)

        // generate canonical url for the post, and the disqus system
        let postUrl = config.site.url + '/'
        postUrl += (fileData.name.split('-').join('/') + '.html')

        // generate postid for the post (needed for disqus)
        let postId = fileData.name.split('-')
        postId.length = postId.length - 1
        postId = postId.join('')

        const destPath = path.join(distPath, fileData.dir)

        fse.mkdirs(destPath)
          .then(() => {
            // render page
            return ejsRenderFile(`${srcPath}/posts/${file}`, Object.assign({}, config))
          })
          .then((pageContents) => {
            return ejsRenderFile(`${srcPath}/layouts/blogpost.ejs`, Object.assign({}, config, {
              body: pageContents,
              postUrl: postUrl,
              postId: postId,
              postTitle: config.site.title + ': ' + config.site.postData[iterator].title,
              postDescription: config.site.postData[iterator].description,
              postImage: config.site.postData[iterator].cover_image,
              commentsEnabled: config.site.postData[iterator].comments_enabled
            }))
          })
          .then((layoutContent) => {
            iterator++
            // to store parts of the filename
            let parts = []

            // split filename to extract year, month, day, and the title of the post
            parts = fileData.name.split('-')

            // year/month/day/post_title.html
            let result = `${parts[0]}/${parts[1]}/${parts[2]}/${parts[3]}.html`

            // save the html file, it creates the non-existing folders too
            // saves blogposts to public/year/month/day/post_title.html
            fse.outputFile(`${destPath}/${result}`, layoutContent)
          })
          .catch(err => { console.error(err) })
      })
    })
    .catch(err => { console.error(err) })
})()
console.log('Successful build! Blogposts OK.')
