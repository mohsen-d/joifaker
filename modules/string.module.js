const data = require("../data/string.data");
const utils = require("./utils.module");

let faker;

module.exports = function (field, rules, useFaker = false) {
  let currentFormat = formats.local;

  if (useFaker) {
    faker = require("@faker-js/faker").faker;
    currentFormat = formats.faker;
  }

  let str = currentFormat.default();

  if (currentFormat[field]) str = currentFormat[field](str);

  rules.forEach((r) => {
    if (currentFormat[r.name]) str = currentFormat[r.name]();
    if (processRules[r.name]) str = processRules[r.name](str, r);
  });

  return str;
};

const formats = {
  local: {
    default: () =>
      data.defaultString.substring(0, utils.randomNumber(null, 1, 50)),
    base64: (str) => btoa(str),
    creditCard: () =>
      `${utils.randomNumber(4)} ${utils.randomNumber(4)} ${utils.randomNumber(
        4
      )} ${utils.randomNumber(4)}`,
    domain: () =>
      `${utils.randomString(data.domains[0])}.${utils.randomString(
        data.domains[1]
      )}`,
    email: () =>
      `${utils.randomString(data.emails[0])}@${utils.randomString(
        data.emails[1]
      )}.${utils.randomString(data.emails[2])}`,
    guid: () => generateGuid(),
    ip: () =>
      `${utils.randomNumber(null, 0, 255)}.${utils.randomNumber(
        null,
        0,
        255
      )}.${utils.randomNumber(null, 0, 255)}.${utils.randomNumber(
        null,
        0,
        255
      )}`,
    isoDate: () => utils.randomDate().toISOString(),
    firstName: () => utils.randomString(data.names[0]),
    lastName: () => utils.randomString(data.names[1]),
    name: () =>
      `${utils.randomString(data.names[0])} ${utils.randomString(
        data.names[1]
      )}`,
    userName: () =>
      `${utils.randomString(data.userNames[0])}${utils.randomString(
        data.userNames[1]
      )}${utils.randomString(data.userNames[2])}${utils.randomNumber(
        null,
        10,
        99
      )}`,
    url: () =>
      `${utils.randomString(data.urls[0])}${utils.randomString(
        data.urls[1]
      )}.${utils.randomString(data.urls[2])}${utils.randomString(
        data.urls[3]
      )}${utils.randomString(data.urls[4])}`,
    slug: () => {
      const max = data.defaultString.length - 51;
      const start = utils.randomNumber(null, 0, max);
      return data.defaultString
        .substring(start, start + 50)
        .replaceAll(/\s/g, "-")
        .replaceAll(/[^\w-]/g, "");
    },
    content: () =>
      `<p>${data.defaultString}</p><p>${data.defaultString}</p><p>${data.defaultString}</p>`,
  },
  faker: {
    default: () => faker.lorem.sentence(10),
    base64: (str) => btoa(str),
    creditCard: () => faker.finance.creditCardNumber(),
    domain: () => faker.internet.domainName(),
    email: () => faker.internet.email(),
    guid: () => faker.string.uuid(),
    ip: () => faker.internet.ip(),
    isoDate: () => faker.date.anytime().toISOString(),
    firstName: () => faker.person.firstName(),
    lastName: () => faker.person.lastName(),
    name: () => faker.person.fullName(),
    userName: () => faker.internet.userName(),
    url: () => faker.internet.url(),
    slug: () => faker.lorem.slug(),
    content: () => faker.lorem.paragraphs({ min: 1, max: 3 }),
  },
};

const processRules = {
  max: (str, r) =>
    str.length > r.args.limit ? str.substring(0, r.args.limit) : str,
  min: (str, r) =>
    str.length < r.args.limit
      ? (str += data.defaultString.substring(0, r.args.limit - str.length))
      : str,
  case: (str, r) =>
    r.args.direction === "upper" ? str.toUpperCase() : str.toLowerCase(),
  length: (str, r) =>
    str.length > r.args.limit
      ? str.substring(0, r.args.limit)
      : str.length < r.args.limit
      ? (str += data.defaultString.substring(0, r.args.limit - str.length))
      : str,
};

function generateGuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
