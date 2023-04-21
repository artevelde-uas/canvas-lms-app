# How to set up your project

## TL;DR

If you want to get started right away, check out the [example app](https://github.com/artevelde-uas/canvas-lms-theme-customization-example)
which has everything you need right out-of-the-box.

## Setup

## Step 1: Initialize your project

Initialize your main project using `npm init` (or `Yarn init`). Then install the Canvas LMS App dependencies.

With `NPM`:

    npm install @artevelde-uas/canvas-lms-app
    npm install --save-dev @artevelde-uas/canvas-lms-theme-dev

Using Yarn:

    yarn add @artevelde-uas/canvas-lms-app
    yarn add -D @artevelde-uas/canvas-lms-theme-dev

**⚠ NOTE:** If you use `Yarn`, be sure to add this to your `.yarnrc` config file:

```yaml
nodeLinker: node-modules
```

### Step 2: Installing plug-ins in your project

Install the extra plug-ins you want using `NPM`:

    npm install @some-org/plugin @some/plugin-with-options

Or `Yarn`:

    yarn add @some-org/plugin @some/plugin-with-options

### Step 3: Import the plug-ins into your project's code

Just import your plug-ins and add them to the app using `addPlugin()`. Some plug-ins accept an additional options object.

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

If you want to create your own plug-ins, check out [this guide](create-plugins.md).

### Step 4: Build your project

The Canvas LMS DEV tool provides a default build script to compile your code with zero configuration needed. Just add the plug-ins you need to the `./src/index.js` file and run the command:

    npm run canvas-build

Or:

    yarn canvas-build

This will compile your code into a Javascript and CSS file in the `dist/` folder. Upload these onto your Canvas instance's theme and you're good to go!

If you want to customize the build process, follow [this guide](custom-build.md).
