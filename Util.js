'use strict'

const isj = require('is_js')
const crypto = require('crypto')
const random = require('random-js')()
const fs = require('fs')

const pug = require('pug')
const doT = require('dot')
const cheerio = require('cheerio')
// ///////////////////////////////

const _slash = '/'

const pug_options = {}
pug_options.pretty = true

// https://www.npmjs.com/package/topseed-util
class Util {

	crypt(str, salt) {
		let hash = crypto.createHmac('sha512', salt)
		hash.update(str)
		const value = hash.digest('hex')
		return value
	}

	genRandom(low, hi){
		return random.integer(low, hi)
	}

	getDt() {
		return Date.now()
	}
	get ut() {//UTC/gmt time as long 
		return Date.now()
	}//()

	getIP(req) {
		return (req.headers['x-forwarded-for'] || '').split(',')[0] 
	|| req.connection.remoteAddress
	}

	cacheNone(res) {
		res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
	}

	cacheQuick(res) {//3hr, 30 seconds
		res.header('Cache-Control', 'public, s-maxage=10800, max-age=30, proxy-revalidate')
	}

	cacheLong(res) {//23 hours, 2 minutes
		res.header('Cache-Control', 'public, s-maxage=82800, max-age=120')
	}

	err(msg, res) {
		console.error('uerr', msg)
		res.statusMessage = msg
		res.status(400).end()
	}

	randomString(len) {
		var charSet = 'ABCDEFGHJKMNPQRSTUVWXY3456789'
		var randomString = ''
		for (var i = 0; i < len; i++) {
			var randomPoz = Math.floor(Math.random() * charSet.length)
			randomString += charSet.substring(randomPoz,randomPoz+1)
		}
		return randomString
	}//()

	get _slash () {return  '/'}
	endsWithSlash(str ) {
		if (isj.endWith(str, this._slash)) 
			return str
		return str+_slash
	}
	getPath(rot, req) {
		let path = req.path
		if (isj.not.existy(path)) path = ''
		path = rot + req.baseUrl + path
		//console.log(path)

		path = this.replace(path,'undefined/','')
		path = this.replace(path,'undefined','')
		path = this.endsWithSlash(path)
		return path
	}

	replace(target, search, replacement) {
		return target.split(search).join(replacement)
	}//()



sendOK(res, html) {
	res.status(200).send( html ).end()
}

exists(requestedResource) {
	return fs.existsSync(requestedResource)
}

getPug(pgPath) { //pug
	const requestedResource = this.replace(pgPath, '.html', '.pug')
	const h = pug.renderFile(requestedResource, pug_options)
	return h
}

// SSR ###################### 
getAsDoc(pgPath) { //pug
	const requestedResource = this.replace(pgPath, '.html', '.pug')
	const h = pug.renderFile(requestedResource, pug_options)
	const $ = cheerio.load(h) // load in the HTML into cheerio
	return $
}

dBind(tpl, data) { // doT
	const tpl1Foo = doT.template(tpl)
	const v = tpl1Foo(data)
	return v
}
}//class
module.exports = Util