'use strict'

const isj = require('is_js')
const crypto = require('crypto')
const random = require('random-js')()
// ///////////////////////////////

//var agent = useragent.lookup(req.headers['user-agent'])
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
	return new Date()
}

getIP(req) {
	return (req.headers['x-forwarded-for'] || '').split(',')[0] 
|| req.connection.remoteAddress
}

cacheNone(res) {
	res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
}

cacheQuick(res) {//3hr, 2 minutes
	res.header('Cache-Control', 'public, s-maxage=10800, max-age=120, proxy-revalidate')
}

cacheLong(res) {//23 hours, 1hr
	res.header('Cache-Control', 'public, s-maxage=82800, max-age=3600')
}

err (msg, res) {
	console.log('U.err')
	console.error(msg)
	res.statusMessage = msg
	res.status(400).end()
}

getPath(req) {
	let path = req.path
	path = req.baseUrl + path
	//console.log(path)

	path = path.replace('undefined/','')
	path = path.replace('undefined','')
	path = this._endsWithSlash(path)
	return path
}

isW(req) { // should we serve SPA or mobile/AMP?
	if(req.path.startsWith('/w/')) return true
	if(req.subdomains.indexOf('www') > -1)  return true
	if(req.socket.localPort == 8082) return true
	if(req.query.w == '1') return true
	return false
}

 _endsWithSlash(str ) {
	const _slash = '/'
	if(isj.endWith(str,_slash)) 
		return str.slice(0, -1)
	return str
}

replace(target, search, replacement) {
	return target.split(search).join(replacement)
}//()

}//class
module.exports = Util