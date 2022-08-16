// @flow
const chalk = require("chalk");

module.exports = {
  info(message: string) {
    console.log(chalk`{gray [generator]} ${message}`);
  },

  success(message: string) {
    console.log(chalk`{gray [generator]} {green ${message}}`);
  },

  error(message: string) {
    console.log(chalk`{gray [generator]} {red ${message}}`);
  },
};
