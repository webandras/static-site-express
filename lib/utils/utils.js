'use strict'
// module used for extracting the YAML headers from md files
const fm = require('front-matter')

// file system module with extended functionality
const fse = require('fs-extra')

// FACTORY FUNCTION
module.exports = {
  // copy assets folder (contains images, scripts and css) and favicon folder to destination
  copyAssetsFaviconFolders: copyAssetsFaviconFolders,

  // generate canonical url for the post
  generateCanonicalURL: generateCanonicalURL,

  // generate postid for the post (needed for disqus)
  generatePostId: generatePostId,

  // read data from file and then render post
  getPostDataFromMarkdown: getPostDataFromMarkdown,

  // change date format
  convertDateFormat: convertDateFormat,

  // save postdata for the index page
  savePostDataForIndexPage: savePostDataForIndexPage,

  // save the rendered blogposts to destination folder
  saveBlogpostsHTML: saveBlogpostsHTML,

  // get the postsData for the archive on the index page grouped by year
  getDataForArchive: getDataForArchive
}

// -----------------------------------------------------------------------------------------
// ------------------------- Functions Used for Site Generation ----------------------------
// -----------------------------------------------------------------------------------------

// copy assets folder (contains images, scripts and css) and favicon folder to destination
function copyAssetsFaviconFolders (srcPath, distPath) {
  'use strict'
  fse.copy(`${srcPath}/assets`, `${distPath}/assets`, handleError(null, 'assets'))
  // copy favicon folder to the root of /public folder
  fse.copy(`${srcPath}/favicon`, `${distPath}`, handleError(null, 'favicon'))
  function handleError (err, name) {
    if (err) throw err
    console.log(`Successfully copied ${name} folder!`)
  }
}

// generate canonical url for the post
function generateCanonicalURL (fileData, config) {
  'use strict'
  return config.site.url + '/' + (fileData.name.split('-').join('/') + '.html')
}

// generate postid for the post (needed for disqus)
function generatePostId (fileData) {
  'use strict'
  let postId = fileData.name.split('-')
  postId.length = postId.length - 1
  postId = postId.join('')
  return postId
}

// read data from file and then render post
function getPostDataFromMarkdown (pathToFile) {
  'use strict'
  const markdownData = fse.readFileSync(pathToFile, 'utf-8')
  const content = fm(markdownData)
  return content
}

// change date format
function convertDateFormat (postData, pathToFile) {
  'use strict'
  const dateParts = postData.attributes.date.split('-')

  // replace month number with month name
  const month = dateParts[1]

  switch (month) {
    case '01':
      return 'January ' + dateParts[2] + ', ' + dateParts[0]
    case '02':
      return 'February ' + dateParts[2] + ', ' + dateParts[0]
    case '03':
      return 'March ' + dateParts[2] + ', ' + dateParts[0]
    case '04':
      return 'April ' + dateParts[2] + ', ' + dateParts[0]
    case '05':
      return 'May ' + dateParts[2] + ', ' + dateParts[0]
    case '06':
      return 'June ' + dateParts[2] + ', ' + dateParts[0]
    case '07':
      return 'July ' + dateParts[2] + ', ' + dateParts[0]
    case '08':
      return 'August ' + dateParts[2] + ', ' + dateParts[0]
    case '09':
      return 'September ' + dateParts[2] + ', ' + dateParts[0]
    case '10':
      return 'October ' + dateParts[2] + ', ' + dateParts[0]
    case '11':
      return 'November ' + dateParts[2] + ', ' + dateParts[0]
    case '12':
      return 'December ' + dateParts[2] + ', ' + dateParts[0]
    default:
      throw new Error(`Invalid date format in ${pathToFile}`)
  }
}

// save postdata for the index page
function savePostDataForIndexPage (fileData, dateFormatted, postData, results) {
  'use strict'
  // split filename to extract year, month, day, and the title of the post
  const parts = fileData.name.split('-')

  // year/month/day/post_title.html
  const fileName = `/${parts[0]}/${parts[1]}/${parts[2]}/${parts[3]}.html`

  // Store the paths to the blogposts, in descending order by date
  // Here, the md files are in ascending order (oldest first),
  // so we need to be reverse the order for the index page
  results.unshift({
    pathToPost: fileName,
    title: postData.attributes.title,
    dateFormatted: dateFormatted,
    date: postData.attributes.date,
    excerpt: postData.attributes.excerpt,
    cover: postData.attributes.cover
  })
}

// save the rendered blogposts to destination folder
function saveBlogpostsHTML (fileData, destPath, layoutContent) {
  'use strict'
  // split filename to extract year, month, day, and the title of the post
  const parts = fileData.name.split('-')

  // year/month/day/post_title.html
  const fileName = `${parts[0]}/${parts[1]}/${parts[2]}/${parts[3]}.html`

  // saves the blogposts' html file to public/year/month/day/post_title.html
  fse.outputFileSync(`${destPath}/${fileName}`, layoutContent)
}

// get the postsData for the archive on the index page grouped by year
function getDataForArchive (data, config, results) {
  'use strict'
  let years = []
  let start = parseInt(data[0].date.split('-')[0], 10)
  let current

  // Get the year of the earliest post
  for (let i = 1; i < data.length; i++) {
    current = parseInt(data[i].date.split('-')[0], 10)
    if (current < start) {
      start = current
    }
  }

  // Put the years in an array in ascending order
  for (let i = start; i <= config.site.currentYear; i++) {
    years.push(i)
  }

  // Outer index: iterate through the years
  for (let i = start, j = 0; i <= config.site.currentYear; i++, j++) {
    let annualPosts = []

    // Inner index: iterate through the posts in the current year (outer index)
    for (let k = 0; k < data.length; k++) {
      let postYear = parseInt(data[k].pathToPost.split('/')[1], 10)

      // if year matches, store post title and link; ascending order
      if (postYear === i) {
        annualPosts.push({
          title: data[k].title,
          link: data[k].pathToPost
        })
      }
    }

    // results in descending order
    results.unshift({
      year: years[j],
      articles: annualPosts
    })
  }
}

// -----------------------------------------------------------------------------------------
// ---------------------------------------- End --------------------------------------------
// -----------------------------------------------------------------------------------------
