'use strict'; // module used for extracting the YAML headers from md files

const fm = require('front-matter'); // file system module with extended functionality


const fse = require('fs-extra'); // FACTORY FUNCTION


module.exports = {
  // copy assets folder (contains images, scripts and css) and favicon folder to destination
  copyAssetsFaviconFolders: copyAssetsFaviconFolders,
  // copy admin folder to the root of /public folder
  copyAdminFolder: copyAdminFolder,
  // copy _headers file to the root of /public folder
  copyRootFile: copyRootFile,
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
}; // -----------------------------------------------------------------------------------------
// ------------------------- Functions Used for Site Generation ----------------------------
// -----------------------------------------------------------------------------------------
// copy assets folder (contains images, scripts and css) and favicon folder to destination

function copyAssetsFaviconFolders(srcPath, distPath) {
  'use strict';

  fse.copy(`${srcPath}/assets`, `${distPath}/assets`, handleError(null, 'assets')); // copy favicon folder to the root of /public folder

  fse.copy(`${srcPath}/favicon`, `${distPath}`, handleError(null, 'favicon'));
} // Handle arror for folder copy


function handleError(err, name) {
  if (err) throw err;
  console.log(`Successfully copied ${name} folder!`);
} // copy admin folder to the root of /public folder


function copyAdminFolder(srcPath, distPath) {
  'use strict';

  fse.copy(`${srcPath}/admin`, `${distPath}/admin`, handleError(null, 'admin'));
} // copy _headers file to the root of /public folder


function copyRootFile(filename, srcPath, distPath) {
  'use strict';

  fse.copySync(`${srcPath}/${filename}`, `${distPath}/${filename}`);
  console.log(`Successfully copied '${filename}' file!`);
} // generate canonical url for the post


function generateCanonicalURL(fileData, config) {
  'use strict';

  const datePart = fileData.name.split('-');
  datePart.length = 3; // console.log(datePart)

  const titlePart = fileData.name.split('-').slice(3).join('-'); // console.log('/' + titlePart)

  return config.site.url + '/' + (datePart.join('/') + '/' + titlePart + '.html');
} // generate postid for the post (needed for disqus)


function generatePostId(fileData) {
  'use strict';

  let postId = fileData.name.split('-');
  postId.length = 3;
  postId = postId.join('');
  return postId;
} // read data from file and then render post


function getPostDataFromMarkdown(pathToFile) {
  'use strict';

  const markdownData = fse.readFileSync(pathToFile, 'utf-8');
  const content = fm(markdownData);
  return content;
} // change date format


function convertDateFormat(postData, pathToFile, months, lang) {
  'use strict'; // additional checking needed!

  if (months.length !== 12) {
    throw new Error(`Input an array of 12 month names
      in your custom format. You supplied ${months.length} month names.`);
  }

  const dateParts = postData.attributes.date.split('-'); // replace month number with month name

  const month = dateParts[1];

  if (lang === 'hun') {
    switch (month) {
      case '01':
        return dateParts[0] + '. ' + months[0] + ' ' + dateParts[2] + '.';

      case '02':
        return dateParts[0] + '. ' + months[1] + ' ' + dateParts[2] + '.';

      case '03':
        return dateParts[0] + '. ' + months[2] + ' ' + dateParts[2] + '.';

      case '04':
        return dateParts[0] + '. ' + months[3] + ' ' + dateParts[2] + '.';

      case '05':
        return dateParts[0] + '. ' + months[4] + ' ' + dateParts[2] + '.';

      case '06':
        return dateParts[0] + '. ' + months[5] + ' ' + dateParts[2] + '.';

      case '07':
        return dateParts[0] + '. ' + months[6] + ' ' + dateParts[2] + '.';

      case '08':
        return dateParts[0] + '. ' + months[7] + ' ' + dateParts[2] + '.';

      case '09':
        return dateParts[0] + '. ' + months[8] + ' ' + dateParts[2] + '.';

      case '10':
        return dateParts[0] + '. ' + months[9] + ' ' + dateParts[2] + '.';

      case '11':
        return dateParts[0] + '. ' + months[10] + ' ' + dateParts[2] + '.';

      case '12':
        return dateParts[0] + '. ' + months[11] + ' ' + dateParts[2] + '.';

      default:
        throw new Error(`Invalid date format in ${pathToFile}`);
    }
  } else {
    switch (month) {
      case '01':
        return months[0] + ' ' + dateParts[2] + ', ' + dateParts[0];

      case '02':
        return months[1] + ' ' + dateParts[2] + ', ' + dateParts[0];

      case '03':
        return months[2] + ' ' + dateParts[2] + ', ' + dateParts[0];

      case '04':
        return months[3] + ' ' + dateParts[2] + ', ' + dateParts[0];

      case '05':
        return months[4] + ' ' + dateParts[2] + ', ' + dateParts[0];

      case '06':
        return months[5] + ' ' + dateParts[2] + ', ' + dateParts[0];

      case '07':
        return months[6] + ' ' + dateParts[2] + ', ' + dateParts[0];

      case '08':
        return months[7] + ' ' + dateParts[2] + ', ' + dateParts[0];

      case '09':
        return months[8] + ' ' + dateParts[2] + ', ' + dateParts[0];

      case '10':
        return months[9] + ' ' + dateParts[2] + ', ' + dateParts[0];

      case '11':
        return months[10] + ' ' + dateParts[2] + ', ' + dateParts[0];

      case '12':
        return months[11] + ' ' + dateParts[2] + ', ' + dateParts[0];

      default:
        throw new Error(`Invalid date format in ${pathToFile}`);
    }
  }
} // save postdata for the index page


function savePostDataForIndexPage(fileData, dateFormatted, postData, results) {
  'use strict'; // split filename to extract year, month, day, and the title of the post

  const datePart = fileData.name.split('-');
  datePart.length = 3;
  const titlePart = fileData.name.split('-').slice(3).join('-'); // year/month/day/post_title.html

  const fileName = '/' + (datePart.join('/') + '/' + titlePart + '.html'); // Store the paths to the blogposts, in descending order by date
  // Here, the md files are in ascending order (oldest first),
  // so we need to be reverse the order for the index page

  results.unshift({
    pathToPost: fileName,
    title: postData.attributes.title,
    author: postData.attributes.author,
    dateFormatted: dateFormatted,
    date: postData.attributes.date,
    excerpt: postData.attributes.excerpt,
    topic: postData.attributes.topic,
    coverImage: postData.attributes.coverImage
  });
} // save the rendered blogposts to destination folder


function saveBlogpostsHTML(fileData, destPath, layoutContent) {
  'use strict'; // split filename to extract year, month, day, and the title of the post

  const datePart = fileData.name.split('-');
  datePart.length = 3;
  const titlePart = fileData.name.split('-').slice(3).join('-'); // year/month/day/post_title.html

  const fileName = datePart.join('/') + '/' + titlePart + '.html'; // saves the blogposts' html file to public/year/month/day/post_title.html

  fse.outputFileSync(`${destPath}/${fileName}`, layoutContent);
} // get the postsData for the archive on the index page grouped by year, month


function getDataForArchive(data, config, results) {
  'use strict';

  let years = [];
  let start = parseInt(data[0].date.split('-')[0], 10);
  let current; // Get the year of the earliest post

  for (let i = 1; i < data.length; i++) {
    current = parseInt(data[i].date.split('-')[0], 10);

    if (current < start) {
      start = current;
    }
  } // Put the years in an array in ascending order


  for (let i = start; i <= config.site.currentYear; i++) {
    years.push(i);
  } // Outer index: iterate through the years


  for (let i = start, j = 0; i <= config.site.currentYear; i++, j++) {
    let annualPosts = [];
    let months = {
      jan: 0,
      feb: 0,
      mar: 0,
      apr: 0,
      may: 0,
      jun: 0,
      jul: 0,
      aug: 0,
      sep: 0,
      oct: 0,
      nov: 0,
      dec: 0
    }; // Inner index: iterate through the posts in the current year (outer index)

    for (let k = 0; k < data.length; k++) {
      let postYear = parseInt(data[k].pathToPost.split('/')[1], 10); // if year matches, store post title and link; ascending order

      if (postYear === i) {
        let month = parseInt(data[k].pathToPost.split('/')[2], 10);

        switch (month) {
          case 1:
            annualPosts.push({
              jan: {
                title: data[k].title,
                link: data[k].pathToPost
              }
            });
            months.jan = 1;
            break;

          case 2:
            annualPosts.push({
              feb: {
                title: data[k].title,
                link: data[k].pathToPost
              }
            });
            months.feb = 1;
            break;

          case 3:
            annualPosts.push({
              mar: {
                title: data[k].title,
                link: data[k].pathToPost
              }
            });
            months.mar = 1;
            break;

          case 4:
            annualPosts.push({
              apr: {
                title: data[k].title,
                link: data[k].pathToPost
              }
            });
            months.apr = 1;
            break;

          case 5:
            annualPosts.push({
              may: {
                title: data[k].title,
                link: data[k].pathToPost
              }
            });
            months.may = 1;
            break;

          case 6:
            annualPosts.push({
              jun: {
                title: data[k].title,
                link: data[k].pathToPost
              }
            });
            months.jun = 1;
            break;

          case 7:
            annualPosts.push({
              jul: {
                title: data[k].title,
                link: data[k].pathToPost
              }
            });
            months.jul = 1;
            break;

          case 8:
            annualPosts.push({
              aug: {
                title: data[k].title,
                link: data[k].pathToPost
              }
            });
            months.aug = 1;
            break;

          case 9:
            annualPosts.push({
              sep: {
                title: data[k].title,
                link: data[k].pathToPost
              }
            });
            months.sep = 1;
            break;

          case 10:
            annualPosts.push({
              oct: {
                title: data[k].title,
                link: data[k].pathToPost
              }
            });
            months.oct = 1;
            break;

          case 11:
            annualPosts.push({
              nov: {
                title: data[k].title,
                link: data[k].pathToPost
              }
            });
            months.nov = 1;
            break;

          case 12:
            annualPosts.push({
              dec: {
                title: data[k].title,
                link: data[k].pathToPost
              }
            });
            months.dec = 1;
            break;

          default:
            throw new Error('Some error occured');
        }
      }
    } // results in descending order


    results.unshift({
      year: years[j],
      articles: annualPosts,
      months: months
    });
  }
} // -----------------------------------------------------------------------------------------
// ---------------------------------------- End --------------------------------------------
// -----------------------------------------------------------------------------------------