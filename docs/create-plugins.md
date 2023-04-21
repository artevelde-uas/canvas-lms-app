# Create Your Own Plug-ins

[ COMING SOON ]

## Deprecated features

These features are deprecated and will be removed in future versions:

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
