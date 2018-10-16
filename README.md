# App for building custom JS & CSS for Canvas LMS themes

Using this JavaScript application you can add plug-ins that add/modify functionality to the Canvas LMS front end.


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

  - Reorder your courses on the dashboard
    ([NPM](https://www.npmjs.com/package/@ahsdile/canvas-lms-reorder-dashboard-courses-plugin),
    [GitHub](https://github.com/ahsdile/canvas-lms-reorder-dashboard-courses-plugin))
  - Add Course Recycle Bin button
    ([NPM](https://www.npmjs.com/package/@ahsdile/canvas-lms-enable-course-recycle-bin-plugin),
    [GitHub](https://github.com/@ahsdile/canvas-lms-enable-course-recycle-bin-plugin))
  - Disable certain settings in SIS courses.
    ([NPM](https://www.npmjs.com/package/@ahsdile/canvas-lms-restrict-sis-course-settings-plugin),
    [GitHub](https://github.com/ahsdile/canvas-lms-restrict-sis-course-settings-plugin))
  - *(More will follow soon...)*
   