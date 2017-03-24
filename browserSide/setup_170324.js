'use strict'
var A = 
	{ 
	stateA: new signals.Signal()	
	,inAction : false // set to true when user acts; false when effect is done
	,loaded : false
	,PRE : '_pre-action'
	,PAGE : '_new-page'
	,LOADED : '_loaded'

	,act: function (arg) {
		A.stateA.dispatch(arg, window.location)
	}//()

	,onLoaded: function(cb) { // on loading + riot compile
		if(A.loaded) {
			cb()
		} //fi
	else {
		A.stateA.addOnce(function(arg1, arg2) {
			console.log(arg1)
			cb()
			return false
		})//added once
	}//else
	}//()
}//
//> ====================================================================
/*ex pg use:
function init() {
	...
}//()
A.onLoaded(init)
*/

// load <====================================================================
loadjs([ // load bowser
	'https://cdn.rawgit.com/topseed/topseed-npm/master/browserSide/deps/bowser.min.js'
], { success: function(){
		if(bowser.msie) {
			console.log('you got ie, not edge')
			loadIE()
		} else {
			loadjs.done('dependencyIE')
		}
	}, async: false
})
function loadIE() { //load fetch, since not in IE
	loadjs([
		'//cdn.jsdelivr.net/fetch/2.0.1/fetch.min.js'
		], { success: function(){
			console.log('loaded dependencyIE')
			loadjs.done('dependencyIE')
		}, async: false
	})
}

loadjs([
	 '//cdn.jsdelivr.net/jquery/3.2.0/jquery.min.js'
	,'//d2wy8f7a9ursnm.cloudfront.net/bugsnag-3.min.js'
	,'https://cdn.rawgit.com/topseed/topseed-npm/master/browserSide/deps/js.cookie.min.js'
	], { success: function(){

		console.log('setup libs loaded!')
		loadjs.done('keyLibs')
	}, async: false
})
// foo <====================================================================

function preLImg(arg) { // start loading an image so browser has it
	var imag = new Image()
	imag.src = arg
}

var X = { // XHR for SPA
	clearCookies: function () {
		var cookies = document.cookie.split(';')
		for (var i = 0; i < cookies.length; i++){   
			var spcook =  cookies[i].split('=')
			document.cookie = spcook[0] + '=;expires=Thu, 21 Sep 1979 00:00:01 UTC;'
		}
	}//()

	,DT_ : 'DT_'
	,writeC: function(nam, str) {
		var jstr = JSON.stringify(str)
		var exp = 1/12  // 2 hours

		var hash = window.btoa(jstr)
		Cookies.set(nam, hash, { expires: exp})
		Cookies.set(X.DT_, new Date(), { expires: 10 })// so we know when it will time out
	}//()

	,XBASIC : 'X-BASIC'
	,XJT : 'X-JWT'
	,fetch: function(ROOT_, url_, data_) {
		var xjt_ = Cookies.get(X.XJT)
		var xb_  = Cookies.get(X.XBASIC)
		console.log('fetching ', url_, xb_)
		return fetch(ROOT_ + url_ , { //1 call
				method: 'post'
				, headers: {
					'Content-Type': 'application/json',
					XJT : xjt_,
					XBASIC: xb_
				}
				, body: JSON.stringify(data_)
			}).then(function(response) { //2 returns a promise
				//console.log(response.headers)

				if (!response.ok) {
					console.log('not ok')
					console.log(response)
					throw Error(response.statusText)
				}
				return (response.json())//,response.headers.get('X-JWT'))
			})
	}//_()
}//



