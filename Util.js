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
	console.log('U.err')
	console.error(msg)
	res.statusMessage = msg
	res.status(400).end()
}

/*
ifError(err, msg, res) {
	if (err)  {
		console.log(msg+': ' + err)
		res.redirect('/index.html')// error - go home
		res.end()
		return true
	} else return false
}
*/
get _slash () {return  '/'}
endsWithSlash(str ) {
	if (isj.endWith(str, this._slash)) 
		return str
	return str+_slash
}
getPath(req) {
	let path = req.path
	if (isj.not.existy(path)) path = ''
	path = ROOT + req.baseUrl + path
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