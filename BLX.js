// 6/17/2017
/* 
 http://johnresig.com/blog/simple-javascript-inheritance
 * By John Resig https://johnresig.com/
 * Modified by Andrew Bullock http://blog.muonlab.com to add static properties 
 * MIT Licensed.
 */
var initializingClass = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;

// The base Class implementation 
var Class = function(){}

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


var BLX = Class.extend({ //IE11-compatible testable 'middle layer' Page Business base class for component communication, ds/fetch, FRP and such. 

	init: function(ds) { //ds should handdle all ds for that page
		this._ds = ds
		this._streams= {} 	//loosely coupled
		//this.regObserver('TT', TT.smoothPg)//page stream
		//this._redirectFoo = TT.loadPg // for SSR it would be different
	}

	, reg: function(key) {
		this._streams[key] = flyd.stream()
	}

	, on: function(key, func)
	{
		if (!this._streams[key])
			this.reg(key)
		flyd.on(func, this._streams[key]) //bind	
	}

	, emit: function(key, data) {
		if (!this._streams[key])
			this.reg(key)
		this._streams[key](data) //exec
	}

	, regObserver: function(key, stm)	{
		console.log('set')
		this._streams[key] = stm
	}

	, observer: function(key) {//get
		console.log('get')
		return this._streams[key]
	}

	 , redirect: function(url) { //Go to another page
		this._redirectFoo(url)
	 }

})//'class'

// for node:
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
	module.exports = BLX //node