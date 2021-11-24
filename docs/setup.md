# How to set up your project

Create your main project using `npm init` (Or with Yarn). Then install the Canvas LMS App:

    npm install @artevelde-uas/canvas-lms-app

## Dependencies

### Webpack

Your project needs to be transpiled with Webpack. You need to copy all the *dev dependencies* listed in the `package.json` file of the `@artevelde-uas/canvas-lms-app` package to your own project.

```json
{
  // ...
  "devDependencies": {
    "@babel/core": "^7.15.5",
    "@babel/preset-env": "^7.15.6",
    "babel-loader": "^8.2.2",
    "css-loader": "^5.2.7",
    "webpack": "^4.46.0",
    "webpack-cli": "^4.9.1"
    // ...
  },
  // ...
}
```

### React

Some plug-ins may be using the [Instructure UI](https://instructure.design/) components and so you will probably need to add it as a dependency, as well as [React](https://reactjs.org/):

```json
{
  // ...
  "dependencies": {
    // ...
    "@instructure/emotion": "^8.11.1",
    "@instructure/ui": "^8.11.1",
    "react": "^17.0.2",
    "react-dom": "^17.0.2"
  },
  // ...
}
```

**NOTE:** Instructure UI requires Webpack v4 (!) to work properly.

## Webpack configuration

The Canvas LMS App provides default Webpack config files for *development* and *production*. You can import and override them like so:

```javascript
// config/webpack.dev.js
const developmentConfig = require('@artevelde-uas/canvas-lms-app/webpack/development-config');

module.exports = {
    ...developmentConfig,
    output: {
        filename: '[name].dev.js'
    }
};
```

You can then add these scripts to your `package.json` file:

```json
{
  // ...
  "scripts": {
    "build": "webpack --config=./config/webpack.prod.js",
    "build:dev": "webpack --config=./config/webpack.dev.js"
  }
}
```

## Adding plug-ins to your project

Install the plug-ins you want using `npm install`:

    npm install @some-org/plugin @some/plugin-with-options

Just import your plug-ins and add them to the app. Some plug-ins accept an additional options object.

```javascript
import { run, addPlugin } from '@artevelde-uas/canvas-lms-app';

import somePlugin from '@some-org/plugin';
import somePluginWithOptions from '@some/plugin-with-options';
import myPlugin from './plugins/my-plugin';

addPlugin(somePlugin);
addPlugin(somePluginWithOptions, {
  option1: 'foo',
  option2: true
});
addPlugin(myPlugin);

run();
```
