# App for building custom JS & CSS for Canvas LMS themes

Using this JavaScript application you can add plug-ins that add/modify functionality to the Canvas LMS front end.

[![](https://img.shields.io/npm/v/@ahsdile/canvas-lms-app.svg)](https://www.npmjs.com/package/@ahsdile/canvas-lms-app)
[![](https://img.shields.io/github/license/auc-ghent/canvas-lms-app.svg)](https://spdx.org/licenses/MIT)
[![](https://img.shields.io/npm/dt/@ahsdile/canvas-lms-app.svg)](https://www.npmjs.com/package/@ahsdile/canvas-lms-app)
[![](https://img.shields.io/librariesio/github/auc-ghent/canvas-lms-app.svg)](https://libraries.io/npm/@ahsdile%2Fcanvas-lms-app)

| With the upcoming release of version 1.0, the npm package will be renamed to the new vendor name ***AUC Ghent***. The full package name will be '@auc-ghent/canvas-lms-app'. All plug-ins will be renamed upon their 1.0 release as well. However, older versions of plug-ins will still be compatible with version 1.0 of the main app.|
|-|

## Installation

Using NPM:

    npm install @ahsdile/canvas-lms-app

Using Yarn:

    yarn add @ahsdile/canvas-lms-app

## Usage

Just import the Canvas app and your plug-ins and add them to the app: 

```javascript
import canvas from '@ahsdile/canvas-lms-app';
import somePlugin from '@ahsdile/some-other-plugin'
import myPlugin from './plugins/my-plugin'

canvas.addPlugin(somePlugin);
canvas.addPlugin(myPlugin);

canvas.run();

```

### Building

Before you can upload the code to Canvas you must compile it into a single JavaScript and CSS file.
Here's an [example project](https://github.com/auc-ghent/canvas-lms-customisation-demo) using Webpack.

## API

### The main app

#### `addPlugin(plugin, options)`

Adds a plug-in to the app. This method takes two arguments:
- **plugin**: This can be either a function or an object with an `init()` method. Both will be
called with a [service manager object](#the-service-manager) and the provided options.
- **options**: An object containing the options for the plugin

#### `run()`

Starts the application. 

### The service manager 

#### `addRouteListener(name, handler)`

#### `getRouteUrl(name[, params])`

#### `addReadyListener([root,] selector, handler)`

#### `i18n.setTranslations(translations[, fallbackLanguage = 'en'])`

#### `i18n.translate(keys[, options])`

#### `api.get(path[, queryParams])`

#### `api.post(path[, data[, queryParams]])`

#### `api.put(path[, data[, queryParams]])`

#### `api.del(path[, queryParams])`

## List of existing plug-ins

| Plug-in | Description | Downloads |
| ------- | ----------- | --------- |
| [Course Recycle Bin](https://github.com/auc-ghent/canvas-lms-enable-course-recycle-bin-plugin) | Adds a 'Course Recycle Bin' button to the course settings menu. | [![](https://img.shields.io/npm/dt/@ahsdile/canvas-lms-enable-course-recycle-bin-plugin.svg)](#) |
| [Restrict SIS Course Settings](https://github.com/auc-ghent/canvas-lms-restrict-sis-course-settings-plugin) | Restricts some settings in courses created by the SIS import/sync. | [![](https://img.shields.io/npm/dt/@ahsdile/canvas-lms-restrict-sis-course-settings-plugin.svg)](#) |
| [Course Gradebook Disclaimer](https://github.com/auc-ghent/canvas-lms-gradebook-disclaimer-plugin) | Adds a disclaimer on the gradebook page. | [![](https://img.shields.io/npm/dt/@ahsdile/canvas-lms-gradebook-disclaimer-plugin.svg)](#) |
| [Sticky Left Menu](https://github.com/auc-ghent/canvas-lms-sticky-left-menu-plugin) | Makes the left menu sticky when scrolling. | [![](https://img.shields.io/npm/dt/@ahsdile/canvas-lms-sticky-left-menu-plugin.svg)](#) |
| [Only Show Selected Module](https://github.com/auc-ghent/canvas-lms-only-show-selected-module-plugin) | Hides other modules when linked directly to module via URL hash | [![](https://img.shields.io/npm/dt/@ahsdile/canvas-lms-only-show-selected-module-plugin.svg)](#) |
| [Google Analytics](https://github.com/auc-ghent/canvas-lms-google-analytics-plugin) | Adds the Google Analytics scripts to Canvas by providing the tracking id | [![](https://img.shields.io/npm/dt/@ahsdile/canvas-lms-google-analytics-plugin.svg)](#) |
| [All Courses Terms Tabs](https://github.com/auc-ghent/canvas-lms-all-courses-terms-tabs-plugin) | Groups the courses on the 'All Courses' page in tabs per term. | [![](https://img.shields.io/npm/dt/@auc-ghent/canvas-lms-all-courses-terms-tabs-plugin.svg)](#) |

*(More will follow soon...)*

## Contributing

I accept feature requests! Just create an issue with the label '**new feature**' or '**new plug-in**'.
Or create a pull request if you have created your own plug-in and want it to be added to the list.