const fse = require('fs-extra')
const path = require('path')

// use promises
const { promisify } = require('util')
// renders ejs layouts to html
const ejsRenderFile = promisify(require('ejs').renderFile)

// search for matching files, returns array of filenames
const globP = promisify(require('glob'))

// site configuration properties to use in ejs templates
const config = require('../site.config')

// source directory
const srcPath = './src'
// destination folder to where the static site will be generated
const distPath = './public'

// clear destination folder first
fse.emptyDirSync(distPath)

// copy assets folder to destination
fse.copy(`${srcPath}/assets`, `${distPath}/assets`, handleError())
function handleError (err) {
  if (err) throw err
  console.log('Successfully copied assets folder!')
}

// cwd: current working directory
globP('**/*.ejs', { cwd: `${srcPath}/pages` })
  .then((files) => {
    files.forEach((file) => {
      const fileData = path.parse(file)
      // console.log(fileData)

      const destPath = path.join(distPath, fileData.dir)

      fse.mkdirs(destPath)
        .then(() => {
          // render page
          return ejsRenderFile(`${srcPath}/pages/${file}`, Object.assign({}, config))
        })
        .then((pageContents) => {
          let name = fileData.base
          // render layout with page contents
          switch (name) {
            case 'index.ejs':
              return ejsRenderFile(`${srcPath}/layouts/home.ejs`, Object.assign({}, config, { body: pageContents }))
            case 'about.ejs':
              return ejsRenderFile(`${srcPath}/layouts/about.ejs`, Object.assign({}, config, { body: pageContents }))
            case 'book.ejs':
              return ejsRenderFile(`${srcPath}/layouts/book.ejs`, Object.assign({}, config, { body: pageContents }))
            default:
              return ejsRenderFile(`${srcPath}/layouts/blogpost.ejs`, Object.assign({}, config, { body: pageContents }))
          }
        })
        .then((layoutContent) => {
          // save the html file
          fse.writeFile(`${destPath}/${fileData.name}.html`, layoutContent)
        })
        .catch(err => { console.error(err) })
    })
  })
  .catch(err => { console.error(err) })

console.log('Successful build! Everything is OK.')
