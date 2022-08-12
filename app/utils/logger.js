const chalk = require('chalk')

module.exports = {
  info (message) {
    console.log(chalk`{gray [generator]} ${message}`)
  },

  success (message) {
    console.log(chalk`{gray [generator]} {green ${message}}`)
  },

  error (message) {
    console.log(chalk`{gray [generator]} {red ${message}}`)
  }

}
