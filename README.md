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

| Plug-in | Description | Author |
| ------- | ----------- | ------ |
| [Course Recycle Bin](https://github.com/ahsdile/canvas-lms-reorder-dashboard-courses-plugin) | Adds a 'Course Recycle Bin' button to the course settings menu. | Renaat De Muynck |
| [Reorder Dashboard Courses](https://github.com/@ahsdile/canvas-lms-enable-course-recycle-bin-plugin) | Lets you reorder your courses on the dashboard. | Renaat De Muynck |
| [Restrict SIS Course Settings](https://github.com/ahsdile/canvas-lms-restrict-sis-course-settings-plugin) | Restricts some settings in courses created by the SIS import/sync. | Renaat De Muynck |
| [Course Gradebook Disclaimer](https://github.com/ahsdile/canvas-lms-gradebook-disclaimer-plugin) | Adds a disclaimer on the gradebook page. | Renaat De Muynck |
| [Sticky Left Menu](https://github.com/ahsdile/canvas-lms-sticky-left-menu-plugin) | Makes the left menu sticky when scrolling. | Renaat De Muynck |
| [Only Show Selected Module](https://github.com/ahsdile/canvas-lms-only-show-selected-module-plugin) | Hides other modules when linked directly to module via URL hash | Renaat De Muynck |

*(More will follow soon...)*
