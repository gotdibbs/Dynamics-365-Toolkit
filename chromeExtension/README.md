# React Architecture

Key components are listed below. Redux is not used to keep this lightweight and reduce complexity.

 - `index.js`: Boots up the toolkit UI component, initializes Honeybadger and Fathom, manages communication with `launcher.js` (which is sandboxed).
 - `AppStateProvider.js`: Creates a context and provider for monitoring the Dynamics App State. This polls for version numbers, form state, record Ids, etc. When one of these key values changes, it triggers a state update/repaint to all subscribers. This can trigger things like the `InfoCollectors` to reevaluate their dependent values.

# Chrome Extension Architecture

Key components are listed below.

 - `dist/background.js`: Has access to most chrome APIs, listens for launch requests.
 - `dist/launcher.js`: Has access to the actual tab, some chrome APIs, injects scripts to page (live in a sandbox itself).
 - `dist/toolkit.js`: Has access to actual page's variables etc. (compiled react app).

See also this StackOverflow post for why there are three scripts involved with booting: https://stackoverflow.com/questions/9915311/chrome-extension-code-vs-content-scripts-vs-injected-scripts/9916089#9916089