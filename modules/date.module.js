const utils = require("./utils.module");

module.exports = function (field, rules) {
  let date = utils.randomDate();

  rules.forEach((r) => {
    if (processRules[r.name]) date = processRules[r.name](date, r);
  });

  return date;
};

const processRules = {
  greater: (date, r) => (date < r.args.date ? r.args.date : date),
  min: (date, r) => (date < r.args.date ? r.args.date : date),
  less: (date, r) => (date > r.args.date ? r.args.date : date),
  max: (date, r) => (date > r.args.date ? r.args.date : date),
};
