const resolverPath = require("./utils/resolverPath");
const compilerVariables = require("./compilerVariables");
const replaceMask = require("./utils/replaceMask");
const createMask = require("./utils/createMask");
const runFunctions = require("./utils/runFunctions");
const fs = require("fs");

function transformVariables(options = {}) {
  let optionsDefault = { fileName: "env.js", format: "js", marker: "[[]]" };
  options = runFunctions({ ...optionsDefault, ...options });

  if (options.marker.length % 2 !== 0) {
    console.error(new Error("Marker is invalid"));
    process.exitCode(1);
  }

  return {
    name: "variables",

    transform(code, id) {
      const pathFileVariables = resolverPath(`${options.fileName}`);

      if (fs.existsSync(pathFileVariables)) {
        const dictionary = compilerVariables(pathFileVariables, options.format);

        if (code.search(/\[\[([^\[\[\]\]]+)\]\]/) > 0) {
          Object.keys(dictionary).forEach(key => {
            code = replaceMask(
              code,
              createMask(options.marker, key),
              dictionary[key]
            );
          });
        }

        return code;
      }
    }
  };
}

module.exports = transformVariables;
