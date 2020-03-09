const fs = require('fs');
const dotenv = require('dotenv');
const resolverPath = require('./utils/resolverPath');
const replaceMask = require('./utils/replaceMask');
const createMask = require('./utils/createMask');
const runFunctions = require('./utils/runFunctions');
const jsonToDotNotate = require('./utils/jsonToDotNotate');

function compilerVariables(path, format) {
  if (format === 'js') {
    const fileConfig = require(path);

    if (typeof fileConfig === 'function') {
      return jsonToDotNotate(fileConfig());
    }

    return jsonToDotNotate(fileConfig);
  } else if (format === 'env') {
    const file = fs.readFileSync(path);

    return dotenv.parse(file);
  }

  return jsonToDotNotate(
    JSON.parse(fs.readFileSync(path, { encoding: 'utf-8' }))
  );
}

function transformVariables(options = {}) {
  let optionsDefault = { fileName: 'env.js', format: 'js', marker: '[[]]' };
  options = runFunctions({ ...optionsDefault, ...options });

  if (options.marker.length % 2 !== 0) {
    console.error(new Error('Marker is invalid'));
    process.exitCode(1);
  }

  return {
    name: 'variables',

    transform(code) {
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
