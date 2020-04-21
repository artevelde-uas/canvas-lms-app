# App for building custom JS & CSS for Canvas LMS themes

Using this JavaScript application you can add plug-ins that add/modify functionality to the Canvas LMS front end.

[![](https://img.shields.io/npm/v/@ahsdile/canvas-lms-app.svg)](https://www.npmjs.com/package/@ahsdile/canvas-lms-app)
[![](https://img.shields.io/github/license/artevelde-uas/canvas-lms-app.svg)](https://spdx.org/licenses/MIT)
[![](https://img.shields.io/npm/dt/@ahsdile/canvas-lms-app.svg)](https://www.npmjs.com/package/@ahsdile/canvas-lms-app)
[![](https://img.shields.io/librariesio/github/artevelde-uas/canvas-lms-app.svg)](https://libraries.io/npm/@ahsdile%2Fcanvas-lms-app)

> With the upcoming release of version 1.0, the npm package will be renamed with the new organization name
> [***artevelde-uas** (Artevelde University of Applied Sciences)*](https://www.npmjs.com/org/artevelde-uas).
> The full package name will be *'@artevelde-uas/canvas-lms-app'*. All plug-ins will be renamed as well.

## Installation

Using NPM:

    npm install @ahsdile/canvas-lms-app

Using Yarn:

    yarn add @ahsdile/canvas-lms-app

## Usage

Just import the Canvas app and your plug-ins and add them to the app:

```javascript
import canvas from '@ahsdile/canvas-lms-app';
import somePlugin from 'some-plugin';
import myPlugin from './plugins/my-plugin';

canvas.addPlugin(somePlugin);
canvas.addPlugin(myPlugin);

canvas.run();

```
