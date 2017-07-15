# Topseed Util 

<http://npmjs.com/package/topseed-utils>

In order to make node code more readable, sometimes you need to remove the noise.
So here we have some utility functions, used by topseed projects. 

You can use it too. In package.json:

	"topseed-utils": ">=25.0.1"

Then, in Node:

	const Util = require('topseed-utils')
	const U = new Util() 

	U.genRandom(100,9999)