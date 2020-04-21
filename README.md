# App for building custom JS & CSS for Canvas LMS themes

Using this application you can easily create plug-ins that add/modify functionality of the Canvas LMS UI.

[![](https://img.shields.io/npm/v/@artevelde-uas/canvas-lms-app.svg)](https://www.npmjs.com/package/@artevelde-uas/canvas-lms-app)
[![](https://img.shields.io/github/license/artevelde-uas/canvas-lms-app.svg)](https://spdx.org/licenses/MIT)
[![](https://img.shields.io/npm/dt/@artevelde-uas/canvas-lms-app.svg)](https://www.npmjs.com/package/@artevelde-uas/canvas-lms-app)
[![](https://img.shields.io/librariesio/github/artevelde-uas/canvas-lms-app.svg)](https://libraries.io/npm/@artevelde-uas%2Fcanvas-lms-app)

## Installation

Using NPM:

    npm install @artevelde-uas/canvas-lms-app

Using Yarn:

    yarn add @artevelde-uas/canvas-lms-app

## Usage

Just import the Canvas app and your plug-ins and add them to the app:

```javascript
import canvas from '@artevelde-uas/canvas-lms-app';
import somePlugin from 'some-plugin';
import myPlugin from './plugins/my-plugin';

canvas.addPlugin(somePlugin);
canvas.addPlugin(myPlugin);

canvas.run();

```
