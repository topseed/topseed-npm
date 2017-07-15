// 6/17/2017
/* 
 http://johnresig.com/blog/simple-javascript-inheritance
 * By John Resig https://johnresig.com/
 * Modified by Andrew Bullock http://blog.muonlab.com to add static properties 
 * MIT Licensed.
 */
var initializingClass = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;

// The base Class implementation 
var Class = function(){} // node

// Create a new Class that inherits from this class
Class.extend = function(prop) {
	var _super = this.prototype;
		
	// Instantiate a base class (but only create the instance,
	// don't run the init constructor)
	initializingClass = true;
	var prototype = new this();
	initializingClass = false;

	// Added: copy static properties from base
	for (var name in this) {
		if (name.substr(0, 1) == '_')
			Class[name] = this[name];
	}
		
	// Copy the properties over onto the new prototype
	for (name in prop) {
		// Check if we're overwriting an existing function
		if (typeof prop[name] == "function" && typeof _super[name] == "function" && fnTest.test(prop[name])) {
			prototype[name] = (function(name, fn) {
				return function() {
					var tmp = this._super;

					// Add a new ._super() method that is the same method
					// but on the super-class
					this._super = _super[name];

					// The method only need to be bound temporarily, so we
					// remove it when we're done executing
					var ret = fn.apply(this, arguments);
					this._super = tmp;

					return ret;
				};
			})(name, prop[name]);
		} else if (name.substr(0, 1) == '_') {
			Class[name] = prop[name];
		} else {
			prototype[name] = prop[name];
		}
	}		
	// The dummy class constructor
	function Class() {
		// All construction is actually done in the init method
		if ( !initializingClass && this.init )
		this.init.apply(this, arguments);
	}
		
	// Populate our constructed prototype object
	Class.prototype = prototype;
		
	// Enforce the constructor to be what we expect
	Class.prototype.constructor = Class;

	// And make this class extendable
	Class.extend = arguments.callee;
		
	return Class
}

var PDS = Class.extend({ //Universal base class for Data Access Object

	init: function(_urlSpec) {
		console.log('PDS init')
		this.urlSpec = _urlSpec
		if (typeof window !== 'undefined')
			this.fetch_ = window.fetch // Bsr - browser side
		else
			this.fetch_ = require('node-fetch')
	}
	
	, selectList: function(data, token) {
		return PDS._get(this.fetch_, this.urlSpec.root, this.urlSpec.selectList, data, token)
			.then(function(values) { 
				console.log(JSON.stringify(values))
				return values
		})
	}//selectList

	, update: function(data, token) { //insertOrUpdate
		if (!this.urlSpec.update) throw 'urlspec.update not defined'
		return PDS._post(this.fetch_, this.urlSpec.root, this.urlSpec.update, data, token)
			.then(function(value) { 
				console.log(JSON.stringify(value))
				return value
		})
	}//update

	, _get: function(fetch_, ROOT_, url_, payload, jtoken ) {
		console.log('fetching ', url_, payload, jtoken)
		//convert payload to query string	
		var url = ROOT_ + url_;
		var queryString = PDS._objectToQueryString(payload)
		if (queryString != '')
			url = url + '?' +queryString 
		//console.log('url'+url)	

		return fetch_(url , { //1: call
				method: 'get'
				, headers: {
					'Content-Type': 'application/json'
					,'X-JToken' : JSON.stringify(jtoken)
					,'Accept':'application/json'
					, credentials: 'same-origin' //res.cookie returned
				}
				//no body for get
			}).then(function(response) { //2: returns a promise
				//console.log(response.headers)

				if (!response.ok) {
					console.log('not ok')
					console.log(response)
					throw Error(response.statusText)
				}
				return (response.json())
			})
	}//_()

	, _objectToQueryString: function(obj){ //static
		var params = [];
		for (var p in obj) {
			if (obj.hasOwnProperty(p)) {
				params.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			}
		}
		return params.join("&");
	}

	, _post: function(fetch_,ROOT_, url_, data_, token_) { //static
		//var xjt_ = Cookies.get(PDS.XJT)
		//var xb_  = Cookies.get(PDS.XBASIC)
		console.log('fetching ', url_)
		return fetch_(ROOT_ + url_ , { //1 call
				method: 'post'
				, headers: {
					'Content-Type': 'application/json',
					'Accept':'application/json',
					 credentials: 'same-origin'
					 , 'X-JToken' : JSON.stringify(token_)
				}
				, body: JSON.stringify(data_)
			}).then(function(response) { //2 returns a promise
				
				console.log('received post response')
				//console.log(response.headers)

				if (!response.ok) {
					console.log('not ok')
					console.log(response)
					throw Error(response.statusText)
				}
				return (response.json())
			})
	}//_()
}) //'class'

// for node:
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
{	
	module.exports = PDS //node
}
