// @flow
require("dotenv").config();
module.exports = function () {
  'use strict'

  /* =========================================================================
   * INITIALIZATIONS
   * =========================================================================
   */
  // store start time
  const startTime = process.hrtime()

  // Require all modules, wrap it into a single object
  const $ = require('./modules')

  // If any error occurs
  let hasError: boolean = false;

  // logger funtion on command line with styling
  $.log.info('Building site...')
  // site configuration properties
  const config = require('../../config/site.config')

  // source directory for website content
  const srcPath: string = './content'
  // destination folder to where the static site will be generated
  const distPath: string = './public'
  // Store the paths to the blogposts for the links in the index page
  const postsDataForIndexPage: any = []
  // Store posts data for the archive
  const blogArchive: any = []
  let searchIndexData: any = [];

  // function that renders ejs layouts to html
  const ejsRender = require('ejs').render

  /* =========================================================================
   * MIDDLEWARES
   * apply markdown-it middlewares
   * =========================================================================
   */
  // there are more extensions available of markdown-it, add more here and in `modules.js`
  $.md.use($.markdownItTable)
  $.md.use($.markdownItSup)
  $.md.use($.markdownItSub)
  $.md.use($.markdownItAttrs)

  $.md.use($.implicitFigures, {
    dataType: false, // <figure data-type="image">, default: false
    figcaption: true, // <figcaption>alternative text</figcaption>, default: false
    tabindex: false, // <figure tabindex="1+n">..., default: false
    link: false // <a href="img.png"><img src="img.png"></a>, default: false
  })

  $.md.use($.markdownItVideo, {
    youtube: { width: 560, height: 315 }
  })

  $.md.use($.markdownItPodcast, {
    url: '',
    height: 240,
    auto_play: false,
    hide_related: true,
    show_comments: true,
    show_user: true,
    show_reposts: false,
    visual: true
  })

  /* =========================================================================
   * ALGOLIA SEARCH - Generate search index if enabled
   * =========================================================================
   */
  if (config.site.enableSearch) {
    const algoliasearch = require("algoliasearch");
    const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_KEY);
    const index = client.initIndex(process.env.ALGOLIA_INDEX);
  }


  /* =========================================================================
   * COPY FILES TO DESTINATION 
   * clear destination folder first, it needs to be synchronous
   * =========================================================================
   */
  $.fse.emptyDirSync(distPath)

  // copy assets folder (contains images, scripts and css) and favicon folder to destination
  $.ssg.copyAssetsFaviconFolders(srcPath, distPath)

  // copy lang folder to destination
  $.ssg.copyLangFolder(srcPath, distPath)

    // copy data folder to destination
  $.ssg.copyDataFolder(srcPath, distPath)

  // copy these files to the root of /public folder
  // extend the list with new files here
  const filesToCopy = ["_redirects", "_headers", "robots.txt", "sitemap.xml", "google517a67c0c3ff6768.html"];

  try {
    filesToCopy.forEach((file) => {
      $.ssg.copyRootFile(file, srcPath, distPath)
    })
  } catch (err) {
    $.log.error(err)
    hasError = true;
  }

  // copy admin folder to the root of /public folder
  $.ssg.copyAdminFolder(srcPath, distPath)

  
  /* =========================================================================
   * BUILD THE BLOGPOSTS 
   * =========================================================================
   */
  const files = $.glob.sync("**/*.@(ejs|md)", {
    cwd: `${srcPath}/posts`,
    nosort: true,
  });

  // build blogposts, save post data for page you need to have your posts list to be rendered
  // (default here: the documentation page)
  try {
    files.forEach((file) => {
      const fileData = $.path.parse(file)

      // generate canonical url for the post
      const canonicalUrl = $.ssg.generateCanonicalURL(fileData, config)

      // generate postid for the post (needed for disqus)
      const postId = $.ssg.generatePostId(fileData)

      // make output directories for the posts
      const destPath = $.path.join(distPath, fileData.dir)
      $.fse.mkdirsSync(destPath)

      // file path
      const pathToFile = `${srcPath}/posts/${file}`

      // read data from file and then render post
      const postData = $.ssg.getPostDataFromMarkdown(pathToFile)

      // change date format
      const dateFormatted = $.ssg.convertDateFormat(postData, pathToFile, config.site.monthNames, config.site.lang)

      // convert md to HTML
      const postContents = $.md.render(postData.body)

      const templateConfig = Object.assign({}, config, {
        title: postData.attributes.title,
        breadcrumbTitle: "Writings",
        author: postData.attributes.author,
        date: dateFormatted,
        excerpt: postData.attributes.excerpt,
        topic: postData.attributes.topic ? postData.attributes.topic : false,
        comments: postData.attributes.comments ? postData.attributes.comments : false,
        body: postContents,
        canonicalUrl: canonicalUrl,
        postId: postId,
        coverImage: postData.attributes.coverImage,
        postTitleMeta: postData.attributes.title + " | " + config.site.title,
        pageName: "writings",
        isPost: true,
      });

      if (config.site.enableSearch) {
        searchIndexData.push({
          /**
           * The object's unique identifier
           */
          objectID: postData.attributes.date,

          /**
           * The URL where the Algolia Crawler found the record
           */
          url: canonicalUrl,

          /**
           * The lang of the page
           * - html[attr=lang]
           */
          lang: config.site.lang,

          /**
           * The title of the page
           * - og:title
           * - head > title
           */
          title: postData.attributes.title,

          /**
           * The description of the page
           * - meta[name=description]
           * - meta[property="og:description"]
           */
          description: postData.attributes.excerpt,

          /**
           * The image of the page
           * - meta[property="og:image"]
           */
          image: config.site.seoUrl + "/assets/images/uploads/" + postData.attributes.coverImage,

          /**
           * The authors of the page
           * - `author` field of JSON-LD Article object: https://schema.org/Article
           * - meta[property="article:author"]
           */
          authors: [config.site.author],

          /**
           * The publish date of the page
           * - `datePublished` field of JSON-LD Article object: https://schema.org/Article
           * - meta[property="article:published_time"]
           */
          datePublished: postData.attributes.date,

          /**
           * The category of the page
           * - meta[property="article:section"
           * - meta[property="product:category"]
           */
          category: postData.attributes.topic || "",

          /**
           * The content of your page
           */
          content: postContents,
        });
      }

      // save postdata for the index page
      $.ssg.savePostDataForIndexPage(fileData, dateFormatted, postData, postsDataForIndexPage)

      // read layout data from file and then render layout with post contents
      const layoutContent = ejsRender(
        $.fse.readFileSync(`${srcPath}/layouts/blogpost.ejs`, 'utf-8'),
        templateConfig,
        { filename: `${srcPath}/layouts/blogpost.ejs`, async: false }
      )

      // save the rendered blogposts to destination folder
      $.ssg.saveBlogpostsHTML(fileData, destPath, layoutContent)

      // Test
      // console.log(JSON.stringify(searchIndexData));
      // $.fse.writeFileSync(`${srcPath}/algoliaindex.json`, JSON.stringify(searchIndexData));

      if (!config.site.enableSearch) {
        // Update or create records of the Algolia Search index
        index.partialUpdateObjects(searchIndexData, {
          createIfNotExists: true,
        });
      }
    });
  } catch (err) {
    $.log.error(err)
    $.log.info('Build posts failed...')
    hasError = true;
  }

  /* =========================================================================
   * GET POSTS DATA FOR THE ARCHIVE
   * get the postsData for the archive on the index page grouped by year
   * =========================================================================
   */
  $.ssg.getDataForArchive(postsDataForIndexPage, config, blogArchive)


  /* =========================================================================
   * BUILD THE PAGES 
   * =========================================================================
   */
  const pages = $.glob.sync('**/*.ejs', {
    cwd: `${srcPath}/pages`
  })

  try {
    pages.forEach((file) => {
      const fileData = $.path.parse(file)
      const destPath = $.path.join(distPath, fileData.dir)

      // make directory
      $.fse.mkdirsSync(destPath)

      // read data from file and then render page
      const pageContents = ejsRender(
        $.fse.readFileSync(`${srcPath}/pages/${file}`, "utf-8"),
        Object.assign({}, config, {
          postsDataForIndexPage,
          blogArchive,
        })
      );

      const name = fileData.base
      let layoutContent

      // read layout data from file and then render layout with page contents
      switch (name) {
        case "index.ejs":
          layoutContent = ejsRender(
            $.fse.readFileSync(`${srcPath}/layouts/home.ejs`, "utf-8"),
            Object.assign({}, config, {
              title: config.site.title,
              breadcrumbTitle: config.site.title,
              body: pageContents,
              canonicalUrl: config.site.seoUrl + '/',
              description: config.site.description,
              currentYear: config.site.currentYear,
              isPost: false,
              pageName: "index",
            }),
            {
              filename: `${srcPath}/layouts/home.ejs`,
            }
          );
          break;

        case "contact.ejs":
          layoutContent = ejsRender(
            $.fse.readFileSync(`${srcPath}/layouts/default.ejs`, "utf-8"),
            Object.assign({}, config, {
              title: "Contact Me | " + config.site.title,
              breadcrumbTitle: "Contact Me",
              body: pageContents,
              canonicalUrl: config.site.seoUrl + '/' + fileData.name,
              description: config.site.quote,
              isPost: false,
              pageName: "contact",
            }),
            {
              filename: `${srcPath}/layouts/default.ejs`,
            }
          );
          break;

        case "writings.ejs":
          layoutContent = ejsRender(
            $.fse.readFileSync(`${srcPath}/layouts/writings.ejs`, "utf-8"),
            Object.assign({}, config, {
              title: "Writings | " + config.site.title,
              breadcrumbTitle: "Writings",
              body: pageContents,
              canonicalUrl: config.site.seoUrl + "/" + fileData.name,
              description: config.site.quote,
              isPost: false,
              pageName: "writings",
              algoliaAppId: process.env.ALGOLIA_APP_ID,
              algoliaIndex: process.env.ALGOLIA_INDEX,
              algoliaSearchKey: process.env.ALGOLIA_SEARCH_KEY,
              indexName: process.env.ALGOLIA_INDEX,
            }),
            {
              filename: `${srcPath}/layouts/writings.ejs`,
            }
          );
          break;

        case "message-sent.ejs":
          layoutContent = ejsRender(
            $.fse.readFileSync(`${srcPath}/layouts/default.ejs`, "utf-8"),
            Object.assign({}, config, {
              title: "Message sent! | " + config.site.title,
              breadcrumbTitle: "Message sent!",
              body: pageContents,
              canonicalUrl: config.site.seoUrl + "/" + fileData.name,
              description: config.site.quote,
              isPost: false,
              pageName: "message-sent",
            }),
            {
              filename: `${srcPath}/layouts/default.ejs`,
            }
          );
          break;

        // 404 page
        default:
          layoutContent = ejsRender(
            $.fse.readFileSync(`${srcPath}/layouts/default.ejs`, "utf-8"),
            Object.assign({}, config, {
              title: "404: Page not found | " + config.site.title,
              breadcrumbTitle: "Page not found",
              body: pageContents,
              canonicalUrl: "",
              description: config.site.quote,
              isPost: false,
              pageName: "404",
            }),
            {
              filename: `${srcPath}/layouts/default.ejs`,
            }
          );
          break;
      }
      // save the html file
      $.fse.writeFileSync(`${destPath}/${fileData.name}.html`, layoutContent)
    })
  } catch (err) {
    $.log.error(err)
    $.log.error('Build pages failed...')
    hasError = true;
  }

  // display build time
  const timeDiff = process.hrtime(startTime)
  const duration = timeDiff[0] * 1000 + timeDiff[1] / 1e6

  if (!hasError) {
    $.log.success(`Site built successfully in ${duration}ms`)
  } else {
    $.log.error(`Site built failed in ${duration}ms`);
  }
}
