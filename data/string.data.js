const defaultString = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;
const domains = [
  [
    "bing",
    "mohsen",
    "anotherBlog",
    "dorp.coding",
    "github",
    "google",
    "apple",
    "microsoft",
    "yahoo",
  ],
  ["com", "net", "org", "dev", "ca", "info", "us", "me"],
];
const urls = [
  ["http://", "https://"],
  domains[0],
  domains[1],
  ["/page/", "/post/", "/user/", "/search/", "/album/", "/news/", "/"],
  ["index.html", "13298432", "latest", "id=2", "keyword=asdferafad"],
];
const emails = [
  ["noreply", "contant", "inquiry", "offers", "mohsen", "john", "steve"],
  domains[0],
  domains[1],
];

const names = [
  [
    "Mohsen",
    "John",
    "Hana",
    "Bob",
    "Sara",
    "Steve",
    "Martin",
    "Ahmad",
    "Jake",
    "Barbara",
    "Rose",
  ],
  [
    "Smith",
    "Young",
    "Bush",
    "Wright",
    "Gates",
    "Ali",
    "Greenwoods",
    "Short",
    "Sheriff",
    "Lane",
  ],
];

const userNames = [names[0], ["_", ".", ""], names[1]];

module.exports = {
  defaultString,
  domains,
  emails,
  names,
  userNames,
  urls,
};
