function randomNumber(length = 1, min, max) {
  const minNum = min ?? Math.pow(10, length - 1);
  const maxNumber = max ? max - min : minNum * 9;

  return Math.round(Math.random() * maxNumber) + minNum;
}

function randomString(options) {
  const index = randomNumber(null, 0, options.length - 1);
  return options[index];
}

function randomDate(start = new Date(1985, 2, 21), end = new Date()) {
  var date = new Date(+start + Math.random() * (end - start));
  return date;
}

module.exports = { randomDate, randomNumber, randomString };
