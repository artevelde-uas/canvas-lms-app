# App for building custom JS & CSS for Canvas LMS themes

Using this JavaScript application you can add plug-ins that add/modify functionality to the Canvas LMS front end.

[![](https://img.shields.io/npm/v/@ahsdile/canvas-lms-app.svg)](#)
[![](https://img.shields.io/github/license/ahsdile/canvas-lms-app.svg)](#)
[![](https://img.shields.io/npm/dt/@ahsdile/canvas-lms-app.svg)](#)
[![](https://img.shields.io/librariesio/github/ahsdile/canvas-lms-app.svg)](#)

## Installation

Using NPM:

    npm install @ahsdile/canvas-lms-app

Using Yarn:

    yarn add @ahsdile/canvas-lms-app

## Usage

Just import the Canvas app and your plug-ins and add them to the app: 

```javascript
import canvas from '@ahsdile/canvas-lms-app';
import myPlugin from './plugins/my-plugin/'

canvas.addPlugin(myPlugin);

canvas.run();

```

## Building

Before you can upload the code to Canvas you must compile it into a single JavaScript and CSS file.
Here's an [example project](https://github.com/ahsdile/canvas-lms-customisation-demo) using Webpack.

## List of existing plug-ins

| Plug-in | Description | Downloads |
| ------- | ----------- | --------- |
| [Course Recycle Bin](https://github.com/@ahsdile/canvas-lms-enable-course-recycle-bin-plugin) | Adds a 'Course Recycle Bin' button to the course settings menu. | [![](https://img.shields.io/npm/dt/@ahsdile/canvas-lms-enable-course-recycle-bin-plugin.svg)](#) |
| [~~Reorder Dashboard Courses~~](https://github.com/ahsdile/canvas-lms-reorder-dashboard-courses-plugin)<br>:warning: DEPRECATED :warning: | Lets you reorder your courses on the dashboard. | [![](https://img.shields.io/npm/dt/@ahsdile/canvas-lms-reorder-dashboard-courses-plugin.svg)](#) |
| [Restrict SIS Course Settings](https://github.com/ahsdile/canvas-lms-restrict-sis-course-settings-plugin) | Restricts some settings in courses created by the SIS import/sync. | [![](https://img.shields.io/npm/dt/@ahsdile/canvas-lms-restrict-sis-course-settings-plugin.svg)](#) |
| [Course Gradebook Disclaimer](https://github.com/ahsdile/canvas-lms-gradebook-disclaimer-plugin) | Adds a disclaimer on the gradebook page. | [![](https://img.shields.io/npm/dt/@ahsdile/canvas-lms-gradebook-disclaimer-plugin.svg)](#) |
| [Sticky Left Menu](https://github.com/ahsdile/canvas-lms-sticky-left-menu-plugin) | Makes the left menu sticky when scrolling. | [![](https://img.shields.io/npm/dt/@ahsdile/canvas-lms-sticky-left-menu-plugin.svg)](#) |
| [Only Show Selected Module](https://github.com/ahsdile/canvas-lms-only-show-selected-module-plugin) | Hides other modules when linked directly to module via URL hash | [![](https://img.shields.io/npm/dt/@ahsdile/canvas-lms-only-show-selected-module-plugin.svg)](#) |
| [Google Analytics](https://github.com/ahsdile/canvas-lms-google-analytics-plugin) | Adds the Google Analytics scripts to Canvas by providing the tracking id | [![](https://img.shields.io/npm/dt/@ahsdile/canvas-lms-google-analytics-plugin.svg)](#) |

*(More will follow soon...)*

## Contributing

I accept feature requests! Just create an issue with the label '**new feature**' or '**new plug-in**'.
Or create a pull request if you have created your own plug-in and want it to be added to the list.