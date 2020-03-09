# Rollup Plugin Variables

Rollup plugin from parse variables

[![npm version](https://badge.fury.io/js/rollup-plugin-variables.svg)](https://www.npmjs.com/package/rollup-plugin-variables) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/andrelmlins/rollup-plugin-variables/blob/master/LICENSE) [![Build Status](https://travis-ci.com/andrelmlins/rollup-plugin-variables.svg?branch=master)](https://travis-ci.com/andrelmlins/rollup-plugin-variables)

## Install

```
npm install rollup-plugin-variables
```

or

```
yarn add rollup-plugin-variables
```

## Usage

**env.js**

```js
module.exports = () => {
  return {
    URL: 'http://www.example.com'
  };
};
```

**rollup.config.js**

```js
import variables from 'rollup-plugin-variables';

export default {
  plugins: [variables()]
};
```

### How will the result be?

**before in Link.jsx**

```jsx
import React from 'react';

const LinkComponent = () => <a href="[[URL]]">Link</a>;

export default LinkComponent;
```

**after in Link.jsx**

```jsx
import React from 'react';

const LinkComponent = () => <a href="http://www.example.com">Link</a>;

export default LinkComponent;
```

## Options

### `fileName`

Type `String|Function` Default: `env.js`

**rollup.config.js**

#### `String`

```js
export default {
  plugins: [variables({ fileName: 'environments.js' })]
};
```

#### `Function`

```js
export default {
  plugins: [
    variables({
      fileName: () => {
        if (process.env.NODE_ENV === 'development') {
          return 'environments.test.js';
        }

        return 'environments.js';
      }
    })
  ]
};
```

### `format`

Type `String<js,json,txt>|Function<js,json,env>` Default: `js`

**rollup.config.js**

#### `String`

```js
export default {
  plugins: [variables({ format: 'js' })]
};
```

#### `Function`

```js
export default {
  plugins: [
    variables({
      format: () => {
        if (process.env.NODE_ENV === 'development') {
          return 'json';
        }

        return 'js';
      }
    })
  ]
};
```

### `marker`

Type `String|Function|Array` Default: `[[]]`

**rollup.config.js**

#### `String`

```js
export default {
  plugins: [variables({ marker: '{{}}' })]
};
```

#### `Function`

```js
export default {
  plugins: [
    variables({
      marker: () => {
        if (process.env.NODE_ENV === 'development') {
          return '{{}}';
        }

        return '[[]]';
      }
    })
  ]
};
```

## NPM Statistics

Download stats for this NPM package

[![NPM](https://nodei.co/npm/rollup-plugin-variables.png)](https://nodei.co/npm/rollup-plugin-variables/)

## License

Rollup Plugin Variables is open source software [licensed as MIT](https://github.com/andrelmlins/rollup-plugin-variables/blob/master/LICENSE).
