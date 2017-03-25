# Topseed Util 

<http://npmjs.com/package/topseed-util>

In order to make node code more readable, sometimes you need to remove the noise.
So here we have some utility functions, used by Topseed projects. 

You can use it too. In package.json:

	"topseed-util": ">=17.04"

Then, in JavaScript:

	const Util = require('topseed-util')
	const U = new Util() 

	U.genRandom(100,9999)