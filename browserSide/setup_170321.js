'use strict'
var A = { // page static actions 'object'
	stateA : new signals.Signal()
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
/*ex pg:
function init() {
	riot.compile(function(){ // make component, and wait for it
		...
	})
}//()
A.onLoaded(init)
*/

// load <====================================================================
console.log ('pgA v17.03a')
//console.log(bowser.mobile)

if(bowser.msie) {
	console.log('you got ie')
}

if ( !bowser.blink) {//detect
	console.log('not new chrome')
	loadNotChrome()
} else {
	console.log('is chrome')
	loadjs.done('dependencyNotChrome')
}

function loadNotChrome() {
	loadjs([
		'//cdn.jsdelivr.net/fetch/2.0.1/fetch.min.js'
		], { success: function(){
			console.log('loaded dependencyNotChrome')
			loadjs.done('dependencyNotChrome')
		}, async: false
	})
}

loadjs([
	//,'/_js/libJs/bowser.min.js'
	'//cdn.jsdelivr.net/jquery/3.2.0/jquery.min.js'
	,'https://www.masons-foundation.org/_js/libJs/jquery.smoothState.js'
	,'//cdn.jsdelivr.net/riot/3.3.2/riot+compiler.min.js'

	], { success: function(){
		console.log('key libs')
		loadjs.done('keyLibs')
	}, async: false
})
// foo <====================================================================

function preLImg(arg) {
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
		console.log('fetching ', url_, xb_, data_)
		return fetch(ROOT_ + url_ , { //1 call
				method: 'post'
				, headers: {
					'Content-Type': 'application/json',
					XJT : xjt_,
					XBASIC: xb_
				}
				, body: JSON.stringify(data_)
			}).then(function(response) { //2 returns a promise
				//console.log('promise')
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



