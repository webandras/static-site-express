const postData = require('./src/data/postdata.json')

let dateFormatted = []
let dateParts = []
let linkParts = []

let yearPosted
let posts2018 = []
let posts2017 = []

for (let i = 0; i < postData.length; i++) {
  // split date string by the '-' delimiter into an array
  dateParts = postData[i].date.split('-')
  linkParts = postData[i].filename.split('-')

  yearPosted = dateParts[0]
  switch (yearPosted) {
    case '2018':
      posts2018.push({
        title: postData[i].title,
        link: `/${linkParts[0]}/${linkParts[1]}/${linkParts[2]}/${linkParts[3]}.html`
      })
      break
    case '2017':
      posts2017.push({
        title: postData[i].title,
        link: `/${linkParts[0]}/${linkParts[1]}/${linkParts[2]}/${linkParts[3]}.html`
      })
      break
    default:
      break
  }

  // replace month number with month name
  let month = dateParts[1]
  switch (month) {
    case '01':
      dateFormatted.push('January ' + dateParts[2] + ', ' + dateParts[0])
      break

    case '02':
      dateFormatted.push('February ' + dateParts[2] + ', ' + dateParts[0])
      break

    case '03':
      dateFormatted.push('March ' + dateParts[2] + ', ' + dateParts[0])
      break

    case '04':
      dateFormatted.push('April ' + dateParts[2] + ', ' + dateParts[0])
      break

    case '05':
      dateFormatted.push('May ' + dateParts[2] + ', ' + dateParts[0])
      break

    case '06':
      dateFormatted.push('June ' + dateParts[2] + ', ' + dateParts[0])
      break

    case '07':
      dateFormatted.push('July ' + dateParts[2] + ', ' + dateParts[0])
      break

    case '08':
      dateFormatted.push('August ' + dateParts[2] + ', ' + dateParts[0])
      break

    case '09':
      dateFormatted.push('September ' + dateParts[2] + ', ' + dateParts[0])
      break

    case '10':
      dateFormatted.push('October ' + dateParts[2] + ', ' + dateParts[0])
      break

    case '11':
      dateFormatted.push('November ' + dateParts[2] + ', ' + dateParts[0])
      break

    case '12':
      dateFormatted.push('December ' + dateParts[2] + ', ' + dateParts[0])
      break

    default: break
  }
}

// I inserted some dummy text
module.exports = {
  site: {
    url: '',
    title: `Your name's blog`,
    author: 'Your name',
    quote: 'Your quote that describes your blog... Your quote that describes your blog... Your quote that describes your blog...',
    description: 'Your short bio goes here... Your short bio goes here... Your short bio goes here... Your short bio goes here... Your short bio goes here...',
    bookTitle: 'Your book title (if you have one)',
    email: 'username@yourmail.com',
    github: 'username',
    linkedin: 'your-custom-name',
    cv: 'link-to-your-cv',
    mailchimp: 'link-to-your-newsletter',
    year: new Date().getFullYear(),
    postData,
    dateFormatted: dateFormatted,
    posts2018: posts2018,
    posts2017: posts2017
  }
}
