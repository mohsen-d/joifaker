const utils = require("./utils.module");
let faker;

module.exports = function (field, rules, useFaker = false) {
  let currentFormat = formats.local;

  if (useFaker) {
    faker = require("@faker-js/faker").faker;
    currentFormat = formats.faker;
  }

  let num = currentFormat.default();

  if (currentFormat[field]) num = currentFormat[field](num);

  rules.forEach((r) => {
    if (currentFormat[r.name]) num = currentFormat[r.name]();
    if (processRules[r.name]) num = processRules[r.name](num, r);
  });

  return num;
};

const formats = {
  local: {
    default: () => utils.randomNumber(null, 1, 20),
    port: () => utils.randomNumber(null, 1000, 9999),
    year: () => utils.randomNumber(null, 1900, 2023),
    age: () => utils.randomNumber(null, 1, 100),
    price: () =>
      parseFloat(
        `${utils.randomNumber(null, 0, 1000)}.${utils.randomNumber(2)}`
      ),
  },
  faker: {
    default: () => faker.number.int(),
    port: () => faker.internet.port(),
    year: () => faker.date.anytime().getFullYear(),
    age: () => faker.number.int({ min: 1, max: 100 }),
    price: () => faker.commerce.price(),
  },
};

const processRules = {
  greater: (n, r) => (n < r.args.limit ? r.args.limit : n),
  max: (n, r) => (n > r.args.limit ? r.args.limit : n),
  less: (n, r) => (n > r.args.limit ? r.args.limit : n),
  min: (n, r) => (n < r.args.limit ? r.args.limit : n),
  multiple: (n, r) => n * r.args.base,
  sign: (n, r) => (r.args.sign === "negative" ? n * -1 : n),
  precision: (n, r) => parseFloat(`${n}.${utils.randomNumber(r.args.limit)}`),
};
