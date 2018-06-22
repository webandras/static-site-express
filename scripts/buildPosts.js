;(function () {
  'use strict'
  // file system module with extended functionality
  const fse = require('fs-extra')
  const path = require('path')

  // renders ejs layouts to html
  const ejsRender = require('ejs').render

  // render markdown to HTML
  const md = require('markdown-it')()

  // search for matching files, returns array of filenames
  const glob = require('glob')

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
  // reverse order, because md files are in ascending order by date
  let iterator = postData.length - 1

  // Build the blogposts
  // cwd: current working directory
  const files = glob.sync('**/*.@(ejs|md)', {
    cwd: `${srcPath}/posts`
  })

  try {
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

      fse.mkdirsSync(destPath)

      // read data from file and then render post
      const markdownData = fse.readFileSync(`${srcPath}/posts/${file}`, 'utf-8')
      const HTMLData = md.render(markdownData)

      const postContents = ejsRender(HTMLData, Object.assign({}, config))

      // read layout data from file and then render layout with post contents
      const layoutContent = ejsRender(fse.readFileSync(`${srcPath}/layouts/blogpost.ejs`, 'utf-8'), Object.assign({}, config, {
        title: config.site.postData[iterator].title,
        date: config.site.dateFormatted[iterator],
        body: postContents,
        postUrl: postUrl,
        postId: postId,
        postTitle: config.site.title + ': ' + config.site.postData[iterator].title,
        postDescription: config.site.postData[iterator].description,
        postImage: config.site.postData[iterator].cover_image,
        commentsEnabled: config.site.postData[iterator].comments_enabled
      }), { filename: `${srcPath}/layouts/blogpost.ejs` })

      iterator--

      // to store parts of the filename
      let parts = []

      // split filename to extract year, month, day, and the title of the post
      parts = fileData.name.split('-')

      // year/month/day/post_title.html
      let result = `${parts[0]}/${parts[1]}/${parts[2]}/${parts[3]}.html`

      // save the html file, it creates the non-existing folders too
      // saves blogposts to public/year/month/day/post_title.html
      fse.outputFileSync(`${destPath}/${result}`, layoutContent)
    })
    console.log('Successful build. Posts OK...')
  } catch (err) {
    console.error(err)
    console.error('Build posts failed...')
  }
})()
