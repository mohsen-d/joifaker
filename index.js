const Joi = require("joi");
const generators = require("./modules");

const options = {
  useFaker: false,
  count: 10,
};

module.exports.generate = function (schema, count = 10, useFaker = false) {
  options.useFaker = useFaker;
  options.count = count;

  // "userName" : {schema: {type: "string", rules:[{name:"max", args: {limit: 5}}]}}
  const joiFields = schema._ids._byKey;

  const outputSchema = {};
  const output = [];

  joiFields.forEach((info, name) => {
    outputSchema[name] = {
      type: info.schema.type,
      rules: info.schema._rules,
    };
  });

  for (i = 0; i < options.count; i++) {
    output.push(generateSample(outputSchema));
  }

  return output;
};

function generateSample(outputSchema) {
  const outputFields = Object.entries(outputSchema);
  const result = {};

  // field -> ["userName",{type: "string", rules: [{name:"max", args: {limit: 5}}]}]
  outputFields.forEach(
    ([name, info]) =>
      (result[name] = generators[info.type](name, info.rules, options.useFaker))
  );

  return result;
}
