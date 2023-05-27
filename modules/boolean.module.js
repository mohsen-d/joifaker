const utils = require("./utils.module");

module.exports = function () {
  const randomNum = utils.randomNumber(null, 1, 9999);
  return randomNum % 2 === 0 ? true : false;
};
