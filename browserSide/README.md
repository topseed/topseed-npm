# setup.js

When using .js in front end creation or development, some pattern implementations are commonly useful. This is ~450 bytes .js file used by topseed projects and we are always looking for things to remove from here. 

You can use it as well.
Use from CDN as, make sure you get the latest version number, older versions are deprecated quickly:
- <https://cdn.rawgit.com/topseed/topseed-npm/master/browserSide/setup_170321.js>

You'll need 'https://www.masons-foundation.org/_js/libJs/loadjs.min.js' loaded ahead.

Features:

- fetch() helper, as XHR and Ajax are superceded. (using API is Cloud v2)

- use w/ SPA (ex: smoothstate.com )

Above 2 allow for cross platform native mobile ( one example is cordova or build.phonegap.com)

- use with JWT and basic auth

- observer pattern, aka listener, dispatcher, events, and loosely coupled ( http://github.com/millermedeiros/js-signals/wiki/Comparison-between-different-Observer-Pattern-implementations )

- practical derivative implementation of Flux

- .js framework agnostic, but I like RIOT

- depends on muicss/loadjs; load before

- loads and uses js-cookie, signals and bowser from CDN

- loads bugsnag and latest jQuery v3.x.

Version naming is YY.MM.DD
For older release view git history.
