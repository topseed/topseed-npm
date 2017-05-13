'use strict'

const isj = require('is_js')
const useragent = require('useragent')
const crypto = require('crypto')
const random = require('random-js')()
// ///////////////////////////////

const _slash = '/'

class Util {

	getAgent(req) {
		var agent = useragent.lookup(req.headers['user-agent'])
		return agent.toAgent()
	}

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
		console.log('deprecated')
		return new Date()
	}

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
		var charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
		var randomString = ''
		for (var i = 0; i < len; i++) {
			var randomPoz = Math.floor(Math.random() * charSet.length)
			randomString += charSet.substring(randomPoz,randomPoz+1)
		}
		return randomString
	}//()

	 get ut() {//UTC/gmt time as long 
		return Date.now()
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

		path = path.replace('undefined/','')
		path = path.replace('undefined','')
		path = this.endsWithSlash(path)
		return path
	}


	replace(target, search, replacement) {
		return target.split(search).join(replacement)
	}//()

}//class
module.exports = Util