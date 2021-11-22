# App for building custom JS & CSS for Canvas LMS themes

Using this application you can easily create plug-ins that add/modify functionality of the Canvas LMS UI.

[![](https://img.shields.io/npm/v/@artevelde-uas/canvas-lms-app.svg)](https://www.npmjs.com/package/@artevelde-uas/canvas-lms-app)
[![](https://img.shields.io/github/license/artevelde-uas/canvas-lms-app.svg)](https://spdx.org/licenses/ISC)
[![](https://img.shields.io/npm/dt/@artevelde-uas/canvas-lms-app.svg)](https://www.npmjs.com/package/@artevelde-uas/canvas-lms-app)
[![](https://img.shields.io/librariesio/github/artevelde-uas/canvas-lms-app.svg)](https://libraries.io/npm/@artevelde-uas%2Fcanvas-lms-app)

This package provides the following functionality to make it easier to rapidly develop plug-ins:

* **Auth:** Simple functions to determine enrollment type (etc).
* **DOM:** Functions to detect if certain elements are added/removed.
* **I18n:** Enables easy localization (using [i18next](https://www.i18next.com/) framework).
* **Messages:** Functions to add messages and notifications.
* **Router:** Allows to run plug-in code only on certain pages while recieving all the parameters as variables. Also lets you create URLs based on routes.
* **Theme:** A slightly modified theme to be used by [Instructure UI](https://instructure.design/) components

## Installation

Using NPM:

    npm install @artevelde-uas/canvas-lms-app

Using Yarn:

    yarn add @artevelde-uas/canvas-lms-app

## Usage

Just import the Canvas app and your plug-ins and add them to the app:

```javascript
import { run, addPlugin } from '@artevelde-uas/canvas-lms-app';
import somePlugin from '@some-org/plugin';

addPlugin(somePlugin);

run();
```

For more information see '[How to set up your project](docs/setup.md)'.

## Note for developers

**WARNING:** some non compatible changes are introduced with the release of version 1.0.0.

### Deprecated features

These features will be removed:

* The following functions are no langer be supported:
    * `addAppListener()`: use `router.onRoute('[name].*')`
    * `addRouteListener()`: use `router.onRoute()`
    * `router.addListener()`: use `router.onRoute()`
    * `getRouteUrl()`: use `router.getUrl()`
    * `addReadyListener()`: use `dom.onElementReady()`
    * `handle(path)`: use `run()`
    
* The following routes will no longer be valid:
    * `course`: renamed to `courses` 
    * `profile.communication`: renamed to `profile.notifications` 

### Service injection in older plug-ins

Services will no longer be injected in plug-ins. Instead import them at the top of your file:

**~~INVALID~~:**

```javascript
export default function ({ router, dom, messages }) {
    // ...
}
```

**VALID:**
```javascript
import { router, dom, messages } from '@artevelde-uas/canvas-lms-app';

export default function () {
    // ...
}
```

Alternatively, you could add them with the following option:

```javascript
import somePlugin from '@some-org/plugin';

addPlugin(somePlugin, { classicPlugin: true });
```

*(Beware that support for older plug-ins will be removed in the future.)*
