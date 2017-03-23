# topseed Util 

<http://npmjs.com/package/topseed-util>

In order to make node code more readable, sometimes you need to remove the noise.
So here we have some util functions, used by topseed projects. 

You can use it too. In package.json:

	"topseed-util": ">=17.03"

then in code:

	const Util = require('topseed-util')
	const U = new Util() 

	U.genRandom(100,9999)